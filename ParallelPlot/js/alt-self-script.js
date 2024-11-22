// Get the Alternative Self ID from URL
const urlParams = new URLSearchParams(window.location.search);
const altSelfId = urlParams.get("id");

if (!altSelfId) {
    alert("No alternative self ID found in the URL");
    // Optionally, redirect or display an error
}

// Key for localStorage
const altSelfDetailsKey = `altSelfDetails-${altSelfId}`;

// Initialize or load details
const altSelfDetails = JSON.parse(localStorage.getItem(altSelfDetailsKey)) || {
    description: "",
};

// Save details to localStorage
function saveAltSelfDetails() {
    localStorage.setItem(altSelfDetailsKey, JSON.stringify(altSelfDetails));
}

// Load existing details
document.getElementById("altSelfDescription").value = altSelfDetails.description;

// Save on change
document.getElementById("altSelfDescription").addEventListener("input", (e) => {
    altSelfDetails.description = e.target.value;
    saveAltSelfDetails();
});

// --- Keys for localStorage ---
const listsKeys = {
    appearance: `appearanceList-${altSelfId}`,
    personality: `personalityList-${altSelfId}`,
    backstory: `backstoryList-${altSelfId}`,
};

// --- Initialize lists from localStorage ---
const lists = {
    appearance: JSON.parse(localStorage.getItem(listsKeys.appearance)) || [],
    personality: JSON.parse(localStorage.getItem(listsKeys.personality)) || [],
    backstory: JSON.parse(localStorage.getItem(listsKeys.backstory)) || [],
};

// Save a specific list to localStorage
function saveList(type) {
    localStorage.setItem(listsKeys[type], JSON.stringify(lists[type]));
}

// Render a specific list
function renderList(type) {
    const container = document.getElementById(`${type}List`);
    container.innerHTML = "";

    lists[type].forEach((item, index) => {
        const listItem = document.createElement("div");
        listItem.className = "item";
        listItem.style.color = item.color;

        listItem.innerHTML = `
            <span>${item.prompt}</span>
            <button onclick="editPrompt('${type}', ${index})">Edit</button>
            <button onclick="movePromptUp('${type}', ${index})">▲</button>
            <button onclick="movePromptDown('${type}', ${index})">▼</button>
            <button onclick="deletePrompt('${type}', ${index})">Delete</button>
            <input type="color" value="${item.color}" onchange="changePromptColor('${type}', ${index}, this.value)">
        `;
        container.appendChild(listItem);
    });
}
// Apply the selected color mode on page load
function applyColorMode() {
    const mode = localStorage.getItem('colorMode') || 'light';  // Default to light mode
    setColorMode(mode);
}

// Function to switch modes
function changeMode(mode) {
    // Reset all mode classes first
    document.body.classList.remove('light-mode', 'dark-mode', 'low-contrast-mode', 'purple-mode');

    // Add the selected mode class to the body
    document.body.classList.add(mode);

    // Save the selected mode to localStorage so it persists on page load
    localStorage.setItem('selectedMode', mode);
}

// Function to load the saved mode on page load
function loadSavedMode() {
    const savedMode = localStorage.getItem('selectedMode');
    
    if (savedMode) {
        changeMode(savedMode);
    } else {
        changeMode('light-mode'); // Default to light mode if no mode is saved
    }
}

// Call loadSavedMode on page load
loadSavedMode();

// Event listener to switch modes
document.getElementById('lightModeBtn').addEventListener('click', () => changeMode('light-mode'));
document.getElementById('darkModeBtn').addEventListener('click', () => changeMode('dark-mode'));
document.getElementById('lowContrastModeBtn').addEventListener('click', () => changeMode('low-contrast-mode'));
document.getElementById('purpleModeBtn').addEventListener('click', () => changeMode('purple-mode'));


// Add a new prompt
function addPrompt(type) {
    const inputId = `new${capitalize(type)}Prompt`;
    const prompt = document.getElementById(inputId).value.trim();

    if (prompt) {
        const item = {
            prompt: prompt,
            color: "#000000", // Default color
        };

        lists[type].push(item);
        document.getElementById(inputId).value = "";
        saveList(type);
        renderList(type);
    }
}

// Edit an existing prompt
function editPrompt(type, index) {
    const newPrompt = prompt(`Edit ${type} detail:`, lists[type][index].prompt);
    if (newPrompt) {
        lists[type][index].prompt = newPrompt;
        saveList(type);
        renderList(type);
    }
}

// Move a prompt up
function movePromptUp(type, index) {
    if (index > 0) {
        [lists[type][index - 1], lists[type][index]] = [lists[type][index], lists[type][index - 1]];
        saveList(type);
        renderList(type);
    }
}

// Move a prompt down
function movePromptDown(type, index) {
    if (index < lists[type].length - 1) {
        [lists[type][index], lists[type][index + 1]] = [lists[type][index + 1], lists[type][index]];
        saveList(type);
        renderList(type);
    }
}

// Delete a prompt
function deletePrompt(type, index) {
    if (confirm(`Delete this ${type} detail?`)) {
        lists[type].splice(index, 1);
        saveList(type);
        renderList(type);
    }
}

// Change font color of a prompt
function changePromptColor(type, index, color) {
    lists[type][index].color = color;
    saveList(type);
    renderList(type);
}

// Helper to capitalize strings
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Add event listeners for buttons
document.getElementById("addAppearancePrompt").addEventListener("click", () => addPrompt("appearance"));
document.getElementById("addPersonalityPrompt").addEventListener("click", () => addPrompt("personality"));
document.getElementById("addBackstoryPrompt").addEventListener("click", () => addPrompt("backstory"));

// Render lists on page load
renderList("appearance");
renderList("personality");
renderList("backstory");
