// Retrieve the selected AU ID from localStorage
const currentAUId = localStorage.getItem("currentAUId");

if (!currentAUId) {
    // Redirect to the main page if no AU is selected
    window.location.href = "index.html";
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

// Load the AU content for the current AU
const auContentKey = `auContent-${currentAUId}`;
let auContent = localStorage.getItem(auContentKey) || "";

// Populate the AU page with saved content
const contentArea = document.getElementById("auContent");
contentArea.value = auContent;

// Save the AU content when changes are made
contentArea.addEventListener("input", () => {
    localStorage.setItem(auContentKey, contentArea.value);
});

// Manage characters for the current AU
const characterListKey = `characterList-${currentAUId}`;
let characterList = JSON.parse(localStorage.getItem(characterListKey)) || [];

// Save the character list
function saveCharacterList() {
    localStorage.setItem(characterListKey, JSON.stringify(characterList));
}

// Render the character list
function renderCharacterList() {
    const characterListContainer = document.getElementById("characterList");
    characterListContainer.innerHTML = '';

    characterList.forEach((character, index) => {
        const characterItem = document.createElement("div");
        characterItem.className = "character-item";
        characterItem.style.backgroundColor = character.color;

        characterItem.innerHTML = `
            <button class="character-button" onclick="navigateToCharacter(${character.id})">${character.name}</button>
            <button onclick="editCharacter(${character.id})" class="edit-character">Edit</button>
            <button onclick="moveCharacterUp(${index})">Move Up</button>
            <button onclick="moveCharacterDown(${index})">Move Down</button>
            <button onclick="deleteCharacter(${index})">Delete</button>
            <input type="color" value="${character.color}" onchange="changeCharacterColor(${index}, this.value)" />
        `;
        characterListContainer.appendChild(characterItem);
    });
}

// Add a new character
function addCharacter() {
    const characterName = document.getElementById("newCharacterName").value.trim();

    if (characterName) {
        const character = {
            id: Date.now(), // Unique ID
            name: characterName,
            color: "#FFD700", // Default color
        };

        characterList.push(character);
        document.getElementById("newCharacterName").value = ''; // Clear input
        saveCharacterList();
        renderCharacterList();
    }
}

// Navigate to the character's page
function navigateToCharacter(id) {
    localStorage.setItem("currentCharacterId", id); // Store selected character ID
    window.location.href = "character-page.html";
}

// Edit a character name
function editCharacter(id) {
    const newName = prompt("Enter new name for the character:", characterList.find(c => c.id === id).name);
    if (newName) {
        const character = characterList.find(c => c.id === id);
        character.name = newName;
        saveCharacterList();
        renderCharacterList();
    }
}

// Move a character up
function moveCharacterUp(index) {
    if (index > 0) {
        const temp = characterList[index];
        characterList[index] = characterList[index - 1];
        characterList[index - 1] = temp;
        saveCharacterList();
        renderCharacterList();
    }
}

// Move a character down
function moveCharacterDown(index) {
    if (index < characterList.length - 1) {
        const temp = characterList[index];
        characterList[index] = characterList[index + 1];
        characterList[index + 1] = temp;
        saveCharacterList();
        renderCharacterList();
    }
}

// Delete a character
function deleteCharacter(index) {
    if (confirm("Are you sure you want to delete this character?")) {
        characterList.splice(index, 1);
        saveCharacterList();
        renderCharacterList();
    }
}

// Change a character's color
function changeCharacterColor(index, color) {
    characterList[index].color = color;
    saveCharacterList();
    renderCharacterList();
}

// Render the character list on page load
renderCharacterList();

// --- Timeline ---
const timelineListKey = `timelineList-${currentAUId}`;
let timelineList = JSON.parse(localStorage.getItem(timelineListKey)) || [];

function saveTimelineList() {
    localStorage.setItem(timelineListKey, JSON.stringify(timelineList));
}

function renderTimeline() {
    const timelineListContainer = document.getElementById("timelineList");
    timelineListContainer.innerHTML = "";

    timelineList.forEach((event, index) => {
        const timelineItem = document.createElement("div");
        timelineItem.className = "timeline-item";
        timelineItem.style.backgroundColor = event.color;

        timelineItem.innerHTML = `
            <div>
                <strong>${event.date}</strong>: ${event.description}
            </div>
            <button onclick="editEvent(${event.id})">Edit</button>
            <button onclick="moveEventUp(${index})">Move Up</button>
            <button onclick="moveEventDown(${index})">Move Down</button>
            <button onclick="deleteEvent(${index})">Delete</button>
            <input type="color" value="${event.color}" onchange="changeEventColor(${index}, this.value)">
        `;
        timelineListContainer.appendChild(timelineItem);
    });
}

function addEvent() {
    const date = document.getElementById("eventDate").value;
    const description = document.getElementById("eventDescription").value.trim();

    if (date && description) {
        const event = {
            id: Date.now(),
            date: date,
            description: description,
            color: "#D3D3D3", // Default color
        };

        timelineList.push(event);
        document.getElementById("eventDate").value = "";
        document.getElementById("eventDescription").value = "";
        saveTimelineList();
        renderTimeline();
    }
}

function editEvent(id) {
    const event = timelineList.find(e => e.id === id);
    const newDescription = prompt("Edit description:", event.description);
    if (newDescription) {
        event.description = newDescription;
        saveTimelineList();
        renderTimeline();
    }
}

function moveEventUp(index) {
    if (index > 0) {
        [timelineList[index - 1], timelineList[index]] = [timelineList[index], timelineList[index - 1]];
        saveTimelineList();
        renderTimeline();
    }
}

function moveEventDown(index) {
    if (index < timelineList.length - 1) {
        [timelineList[index], timelineList[index + 1]] = [timelineList[index + 1], timelineList[index]];
        saveTimelineList();
        renderTimeline();
    }
}

function deleteEvent(index) {
    if (confirm("Delete this event?")) {
        timelineList.splice(index, 1);
        saveTimelineList();
        renderTimeline();
    }
}

function changeEventColor(index, color) {
    timelineList[index].color = color;
    saveTimelineList();
    renderTimeline();
}

// Render timeline on page load
renderTimeline();

// --- Families ---
const familyListKey = `familyList-${currentAUId}`;
let familyList = JSON.parse(localStorage.getItem(familyListKey)) || [];

function saveFamilyList() {
    localStorage.setItem(familyListKey, JSON.stringify(familyList));
}

function renderFamilyList() {
    const familyListContainer = document.getElementById("familyList");
    familyListContainer.innerHTML = "";

    familyList.forEach((family, index) => {
        const familyItem = document.createElement("div");
        familyItem.className = "family-item";
        familyItem.style.backgroundColor = family.color;

        familyItem.innerHTML = `
            <button class="family-button" onclick="navigateToFamily(${family.id})">${family.name}</button>
            <button onclick="editFamily(${family.id})">Edit</button>
            <button onclick="moveFamilyUp(${index})">▲</button>
            <button onclick="moveFamilyDown(${index})">▼</button>
            <button onclick="deleteFamily(${index})">Delete</button>
            <input type="color" value="${family.color}" onchange="changeFamilyColor(${index}, this.value)">
        `;
        familyListContainer.appendChild(familyItem);
    });
}

function addFamily() {
    const familyName = document.getElementById("newFamilyName").value.trim();

    if (familyName) {
        const family = {
            id: Date.now(),
            name: familyName,
            color: "#ADD8E6", // Default color
        };

        familyList.push(family);
        document.getElementById("newFamilyName").value = "";
        saveFamilyList();
        renderFamilyList();
    }
}

function navigateToFamily(id) {
    localStorage.setItem("currentFamilyId", id);
    window.location.href = "family-page.html";
}

function editFamily(id) {
    const newName = prompt("Enter new name:", familyList.find(f => f.id === id).name);
    if (newName) {
        familyList.find(f => f.id === id).name = newName;
        saveFamilyList();
        renderFamilyList();
    }
}

function moveFamilyUp(index) {
    if (index > 0) {
        [familyList[index - 1], familyList[index]] = [familyList[index], familyList[index - 1]];
        saveFamilyList();
        renderFamilyList();
    }
}

function moveFamilyDown(index) {
    if (index < familyList.length - 1) {
        [familyList[index], familyList[index + 1]] = [familyList[index + 1], familyList[index]];
        saveFamilyList();
        renderFamilyList();
    }
}

function deleteFamily(index) {
    if (confirm("Delete this family?")) {
        familyList.splice(index, 1);
        saveFamilyList();
        renderFamilyList();
    }
}

function changeFamilyColor(index, color) {
    familyList[index].color = color;
    saveFamilyList();
    renderFamilyList();
}

// Render family list on page load
renderFamilyList();
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
    currentAU.color = newColor; // Save to the current Alternative Self object
    localStorage.setItem(aufKey, JSON.stringify(auList)); // Persist changes
    alert('Color saved!');
});

