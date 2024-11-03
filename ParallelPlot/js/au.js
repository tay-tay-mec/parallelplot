document.addEventListener('DOMContentLoaded', () => {
    const auTitle = localStorage.getItem('currentAU'); // Get the current AU's name
    document.getElementById('auTitle').textContent = auTitle; // Display the AU name
    loadHumans(); // Load humans for the AU
    loadTimeline(); // Load timeline events
});
document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('lowContrastToggle');

    // Check if low contrast mode was previously enabled
    if (localStorage.getItem('lowContrast') === 'true') {
        document.body.classList.add('low-contrast');
    }

    toggleButton.addEventListener('click', () => {
        document.body.classList.toggle('low-contrast');
        
        // Save the user's preference in local storage
        const isLowContrast = document.body.classList.contains('low-contrast');
        localStorage.setItem('lowContrast', isLowContrast);
    });
});

function loadHumans() {
    const humanList = document.getElementById('humanList');
    humanList.innerHTML = ''; // Clear the list before loading

    const humans = JSON.parse(localStorage.getItem('humans')) || {};
    const currentAU = localStorage.getItem('currentAU'); // Get current AU from local storage
    const currentHumans = humans[currentAU] || []; // Get humans for the current AU

    currentHumans.forEach(human => {
        addHumanToList(human.name, human.color || '#FFFFFF'); // Load with default color if not set
    });
}

function addHuman() {
    const humanName = document.getElementById('humanName').value;
    if (!humanName) return; // Don't add if input is empty

    const humans = JSON.parse(localStorage.getItem('humans')) || {};
    const currentAU = localStorage.getItem('currentAU'); // Get current AU from local storage

    // Initialize AU if it doesn't exist
    if (!humans[currentAU]) {
        humans[currentAU] = [];
    }

    // Add human only if not already in list
    if (!humans[currentAU].some(human => human.name === humanName)) {
        humans[currentAU].push({ name: humanName, color: '#FFFFFF' }); // Default color is white
        localStorage.setItem('humans', JSON.stringify(humans)); // Save updated humans list
        addHumanToList(humanName, '#FFFFFF'); // Add to UI with default color
    }
    
    document.getElementById('humanName').value = ''; // Clear input
}

function addHumanToList(humanName, color) {
    const humanList = document.getElementById('humanList');
    const li = document.createElement('li');
    li.className = 'human-item';

    // Create button for the human with background color
    const humanButton = document.createElement('button');
    humanButton.textContent = humanName;
    humanButton.className = 'human-button';
    humanButton.style.backgroundColor = color;
    humanButton.onclick = () => {
        localStorage.setItem('currentHuman', humanName); // Store current human's name
        window.location.href = '../html/human.html'; // Redirect to human info page
    };

    // Create color picker for the human
    const colorPicker = document.createElement('input');
    colorPicker.type = 'color';
    colorPicker.value = color;
    colorPicker.className = 'color-picker';
    colorPicker.oninput = () => {
        applyHumanColor(humanName, colorPicker.value); // Update color on input change
        humanButton.style.backgroundColor = colorPicker.value; // Update the button's background color
    };

    // Create Delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-button';
    deleteButton.onclick = () => {
        deleteHuman(humanName);
    };

    li.appendChild(humanButton);
    li.appendChild(colorPicker); // Append color picker next to the human name
    li.appendChild(deleteButton);
    humanList.appendChild(li);
}

function applyHumanColor(humanName, color) {
    const humans = JSON.parse(localStorage.getItem('humans')) || {};
    const currentAU = localStorage.getItem('currentAU');

    if (humans[currentAU]) {
        humans[currentAU] = humans[currentAU].map(human => {
            if (human.name === humanName) {
                return { name: human.name, color: color }; // Update color
            }
            return human;
        });
        localStorage.setItem('humans', JSON.stringify(humans)); // Save updated humans list
    }
}

function deleteHuman(humanName) {
    const humans = JSON.parse(localStorage.getItem('humans')) || {};
    const currentAU = localStorage.getItem('currentAU'); // Get current AU from local storage

    // Remove human from current AU
    if (humans[currentAU]) {
        humans[currentAU] = humans[currentAU].filter(human => human.name !== humanName);
        localStorage.setItem('humans', JSON.stringify(humans)); // Save updated humans list
        loadHumans(); // Refresh the list
    }
}

// Timeline Functions
function loadTimeline() {
    const timelineDisplay = document.getElementById('timelineDisplay');
    timelineDisplay.innerHTML = ''; // Clear previous timeline events

    const timeline = JSON.parse(localStorage.getItem('timeline')) || {};
    const currentAU = localStorage.getItem('currentAU');
    const events = timeline[currentAU] || [];

    events.forEach(event => {
        addTimelineEventToDisplay(event.date, event.description);
    });
}

function addTimelineEvent() {
    const eventDate = document.getElementById('eventDate').value;
    const eventDescription = document.getElementById('eventDescription').value;
    if (!eventDate || !eventDescription) return; // Only add if both date and description are filled

    const timeline = JSON.parse(localStorage.getItem('timeline')) || {};
    const currentAU = localStorage.getItem('currentAU');

    if (!timeline[currentAU]) {
        timeline[currentAU] = [];
    }

    timeline[currentAU].push({ date: eventDate, description: eventDescription });
    localStorage.setItem('timeline', JSON.stringify(timeline)); // Save updated timeline

    addTimelineEventToDisplay(eventDate, eventDescription); // Add to display
    document.getElementById('eventDate').value = ''; // Clear input fields
    document.getElementById('eventDescription').value = '';
}

function addTimelineEventToDisplay(date, description) {
    const timelineDisplay = document.getElementById('timelineDisplay');
    const eventDiv = document.createElement('div');
    eventDiv.className = 'timeline-event';

    const dateDiv = document.createElement('div');
    dateDiv.className = 'event-date';
    dateDiv.textContent = date;

    const descriptionDiv = document.createElement('div');
    descriptionDiv.className = 'event-description';
    descriptionDiv.textContent = description;

    eventDiv.appendChild(dateDiv);
    eventDiv.appendChild(descriptionDiv);
    timelineDisplay.appendChild(eventDiv);
}
