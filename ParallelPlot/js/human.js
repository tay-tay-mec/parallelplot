document.addEventListener('DOMContentLoaded', () => {
    const humanName = localStorage.getItem('currentHuman'); // Get the current human's name
    document.getElementById('humanName').textContent = humanName; // Display the name
    loadHumanDetails(humanName); // Load additional details about the human
    loadAppearanceDetails(humanName); // Load appearance details
    loadBackstoryDetails(humanName); // Load backstory details
        loadAPPEARANCEs(); // Load existing AUs on page load
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
    const appearanceForm = document.getElementById("addAppearanceForm");
    const appearanceNameInput = document.getElementById("appearanceNameInput");
    const imageInput = document.getElementById("imageInput");
    const appearanceList = document.getElementById("appearanceList");

    // Load existing appearances on page load
    loadAppearances();

    // Add appearance form submission handler
    appearanceForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const appearanceName = appearanceNameInput.value.trim();

        if (!appearanceName) {
            alert("Please enter a valid appearance name.");
            return;
        }

        // Process uploaded images
        const imageFiles = Array.from(imageInput.files);
        const imageBase64 = await Promise.all(imageFiles.map(fileToBase64));

        // Save appearance with images
        saveAppearance({ name: appearanceName, images: imageBase64 });
        addAppearanceToList({ name: appearanceName, images: imageBase64 });

        // Clear input fields
        appearanceNameInput.value = "";
        imageInput.value = "";
    });

    // Load appearances from localStorage
    function loadAppearances() {
        const appearances = JSON.parse(localStorage.getItem("appearanceList")) || [];
        appearances.forEach((appearance) => {
            addAppearanceToList(appearance);
        });
    }

    // Save appearance to localStorage
    function saveAppearance(appearance) {
        const appearances = JSON.parse(localStorage.getItem("appearanceList")) || [];
        appearances.push(appearance);
        localStorage.setItem("appearanceList", JSON.stringify(appearances));
    }

    // Add an appearance to the DOM list
    function addAppearanceToList(appearance) {
        const li = document.createElement("li");
        li.className = "appearance-item";

        const nameElement = document.createElement("span");
        nameElement.textContent = appearance.name;
        li.appendChild(nameElement);

        // Add image previews
        if (appearance.images && appearance.images.length > 0) {
            const imagePreviewContainer = document.createElement("div");
            imagePreviewContainer.className = "image-preview";
            appearance.images.forEach((imageSrc) => {
                const img = document.createElement("img");
                img.src = imageSrc;
                img.style.maxWidth = "300px";
                img.style.maxHeight = "300px";
                img.style.marginRight = "30px";
                imagePreviewContainer.appendChild(img);
            });
            li.appendChild(imagePreviewContainer);
        }

        // Add Delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            deleteAppearance(appearance.name, li);
        });
        li.appendChild(deleteButton);

        appearanceList.appendChild(li);
    }

    // Delete appearance
    function deleteAppearance(appearanceName, listItem) {
        const appearances = JSON.parse(localStorage.getItem("appearanceList")) || [];
        const filteredAppearances = appearances.filter((a) => a.name !== appearanceName);
        localStorage.setItem("appearanceList", JSON.stringify(filteredAppearances));
        listItem.remove();
    }

    // Convert file to Base64 string
    function fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }
});















document.addEventListener("DOMContentLoaded", () => {
    const personalityForm = document.getElementById("addPersonalityForm");
    const personalityNameInput = document.getElementById("personalityNameInput");
    const personalityList = document.getElementById("personalityList");

    // Load existing personalities on page load
    loadPersonalities();

    // Add personality form submission handler
    personalityForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const personalityName = personalityNameInput.value.trim();

        if (personalityName) {
            savePersonality(personalityName);
            addPersonalityToList(personalityName);
            personalityNameInput.value = ""; // Clear input field
        } else {
            alert("Please enter a valid personality name.");
        }
    });

    // Load personalities from localStorage
    function loadPersonalities() {
        const personalities = JSON.parse(localStorage.getItem("personalityList")) || [];
        personalities.forEach((personality) => {
            addPersonalityToList(personality);
        });
    }

    // Save personality to localStorage
    function savePersonality(personalityName) {
        const personalities = JSON.parse(localStorage.getItem("personalityList")) || [];
        personalities.push(personalityName);
        localStorage.setItem("personalityList", JSON.stringify(personalities));
    }

    // Add a personality to the DOM list
    function addPersonalityToList(personalityName) {
        const li = document.createElement("li");
        li.className = "personality-item";

        const text = document.createTextNode(personalityName);
        li.appendChild(text);

        // Add Delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            deletePersonality(personalityName, li);
        });
        li.appendChild(deleteButton);

        personalityList.appendChild(li);
    }

    // Delete personality
    function deletePersonality(personalityName, listItem) {
        const personalities = JSON.parse(localStorage.getItem("personalityList")) || [];
        const filteredPersonalities = personalities.filter((name) => name !== personalityName);
        localStorage.setItem("personalityList", JSON.stringify(filteredPersonalities));
        listItem.remove();
    }
});


























document.addEventListener("DOMContentLoaded", () => {
    const backstoryForm = document.getElementById("addBackstoryForm");
    const backstoryNameInput = document.getElementById("backstoryNameInput");
    const backstoryList = document.getElementById("backstoryList");

    // Load existing personalities on page load
    loadBackstories();

    // Add personality form submission handler
    backstoryForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const backstoryName = backstoryNameInput.value.trim();

        if (backstoryName) {
            saveBackstory(backstoryName);
            addBackstoryToList(backstoryName);
            backstoryNameInput.value = ""; // Clear input field
        } else {
            alert("Please enter a valid backstory name.");
        }
    });

    // Load from localStorage
    function loadBackstories() {
        const backstories = JSON.parse(localStorage.getItem("backstoryList")) || [];
        backstories.forEach((backstory) => {
            addBackstoryToList(backstory);
        });
    }

    // Save personality to localStorage
    function saveBackstory(backstoryName) {
        const backstories = JSON.parse(localStorage.getItem("backstoryList")) || [];
        backstories.push(backstoryName);
        localStorage.setItem("backstoryList", JSON.stringify(backstories));
    }

    // Add a personality to the DOM list
    function addBackstoryToList(backstoryName) {
        const li = document.createElement("li");
        li.className = "backstory-item";

        const text = document.createTextNode(backstoryName);
        li.appendChild(text);

        // Add Delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            deleteBackstory(backstoryName, li);
        });
        li.appendChild(deleteButton);

        backstoryList.appendChild(li);
    }

    // Delete personality
    function deleteBackstory(backstoryName, listItem) {
        const backstories = JSON.parse(localStorage.getItem("backstoryList")) || [];
        const filteredBackstories = backstories.filter((name) => name !== backstoryName);
        localStorage.setItem("backstoryList", JSON.stringify(filteredBackstories));
        listItem.remove();
    }
});
