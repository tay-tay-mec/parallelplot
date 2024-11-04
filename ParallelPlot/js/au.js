document.addEventListener('DOMContentLoaded', () => {
    initializePage();
    setupLowContrastToggle();
    loadFamilies();
});

function initializePage() {
    const auTitleElement = document.getElementById('auTitle');
    const auTitle = localStorage.getItem('currentAU');
    if (auTitleElement && auTitle) {
        auTitleElement.textContent = auTitle;
    }

    loadHumans();
    loadFamilies();
    loadTimelineEvents();
}

function setupLowContrastToggle() {
    const toggleButton = document.getElementById('lowContrastToggle');
    if (localStorage.getItem('lowContrast') === 'true') {
        document.body.classList.add('low-contrast');
    }

    toggleButton.addEventListener('click', () => {
        document.body.classList.toggle('low-contrast');
        const isLowContrast = document.body.classList.contains('low-contrast');
        localStorage.setItem('lowContrast', isLowContrast);
    });
}

// HUMAN FUNCTIONS

function loadHumans() {
    const humanList = document.getElementById('humanList');
    if (!humanList) return;

    humanList.innerHTML = '';
    const humans = JSON.parse(localStorage.getItem('humans')) || {};
    const currentAU = localStorage.getItem('currentAU');
    const currentHumans = humans[currentAU] || [];

    currentHumans.forEach(human => {
        addHumanToList(human.name, human.color || '#FFFFFF');
    });
}

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
            loadHumans();
        }
    }
}

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

let timelineEvents = [];

function loadTimelineEvents() {
    const storedEvents = JSON.parse(localStorage.getItem("timelineEvents")) || {};
    const currentAU = localStorage.getItem("currentAU");
    timelineEvents = storedEvents[currentAU] || [];
    renderTimeline();
}

function renderTimeline() {
    const timelineBox = document.getElementById("timeline-box");
    if (!timelineBox) return;

    timelineBox.innerHTML = "";

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

function addTimelineEvent() {
    const title = document.getElementById("event-title").value;
    const description = document.getElementById("event-description").value;

    if (title && description) {
        const event = { title, description, id: Date.now() };
        timelineEvents.push(event);
        renderTimeline();

        document.getElementById("event-title").value = "";
        document.getElementById("event-description").value = "";
    }
}

function saveTimelineEvents() {
    const currentAU = localStorage.getItem("currentAU");
    const storedEvents = JSON.parse(localStorage.getItem("timelineEvents")) || {};
    storedEvents[currentAU] = timelineEvents;
    localStorage.setItem("timelineEvents", JSON.stringify(storedEvents));
}

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

function deleteEvent(id) {
    timelineEvents = timelineEvents.filter(event => event.id !== id);
    renderTimeline();
}

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

// FAMILY FUNCTIONS

function loadFamilies() {
    const familyList = document.getElementById('familyList');
    familyList.innerHTML = '';

    const families = JSON.parse(localStorage.getItem('families')) || {};
    const currentAU = localStorage.getItem('currentAU');
    const currentFamilies = families[currentAU] || [];

    currentFamilies.forEach(family => {
        addFamilyToList(family.name);
    });
}

function addFamily() {
    const familyName = document.getElementById('familyName').value;
    if (!familyName) return;

    const families = JSON.parse(localStorage.getItem('families')) || {};
    const currentAU = localStorage.getItem('currentAU');

    if (!families[currentAU]) {
        families[currentAU] = [];
    }

    if (!families[currentAU].some(family => family.name === familyName)) {
        families[currentAU].push({ name: familyName });
        localStorage.setItem('families', JSON.stringify(families));
        addFamilyToList(familyName);
    }

    document.getElementById('familyName').value = '';
}

function addFamilyToList(familyName) {
    const familyList = document.getElementById('familyList');
    const li = document.createElement('li');

    const familyButton = document.createElement('button');
    familyButton.textContent = familyName;
    familyButton.onclick = () => {
        localStorage.setItem('currentFamily', familyName);
        window.location.href = '../html/familyTree.html';
    };
// Edit button
const editButton = document.createElement('button');
editButton.textContent = 'Edit';
editButton.className = 'edit-button';
editButton.onclick = () => editFamily(familyName);

// Delete button
const deleteButton = document.createElement('button');
deleteButton.textContent = 'Delete';
deleteButton.className = 'delete-button';
deleteButton.onclick = () => deleteFamily(familyName);

// Append elements to list item
li.appendChild(familyButton);
li.appendChild(editButton);
li.appendChild(deleteButton);
familyList.appendChild(li);
    li.appendChild(familyButton);
    familyList.appendChild(li);
}


// Edit a family's name
function editFamily(oldName) {
    const newName = prompt("Enter a new name for the family:", oldName);
    if (newName && newName !== oldName) {
        const families = JSON.parse(localStorage.getItem('families')) || {};
        const currentAU = localStorage.getItem('currentAU');

        // Update family name
        if (families[currentAU]) {
            families[currentAU] = families[currentAU].map(family =>
                family.name === oldName ? { ...family, name: newName } : family
            );
            localStorage.setItem('families', JSON.stringify(families));
            loadFamilies();
        }

        // Update currentFamily if it was the one being edited
        if (localStorage.getItem('currentFamily') === oldName) {
            localStorage.setItem('currentFamily', newName);
        }
    }
}

// Delete a family
function deleteFamily(familyName) {
    if (confirm(`Are you sure you want to delete the family "${familyName}"? This action cannot be undone.`)) {
        const families = JSON.parse(localStorage.getItem('families')) || {};
        const currentAU = localStorage.getItem('currentAU');

        // Remove the family from the current AU's list
        if (families[currentAU]) {
            families[currentAU] = families[currentAU].filter(family => family.name !== familyName);
            localStorage.setItem('families', JSON.stringify(families));
            loadFamilies();
        }

        // Clear currentFamily if it was the one being deleted
        if (localStorage.getItem('currentFamily') === familyName) {
            localStorage.removeItem('currentFamily');
        }
    }
}