document.addEventListener('DOMContentLoaded', () => {
    const auTitle = localStorage.getItem('currentAU'); // Get the current AU's name
    document.getElementById('auTitle').textContent = auTitle; // Display the name
    loadHumans(); // Load humans for the AU
});

function loadHumans() {
    const humanList = document.getElementById('humanList');
    const humans = JSON.parse(localStorage.getItem('humans')) || {};

    const currentAU = localStorage.getItem('currentAU'); // Get current AU from local storage
    const currentHumans = humans[currentAU] || []; // Get humans for the current AU

    currentHumans.forEach(humanName => {
        addHumanToList(humanName);
    });
}

function addHuman() {
    const humanName = document.getElementById('humanName').value;
    if (!humanName) return; // Don't add if input is empty

    const humans = JSON.parse(localStorage.getItem('humans')) || {};
    const currentAU = localStorage.getItem('currentAU'); // Get current AU from local storage

    // If current AU doesn't exist in the humans object, create it
    if (!humans[currentAU]) {
        humans[currentAU] = [];
    }
    
    // Add human to current AU
    if (!humans[currentAU].includes(humanName)) {
        humans[currentAU].push(humanName);
        localStorage.setItem('humans', JSON.stringify(humans)); // Save updated humans list
        addHumanToList(humanName); // Add to list in UI
    }
    
    document.getElementById('humanName').value = ''; // Clear input
}

function addHumanToList(humanName) {
    const humanList = document.getElementById('humanList');
    const li = document.createElement('li');
    li.className = 'human-item';

    // Create button for the human
    const humanButton = document.createElement('button');
    humanButton.textContent = humanName;
    humanButton.className = 'human-button';
    humanButton.onclick = () => {
        localStorage.setItem('currentHuman', humanName); // Store current human's name
        window.location.href = '../html/human.html'; // Redirect to human info page
    };

    // Create Delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-button';
    deleteButton.onclick = () => {
        deleteHuman(humanName);
    };

    li.appendChild(humanButton);
    li.appendChild(deleteButton);
    humanList.appendChild(li);
}

function deleteHuman(humanName) {
    const humans = JSON.parse(localStorage.getItem('humans')) || {};
    const currentAU = localStorage.getItem('currentAU'); // Get current AU from local storage

    // Remove human from current AU
    if (humans[currentAU]) {
        humans[currentAU] = humans[currentAU].filter(human => human !== humanName);
        localStorage.setItem('humans', JSON.stringify(humans)); // Save updated humans list
        loadHumans(); // Refresh the list
    }
}
