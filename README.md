# Mouse Diagnostic

[Open the live site](https://mattu27.github.io/mouse-diagnostic/)

A browser-based tool for observing mouse clicks, holds, wheel direction, and movement events. It runs as a static page with no account or server.

After a deployment, GitHub Pages can keep an older copy of the page in a browser cache for up to 10 minutes. If the live link still looks old, hard refresh the page or open it with a unique query string, for example `?refresh=20260928-1`.

## Guided repair verification

1. Enter the mouse model and select a button.
2. Run a deliberate single-press test before repair. Choose 100, 500, or 1,000 presses and a rapid-repeat threshold.
3. Run the same test after repair with matching settings.
4. Compare the results and download a text report. Completed results are saved only in the current browser's local storage.

The switch test counts browser `mousedown` events. A short interval can result from an intentional fast click, so the tool calls it a **suspected rapid repeat**. Zero suspected repeats during a test does not guarantee that the switch is fault-free or predict its lifespan. The free-form switch event view tracks each button's intervals separately.

## Other tests

- **Guided hold:** Three 10-second rounds. Releasing early is recorded, but the browser cannot tell whether the release was intentional.
- **Guided wheel:** Scroll up for 30 wheel events, then down for 30. The tool counts events in the unexpected direction. Browser wheel events are not physical encoder notches.
- **Input event rate:** A rolling estimate based on browser-delivered movement events. Browser scheduling and event coalescing affect the result; it is not a raw USB polling-rate measurement.
- **CPS:** Five- and ten-second click speed challenges.
- **Report:** Printable, text, and clipboard summaries distinguish completed, incomplete, and untested modules. An untested module never receives a pass or top grade.

## Running locally

Open `index.html` in a browser, or serve this directory with any local static file server. Both `index.html` and `report.js` are required. The site has no runtime dependencies.
