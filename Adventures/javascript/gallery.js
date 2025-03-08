function openBookingForm() {
    document.getElementById("bookingOverlay").classList.add("active");
}

function closeBookingForm() {
    document.getElementById("bookingOverlay").classList.remove("active");
}

// Gallery Navigation
function showGallery(galleryId) {
    // Hide all galleries
    const galleries = document.querySelectorAll('.gallery-content');
    galleries.forEach(gallery => {
        gallery.classList.remove('active');
    });
    
    // Show selected gallery
    document.getElementById(galleryId).classList.add('active');
}

// Slideshow Gallery (Gallery 1)
let currentSlideIndex = 0;
const slideImages = [
    "assests/blog cover.jpg",
    "assests/Bali swing.jpg",
    "assests/download (1).jpg",
    "assests/Kaaterskill Falls Hike In Upstate New York (Upper Trail).jpg",
    "assests/Find a Cruise _ Search the Best Cruises for 2025 & 2026.jpg",
    "assests/download (3).jpg"
];
function changeMainSlide(index) {
    // Stop automatic slideshow when user manually changes slide
    stopSlideshow();
    
    currentSlideIndex = index;
    const mainSlide = document.getElementById('mainSlide');
    if (mainSlide) {
        mainSlide.src = slideImages[index];
        
        // Update active thumbnail
        const thumbnails = document.querySelectorAll('.thumbnail');
        thumbnails.forEach(thumb => thumb.classList.remove('active'));
        thumbnails[index].classList.add('active');
    } else {
        console.error("Main slide element not found");
    }
}

// Auto slideshow for Gallery 1
let slideshowInterval;
let slideshowRunning = false;

function startSlideshow() {
    if (!slideshowRunning) {
        slideshowRunning = true;
        slideshowInterval = setInterval(() => {
            currentSlideIndex = (currentSlideIndex + 1) % slideImages.length;
            const mainSlide = document.getElementById('mainSlide');

            if (mainSlide) {
                mainSlide.src = slideImages[currentSlideIndex];
                
                // Update active thumbnail
                const thumbnails = document.querySelectorAll('.thumbnail');
                thumbnails.forEach(thumb => thumb.classList.remove('active'));
                thumbnails[currentSlideIndex].classList.add('active');
            }
        }, 5000);
    }
}

function stopSlideshow() {
    clearInterval(slideshowInterval);
    slideshowRunning = false;
}

// Gallery 4 - Extraordinary Adventure Slideshow
function initExtraordinarySlideshow() {
    let extraordinaryIndex = 0;
    const extraordinarySlides = document.querySelectorAll('[id^="extraordinary-slide-"]');
    const extraordinaryThumbs = document.querySelectorAll('[id^="extraordinary-thumb-"]');

    if (extraordinarySlides.length === 0 || extraordinaryThumbs.length === 0) {
        console.error("Extraordinary slides or thumbnails not found");
        return;
    }

    function changeExtraordinarySlide(index) {
        // Hide all slides
        extraordinarySlides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Show selected slide
        extraordinarySlides[index].classList.add('active');
        
        // Update thumbnails
        extraordinaryThumbs.forEach(thumb => {
            thumb.classList.remove('active');
        });
        extraordinaryThumbs[index].classList.add('active');
    }

    // Add click event to extraordinary thumbnails
    extraordinaryThumbs.forEach((thumb, index) => {
        thumb.addEventListener('click', () => {
            changeExtraordinarySlide(index);
            stopExtraordinarySlideshow();
            // Restart the slideshow after a pause
            setTimeout(startExtraordinarySlideshow, 10000);
        });
    });
// Auto slideshow for Extraordinary Adventure
let extraordinaryInterval;
let extraordinaryRunning = false;

function startExtraordinarySlideshow() {
    if (!extraordinaryRunning) {
        extraordinaryRunning = true;
        extraordinaryInterval = setInterval(() => {
            extraordinaryIndex = (extraordinaryIndex + 1) % extraordinarySlides.length;
            changeExtraordinarySlide(extraordinaryIndex);
        }, 4000);
    }
}

function stopExtraordinarySlideshow() {
    clearInterval(extraordinaryInterval);
    extraordinaryRunning = false;
}

// Initialize and expose functions to window
startExtraordinarySlideshow();

// Add event listeners to stop/start on hover
const rightColumn = document.querySelector('.right-column');
if (rightColumn) {
    rightColumn.addEventListener('mouseenter', stopExtraordinarySlideshow);
    rightColumn.addEventListener('mouseleave', startExtraordinarySlideshow);
}
// Expose functions
window.startExtraordinarySlideshow = startExtraordinarySlideshow;
window.stopExtraordinarySlideshow = stopExtraordinarySlideshow;
}

