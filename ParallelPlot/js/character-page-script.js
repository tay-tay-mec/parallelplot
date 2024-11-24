// Retrieve the selected character ID and AU ID
const currentCharacterId = localStorage.getItem("currentCharacterId");
if (!currentCharacterId) {
    // Redirect to AU page if no character is selected
    window.location.href = "au-page.html";
}
const characterDetailsKey = `characterDetails-${currentCharacterId}`;
let characterDetails = localStorage.getItem(characterDetailsKey) || "";
// Populate character page with saved details
const characterDetailsArea = document.getElementById("characterDetails");
characterDetailsArea.value = characterDetails;
// Save the character details when changes are made
characterDetailsArea.addEventListener("input", () => {
    localStorage.setItem(characterDetailsKey, characterDetailsArea.value);
});
// --- Keys for localStorage ---
const listsKeys = {
    appearance: `appearanceList-${currentCharacterId}`,
    personality: `personalityList-${currentCharacterId}`,
    backstory: `backstoryList-${currentCharacterId}`,
    age: `ageList-${currentCharacterId}`,
};
// --- Initialize lists from localStorage ---
const lists = {
    appearance: JSON.parse(localStorage.getItem(listsKeys.appearance)) || [],
    personality: JSON.parse(localStorage.getItem(listsKeys.personality)) || [],
    backstory: JSON.parse(localStorage.getItem(listsKeys.backstory)) || [],
    age: JSON.parse(localStorage.getItem(listsKeys.age)) || [],
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
        listItem.className = `${type}-item`;
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
// Render all lists on page load
renderList("appearance");
renderList("personality");
renderList("backstory");
renderList("age")
// --- Initialize Alternative Selves ---
const altSelfKey = `altSelfList-${currentCharacterId}`;
const altSelfList = JSON.parse(localStorage.getItem(altSelfKey)) || [];

// Save Alternative Selves to localStorage
function saveAltSelfList() {
    localStorage.setItem(altSelfKey, JSON.stringify(altSelfList));
}

// Render Alternative Selves
function renderAltSelfList() {
    const container = document.getElementById("altSelfList");
    container.innerHTML = "";
    altSelfList.forEach((altSelf, index) => {
        const listItem = document.createElement("div");
        listItem.className = "alt-self-item";
        listItem.style.backgroundColor = altSelf.color;
        listItem.innerHTML = `
            <button onclick="goToAltSelf('${altSelf.id}')">${altSelf.name}</button>
            <button onclick="editAltSelfName(${index})">Edit</button>
            <button onclick="moveAltSelfUp(${index})">▲</button>
            <button onclick="moveAltSelfDown(${index})">▼</button>
            <button onclick="deleteAltSelf(${index})">Delete</button>
            <input type="color" value="${altSelf.color}" onchange="changeAltSelfColor(${index}, this.value)">
        `;
        container.appendChild(listItem);
    });
}

// Add a new Alternative Self
function addAltSelf() {
    const name = document.getElementById("newAltSelfName").value.trim();
    if (name) {
        const newAltSelf = {
            id: `altSelf-${Date.now()}`, // Unique ID
            name: name,
            color: "#f2f2f2", // Default button background
        };
        altSelfList.push(newAltSelf);
        document.getElementById("newAltSelfName").value = ""; // Clear input
        saveAltSelfList();
        renderAltSelfList();
    } else {
        alert("Please enter a name for the alternative self.");
    }
}

// Edit the name of an Alternative Self
function editAltSelfName(index) {
    const newName = prompt("Edit alternative self name:", altSelfList[index].name);
    if (newName) {
        altSelfList[index].name = newName;
        saveAltSelfList();
        renderAltSelfList();
    }
}

// Move an Alternative Self up
function moveAltSelfUp(index) {
    if (index > 0) {
        [altSelfList[index - 1], altSelfList[index]] = [altSelfList[index], altSelfList[index - 1]];
        saveAltSelfList();
        renderAltSelfList();
    }
}

// Move an Alternative Self down
function moveAltSelfDown(index) {
    if (index < altSelfList.length - 1) {
        [altSelfList[index], altSelfList[index + 1]] = [altSelfList[index + 1], altSelfList[index]];
        saveAltSelfList();
        renderAltSelfList();
    }
}

// Delete an Alternative Self
function deleteAltSelf(index) {
    if (confirm("Are you sure you want to delete this alternative self?")) {
        altSelfList.splice(index, 1);
        saveAltSelfList();
        renderAltSelfList();
    }
}

// Change the background color of an Alternative Self
function changeAltSelfColor(index, color) {
    altSelfList[index].color = color;
    saveAltSelfList();
    renderAltSelfList();
}

// Redirect to an Alternative Self's page
function goToAltSelf(id) {
    console.log("Redirecting to alternative self:", id);
    window.location.href = `alt-self-page.html?id=${id}`;
}

// Render Alternative Selves on page load
renderAltSelfList();
