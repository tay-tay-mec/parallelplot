const currentFamilyId = localStorage.getItem("currentFamilyId");

if (!currentFamilyId) {
    window.location.href = "au-page.html"; // Redirect if no family is selected
}

const familyContentKey = `familyContent-${currentFamilyId}`;
let familyContent = localStorage.getItem(familyContentKey) || "";
const contentArea = document.getElementById("familyContent");

contentArea.value = familyContent;
contentArea.addEventListener("input", () => {
    localStorage.setItem(familyContentKey, contentArea.value);
});
// Apply the selected color mode on page load
function applyColorMode() {
    const mode = localStorage.getItem('colorMode') || 'light';  // Default to light mode
    setColorMode(mode);
}

// Function to switch modes
function changeMode(mode) {
    // Reset all mode classes first
    document.body.classList.remove('light-mode', 'dark-mode', 'low-contrast-mode', 'purple-mode');

    // Add the selected mode class to the body
    document.body.classList.add(mode);

    // Save the selected mode to localStorage so it persists on page load
    localStorage.setItem('selectedMode', mode);
}

// Function to load the saved mode on page load
function loadSavedMode() {
    const savedMode = localStorage.getItem('selectedMode');
    
    if (savedMode) {
        changeMode(savedMode);
    } else {
        changeMode('light-mode'); // Default to light mode if no mode is saved
    }
}

// Call loadSavedMode on page load
loadSavedMode();

// Event listener to switch modes
document.getElementById('lightModeBtn').addEventListener('click', () => changeMode('light-mode'));
document.getElementById('darkModeBtn').addEventListener('click', () => changeMode('dark-mode'));
document.getElementById('lowContrastModeBtn').addEventListener('click', () => changeMode('low-contrast-mode'));
document.getElementById('purpleModeBtn').addEventListener('click', () => changeMode('purple-mode'));


// Load family tree from localStorage
function loadFamilyTree() {
    const savedFamilyTree = localStorage.getItem('familyTree');
    if (savedFamilyTree) {
        // Parse the saved data and assign it to the familyTree array
        familyTree.splice(0, familyTree.length, ...JSON.parse(savedFamilyTree));
    }
    renderFamilyTree();
}

// Save family tree to localStorage
function saveFamilyTree() {
    localStorage.setItem('familyTree', JSON.stringify(familyTree));
}

// Add a parent-child relationship
function addFamilyRelationship() {
    const parent1Name = document.getElementById("parent1Name").value.trim();
    const parent2Name = document.getElementById("parent2Name").value.trim();
    const childrenNames = document.getElementById("childrenNames").value.trim().split(',');

    if (!parent1Name || !childrenNames.length) {
        alert("Please enter the parent and at least one child.");
        return;
    }

    // Create the parent node(s)
    const parents = [];
    parents.push({
        name: parent1Name,
        relation: "Parent",
        id: `parent-${Date.now()}`,
        children: []
    });

    if (parent2Name) {
        parents.push({
            name: parent2Name,
            relation: "Parent",
            id: `parent-${Date.now() + 1}`,
            children: []
        });
    }

    // Create the child nodes
    const children = childrenNames.map(name => ({
        name: name.trim(),
        relation: "Child",
        id: `child-${Date.now() + Math.random()}`,
        children: []
    }));

    // Add children to the parent nodes
    parents.forEach(parent => {
        parent.children.push(...children);
    });

    // Add the family relationship to the family tree
    familyTree.push(...parents);

    // Save the updated family tree to localStorage
    saveFamilyTree();

    // Render the updated family tree
    renderFamilyTree();
}

// Render the family tree
function renderFamilyTree() {
    familyTreeContainer.innerHTML = "";
    familyTree.forEach(parent => {
        const parentNode = document.createElement("div");
        parentNode.className = "family-node";
        parentNode.innerHTML = `
            <strong>${parent.name}</strong>
            <div class="relation">${parent.relation}</div>
            <button onclick="removeMember('${parent.id}')">Delete</button>
        `;

        // Add children
        const childrenContainer = document.createElement("div");
        childrenContainer.className = "sibling-container";
        parent.children.forEach(child => {
            const childNode = document.createElement("div");
            childNode.className = "family-node";
            childNode.innerHTML = `
                <strong>${child.name}</strong>
                <div class="relation">${child.relation}</div>
            `;
            childNode.addEventListener("click", () => updateRelationDescription(child, parent));
            childrenContainer.appendChild(childNode);
        });

        parentNode.appendChild(childrenContainer);
        familyTreeContainer.appendChild(parentNode);
    });
}

// Update the relation description
function updateRelationDescription(child, parent) {
    relationDescription.textContent = `The relation of ${child.name} is a ${child.relation} of ${parent.name}.`;
}

// Remove a family member
function removeMember(id) {
    function removeRecursively(list, id) {
        return list.filter((member) => {
            if (member.id === id) return false;
            member.children = removeRecursively(member.children, id);
            return true;
        });
    }

    familyTree.splice(0, familyTree.length, ...removeRecursively(familyTree, id));

    // Save the updated family tree to localStorage
    saveFamilyTree();

    renderFamilyTree();
}

// Initial loading of the family tree when the page is loaded
const familyTree = [];
const familyTreeContainer = document.getElementById("familyTreeContainer");
const relationDescription = document.getElementById("relationDescription");

// Load the saved family tree from localStorage when the page is ready
window.onload = loadFamilyTree;
