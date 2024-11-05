document.addEventListener('DOMContentLoaded', () => {
    const familyTitle = document.getElementById('familyTitle');
    const familyName = localStorage.getItem('currentFamily');
    if (familyTitle && familyName) {
        familyTitle.textContent = `Family Tree: ${familyName}`;
    }
    loadFamilyMembers();

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



// Function to load family members from localStorage and display them
function loadFamilyMembers() {
    const familyTreeList = document.getElementById('familyTreeList');
    familyTreeList.innerHTML = '';

    const familyName = localStorage.getItem('currentFamily');
    const familyData = JSON.parse(localStorage.getItem(`familyData_${familyName}`)) || [];

    familyData.forEach((member, index) => {
        const memberElement = document.createElement('li');
        memberElement.classList.add('family-member');

        // Display member name
        const memberNameElement = document.createElement('span');
        memberNameElement.textContent = member.name;
        memberElement.appendChild(memberNameElement);

        // Check if there's a partner and display a line if there is one
        if (member.partner) {
            const lineElement = document.createElement('span');
            lineElement.classList.add('partner-line');
            lineElement.textContent = ' ─ '; // Line representing the partner relationship
            memberElement.appendChild(lineElement);

            const partnerElement = document.createElement('span');
            partnerElement.textContent = member.partner;
            memberElement.appendChild(partnerElement);
        }

        // Add click event to show/hide dropdown menu
        memberElement.onclick = () => toggleDropdown(memberElement, index);

        // Create a dropdown menu for each member
        const dropdownMenu = document.createElement('div');
        dropdownMenu.classList.add('dropdown-menu');
        dropdownMenu.style.display = 'none';

        // Add "Add Partner" option to the dropdown menu
        const addPartnerOption = document.createElement('button');
        addPartnerOption.textContent = 'Add Partner';
        addPartnerOption.onclick = (e) => {
            e.stopPropagation();
            addPartner(index);
        };

        // Add "Child Of" option to the dropdown menu
        const childOfOption = document.createElement('button');
        childOfOption.textContent = 'Child Of';
        childOfOption.onclick = (e) => {
            e.stopPropagation();
            showParentSelection(index);
        };

        const editOption = document.createElement('button');
        editOption.textContent = 'Edit Name';
        editOption.onclick = (e) => {
            e.stopPropagation();
            const newName = prompt('Enter new name:', member.name);
            if (newName) {
                updateFamilyMemberName(index, newName);
            }
        };

        const deleteOption = document.createElement('button');
        deleteOption.textContent = 'Delete';
        deleteOption.onclick = (e) => {
            e.stopPropagation();
            deleteFamilyMember(index);
        };

        // Append options to dropdown menu
        dropdownMenu.appendChild(addPartnerOption);
        dropdownMenu.appendChild(childOfOption);
        dropdownMenu.appendChild(editOption);
        dropdownMenu.appendChild(deleteOption);

        // Append dropdown menu to the member element
        memberElement.appendChild(dropdownMenu);
        familyTreeList.appendChild(memberElement);

        // Display children if they have any
        if (member.children && member.children.length > 0) {
            const childList = document.createElement('ul');
            member.children.forEach(childName => {
                const childItem = document.createElement('li');
                childItem.textContent = childName;
                childList.appendChild(childItem);
            });
            memberElement.appendChild(childList);
        }
    });
}

// Function to toggle dropdown menu visibility
function toggleDropdown(memberElement, index) {
    const dropdownMenu = memberElement.querySelector('.dropdown-menu');
    dropdownMenu.style.display = dropdownMenu.style.display === 'none' ? 'block' : 'none';
}

// Function to add a family member to the current family tree
function addFamilyMember() {
    const memberName = document.getElementById('memberName').value;
    if (!memberName) return;  // Prevent adding empty names

    const familyName = localStorage.getItem('currentFamily');
    const familyDataKey = `familyData_${familyName}`;
    const familyData = JSON.parse(localStorage.getItem(familyDataKey)) || [];

    // Add the new member to the family data
    familyData.push({ name: memberName, partner: null, children: [] });
    localStorage.setItem(familyDataKey, JSON.stringify(familyData));

    // Clear the input and reload the family members list
    document.getElementById('memberName').value = '';
    loadFamilyMembers();
}

// Function to add a partner to a family member
function addPartner(index) {
    const partnerName = prompt('Enter partner name:');
    if (!partnerName) return;

    const familyName = localStorage.getItem('currentFamily');
    const familyDataKey = `familyData_${familyName}`;
    const familyData = JSON.parse(localStorage.getItem(familyDataKey)) || [];

    // Update the partner name for the selected member
    familyData[index].partner = partnerName;
    localStorage.setItem(familyDataKey, JSON.stringify(familyData));

    // Reload the family members list
    loadFamilyMembers();
}

// Function to display parent selection dropdown and add parent relationship
function showParentSelection(childIndex) {
    const familyName = localStorage.getItem('currentFamily');
    const familyDataKey = `familyData_${familyName}`;
    const familyData = JSON.parse(localStorage.getItem(familyDataKey)) || [];

    // Create a dropdown to select an existing member as the parent
    const dropdown = document.createElement('select');
    dropdown.innerHTML = '<option value="">Select Parent</option>';
    familyData.forEach((member, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = member.name;
        dropdown.appendChild(option);
    });

    // Append a button to confirm parent selection
    const confirmButton = document.createElement('button');
    confirmButton.textContent = 'Confirm Parent';
    confirmButton.onclick = () => {
        const parentIndex = dropdown.value;
        if (parentIndex !== "") {
            addChildRelationship(childIndex, parentIndex);
        }
        dropdown.remove();
        confirmButton.remove();
    };

    // Display the dropdown and confirm button in the family tree list
    document.getElementById('familyTreeList').appendChild(dropdown);
    document.getElementById('familyTreeList').appendChild(confirmButton);
}

// Function to add a parent-child relationship
function addChildRelationship(childIndex, parentIndex) {
    const familyName = localStorage.getItem('currentFamily');
    const familyDataKey = `familyData_${familyName}`;
    const familyData = JSON.parse(localStorage.getItem(familyDataKey)) || [];

    const parentName = familyData[parentIndex].name;

    // Add the child to the parent's children list
    if (!familyData[parentIndex].children.includes(familyData[childIndex].name)) {
        familyData[parentIndex].children.push(familyData[childIndex].name);
    }

    localStorage.setItem(familyDataKey, JSON.stringify(familyData));
    loadFamilyMembers();
}

// Function to delete a family member by index
function deleteFamilyMember(index) {
    const familyName = localStorage.getItem('currentFamily');
    const familyDataKey = `familyData_${familyName}`;
    const familyData = JSON.parse(localStorage.getItem(familyDataKey)) || [];

    // Remove the member at the specified index
    familyData.splice(index, 1);
    localStorage.setItem(familyDataKey, JSON.stringify(familyData));

    // Reload the family members list
    loadFamilyMembers();
}

// Function to update a family member's name
function updateFamilyMemberName(index, newName) {
    const familyName = localStorage.getItem('currentFamily');
    const familyDataKey = `familyData_${familyName}`;
    const familyData = JSON.parse(localStorage.getItem(familyDataKey)) || [];

    // Update the name
    familyData[index].name = newName;
    localStorage.setItem(familyDataKey, JSON.stringify(familyData));

    // Reload the family members list
    loadFamilyMembers();
}
