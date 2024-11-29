// Retrieve AUs from localStorage when the page loads
let auList = JSON.parse(localStorage.getItem("auList")) || [];

// Save AUs to localStorage
function saveToLocalStorage() {
    localStorage.setItem("auList", JSON.stringify(auList));
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


// Add a new AU
function addAU() {
    const auName = document.getElementById("newAUName").value.trim();

    if (auName) {
        const au = {
            id: Date.now(),  // Unique ID for each AU
            name: auName,
            color: "#4CAF50",  // Default color
        };

        auList.push(au);
        document.getElementById("newAUName").value = '';  // Clear the input
        saveToLocalStorage();  // Save updated list
        renderAUList();
    }
}

// Render the AU list
function renderAUList() {
    const auListContainer = document.getElementById("auList");
    auListContainer.innerHTML = '';  // Clear the existing list

    auList.forEach((au, index) => {
        const auItem = document.createElement("div");
        auItem.className = "au-item";
        auItem.style.backgroundColor = au.color;

        auItem.innerHTML = `
            <button class="au-button" onclick="navigateToAU(${au.id})">${au.name}</button>
            <button onclick="editAU(${au.id})" class="edit-au">Edit</button>
            <button onclick="moveUp(${index})">▲</button>
            <button onclick="moveDown(${index})">▼</button>
            <button onclick="deleteAU(${index})">Delete</button>
            <input type="color" value="${au.color}" onchange="changeColor(${index}, this.value)" />
        `;
        auListContainer.appendChild(auItem);
    });
}

// Navigate to the AU page with the specific ID
function navigateToAU(id) {
    localStorage.setItem("currentAUId", id); // Store the selected AU ID
    window.location.href = "au-page.html";  // Redirect to the AU page
}

// Edit an AU name
function editAU(id) {
    const newName = prompt("Enter new name for the AU:", auList.find(au => au.id === id).name);
    if (newName) {
        const au = auList.find(au => au.id === id);
        au.name = newName;
        saveToLocalStorage();  // Save updated list
        renderAUList();
    }
}

// Move an AU up in the list
function moveUp(index) {
    if (index > 0) {
        const temp = auList[index];
        auList[index] = auList[index - 1];
        auList[index - 1] = temp;
        saveToLocalStorage();  // Save updated list
        renderAUList();
    }
}

// Move an AU down in the list
function moveDown(index) {
    if (index < auList.length - 1) {
        const temp = auList[index];
        auList[index] = auList[index + 1];
        auList[index + 1] = temp;
        saveToLocalStorage();  // Save updated list
        renderAUList();
    }
}

// Delete an AU
function deleteAU(index) {
    if (confirm("Are you sure you want to delete this AU?")) {
        const auId = auList[index].id;
        auList.splice(index, 1);
        localStorage.removeItem(`auContent-${auId}`); // Remove the AU's content from storage
        saveToLocalStorage();  // Save updated list
        renderAUList();
    }
}

// Change the color of an AU
function changeColor(index, color) {
    auList[index].color = color;
    saveToLocalStorage();  // Save updated list
    renderAUList();
}

// Render the AU list on page load
renderAUList();
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
    currentIndex.color = newColor; // Save to the current Alternative Self object
    localStorage.setItem(indexKey, JSON.stringify(indexList)); // Persist changes
    alert('Color saved!');
});

// Optional: Update UI on color pick (live preview)
pickr.on('change', (color) => {
    document.body.style.backgroundColor = color.toHEXA().toString(); // Example of live preview
});
function goBack() {
    window.history.back();
}