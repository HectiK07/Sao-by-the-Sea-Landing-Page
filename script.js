document.addEventListener('DOMContentLoaded', () => {

    // --- 1. DYNAMIC HEADER STATES ON SCROLL ---
    const header = document.getElementById('header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check on load


    // --- 2. FULLSCREEN MOBILE NAV MENU ---
    const menuToggle = document.getElementById('menuToggle');
    const fullscreenNav = document.getElementById('fullscreenNav');
    
    const toggleMenu = () => {
        const isActive = menuToggle.classList.toggle('active');
        fullscreenNav.classList.toggle('active');
        
        if (isActive) {
            fullscreenNav.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden'; // Stop background scrolling
        } else {
            fullscreenNav.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = ''; // Resume scrolling
        }
    };
    
    menuToggle.addEventListener('click', toggleMenu);
    
    // Close the menu when clicking on the semi-transparent backdrop overlay
    fullscreenNav.addEventListener('click', (e) => {
        if (e.target === fullscreenNav) {
            toggleMenu();
        }
    });
    
    // Allow closing the menu when clicking on nav links
    window.toggleMenu = toggleMenu; 


    // --- 3. OPTIMIZED SCROLL-TRIGGERED REVEAL SYSTEM ---
    // Emulates premium fluid GSAP reveals using native Intersection Observer
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target); // Reveal only once
            }
        });
    }, {
        threshold: 0.05,
        rootMargin: '0px 0px -40px 0px' // Trigger slightly before element is in full view
    });
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });


    // --- 4. LUXURY REVIEWS WIDGET CAROUSEL (CSS INFINITE LOOP) ---
    // The reviews carousel is powered by smooth hardware-accelerated CSS marquee animations.
    // Manual JS pagination has been replaced with automatic loop scroll and pause-on-hover logic.


    // --- 5. DYNAMIC DATE PICKER RESTRICTION (UX BEST PRACTICE) ---
    // Ensure guests cannot pick a date in the past
    const bookingDateInput = document.getElementById('bookingDate');
    if (bookingDateInput) {
        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1; // Months start at 0
        let dd = today.getDate();
        
        if (mm < 10) mm = '0' + mm;
        if (dd < 10) dd = '0' + dd;
        
        const formattedToday = `${yyyy}-${mm}-${dd}`;
        bookingDateInput.min = formattedToday;
    }


    // --- 6. PREMIUM BOOKING FORM HANDLING & MODAL ---
    const bookingForm = document.getElementById('bookingForm');
    const successModal = document.getElementById('bookingSuccessModal');
    
    const openModal = () => {
        successModal.classList.add('active');
        successModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    };
    
    const closeModal = () => {
        successModal.classList.remove('active');
        successModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };
    
    // Make modal close action globally available
    window.closeModal = closeModal;
    
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Collect form data values
        const name = document.getElementById('bookingName').value.trim();
        const phone = document.getElementById('bookingPhone').value.trim();
        const experience = document.getElementById('bookingExperience').value;
        const date = document.getElementById('bookingDate').value;
        
        // Perform clean validation
        if (!name || !phone || !experience || !date) {
            alert('Please fill in all required fields to reserve your experience.');
            return;
        }
        
        // Map category IDs to descriptive text
        const expLabels = {
            dine: "Book a Table (Dining)",
            stay: "Reserve a Stay (Resort)",
            celebrate: "Host an Event / Party",
            play: "Book Courts / Track"
        };
        const friendlyExp = expLabels[experience] || experience;

        // Construct text message
        const message = `*SAO BY THE SEA - RESERVATION INQUIRY*\n` +
                        `--------------------------------------\n` +
                        `👤 *Name:* ${name}\n` +
                        `📱 *Phone:* ${phone}\n` +
                        `✨ *Experience:* ${friendlyExp}\n` +
                        `📅 *Date:* ${date}\n` +
                        `--------------------------------------\n` +
                        `_Request sent from SAO website_`;

        const encodedMessage = encodeURIComponent(message);
        const waUrl = `https://wa.me/919321636513?text=${encodedMessage}`;
        
        console.log('Sending reservation data via WhatsApp to +91 93216 36513:', { name, phone, friendlyExp, date });
        
        // Reset form
        bookingForm.reset();
        
        // Open WhatsApp in new tab
        window.open(waUrl, '_blank');

        // Show high-end glassmorphism success modal in background
        openModal();
    });

    // Close modal on escape key or clicking outside
    if (successModal) {
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) {
                closeModal();
            }
        });
    }
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && successModal && successModal.classList.contains('active')) {
            closeModal();
        }
    });

    // --- 7. STICKY BOOKING DRAWERS & WHATSAPP INTEGRATION ---
    const stickyTabEvents = document.getElementById('stickyTabEvents');
    const stickyTabTable = document.getElementById('stickyTabTable');
    const stickyTabRoom = document.getElementById('stickyTabRoom');
    const eventsDrawer = document.getElementById('eventsDrawer');
    const tableDrawer = document.getElementById('tableDrawer');
    const roomDrawer = document.getElementById('roomDrawer');
    const eventsDrawerClose = document.getElementById('eventsDrawerClose');
    const tableDrawerClose = document.getElementById('tableDrawerClose');
    const roomDrawerClose = document.getElementById('roomDrawerClose');
    const drawerOverlay = document.getElementById('drawerOverlay');

    const openDrawer = (drawer) => {
        if (!drawer) return;
        // Close any other open drawer first
        [eventsDrawer, tableDrawer, roomDrawer].forEach(d => {
            if (d && d !== drawer) {
                d.classList.remove('active');
                d.setAttribute('aria-hidden', 'true');
            }
        });
        
        drawer.classList.add('active');
        drawer.setAttribute('aria-hidden', 'false');
        if (drawerOverlay) {
            drawerOverlay.classList.add('active');
            drawerOverlay.setAttribute('aria-hidden', 'false');
        }
        document.body.style.overflow = 'hidden';
    };

    const closeAllDrawers = () => {
        [eventsDrawer, tableDrawer, roomDrawer].forEach(d => {
            if (d) {
                d.classList.remove('active');
                d.setAttribute('aria-hidden', 'true');
            }
        });
        if (drawerOverlay) {
            drawerOverlay.classList.remove('active');
            drawerOverlay.setAttribute('aria-hidden', 'true');
        }
        document.body.style.overflow = '';
    };

    if (stickyTabEvents) stickyTabEvents.addEventListener('click', () => openDrawer(eventsDrawer));
    if (stickyTabTable) stickyTabTable.addEventListener('click', () => openDrawer(tableDrawer));
    if (stickyTabRoom) stickyTabRoom.addEventListener('click', () => openDrawer(roomDrawer));
    if (eventsDrawerClose) eventsDrawerClose.addEventListener('click', closeAllDrawers);
    if (tableDrawerClose) tableDrawerClose.addEventListener('click', closeAllDrawers);
    if (roomDrawerClose) roomDrawerClose.addEventListener('click', closeAllDrawers);
    if (drawerOverlay) drawerOverlay.addEventListener('click', closeAllDrawers);

    // Limit checkin, table booking, and events date pickers to future dates
    const waEventsDate = document.getElementById('waEventsDate');
    const waTableDate = document.getElementById('waTableDate');
    const waRoomCheckIn = document.getElementById('waRoomCheckIn');
    const waRoomCheckOut = document.getElementById('waRoomCheckOut');

    const restrictToFutureDate = (inputEl) => {
        if (!inputEl) return;
        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1;
        let dd = today.getDate();
        if (mm < 10) mm = '0' + mm;
        if (dd < 10) dd = '0' + dd;
        inputEl.min = `${yyyy}-${mm}-${dd}`;
    };

    restrictToFutureDate(waEventsDate);
    restrictToFutureDate(waTableDate);
    restrictToFutureDate(waRoomCheckIn);
    restrictToFutureDate(waRoomCheckOut);

    // Dynamic checkout minimum date based on checkin selection
    if (waRoomCheckIn && waRoomCheckOut) {
        waRoomCheckIn.addEventListener('change', (e) => {
            waRoomCheckOut.min = e.target.value;
            if (waRoomCheckOut.value && waRoomCheckOut.value < e.target.value) {
                waRoomCheckOut.value = e.target.value;
            }
        });
    }

    // Configurable WhatsApp Contact Numbers
    // Format: Country Code + Number (No spaces, plus signs, or leading zeroes)
    const EVENTS_WHATSAPP_NUMBER = '919321636513'; // Temporarily routed to client test number
    const TABLE_WHATSAPP_NUMBER = '919321636513'; // Temporarily routed to client test number
    const ROOM_WHATSAPP_NUMBER = '919321636513';  // Temporarily routed to client test number

    // Handle Events Inquiry WhatsApp redirect
    const whatsappEventsForm = document.getElementById('whatsappEventsForm');
    if (whatsappEventsForm) {
        whatsappEventsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('waEventsName').value.trim();
            const phone = document.getElementById('waEventsPhone').value.trim();
            const date = document.getElementById('waEventsDate').value;
            const type = document.getElementById('waEventsType').value;
            const guests = document.getElementById('waEventsGuests').value;

            if (!name || !phone || !date || !type || !guests) {
                alert('Please fill in all details.');
                return;
            }

            // Construct text message
            const message = `*SAO BY THE SEA - EVENTS INQUIRY*\n` +
                            `--------------------------------------\n` +
                            `👤 *Name:* ${name}\n` +
                            `📱 *Phone:* ${phone}\n` +
                            `📅 *Event Date:* ${date}\n` +
                            `🎉 *Event Type:* ${type}\n` +
                            `👥 *Est. Guests:* ${guests}\n` +
                            `--------------------------------------\n` +
                            `_Request sent from SAO website_`;

            const encodedMessage = encodeURIComponent(message);
            const waUrl = `https://wa.me/${EVENTS_WHATSAPP_NUMBER}?text=${encodedMessage}`;
            
            // Reset & Close
            whatsappEventsForm.reset();
            closeAllDrawers();

            // Open in new tab
            window.open(waUrl, '_blank');
        });
    }

    // Handle Table Reservation WhatsApp redirect
    const whatsappTableForm = document.getElementById('whatsappTableForm');
    if (whatsappTableForm) {
        whatsappTableForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('waTableName').value.trim();
            const phone = document.getElementById('waTablePhone').value.trim();
            const date = document.getElementById('waTableDate').value;
            const time = document.getElementById('waTableTime').value;
            const guests = document.getElementById('waTableGuests').value;

            if (!name || !phone || !date || !time || !guests) {
                alert('Please fill in all details.');
                return;
            }

            // Construct text message
            const message = `*SAO BY THE SEA - TABLE RESERVATION*\n` +
                            `--------------------------------------\n` +
                            `👤 *Name:* ${name}\n` +
                            `📱 *Phone:* ${phone}\n` +
                            `📅 *Date:* ${date}\n` +
                            `⏰ *Time:* ${time}\n` +
                            `👥 *Guests:* ${guests}\n` +
                            `--------------------------------------\n` +
                            `_Request sent from SAO website_`;

            const encodedMessage = encodeURIComponent(message);
            const waUrl = `https://wa.me/${TABLE_WHATSAPP_NUMBER}?text=${encodedMessage}`;
            
            // Reset & Close
            whatsappTableForm.reset();
            closeAllDrawers();

            // Open in new tab
            window.open(waUrl, '_blank');
        });
    }

    // Handle Room Booking WhatsApp redirect
    const whatsappRoomForm = document.getElementById('whatsappRoomForm');
    if (whatsappRoomForm) {
        whatsappRoomForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('waRoomName').value.trim();
            const phone = document.getElementById('waRoomPhone').value.trim();
            const checkin = document.getElementById('waRoomCheckIn').value;
            const checkout = document.getElementById('waRoomCheckOut').value;
            const type = document.getElementById('waRoomType').value;
            const guests = document.getElementById('waRoomGuests').value;

            if (!name || !phone || !checkin || !checkout || !type || !guests) {
                alert('Please fill in all details.');
                return;
            }

            // Construct text message
            const message = `*SAO BY THE SEA - ROOM RESERVATION*\n` +
                            `--------------------------------------\n` +
                            `👤 *Name:* ${name}\n` +
                            `📱 *Phone:* ${phone}\n` +
                            `📅 *Check-In:* ${checkin}\n` +
                            `📅 *Check-Out:* ${checkout}\n` +
                            `🏡 *Room Type:* ${type}\n` +
                            `👥 *Guests:* ${guests}\n` +
                            `--------------------------------------\n` +
                            `_Request sent from SAO website_`;

            const encodedMessage = encodeURIComponent(message);
            const waUrl = `https://wa.me/${ROOM_WHATSAPP_NUMBER}?text=${encodedMessage}`;
            
            // Reset & Close
            whatsappRoomForm.reset();
            closeAllDrawers();

            // Open in new tab
            window.open(waUrl, '_blank');
        });
    }

    // Close drawers on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllDrawers();
        }
    });

});
