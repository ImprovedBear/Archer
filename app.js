// Main Application Logic for ToolMan Client Archetype

// DOM Elements
let categoryView;
let resultView;
let saveView;
let rosterView;
let clientDetailView;
let confirmDialog;
let menu;

let usedPointsElement;
let calculateButton;
let resetButton;
let adjustButton;
let saveButton;
let confirmSaveButton;
let cancelSaveButton;
let menuButton;
let showRosterButton;
let aboutButton;
let closeRosterButton;
let editButton;
let deleteButton;
let closeDetailButton;
let confirmDeleteButton;
let cancelDeleteButton;
let clientNameInput;

// State variables
let currentPoints = {
    style: 0,
    speed: 0,
    budget: 0,
    longevity: 0,
    control: 0,
    lifeload: 0
};

let totalPoints = 0;
let currentArchetype = null;
let clientResults = [];
let currentClientIndex = -1;

// Archetype definitions
const archetypes = [
    {
        id: 'learner',
        name: 'The Learner',
        ranges: {
            style: [2, 3],
            speed: [1, 2],
            budget: [2, 3],
            longevity: [2, 3],
            control: [3, 4],
            lifeload: [2, 3]
        },
        description: 'A knowledge-seeking homeowner who values collaboration and learning throughout the process.',
        tagline: 'Wants to understand the "why" behind recommendations',
        advice: 'Explain your reasoning clearly. Provide resources for further learning. Take time to teach during the project. Show respect for their questions and interest in learning.'
    },
    {
        id: 'busy-owner',
        name: 'The Busy Owner',
        ranges: {
            style: [0, 2],
            speed: [4, 5],
            budget: [2, 3],
            longevity: [1, 2],
            control: [0, 1],
            lifeload: [4, 5]
        },
        description: 'A time-constrained homeowner who needs quick, efficient solutions with minimal involvement.',
        tagline: 'Values speed and convenience above all else',
        advice: 'Be efficient with meetings and communications. Offer simplified decisions. Focus on speed and minimize disruption. Provide clear, concise updates.'
    },
    {
        id: 'steward',
        name: 'The Steward',
        ranges: {
            style: [2, 3],
            speed: [1, 2],
            budget: [2, 3],
            longevity: [3, 4],
            control: [3, 4],
            lifeload: [2, 3]
        },
        description: 'A caretaker who views their home as a legacy to be preserved and improved with care.',
        tagline: 'Prioritizes long-term care and maintenance',
        advice: 'Emphasize quality materials and craftsmanship. Provide documentation for future maintenance. Respect the home's history and character. Focus on sustainable solutions.'
    },
    {
        id: 'family-home',
        name: 'The Family Home',
        ranges: {
            style: [1, 2],
            speed: [2, 3],
            budget: [3, 4],
            longevity: [2, 3],
            control: [1, 2],
            lifeload: [4, 5]
        },
        description: 'A bustling household where practical solutions for everyday family life are the priority.',
        tagline: 'Needs solutions that work in a busy household',
        advice: 'Prioritize safety and durability. Respect the chaos of family life. Offer practical, functional solutions. Be patient with scheduling and communication.'
    },
    {
        id: 'home-partner',
        name: 'The Home Partner',
        ranges: {
            style: [3, 4],
            speed: [1, 2],
            budget: [2, 3],
            longevity: [3, 4],
            control: [3, 4],
            lifeload: [1, 2]
        },
        description: 'A collaborative homeowner who values teamwork and wants active involvement in decisions.',
        tagline: 'Values the collaborative process and relationship',
        advice: 'Invite input and collaboration. Hold regular check-ins. Share decision-making. Value their insights about their own home. Build a genuine relationship.'
    },
    {
        id: 'strategist',
        name: 'The Strategist',
        ranges: {
            style: [2, 3],
            speed: [0, 1],
            budget: [2, 3],
            longevity: [4, 5],
            control: [3, 4],
            lifeload: [1, 2]
        },
        description: 'A methodical planner focused on long-term value and structural integrity.',
        tagline: 'Plans meticulously for long-term outcomes',
        advice: 'Provide detailed plans and specifications. Discuss long-term implications. Share technical details. Respect their systematic approach. Offer data-driven recommendations.'
    },
    {
        id: 'respected-homeowner',
        name: 'The Respected Homeowner',
        ranges: {
            style: [1, 2],
            speed: [2, 3],
            budget: [3, 4],
            longevity: [3, 4],
            control: [1, 2],
            lifeload: [2, 3]
        },
        description: 'A practical homeowner seeking reliable, long-lasting solutions at a fair price.',
        tagline: 'Values straightforward quality and reliability',
        advice: 'Be transparent about costs and timelines. Provide straightforward options. Focus on reliability and proven solutions. Respect their practical approach to decision-making.'
    },
    {
        id: 'craftsman',
        name: 'The Craftsman',
        ranges: {
            style: [1, 2],
            speed: [1, 2],
            budget: [2, 3],
            longevity: [4, 5],
            control: [4, 5],
            lifeload: [0, 2]
        },
        description: 'A detail-oriented homeowner who appreciates technical excellence and hands-on involvement.',
        tagline: 'Values technical excellence and craftsmanship',
        advice: 'Share technical details and reasoning. Allow for inspection of work. Respect their knowledge of tools and techniques. Be prepared for detailed questions and high standards.'
    },
    {
        id: 'host',
        name: 'The Host',
        ranges: {
            style: [5, 5],
            speed: [2, 3],
            budget: [1, 2],
            longevity: [1, 2],
            control: [2, 3],
            lifeload: [3, 4]
        },
        description: 'An image-conscious homeowner focused on aesthetics and creating impressive spaces for entertaining.',
        tagline: 'Prioritizes aesthetics and impression management',
        advice: 'Focus on visual impact and design details. Maintain cleanliness during the project. Consider timing around social events. Offer options that enhance entertainment spaces.'
    },
    {
        id: 'champion-owner',
        name: 'The Champion Owner',
        ranges: {
            style: [3, 4],
            speed: [1, 2],
            budget: [2, 3],
            longevity: [4, 5],
            control: [2, 3],
            lifeload: [1, 2]
        },
        description: 'A quality-focused homeowner who values expertise and is willing to invest in excellence.',
        tagline: 'Seeks the best possible outcome regardless of time',
        advice: 'Demonstrate expertise and attention to detail. Recommend premium solutions when warranted. Take time to do things right. Share your professional perspective and experience.'
    },
    {
        id: 'standard-owner',
        name: 'The Standard Owner',
        description: 'A balanced homeowner with moderate priorities across all categories.',
        tagline: 'Values balance and reasonable compromises',
        advice: 'Offer balanced recommendations. Provide good/better/best options. Focus on meeting expectations consistently. Maintain clear, regular communication.'
    },
    {
        id: 'trickster',
        name: 'The Trickster',
        description: 'A homeowner with extreme or contradictory priorities that may be difficult to reconcile.',
        tagline: 'Has contradictory or extreme expectations',
        advice: 'Set very clear expectations. Document all agreements in writing. Identify potential conflicts early. Be prepared to educate on realistic constraints and trade-offs.'
    }
];

