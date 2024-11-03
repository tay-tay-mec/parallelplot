document.addEventListener('DOMContentLoaded', () => {
    const humanName = localStorage.getItem('currentHuman'); // Get the current human's name
    document.getElementById('humanName').textContent = humanName; // Display the name
    loadHumanDetails(humanName); // Load additional details about the human
    loadAppearanceDetails(humanName); // Load appearance details
    loadBackstoryDetails(humanName); // Load backstory details
});

function loadHumanDetails(humanName) {
    const detailsDiv = document.getElementById('humanDetails');
    detailsDiv.innerHTML = ''; // Clear previous content
    detailsDiv.innerHTML = `
        <p>Name: ${humanName}</p>
        <p>Additional info about ${humanName} can go here.</p>
        <button onclick="deleteHuman('${humanName}')">Delete Human</button> <!-- Add delete button -->
    `;
}

function deleteHuman(humanName) {
    const humans = JSON.parse(localStorage.getItem('humans')) || {};
    const currentAU = localStorage.getItem('currentAU'); // Get current AU from local storage

    if (humans[currentAU]) {
        // Remove the human from the array
        const updatedHumans = humans[currentAU].filter(h => h.name !== humanName);

        // Update the humans object in local storage
        if (updatedHumans.length > 0) {
            humans[currentAU] = updatedHumans; // Update the list of humans in this AU
        } else {
            delete humans[currentAU]; // If no humans are left, delete the AU entry
        }

        localStorage.setItem('humans', JSON.stringify(humans)); // Save updated humans list
        alert(`${humanName} has been deleted!`);

        // Redirect to AU page or refresh to clear
        window.location.href = '../html/au.html'; 
    }
}

function updateColor(colorInputId, hexInputId, squareId) {
    const colorInput = document.getElementById(colorInputId);
    const hexInput = document.getElementById(hexInputId);
    const square = document.getElementById(squareId);
    square.style.backgroundColor = colorInput.value; // Set the background color of the square
    hexInput.value = colorInput.value; // Set the hex input to the selected color's value
}

function saveAppearance() {
    const appearance = {
        skinColor: document.getElementById('skinColor').value,
        eyeColor: document.getElementById('eyeColor').value,
        hairColor: document.getElementById('hairColor').value,
        hairLength: document.getElementById('hairLength').value,
        hairStructure: document.getElementById('hairStructure').value,
        hairStyle: document.getElementById('hairStyle').value,
        clothingStyle: document.getElementById('clothingStyle').value,
        birthYear: document.getElementById('birthYear').value,
        deathYear: document.getElementById('deathYear').value,
        extras: document.getElementById('extras').value,
    };

    const humans = JSON.parse(localStorage.getItem('humans')) || {};
    const currentAU = localStorage.getItem('currentAU'); // Get current AU from local storage
    const currentHuman = localStorage.getItem('currentHuman'); // Get current human from local storage

    // Ensure there is a place for the current human's appearance
    if (!humans[currentAU]) {
        humans[currentAU] = []; // Create an array for the current AU if it doesn't exist
    }

    // Check if the human already exists in the array
    const humanIndex = humans[currentAU].findIndex(h => h.name === currentHuman);
    if (humanIndex === -1) {
        // If the human doesn't exist, create a new entry
        humans[currentAU].push({ name: currentHuman, appearance });
    } else {
        // If the human exists, update their appearance
        humans[currentAU][humanIndex].appearance = appearance; // Save appearance details
    }

    localStorage.setItem('humans', JSON.stringify(humans)); // Save updated humans list
    alert('Appearance saved successfully!');

    loadAppearanceDetails(currentHuman); // Refresh the appearance details
}

