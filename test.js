// Super minimal test script
console.log('Test script loaded');

// Wait for DOM to be fully loaded
window.addEventListener('load', function() {
    console.log('Window fully loaded');
    
    // Force checking for critical DOM elements
    const elementsToCheck = [
        { id: 'categoryView', name: 'Category View' },
        { id: 'usedPoints', name: 'Points Counter' },
        { id: 'calculateButton', name: 'Calculate Button' },
        { id: 'resetButton', name: 'Reset Button' }
    ];
    
    let allElementsFound = true;
    
    // Check all required elements
    elementsToCheck.forEach(function(item) {
        const element = document.getElementById(item.id);
        if (!element) {
            console.error(`ERROR: ${item.name} (#${item.id}) not found in DOM`);
            allElementsFound = false;
            
            // Display error on page
            const errorDiv = document.createElement('div');
            errorDiv.style.color = 'red';
            errorDiv.style.padding = '10px';
            errorDiv.style.margin = '10px';
            errorDiv.style.backgroundColor = '#ffeeee';
            errorDiv.style.border = '1px solid red';
            errorDiv.textContent = `ERROR: ${item.name} (#${item.id}) not found in DOM`;
            document.body.prepend(errorDiv);
        } else {
            console.log(`FOUND: ${item.name} (#${item.id})`);
        }
    });
    
    // If all elements found, try to attach a simple event
    if (allElementsFound) {
        console.log('All required elements found, attaching test event handlers');
        
        // Get the bubbles
        const bubbles = document.querySelectorAll('.bubble');
        console.log(`Found ${bubbles.length} bubbles`);
        
        if (bubbles.length === 0) {
            console.error('ERROR: No bubble elements found!');
            const errorDiv = document.createElement('div');
            errorDiv.style.color = 'red';
            errorDiv.style.padding = '10px';
            errorDiv.style.margin = '10px';
            errorDiv.style.backgroundColor = '#ffeeee';
            errorDiv.style.border = '1px solid red';
            errorDiv.textContent = 'ERROR: No bubble elements found!';
            document.body.prepend(errorDiv);
        } else {
            // Test click on first bubble
            bubbles[0].addEventListener('click', function() {
                console.log('Bubble clicked!');
                this.style.border = '3px solid blue';
            });
            
            // Add message to try clicking
            const messageDiv = document.createElement('div');
            messageDiv.style.color = 'green';
            messageDiv.style.padding = '10px';
            messageDiv.style.margin = '10px';
            messageDiv.style.backgroundColor = '#eeffee';
            messageDiv.style.border = '1px solid green';
            messageDiv.innerHTML = 'Test mode active: Try clicking on the first bubble in the first category. <button id="testButton">Or click this test button</button>';
            document.body.prepend(messageDiv);
            
            // Add test button functionality
            document.getElementById('testButton').addEventListener('click', function() {
                this.textContent = 'Test button works!';
                this.style.backgroundColor = 'green';
                this.style.color = 'white';
            });
        }
        
        // Test calculate button
        const calculateButton = document.getElementById('calculateButton');
        calculateButton.addEventListener('click', function() {
            console.log('Calculate button clicked');
            alert('Calculate button works!');
        });
        
        // Test reset button
        const resetButton = document.getElementById('resetButton');
        resetButton.addEventListener('click', function() {
            console.log('Reset button clicked');
            alert('Reset button works!');
        });
    } else {
        console.error('Some required elements are missing, cannot proceed with testing');
    }
}); 