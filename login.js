// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        console.log("Attempting login with:", username);
        
        // Simple username and password check
        if (username === "admin" && password === "password123") {
            console.log("Login successful");
            // Redirect to main page
            window.location.href = "index.html";
        } else {
            console.log("Login failed");
            alert("Invalid username or password. Please try again.");
        }
    });
});

document.querySelector(".sign-up-form").addEventListener("submit", function(e) {
    e.preventDefault();
    const username = this.querySelector('input[type="text"]').value;
    const password = this.querySelector('input[type="password"]').value;
    
    // Here you would typically make an API call to create a new account
    // For demo purposes, we'll just redirect to the main page
    if (username && password) {
        window.location.href = "index.html";
    }
}); 