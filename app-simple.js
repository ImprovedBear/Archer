// Simplified App Logic for ToolMan Client Archetype
console.log('Simplified app.js loaded');

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM is ready in simplified app');
    
    // Get DOM elements
    const bubbles = document.querySelectorAll('.bubble');
    const usedPointsElement = document.getElementById('usedPoints');
    const calculateButton = document.getElementById('calculateButton');
    const resetButton = document.getElementById('resetButton');
    
    // Views
    const categoryView = document.getElementById('categoryView');
    const resultView = document.getElementById('resultView');
    
    // Result elements
    const archetypeTitle = document.getElementById('archetype-title');
    const archetypeDescription = document.getElementById('archetype-description');
    const archetypeTagline = document.getElementById('archetype-tagline');
    const archetypeAdvice = document.getElementById('archetype-advice');
    const adjustButton = document.getElementById('adjustButton');
    
    // Track points
    let currentPoints = {
        style: 0,
        speed: 0,
        budget: 0,
        longevity: 0,
        control: 0,
        lifeload: 0
    };
    let totalPoints = 0;
    
    // Add event listeners to bubbles
    bubbles.forEach(bubble => {
        bubble.addEventListener('click', function() {
            const value = parseInt(this.dataset.value);
            const category = this.parentNode.parentNode.dataset.category;
            
            // Deselect previous bubble in this category
            const previousSelected = this.parentNode.querySelector('[data-selected="true"]');
            if (previousSelected) {
                previousSelected.dataset.selected = "false";
            }
            
            // Select the new bubble
            this.dataset.selected = "true";
            
            // Update points
            totalPoints = totalPoints - currentPoints[category] + value;
            currentPoints[category] = value;
            
            // Update counter
            usedPointsElement.textContent = totalPoints;
            
            // Enable/disable calculate button
            if (totalPoints === 18) {
                calculateButton.disabled = false;
            } else {
                calculateButton.disabled = true;
            }
        });
    });
    
    // Reset button
    if (resetButton) {
        resetButton.addEventListener('click', function() {
            // Reset state
            totalPoints = 0;
            for (const category in currentPoints) {
                currentPoints[category] = 0;
            }
            
            // Reset UI
            bubbles.forEach(bubble => {
                if (bubble.dataset.value === "0") {
                    bubble.dataset.selected = "true";
                } else {
                    bubble.dataset.selected = "false";
                }
            });
            
            // Update counter
            usedPointsElement.textContent = "0";
            calculateButton.disabled = true;
        });
    }
    
    // Calculate button
    if (calculateButton) {
        calculateButton.addEventListener('click', function() {
            // Simple archetype determination
            let archetypeId = determineArchetype(currentPoints);
            
            // Display the result
            if (archetypeId) {
                displayResult(archetypeId);
                
                // Show result view
                categoryView.classList.add('hidden');
                resultView.classList.remove('hidden');
            }
        });
    }
    
    // Adjust button
    if (adjustButton) {
        adjustButton.addEventListener('click', function() {
            // Switch back to category view
            resultView.classList.add('hidden');
            categoryView.classList.remove('hidden');
        });
    }
    
    // Function to determine archetype based on points
    function determineArchetype(points) {
        // Check for trickster (two or more 0s or three or more 5s)
        const zeroCount = Object.values(points).filter(val => val === 0).length;
        const fiveCount = Object.values(points).filter(val => val === 5).length;
        
        if (zeroCount >= 2 || fiveCount >= 3) {
            return 'trickster';
        }
        
        // Check for standard owner (all scores between 2-4)
        if (Object.values(points).every(val => val >= 2 && val <= 4)) {
            return 'standard-owner';
        }
        
        // Simple matching based on highest categories
        const entries = Object.entries(points);
        entries.sort((a, b) => b[1] - a[1]); // Sort by value, highest first
        
        if (entries[0][1] >= 4) {
            // Check highest value category
            if (entries[0][0] === 'style' && entries[0][1] === 5) {
                return 'host';
            } else if (entries[0][0] === 'speed' && entries[0][1] >= 4) {
                return 'busy-owner';
            } else if (entries[0][0] === 'longevity' && entries[0][1] >= 4) {
                if (entries[1][0] === 'control' && entries[1][1] >= 4) {
                    return 'craftsman';
                } else {
                    return 'champion-owner';
                }
            } else if (entries[0][0] === 'control' && entries[0][1] >= 4) {
                return 'home-partner';
            } else if (entries[0][0] === 'lifeload' && entries[0][1] >= 4) {
                return 'family-home';
            }
        }
        
        // Default archetypes if no clear pattern
        if (points.style <= 2 && points.budget >= 3 && points.longevity >= 3) {
            return 'respected-homeowner';
        } else if (points.control >= 3 && points.longevity >= 3) {
            return 'steward';
        } else if (points.speed <= 1 && points.longevity >= 4) {
            return 'strategist';
        }
        
        // Default
        return 'learner';
    }
    
    // Function to display archetype result
    function displayResult(archetypeId) {
        const archetypes = {
            'learner': {
                name: 'The Learner',
                description: 'A knowledge-seeking homeowner who values collaboration and learning throughout the process.',
                tagline: 'Wants to understand the "why" behind recommendations',
                advice: 'Explain your reasoning clearly. Provide resources for further learning. Take time to teach during the project. Show respect for their questions and interest in learning.'
            },
            'busy-owner': {
                name: 'The Busy Owner',
                description: 'A time-constrained homeowner who needs quick, efficient solutions with minimal involvement.',
                tagline: 'Values speed and convenience above all else',
                advice: 'Be efficient with meetings and communications. Offer simplified decisions. Focus on speed and minimize disruption. Provide clear, concise updates.'
            },
            'steward': {
                name: 'The Steward',
                description: 'A caretaker who views their home as a legacy to be preserved and improved with care.',
                tagline: 'Prioritizes long-term care and maintenance',
                advice: 'Emphasize quality materials and craftsmanship. Provide documentation for future maintenance. Respect the home's history and character. Focus on sustainable solutions.'
            },
            'family-home': {
                name: 'The Family Home',
                description: 'A bustling household where practical solutions for everyday family life are the priority.',
                tagline: 'Needs solutions that work in a busy household',
                advice: 'Prioritize safety and durability. Respect the chaos of family life. Offer practical, functional solutions. Be patient with scheduling and communication.'
            },
            'home-partner': {
                name: 'The Home Partner',
                description: 'A collaborative homeowner who values teamwork and wants active involvement in decisions.',
                tagline: 'Values the collaborative process and relationship',
                advice: 'Invite input and collaboration. Hold regular check-ins. Share decision-making. Value their insights about their own home. Build a genuine relationship.'
            },
            'strategist': {
                name: 'The Strategist',
                description: 'A methodical planner focused on long-term value and structural integrity.',
                tagline: 'Plans meticulously for long-term outcomes',
                advice: 'Provide detailed plans and specifications. Discuss long-term implications. Share technical details. Respect their systematic approach. Offer data-driven recommendations.'
            },
            'respected-homeowner': {
                name: 'The Respected Homeowner',
                description: 'A practical homeowner seeking reliable, long-lasting solutions at a fair price.',
                tagline: 'Values straightforward quality and reliability',
                advice: 'Be transparent about costs and timelines. Provide straightforward options. Focus on reliability and proven solutions. Respect their practical approach to decision-making.'
            },
            'craftsman': {
                name: 'The Craftsman',
                description: 'A detail-oriented homeowner who appreciates technical excellence and hands-on involvement.',
                tagline: 'Values technical excellence and craftsmanship',
                advice: 'Share technical details and reasoning. Allow for inspection of work. Respect their knowledge of tools and techniques. Be prepared for detailed questions and high standards.'
            },
            'host': {
                name: 'The Host',
                description: 'An image-conscious homeowner focused on aesthetics and creating impressive spaces for entertaining.',
                tagline: 'Prioritizes aesthetics and impression management',
                advice: 'Focus on visual impact and design details. Maintain cleanliness during the project. Consider timing around social events. Offer options that enhance entertainment spaces.'
            },
            'champion-owner': {
                name: 'The Champion Owner',
                description: 'A quality-focused homeowner who values expertise and is willing to invest in excellence.',
                tagline: 'Seeks the best possible outcome regardless of time',
                advice: 'Demonstrate expertise and attention to detail. Recommend premium solutions when warranted. Take time to do things right. Share your professional perspective and experience.'
            },
            'standard-owner': {
                name: 'The Standard Owner',
                description: 'A balanced homeowner with moderate priorities across all categories.',
                tagline: 'Values balance and reasonable compromises',
                advice: 'Offer balanced recommendations. Provide good/better/best options. Focus on meeting expectations consistently. Maintain clear, regular communication.'
            },
            'trickster': {
                name: 'The Trickster',
                description: 'A homeowner with extreme or contradictory priorities that may be difficult to reconcile.',
                tagline: 'Has contradictory or extreme expectations',
                advice: 'Set very clear expectations. Document all agreements in writing. Identify potential conflicts early. Be prepared to educate on realistic constraints and trade-offs.'
            }
        };
        
        const archetype = archetypes[archetypeId];
        
        // Display archetype information
        archetypeTitle.textContent = archetype.name;
        archetypeDescription.textContent = archetype.description;
        archetypeTagline.textContent = archetype.tagline;
        archetypeAdvice.textContent = archetype.advice;
    }
}); 