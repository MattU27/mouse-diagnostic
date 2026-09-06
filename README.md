# ⚡ Esports Mouse Pro Diagnostic & Hardware Lab

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-brightgreen?style=for-the-badge&logo=github)](https://mattu27.github.io/mouse-diagnostic/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Pure Web Tech](https://img.shields.io/badge/Dependencies-Zero%20(Pure%20HTML%2FCSS%2FJS)-orange?style=for-the-badge)](https://mattu27.github.io/mouse-diagnostic/)

An all-in-one, browser-based hardware diagnostic and testing suite for mechanical, optical, and wireless gaming mice. Built with sub-millisecond hardware timers (`performance.now()`) to detect switch chatter, packet jitter, and mechanical wear.

### 🌐 [Click Here to Launch Live Web App](https://mattu27.github.io/mouse-diagnostic/)

---

## 🚀 Key Features

### 1. 🖱️ Switch Chatter & Double-Click Telemetry
* **Microsecond Edge Detection:** Captures electrical pulse intervals down to `0.01ms`.
* **Hardware Chatter Trap:** Any click interval under **`50ms`** is flagged as a mechanical contact bounce error.
* **Exact Hold-to-Release Timing:** Accurately measures physical press duration to differentiate tap shots from sustained holds.
* **Interactive SVG Mouse Diagram:** Real-time visual feedback for Left, Right, Middle, and Side Buttons (4 & 5).

### 2. ⚡ 2.4GHz Polling Rate (Hz) & Jitter Analyzer
* Measures real-time USB reporting frequency up to **`4000Hz`** and **`8000Hz`**.
* Graphs packet arrival consistency to detect wireless interference, USB dropouts, or receiver latency spikes.
* Computes standard deviation packet jitter (`σ`) in milliseconds.

### 3. 🎯 Click-and-Hold / Spray Drop-Out Test
* Dedicated continuous drawing arena to test tactical shooter spray control (*Valorant*, *CS2*, *Apex Legends*).
* Instantly alerts if a worn spring leaf causes contact loss mid-spray.

### 4. 🔄 Scroll Wheel Mechanical Encoder Diagnostic
* Analyzes notch steps and direction signals.
* Detects the common **"Reverse Jump" bug** where scrolling in one direction erroneously sends an opposite pulse.

### 5. ⏱️ Clicks Per Second (CPS) Speed Benchmark
* 5-second and 10-second challenge modes with live CPS graphs to benchmark human clicking speed.

### 6. 📄 Official Hardware Inspection Certificate
* Auto-compiles all test telemetry into a printable, high-resolution **Grade S+ Certificate** (Save as PDF).
* Downloadable formatted `.txt` report and clipboard export for customer support or RMA verification.

---

## 🛠️ Switch Debounce & Maintenance Guide

| Debounce Delay | Status | Description |
| :--- | :--- | :--- |
| **`0ms – 2ms`** | ⚡ Optical Only | Best for optical switches. Causes severe chatter on mechanical switches. |
| **`4ms`** | 🏎️ Aggressive | Perfect for factory-fresh mechanical switches (tight spring tension). |
| **`8ms`** | 🏆 Gold Standard | Universal esports baseline (Zowie / Logitech). Completely blocks switch chatter with **0ms initial press lag**. |
| **`15ms – 20ms`** | 🔧 Fallback | Used for heavily degraded or oxidized mechanical switches. |

> **Quick DIY Refresh Tip:** If your mechanical switch starts double-clicking:
> 1. Turn mouse power switch to **OFF**.
> 2. Rapidly and firmly click the button **100 times in 30 seconds**.
> 3. This physically scrapes away microscopic surface oxidation on the contacts, restoring factory-fresh debounce performance.

---

## 💻 Tech Stack
* 100% Vanilla HTML5, CSS3, and JavaScript
* Zero external frameworks or network requests
* Fully functional offline

---

## 📜 License
Distributed under the MIT License. Feel free to use, modify, and distribute.
