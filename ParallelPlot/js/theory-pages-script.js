// Load the theories from localStorage
function loadTheories() {
    const theories = JSON.parse(localStorage.getItem('theories')) || [];
    const theoriesListContainer = document.getElementById('theoriesList');
    theoriesListContainer.innerHTML = ''; // Clear current list

    theories.forEach((theory, index) => {
        const theoryElement = document.createElement('div');
        theoryElement.className = 'theory-item';
        theoryElement.innerHTML = `
            <h3>${theory.title}</h3>
            <p>${theory.description}</p>
            <button onclick="editTheory(${index})">Edit</button>
            <button onclick="deleteTheory(${index})">Delete</button>
        `;
        theoriesListContainer.appendChild(theoryElement);
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

// Add a new theory to the list
function addTheory() {
    const title = document.getElementById('theoryTitle').value.trim();
    const description = document.getElementById('theoryDescription').value.trim();

    if (title && description) {
        const theories = JSON.parse(localStorage.getItem('theories')) || [];
        theories.push({ title, description });
        localStorage.setItem('theories', JSON.stringify(theories));

        document.getElementById('theoryTitle').value = '';
        document.getElementById('theoryDescription').value = '';

        loadTheories(); // Reload theories list
    } else {
        alert('Please provide both a title and description.');
    }
}

// Edit an existing theory
function editTheory(index) {
    const theories = JSON.parse(localStorage.getItem('theories'));
    const theory = theories[index];

    const newTitle = prompt('Edit Theory Title', theory.title);
    const newDescription = prompt('Edit Theory Description', theory.description);

    if (newTitle !== null && newDescription !== null) {
        theories[index] = { title: newTitle, description: newDescription };
        localStorage.setItem('theories', JSON.stringify(theories));
        loadTheories();
    }
}

// Delete a theory
function deleteTheory(index) {
    if (confirm('Are you sure you want to delete this theory?')) {
        const theories = JSON.parse(localStorage.getItem('theories'));
        theories.splice(index, 1);
        localStorage.setItem('theories', JSON.stringify(theories));
        loadTheories();
    }
}

// Set up event listeners
document.getElementById('addTheoryButton').addEventListener('click', addTheory);

// Load theories on page load
window.onload = loadTheories;
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
function goBack() {
    window.history.back();
}