// Initialize event listeners
function initApp() {
    // Initialize DOM elements
    categoryView = document.getElementById('categoryView');
    resultView = document.getElementById('resultView');
    saveView = document.getElementById('saveView');
    rosterView = document.getElementById('rosterView');
    clientDetailView = document.getElementById('clientDetailView');
    confirmDialog = document.getElementById('confirmDialog');
    menu = document.getElementById('menu');

    usedPointsElement = document.getElementById('usedPoints');
    calculateButton = document.getElementById('calculateButton');
    resetButton = document.getElementById('resetButton');
    adjustButton = document.getElementById('adjustButton');
    saveButton = document.getElementById('saveButton');
    confirmSaveButton = document.getElementById('confirmSaveButton');
    cancelSaveButton = document.getElementById('cancelSaveButton');
    menuButton = document.getElementById('menuButton');
    showRosterButton = document.getElementById('showRosterButton');
    aboutButton = document.getElementById('aboutButton');
    closeRosterButton = document.getElementById('closeRosterButton');
    editButton = document.getElementById('editButton');
    deleteButton = document.getElementById('deleteButton');
    closeDetailButton = document.getElementById('closeDetailButton');
    confirmDeleteButton = document.getElementById('confirmDeleteButton');
    cancelDeleteButton = document.getElementById('cancelDeleteButton');
    clientNameInput = document.getElementById('clientName');
    
    // Make sure the confirm dialog is hidden on startup
    if (confirmDialog) {
        confirmDialog.classList.add('hidden');
    }
    
    loadClientData();
    initEventListeners();
    
    // Make sure we start in the category view
    if (categoryView) {
        showView(categoryView);
    }
}

