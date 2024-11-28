// Function to set and apply a color mode
function setColorMode(mode) {
    document.body.classList.remove('light-mode', 'dark-mode', 'low-contrast-mode', 'purple-mode');
    document.body.classList.add(`${mode}-mode`);
    localStorage.setItem('colorMode', mode);
}

// Function to load and apply the saved color mode on page load
function applySavedColorMode() {
    const savedMode = localStorage.getItem('colorMode') || 'light'; // Default to light mode
    setColorMode(savedMode);
}

// Apply the saved color mode when the page loads
document.addEventListener("DOMContentLoaded", applySavedColorMode);

// Utility function to get query parameters
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Retrieve the current Alternative Self ID from the URL
const altSelfId = getQueryParam('id');
const currentCharacterId = localStorage.getItem('currentCharacterId') || "defaultCharacter";
const altSelfKey = `altSelfList-${currentCharacterId}`;

// Validate and parse `altSelfList` from localStorage
let altSelfList = [];
try {
    altSelfList = JSON.parse(localStorage.getItem(altSelfKey)) || [];
} catch (e) {
    console.error("Invalid JSON in localStorage for altSelfList:", e);
    localStorage.removeItem(altSelfKey); // Clear corrupted data
}

const currentAltSelf = altSelfList.find((altSelf) => altSelf.id === altSelfId);

if (!currentAltSelf) {
    alert("Alternative self not found.");
    window.location.href = "index.html"; // Redirect to a safe page if the ID is invalid
}

// Render Alternative Self Details
function renderAltSelfDetails() {
    try {
        const nameElement = document.getElementById("altSelfName");
        const colorPicker = document.getElementById("altSelfColor");
        const detailsText = document.getElementById("altSelfDetails");

        if (nameElement) nameElement.textContent = currentAltSelf?.name || "Unknown Name";
        if (colorPicker) colorPicker.value = currentAltSelf?.color || "#000000"; // Default color
        if (detailsText) detailsText.value = currentAltSelf?.details || "";
    } catch (e) {
        console.error("Error rendering Alternative Self details:", e);
    }
}

// Save Alternative Self Details
function saveAltSelfDetails() {
    try {
        const newDetails = document.getElementById("altSelfDetails").value;
        const newColor = document.getElementById("altSelfColor").value;

        currentAltSelf.details = newDetails;
        currentAltSelf.color = newColor;

        localStorage.setItem(altSelfKey, JSON.stringify(altSelfList));
        alert("Alternative self details saved!");
    } catch (e) {
        console.error("Error saving Alternative Self details:", e);
    }
}

// Edit Alternative Self Name
function editAltSelfName() {
    const newName = prompt("Edit alternative self name:", currentAltSelf?.name || "Unknown Name");
    if (newName) {
        currentAltSelf.name = newName;
        localStorage.setItem(altSelfKey, JSON.stringify(altSelfList));
        renderAltSelfDetails();
    }
}

// Initialize data storage for character details
const characterDataKey = `characterData-${currentCharacterId}`;
let characterData = {};
try {
    characterData = JSON.parse(localStorage.getItem(characterDataKey)) || {
        appearance: [],
        age: '',
        personality: [],
        backstory: '',
    };
} catch (e) {
    console.error("Invalid JSON in localStorage for characterData:", e);
    characterData = { appearance: [], age: '', personality: [], backstory: '' };
}

// Save character data to localStorage
function saveCharacterData() {
    try {
        localStorage.setItem(characterDataKey, JSON.stringify(characterData));
    } catch (e) {
        console.error("Error saving character data:", e);
    }
}

