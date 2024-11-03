document.addEventListener('DOMContentLoaded', () => {
    const humanName = localStorage.getItem('currentHuman');
    document.getElementById('humanName').textContent = humanName;
    loadHumanDetails(humanName);
    loadAppearanceDetails(humanName);
    loadBackstoryDetails(humanName);
});

function loadHumanDetails(humanName) {
    const detailsDiv = document.getElementById('humanDetails');
    detailsDiv.innerHTML = '';
    detailsDiv.innerHTML = `
        <p>Name: ${humanName}</p>
        <p>Additional info about ${humanName} can go here.</p>
        <button onclick="deleteHuman('${humanName}')">Delete Human</button>
    `;
}

function previewImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('imagePreview').src = e.target.result;
            document.getElementById('imagePreview').style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
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
        species: document.getElementById('species').value,
        extras: document.getElementById('extras').value,
        image: document.getElementById('imagePreview').src // Store the base64 image data
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
                    <p><strong>Skin Color:</strong> <span style="background-color: ${appearance.skinColor}; width: 20px; height: 20px; display: inline-block;"></span> (${appearance.skinColor})</p>
                    <p><strong>Eye Color:</strong> <span style="background-color: ${appearance.eyeColor}; width: 20px; height: 20px; display: inline-block;"></span> (${appearance.eyeColor})</p>
                    <p><strong>Hair Color:</strong> <span style="background-color: ${appearance.hairColor}; width: 20px; height: 20px; display: inline-block;"></span> (${appearance.hairColor})</p>
                    <p><strong>Hair Length:</strong> ${appearance.hairLength}</p>
                    <p><strong>Hair Structure:</strong> ${appearance.hairStructure}</p>
                    <p><strong>Hair Style:</strong> ${appearance.hairStyle}</p>
                    <p><strong>Clothing Style:</strong> ${appearance.clothingStyle}</p>
                    <p><strong>Birth Year:</strong> ${appearance.birthYear}</p>
                    <p><strong>Death Year:</strong> ${appearance.deathYear}</p>
                    <p><strong>Species:</strong> ${appearance.species}</p>
                    <p><strong>Extras:</strong> ${appearance.extras}</p>
                    ${appearance.image ? `<img src="${appearance.image}" alt="Image of ${human.name}" style="max-width: 200px; margin-top: 10px;">` : ''}
                </div>
            `;
        } else {
            appearanceDiv.innerHTML = '<p>No appearance details available.</p>';
        }
    } else {
        appearanceDiv.innerHTML = '<p>No appearance details available.</p>';
    }
}
