const cases = [
    {
        name: "Standard 1",
        input: 'nums = [3,2,2,3], val = 3',
        output: '2 (nums = [2,2,_,_])'
    },
    {
        name: "Standard 2",
        input: 'nums = [0,1,2,2,3,0,4,2], val = 2',
        output: '5 (nums = [0,1,3,0,4,_,_,_])'
    },
    {
        name: "Edge 1",
        input: 'nums = [], val = 0',
        output: '0'
    },
    {
        name: "Edge 2",
        input: 'nums = [2,2,2], val = 2',
        output: '0 (nums = [_,_,_])'
    }
];

const codeLines = [
    "class Solution:",
    "    def removeElement(self, nums: List[int], val: int) -> int:",
    "        idx = 0",
    "",
    "        for i in range(len(nums)):",
    "            if nums[i] != val:",
    "                nums[i], nums[idx] = nums[idx], nums[i]",
    "                idx += 1",
    "",
    "        return idx"
];

let steps = [];
let currentStep = 0;

function parseInputStr(str) {
    if (str.includes("val = 3")) return { nums: [3,2,2,3], val: 3 };
    if (str.includes("val = 2") && str.includes("0,1")) return { nums: [0,1,2,2,3,0,4,2], val: 2 };
    if (str.includes("[]")) return { nums: [], val: 0 };
    if (str.includes("[2,2,2]")) return { nums: [2,2,2], val: 2 };
    return { nums: [], val: 0 };
}

function generateSteps(inputStr) {
    const newSteps = [];
    const parsed = parseInputStr(inputStr);
    let nums = [...parsed.nums];
    let val = parsed.val;

    let idx = 0;
    newSteps.push({
        line: 2,
        state: { 
            "nums": { type: "List[int]", val: JSON.stringify(nums) }, 
            "val": { type: "int", val: val },
            "idx": { type: "int", val: idx }
        }
    });

    for (let i = 0; i < nums.length; i++) {
        newSteps.push({
            line: 4,
            state: { 
                "nums": { type: "List[int]", val: JSON.stringify(nums) }, 
                "val": { type: "int", val: val },
                "idx": { type: "int", val: idx },
                "i": { type: "int", val: i }
            }
        });

        newSteps.push({
            line: 5,
            state: { 
                "nums": { type: "List[int]", val: JSON.stringify(nums) }, 
                "val": { type: "int", val: val },
                "idx": { type: "int", val: idx },
                "i": { type: "int", val: i },
                "nums[i]": { type: "int", val: nums[i] }
            }
        });

        if (nums[i] !== val) {
            let temp = nums[i];
            nums[i] = nums[idx];
            nums[idx] = temp;
            
            newSteps.push({
                line: 6,
                state: { 
                    "nums": { type: "List[int]", val: JSON.stringify(nums) }, 
                    "val": { type: "int", val: val },
                    "idx": { type: "int", val: idx },
                    "i": { type: "int", val: i }
                }
            });

            idx += 1;
            newSteps.push({
                line: 7,
                state: { 
                    "nums": { type: "List[int]", val: JSON.stringify(nums) }, 
                    "val": { type: "int", val: val },
                    "idx": { type: "int", val: idx },
                    "i": { type: "int", val: i }
                }
            });
        }
    }

    newSteps.push({
        line: 9,
        state: { 
            "nums": { type: "List[int]", val: JSON.stringify(nums) }, 
            "val": { type: "int", val: val },
            "idx": { type: "int", val: idx },
            "return_value": { type: "int", val: idx }
        }
    });

    return newSteps;
}

// UI Elements
const codeBlock = document.getElementById("code-block");
const stateVars = document.getElementById("state-vars");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const btnReset = document.getElementById("btn-reset");
const stepCounter = document.getElementById("step-counter");
const caseInput = document.getElementById("case-input");
const caseOutput = document.getElementById("case-output");
const caseBtns = document.querySelectorAll(".case-btn");

function initCodeBlock() {
    codeBlock.innerHTML = codeLines.map((line, i) => {
        return `<span class="code-line" id="line-${i}">${line || "&nbsp;"}</span>`;
    }).join("");
}

function loadCase(index) {
    caseBtns.forEach(btn => btn.classList.remove("active"));
    caseBtns[index].classList.add("active");
    
    caseInput.textContent = cases[index].input;
    caseOutput.textContent = cases[index].output;

    steps = generateSteps(cases[index].input);
    reset();
}

function updateUI() {
    // Update step counter
    stepCounter.textContent = `Step: ${currentStep + 1} / ${steps.length}`;

    // Update buttons
    btnPrev.disabled = currentStep === 0;
    btnNext.disabled = currentStep === steps.length - 1;

    // Highlight code
    document.querySelectorAll(".code-line").forEach(el => el.classList.remove("active"));
    const activeLine = steps[currentStep].line;
    const lineEl = document.getElementById(`line-${activeLine}`);
    if (lineEl) lineEl.classList.add("active");

    // Update state variables
    const state = steps[currentStep].state;
    stateVars.innerHTML = Object.entries(state).map(([k, info]) => `
        <div class="var-item">
            <div><span class="var-name">${k}</span> <span class="var-type">:${info.type}</span></div>
            <div class="var-val">${info.val}</div>
        </div>
    `).join("");
}

function nextStep() {
    if (currentStep < steps.length - 1) {
        currentStep++;
        updateUI();
    }
}

function prevStep() {
    if (currentStep > 0) {
        currentStep--;
        updateUI();
    }
}

function reset() {
    currentStep = 0;
    updateUI();
}

// Event Listeners
btnNext.addEventListener("click", nextStep);
btnPrev.addEventListener("click", prevStep);
btnReset.addEventListener("click", reset);

caseBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => loadCase(index));
});

// Initialization
initCodeBlock();
loadCase(0);
