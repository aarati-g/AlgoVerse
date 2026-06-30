let currentAlgorithm = 0;

function renderHero(){

    const data = algorithms[currentAlgorithm];

    document.getElementById("algorithmTitle").textContent = data.title;

    document.getElementById("stepNumber").textContent = data.step;

    document.getElementById("pointerLabel").textContent = data.pointer;

    document.getElementById("infoTitle").textContent = data.infoTitle;

    document.getElementById("infoValue").textContent = data.infoValue;

    renderVisualization(data);

    renderConsole(data);

}

function renderVisualization(data){

    const container=document.getElementById("arrayContainer");

    container.innerHTML="";

    if(data.type==="boxes"){

        data.values.forEach((value,index)=>{

            const box=document.createElement("div");

            box.className="array-item";

            box.textContent=value;

            if(index===data.active)
                box.classList.add("active");

            if(index===data.targetIndex)
                box.classList.add("target");

            container.appendChild(box);

        });

    }

    else{

        data.values.forEach((value,index)=>{

            const bar=document.createElement("div");

            bar.className="bar";

            bar.style.height=`${value*16}px`;

            bar.innerHTML=`<span>${value}</span>`;

            if(index===data.active)
                bar.classList.add("active");

            if(index===data.targetIndex)
                bar.classList.add("target");

            container.appendChild(bar);

        });

    }

}

function renderConsole(data){

    const consoleBox=document.getElementById("consoleOutput");

    consoleBox.innerHTML="";

    data.console.forEach(line=>{

        const p=document.createElement("p");

        p.textContent=line;

        consoleBox.appendChild(p);

    });

}

function nextAlgorithm(){

    currentAlgorithm++;

    if(currentAlgorithm>=algorithms.length){

        currentAlgorithm=0;

    }

    renderHero();

}

function previousAlgorithm(){

    currentAlgorithm--;

    if(currentAlgorithm<0){

        currentAlgorithm=algorithms.length-1;

    }

    renderHero();

}

document.getElementById("nextAlgo").addEventListener("click",nextAlgorithm);

document.getElementById("prevAlgo").addEventListener("click",previousAlgorithm);