// script.js
const familyTreeDiv = document.getElementById('family-tree');
const addMemberButton = document.getElementById('add-member');

let familyMembers = [];

// Load family members from localStorage when the page is loaded
window.onload = () => {
    const storedMembers = localStorage.getItem('familyMembers');
    if (storedMembers) {
        familyMembers = JSON.parse(storedMembers);
        displayFamilyTree();
    }
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
};

// Function to add a new family member
addMemberButton.addEventListener('click', () => {
    const name = prompt("Enter the family member's name:");
    const relation = prompt("Enter their relation to you:");

    if (name && relation) {
        const newMember = { name, relation, position: { left: 50, top: 50 } }; // Set default position
        familyMembers.push(newMember);
        saveFamilyMembers(); // Save to localStorage
        displayFamilyTree();
    }
});

// Function to display the family tree
function displayFamilyTree() {
    familyTreeDiv.innerHTML = ''; // Clear the previous tree
    familyMembers.forEach((member, index) => {
        const memberDiv = document.createElement('div');
        memberDiv.className = 'member';
        memberDiv.setAttribute('draggable', true);
        memberDiv.innerHTML = `<strong>${member.name}</strong><br>${member.relation}`;

        // Set the position of each member based on saved position
        memberDiv.style.left = `${member.position.left}px`;
        memberDiv.style.top = `${member.position.top}px`;

        // Event listeners for drag-and-drop
        memberDiv.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', index); // Store the index of the dragged member
            setTimeout(() => {
                e.target.style.opacity = '0.5'; // Reduce opacity while dragging
            }, 0);
        });

        memberDiv.addEventListener('dragend', (e) => {
            e.target.style.opacity = ''; // Reset opacity after dragging
        });

        memberDiv.addEventListener('dragover', (e) => {
            e.preventDefault(); // Allow drop
        });

        memberDiv.addEventListener('drop', (e) => {
            e.preventDefault();
            const draggedIndex = e.dataTransfer.getData('text/plain');

            // Get the drop position relative to the family tree
            const dropX = e.clientX - familyTreeDiv.offsetLeft;
            const dropY = e.clientY - familyTreeDiv.offsetTop;

            // Update position of dragged member
            const draggedMember = familyMembers[draggedIndex];
            draggedMember.position = { left: dropX, top: dropY };

            saveFamilyMembers(); // Save updated positions to localStorage
            displayFamilyTree(); // Re-display the tree to reflect new positions
        });

        familyTreeDiv.appendChild(memberDiv);
    });
}

// Function to save family members to localStorage
function saveFamilyMembers() {
    localStorage.setItem('familyMembers', JSON.stringify(familyMembers));
}