// Optional: Update UI on color pick (live preview)
pickr.on('change', (color) => {
    document.body.style.backgroundColor = color.toHEXA().toString(); // Example of live preview
});
function goBack() {
    window.history.back();
}

// Function to filter characters based on search input
function filterCharacters() {
    const searchQuery = document.getElementById("searchCharacter").value.toLowerCase();
    const filteredCharacters = characterList.filter(character =>
        character.name.toLowerCase().includes(searchQuery)
    );
    renderFilteredCharacterList(filteredCharacters);
}

// Render only the filtered characters
function renderFilteredCharacterList(filteredList) {
    const characterListContainer = document.getElementById("characterList");
    characterListContainer.innerHTML = '';

    filteredList.forEach((character, index) => {
        const characterItem = document.createElement("div");
        characterItem.className = "character-item";
        characterItem.style.backgroundColor = character.color;

        characterItem.innerHTML = `
            <button class="character-button" onclick="navigateToCharacter(${character.id})">${character.name}</button>
            <button onclick="editCharacter(${character.id})" class="edit-character">Edit</button>
            <button onclick="moveCharacterUp(${index})">Move Up</button>
            <button onclick="moveCharacterDown(${index})">Move Down</button>
            <button onclick="deleteCharacter(${index})">Delete</button>
            <input type="color" value="${character.color}" onchange="changeCharacterColor(${index}, this.value)" />
        `;
        characterListContainer.appendChild(characterItem);
    });
}

// Update the renderCharacterList to work with both full and filtered lists
function renderCharacterList() {
    renderFilteredCharacterList(characterList);
}

// Render the full character list on page load
renderCharacterList();