// Feel the Emotion Section
function initEmotionSlideshow() {
const emotionSlides = document.querySelectorAll('.emotion-slide');
const emotionThumbs = document.querySelectorAll('.emotion-left img');
let currentEmotionIndex = 0;
let emotionInterval;
let emotionRunning = false;

if (emotionSlides.length === 0 || emotionThumbs.length === 0) {
    console.error("Emotion slides or thumbnails not found");
    return;
}

function changeEmotionSlide(index, userTriggered = false) {
    // If user clicked, stop the automatic slideshow temporarily
    if (userTriggered) {
        stopEmotionSlideshow();
        setTimeout(startEmotionSlideshow, 10000); // Restart after 10 seconds
    }

    currentEmotionIndex = index;
    
    // Hide all slides
    emotionSlides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Show selected slide
    emotionSlides[index].classList.add('active');
    
    // Update thumbnails - move active thumbnail to the top
    const emotionLeft = document.querySelector('.emotion-left');
    if (emotionLeft) {
        // First, remove active class from all thumbnails
        emotionThumbs.forEach(thumb => {
            thumb.classList.remove('active');
        });
        
        // Add active class to the currently selected thumbnail
        emotionThumbs[index].classList.add('active');
        
        // Move active thumbnail to the top
        emotionLeft.insertBefore(emotionThumbs[index], emotionLeft.firstChild);
    }
}

// Add click events to emotion thumbnails
emotionThumbs.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
        changeEmotionSlide(index, true);
    });
});
function startEmotionSlideshow() {
    if (!emotionRunning) {
        emotionRunning = true;
        emotionInterval = setInterval(() => {
            currentEmotionIndex = (currentEmotionIndex + 1) % emotionSlides.length;
            changeEmotionSlide(currentEmotionIndex);
        }, 3500);
    }
}

function stopEmotionSlideshow() {
    clearInterval(emotionInterval);
    emotionRunning = false;
}

// Initialize and expose functions
startEmotionSlideshow();

// Add event listeners to stop/start on hover
const emotionCenter = document.querySelector('.emotion-center');
if (emotionCenter) {
    emotionCenter.addEventListener('mouseenter', stopEmotionSlideshow);
    emotionCenter.addEventListener('mouseleave', startEmotionSlideshow);
}

// Expose functions
window.startEmotionSlideshow = startEmotionSlideshow;
window.stopEmotionSlideshow = stopEmotionSlideshow;
}

// Get Carried Away Slideshow
function initCarriedAwaySlideshow() {
    let carriedAwayIndex = 0;
    const carriedAwaySlides = document.querySelectorAll('.carried-away-slide');
    let carriedAwayInterval;
    let carriedAwayRunning = false;

    if (carriedAwaySlides.length === 0) {
        console.error("Carried Away slides not found");
        return;
    }

    function changeCarriedAwaySlide(index = null) {
        // Hide all slides
        carriedAwaySlides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // If index is provided, use it; otherwise, increment the counter
        if (index !== null) {
            carriedAwayIndex = index;
        } else {
            carriedAwayIndex = (carriedAwayIndex + 1) % carriedAwaySlides.length;
        }
        carriedAwaySlides[carriedAwayIndex].classList.add('active');
    }
    function startCarriedAwaySlideshow() {
        if (!carriedAwayRunning) {
            carriedAwayRunning = true;
            carriedAwayInterval = setInterval(() => {
                changeCarriedAwaySlide();
            }, 3000);
        }
    }

    function stopCarriedAwaySlideshow() {
        clearInterval(carriedAwayInterval);
        carriedAwayRunning = false;
    }

    // Add click events to carried away items
    const carriedAwayItems = document.querySelectorAll('.carried-away-item');
    carriedAwayItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            changeCarriedAwaySlide(index);
            stopCarriedAwaySlideshow();
            setTimeout(startCarriedAwaySlideshow, 5000);
        });
    });

    // Initialize and expose functions
    startCarriedAwaySlideshow();
    //Add event listeners to stop/start on;hover
    const slideshow = document.querySelector('.carried-away-slideshow');
    if (slideshow) {
        slideshow.addEventListener('mouseenter', stopCarriedAwaySlideshow);
        slideshow.addEventListener('mouseleave', startCarriedAwaySlideshow);
    }
    
    // Expose functions
    window.startCarriedAwaySlideshow = startCarriedAwaySlideshow;
    window.stopCarriedAwaySlideshow = stopCarriedAwaySlideshow;
}