function loadAppearanceDetails(humanName) {
    const appearanceDiv = document.getElementById('appearanceDetails');
    const humans = JSON.parse(localStorage.getItem('humans')) || {};
    const currentAU = localStorage.getItem('currentAU'); // Get current AU from local storage

    appearanceDiv.innerHTML = ''; // Clear previous appearance details
    if (humans[currentAU]) {
        const human = humans[currentAU].find(h => h.name === humanName);
        if (human && human.appearance) {
            const appearance = human.appearance;
            appearanceDiv.innerHTML = `
                <div>
                    <p><strong>Skin Color:</strong> <span style="background-color: ${appearance.skinColor}; width: 20px; height: 20px; display: inline-block;"></span> (${appearance.skinColor})</p>
                    <p><strong>Eye Color:</strong> <span style="background-color: ${appearance.eyeColor}; width: 20px; height: 20px; display: inline-block;"></span> (${appearance.eyeColor})</p>
                    <p><strong>Hair Color:</strong> <span style="background-color: ${appearance.hairColor}; width: 20px; height: 20px; display: inline-block;"></span> (${appearance.hairColor})</p>
                    <p><strong>Hair Length:</strong> ${appearance.hairLength}</p>
                    <p><strong>Hair Structure:</strong> ${appearance.hairStructure}</p>
                    <p><strong>Hair Style:</strong> ${appearance.hairStyle}</p>
                    <p><strong>Clothing Style:</strong> ${appearance.clothingStyle}</p>
                    <p><strong>Birth Year:</strong> ${appearance.birthYear}</p>
                    <p><strong>Death Year:</strong> ${appearance.deathYear}</p>
                    <p><strong>Extras:</strong> ${appearance.extras}</p>
                </div>
            `;
        } else {
            appearanceDiv.innerHTML = '<p>No appearance details available.</p>'; // Message if no details are found
        }
    } else {
        appearanceDiv.innerHTML = '<p>No appearance details available.</p>'; // Message if no humans found
    }
}

function saveBackstory() {
    const backstory = {
        causeOfDeath: document.getElementById('causeOfDeath').value,
        family: document.getElementById('family').value,
        friends: document.getElementById('friends').value,
        enemies: document.getElementById('enemies').value,
        nicknames: document.getElementById('nicknames').value,
    };

    const humans = JSON.parse(localStorage.getItem('humans')) || {};
    const currentAU = localStorage.getItem('currentAU'); // Get current AU from local storage
    const currentHuman = localStorage.getItem('currentHuman'); // Get current human from local storage

    // Ensure there is a place for the current human's backstory
    if (!humans[currentAU]) {
        humans[currentAU] = []; // Create an array for the current AU if it doesn't exist
    }

    // Check if the human already exists in the array
    const humanIndex = humans[currentAU].findIndex(h => h.name === currentHuman);
    if (humanIndex === -1) {
        // If the human doesn't exist, create a new entry
        humans[currentAU].push({ name: currentHuman, backstory });
    } else {
        // If the human exists, update their backstory
        humans[currentAU][humanIndex].backstory = backstory; // Save backstory details
    }

    localStorage.setItem('humans', JSON.stringify(humans)); // Save updated humans list
    alert('Backstory saved successfully!');

    loadBackstoryDetails(currentHuman); // Refresh the backstory details
}

function loadBackstoryDetails(humanName) {
    const backstoryDiv = document.getElementById('backstoryDetails');
    const humans = JSON.parse(localStorage.getItem('humans')) || {};
    const currentAU = localStorage.getItem('currentAU'); // Get current AU from local storage

    backstoryDiv.innerHTML = ''; // Clear previous backstory details
    if (humans[currentAU]) {
        const human = humans[currentAU].find(h => h.name === humanName);
        if (human && human.backstory) {
            const backstory = human.backstory;
            backstoryDiv.innerHTML = `
                <div>
                    <p><strong>Cause of Death:</strong> ${backstory.causeOfDeath}</p>
                    <p><strong>Family:</strong> ${backstory.family}</p>
                    <p><strong>Friends:</strong> ${backstory.friends}</p>
                    <p><strong>Enemies:</strong> ${backstory.enemies}</p>
                    <p><strong>Nicknames:</strong> ${backstory.nicknames}</p>
                </div>
            `;
        } else {
            backstoryDiv.innerHTML = '<p>No backstory details available.</p>'; // Message if no details are found
        }
    } else {
        backstoryDiv.innerHTML = '<p>No backstory details available.</p>'; // Message if no humans found
    }
}