function initEventListeners() {
    // Bubble selection
    document.querySelectorAll('.bubble').forEach(bubble => {
        bubble.addEventListener('click', handleBubbleClick);
    });

    // Button events
    calculateButton.addEventListener('click', calculateArchetype);
    resetButton.addEventListener('click', resetPoints);
    adjustButton.addEventListener('click', () => showView(categoryView));
    saveButton.addEventListener('click', () => showView(saveView));
    confirmSaveButton.addEventListener('click', saveClient);
    cancelSaveButton.addEventListener('click', () => showView(resultView));
    menuButton.addEventListener('click', toggleMenu);
    showRosterButton.addEventListener('click', showRoster);
    aboutButton.addEventListener('click', showAbout);
    closeRosterButton.addEventListener('click', () => showView(categoryView));
    editButton.addEventListener('click', editClient);
    deleteButton.addEventListener('click', showDeleteConfirmation);
    closeDetailButton.addEventListener('click', () => showView(rosterView));
    confirmDeleteButton.addEventListener('click', deleteClient);
    cancelDeleteButton.addEventListener('click', hideDeleteConfirmation);

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && e.target !== menuButton) {
            menu.classList.add('hidden');
        }
    });
}

// Handle bubble selection
function handleBubbleClick(e) {
    const bubble = e.target;
    const category = bubble.parentNode.parentNode.dataset.category;
    const value = parseInt(bubble.dataset.value);
    
    // Deselect previous bubble in this category
    const previousSelected = bubble.parentNode.querySelector('[data-selected="true"]');
    if (previousSelected) {
        previousSelected.dataset.selected = "false";
    }
    
    // Select the new bubble
    bubble.dataset.selected = "true";
    
    // Update points
    totalPoints = totalPoints - currentPoints[category] + value;
    currentPoints[category] = value;
    usedPointsElement.textContent = totalPoints;
    
    // Update UI
    updatePointsIndicator();
}

// Update the points indicator and calculate button state
function updatePointsIndicator() {
    if (totalPoints === 18) {
        usedPointsElement.textContent = "18";
        calculateButton.disabled = false;
    } else {
        const diff = totalPoints - 18;
        usedPointsElement.textContent = totalPoints;
        if (diff > 0) {
            usedPointsElement.textContent += ` (Over by ${diff})`;
        }
        calculateButton.disabled = true;
    }
}

// Calculate the client's archetype
function calculateArchetype() {
    // Check for special cases first
    if (isTrickster()) {
        currentArchetype = archetypes.find(a => a.id === 'trickster');
    }
    // Check for standard owner
    else if (isStandardOwner()) {
        currentArchetype = archetypes.find(a => a.id === 'standard-owner');
    }
    // Otherwise find the best match
    else {
        currentArchetype = findBestArchetypeMatch();
    }

    // Display the result
    displayArchetypeResult();
    showView(resultView);
}

// Check if the client is a trickster (has two or more 0s or three or more 5s)
function isTrickster() {
    const categories = Object.keys(currentPoints);
    const zeroCount = categories.filter(cat => currentPoints[cat] === 0).length;
    const fiveCount = categories.filter(cat => currentPoints[cat] === 5).length;
    
    return zeroCount >= 2 || fiveCount >= 3;
}

// Check if the client is a standard owner (all scores between 2-4)
function isStandardOwner() {
    return Object.values(currentPoints).every(val => val >= 2 && val <= 4);
}

