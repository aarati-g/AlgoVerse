let currentAlgorithm = 0;

let binaryStep = 0;

let bubbleStep = 0;

function renderHero() {

    const data = algorithms[currentAlgorithm];

    document.getElementById("algorithmTitle").textContent = data.title;

    document.getElementById("stepNumber").textContent = data.step;

    document.getElementById("infoTitle").textContent = data.infoTitle;

    document.getElementById("infoValue").textContent = data.infoValue;

    renderCurrentState();

}

function renderCurrentState(){

    const data = algorithms[currentAlgorithm];

    if(data.id==="binary"){

        renderBinary();

    }

    else{

        renderBubble();

    }

}

function renderBinary(){

    const state = binarySteps[binaryStep];

    document.getElementById("stepNumber").textContent =
        `${binaryStep + 1} / ${binarySteps.length}`;

    document.getElementById("infoTitle").textContent = "TARGET";

    document.getElementById("infoValue").textContent = "27";

    document.getElementById("pointerLabel").textContent = state.pointer;

    renderBoxes(state);

    renderConsole(state.console);

}

function renderBubble(){

    const state = bubbleSteps[bubbleStep];

    document.getElementById("stepNumber").textContent =
        `${bubbleStep + 1} / ${bubbleSteps.length}`;

    document.getElementById("infoTitle").textContent = "COMPARING";

    document.getElementById("infoValue").textContent =
        `${state.values[state.active] ?? "-"} ↔ ${state.values[state.target] ?? "-"}`;

    document.getElementById("pointerLabel").textContent = state.pointer;

    renderBars(state);

    renderConsole(state.console);

}

function renderBoxes(state){

    const container=document.getElementById("arrayContainer");

    container.innerHTML="";

    algorithms[0].values.forEach((value,index)=>{

        const box=document.createElement("div");

        box.className="array-item";

        box.textContent=value;

        if(index===state.active)

            box.classList.add("active");

        if(index===state.target)

            box.classList.add("target");

        container.appendChild(box);

    });

}

function renderBars(state){

    const container = document.getElementById("arrayContainer");

    container.innerHTML = "";

    state.values.forEach((value,index)=>{

        const bar = document.createElement("div");

        bar.className = "bar";

        bar.style.height = `${value*16}px`;

        bar.innerHTML = `<span>${value}</span>`;

        if(index===state.active){

            bar.classList.add("active");

            bar.classList.add("swap");

        }

        if(index===state.target){

            bar.classList.add("target");

        }

        container.appendChild(bar);

    });

}

function renderConsole(lines){

    const consoleBox=document.getElementById("consoleOutput");

    consoleBox.innerHTML="";

    lines.forEach(line=>{

        const p=document.createElement("p");

        p.textContent=line;

        consoleBox.appendChild(p);

    });

}

document.getElementById("nextAlgo").addEventListener("click",()=>{

    if(currentAlgorithm===0){

        if(binaryStep < binarySteps.length-1){

            binaryStep++;

            renderCurrentState();

        }

        else{

            currentAlgorithm=1;

            renderHero();

        }

    }

    else{

        if(bubbleStep < bubbleSteps.length-1){

            bubbleStep++;

            renderCurrentState();

        }

        else{

            currentAlgorithm=0;

            renderHero();

        }

    }

});

document.getElementById("prevAlgo").addEventListener("click",()=>{

    if(currentAlgorithm===0){

        if(binaryStep>0){

            binaryStep--;

            renderCurrentState();

        }

        else{

            currentAlgorithm=1;

            renderHero();

        }

    }

    else{

        if(bubbleStep>0){

            bubbleStep--;

            renderCurrentState();

        }

        else{

            currentAlgorithm=0;

            renderHero();

        }

    }

});

renderHero();