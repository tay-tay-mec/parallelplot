// Function to set and apply a color mode
function setColorMode(mode) {
    // Remove all existing color mode classes
    document.body.classList.remove('light-mode', 'dark-mode', 'low-contrast-mode', 'purple-mode');
    
    // Add the selected color mode class to the body
    document.body.classList.add(`${mode}-mode`);
    
    // Save the selected mode to localStorage for persistence
    localStorage.setItem('colorMode', mode);
}

// Function to load and apply the saved color mode on page load
function applySavedColorMode() {
    const savedMode = localStorage.getItem('colorMode') || 'light'; // Default to light mode
    setColorMode(savedMode);
}

// Apply the saved color mode when the page loads
applySavedColorMode();


// Utility function to get query parameters
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Retrieve the current Alternative Self ID from the URL
const altSelfId = getQueryParam('id');
const currentCharacterId = localStorage.getItem('currentCharacterId') || "defaultCharacter";
const altSelfKey = `altSelfList-${currentCharacterId}`;
const altSelfList = JSON.parse(localStorage.getItem(altSelfKey)) || [];
const currentAltSelf = altSelfList.find((altSelf) => altSelf.id === altSelfId);

if (!currentAltSelf) {
    alert("Alternative self not found.");
    window.location.href = "index.html"; // Redirect to a safe page if the ID is invalid
}

// Render Alternative Self Details
function renderAltSelfDetails() {
    const nameElement = document.getElementById("altSelfName");
    const colorPicker = document.getElementById("altSelfColor");
    const detailsText = document.getElementById("altSelfDetails");

    nameElement.textContent = currentAltSelf.name;
    colorPicker.value = currentAltSelf.color;
    detailsText.value = currentAltSelf.details || "";
}

// Save Alternative Self Details
function saveAltSelfDetails() {
    const newDetails = document.getElementById("altSelfDetails").value;
    const newColor = document.getElementById("altSelfColor").value;

    currentAltSelf.details = newDetails;
    currentAltSelf.color = newColor;

    // Save updates to localStorage
    localStorage.setItem(altSelfKey, JSON.stringify(altSelfList));
    alert("Alternative self details saved!");
}

// Edit Alternative Self Name
function editAltSelfName() {
    const newName = prompt("Edit alternative self name:", currentAltSelf.name);
    if (newName) {
        currentAltSelf.name = newName;
        localStorage.setItem(altSelfKey, JSON.stringify(altSelfList));
        renderAltSelfDetails();
    }
}

// Render details on page load
renderAltSelfDetails();

// Initialize data storage for character details
const characterDataKey = `characterData-${currentCharacterId}`;
const characterData = JSON.parse(localStorage.getItem(characterDataKey)) || {
    appearance: [],
    age: '',
    personality: [],
    backstory: '',
};

// Save character data to localStorage
function saveCharacterData() {
    localStorage.setItem(characterDataKey, JSON.stringify(characterData));
}

// Render all sections
function renderCharacterData() {
    // Render Appearance
    const appearanceContainer = document.getElementById("appearanceList");
    appearanceContainer.innerHTML = "";
    characterData.appearance.forEach((detail, index) => {
        const item = document.createElement("div");
        item.innerHTML = `
            ${detail}
            <button onclick="removeAppearance(${index})">Remove</button>
        `;
        appearanceContainer.appendChild(item);
    });

    // Render Age
    document.getElementById("ageDisplay").textContent = characterData.age || "Not set";

    // Render Personality
    const personalityContainer = document.getElementById("personalityList");
    personalityContainer.innerHTML = "";
    characterData.personality.forEach((trait, index) => {
        const item = document.createElement("div");
        item.innerHTML = `
            ${trait}
            <button onclick="removePersonality(${index})">Remove</button>
        `;
        personalityContainer.appendChild(item);
    });

    // Render Backstory
    document.getElementById("backstoryDisplay").value = characterData.backstory || "";
}

// Add Appearance Detail
function addAppearance() {
    const newDetail = document.getElementById("newAppearancePrompt").value.trim();
    if (newDetail) {
        characterData.appearance.push(newDetail);
        document.getElementById("newAppearancePrompt").value = ""; // Clear input
        saveCharacterData();
        renderCharacterData();
    }
}

// Remove Appearance Detail
function removeAppearance(index) {
    characterData.appearance.splice(index, 1);
    saveCharacterData();
    renderCharacterData();
}

// Set Age
function setAge() {
    const newAge = document.getElementById("newAgePrompt").value.trim();
    if (newAge) {
        characterData.age = newAge;
        document.getElementById("newAgePrompt").value = ""; // Clear input
        saveCharacterData();
        renderCharacterData();
    }
}

// Add Personality Trait
function addPersonality() {
    const newTrait = document.getElementById("newPersonalityPrompt").value.trim();
    if (newTrait) {
        characterData.personality.push(newTrait);
        document.getElementById("newPersonalityPrompt").value = ""; // Clear input
        saveCharacterData();
        renderCharacterData();
    }
}

// Remove Personality Trait
function removePersonality(index) {
    characterData.personality.splice(index, 1);
    saveCharacterData();
    renderCharacterData();
}

// Save Backstory
function saveBackstory() {
    const newBackstory = document.getElementById("backstoryDisplay").value.trim();
    characterData.backstory = newBackstory;
    saveCharacterData();
    alert("Backstory saved!");
}

// Render data on page load
renderCharacterData();

