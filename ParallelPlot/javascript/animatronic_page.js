// Helper function to get the AU name and bot name from URL parameters
function getParams() {
    const urlParams = new URLSearchParams(window.location.search);
    return {
        auName: urlParams.get('au'),
        botName: urlParams.get('bot')
    };
}

// Load bot appearance details from localStorage
function loadAppearance() {
    const { auName, botName } = getParams();
    const savedAppearance = JSON.parse(localStorage.getItem(`${auName}_${botName}_appearance`)) || {};
    
    // Display the appearance details if available
    const appearanceDetails = document.getElementById("appearanceDetails");
    if (Object.keys(savedAppearance).length > 0) {
        appearanceDetails.innerHTML = `
            <h3>Appearance Details</h3>
            <p><strong>Main Color:</strong> ${savedAppearance.mainColor || "Not specified"}</p>
            <p><strong>Height:</strong> ${savedAppearance.height || "Not specified"}</p>
            <p><strong>Version:</strong> ${savedAppearance.version || "Not specified"}</p>
            <p><strong>Soul:</strong> ${savedAppearance.soul || "Not specified"}</p>
            <p><strong>Eye Color:</strong> ${savedAppearance.eyeColor || "Not specified"}</p>
        `;
    } else {
        appearanceDetails.innerHTML = "<p>No appearance details saved.</p>";
    }
}

// Save bot appearance details to localStorage
function saveAppearance() {
    const { auName, botName } = getParams();
    const appearance = {
        mainColor: document.getElementById("mainColor").value.trim(),
        height: document.getElementById("height").value.trim(),
        version: document.getElementById("version").value.trim(),
        soul: document.getElementById("soul").value.trim(),
        eyeColor: document.getElementById("eyeColor").value.trim()
    };
    
    // Save the appearance object to localStorage
    localStorage.setItem(`${auName}_${botName}_appearance`, JSON.stringify(appearance));
    
    // Reload the appearance details to show the updated information
    loadAppearance();
    alert("Appearance details saved!");
}

// Delete bot appearance details from localStorage
function deleteAppearance() {
    const { auName, botName } = getParams();
    
    // Remove the appearance data from localStorage
    localStorage.removeItem(`${auName}_${botName}_appearance`);
    
    // Clear the displayed appearance details
    document.getElementById("appearanceDetails").innerHTML = "<p>No appearance details saved.</p>";
    
    alert("Appearance details deleted!");
}

// Display the bot's name and load saved appearance details on page load
window.onload = function() {
    const { botName, auName } = getParams();
    if (botName && auName) {
        document.getElementById("botTitle").textContent = `${botName} - ${auName}`;
        loadAppearance();
    }
};
