// State variables
let currentAlgoId = "binary";
let currentStepIndex = 0;
let isPlaying = false;
let playInterval = null;
let currentSpeed = 3; // 1 to 5
let stepsData = [];
let baseAlgoData = {};

// DOM Elements
const algoSelect = document.getElementById("algoSelect");
const btnPlay = document.getElementById("btnPlay");
const btnNext = document.getElementById("btnNext");
const btnPrev = document.getElementById("btnPrev");
const btnReset = document.getElementById("btnReset");
const speedSlider = document.getElementById("speedSlider");
const speedValue = document.getElementById("speedValue");
const arrayContainer = document.getElementById("arrayContainer");
const consoleOutput = document.getElementById("consoleOutput");

// Map ID to specific steps
const algoStepsMap = {
    "binary": typeof binarySteps !== 'undefined' ? binarySteps : [],
    "bubble": typeof bubbleSteps !== 'undefined' ? bubbleSteps : []
};

// Initialize
function init() {
    setupEventListeners();
    loadAlgorithm("binary");
}

function loadAlgorithm(algoId) {
    currentAlgoId = algoId;
    baseAlgoData = algorithms.find(a => a.id === algoId);
    stepsData = algoStepsMap[algoId];
    
    // Reset state
    currentStepIndex = 0;
    pause();
    
    // Update static UI
    document.getElementById("algorithmTitle").textContent = baseAlgoData.title;
    document.getElementById("infoTitle").textContent = baseAlgoData.infoTitle;
    
    renderStep();
}

// Rendering Engine
function renderStep() {
    if (!stepsData || stepsData.length === 0) return;
    
    const state = stepsData[currentStepIndex];
    
    // Update Sidebar Info
    document.getElementById("stepNumber").textContent = `${currentStepIndex + 1} / ${stepsData.length}`;
    
    if (currentAlgoId === "binary") {
        document.getElementById("infoValue").textContent = "27"; // Hardcoded target for demo
    } else {
        document.getElementById("infoValue").textContent = 
            (state.active >= 0 && state.target >= 0) ? `${state.values[state.active] ?? "-"} ↔ ${state.values[state.target] ?? "-"}` : "-";
    }

    document.getElementById("pointerLabel").textContent = state.pointer;
    
    // Render Visuals
    if (baseAlgoData.type === "boxes") {
        renderBoxes(state, baseAlgoData.values);
    } else if (baseAlgoData.type === "bars") {
        renderBars(state);
    }
    
    // Render Console
    renderConsole(state.console);
    
    // Update Button States
    updateControls();
}

function renderBoxes(state, baseValues) {
    arrayContainer.innerHTML = "";
    baseValues.forEach((value, index) => {
        const box = document.createElement("div");
        box.className = "array-item";
        box.textContent = value;
        
        if (index === state.active) box.classList.add("active");
        if (index === state.target) box.classList.add("target");
        
        arrayContainer.appendChild(box);
    });
}

function renderBars(state) {
    arrayContainer.innerHTML = "";
    state.values.forEach((value, index) => {
        const bar = document.createElement("div");
        bar.className = "bar";
        bar.style.height = `${value * 20}px`;
        bar.innerHTML = `<span>${value}</span>`;
        
        if (index === state.active) {
            bar.classList.add("active");
            bar.classList.add("swap");
        }
        if (index === state.target) {
            bar.classList.add("target");
        }
        
        arrayContainer.appendChild(bar);
    });
}

function renderConsole(lines) {
    consoleOutput.innerHTML = "";
    lines.forEach(line => {
        const p = document.createElement("p");
        p.textContent = line;
        consoleOutput.appendChild(p);
    });
    // Scroll to bottom
    consoleOutput.parentElement.scrollTop = consoleOutput.parentElement.scrollHeight;
}

function updateControls() {
    btnPrev.disabled = currentStepIndex === 0;
    btnNext.disabled = currentStepIndex === stepsData.length - 1;
}

// Playback Logic
function getTimeout() {
    // Speed 1: 2000ms, Speed 5: 400ms
    const maxTime = 2000;
    const minTime = 400;
    const ratio = (currentSpeed - 1) / 4;
    return maxTime - (ratio * (maxTime - minTime));
}

function togglePlay() {
    if (isPlaying) {
        pause();
    } else {
        if (currentStepIndex === stepsData.length - 1) {
            currentStepIndex = 0; // Restart if at end
            renderStep();
        }
        play();
    }
}

function play() {
    isPlaying = true;
    btnPlay.innerHTML = "⏸";
    
    // Initial delay then loop
    playInterval = setTimeout(function stepLoop() {
        if (currentStepIndex < stepsData.length - 1) {
            currentStepIndex++;
            renderStep();
            playInterval = setTimeout(stepLoop, getTimeout());
        } else {
            pause();
        }
    }, getTimeout());
}

function pause() {
    isPlaying = false;
    btnPlay.innerHTML = "▶";
    if (playInterval) {
        clearTimeout(playInterval);
        playInterval = null;
    }
}

function nextStep() {
    pause();
    if (currentStepIndex < stepsData.length - 1) {
        currentStepIndex++;
        renderStep();
    }
}

function prevStep() {
    pause();
    if (currentStepIndex > 0) {
        currentStepIndex--;
        renderStep();
    }
}

function reset() {
    pause();
    currentStepIndex = 0;
    renderStep();
}

function setupEventListeners() {
    algoSelect.addEventListener("change", (e) => {
        loadAlgorithm(e.target.value);
    });
    
    btnPlay.addEventListener("click", togglePlay);
    btnNext.addEventListener("click", nextStep);
    btnPrev.addEventListener("click", prevStep);
    btnReset.addEventListener("click", reset);
    
    speedSlider.addEventListener("input", (e) => {
        currentSpeed = parseInt(e.target.value);
        speedValue.textContent = currentSpeed + "x";
    });
}

// Start
document.addEventListener("DOMContentLoaded", init);
