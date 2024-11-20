document.addEventListener('DOMContentLoaded', () => {
    const theoryName = localStorage.getItem('currentTheory');
    document.getElementById('theoryName').textContent = theoryName; 
    loadFacts(factName); 
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
document.addEventListener("DOMContentLoaded", () => {
    const factForm = document.getElementById("addFactForm");
    const factNameInput = document.getElementById("factNameInput");
    const factList = document.getElementById("factList");

    // Load existing facts on page load
    loadFacts();

    // Add fact form submission handler
    factForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const factName = factNameInput.value.trim();

        if (factName) {
            saveFact(factName);
            addFactToList(factName);
            factNameInput.value = ""; // Clear input field
        } else {
            alert("Please enter a valid fact.");
        }
    });

    // Load facts from localStorage
    function loadFacts() {
        const facts = JSON.parse(localStorage.getItem("factList")) || [];
        facts.forEach((fact) => {
            addFactToList(fact);
        });
    }

    // Save fact to localStorage
    function saveFact(factName) {
        const facts = JSON.parse(localStorage.getItem("factList")) || [];
        facts.push(factName);
        localStorage.setItem("factList", JSON.stringify(facts));
    }

    // Add a fact to the DOM list
    function addFactToList(factName) {
        const li = document.createElement("li");
        li.className = "fact-item";

        const text = document.createTextNode(factName);
        li.appendChild(text);

        // Add Delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            deleteFact(factName, li);
        });
        li.appendChild(deleteButton);

        factList.appendChild(li);
    }

    // Delete fact
    function deleteFact(factName, listItem) {
        const facts = JSON.parse(localStorage.getItem("factList")) || [];
        const filteredFacts = facts.filter((name) => name !== factName);
        localStorage.setItem("factList", JSON.stringify(filteredFacts));
        listItem.remove();
    }
});
