document.addEventListener('DOMContentLoaded', () => {
    const humanName = localStorage.getItem('currentHuman'); // Get the current human's name
    document.getElementById('humanName').textContent = humanName; // Display the name
    loadHumanDetails(humanName); // Load additional details about the human
    loadAppearanceDetails(humanName); // Load appearance details
    loadBackstoryDetails(humanName); // Load backstory details
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

function loadHumanDetails(humanName) {
    const detailsDiv = document.getElementById('humanDetails');
    detailsDiv.innerHTML = ''; // Clear previous content
    detailsDiv.innerHTML = `
        <p>Name: ${humanName}</p>
        <p>Additional info about ${humanName} can go here.</p>
        <button onclick="deleteHuman('${humanName}')">Delete Human</button>
    `;
}

function deleteHuman(humanName) {
    const humans = JSON.parse(localStorage.getItem('humans')) || {};
    const currentAU = localStorage.getItem('currentAU'); // Get current AU from local storage

    if (humans[currentAU]) {
        const updatedHumans = humans[currentAU].filter(h => h.name !== humanName);

        if (updatedHumans.length > 0) {
            humans[currentAU] = updatedHumans;
        } else {
            delete humans[currentAU];
        }

        localStorage.setItem('humans', JSON.stringify(humans));
        alert(`${humanName} has been deleted!`);

        window.location.href = '../html/au.html'; 
    }
}

// Preview image function
function previewImage(event) {
    const imagePreview = document.getElementById('imagePreview');
    imagePreview.src = URL.createObjectURL(event.target.files[0]);
    imagePreview.style.display = 'block';
}

// Save appearance details
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
        imageSrc: document.getElementById('imagePreview').src
    };

    const humans = JSON.parse(localStorage.getItem('humans')) || {};
    const currentAU = localStorage.getItem('currentAU');
    const currentHuman = localStorage.getItem('currentHuman');

    if (!humans[currentAU]) {
        humans[currentAU] = [];
    }

    const humanIndex = humans[currentAU].findIndex(h => h.name === currentHuman);
    if (humanIndex === -1) {
        humans[currentAU].push({ name: currentHuman, appearance });
    } else {
        humans[currentAU][humanIndex].appearance = appearance;
    }

    localStorage.setItem('humans', JSON.stringify(humans));
    alert('Appearance saved successfully!');

    loadAppearanceDetails(currentHuman);
}

// Load appearance details
function loadAppearanceDetails(humanName) {
    const appearanceDiv = document.getElementById('appearanceDetails');
    const humans = JSON.parse(localStorage.getItem('humans')) || {};
    const currentAU = localStorage.getItem('currentAU');

    appearanceDiv.innerHTML = '';
    if (humans[currentAU]) {
        const human = humans[currentAU].find(h => h.name === humanName);
        if (human && human.appearance) {
            const appearance = human.appearance;
            appearanceDiv.innerHTML = `
                <div>
                    <p><strong>Skin Color/Main Color:</strong> <span style="background-color: ${appearance.skinColor}; width: 20px; height: 20px; display: inline-block;"></span> (${appearance.skinColor})</p>
                    <p><strong>Eye Color:</strong> <span style="background-color: ${appearance.eyeColor}; width: 20px; height: 20px; display: inline-block;"></span> (${appearance.eyeColor})</p>
                    <p><strong>Hair Color/Secondary Color:</strong> <span style="background-color: ${appearance.hairColor}; width: 20px; height: 20px; display: inline-block;"></span> (${appearance.hairColor})</p>
                    <p><strong>Hair Length/Texture:</strong> ${appearance.hairLength}</p>
                    <p><strong>Hair Structure/Material:</strong> ${appearance.hairStructure}</p>
                    <p><strong>Hair Style/Creator:</strong> ${appearance.hairStyle}</p>
                    <p><strong>Clothing Style:</strong> ${appearance.clothingStyle}</p>
                    <p><strong>Birth Year/Creation Year:</strong> ${appearance.birthYear}</p>
                    <p><strong>Death Year/Last Year Of Usage:</strong> ${appearance.deathYear}</p>
                    <p><strong>Extras:</strong> ${appearance.extras}</p>
                    <div style="text-align: center;">
                        ${appearance.imageSrc ? `<img src="${appearance.imageSrc}" alt="Human Image" style="max-width: 200px;">` : ''}
                    </div>
                </div>
            `;
        } else {
            appearanceDiv.innerHTML = '<p>No appearance details available.</p>';
        }
    } else {
        appearanceDiv.innerHTML = '<p>No appearance details available.</p>';
    }
}

// Save backstory details
function saveBackstory() {
    const backstory = {
        causeOfDeath: document.getElementById('causeOfDeath').value,
        family: document.getElementById('family').value,
        age: document.getElementById('age').value,
        friends: document.getElementById('friends').value,
        enemies: document.getElementById('enemies').value,
        nicknames: document.getElementById('nicknames').value,
    };

    const humans = JSON.parse(localStorage.getItem('humans')) || {};
    const currentAU = localStorage.getItem('currentAU');
    const currentHuman = localStorage.getItem('currentHuman');

    if (!humans[currentAU]) {
        humans[currentAU] = [];
    }

    const humanIndex = humans[currentAU].findIndex(h => h.name === currentHuman);
    if (humanIndex === -1) {
        humans[currentAU].push({ name: currentHuman, backstory });
    } else {
        humans[currentAU][humanIndex].backstory = backstory;
    }

    localStorage.setItem('humans', JSON.stringify(humans));
    alert('Backstory saved successfully!');

    loadBackstoryDetails(currentHuman);
}

// Load backstory details
function loadBackstoryDetails(humanName) {
    const backstoryDiv = document.getElementById('backstoryDetails');
    const humans = JSON.parse(localStorage.getItem('humans')) || {};
    const currentAU = localStorage.getItem('currentAU');

    backstoryDiv.innerHTML = '';
    if (humans[currentAU]) {
        const human = humans[currentAU].find(h => h.name === humanName);
        if (human && human.backstory) {
            const backstory = human.backstory;
            backstoryDiv.innerHTML = `
                <div>
                    <p><strong>Cause of Death/Reason For Diactivation:</strong> ${backstory.causeOfDeath}</p>
                    <p><strong>Family/Group:</strong> ${backstory.family}</p>
                    <p><strong>Age/Years Of Usage:</strong> ${backstory.age}</p>
                    <p><strong>Friends:</strong> ${backstory.friends}</p>
                    <p><strong>Enemies:</strong> ${backstory.enemies}</p>
                    <p><strong>Nicknames:</strong> ${backstory.nicknames}</p>
                </div>
            `;
        } else {
            backstoryDiv.innerHTML = '<p>No backstory details available.</p>';
        }
    } else {
        backstoryDiv.innerHTML = '<p>No backstory details available.</p>';
    }
}
