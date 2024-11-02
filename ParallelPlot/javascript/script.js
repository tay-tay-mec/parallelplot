// Function to load AUs from localStorage
function loadAUs() {
    const auList = JSON.parse(localStorage.getItem("auList")) || [];
    const auListContainer = document.getElementById("auList");
    
    // Clear the container before loading
    auListContainer.innerHTML = "";

    // Create buttons for each saved AU
    auList.forEach(auName => {
        // Create a container for the AU and delete button
        const auContainer = document.createElement("div");
        auContainer.className = "au-container"; // Create a wrapper div for styling

        // Create the AU button
        const auButton = document.createElement("a");
        auButton.className = "au-button";
        auButton.textContent = auName;
        auButton.href = `au_page.html?name=${encodeURIComponent(auName)}`;

        // Create the delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-button";
        deleteButton.onclick = () => deleteAU(auName);

        // Append buttons to the container
        auContainer.appendChild(auButton);
        auContainer.appendChild(deleteButton);
        auListContainer.appendChild(auContainer);
    });
}

// Function to add a new AU and save it to localStorage
function addAU() {
    const auName = document.getElementById("auName").value.trim();
    if (auName) {
        const auList = JSON.parse(localStorage.getItem("auList")) || [];
  
        // Check if AU name already exists
        if (!auList.includes(auName)) {
            auList.push(auName);  // Add new AU to the list
            localStorage.setItem("auList", JSON.stringify(auList));  // Save updated list to localStorage
            
            // Reload the AUs to display the new one
            loadAUs(); // Reload AUs to show the new one
            
            // Clear the input field
            document.getElementById("auName").value = '';
        } else {
            alert("This AU already exists!");
        }
    } else {
        alert("Please enter a valid AU name.");
    }
}

// Function to delete the AU
function deleteAU(auName) {
    if (confirm(`Are you sure you want to delete the AU '${auName}'? This action cannot be undone.`)) {
        const auList = JSON.parse(localStorage.getItem("auList")) || [];
        const updatedAUList = auList.filter(name => name !== auName); // Remove the AU from the array
        localStorage.setItem("auList", JSON.stringify(updatedAUList)); // Update localStorage

        loadAUs(); // Refresh the list of AUs
        alert(`AU '${auName}' has been deleted.`);
    }
}

// Load the AUs when the page is loaded
window.onload = loadAUs;
