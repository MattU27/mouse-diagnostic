// All report formats use the same snapshot of completed browser observations.
function getDiagnosticReport() {
    const guided = [repairSnapshots.before, repairSnapshots.after].filter(Boolean)
        .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))[0] || null;
    const switchState = guided ? (guided.repeats ? 'INVESTIGATE' : 'NO REPEATS OBSERVED') : 'UNTESTED';
    const holdState = holdRounds === holdRequiredRounds ?
        (holdDropCount ? 'INVESTIGATE' : 'NO EARLY RELEASES OBSERVED') :
        (holdRounds || holdArmed ? 'INCOMPLETE' : 'UNTESTED');
    const wheelState = wheelTestState() === 'UNTESTED' && (wheelGuided.up || wheelGuided.down || wheelRound) ?
        'INCOMPLETE' : wheelTestState();
    const pollState = avgSamples.length >= 10 ? 'OBSERVED' :
        (avgSamples.length ? 'INSUFFICIENT SAMPLE' : 'UNTESTED');
    const completed = Number(Boolean(guided)) + Number(holdRounds === holdRequiredRounds) +
        Number(Boolean(wheelGuided.up && wheelGuided.down)) + Number(pollState === 'OBSERVED');
    const investigate = [switchState, holdState, wheelState].includes('INVESTIGATE');
    const overall = investigate ? 'INVESTIGATE' : completed === 4 ? 'TESTS RECORDED' : 'PARTIAL';
    return { guided, switchState, holdState, wheelState, pollState, completed, overall };
}

function reportValue(id, value) {
    document.getElementById(id).textContent = String(value);
}

function updateReportSheet() {
    const report = getDiagnosticReport();
    const guided = report.guided;
    reportValue('reportTimestamp', `Generated on: ${new Date().toLocaleString()}`);
    reportValue('reportDevice', `Device: ${guided ? guided.mouse : 'not specified'}`);
    reportValue('repSwitchVerdict', report.switchState);
    reportValue('repGuidedPhase', guided ?
        `${guided === repairSnapshots.after ? 'After repair' : 'Before repair'} · ${new Date(guided.date).toLocaleDateString()}` : '—');
    reportValue('repTotalClicks', guided ? guided.count : 0);
    reportValue('repDoubleClicks', guided ? `${guided.repeats} (<${guided.threshold} ms)` : '—');
    reportValue('repBtnDist', guided ? repairButtonNames[guided.button] : '—');
    reportValue('repRepairComparison', repairResultsComparable() ?
        `${repairSnapshots.before.repeats} before / ${repairSnapshots.after.repeats} after` : 'Incomplete or settings differ');

    reportValue('repHoldVerdict', report.holdState);
    reportValue('repLongestHold', holdRounds || holdArmed ? `${longestHoldSec.toFixed(2)} s` : '—');
    reportValue('repHoldDrops', holdRounds ? holdDropCount : '—');
    reportValue('repTensionVerdict', `${holdRounds} / ${holdRequiredRounds}`);

    reportValue('repPollVerdict', report.pollState);
    reportValue('repPeakHz', avgSamples.length ? `${peakHz} Hz` : '—');
    reportValue('repAvgHz', avgSamples.length ? `${avgCalculatedHz} Hz` : '—');
    reportValue('repJitter', pollIntervals.length ? `${stdDevJitter.toFixed(2)} ms` : '—');
    reportValue('repDongleVerdict', 'Browser events only');

    reportValue('repWheelVerdict', report.wheelState);
    reportValue('repWheelTotal', wheelTotal);
    reportValue('repWheelBalance', `${Number(Boolean(wheelGuided.up)) + Number(Boolean(wheelGuided.down))} / 2`);
    reportValue('repWheelGlitches', wheelGuided.up && wheelGuided.down ?
        wheelGuided.up.unexpected + wheelGuided.down.unexpected : '—');
    reportValue('repEncoderRating', report.wheelState === 'UNTESTED' ? 'Incomplete' : report.wheelState);

    const badge = document.getElementById('reportGradeBadge');
    badge.textContent = report.overall;
    badge.className = report.overall === 'INVESTIGATE' ? 'badge-grade fail' : 'badge-grade';
    reportValue('reportSummaryText', `${report.completed} of 4 modules recorded. ` +
        (report.overall === 'INVESTIGATE' ? 'At least one guided test found an event worth investigating. ' :
        report.overall === 'PARTIAL' ? 'One or more modules are incomplete or untested. ' :
        'No unexpected events were observed in the completed guided tests. ') +
        'These are browser observations, not a guarantee of hardware condition or raw USB polling.');
}

function buildReportText() {
    const report = getDiagnosticReport();
    const guided = report.guided;
    const beforeAfter = repairResultsComparable() ?
        `${repairSnapshots.before.repeats} before / ${repairSnapshots.after.repeats} after (matching settings)` :
        'Incomplete or settings differ';
    return `MOUSE DIAGNOSTIC — OBSERVATION REPORT
Generated: ${new Date().toLocaleString()}
Device: ${guided ? guided.mouse : 'not specified'}
Overall: ${report.overall} (${report.completed} of 4 modules recorded)

GUIDED SWITCH TEST: ${report.switchState}
Phase: ${guided ? (guided === repairSnapshots.after ? 'After repair' : 'Before repair') : '—'}
Test completed: ${guided ? new Date(guided.date).toLocaleString() : '—'}
Button: ${guided ? repairButtonNames[guided.button] : '—'}
Presses: ${guided ? guided.count : '—'}
Suspected rapid repeats: ${guided ? `${guided.repeats} below ${guided.threshold} ms` : '—'}
Before / after: ${beforeAfter}

GUIDED HOLD TEST: ${report.holdState}
Rounds: ${holdRounds} / ${holdRequiredRounds}
Early releases: ${holdRounds ? holdDropCount : '—'}
Longest hold: ${holdRounds || holdArmed ? longestHoldSec.toFixed(2) + ' s' : '—'}

BROWSER INPUT EVENT RATE: ${report.pollState}
Peak observed: ${avgSamples.length ? peakHz + ' Hz' : '—'}
Average observed: ${avgSamples.length ? avgCalculatedHz + ' Hz' : '—'}
Interval variation: ${pollIntervals.length ? stdDevJitter.toFixed(2) + ' ms' : '—'}
Samples: ${avgSamples.length}

GUIDED WHEEL TEST: ${report.wheelState}
Directions completed: ${Number(Boolean(wheelGuided.up)) + Number(Boolean(wheelGuided.down))} / 2
Unexpected direction events: ${wheelGuided.up && wheelGuided.down ? wheelGuided.up.unexpected + wheelGuided.down.unexpected : '—'}

Rapid repeat or early release events may be intentional. No observed issue does not prove a switch will remain reliable. Browser movement events do not establish raw USB polling rate.\n`;
}

function downloadTextFile(text, filename) {
    const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function printReportPdf() {
    updateReportSheet();
    window.print();
}

function downloadTextReport() {
    updateReportSheet();
    downloadTextFile(buildReportText(), `mouse-diagnostic-${new Date().toISOString().slice(0, 10)}.txt`);
    showToast('Text report downloaded.');
}

function copyReportClipboard() {
    updateReportSheet();
    navigator.clipboard.writeText(buildReportText()).then(
        () => showToast('Report copied to clipboard.'),
        () => showToast('Clipboard unavailable. Use the text download instead.')
    );
}