// Render all sections
function renderCharacterData() {
    try {
        const appearanceContainer = document.getElementById("appearanceList");
        if (appearanceContainer) {
            appearanceContainer.innerHTML = "";
            characterData.appearance.forEach((detail, index) => {
                const item = document.createElement("div");
                item.innerHTML = `
                    ${detail}
                    <button onclick="removeAppearance(${index})">Remove</button>
                `;
                appearanceContainer.appendChild(item);
            });
        }

        const ageDisplay = document.getElementById("ageDisplay");
        if (ageDisplay) ageDisplay.textContent = characterData.age || "Not set";

        const personalityContainer = document.getElementById("personalityList");
        if (personalityContainer) {
            personalityContainer.innerHTML = "";
            characterData.personality.forEach((trait, index) => {
                const item = document.createElement("div");
                item.innerHTML = `
                    ${trait}
                    <button onclick="removePersonality(${index})">Remove</button>
                `;
                personalityContainer.appendChild(item);
            });
        }

        const backstoryDisplay = document.getElementById("backstoryDisplay");
        if (backstoryDisplay) backstoryDisplay.value = characterData.backstory || "";
    } catch (e) {
        console.error("Error rendering character data:", e);
    }
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

// Initialize and render data on page load
document.addEventListener("DOMContentLoaded", () => {
    renderAltSelfDetails();
    renderCharacterData();
});
// Save Gacha Code
function saveGachaCode() {
    const newGachaCode = document.getElementById("gachaCodeInput").value.trim();

    if (newGachaCode) {
        currentAltSelf.gachaCode = newGachaCode; // Save to the current alternative self
        localStorage.setItem(altSelfKey, JSON.stringify(altSelfList)); // Persist data
        renderGachaCode(); // Update the display
        alert("Gacha Code saved!");
    } else {
        alert("Please enter a valid Gacha Code.");
    }
}

// Render Gacha Code
function renderGachaCode() {
    const gachaCodeDisplay = document.getElementById("gachaCodeDisplay");

    if (currentAltSelf.gachaCode) {
        gachaCodeDisplay.textContent = `Gacha Code: ${currentAltSelf.gachaCode}`;
    } else {
        gachaCodeDisplay.textContent = "No Gacha Code Set";
    }
}

// Call this in the renderAltSelfDetails function to load the Gacha Code on page load
function renderAltSelfDetails() {
    try {
        const nameElement = document.getElementById("altSelfName");
        const colorPicker = document.getElementById("altSelfColor");
        const detailsText = document.getElementById("altSelfDetails");

        if (nameElement) nameElement.textContent = currentAltSelf?.name || "Unknown Name";
        if (colorPicker) colorPicker.value = currentAltSelf?.color || "#000000"; // Default color
        if (detailsText) detailsText.value = currentAltSelf?.details || "";

        renderGachaCode(); // Render Gacha Code
    } catch (e) {
        console.error("Error rendering Alternative Self details:", e);
    }
}
// Initialize Pickr
const pickr = Pickr.create({
    el: '#colorPickerContainer',
    theme: 'classic', // or 'monolith', or 'nano'
    default: currentAltSelf?.color || '#000000', // Default to saved color or black

    components: {
        // Main components
        preview: true,
        opacity: true,
        hue: true,

        // Input / output Options
        interaction: {
            hex: true,
            rgba: true,
            hsla: true,
            input: true,
            save: true, // Show save button
        },
    },
});

// Handle color change events
pickr.on('save', (color) => {
    const newColor = color.toHEXA().toString();
    currentAltSelf.color = newColor; // Save to the current Alternative Self object
    localStorage.setItem(altSelfKey, JSON.stringify(altSelfList)); // Persist changes
    alert('Color saved!');
});

// Optional: Update UI on color pick (live preview)
pickr.on('change', (color) => {
    document.body.style.backgroundColor = color.toHEXA().toString(); // Example of live preview
});
// Render Profile Picture
function renderProfilePicture() {
    const profilePicture = document.getElementById("profilePicture");
    profilePicture.src = currentAltSelf.profilePicture || "default-image.png";
}

// Save Profile Picture
function saveProfilePicture() {
    const fileInput = document.getElementById("profilePictureUpload");
    const urlInput = document.getElementById("profilePictureURL");
    const profilePicture = document.getElementById("profilePicture");

    if (fileInput.files.length > 0) {
        // Handle file upload
        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.onload = function (event) {
            const imageData = event.target.result; // Base64 string
            currentAltSelf.profilePicture = imageData; // Save to current alternative self
            localStorage.setItem(altSelfKey, JSON.stringify(altSelfList)); // Persist changes
            profilePicture.src = imageData; // Update UI
            alert("Profile picture saved!");
        };
        reader.readAsDataURL(file);
    } else if (urlInput.value.trim() !== "") {
        // Handle URL input
        const imageUrl = urlInput.value.trim();
        currentAltSelf.profilePicture = imageUrl; // Save to current alternative self
        localStorage.setItem(altSelfKey, JSON.stringify(altSelfList)); // Persist changes
        profilePicture.src = imageUrl; // Update UI
        alert("Profile picture saved!");
    } else {
        alert("Please upload an image or enter a valid URL.");
    }
}

// Call this in the renderAltSelfDetails function to load the profile picture on page load
function renderAltSelfDetails() {
    try {
        const nameElement = document.getElementById("altSelfName");
        const colorPicker = document.getElementById("altSelfColor");
        const detailsText = document.getElementById("altSelfDetails");

        if (nameElement) nameElement.textContent = currentAltSelf?.name || "Unknown Name";
        if (colorPicker) colorPicker.value = currentAltSelf?.color || "#000000"; // Default color
        if (detailsText) detailsText.value = currentAltSelf?.details || "";

        renderGachaCode(); // Render Gacha Code
        renderProfilePicture(); // Render Profile Picture
    } catch (e) {
        console.error("Error rendering Alternative Self details:", e);
    }
}
