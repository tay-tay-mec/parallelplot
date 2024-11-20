document.addEventListener('DOMContentLoaded', () => {
    initializePage();
    setupLowContrastToggle();
    loadTheorys();
});

function initializePage() {
    const auTitleElement = document.getElementById('auTitle');
    const auTitle = localStorage.getItem('currentAU');
    if (auTitleElement && auTitle) {
        auTitleElement.textContent = auTitle;
    }

    loadTheorys();
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


document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('highContrastToggle');

    // Check if low contrast mode was previously enabled
    if (localStorage.getItem('highContrast') === 'true') {
        document.body.classList.add('high-contrast');
    }

    toggleButton.addEventListener('click', () => {
        document.body.classList.toggle('high-contrast');
        
        // Save the user's preference in local storage
        const ishighContrast = document.body.classList.contains('high-contrast');
        localStorage.setItem('highContrast', ishighContrast);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('LightToggle');

    // Check if low contrast mode was previously enabled
    if (localStorage.getItem('Light') === 'true') {
        document.body.classList.add('light');
    }

    toggleButton.addEventListener('click', () => {
        document.body.classList.toggle('light');
        
        // Save the user's preference in local storage
        const isLight = document.body.classList.contains('light');
        localStorage.setItem('Light', isLight);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('PurpleToggle');

    // Check if low contrast mode was previously enabled
    if (localStorage.getItem('Purple') === 'true') {
        document.body.classList.add('purple');
    }

    toggleButton.addEventListener('click', () => {
        document.body.classList.toggle('purple');
        
        // Save the user's preference in local storage
        const isPurple = document.body.classList.contains('purple');
        localStorage.setItem('Purple', isPurple);
    });
});

function loadTheorys() {
    const theoryList = document.getElementById('theoryList');
    if (!theoryList) return;

    theoryList.innerHTML = '';
    const theorys = JSON.parse(localStorage.getItem('theorys')) || {};
    const currentAU = localStorage.getItem('currentAU');
    const currenttheorys = theorys[currentAU] || [];

    currenttheorys.forEach(theory => {
        addTheoryToList(theory.name, theory.color || '#FFFFFF');
    });
}

function addTheory() {
    const theoryName = document.getElementById('theoryName').value;
    if (!theoryName) return;

    const theorys = JSON.parse(localStorage.getItem('theorys')) || {};
    const currentAU = localStorage.getItem('currentAU');

    if (!theorys[currentAU]) {
        theorys[currentAU] = [];
    }

    if (!theorys[currentAU].some(theory => theory.name === theoryName)) {
        theorys[currentAU].push({ name: theoryName, color: '#FFFFFF' });
        localStorage.setItem('theorys', JSON.stringify(theorys));
        addTheoryToList(theoryName, '#FFFFFF');
    }

    document.getElementById('theoryName').value = '';
}

function addTheoryToList(theoryName, color) {
    const theoryList = document.getElementById('theoryList');
    if (!theoryList) return;

    const li = document.createElement('li');
    li.className = 'theory-item';

    const theoryButton = document.createElement('button');
    theoryButton.textContent = theoryName;
    theoryButton.className = 'theory-button';
    theoryButton.style.backgroundColor = color;
    theoryButton.onclick = () => {
        localStorage.setItem('currentTheory', theoryName);
        window.location.href = '../html/in-theory.html';
    };

    const colorPicker = document.createElement('input');
    colorPicker.type = 'color';
    colorPicker.value = color;
    colorPicker.className = 'color-picker';
    colorPicker.oninput = () => {
        applyTheoryColor(theoryName, colorPicker.value);
        theoryButton.style.backgroundColor = colorPicker.value;
    };

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = 'edit-button';
    editButton.onclick = () => {
        editTheory(theoryName);
    };

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-button';
    deleteButton.onclick = () => {
        deleteTheory(theoryName);
    };

    li.appendChild(theoryButton);
    li.appendChild(colorPicker);
    li.appendChild(editButton);
    li.appendChild(deleteButton);
    theoryList.appendChild(li);
}

function applyTheoryColor(theoryName, color) {
    const theorys = JSON.parse(localStorage.getItem('theorys')) || {};
    const currentAU = localStorage.getItem('currentAU');

    if (theorys[currentAU]) {
        theorys[currentAU] = theorys[currentAU].map(theory => 
            theory.name === theoryName ? { ...theory, color } : theory
        );
        localStorage.setItem('theorys', JSON.stringify(theorys));
    }
}

function editTheory(oldName) {
    const newName = prompt("Enter new name:", oldName);
    if (newName && newName !== oldName) {
        const theorys = JSON.parse(localStorage.getItem('theorys')) || {};
        const currentAU = localStorage.getItem('currentAU');

        if (theorys[currentAU]) {
            theorys[currentAU] = theorys[currentAU].map(theory => 
                theory.name === oldName ? { ...theory, name: newName } : theory
            );
            localStorage.setItem('theorys', JSON.stringify(theorys));
            loadTheorys();
        }
    }
}

function deleteTheory(theoryName) {
    const theorys = JSON.parse(localStorage.getItem('theorys')) || {};
    const currentAU = localStorage.getItem('currentAU');

    if (theorys[currentAU]) {
        theorys[currentAU] = theorys[currentAU].filter(theory => theory.name !== theoryName);
        localStorage.setItem('theorys', JSON.stringify(theorys));
        loadTheorys();
    }
}
