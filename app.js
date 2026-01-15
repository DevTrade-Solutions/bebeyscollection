// Import modules
import { CartManager } from 'cart.js';
import { UI } from 'ui.js';
import { Data } from 'data.js';
import { EventHandlers } from 'events.js';

// Main App Module
const BebeysApp = (() => {
    // Initialize app
    function init() {
        // Initialize modules
        CartManager.init();
        UI.init();
        EventHandlers.init();
        
        // Set up initial state
        UI.renderProducts();
        CartManager.updateDisplay();
        
        // Set up fabric explorer
        setupFabricExplorer();
        
        // Set up calendar
        generateCalendar();
        
        // Set up scroll animations
        setupScrollAnimations();
        
        console.log('Bebeys Collection initialized');
    }
    
    function setupFabricExplorer() {
        const fabricData = {
            ankara: {
                image: 'https://images.unsplash.com/photo-1558769132-cb1c458e4222?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
                title: 'Ankara (Wax Print)',
                description: 'Originating from Dutch wax prints, Ankara has become synonymous with African fashion. Each pattern tells a story and carries cultural significance across West Africa.'
            },
            kente: {
                image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
                title: 'Kente Cloth',
                description: 'Woven by the Ashanti people of Ghana, Kente is characterized by bright colors, geometric patterns, and symbolic designs. Each pattern has a name and meaning.'
            },
            bogolan: {
                image: 'https://images.unsplash.com/photo-1567401893416-8f1f9e5b46ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
                title: 'Bogolan (Mudcloth)',
                description: 'Traditional Malian fabric dyed with fermented mud. Each Bogolan design is unique and often tells stories of history, mythology, or social status.'
            },
            'aso-oke': {
                image: 'https://images.unsplash.com/photo-1523380677598-64d85a1e0dab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
                title: 'Aso-Oke',
                description: 'A traditional Yoruba fabric from Nigeria, handwoven on narrow-strip looms. Often used for special occasions like weddings and naming ceremonies.'
            },
            adire: {
                image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
                title: 'Adire (Indigo)',
                description: 'Yoruba resist-dyed cloth using natural indigo dye. Techniques include tie-dye, stitch-resist, and starch-resist methods passed through generations.'
            }
        };

        const fabricListItems = document.querySelectorAll('#fabricList li');
        const fabricImage = document.getElementById('fabricImage');
        const fabricTitle = document.getElementById('fabricTitle');
        const fabricDescription = document.getElementById('fabricDescription');

        if (fabricListItems.length > 0) {
            fabricListItems.forEach(item => {
                item.addEventListener('click', () => {
                    fabricListItems.forEach(li => li.classList.remove('active'));
                    item.classList.add('active');
                    const fabricType = item.getAttribute('data-fabric');
                    const data = fabricData[fabricType];
                    fabricImage.src = data.image;
                    fabricTitle.textContent = data.title;
                    fabricDescription.textContent = data.description;
                });
            });
        }
    }
    
    function generateCalendar() {
        const calendarDates = document.getElementById('calendarDates');
        
        if (!calendarDates) return;
        
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const firstDayOfWeek = firstDay.getDay();
        
        calendarDates.innerHTML = '';
        
        for (let i = 0; i < firstDayOfWeek; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.className = 'date';
            calendarDates.appendChild(emptyCell);
        }
        
        for (let day = 1; day <= daysInMonth; day++) {
            const dateCell = document.createElement('div');
            dateCell.className = 'date';
            dateCell.textContent = day;
            
            if (day === 15 || day === 20) {
                dateCell.classList.add('event');
                dateCell.addEventListener('click', () => {
                    UI.showToast(`Event on December ${day}: ${day === 15 ? 'Virtual Fashion Show' : 'Artisan Workshop'}`, 'success');
                });
            }
            
            if (day === today.getDate() && month === today.getMonth()) {
                dateCell.style.backgroundColor = 'var(--accent)';
                dateCell.style.color = 'white';
            }
            
            calendarDates.appendChild(dateCell);
        }
    }
    
    function setupScrollAnimations() {
        const fadeElements = document.querySelectorAll('.fade-in');

        const fadeInOnScroll = () => {
            fadeElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementTop < windowHeight - 100) {
                    element.classList.add('visible');
                }
            });
        };

        // Initial check
        fadeInOnScroll();

        // Check on scroll
        window.addEventListener('scroll', fadeInOnScroll);
    }
    
    return {
        init
    };
})();

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', BebeysApp.init);