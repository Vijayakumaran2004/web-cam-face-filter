const video = document.getElementById('video');
const canvas = document.getElementById('overlay');
const ctx = canvas.getContext('2d');

let currentFilter = 'normal';

// Set canvas dimensions
canvas.width = 640;
canvas.height = 480;

// Filter functions
const filters = {
    normal: () => {
        ctx.filter = 'none';
    },
    grayscale: () => {
        ctx.filter = 'grayscale(100%)';
    },
    sepia: () => {
        ctx.filter = 'sepia(100%)';
    },
    invert: () => {
        ctx.filter = 'invert(100%)';
    },
    blur: () => {
        ctx.filter = 'blur(5px)';
    },
    brightness: () => {
        ctx.filter = 'brightness(150%)';
    }
};

// Add click event listeners to filter buttons
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Set current filter
        currentFilter = button.id;
    });
});

// Set initial active state for normal filter
document.getElementById('normal').classList.add('active');

async function setupWebcam() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { 
                width: 640,
                height: 480,
                facingMode: 'user'
            } 
        });
        video.srcObject = stream;
        
        return new Promise((resolve) => {
            video.onloadedmetadata = () => {
                resolve(video);
            };
        });
    } catch (error) {
        console.error('Error accessing webcam:', error);
        alert('Error accessing webcam. Please make sure you have granted camera permissions.');
    }
}

function drawFrame() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Apply the current filter
    filters[currentFilter]();
    
    // Draw the video frame
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Reset filter for next frame
    ctx.filter = 'none';
    
    // Request next frame
    requestAnimationFrame(drawFrame);
}

// Initialize the application
async function init() {
    try {
        await setupWebcam();
        drawFrame();
    } catch (error) {
        console.error('Error initializing application:', error);
    }
}

// Start the application
init(); 