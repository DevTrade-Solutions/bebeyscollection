
// store.js - Store Page Specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Store Navigation
    const storeNavBtns = document.querySelectorAll('.store-nav-btn');
    const storeSections = document.querySelectorAll('.store-section');
    const storeNav = document.querySelector('.store-nav');
    
    // Remove "Take a Virtual Tour" section from DOM
    const storeTour = document.querySelector('.store-tour');
    if (storeTour) {
        storeTour.remove();
    }
    
    // Store Navigation
    storeNavBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and sections
            storeNavBtns.forEach(b => b.classList.remove('active'));
            storeSections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Show corresponding section
            const sectionId = btn.dataset.section;
            const section = document.getElementById(sectionId);
            if (section) {
                section.classList.add('active');
                
                // Scroll to section with offset for sticky nav
                const navHeight = storeNav?.offsetHeight || 0;
                const headerHeight = document.querySelector('.header').offsetHeight;
                const offset = navHeight + headerHeight + 20; // Add 20px buffer
                
                window.scrollTo({
                    top: section.offsetTop - offset,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Event Data
    const events = [
        {
            id: 1,
            title: "New Collection Launch",
            date: "2023-12-15",
            time: "6:00 PM - 9:00 PM",
            type: "VIP Event",
            capacity: "Limited to 50 guests",
            image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
            description: "Exclusive preview of our winter collection with live music and refreshments. Be the first to experience our latest designs featuring traditional African textiles with modern silhouettes.",
            features: [
                "First look at new collection",
                "Live traditional music performance",
                "Artisan demonstrations",
                "Gourmet African-inspired refreshments",
                "Meet the designers",
                "Special launch discounts"
            ]
        },
        {
            id: 2,
            title: "Artisan Workshop",
            date: "2023-12-20",
            time: "2:00 PM - 5:00 PM",
            type: "Workshop",
            capacity: "Maximum 15 participants",
            image: "https://images.unsplash.com/photo-1520006403909-838d6b92c22e?auto=format&fit=crop&w=800&q=80",
            description: "Learn traditional African weaving techniques from master artisans. This hands-on workshop will teach you the basics of Kente cloth weaving and Adinkra symbol stamping.",
            features: [
                "Hands-on weaving instruction",
                "All materials provided",
                "Take home your creation",
                "Learn about fabric history",
                "Refreshments included",
                "Certificate of completion"
            ]
        },
        {
            id: 3,
            title: "Personal Styling Day",
            date: "2023-12-22",
            time: "10:00 AM - 6:00 PM",
            type: "Service Day",
            capacity: "Appointment only",
            image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80",
            description: "Complimentary styling sessions with our expert stylists. Get personalized advice on building your wardrobe with African-inspired pieces that suit your style and lifestyle.",
            features: [
                "30-minute styling sessions",
                "Wardrobe assessment",
                "Color analysis",
                "Style recommendations",
                "Digital lookbook",
                "Special discount on purchases"
            ]
        }
    ];

    // Event Modal Elements
    const eventModal = document.getElementById('eventModal');
    const closeEventModal = document.getElementById('closeEventModal');
    const viewEventBtns = document.querySelectorAll('.view-event');
    const registerEventBtns = document.querySelectorAll('.register-event');
    const registerEventModalBtn = document.getElementById('registerEventModalBtn');
    const shareEventBtn = document.getElementById('shareEventBtn');

    // Service Modal Elements
    const serviceModal = document.getElementById('serviceModal');
    const closeServiceModal = document.getElementById('closeServiceModal');
    const bookServiceBtns = document.querySelectorAll('.book-service');
    const selectPackageBtns = document.querySelectorAll('.select-package');
    const serviceBookingForm = document.getElementById('serviceBookingForm');

    // Appointment Form
    const appointmentForm = document.getElementById('appointmentForm');

    // Contact Buttons
    const getDirectionsBtn = document.getElementById('getDirectionsBtn');
    const bookValetBtn = document.getElementById('bookValetBtn');
    const callNowBtns = document.querySelectorAll('.call-now-btn');
    const sendEmailBtns = document.querySelectorAll('.send-email-btn');
    const getDirectionsContactBtns = document.querySelectorAll('.get-directions-btn');

    // Event Buttons
    const inquireEventsBtn = document.getElementById('inquireEventsBtn');
    const downloadEventKitBtn = document.getElementById('downloadEventKitBtn');

    // CTA Buttons
    const bookVisitBtn = document.getElementById('bookVisitBtn');
    const downloadStoreGuideBtn = document.getElementById('downloadStoreGuideBtn');
    const quickCallBtn = document.getElementById('quickCallBtn');

    // Map Controls
    const zoomInBtn = document.getElementById('zoomInBtn');
    const zoomOutBtn = document.getElementById('zoomOutBtn');

    // Live Chat Elements
    const chatToggle = document.getElementById('chatToggle');
    const chatContainer = document.getElementById('chatContainer');
    const closeChat = document.getElementById('closeChat');
    const sendMessageBtn = document.getElementById('sendMessage');
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');

    // Toast Notification
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');

    // Initialize functions
    initStoreNavigation();
    initEventModal();
    initServiceModal();
    initAppointmentForm();
    initContactButtons();
    initMapControls();
    initLiveChat();
    initCalendar();
    initCTAButtons();

    // Store Navigation
    function initStoreNavigation() {
        // Handle responsive store nav
        function handleStoreNavResponsive() {
            const storeSectionsContainer = document.querySelector('.store-sections');
            
            if (window.innerWidth <= 992) {
                if (storeSectionsContainer) {
                    storeSectionsContainer.style.overflowX = 'auto';
                    storeSectionsContainer.style.justifyContent = 'flex-start';
                    storeSectionsContainer.style.padding = '0.5rem 0';
                }
            } else {
                if (storeSectionsContainer) {
                    storeSectionsContainer.style.overflowX = 'visible';
                    storeSectionsContainer.style.justifyContent = 'center';
                    storeSectionsContainer.style.padding = '';
                }
            }
        }
        
        window.addEventListener('resize', handleStoreNavResponsive);
        handleStoreNavResponsive();
    }

    // Event Modal
    function initEventModal() {
        // View Event Details
        viewEventBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const eventId = parseInt(btn.dataset.event);
                const event = events.find(e => e.id === eventId);
                
                if (event) {
                    openEventModal(event);
                }
            });
        });

        // Register for Event
        registerEventBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const eventId = parseInt(btn.dataset.event);
                showToast(`Registered for event #${eventId}! Check your email for confirmation.`, 'success');
            });
        });

        // Close Event Modal
        if (closeEventModal) {
            closeEventModal.addEventListener('click', () => {
                eventModal.classList.remove('active');
                document.body.classList.remove('modal-open');
            });
        }

        // Close modal when clicking outside
        eventModal.addEventListener('click', (e) => {
            if (e.target === eventModal) {
                eventModal.classList.remove('active');
                document.body.classList.remove('modal-open');
            }
        });

        // Register from Modal
        if (registerEventModalBtn) {
            registerEventModalBtn.addEventListener('click', function() {
                const eventId = this.dataset.eventId;
                if (eventId) {
                    showToast(`Registered for event #${eventId}! Check your email for confirmation.`, 'success');
                    eventModal.classList.remove('active');
                    document.body.classList.remove('modal-open');
                }
            });
        }

        // Share Event
        if (shareEventBtn) {
            shareEventBtn.addEventListener('click', () => {
                if (navigator.share) {
                    navigator.share({
                        title: document.getElementById('modalEventTitle').textContent,
                        text: document.getElementById('modalEventDescription').textContent,
                        url: window.location.href
                    });
                } else {
                    showToast('Event link copied to clipboard!', 'success');
                    // Fallback: Copy to clipboard
                    navigator.clipboard.writeText(window.location.href);
                }
            });
        }
    }

    // Service Modal
    function initServiceModal() {
        // Book Service
        bookServiceBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const serviceType = btn.dataset.service;
                let title = '';
                let description = '';
                
                switch(serviceType) {
                    case 'styling':
                        title = 'Personal Styling Session';
                        description = 'Book a one-on-one session with our expert stylists.';
                        break;
                    case 'alterations':
                        title = 'Custom Alterations';
                        description = 'Schedule a fitting and alterations appointment.';
                        break;
                    case 'garment-care':
                        title = 'Garment Care Service';
                        description = 'Book professional cleaning and preservation.';
                        break;
                    default:
                        title = 'Service Booking';
                        description = 'Schedule your appointment with our experts.';
                }
                
                document.getElementById('modalServiceTitle').textContent = title;
                document.getElementById('modalServiceDescription').textContent = description;
                
                serviceModal.classList.add('active');
                document.body.classList.add('modal-open');
            });
        });

        // Select Package
        selectPackageBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const packageType = btn.dataset.package;
                showToast(`${packageType.charAt(0).toUpperCase() + packageType.slice(1)} package selected!`, 'success');
            });
        });

        // Close Service Modal
        if (closeServiceModal) {
            closeServiceModal.addEventListener('click', () => {
                serviceModal.classList.remove('active');
                document.body.classList.remove('modal-open');
            });
        }

        // Close modal when clicking outside
        serviceModal.addEventListener('click', (e) => {
            if (e.target === serviceModal) {
                serviceModal.classList.remove('active');
                document.body.classList.remove('modal-open');
            }
        });

        // Time Slot Selection
        const timeSlots = document.querySelectorAll('.time-slot');
        timeSlots.forEach(slot => {
            if (!slot.classList.contains('booked')) {
                slot.addEventListener('click', () => {
                    timeSlots.forEach(s => s.classList.remove('selected'));
                    slot.classList.add('selected');
                });
            }
        });

        // Service Booking Form
        if (serviceBookingForm) {
            serviceBookingForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const formData = new FormData(serviceBookingForm);
                const data = Object.fromEntries(formData);
                
                console.log('Service booking:', data);
                
                showToast('Service booking confirmed! Check your email for details.', 'success');
                
                serviceBookingForm.reset();
                serviceModal.classList.remove('active');
                document.body.classList.remove('modal-open');
            });
        }
    }

    // Appointment Form
    function initAppointmentForm() {
        if (appointmentForm) {
            appointmentForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const formData = new FormData(appointmentForm);
                const data = Object.fromEntries(formData);
                
                console.log('Appointment request:', data);
                
                showToast('Appointment request submitted successfully! We\'ll contact you within 24 hours.', 'success');
                
                appointmentForm.reset();
                
                // Navigate to thank you or confirmation
                setTimeout(() => {
                    const appointmentSection = document.getElementById('appointment');
                    const contactSection = document.getElementById('contact');
                    
                    if (appointmentSection && contactSection) {
                        appointmentSection.classList.remove('active');
                        contactSection.classList.add('active');
                        
                        // Update nav buttons
                        storeNavBtns.forEach(btn => {
                            btn.classList.remove('active');
                            if (btn.dataset.section === 'contact') {
                                btn.classList.add('active');
                            }
                        });
                    }
                }, 1500);
            });
        }
    }

    // Contact Buttons
    function initContactButtons() {
        // Get Directions
        if (getDirectionsBtn) {
            getDirectionsBtn.addEventListener('click', () => {
                const address = encodeURIComponent('123 Luxury Avenue, Sandton, Johannesburg 2196');
                window.open(`https://www.google.com/maps/dir/?api=1&destination=${address}`, '_blank');
            });
        }

        // Book Valet
        if (bookValetBtn) {
            bookValetBtn.addEventListener('click', () => {
                showToast('Valet parking booking feature coming soon!', 'info');
            });
        }

        // Call Now Buttons
        callNowBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                window.location.href = 'tel:+27112345678';
            });
        });

        // Send Email Buttons
        sendEmailBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                window.location.href = 'mailto:info@bebeyscollection.com';
            });
        });

        // Get Directions Contact Buttons
        getDirectionsContactBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const address = encodeURIComponent('123 Luxury Avenue, Sandton, Johannesburg 2196');
                window.open(`https://www.google.com/maps/dir/?api=1&destination=${address}`, '_blank');
            });
        });
    }

    // Map Controls
    function initMapControls() {
        if (zoomInBtn) {
            zoomInBtn.addEventListener('click', () => {
                showToast('Map zoom in feature coming soon!', 'info');
            });
        }

        if (zoomOutBtn) {
            zoomOutBtn.addEventListener('click', () => {
                showToast('Map zoom out feature coming soon!', 'info');
            });
        }
    }

    // Live Chat
    function initLiveChat() {
        let chatOpen = false;
        
        if (chatToggle && chatContainer && closeChat) {
            chatToggle.addEventListener('click', () => {
                chatOpen = !chatOpen;
                chatContainer.classList.toggle('active', chatOpen);
            });
            
            closeChat.addEventListener('click', () => {
                chatOpen = false;
                chatContainer.classList.remove('active');
            });
            
            if (sendMessageBtn && chatInput && chatMessages) {
                sendMessageBtn.addEventListener('click', sendChatMessage);
                chatInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        sendChatMessage();
                    }
                });
            }
        }
        
        function sendChatMessage() {
            const message = chatInput.value.trim();
            if (message) {
                // Add user message
                addChatMessage(message, 'user');
                chatInput.value = '';
                
                // Simulate bot response after delay
                setTimeout(() => {
                    const responses = [
                        "Thank you for your message! How can I assist you further?",
                        "I understand. Our team will get back to you shortly.",
                        "Would you like me to connect you with a specific department?",
                        "Is there anything specific about our store or services you'd like to know?"
                    ];
                    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                    addChatMessage(randomResponse, 'bot');
                }, 1000);
            }
        }
        
        function addChatMessage(text, sender) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${sender}`;
            
            const contentDiv = document.createElement('div');
            contentDiv.className = 'message-content';
            
            const timeSpan = document.createElement('span');
            timeSpan.className = 'message-time';
            timeSpan.textContent = 'Just now';
            
            contentDiv.textContent = text;
            contentDiv.appendChild(timeSpan);
            messageDiv.appendChild(contentDiv);
            
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }

    // Calendar
    function initCalendar() {
        const currentMonthEl = document.getElementById('currentMonth');
        const prevMonthBtn = document.getElementById('prevMonth');
        const nextMonthBtn = document.getElementById('nextMonth');
        
        if (currentMonthEl && prevMonthBtn && nextMonthBtn) {
            let currentDate = new Date();
            
            function updateCalendarDisplay() {
                const options = { year: 'numeric', month: 'long' };
                currentMonthEl.textContent = currentDate.toLocaleDateString('en-US', options);
            }
            
            prevMonthBtn.addEventListener('click', () => {
                currentDate.setMonth(currentDate.getMonth() - 1);
                updateCalendarDisplay();
            });
            
            nextMonthBtn.addEventListener('click', () => {
                currentDate.setMonth(currentDate.getMonth() + 1);
                updateCalendarDisplay();
            });
            
            updateCalendarDisplay();
        }
    }

    // CTA Buttons
    function initCTAButtons() {
        // Inquire About Events
        if (inquireEventsBtn) {
            inquireEventsBtn.addEventListener('click', () => {
                showToast('Event inquiry form coming soon!', 'info');
            });
        }

        // Download Event Kit
        if (downloadEventKitBtn) {
            downloadEventKitBtn.addEventListener('click', () => {
                showToast('Event kit download coming soon!', 'info');
            });
        }

        // Book Visit
        if (bookVisitBtn) {
            bookVisitBtn.addEventListener('click', () => {
                // Scroll to appointment section
                const appointmentSection = document.getElementById('appointment');
                const appointmentBtn = document.querySelector('[data-section="appointment"]');
                
                if (appointmentSection && appointmentBtn) {
                    // Update navigation
                    storeNavBtns.forEach(btn => btn.classList.remove('active'));
                    storeSections.forEach(section => section.classList.remove('active'));
                    
                    appointmentBtn.classList.add('active');
                    appointmentSection.classList.add('active');
                    
                    // Scroll to section
                    const navHeight = storeNav?.offsetHeight || 0;
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const offset = navHeight + headerHeight + 20;
                    
                    window.scrollTo({
                        top: appointmentSection.offsetTop - offset,
                        behavior: 'smooth'
                    });
                }
            });
        }

        // Download Store Guide
        if (downloadStoreGuideBtn) {
            downloadStoreGuideBtn.addEventListener('click', () => {
                showToast('Store guide download coming soon!', 'info');
            });
        }

        // Quick Call
        if (quickCallBtn) {
            quickCallBtn.addEventListener('click', () => {
                window.location.href = 'tel:+27112345678';
            });
        }
    }

    // Helper Functions
    function openEventModal(event) {
        // Parse date
        const eventDate = new Date(event.date);
        const day = eventDate.getDate();
        const month = eventDate.toLocaleString('default', { month: 'short' });
        const fullDate = eventDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        // Update modal content
        document.getElementById('modalEventImage').src = event.image;
        document.getElementById('modalEventDay').textContent = day;
        document.getElementById('modalEventMonth').textContent = month;
        document.getElementById('modalEventType').textContent = event.type;
        document.getElementById('modalEventTitle').textContent = event.title;
        document.getElementById('modalEventTime').textContent = event.time;
        document.getElementById('modalEventDate').textContent = fullDate;
        document.getElementById('modalEventCapacity').textContent = event.capacity;
        document.getElementById('modalEventDescription').textContent = event.description;
        
        // Update features list
        const featuresList = document.getElementById('modalEventFeatures');
        featuresList.innerHTML = '';
        event.features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            featuresList.appendChild(li);
        });
        
        // Update registration button
        if (registerEventModalBtn) {
            registerEventModalBtn.dataset.eventId = event.id;
        }
        
        // Show modal
        eventModal.classList.add('active');
        document.body.classList.add('modal-open');
    }

    function showToast(message, type = 'success') {
        if (toast && toastMessage) {
            toastMessage.textContent = message;
            toast.className = `toast ${type} show`;
            
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }
    }

    // Initialize store page
    console.log('Store page initialized');
});
