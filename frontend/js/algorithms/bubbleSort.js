const bubbleSteps = [

{
    values:[8,3,6,2,9],
    active:0,
    target:1,
    pointer:"Comparing Elements",
    console:[
        "✔ Comparing 8 and 3",
        "✔ Swap Required",
        "→ Ready to Swap..."
    ]
},

{
    values:[3,8,6,2,9],
    active:1,
    target:2,
    pointer:"Comparing Elements",
    console:[
        "✔ Swapped",
        "✔ Comparing 8 and 6",
        "→ Swap Required"
    ]
},

{
    values:[3,6,8,2,9],
    active:2,
    target:3,
    pointer:"Comparing Elements",
    console:[
        "✔ Swapped",
        "✔ Comparing 8 and 2",
        "→ Swap Required"
    ]
},

{
    values:[3,6,2,8,9],
    active:3,
    target:4,
    pointer:"Comparing Elements",
    console:[
        "✔ Swapped",
        "✔ Comparing 8 and 9",
        "→ No Swap Needed"
    ]
},

{
    values:[2,3,6,8,9],
    active:-1,
    target:-1,
    pointer:"Array Sorted",
    console:[
        "✔ Bubble Sort Complete",
        "✔ Array Sorted Successfully"
    ]
}

];