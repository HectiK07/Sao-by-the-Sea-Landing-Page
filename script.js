document.addEventListener('DOMContentLoaded', () => {

    // --- PHONE VALIDATION UTILITY ---
    // Enforces exactly 10 digits and blocks fake sequences or repeating series to prevent misinformation.
    const isValidPhoneNumber = (phoneStr) => {
        let digits = phoneStr.replace(/\D/g, ''); // Strip non-digit characters
        
        // Strip country code prefix '91' if it's 12 digits
        if (digits.length === 12 && digits.startsWith('91')) {
            digits = digits.substring(2);
        }
        
        if (digits.length !== 10) {
            return { valid: false, reason: "Phone number must be exactly 10 digits." };
        }
        
        // Block dummy sequences and repeating series
        const blockedSequences = [
            "1234567890", "0123456789", 
            "9876543210", "0987654321",
            "1111111111", "2222222222", 
            "3333333333", "4444444444", 
            "5555555555", "6666666666", 
            "7777777777", "8888888888", 
            "9999999999", "0000000000"
        ];
        
        if (blockedSequences.includes(digits)) {
            return { valid: false, reason: "Please enter a valid, active phone number." };
        }
        
        const isAllSame = /^(\d)\1{9}$/.test(digits);
        if (isAllSame) {
            return { valid: false, reason: "Please enter a valid, active phone number." };
        }
        
        return { valid: true, digits: digits };
    };

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

        // Validate phone number digits and pattern
        const phoneValidation = isValidPhoneNumber(phone);
        if (!phoneValidation.valid) {
            alert(phoneValidation.reason);
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
                        `📱 *Phone:* ${phoneValidation.digits}\n` +
                        `✨ *Experience:* ${friendlyExp}\n` +
                        `📅 *Date:* ${date}\n` +
                        `--------------------------------------\n` +
                        `_Request sent from SAO website_`;

        const encodedMessage = encodeURIComponent(message);
        const waUrl = `https://wa.me/917400197371?text=${encodedMessage}`;
        
        console.log('Sending reservation data via WhatsApp to +91 74001 97371:', { name, phone: phoneValidation.digits, friendlyExp, date });
        
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
    const EVENTS_WHATSAPP_NUMBER = '917400197371'; // Events and Plan Your Visit Form
    const TABLE_WHATSAPP_NUMBER = '918976757666';  // Table Reservations
    const ROOM_WHATSAPP_NUMBER = '917900112578';   // Room Booking / Stay Stays

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

            // Validate phone number digits and pattern
            const phoneValidation = isValidPhoneNumber(phone);
            if (!phoneValidation.valid) {
                alert(phoneValidation.reason);
                return;
            }

            // Construct text message
            const message = `*SAO BY THE SEA - EVENTS INQUIRY*\n` +
                            `--------------------------------------\n` +
                            `👤 *Name:* ${name}\n` +
                            `📱 *Phone:* ${phoneValidation.digits}\n` +
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

            // Validate phone number digits and pattern
            const phoneValidation = isValidPhoneNumber(phone);
            if (!phoneValidation.valid) {
                alert(phoneValidation.reason);
                return;
            }

            // Construct text message
            const message = `*SAO BY THE SEA - TABLE RESERVATION*\n` +
                            `--------------------------------------\n` +
                            `👤 *Name:* ${name}\n` +
                            `📱 *Phone:* ${phoneValidation.digits}\n` +
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

            // Validate phone number digits and pattern
            const phoneValidation = isValidPhoneNumber(phone);
            if (!phoneValidation.valid) {
                alert(phoneValidation.reason);
                return;
            }

            // Construct text message
            const message = `*SAO BY THE SEA - ROOM RESERVATION*\n` +
                            `--------------------------------------\n` +
                            `👤 *Name:* ${name}\n` +
                            `📱 *Phone:* ${phoneValidation.digits}\n` +
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

    // ==========================================================================
    // --- 8. PREMIUM INTERACTIVE 3D BOOK-STYLE MENU ---
    // ==========================================================================
    const viewMenuTrigger = document.getElementById('viewMenuTrigger');
    const menuBookSection = document.getElementById('menu-book-section');
    const foodTabBtn = document.getElementById('foodTabBtn');
    const drinksTabBtn = document.getElementById('drinksTabBtn');
    const foodBook = document.getElementById('food-book');
    const drinksBook = document.getElementById('drinks-book');
    const bookPrevBtn = document.getElementById('bookPrevBtn');
    const bookNextBtn = document.getElementById('bookNextBtn');
    const bookPageIndicator = document.getElementById('bookPageIndicator');
    const bookViewport = document.querySelector('.book-viewport');

    if (viewMenuTrigger && menuBookSection) {
        
        // Define Books Registry State
        const books = {
            food: {
                wrapper: foodBook,
                sheets: Array.from(foodBook.querySelectorAll('.book-sheet')),
                currentIndex: 0,
                name: "Culinary Journal"
            },
            drinks: {
                wrapper: drinksBook,
                sheets: Array.from(drinksBook.querySelectorAll('.book-sheet')),
                currentIndex: 0,
                name: "Bar Directory"
            }
        };
        
        let activeBookKey = 'food';
        let isBookFlipping = false;
        const MOBILE_BOOK_FLIP_MS = 520;

        const isMobileBook = () => window.matchMedia('(max-width: 768px)').matches;

        // Calculate z-indices for sheets
        const updateZIndices = (key) => {
            const book = books[key];
            const total = book.sheets.length;
            book.sheets.forEach((sheet, idx) => {
                if (idx < book.currentIndex) {
                    sheet.style.zIndex = idx + 1;
                } else {
                    sheet.style.zIndex = total - idx + 1;
                }
            });
        };

        // Reset Book to cover closed
        const resetBook = (key) => {
            const book = books[key];
            book.currentIndex = 0;
            book.sheets.forEach(sheet => {
                sheet.classList.remove('flipped');
                sheet.classList.remove('active-flip');
            });
            const stage = book.wrapper.querySelector('.mobile-menu-stage');
            if (stage) {
                stage.classList.remove('is-animating');
                const leaf = stage.querySelector('.mobile-menu-leaf');
                if (leaf) {
                    leaf.classList.remove('is-turning', 'is-turning-from-back');
                }
            }
            updateZIndices(key);
        };

        const getMobilePageSource = (book, pageIndex) => {
            const lastSheet = book.sheets.length - 1;
            if (pageIndex === 0) {
                return book.sheets[0].querySelector('.page-front');
            }
            if (pageIndex === book.sheets.length) {
                return book.sheets[lastSheet].querySelector('.page-back');
            }
            return book.sheets[pageIndex - 1].querySelector('.page-back');
        };

        const ensureMobileStage = (wrapper) => {
            let stage = wrapper.querySelector('.mobile-menu-stage');
            if (stage) {
                return stage;
            }
            stage = document.createElement('div');
            stage.className = 'mobile-menu-stage';
            stage.setAttribute('aria-live', 'polite');
            stage.innerHTML = `
                <div class="mobile-menu-under"></div>
                <div class="mobile-menu-leaf">
                    <div class="mobile-menu-leaf-face mobile-menu-leaf-front"></div>
                    <div class="mobile-menu-leaf-face mobile-menu-leaf-back" aria-hidden="true"></div>
                </div>
            `;
            wrapper.appendChild(stage);
            return stage;
        };

        const mountMobilePage = (slot, sourceEl) => {
            slot.innerHTML = '';
            if (!sourceEl) {
                return;
            }
            const clone = sourceEl.cloneNode(true);
            clone.removeAttribute('id');
            clone.querySelectorAll('[id]').forEach((el) => el.removeAttribute('id'));
            slot.appendChild(clone);
        };

        const syncMobileStageIdle = (book, pageIndex) => {
            if (!isMobileBook()) {
                return;
            }
            const stage = ensureMobileStage(book.wrapper);
            const under = stage.querySelector('.mobile-menu-under');
            const leaf = stage.querySelector('.mobile-menu-leaf');
            const leafFront = stage.querySelector('.mobile-menu-leaf-front');
            const leafBack = stage.querySelector('.mobile-menu-leaf-back');
            mountMobilePage(under, getMobilePageSource(book, pageIndex));
            leafFront.innerHTML = '';
            if (leafBack) leafBack.innerHTML = '';
            leaf.classList.remove('is-turning', 'is-turning-from-back');
            stage.classList.remove('is-animating');
        };

        const setBookNavLocked = (locked) => {
            isBookFlipping = locked;
            bookPrevBtn.disabled = locked || books[activeBookKey].currentIndex === 0;
            bookNextBtn.disabled = locked || books[activeBookKey].currentIndex >= books[activeBookKey].sheets.length;
        };

        const performMobileStageTurn = (book, direction, onComplete) => {
            if (isBookFlipping) {
                return;
            }
            const fromIndex = book.currentIndex;
            const toIndex = fromIndex + direction;
            if (toIndex < 0 || toIndex > book.sheets.length) {
                return;
            }

            const stage = ensureMobileStage(book.wrapper);
            const under = stage.querySelector('.mobile-menu-under');
            const leaf = stage.querySelector('.mobile-menu-leaf');
            const leafFront = stage.querySelector('.mobile-menu-leaf-front');
            const leafBack = stage.querySelector('.mobile-menu-leaf-back');
            const fromSource = getMobilePageSource(book, fromIndex);
            const toSource = getMobilePageSource(book, toIndex);

            setBookNavLocked(true);
            
            if (direction > 0) {
                // Forward turn: target page (toSource) underneath, current page (fromSource) on front of turning leaf
                mountMobilePage(under, toSource);
                mountMobilePage(leafFront, fromSource);
                if (leafBack) leafBack.innerHTML = '';
            } else {
                // Backward turn: current page (fromSource) underneath, target page (toSource) on back of turning leaf
                mountMobilePage(under, fromSource);
                if (leafBack) mountMobilePage(leafBack, toSource);
                leafFront.innerHTML = '';
            }
            
            leaf.classList.remove('is-turning', 'is-turning-from-back');
            stage.classList.add('is-animating');

            let completed = false;
            const complete = () => {
                if (completed) {
                    return;
                }
                completed = true;
                leaf.removeEventListener('transitionend', onTransitionEnd);
                clearTimeout(fallbackTimer);
                leaf.classList.remove('is-turning', 'is-turning-from-back');
                stage.classList.remove('is-animating');
                isBookFlipping = false;
                if (typeof onComplete === 'function') {
                    onComplete();
                } else {
                    updateBookControls();
                }
            };

            const onTransitionEnd = (e) => {
                if (e.target !== leaf || e.propertyName !== 'transform') {
                    return;
                }
                complete();
            };

            if (direction > 0) {
                void leaf.offsetWidth;
                requestAnimationFrame(() => {
                    leaf.classList.add('is-turning');
                });
            } else {
                leaf.classList.add('is-turning-from-back');
                void leaf.offsetWidth;
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        leaf.classList.remove('is-turning-from-back');
                    });
                });
            }

            leaf.addEventListener('transitionend', onTransitionEnd);
            const fallbackTimer = setTimeout(complete, MOBILE_BOOK_FLIP_MS + 120);
        };

        const updateBookControls = () => {
            const book = books[activeBookKey];
            
            // Prev button disabled on closed cover
            bookPrevBtn.disabled = (book.currentIndex === 0);
            
            // Next button disabled on back cover
            bookNextBtn.disabled = (book.currentIndex === book.sheets.length);
            
            // Update Page Indicator
            bookPageIndicator.textContent = `Page ${book.currentIndex + 1} of ${book.sheets.length + 1}`;

            // Add classes for styling single-page shifting on desktop
            const bookEl = document.getElementById(`${activeBookKey}-book`);
            if (bookEl) {
                bookEl.classList.remove('book-state-cover', 'book-state-open', 'book-state-back');
                if (!isMobileBook()) {
                    if (book.currentIndex === 0) {
                        bookEl.classList.add('book-state-cover');
                    } else if (book.currentIndex === book.sheets.length) {
                        bookEl.classList.add('book-state-back');
                    } else {
                        bookEl.classList.add('book-state-open');
                    }
                }
            }

            if (isMobileBook()) {
                book.sheets.forEach((sheet) => sheet.classList.remove('flipped'));
                for (let i = 0; i < book.currentIndex; i++) {
                    book.sheets[i].classList.add('flipped');
                }
                syncMobileStageIdle(book, book.currentIndex);
            }
        };

        // Initialize z-indices and active classes for both books
        updateZIndices('food');
        updateZIndices('drinks');
        foodBook.classList.add('active-book');
        drinksBook.classList.remove('active-book');
        ensureMobileStage(foodBook);
        ensureMobileStage(drinksBook);
        updateBookControls();

        const performFlip = (sheet, action, onComplete) => {
            if (isBookFlipping) {
                return;
            }
            isBookFlipping = true;
            bookPrevBtn.disabled = true;
            bookNextBtn.disabled = true;

            let completed = false;
            const complete = () => {
                if (completed) {
                    return;
                }
                completed = true;
                sheet.removeEventListener('transitionend', onTransitionEnd);
                clearTimeout(fallbackTimer);
                sheet.classList.remove('active-flip');
                isBookFlipping = false;
                if (typeof onComplete === 'function') {
                    onComplete();
                } else {
                    updateBookControls();
                }
            };

            sheet.classList.add('active-flip');
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    if (action === 'flip') {
                        sheet.classList.add('flipped');
                    } else {
                        sheet.classList.remove('flipped');
                    }
                });
            });

            const onTransitionEnd = (e) => {
                if (e.target !== sheet || e.propertyName !== 'transform') {
                    return;
                }
                complete();
            };

            sheet.addEventListener('transitionend', onTransitionEnd);
            const fallbackTimer = setTimeout(complete, 850);
        };

        // VIEW MENU TRIGGER TRIGGER
        viewMenuTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            const isActive = menuBookSection.classList.toggle('active');
            
            if (isActive) {
                viewMenuTrigger.textContent = 'CLOSE MENU';
                setTimeout(() => {
                    menuBookSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 300);
                
                // Exquisite wow effect: auto-open the book cover after scroll finishes
                setTimeout(() => {
                    const book = books[activeBookKey];
                    if (book.currentIndex === 0 && !isBookFlipping) {
                        const openCover = () => {
                            book.currentIndex = 1;
                            updateZIndices(activeBookKey);
                            updateBookControls();
                        };
                        if (isMobileBook()) {
                            performMobileStageTurn(book, 1, openCover);
                        } else {
                            performFlip(book.sheets[0], 'flip', openCover);
                        }
                    }
                }, 1200);
            } else {
                viewMenuTrigger.textContent = 'VIEW MENU';
                document.getElementById('cuisine').scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Reset states
                resetBook('food');
                resetBook('drinks');
                updateBookControls();
            }
        });

        // BOOK TAB SELECTION TRIGGER
        const switchBook = (key) => {
            if (activeBookKey === key) return;
            
            // Reset active book cover closed
            resetBook(activeBookKey);
            
            // Toggle active tabs styling
            if (key === 'food') {
                foodTabBtn.classList.add('active');
                drinksTabBtn.classList.remove('active');
                foodBook.style.display = 'block';
                drinksBook.style.display = 'none';
                foodBook.classList.add('active-book');
                drinksBook.classList.remove('active-book');
            } else {
                drinksTabBtn.classList.add('active');
                foodTabBtn.classList.remove('active');
                drinksBook.style.display = 'block';
                foodBook.style.display = 'none';
                drinksBook.classList.add('active-book');
                foodBook.classList.remove('active-book');
            }
            
            // Set new active key and update
            activeBookKey = key;
            updateZIndices(activeBookKey);
            updateBookControls();
            
            // Smoothly auto-open the new book cover as well!
            setTimeout(() => {
                const book = books[activeBookKey];
                if (book.currentIndex === 0 && !isBookFlipping) {
                    const openCover = () => {
                        book.currentIndex = 1;
                        updateZIndices(activeBookKey);
                        updateBookControls();
                    };
                    if (isMobileBook()) {
                        performMobileStageTurn(book, 1, openCover);
                    } else {
                        performFlip(book.sheets[0], 'flip', openCover);
                    }
                }
            }, 500);
        };

        if (foodTabBtn) foodTabBtn.addEventListener('click', () => switchBook('food'));
        if (drinksTabBtn) drinksTabBtn.addEventListener('click', () => switchBook('drinks'));

        // NAVIGATION ARROWS CLICK HANDLERS
        bookNextBtn.addEventListener('click', () => {
            const book = books[activeBookKey];
            if (isBookFlipping || book.currentIndex >= book.sheets.length) {
                return;
            }

            const afterNext = () => {
                book.currentIndex++;
                updateZIndices(activeBookKey);
                updateBookControls();
            };

            if (isMobileBook()) {
                performMobileStageTurn(book, 1, afterNext);
            } else {
                performFlip(book.sheets[book.currentIndex], 'flip', afterNext);
            }
        });

        bookPrevBtn.addEventListener('click', () => {
            const book = books[activeBookKey];
            if (isBookFlipping || book.currentIndex === 0) {
                return;
            }

            const afterPrev = () => {
                book.currentIndex--;
                updateZIndices(activeBookKey);
                updateBookControls();
            };

            if (isMobileBook()) {
                performMobileStageTurn(book, -1, afterPrev);
            } else {
                performFlip(book.sheets[book.currentIndex - 1], 'unflip', afterPrev);
            }
        });

        // SWIPE RECOGNITION (MOBILE) — ignore vertical scroll inside menu list
        let touchStartX = 0;
        let touchStartY = 0;
        let touchStartedOnMenuList = false;

        if (bookViewport) {
            bookViewport.addEventListener('touchstart', (e) => {
                touchStartX = e.touches[0].clientX;
                touchStartY = e.touches[0].clientY;
                touchStartedOnMenuList = Boolean(e.target.closest('.menu-list-wrapper'));
            }, { passive: true });

            bookViewport.addEventListener('touchend', (e) => {
                if (isBookFlipping) {
                    return;
                }
                const touchEndX = e.changedTouches[0].clientX;
                const touchEndY = e.changedTouches[0].clientY;
                const deltaX = touchStartX - touchEndX;
                const deltaY = touchStartY - touchEndY;

                if (touchStartedOnMenuList && Math.abs(deltaY) > Math.abs(deltaX)) {
                    return;
                }

                const threshold = 50;
                if (deltaX > threshold) {
                    bookNextBtn.click();
                } else if (deltaX < -threshold) {
                    bookPrevBtn.click();
                }
            }, { passive: true });
        }

        [bookPrevBtn, bookNextBtn].forEach((btn) => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        });

    }

});
