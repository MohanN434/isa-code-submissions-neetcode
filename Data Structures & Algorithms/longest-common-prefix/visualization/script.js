const cases = [
    {
        name: "Standard 1",
        input: '["flower","flow","flight"]',
        output: '"fl"'
    },
    {
        name: "Standard 2",
        input: '["dog","racecar","car"]',
        output: '""'
    },
    {
        name: "Edge 1",
        input: '["a"]',
        output: '"a"'
    },
    {
        name: "Edge 2",
        input: '["","b"]',
        output: '""'
    }
];

const codeLines = [
    "class Solution:",
    "    def longestCommonPrefix(self, strs: List[str]) -> str:",
    "        longest = strs[0]",
    "",
    "        for s in strs:",
    "            c_long = \"\"",
    "            i = 0",
    "",
    "            while i < len(s) and i < len(longest):",
    "                if s[i] != longest[i]:",
    "                    break",
    "                c_long += s[i]",
    "                i += 1",
    "            ",
    "            longest = c_long",
    "            if longest == \"\":",
    "                return \"\"",
    "",
    "        return longest"
];

let steps = [];
let currentStep = 0;

function generateSteps(inputStr) {
    const newSteps = [];
    let strs = JSON.parse(inputStr);

    let longest = strs[0];
    newSteps.push({
        line: 2,
        state: { "strs": { type: "List[str]", val: JSON.stringify(strs) }, "longest": { type: "str", val: `"${longest}"` } }
    });

    for (let s_idx = 0; s_idx < strs.length; s_idx++) {
        let s = strs[s_idx];
        newSteps.push({
            line: 4,
            state: { "strs": { type: "List[str]", val: JSON.stringify(strs) }, "longest": { type: "str", val: `"${longest}"` }, "s": { type: "str", val: `"${s}"` } }
        });

        let c_long = "";
        let i = 0;
        newSteps.push({
            line: 6,
            state: { 
                "strs": { type: "List[str]", val: JSON.stringify(strs) }, 
                "longest": { type: "str", val: `"${longest}"` }, 
                "s": { type: "str", val: `"${s}"` },
                "c_long": { type: "str", val: `"${c_long}"` },
                "i": { type: "int", val: i }
            }
        });

        while (true) {
            newSteps.push({
                line: 8,
                state: { 
                    "strs": { type: "List[str]", val: JSON.stringify(strs) }, 
                    "longest": { type: "str", val: `"${longest}"` }, 
                    "s": { type: "str", val: `"${s}"` },
                    "c_long": { type: "str", val: `"${c_long}"` },
                    "i": { type: "int", val: i }
                }
            });

            if (i < s.length && i < longest.length) {
                newSteps.push({
                    line: 9,
                    state: { 
                        "strs": { type: "List[str]", val: JSON.stringify(strs) }, 
                        "longest": { type: "str", val: `"${longest}"` }, 
                        "s": { type: "str", val: `"${s}"` },
                        "c_long": { type: "str", val: `"${c_long}"` },
                        "i": { type: "int", val: i },
                        "s[i]": { type: "str", val: `"${s[i]}"` },
                        "longest[i]": { type: "str", val: `"${longest[i]}"` }
                    }
                });

                if (s[i] !== longest[i]) {
                    newSteps.push({
                        line: 10,
                        state: { 
                            "strs": { type: "List[str]", val: JSON.stringify(strs) }, 
                            "longest": { type: "str", val: `"${longest}"` }, 
                            "s": { type: "str", val: `"${s}"` },
                            "c_long": { type: "str", val: `"${c_long}"` },
                            "i": { type: "int", val: i }
                        }
                    });
                    break;
                }

                c_long += s[i];
                newSteps.push({
                    line: 11,
                    state: { 
                        "strs": { type: "List[str]", val: JSON.stringify(strs) }, 
                        "longest": { type: "str", val: `"${longest}"` }, 
                        "s": { type: "str", val: `"${s}"` },
                        "c_long": { type: "str", val: `"${c_long}"` },
                        "i": { type: "int", val: i }
                    }
                });

                i += 1;
                newSteps.push({
                    line: 12,
                    state: { 
                        "strs": { type: "List[str]", val: JSON.stringify(strs) }, 
                        "longest": { type: "str", val: `"${longest}"` }, 
                        "s": { type: "str", val: `"${s}"` },
                        "c_long": { type: "str", val: `"${c_long}"` },
                        "i": { type: "int", val: i }
                    }
                });

            } else {
                break;
            }
        }

        longest = c_long;
        newSteps.push({
            line: 14,
            state: { 
                "strs": { type: "List[str]", val: JSON.stringify(strs) }, 
                "longest": { type: "str", val: `"${longest}"` }, 
                "s": { type: "str", val: `"${s}"` },
                "c_long": { type: "str", val: `"${c_long}"` }
            }
        });

        newSteps.push({
            line: 15,
            state: { 
                "strs": { type: "List[str]", val: JSON.stringify(strs) }, 
                "longest": { type: "str", val: `"${longest}"` }, 
                "s": { type: "str", val: `"${s}"` },
                "c_long": { type: "str", val: `"${c_long}"` }
            }
        });

        if (longest === "") {
            newSteps.push({
                line: 16,
                state: { 
                    "strs": { type: "List[str]", val: JSON.stringify(strs) }, 
                    "longest": { type: "str", val: `"${longest}"` }, 
                    "return_value": { type: "str", val: `""` }
                }
            });
            return newSteps;
        }
    }

    newSteps.push({
        line: 18,
        state: { 
            "strs": { type: "List[str]", val: JSON.stringify(strs) }, 
            "longest": { type: "str", val: `"${longest}"` }, 
            "return_value": { type: "str", val: `"${longest}"` }
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
