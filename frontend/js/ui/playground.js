document.addEventListener('DOMContentLoaded', () => {
    const codeEditor = document.getElementById('codeEditor');
    const lineNumbers = document.getElementById('lineNumbers');
    const btnRun = document.getElementById('btnRun');
    const btnClear = document.getElementById('btnClear');
    const outputConsole = document.getElementById('outputConsole');

    // Default code snippet
    const defaultCode = `// Welcome to AlgoVerse Playground
// Write your JavaScript code here and hit Run

function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    
    return -1;
}

const numbers = [5, 12, 18, 27, 34, 40];
const target = 27;

console.log("Searching for " + target + " in array...");
const result = binarySearch(numbers, target);

console.log("Found at index: " + result);
`;

    codeEditor.value = defaultCode;

    // Line Number Sync
    const updateLineNumbers = () => {
        const lines = codeEditor.value.split('\n').length;
        let numbersHtml = '';
        for (let i = 1; i <= lines; i++) {
            numbersHtml += i + '<br>';
        }
        lineNumbers.innerHTML = numbersHtml;
    };

    codeEditor.addEventListener('input', updateLineNumbers);
    
    // Sync scrolling between line numbers and textarea
    codeEditor.addEventListener('scroll', () => {
        lineNumbers.scrollTop = codeEditor.scrollTop;
    });

    // Handle Tab key in textarea
    codeEditor.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            e.preventDefault();
            const start = this.selectionStart;
            const end = this.selectionEnd;
            
            // set textarea value to: text before caret + tab + text after caret
            this.value = this.value.substring(0, start) +
                "    " + this.value.substring(end);
                
            // put caret at right position again
            this.selectionStart = this.selectionEnd = start + 4;
        }
    });

    updateLineNumbers();

    // Helper to log to the custom console
    const printToConsole = (msg, type = 'log') => {
        const div = document.createElement('div');
        div.className = `console-msg ${type}`;
        
        // Handle objects/arrays
        if (typeof msg === 'object' && msg !== null) {
            try {
                div.textContent = JSON.stringify(msg, null, 2);
            } catch (e) {
                div.textContent = String(msg);
            }
        } else {
            div.textContent = String(msg);
        }
        
        outputConsole.appendChild(div);
        outputConsole.scrollTop = outputConsole.scrollHeight;
    };

    // Execution Logic
    btnRun.addEventListener('click', () => {
        const code = codeEditor.value;
        
        // Clear previous output except system messages if desired, 
        // but for now let's clear it completely and add a start message
        outputConsole.innerHTML = '';
        printToConsole('--- Execution Started ---', 'system');

        // Capture console.log
        const originalLog = console.log;
        console.log = function(...args) {
            // Call original to keep devtools working
            originalLog.apply(console, args);
            // Print to our UI console
            const output = args.map(a => 
                typeof a === 'object' ? JSON.stringify(a) : String(a)
            ).join(' ');
            printToConsole(output, 'log');
        };

        try {
            // Execute the code
            // Wrap in an IIFE to capture return value if any, though new Function is safer
            const func = new Function(code);
            const result = func();
            
            if (result !== undefined) {
                printToConsole(`Return: ${result}`, 'return');
            }
        } catch (error) {
            printToConsole(error.toString(), 'error');
        } finally {
            // Restore console.log
            console.log = originalLog;
            printToConsole('--- Execution Finished ---', 'system');
        }
    });

    // Clear Console
    btnClear.addEventListener('click', () => {
        outputConsole.innerHTML = '<div class="console-msg system">Console cleared.</div>';
    });
});
