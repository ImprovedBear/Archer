// Debug helper for ToolMan Client Archetype app
console.log('Debug script loaded and running');

// Capture errors
window.onerror = function(message, source, lineno, colno, error) {
    console.error('JavaScript Error:', message);
    console.error('Source:', source);
    console.error('Line:', lineno, 'Column:', colno);
    console.error('Error object:', error);
    
    // Create error display
    const errorDiv = document.createElement('div');
    errorDiv.style.position = 'fixed';
    errorDiv.style.bottom = '10px';
    errorDiv.style.left = '10px';
    errorDiv.style.right = '10px';
    errorDiv.style.padding = '10px';
    errorDiv.style.background = 'rgba(255, 0, 0, 0.8)';
    errorDiv.style.color = 'white';
    errorDiv.style.zIndex = '9999';
    errorDiv.style.borderRadius = '5px';
    errorDiv.style.fontFamily = 'monospace';
    errorDiv.style.maxHeight = '200px';
    errorDiv.style.overflow = 'auto';
    
    errorDiv.innerHTML = `<strong>JavaScript Error:</strong> ${message}<br>
                        <strong>Source:</strong> ${source}<br>
                        <strong>Line:</strong> ${lineno}, <strong>Column:</strong> ${colno}<br>
                        <button id="closeError" style="background:white;color:red;border:none;padding:5px 10px;margin-top:10px;cursor:pointer;">Close</button>`;
    
    document.body.appendChild(errorDiv);
    
    document.getElementById('closeError').addEventListener('click', function() {
        errorDiv.remove();
    });
    
    return true; // Prevents default error handling
};

// Test DOM element access
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');
    
    // Check for key DOM elements
    const elementsToCheck = [
        'categoryView', 'resultView', 'saveView', 'rosterView', 'clientDetailView',
        'confirmDialog', 'menu', 'usedPoints', 'calculateButton', 'resetButton', 
        'adjustButton', 'saveButton', 'confirmSaveButton', 'cancelSaveButton', 
        'menuButton', 'showRosterButton', 'aboutButton', 'closeRosterButton', 
        'editButton', 'deleteButton', 'closeDetailButton', 'confirmDeleteButton', 
        'cancelDeleteButton', 'clientName'
    ];
    
    const missingElements = [];
    
    elementsToCheck.forEach(id => {
        const element = document.getElementById(id);
        if (!element) {
            console.error(`Missing DOM element: #${id}`);
            missingElements.push(id);
        } else {
            console.log(`Found DOM element: #${id}`);
        }
    });
    
    if (missingElements.length > 0) {
        console.error('Missing elements:', missingElements);
        
        // Create warning display for missing elements
        const warningDiv = document.createElement('div');
        warningDiv.style.position = 'fixed';
        warningDiv.style.top = '10px';
        warningDiv.style.left = '10px';
        warningDiv.style.right = '10px';
        warningDiv.style.padding = '10px';
        warningDiv.style.background = 'rgba(255, 165, 0, 0.8)';
        warningDiv.style.color = 'white';
        warningDiv.style.zIndex = '9999';
        warningDiv.style.borderRadius = '5px';
        warningDiv.style.fontFamily = 'monospace';
        
        warningDiv.innerHTML = `<strong>Missing DOM Elements:</strong> ${missingElements.join(', ')}<br>
                              <button id="closeWarning" style="background:white;color:orange;border:none;padding:5px 10px;margin-top:10px;cursor:pointer;">Close</button>`;
        
        document.body.appendChild(warningDiv);
        
        document.getElementById('closeWarning').addEventListener('click', function() {
            warningDiv.remove();
        });
    }
    
    // Test click handlers
    try {
        console.log('Testing bubble click handlers...');
        const bubbles = document.querySelectorAll('.bubble');
        console.log(`Found ${bubbles.length} bubbles`);
        
        if (bubbles.length === 0) {
            console.error('No bubble elements found!');
        }
    } catch (e) {
        console.error('Error testing click handlers:', e);
    }
}); 