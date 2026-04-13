const cases = [
    {
        name: "Standard 1",
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0, 1]'
    },
    {
        name: "Standard 2",
        input: 'nums = [3,2,4], target = 6',
        output: '[1, 2]'
    },
    {
        name: "Edge 1",
        input: 'nums = [3,3], target = 6',
        output: '[0, 1]'
    },
    {
        name: "Edge 2",
        input: 'nums = [-1,-2,-3,-4,-5], target = -8',
        output: '[2, 4]'
    }
];

const codeLines = [
    "class Solution:",
    "    def twoSum(self, nums: List[int], target: int) -> List[int]:",
    "        store = {}",
    "",
    "        for i in range(len(nums)):",
    "            rem = target - nums[i]",
    "",
    "            if rem in store and store[rem] != i:",
    "                return [store[rem], i]",
    "",
    "            store[nums[i]] = i"
];

let steps = [];
let currentStep = 0;

function parseInputStr(str) {
    if (str.includes("2,7,11")) return { nums: [2,7,11,15], target: 9 };
    if (str.includes("3,2,4")) return { nums: [3,2,4], target: 6 };
    if (str.includes("3,3")) return { nums: [3,3], target: 6 };
    if (str.includes("-1")) return { nums: [-1,-2,-3,-4,-5], target: -8 };
    return { nums: [], target: 0 };
}

function generateSteps(inputStr) {
    const newSteps = [];
    const parsed = parseInputStr(inputStr);
    let nums = parsed.nums;
    let target = parsed.target;

    let store = {};
    newSteps.push({
        line: 2,
        state: { 
            "nums": { type: "List[int]", val: JSON.stringify(nums) }, 
            "target": { type: "int", val: target },
            "store": { type: "dict", val: JSON.stringify(store) }
        }
    });

    for (let i = 0; i < nums.length; i++) {
        newSteps.push({
            line: 4,
            state: { 
                "nums": { type: "List[int]", val: JSON.stringify(nums) }, 
                "target": { type: "int", val: target },
                "store": { type: "dict", val: JSON.stringify(store) },
                "i": { type: "int", val: i }
            }
        });

        let rem = target - nums[i];
        newSteps.push({
            line: 5,
            state: { 
                "nums": { type: "List[int]", val: JSON.stringify(nums) }, 
                "target": { type: "int", val: target },
                "store": { type: "dict", val: JSON.stringify(store) },
                "i": { type: "int", val: i },
                "rem": { type: "int", val: rem }
            }
        });

        newSteps.push({
            line: 7,
            state: { 
                "nums": { type: "List[int]", val: JSON.stringify(nums) }, 
                "target": { type: "int", val: target },
                "store": { type: "dict", val: JSON.stringify(store) },
                "i": { type: "int", val: i },
                "rem": { type: "int", val: rem }
            }
        });

        if (rem in store && store[rem] !== i) {
            newSteps.push({
                line: 8,
                state: { 
                    "nums": { type: "List[int]", val: JSON.stringify(nums) }, 
                    "target": { type: "int", val: target },
                    "store": { type: "dict", val: JSON.stringify(store) },
                    "i": { type: "int", val: i },
                    "rem": { type: "int", val: rem },
                    "return_value": { type: "List[int]", val: JSON.stringify([store[rem], i]) }
                }
            });
            return newSteps; // End of program
        }

        store[nums[i]] = i;
        newSteps.push({
            line: 10,
            state: { 
                "nums": { type: "List[int]", val: JSON.stringify(nums) }, 
                "target": { type: "int", val: target },
                "store": { type: "dict", val: JSON.stringify(store) },
                "i": { type: "int", val: i },
                "rem": { type: "int", val: rem }
            }
        });
    }

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