// Mobile Navigation Toggle
function initMobileNav() {
    const navToggle = document.getElementById('navToggle');
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            const navLinks = document.getElementById('navLinks');
            if (navLinks) {
                navLinks.classList.toggle('active');
            }
        });
    }
}
// Booking Form Functions
function openBookingForm() {
    const bookingOverlay = document.getElementById('bookingOverlay');
    if (bookingOverlay) {
        bookingOverlay.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent scrolling when form is open
        
        // Visual feedback for button click
        const bookBtn = document.getElementById('bookNowBtn');
        if (bookBtn) {
            bookBtn.classList.add('clicked');
            setTimeout(() => {
                bookBtn.classList.remove('clicked');
            }, 200);
        }
    }
}

function closeBookingForm() {
    const bookingOverlay = document.getElementById('bookingOverlay');
    if (bookingOverlay) {
        bookingOverlay.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }
}
// Book Now Button - Show Booking Information
function initBookNowButton() {
    const bookNowBtn = document.getElementById('bookNowBtn');
    if (bookNowBtn) {
        bookNowBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get activities information
            const activities = [
                {
                    name: "Paragliding",
                    price: "$150",
                    duration: "2 hours",
                    difficulty: "Moderate",
                    description: "Experience the thrill of flying over breathtaking landscapes."
                },
                {
                    name: "Hiking",
                    price: "$50",
                    duration: "4 hours",
                    difficulty: "Easy to Moderate",
                    description: "Explore beautiful trails with experienced guides."
                },
                {
                    name: "Bungee Jumping",
                    price: "$120",
                    duration: "1 hour",
                    difficulty: "Challenging",
                    description: "Face your fears with our professional bungee team."
                },
                {
                    name: "Rock Climbing",
                    price: "$90",
                    duration: "3 hours",
                    difficulty: "Moderate to Hard",
                    description: "Scale natural rock formations with expert instruction."
                },
                {
                    name: "Canoeing",
                    price: "$70",
                    duration: "2-3 hours",
                    difficulty: "Easy",
                    description: "Paddle through serene waters and enjoy nature."
                },
                {
                    name: "Camping",
                    price: "$120/night",
                    duration: "Overnight",
                    difficulty: "Easy",
                    description: "Experience the wilderness with comfortable camping facilities."
                }
            ];
            // Populate activity dropdown with descriptions
            const activitySelect = document.getElementById('activity');
            if (activitySelect) {
                // Clear existing options except the first one
                while (activitySelect.options.length > 1) {
                    activitySelect.remove(1);
                }
                
                // Add options with detailed information
                activities.forEach(activity => {
                    const option = document.createElement('option');
                    option.value = activity.name.toLowerCase().replace(' ', '');
                    option.text = `${activity.name} - ${activity.price} (${activity.duration})`;
                    option.setAttribute('data-description', activity.description);
                    option.setAttribute('data-difficulty', activity.difficulty);
                    activitySelect.add(option);
                });
                
                // Add change event to show activity details
                activitySelect.addEventListener('change', function() {
                    const selectedIndex = this.selectedIndex;
                    if (selectedIndex > 0) {
                        const infoDiv = document.getElementById('activity-info');
                        if (!infoDiv) {
                            const newInfoDiv = document.createElement('div');
                            newInfoDiv.id = 'activity-info';
                            newInfoDiv.style.marginTop = '10px';
                            newInfoDiv.style.padding = '10px';
                            newInfoDiv.style.backgroundColor = '#f9f9f9';
                            newInfoDiv.style.borderRadius = '5px';
                            this.parentNode.appendChild(newInfoDiv);
                        }
                        
                        const activity = activities[selectedIndex - 1];
                        document.getElementById('activity-info').innerHTML = `
                            <p><strong>Description:</strong> ${activity.description}</p>
                            <p><strong>Difficulty:</strong> ${activity.difficulty}</p>
                            <p><strong>Price:</strong> ${activity.price}</p>
                            <p><strong>Duration:</strong> ${activity.duration}</p>
                        `;
                    }
                });
            }
            
            // Show the booking form
            openBookingForm();
        })
    }
}

