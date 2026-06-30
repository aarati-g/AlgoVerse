// const demos = [

// {
//     title:"Binary Search",

//     array:[5,12,18,27,34,40],

//     active:2,

//     target:3,

//     pointer:"Current Mid",

//     log:[
//         "✔ Mid Element = 18",
//         "✔ 18 < 27",
//         "→ Searching Right Half..."
//     ]
// },

// {
//     title:"Bubble Sort",

//     array:[8,3,6,2,9],

//     active:0,

//     target:-1,

//     pointer:"Comparing",

//     log:[
//         "✔ Compare 8 & 3",
//         "✔ Swap Required",
//         "→ Swapping..."
//     ]
// }

// ];

// let current=0;

// function render(){

// const demo=demos[current];

// document.getElementById("algorithmTitle").innerHTML=demo.title;

// document.getElementById("pointerLabel").innerHTML=demo.pointer;

// const array=document.getElementById("arrayContainer");

// array.innerHTML="";

// demo.array.forEach((num,index)=>{

// const box=document.createElement("div");

// box.className="array-item";

// box.innerHTML=num;

// if(index===demo.active)
// box.classList.add("active");

// if(index===demo.target)
// box.classList.add("target");

// array.appendChild(box);

// });

// const consoleDiv=document.getElementById("consoleOutput");

// consoleDiv.innerHTML="";

// demo.log.forEach(line=>{

// const p=document.createElement("p");

// p.innerHTML=line;

// consoleDiv.appendChild(p);

// });

// }

// document.getElementById("nextAlgo").onclick=()=>{

// current++;

// if(current>=demos.length)
// current=0;

// render();

// }

// document.getElementById("prevAlgo").onclick=()=>{

// current--;

// if(current<0)
// current=demos.length-1;

// render();


// }

// render();



renderHero();