import express from 'express';
import path from 'path';

const app = express();

// Serve static files from the 'public' directory
//Serve static files with correct MIME types
app.use(express.static('/home/pushti/Desktop/ExpressJS/Project/public', {
    // Specify MIME types for specific file extensions
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        } else if (filePath.endsWith('.js')) {
            res.setHeader('Content-Type', 'text/javascript');
        }
    }
}));

// Define a route to serve your HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join('/home/pushti/Desktop/ExpressJS/Project/public','index.html'));
});


// Serve static files from the 'public' directory
app.use(express.static('/home/pushti/Desktop/ExpressJS/Project/public'));

// Define a route to serve your HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join('/home/pushti/Desktop/ExpressJS/Project/public', 'index.html'));
});


// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

