// Function to load humans from localStorage
function loadHumans() {
    const humanList = JSON.parse(localStorage.getItem("humanList")) || [];
    const humanListContainer = document.getElementById("humanList");
    
    // Clear the container before loading
    humanListContainer.innerHTML = "";

    // Create buttons for each saved human
    humanList.forEach(humanName => {
        // Create a container for the human and delete button
        const humanContainer = document.createElement("div");
        humanContainer.className = "human-container"; // Create a wrapper div for styling

        // Create the human button
        const humanButton = document.createElement("a");
        humanButton.className = "human-button";
        humanButton.textContent = humanName;
        humanButton.href = `human_page.html?name=${encodeURIComponent(humanName)}`;

        // Create the delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-button";
        deleteButton.onclick = () => deleteHuman(humanName);

        // Append buttons to the container
        humanContainer.appendChild(humanButton);
        humanContainer.appendChild(deleteButton);
        humanListContainer.appendChild(humanContainer);
    });
}

// Function to add a new human and save it to localStorage
function addHuman() {
    const humanName = document.getElementById("humanName").value.trim();
    if (humanName) {
        const humanList = JSON.parse(localStorage.getItem("humanList")) || [];
  
        // Check if human name already exists
        if (!humanList.includes(humanName)) {
            humanList.push(humanName);  // Add new human to the list
            localStorage.setItem("humanList", JSON.stringify(humanList));  // Save updated list to localStorage
            
            // Reload the humans to display the new one
            loadHumans(); // Reload humans to show the new one
            
            // Clear the input field
            document.getElementById("humanName").value = '';
        } else {
            alert("This human already exists!");
        }
    } else {
        alert("Please enter a valid human name.");
    }
}

// Function to delete the human
function deleteHuman(humanName) {
    if (confirm(`Are you sure you want to delete the human '${humanName}'? This action cannot be undone.`)) {
        const humanList = JSON.parse(localStorage.getItem("humanList")) || [];
        const updatedHumanList = humanList.filter(name => name !== humanName); // Remove the human from the array
        localStorage.setItem("humanList", JSON.stringify(updatedHumanList)); // Update localStorage

        loadHumans(); // Refresh the list of humans
        alert(`Human '${humanName}' has been deleted.`);
    }
}

// Function to load animatronics from localStorage
function loadAnimatronics() {
    const animatronicList = JSON.parse(localStorage.getItem("animatronicList")) || [];
    const animatronicListContainer = document.getElementById("animatronicList");
    
    // Clear the container before loading
    animatronicListContainer.innerHTML = "";

    // Create buttons for each saved animatronic
    animatronicList.forEach(animatronicName => {
        // Create a container for the animatronic and delete button
        const animatronicContainer = document.createElement("div");
        animatronicContainer.className = "animatronic-container"; // Create a wrapper div for styling

        // Create the animatronic button
        const animatronicButton = document.createElement("a");
        animatronicButton.className = "animatronic-button";
        animatronicButton.textContent = animatronicName;
        animatronicButton.href = `animatronic_page.html?name=${encodeURIComponent(animatronicName)}`;

        // Create the delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-button";
        deleteButton.onclick = () => deleteAnimatronic(animatronicName);

        // Append buttons to the container
        animatronicContainer.appendChild(animatronicButton);
        animatronicContainer.appendChild(deleteButton);
        animatronicListContainer.appendChild(animatronicContainer);
    });
}

// Function to add a new animatronic and save it to localStorage
function addAnimatronic() {
    const animatronicName = document.getElementById("animatronicName").value.trim();
    if (animatronicName) {
        const animatronicList = JSON.parse(localStorage.getItem("animatronicList")) || [];
  
        // Check if animatronic name already exists
        if (!animatronicList.includes(animatronicName)) {
            animatronicList.push(animatronicName);  // Add new animatronic to the list
            localStorage.setItem("animatronicList", JSON.stringify(animatronicList));  // Save updated list to localStorage
            
            // Reload the animatronics to display the new one
            loadAnimatronics(); // Reload animatronics to show the new one
            
            // Clear the input field
            document.getElementById("animatronicName").value = '';
        } else {
            alert("This animatronic already exists!");
        }
    } else {
        alert("Please enter a valid animatronic name.");
    }
}

// Function to delete the animatronic
function deleteAnimatronic(animatronicName) {
    if (confirm(`Are you sure you want to delete the animatronic '${animatronicName}'? This action cannot be undone.`)) {
        const animatronicList = JSON.parse(localStorage.getItem("animatronicList")) || [];
        const updatedAnimatronicList = animatronicList.filter(name => name !== animatronicName); // Remove the animatronic from the array
        localStorage.setItem("animatronicList", JSON.stringify(updatedAnimatronicList)); // Update localStorage

        loadAnimatronics(); // Refresh the list of animatronics
        alert(`Animatronic '${animatronicName}' has been deleted.`);
    }
}

// Load the humans and animatronics when the page is loaded
window.onload = function() {
    loadHumans();
    loadAnimatronics();
};

// Load the humans when the page is loaded
window.onload = loadHumans;
