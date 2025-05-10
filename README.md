# Webcam Filter Application with User History

## Project Overview
This project is a web-based application that allows users to apply various filters to their webcam feed and maintains a history of filters used by each user. The application features a secure login system and real-time filter application with persistent storage of user preferences.

## Technologies Used

### Frontend
- **HTML5**
  - Semantic HTML structure
  - Form elements for login
  - Canvas element for webcam display
  - Responsive design elements

- **CSS3**
  - Modern styling with Flexbox
  - Custom animations and transitions
  - Responsive design
  - Gradient backgrounds
  - Box shadows and border radius for modern UI
  - Media queries for responsive layout

- **JavaScript (ES6+)**
  - DOM manipulation
  - Event handling
  - Canvas API for image processing
  - Webcam API integration
  - Async/await for API calls
  - Fetch API for backend communication

### Backend
- **Node.js**
  - Server-side runtime environment
  - Event-driven architecture
  - Non-blocking I/O operations

- **Express.js**
  - Web application framework
  - RESTful API endpoints
  - Middleware implementation
  - Route handling
  - CORS support

- **MongoDB**
  - NoSQL database
  - Document-based storage
  - Schema design for user data
  - Timestamp tracking

## Project Structure
```
project/
├── backend/
│   ├── server.js
│   └── package.json
├── index.html
├── login.html
├── styles.css
├── login.css
├── main.js
└── login.js
```

## Features

### Authentication System
- Secure login page
- Username/password validation
- Session management
- Redirect to main application

### Webcam Integration
- Real-time webcam feed
- Canvas-based image processing
- Multiple filter options:
  - Normal
  - Grayscale
  - Sepia
  - Invert
  - Blur
  - Brightness

### Filter History
- Persistent storage of filter usage
- Real-time updates
- Timestamp tracking
- User-specific history
- Visual display of previous filters

### User Interface
- Clean, modern design
- Responsive layout
- Interactive filter buttons
- Real-time filter preview
- History panel display

## API Endpoints

### Backend Routes
1. **Save Filter**
   - POST `/api/filters`
   - Saves user's filter selection
   - Parameters: username, filter details

2. **Get User Filters**
   - GET `/api/filters/:username`
   - Retrieves user's filter history
   - Returns: Array of filter objects with timestamps

## Database Schema

### User Collection
```javascript
{
    username: String,
    filters: [{
        name: String,
        value: Mixed,
        timestamp: Date
    }]
}
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Modern web browser with webcam support

### Installation
1. Clone the repository
2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Start MongoDB service
4. Start the backend server:
   ```bash
   npm start
   ```
5. Open `login.html` in a web browser

### Default Login Credentials
- Username: `admin`
- Password: `password123`

## Security Features
- Password validation
- Secure API endpoints
- CORS protection
- Input sanitization

## Future Enhancements
1. User registration system
2. More filter options
3. Filter customization
4. Image capture and save
5. Social sharing features
6. User profile management

## Best Practices Implemented
- Code modularization
- Error handling
- Async operations
- Responsive design
- Clean code structure
- Documentation
- Version control

## Performance Considerations
- Efficient canvas rendering
- Optimized database queries
- Minimal DOM manipulation
- Efficient event handling
- Proper resource cleanup

## Browser Compatibility
- Chrome (recommended)
- Firefox
- Safari
- Edge

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Create a Pull Request

## License
This project is licensed under the MIT License.

## Acknowledgments
- Webcam API documentation
- MongoDB documentation
- Express.js documentation
- Canvas API documentation 