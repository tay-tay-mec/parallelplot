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


const canvas = document.getElementById('dinoCanvas');
const ctx = canvas.getContext('2d');

// Load sprites
const dinoImg = new Image();
const cactusImg = new Image();
dinoImg.src = '../pictures/tape.png'; // Path to your Dino sprite
cactusImg.src = '../pictures/hand.png'; // Path to your Cactus sprite

// Game variables
let dino = { 
    x: 50, 
    y: 150, 
    width: 50, 
    height: 50, 
    velocityY: 0, 
    gravity: 0.6 
};
let cactus = { 
    x: 800, 
    y: 150, 
    width: 40, 
    height: 50, 
    speed: 8 // Slower cactus speed (default was 6)
};
let isJumping = false;
let score = 0;
let lastTime = 0;  // To control the frame rate

// Jump action
function jump() {
    if (!isJumping) {
        dino.velocityY = -10;
        isJumping = true;
    }
}

// Game loop (with frame control)
function gameLoop(timestamp) {
    if (timestamp - lastTime > 1000 / 30) {  // Limit to 30 frames per second (can be adjusted)
        lastTime = timestamp;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Dino physics
        dino.velocityY += dino.gravity;
        dino.y += dino.velocityY;
        if (dino.y > 150) {
            dino.y = 150;
            dino.velocityY = 0;
            isJumping = false;
        }

        // Draw Dino
        ctx.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
    
        // Move cactus
        cactus.x -= cactus.speed;
        if (cactus.x < -50) {
            cactus.x = 800;
            score++;
        }

        // Draw cactus
        ctx.drawImage(cactusImg, cactus.x, cactus.y, cactus.width, cactus.height);

        // Check collision
        if (
            dino.x < cactus.x + cactus.width &&
            dino.x + dino.width > cactus.x &&
            dino.y < cactus.y + cactus.height &&
            dino.height + dino.y > cactus.y
        ) {
            alert(`Game Over! Your score: ${score}`);
            cactus.x = 800;
            score = 0;
        }

        // Draw score
        ctx.fillStyle = 'black';
        ctx.font = '20px Arial';
        ctx.fillText(`Score: ${score}`, 10, 20);
    }

    // Request next frame
    requestAnimationFrame(gameLoop);
}

// Add event listeners for controls
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        jump();
    }
});

// Mobile-friendly: Touch controls
canvas.addEventListener('touchstart', () => {
    jump();
});

// Start game when sprites are loaded
dinoImg.onload = cactusImg.onload = () => {
    requestAnimationFrame(gameLoop);  // Start the game loop once the images are loaded
};
// Initialize Pickr
const pickr = Pickr.create({
    el: '#colorPickerContainer',
    theme: 'classic', // or 'monolith', or 'nano'
    default: currentAltSelf?.color || '#000000', // Default to saved color or black

    components: {
        // Main components
        preview: true,
        opacity: true,
        hue: true,

        // Input / output Options
        interaction: {
            hex: true,
            rgba: true,
            hsla: true,
            input: true,
            save: true, // Show save button
        },
    },
});

// Handle color change events
pickr.on('save', (color) => {
    const newColor = color.toHEXA().toString();
    currentAltSelf.color = newColor; // Save to the current Alternative Self object
    localStorage.setItem(altSelfKey, JSON.stringify(altSelfList)); // Persist changes
    alert('Color saved!');
});

// Optional: Update UI on color pick (live preview)
pickr.on('change', (color) => {
    document.body.style.backgroundColor = color.toHEXA().toString(); // Example of live preview
});