// Find the best matching archetype
function findBestArchetypeMatch() {
    const relevantArchetypes = archetypes.filter(a => a.id !== 'trickster' && a.id !== 'standard-owner');
    
    let bestMatch = null;
    let lowestDeviation = Infinity;
    
    for (const archetype of relevantArchetypes) {
        if (!archetype.ranges) continue;
        
        let totalDeviation = 0;
        for (const category in currentPoints) {
            if (archetype.ranges[category]) {
                const [min, max] = archetype.ranges[category];
                const value = currentPoints[category];
                
                // Calculate deviation from the ideal range
                if (value < min) {
                    totalDeviation += min - value;
                } else if (value > max) {
                    totalDeviation += value - max;
                }
            }
        }
        
        if (totalDeviation < lowestDeviation) {
            lowestDeviation = totalDeviation;
            bestMatch = archetype;
        }
    }
    
    return bestMatch;
}

// Display the archetype result
function displayArchetypeResult() {
    if (!currentArchetype) return;
    
    document.getElementById('archetype-title').textContent = currentArchetype.name;
    document.getElementById('archetype-description').textContent = currentArchetype.description;
    document.getElementById('archetype-tagline').textContent = currentArchetype.tagline;
    document.getElementById('archetype-advice').textContent = currentArchetype.advice;
}

// Save a client
function saveClient() {
    const clientName = clientNameInput.value.trim();
    if (!clientName) {
        alert('Please enter a client name');
        return;
    }
    
    const today = new Date();
    const formattedDate = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
    
    const clientData = {
        name: clientName,
        date: formattedDate,
        archetype: currentArchetype.id,
        archetypeName: currentArchetype.name,
        points: {...currentPoints},
        timestamp: today.getTime()
    };
    
    if (currentClientIndex >= 0) {
        // Editing existing client
        clientResults[currentClientIndex] = clientData;
    } else {
        // Adding new client
        clientResults.push(clientData);
    }
    
    saveClientData();
    clientNameInput.value = '';
    currentClientIndex = -1;
    showRoster();
}

// Load client data from local storage
function loadClientData() {
    const storedData = localStorage.getItem('toolmanClients');
    if (storedData) {
        try {
            clientResults = JSON.parse(storedData);
        } catch (e) {
            console.error('Error loading client data:', e);
            clientResults = [];
        }
    }
}

// Save client data to local storage
function saveClientData() {
    localStorage.setItem('toolmanClients', JSON.stringify(clientResults));
}

// Show the roster view with all clients
function showRoster() {
    const clientListElement = document.getElementById('clientList');
    clientListElement.innerHTML = '';
    
    if (clientResults.length === 0) {
        clientListElement.innerHTML = '<p class="empty-message">No clients saved yet.</p>';
    } else {
        clientResults.sort((a, b) => b.timestamp - a.timestamp).forEach((client, index) => {
            const clientElement = document.createElement('div');
            clientElement.className = 'client-item';
            clientElement.innerHTML = `
                <h3>${client.name}</h3>
                <p>${client.archetypeName} - ${client.date}</p>
            `;
            
            // Add event listeners
            clientElement.addEventListener('click', () => showClientDetail(index));
            clientElement.addEventListener('touchstart', handleTouchStart);
            clientElement.addEventListener('touchend', (e) => handleTouchEnd(e, index));
            
            clientListElement.appendChild(clientElement);
        });
    }
    
    showView(rosterView);
    menu.classList.add('hidden');
}

// Touch events for long press
let touchTimer;
let touchStartX;
let touchStartY;

function handleTouchStart(e) {
    const touch = e.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
    
    touchTimer = setTimeout(() => {
        e.target.closest('.client-item').classList.add('long-press');
    }, 500);
}

function handleTouchEnd(e, index) {
    clearTimeout(touchTimer);
    const touch = e.changedTouches[0];
    const deltaX = Math.abs(touch.clientX - touchStartX);
    const deltaY = Math.abs(touch.clientY - touchStartY);
    
    const item = e.target.closest('.client-item');
    item.classList.remove('long-press');
    
    // If it was a tap (not much movement) and not a long press
    if (deltaX < 10 && deltaY < 10) {
        if (item.classList.contains('long-press')) {
            // Long press actions - edit the client
            editClientPoints(index);
        } else {
            // Normal tap - show details
            showClientDetail(index);
        }
    }
}

