document.addEventListener('DOMContentLoaded', () => {
    loadAUs(); // Load existing AUs on page load
});

function loadAUs() {
    const auList = document.getElementById('auList');
    const auData = JSON.parse(localStorage.getItem('auList')) || [];

    auList.innerHTML = ''; // Clear the list first
    auData.forEach(au => {
        addAUToList(au);
    });
}

function addAU() {
    const auNameInput = document.getElementById('auName');
    const auName = auNameInput.value.trim();

    if (auName) {
        const auList = JSON.parse(localStorage.getItem('auList')) || [];
        auList.push(auName);
        localStorage.setItem('auList', JSON.stringify(auList));
        addAUToList(auName);
        auNameInput.value = ''; // Clear input after adding
    } else {
        alert('Please enter an AU name.');
    }
}

function addAUToList(auName) {
    const auList = document.getElementById('auList');
    const li = document.createElement('li');
    li.className = 'au-item';

    // Create AU button
    const button = document.createElement('button');
    button.textContent = auName;
    button.className = 'au-button';
    button.onclick = () => {
        localStorage.setItem('currentAU', auName); // Set the current AU when clicked
        window.location.href = 'au.html'; // Redirect to the AU page
    };

    // Create Edit button
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = 'edit-button';
    editButton.onclick = (e) => {
        e.stopPropagation(); // Prevent AU button click
        editAU(auName);
    };

    // Create Delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-button';
    deleteButton.onclick = (e) => {
        e.stopPropagation(); // Prevent AU button click
        deleteAU(auName);
    };

    li.appendChild(button);
    li.appendChild(editButton);
    li.appendChild(deleteButton);
    auList.appendChild(li);
}

function editAU(auName) {
    const newName = prompt('Edit AU Name:', auName);
    if (newName) {
        const auList = JSON.parse(localStorage.getItem('auList')) || [];
        const index = auList.indexOf(auName);
        if (index !== -1) {
            auList[index] = newName;
            localStorage.setItem('auList', JSON.stringify(auList));
            loadAUs(); // Refresh the list
        }
    }
}

function deleteAU(auName) {
    const auList = JSON.parse(localStorage.getItem('auList')) || [];
    const filteredList = auList.filter(au => au !== auName);
    localStorage.setItem('auList', JSON.stringify(filteredList));
    loadAUs(); // Refresh the list
}
