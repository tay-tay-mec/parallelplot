document.addEventListener('DOMContentLoaded', () => {
    initializePage();
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

function initializePage() {
    const auTitleElement = document.getElementById('auTitle');
    const toggleButton = document.getElementById('lowContrastToggle');
    
    // Display the AU name if it exists in localStorage
    const auTitle = localStorage.getItem('currentAU');
    if (auTitleElement && auTitle) {
        auTitleElement.textContent = auTitle;
    }

    // Load humans and timeline events for the AU
    loadHumans();
    loadTimelineEvents();  // Updated to load saved events


    }


// HUMAN FUNCTIONS

function loadHumans() {
    const humanList = document.getElementById('humanList');
    if (!humanList) return;

    humanList.innerHTML = ''; // Clear the list before loading

    const humans = JSON.parse(localStorage.getItem('humans')) || {};
    const currentAU = localStorage.getItem('currentAU');
    const currentHumans = humans[currentAU] || [];

    currentHumans.forEach(human => {
        addHumanToList(human.name, human.color || '#FFFFFF');
    });
}

// Add a new human and save to local storage
function addHuman() {
    const humanName = document.getElementById('humanName').value;
    if (!humanName) return;

    const humans = JSON.parse(localStorage.getItem('humans')) || {};
    const currentAU = localStorage.getItem('currentAU');

    if (!humans[currentAU]) {
        humans[currentAU] = [];
    }

    if (!humans[currentAU].some(human => human.name === humanName)) {
        humans[currentAU].push({ name: humanName, color: '#FFFFFF' });
        localStorage.setItem('humans', JSON.stringify(humans));
        addHumanToList(humanName, '#FFFFFF');
    }

    document.getElementById('humanName').value = '';
}

// Display a human in the list with options
function addHumanToList(humanName, color) {
    const humanList = document.getElementById('humanList');
    if (!humanList) return;

    const li = document.createElement('li');
    li.className = 'human-item';

    const humanButton = document.createElement('button');
    humanButton.textContent = humanName;
    humanButton.className = 'human-button';
    humanButton.style.backgroundColor = color;
    humanButton.onclick = () => {
        localStorage.setItem('currentHuman', humanName);
        window.location.href = '../html/human.html';
    };

    const colorPicker = document.createElement('input');
    colorPicker.type = 'color';
    colorPicker.value = color;
    colorPicker.className = 'color-picker';
    colorPicker.oninput = () => {
        applyHumanColor(humanName, colorPicker.value);
        humanButton.style.backgroundColor = colorPicker.value;
    };

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = 'edit-button';
    editButton.onclick = () => {
        editHuman(humanName);
    };

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-button';
    deleteButton.onclick = () => {
        deleteHuman(humanName);
    };

    li.appendChild(humanButton);
    li.appendChild(colorPicker);
    li.appendChild(editButton);
    li.appendChild(deleteButton);
    humanList.appendChild(li);
}

// Apply and save color for human
function applyHumanColor(humanName, color) {
    const humans = JSON.parse(localStorage.getItem('humans')) || {};
    const currentAU = localStorage.getItem('currentAU');
    
    if (humans[currentAU]) {
        humans[currentAU] = humans[currentAU].map(human => 
            human.name === humanName ? { ...human, color } : human
        );
        localStorage.setItem('humans', JSON.stringify(humans));
    }
}

// Edit human's name
function editHuman(oldName) {
    const newName = prompt("Enter new name:", oldName);
    if (newName && newName !== oldName) {
        const humans = JSON.parse(localStorage.getItem('humans')) || {};
        const currentAU = localStorage.getItem('currentAU');

        if (humans[currentAU]) {
            humans[currentAU] = humans[currentAU].map(human => 
                human.name === oldName ? { ...human, name: newName } : human
            );
            localStorage.setItem('humans', JSON.stringify(humans));
            loadHumans(); // Reload the humans list to reflect the updated name
        }
    }
}

// Delete a human
function deleteHuman(humanName) {
    const humans = JSON.parse(localStorage.getItem('humans')) || {};
    const currentAU = localStorage.getItem('currentAU');
    
    if (humans[currentAU]) {
        humans[currentAU] = humans[currentAU].filter(human => human.name !== humanName);
        localStorage.setItem('humans', JSON.stringify(humans));
        loadHumans();
    }
}

// TIMELINE FUNCTIONS

let timelineEvents = []; // Store events for the current AU in memory

function loadTimelineEvents() {
    const storedEvents = JSON.parse(localStorage.getItem("timelineEvents")) || {};
    const currentAU = localStorage.getItem("currentAU");
    timelineEvents = storedEvents[currentAU] || [];
    renderTimeline();
}

function renderTimeline() {
    const timelineBox = document.getElementById("timeline-box");
    if (!timelineBox) return;

    timelineBox.innerHTML = ""; // Clear the timeline display

    timelineEvents.forEach((event, index) => {
        const eventElement = document.createElement("div");
        eventElement.className = "timeline-event";
        eventElement.innerHTML = `
            <h3>${event.title}</h3>
            <p>${event.description}</p>
            <button onclick="editEvent(${event.id})">Edit</button>
            <button onclick="deleteEvent(${event.id})">Delete</button>
            <button onclick="moveEventUp(${index})">Move Up</button>
            <button onclick="moveEventDown(${index})">Move Down</button>
        `;
        timelineBox.appendChild(eventElement);
    });
    saveTimelineEvents();
}

// Add a new timeline event
function addTimelineEvent() {
    const title = document.getElementById("event-title").value;
    const description = document.getElementById("event-description").value;

    if (title && description) {
        const event = { title, description, id: Date.now() };
        timelineEvents.push(event);
        renderTimeline();

        document.getElementById("event-title").value = ""; // Clear input
        document.getElementById("event-description").value = "";
    }
}

// Save timeline events to localStorage
function saveTimelineEvents() {
    const currentAU = localStorage.getItem("currentAU");
    const storedEvents = JSON.parse(localStorage.getItem("timelineEvents")) || {};
    storedEvents[currentAU] = timelineEvents;
    localStorage.setItem("timelineEvents", JSON.stringify(storedEvents));
}

// Edit a timeline event
function editEvent(id) {
    const event = timelineEvents.find(event => event.id === id);
    if (event) {
        const newTitle = prompt("Edit title:", event.title);
        const newDescription = prompt("Edit description:", event.description);

        if (newTitle !== null && newDescription !== null) {
            event.title = newTitle;
            event.description = newDescription;
            renderTimeline();
        }
    }
}

// Delete a timeline event
function deleteEvent(id) {
    timelineEvents = timelineEvents.filter(event => event.id !== id);
    renderTimeline();
}

// Move an event up in the list
function moveEventUp(index) {
    if (index > 0) {
        [timelineEvents[index - 1], timelineEvents[index]] = [timelineEvents[index], timelineEvents[index - 1]];
        renderTimeline();
    }
}

function moveEventDown(index) {
    if (index < timelineEvents.length - 1) {
        [timelineEvents[index + 1], timelineEvents[index]] = [timelineEvents[index], timelineEvents[index + 1]];
        renderTimeline();
    }
}

