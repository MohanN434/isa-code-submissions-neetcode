const cases = [
    {
        name: "Standard 1",
        input: '["eat","tea","tan","ate","nat","bat"]',
        output: '[["bat"],["nat","tan"],["ate","eat","tea"]]'
    },
    {
        name: "Standard 2",
        input: '["hello", "olleh", "abc"]',
        output: '[["hello", "olleh"], ["abc"]]'
    },
    {
        name: "Edge 1",
        input: '[""]',
        output: '[[""]]'
    },
    {
        name: "Edge 2",
        input: '["a"]',
        output: '[["a"]]'
    }
];

const codeLines = [
    "class Solution:",
    "    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:",
    "        group = defaultdict(list)",
    "",
    "        for s in strs:",
    "            key = \"\".join(sorted(s))",
    "            group[key].append(s)",
    "",
    "        return list(group.values())"
];

let steps = [];
let currentStep = 0;

function formatDict(dict) {
    const entries = Object.entries(dict).map(([k, v]) => `"${k}": ${JSON.stringify(v)}`);
    return `{ ${entries.join(", ")} }`;
}

function generateSteps(inputStr) {
    const newSteps = [];
    let strs = JSON.parse(inputStr);
    let group = {};

    // Initial state
    newSteps.push({
        line: 2,
        state: {
            "strs": { type: "List[str]", val: JSON.stringify(strs) },
            "group": { type: "defaultdict(list)", val: "{}" }
        }
    });

    for (let i = 0; i < strs.length; i++) {
        const s = strs[i];
        
        newSteps.push({
            line: 4,
            state: {
                "strs": { type: "List[str]", val: JSON.stringify(strs) },
                "group": { type: "defaultdict(list)", val: formatDict(group) },
                "s": { type: "str", val: `"${s}"` }
            }
        });

        const key = s.split('').sort().join('');
        newSteps.push({
            line: 5,
            state: {
                "strs": { type: "List[str]", val: JSON.stringify(strs) },
                "group": { type: "defaultdict(list)", val: formatDict(group) },
                "s": { type: "str", val: `"${s}"` },
                "key": { type: "str", val: `"${key}"` }
            }
        });

        if (!group[key]) group[key] = [];
        group[key].push(s);

        newSteps.push({
            line: 6,
            state: {
                "strs": { type: "List[str]", val: JSON.stringify(strs) },
                "group": { type: "defaultdict(list)", val: formatDict(group) },
                "s": { type: "str", val: `"${s}"` },
                "key": { type: "str", val: `"${key}"` }
            }
        });
    }

    newSteps.push({
        line: 8,
        state: {
            "strs": { type: "List[str]", val: JSON.stringify(strs) },
            "group": { type: "defaultdict(list)", val: formatDict(group) },
            "return_value": { type: "List[List[str]]", val: JSON.stringify(Object.values(group)) }
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
