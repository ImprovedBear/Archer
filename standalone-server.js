const http = require('http');
const fs = require('fs');
const path = require('path');

// Use port 3000 instead of 8080
const PORT = 3000;

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
};

const server = http.createServer((req, res) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  
  // Default to working-version.html for root path
  let filePath = req.url === '/' 
    ? './simple.html' 
    : '.' + req.url;
    
  // Get the file extension
  const extname = path.extname(filePath);
  let contentType = MIME_TYPES[extname] || 'application/octet-stream';
  
  // Read the file
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // File not found
        console.log(`File not found: ${filePath}`);
        res.writeHead(404);
        res.end('404 - File Not Found');
      } else {
        // Server error
        console.error(`Server error: ${err.code}`);
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      // Success - return the file
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log(`Access the ultra-simple version at: http://localhost:${PORT}/`);
  console.log(`Access the working version at: http://localhost:${PORT}/working-version.html`);
  console.log(`Access the other version at: http://localhost:${PORT}/simple-version.html`);
  console.log(`Access the original version at: http://localhost:${PORT}/all-in-one.html`);
  console.log('Press Ctrl+C to stop the server');
}); 