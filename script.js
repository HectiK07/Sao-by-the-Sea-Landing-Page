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
        
        // Mock API submission simulation
        const reservationData = {
            name,
            phone,
            experience,
            date
        };
        
        console.log('Sending luxury reservation payload to SAO Hospitality API:', reservationData);
        
        // Reset form
        bookingForm.reset();
        
        // Show high-end glassmorphism success modal
        openModal();
    });

    // Close modal on escape key or clicking outside
    successModal.addEventListener('click', (e) => {
        if (e.target === successModal) {
            closeModal();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && successModal.classList.contains('active')) {
            closeModal();
        }
    });

});