// Form Submission
function initBookingForm() {
    const bookingForm = document.getElementById('adventureBookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                date: document.getElementById('date').value,
                activity: document.getElementById('activity').value,
                participants: document.getElementById('participants').value,
                comments: document.getElementById('comments').value
            };
            
            // Here you would typically send the data to your server
            console.log('Booking submitted:', formData);
            
            // Show confirmation (in a real implementation, you'd wait for server response)
            alert('Your booking has been submitted successfully! We will contact you shortly.');
            
            // Close the form
            closeBookingForm();
            
            // Reset the form
            bookingForm.reset();
            
            // Remove activity info div if it exists
            const infoDiv = document.getElementById('activity-info');
            if (infoDiv) {
                infoDiv.remove();
            }
        });
    }
    
    // Add close button event
    const closeBtn = document.querySelector('.close-booking');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeBookingForm);
    }
}

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Add background image and blur for the whole page
    document.body.style.backgroundImage = "url('assests/adventure-background.jpg')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundPosition = "center";
    
    // Add blur effect
    const blurDiv = document.createElement('div');
    blurDiv.style.position = "fixed";
    blurDiv.style.top = "0";
    blurDiv.style.left = "0";
    blurDiv.style.width = "100%";
    blurDiv.style.height = "100%";
    blurDiv.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    blurDiv.style.backdropFilter = "blur(10px)";
    blurDiv.style.zIndex = "-1";
    document.body.insertBefore(blurDiv, document.body.firstChild);
    
    // Fix Gallery 3 layout
    const customGallery = document.querySelector('.custom-gallery');
    if (customGallery) {
        customGallery.style.display = "grid";
        customGallery.style.gridTemplateColumns = "1fr 1fr";
        customGallery.style.gap = "10px";
        
        // Select all items in the custom gallery
        const items = customGallery.querySelectorAll('.item');
        
        // Apply specific styles to each item
        if (items.length >= 8) {
            // Items 1 and 2 are aligned at the top
            items[0].style.gridColumn = "1";
            items[0].style.gridRow = "1";
            items[0].style.height = "300px";
            
            items[1].style.gridColumn = "2";
            items[1].style.gridRow = "1";
            items[1].style.height = "300px";
            
            // Items 3 and 4 are on the left of item 5
            items[2].style.gridColumn = "1";
            items[2].style.gridRow = "2";
            items[2].style.height = "200px";

            items[3].style.gridColumn = "1";
            items[3].style.gridRow = "3";
            items[3].style.height = "200px";
            
            // Item 5 spans rows 2-3 on the right
            items[4].style.gridColumn = "2";
            items[4].style.gridRow = "2 / span 2";
            items[4].style.height = "410px";
            
            // Item 6 is below item 5 on the right
            items[5].style.gridColumn = "2";
            items[5].style.gridRow = "4";
            items[5].style.height = "200px";
            
            // Items 7 and 8 are on separate sides at the bottom
            items[6].style.gridColumn = "1";
            items[6].style.gridRow = "4";
            items[6].style.height = "200px";
            
            items[7].style.gridColumn = "2";
            items[7].style.gridRow = "5";
            items[7].style.height = "200px";
        }
    }
     // Fix Feel the Emotion section
     const emotionLeft = document.querySelector('.emotion-left');
     if (emotionLeft) {
         emotionLeft.style.display = "flex";
         emotionLeft.style.flexDirection = "column";
         emotionLeft.style.gap = "10px";
         
         // Make images stack vertically
         const emotionImages = emotionLeft.querySelectorAll('img');
         emotionImages.forEach(img => {
             img.style.width = "100%";
             img.style.height = "150px";
             img.style.objectFit = "cover";
             img.style.borderRadius = "5px";
             img.style.cursor = "pointer";
         });
     }
     
     // Show the first gallery by default
     showGallery('slideshow');
     
     // Initialize all components
     startSlideshow();
     initExtraordinarySlideshow();
     initEmotionSlideshow();
     initCarriedAwaySlideshow();
     initMobileNav();
     initBookNowButton();
     initBookingForm();
     // Make clicking on grid items show a message
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(item => {
        item.addEventListener('click', function() {
            const activityName = this.querySelector('h3').textContent;
            const bookNowBtn = document.getElementById('bookNowBtn');
            if (bookNowBtn) {
                bookNowBtn.click(); // Open the booking form
                
                // Select the activity in the dropdown
                setTimeout(() => {
                    const activitySelect = document.getElementById('activity');
                    if (activitySelect) {
                        // Find the matching option
                        for (let i = 0; i < activitySelect.options.length; i++) {
                            if (activitySelect.options[i].text.includes(activityName)) {
                                activitySelect.selectedIndex = i;
                                // Trigger change event
                                const event = new Event('change');
                                activitySelect.dispatchEvent(event);
                                break;
                            }
                        }
                    }
                }, 100);
            }
        });
    });
}) 
