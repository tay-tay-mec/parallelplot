// Helper function to get the AU name and human name from URL parameters
function getParams() {
    const urlParams = new URLSearchParams(window.location.search);
    return {
      auName: urlParams.get('au'),
      humanName: urlParams.get('human')
    };
  }
  
  // Load human appearance details from localStorage
  function loadAppearance() {
    const { auName, humanName } = getParams();
    const savedAppearance = JSON.parse(localStorage.getItem(`${auName}_${humanName}_appearance`)) || {};
    
    // Display the appearance details if available
    const appearanceDetails = document.getElementById("appearanceDetails");
    if (Object.keys(savedAppearance).length > 0) {
      appearanceDetails.innerHTML = `
        <h3>Appearance Details</h3>
        <p><strong>Skin Color:</strong> ${savedAppearance.skinColor || "Not specified"}</p>
        <p><strong>Eye Color:</strong> ${savedAppearance.eyeColor || "Not specified"}</p>
        <p><strong>Hair Color:</strong> ${savedAppearance.hairColor || "Not specified"}</p>
        <p><strong>Hair Style:</strong> ${savedAppearance.hairStyle || "Not specified"}</p>
        <p><strong>Height:</strong> ${savedAppearance.height || "Not specified"}</p>
        <p><strong>Year:</strong> ${savedAppearance.year || "Not specified"}</p>
        <p><strong>Extras:</strong> ${savedAppearance.extras || "Not specified"}</p>
      `;
    } else {
      appearanceDetails.innerHTML = "<p>No appearance details saved.</p>";
    }
  }
  
  // Save human appearance details to localStorage
  function saveAppearance() {
    const { auName, humanName } = getParams();
    const appearance = {
      skinColor: document.getElementById("skinColor").value.trim(),
      eyeColor: document.getElementById("eyeColor").value.trim(),
      hairColor: document.getElementById("hairColor").value.trim(),
      hairStyle: document.getElementById("hairStyle").value.trim(),
      height: document.getElementById("height").value.trim(),
      year: document.getElementById("year").value.trim(),
      extras: document.getElementById("extras").value.trim()
    };
    
    // Save the appearance object to localStorage
    localStorage.setItem(`${auName}_${humanName}_appearance`, JSON.stringify(appearance));
    
    // Reload the appearance details to show the updated information
    loadAppearance();
    alert("Appearance details saved!");
  }
  
  // Delete human appearance details from localStorage
  function deleteAppearance() {
    const { auName, humanName } = getParams();
    
    // Remove the appearance data from localStorage
    localStorage.removeItem(`${auName}_${humanName}_appearance`);
    
    // Clear the displayed appearance details
    document.getElementById("appearanceDetails").innerHTML = "<p>No appearance details saved.</p>";
    
    alert("Appearance details deleted!");
  }
  
  // Display the human's name and load saved appearance details on page load
  window.onload = function() {
    const { humanName, auName } = getParams();
    if (humanName && auName) {
      document.getElementById("humanTitle").textContent = `${humanName} - ${auName}`;
      loadAppearance();
    }
  };
  