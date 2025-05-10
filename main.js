// Access webcam, detect faces, and draw a filter overlay
const video = document.getElementById('video');
const canvas = document.getElementById('overlay');
const ctx = canvas.getContext('2d');

let currentFilter = 'normal';
let currentUsername = 'admin'; // This should be set after login

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

// Function to save filter to backend
async function saveFilter(filterName) {
    try {
        const response = await fetch('http://localhost:3000/api/filters', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: currentUsername,
                filter: {
                    name: filterName,
                    value: filterName
                }
            })
        });
        const data = await response.json();
        console.log('Filter saved:', data);
    } catch (error) {
        console.error('Error saving filter:', error);
    }
}

// Function to load and display user's filters
async function loadUserFilters() {
    try {
        const response = await fetch(`http://localhost:3000/api/filters/${currentUsername}`);
        const data = await response.json();
        
        // Create or update the filter history section
        let historySection = document.querySelector('.filter-history');
        if (!historySection) {
            historySection = document.createElement('div');
            historySection.className = 'filter-history';
            document.querySelector('.container').appendChild(historySection);
        }
        
        // Display filter history
        if (data.filters && data.filters.length > 0) {
            historySection.innerHTML = `
                <h3>Your Previous Filters</h3>
                <div class="filter-history-content">
                    <ul>
                        ${data.filters.map(filter => `
                            <li>
                                <span class="filter-name">${filter.name}</span>
                                <span class="filter-time">${new Date(filter.timestamp).toLocaleString()}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            `;
        } else {
            historySection.innerHTML = '<h3>No Previous Filters</h3>';
        }
    } catch (error) {
        console.error('Error loading filters:', error);
    }
}

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
        
        // Save filter to backend
        saveFilter(currentFilter);
        
        // Update the filter history display
        loadUserFilters();
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
        // Load user's filter history
        loadUserFilters();
    } catch (error) {
        console.error('Error initializing application:', error);
    }
}

// Start the application
init(); 