// Show client detail view
function showClientDetail(index) {
    const client = clientResults[index];
    currentClientIndex = index;
    
    document.getElementById('detail-name').textContent = client.name;
    document.getElementById('detail-date').textContent = client.date;
    document.getElementById('detail-archetype').textContent = client.archetypeName;
    
    const archetype = archetypes.find(a => a.id === client.archetype);
    if (archetype) {
        document.getElementById('detail-description').textContent = archetype.description;
        document.getElementById('detail-tagline').textContent = archetype.tagline;
        document.getElementById('detail-advice').textContent = archetype.advice;
    }
    
    // Show other clients with same name
    const otherClients = clientResults.filter((c, i) => 
        c.name === client.name && i !== index
    );
    
    const otherClientsElement = document.getElementById('otherClientsList');
    otherClientsElement.innerHTML = '';
    
    if (otherClients.length === 0) {
        document.querySelector('.other-clients').style.display = 'none';
    } else {
        document.querySelector('.other-clients').style.display = 'block';
        
        otherClients.forEach((otherClient, otherIndex) => {
            const realIndex = clientResults.findIndex(c => 
                c.name === otherClient.name && 
                c.timestamp === otherClient.timestamp
            );
            
            const clientElement = document.createElement('div');
            clientElement.className = 'other-client-item';
            clientElement.innerHTML = `
                <span>${otherClient.archetypeName}</span>
                <span>${otherClient.date}</span>
            `;
            
            clientElement.addEventListener('click', () => showClientDetail(realIndex));
            otherClientsElement.appendChild(clientElement);
        });
    }
    
    showView(clientDetailView);
}

// Edit an existing client
function editClient() {
    if (currentClientIndex >= 0) {
        editClientPoints(currentClientIndex);
    }
}

// Load a client's points for editing
function editClientPoints(index) {
    const client = clientResults[index];
    currentClientIndex = index;
    
    // Reset UI
    document.querySelectorAll('.bubble[data-selected="true"]').forEach(bubble => {
        bubble.dataset.selected = "false";
    });
    
    // Set points from saved client
    for (const category in client.points) {
        const value = client.points[category];
        const categoryElement = document.querySelector(`.category[data-category="${category}"]`);
        if (categoryElement) {
            const bubble = categoryElement.querySelector(`.bubble[data-value="${value}"]`);
            if (bubble) {
                bubble.dataset.selected = "true";
            }
        }
        currentPoints[category] = value;
    }
    
    // Update total points
    totalPoints = Object.values(currentPoints).reduce((sum, val) => sum + val, 0);
    updatePointsIndicator();
    
    showView(categoryView);
}

// Delete a client
function deleteClient() {
    if (currentClientIndex >= 0) {
        clientResults.splice(currentClientIndex, 1);
        saveClientData();
        hideDeleteConfirmation();
        showRoster();
    }
}

// Show delete confirmation dialog
function showDeleteConfirmation() {
    confirmDialog.classList.remove('hidden');
}

// Hide delete confirmation dialog
function hideDeleteConfirmation() {
    confirmDialog.classList.add('hidden');
}

// Show an about dialog
function showAbout() {
    alert('ToolMan Client Archetype\nVersion 1.0\n\nA tool for assessing client priorities in home projects.');
    menu.classList.add('hidden');
}

// Toggle the menu visibility
function toggleMenu() {
    menu.classList.toggle('hidden');
}

// Show a specific view and hide others
function showView(viewToShow) {
    document.querySelectorAll('.view').forEach(view => {
        view.classList.add('hidden');
    });
    viewToShow.classList.remove('hidden');
}

// Reset all points to zero
function resetPoints() {
    // Reset the state
    totalPoints = 0;
    currentPoints = {
        style: 0,
        speed: 0,
        budget: 0,
        longevity: 0,
        control: 0,
        lifeload: 0
    };
    
    // Reset the UI
    document.querySelectorAll('.bubble[data-selected="true"]').forEach(bubble => {
        bubble.dataset.selected = "false";
    });
    
    // Select all zero bubbles
    document.querySelectorAll('.bubble[data-value="0"]').forEach(bubble => {
        bubble.dataset.selected = "true";
    });
    
    // Update the counter
    usedPointsElement.textContent = "0";
    calculateButton.disabled = true;
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', initApp); 