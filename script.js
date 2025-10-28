// WanderNest JavaScript - Main Application Logic

// Global Variables
let currentSection = 'home';
let isDarkMode = localStorage.getItem('darkMode') === 'true';
let destinations = [];
let bookingData = {};

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    loadDestinations();
    setupEventListeners();
    updateActiveNavLink();
});

// Initialize Application
function initializeApp() {
    // Set initial dark mode
    if (isDarkMode) {
        document.documentElement.classList.add('dark');
    }
    
    // Set up scroll progress indicator
    createScrollProgress();
    
    // Initialize intersection observer for animations
    setupScrollAnimations();
    
    // Load booking data from localStorage if exists
    loadBookingData();
    
    console.log('WanderNest initialized successfully!');
}

// Dark Mode Toggle
function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', isDarkMode);
    
    // Update button icons
    const moonIcons = document.querySelectorAll('.fa-moon');
    const sunIcons = document.querySelectorAll('.fa-sun');
    
    moonIcons.forEach(icon => {
        icon.classList.toggle('dark:hidden');
        icon.classList.toggle('hidden');
    });
    
    sunIcons.forEach(icon => {
        icon.classList.toggle('hidden');
        icon.classList.toggle('dark:inline');
    });
    
    showNotification(isDarkMode ? 'Dark mode enabled' : 'Light mode enabled', 'success');
}

// Navigation Functions
function navigateToSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.add('hidden');
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.remove('hidden');
        targetSection.classList.add('active');
        currentSection = sectionId;
        
        // Update URL without page reload
        history.pushState({ section: sectionId }, '', `#${sectionId}`);
        
        // Update navigation
        updateActiveNavLink();
        
        // Close mobile menu if open
        closeMobileMenu();
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Trigger section-specific animations
        triggerSectionAnimations(sectionId);
    }
}

// Update Active Navigation Link
function updateActiveNavLink() {
    const navLinks = document.querySelectorAll('.nav-link, .nav-link-mobile');
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Mobile Menu Functions
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.add('hidden');
}

// Modal Functions
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        modal.querySelector('.bg-white, .bg-gray-800').classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        modal.querySelector('.bg-white, .bg-gray-800').classList.remove('show');
        document.body.style.overflow = '';
    }
}

// Destination Data
function loadDestinations() {
    destinations = [
        {
            id: 'bali',
            name: 'Bali, Indonesia',
            continent: 'Asia',
            price: 899,
            rating: 4.9,
            image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            description: 'Experience the magic of the Island of Gods with stunning beaches, ancient temples, and vibrant culture.',
            gallery: [
                'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1555400292-1c0d468b5a2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            ],
            packages: [
                { name: 'Cultural Explorer', duration: '7 days', price: 899, features: ['Temple tours', 'Traditional cooking class', 'Local guide'] },
                { name: 'Beach Paradise', duration: '10 days', price: 1299, features: ['Beach resort', 'Water sports', 'Spa treatments'] },
                { name: 'Adventure Seeker', duration: '14 days', price: 1799, features: ['Volcano hike', 'White water rafting', 'Jungle trekking'] }
            ]
        },
        {
            id: 'santorini',
            name: 'Santorini, Greece',
            continent: 'Europe',
            price: 1299,
            rating: 4.8,
            image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            description: 'Witness breathtaking sunsets over whitewashed buildings and crystal-clear Aegean waters.',
            gallery: [
                'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1613395882328-d4d1e1b91c68?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1613395877426-bb2d5e59b04f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            ],
            packages: [
                { name: 'Romantic Getaway', duration: '5 days', price: 1299, features: ['Luxury hotel', 'Wine tasting', 'Sunset cruise'] },
                { name: 'Island Hopper', duration: '8 days', price: 1699, features: ['Multiple islands', 'Ferry passes', 'Local experiences'] },
                { name: 'Photography Tour', duration: '6 days', price: 1499, features: ['Photo workshops', 'Best viewpoints', 'Professional guide'] }
            ]
        },
        {
            id: 'maldives',
            name: 'Maldives',
            continent: 'Asia',
            price: 2199,
            rating: 4.9,
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            description: 'Relax in paradise with overwater bungalows, pristine beaches, and world-class diving.',
            gallery: [
                'https://images.unsplash.com/photo-1571919743851-c8ba4b25b2dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1589308078059-be1415eab4c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            ],
            packages: [
                { name: 'Luxury Retreat', duration: '7 days', price: 2199, features: ['Overwater villa', 'All-inclusive', 'Spa treatments'] },
                { name: 'Diving Adventure', duration: '10 days', price: 2799, features: ['Diving certification', 'Boat excursions', 'Marine biologist guide'] },
                { name: 'Honeymoon Special', duration: '14 days', price: 3999, features: ['Private island', 'Couple\'s massage', 'Champagne dinners'] }
            ]
        },
        {
            id: 'japan',
            name: 'Tokyo, Japan',
            continent: 'Asia',
            price: 1599,
            rating: 4.7,
            image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            description: 'Immerse yourself in the perfect blend of ancient traditions and cutting-edge technology.',
            gallery: [
                'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            ],
            packages: [
                { name: 'Cultural Discovery', duration: '8 days', price: 1599, features: ['Temple visits', 'Tea ceremony', 'Sumo wrestling'] },
                { name: 'Modern Tokyo', duration: '6 days', price: 1399, features: ['Tech districts', 'Anime culture', 'Gaming centers'] },
                { name: 'Culinary Journey', duration: '10 days', price: 1999, features: ['Sushi making', 'Street food tours', 'Michelin restaurants'] }
            ]
        },
        {
            id: 'iceland',
            name: 'Iceland',
            continent: 'Europe',
            price: 1799,
            rating: 4.6,
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            description: 'Discover the land of fire and ice with stunning waterfalls, geysers, and northern lights.',
            gallery: [
                'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1583952734049-0c4d0f0b4ea2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            ],
            packages: [
                { name: 'Northern Lights', duration: '7 days', price: 1799, features: ['Aurora hunting', 'Hot springs', 'Glacier tours'] },
                { name: 'Ring Road Adventure', duration: '12 days', price: 2499, features: ['Self-drive tour', 'Accommodation included', 'GPS navigator'] },
                { name: 'Photography Workshop', duration: '9 days', price: 2199, features: ['Professional guidance', 'Best locations', 'Equipment rental'] }
            ]
        },
        {
            id: 'dubai',
            name: 'Dubai, UAE',
            continent: 'Asia',
            price: 1399,
            rating: 4.5,
            image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            description: 'Experience luxury and innovation in this gleaming desert metropolis.',
            gallery: [
                'https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            ],
            packages: [
                { name: 'Luxury Experience', duration: '5 days', price: 1399, features: ['5-star hotels', 'Burj Khalifa', 'Desert safari'] },
                { name: 'Shopping & Culture', duration: '7 days', price: 1699, features: ['Mall tours', 'Cultural sites', 'Traditional souks'] },
                { name: 'Adventure Seeker', duration: '6 days', price: 1549, features: ['Skydiving', 'Water sports', 'Dune bashing'] }
            ]
        }
    ];
    
    renderDestinationsGrid();
}

// Render Destinations Grid
function renderDestinationsGrid(filteredDestinations = destinations) {
    const grid = document.getElementById('destinations-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    filteredDestinations.forEach(destination => {
        const card = createDestinationCard(destination);
        grid.appendChild(card);
    });
}

// Create Destination Card
function createDestinationCard(destination) {
    const card = document.createElement('div');
    card.className = 'destination-card bg-white dark:bg-gray-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2';
    
    card.innerHTML = `
        <div class="relative overflow-hidden">
            <img src="${destination.image}" alt="${destination.name}" class="w-full h-64 object-cover transition-transform duration-300 hover:scale-110">
            <div class="absolute top-4 right-4 bg-sunset-orange text-white px-3 py-1 rounded-full text-sm font-medium">
                <i class="fas fa-star mr-1"></i>${destination.rating}
            </div>
            <div class="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium">
                ${destination.continent}
            </div>
        </div>
        <div class="p-6">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">${destination.name}</h3>
            <p class="text-travel-gray dark:text-gray-400 mb-4">${destination.description}</p>
            <div class="flex justify-between items-center">
                <span class="text-2xl font-bold text-ocean-blue dark:text-sunset-orange">$${destination.price}</span>
                <button onclick="showDestinationDetails('${destination.id}')" class="bg-ocean-blue dark:bg-sunset-orange hover:bg-deep-ocean dark:hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200">
                    View Details
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// Show Destination Details
function showDestinationDetails(destinationId) {
    const destination = destinations.find(d => d.id === destinationId);
    if (!destination) return;
    
    // Create modal content
    const modalContent = `
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div class="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div class="relative">
                    <img src="${destination.image}" alt="${destination.name}" class="w-full h-64 md:h-80 object-cover">
                    <button onclick="closeDestinationDetails()" class="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors">
                        <i class="fas fa-times"></i>
                    </button>
                    <div class="absolute bottom-4 left-4">
                        <h2 class="text-3xl md:text-4xl font-bold text-white mb-2">${destination.name}</h2>
                        <div class="flex items-center text-white">
                            <i class="fas fa-star text-sunset-orange mr-2"></i>
                            <span class="text-lg">${destination.rating} Rating</span>
                        </div>
                    </div>
                </div>
                
                <div class="p-6 md:p-8">
                    <div class="mb-8">
                        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">About This Destination</h3>
                        <p class="text-travel-gray dark:text-gray-400 text-lg leading-relaxed">${destination.description}</p>
                    </div>
                    
                    <div class="mb-8">
                        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Photo Gallery</h3>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            ${destination.gallery.map(img => `
                                <img src="${img}" alt="Gallery" class="w-full h-48 object-cover rounded-lg">
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="mb-8">
                        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Available Packages</h3>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                            ${destination.packages.map(pkg => `
                                <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 transition-colors duration-300">
                                    <h4 class="text-xl font-bold text-gray-900 dark:text-white mb-2">${pkg.name}</h4>
                                    <p class="text-travel-gray dark:text-gray-400 mb-4">${pkg.duration}</p>
                                    <div class="mb-4">
                                        ${pkg.features.map(feature => `
                                            <div class="flex items-center mb-2">
                                                <i class="fas fa-check text-green-500 mr-2"></i>
                                                <span class="text-gray-700 dark:text-gray-300">${feature}</span>
                                            </div>
                                        `).join('')}
                                    </div>
                                    <div class="flex justify-between items-center">
                                        <span class="text-2xl font-bold text-ocean-blue dark:text-sunset-orange">$${pkg.price}</span>
                                        <button onclick="selectPackageAndBook('${destination.id}', '${pkg.name}', ${pkg.price})" class="bg-ocean-blue dark:bg-sunset-orange hover:bg-deep-ocean dark:hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200">
                                            Book Now
                                        </button>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to body
    const modalDiv = document.createElement('div');
    modalDiv.id = 'destination-details-modal';
    modalDiv.innerHTML = modalContent;
    document.body.appendChild(modalDiv);
    document.body.style.overflow = 'hidden';
}

// Close Destination Details
function closeDestinationDetails() {
    const modal = document.getElementById('destination-details-modal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
}

// Select Package and Navigate to Booking
function selectPackageAndBook(destinationId, packageName, price) {
    const destination = destinations.find(d => d.id === destinationId);
    if (!destination) return;
    
    // Store booking data
    bookingData = {
        destination: destination,
        package: packageName,
        price: price
    };
    
    // Save to localStorage
    localStorage.setItem('bookingData', JSON.stringify(bookingData));
    
    // Navigate to booking page
    closeDestinationDetails();
    navigateToSection('booking');
    
    // Update booking form
    updateBookingForm();
    
    showNotification(`Selected ${packageName} for ${destination.name}`, 'success');
}

// Update Booking Form
function updateBookingForm() {
    if (!bookingData.destination) return;
    
    const destinationSelect = document.getElementById('destination-select');
    if (destinationSelect) {
        destinationSelect.value = bookingData.destination.id;
    }
    
    updateBookingTotal();
}

// Update Booking Total
function updateBookingTotal() {
    const totalElement = document.getElementById('booking-total');
    if (totalElement && bookingData.price) {
        totalElement.textContent = `$${bookingData.price}`;
    }
}

// Load Booking Data
function loadBookingData() {
    const saved = localStorage.getItem('bookingData');
    if (saved) {
        bookingData = JSON.parse(saved);
    }
}

// Filter Destinations
function filterDestinations() {
    const searchTerm = document.querySelector('#destinations input[type="text"]').value.toLowerCase();
    const continent = document.querySelector('#destinations select').value;
    const priceRange = document.querySelectorAll('#destinations select')[1].value;
    const sortBy = document.querySelectorAll('#destinations select')[2].value;
    
    let filtered = destinations.filter(dest => {
        const matchesSearch = dest.name.toLowerCase().includes(searchTerm) || 
                            dest.description.toLowerCase().includes(searchTerm);
        const matchesContinent = continent === 'All Continents' || dest.continent === continent;
        
        let matchesPrice = true;
        if (priceRange === 'Under $500') matchesPrice = dest.price < 500;
        else if (priceRange === '$500 - $1000') matchesPrice = dest.price >= 500 && dest.price <= 1000;
        else if (priceRange === '$1000 - $2000') matchesPrice = dest.price > 1000 && dest.price <= 2000;
        else if (priceRange === 'Over $2000') matchesPrice = dest.price > 2000;
        
        return matchesSearch && matchesContinent && matchesPrice;
    });
    
    // Sort results
    if (sortBy === 'Price: Low to High') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'Price: High to Low') {
        filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'Rating') {
        filtered.sort((a, b) => b.rating - a.rating);
    }
    
    renderDestinationsGrid(filtered);
}

// Notification System
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'} mr-3"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Hide notification
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Scroll Progress Indicator
function createScrollProgress() {
    const progress = document.createElement('div');
    progress.className = 'scroll-progress';
    document.body.appendChild(progress);
    
    window.addEventListener('scroll', updateScrollProgress);
}

function updateScrollProgress() {
    const progress = document.querySelector('.scroll-progress');
    if (progress) {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progress.style.width = `${Math.min(scrolled, 100)}%`;
    }
}

// Scroll Animations
function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.destination-card, .testimonial-card');
    animateElements.forEach(el => observer.observe(el));
}

// Trigger Section Animations
function triggerSectionAnimations(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;
    
    const animatableElements = section.querySelectorAll('.destination-card, .animate-fade-in-up');
    animatableElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('animate-fade-in-up');
        }, index * 100);
    });
}

// Form Handlers
function handleBookingSubmit(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(event.target);
    const bookingDetails = Object.fromEntries(formData);
    
    // Validate form
    if (!validateBookingForm(bookingDetails)) {
        return;
    }
    
    // Show success message
    showBookingConfirmation(bookingDetails);
    
    // Clear form
    event.target.reset();
    bookingData = {};
    localStorage.removeItem('bookingData');
    
    showNotification('Booking submitted successfully!', 'success');
}

function handleContactSubmit(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(event.target);
    const contactDetails = Object.fromEntries(formData);
    
    // Simulate sending message
    setTimeout(() => {
        showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
        event.target.reset();
    }, 1000);
}

// Form Validation
function validateBookingForm(data) {
    const required = ['destination', 'checkin', 'checkout', 'travelers', 'firstName', 'lastName', 'email'];
    
    for (const field of required) {
        if (!data[field] || data[field].trim() === '') {
            showNotification(`Please fill in the ${field} field`, 'error');
            return false;
        }
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showNotification('Please enter a valid email address', 'error');
        return false;
    }
    
    return true;
}

// Booking Confirmation
function showBookingConfirmation(details) {
    const confirmationContent = `
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div class="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full p-8 text-center">
                <div class="success-checkmark mb-6"></div>
                <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Booking Confirmed!</h2>
                <p class="text-travel-gray dark:text-gray-400 mb-6">
                    Thank you ${details.firstName}! Your booking has been confirmed. 
                    We'll send you an email confirmation shortly.
                </p>
                <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-6 text-left">
                    <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Booking Details</h3>
                    <div class="space-y-2">
                        <p><strong>Destination:</strong> ${details.destination || bookingData.destination?.name}</p>
                        <p><strong>Check-in:</strong> ${details.checkin}</p>
                        <p><strong>Check-out:</strong> ${details.checkout}</p>
                        <p><strong>Travelers:</strong> ${details.travelers}</p>
                        <p><strong>Total:</strong> $${bookingData.price || '0'}</p>
                    </div>
                </div>
                <button onclick="closeBookingConfirmation()" class="bg-ocean-blue dark:bg-sunset-orange hover:bg-deep-ocean dark:hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200">
                    Continue Exploring
                </button>
            </div>
        </div>
    `;
    
    const confirmationDiv = document.createElement('div');
    confirmationDiv.id = 'booking-confirmation-modal';
    confirmationDiv.innerHTML = confirmationContent;
    document.body.appendChild(confirmationDiv);
    document.body.style.overflow = 'hidden';
}

function closeBookingConfirmation() {
    const modal = document.getElementById('booking-confirmation-modal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
    navigateToSection('home');
}

// Event Listeners Setup
function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-link, .nav-link-mobile').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                navigateToSection(href.substring(1));
            }
        });
    });
    
    // Mobile menu
    document.getElementById('mobile-menu-button').addEventListener('click', toggleMobileMenu);
    
    // Dark mode toggles
    document.getElementById('dark-mode-toggle').addEventListener('click', toggleDarkMode);
    document.getElementById('dark-mode-toggle-mobile').addEventListener('click', toggleDarkMode);
    
    // Modal handlers
    document.getElementById('login-btn').addEventListener('click', () => showModal('login-modal'));
    document.getElementById('login-btn-mobile').addEventListener('click', () => showModal('login-modal'));
    document.getElementById('signup-btn').addEventListener('click', () => showModal('signup-modal'));
    document.getElementById('signup-btn-mobile').addEventListener('click', () => showModal('signup-modal'));
    
    document.getElementById('close-login-modal').addEventListener('click', () => hideModal('login-modal'));
    document.getElementById('close-signup-modal').addEventListener('click', () => hideModal('signup-modal'));
    
    // Modal switching
    document.getElementById('switch-to-signup').addEventListener('click', () => {
        hideModal('login-modal');
        showModal('signup-modal');
    });
    document.getElementById('switch-to-login').addEventListener('click', () => {
        hideModal('signup-modal');
        showModal('login-modal');
    });
    
    // Form submissions
    document.getElementById('booking-form').addEventListener('submit', handleBookingSubmit);
    document.getElementById('contact-form').addEventListener('submit', handleContactSubmit);
    
    // Destination filters
    const destinationInputs = document.querySelectorAll('#destinations input, #destinations select');
    destinationInputs.forEach(input => {
        input.addEventListener('input', filterDestinations);
        input.addEventListener('change', filterDestinations);
    });
    
    // Booking destination change
    document.getElementById('destination-select').addEventListener('change', function() {
        const selectedDestination = destinations.find(d => d.id === this.value);
        if (selectedDestination) {
            bookingData.destination = selectedDestination;
            bookingData.price = selectedDestination.price;
            updateBookingTotal();
        }
    });
    
    // Handle browser back/forward
    window.addEventListener('popstate', function(e) {
        if (e.state && e.state.section) {
            navigateToSection(e.state.section);
        } else {
            const hash = window.location.hash.substring(1);
            if (hash) {
                navigateToSection(hash);
            }
        }
    });
    
    // Handle initial URL hash
    const initialHash = window.location.hash.substring(1);
    if (initialHash) {
        navigateToSection(initialHash);
    }
    
    // Close modals on outside click
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('fixed') && e.target.classList.contains('inset-0')) {
            const modals = ['login-modal', 'signup-modal'];
            modals.forEach(modalId => {
                if (e.target.id === modalId || e.target.closest(`#${modalId}`)) {
                    hideModal(modalId);
                }
            });
        }
    });
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization
const debouncedUpdateScrollProgress = debounce(updateScrollProgress, 10);
window.addEventListener('scroll', debouncedUpdateScrollProgress);

// Initialize tooltips and other interactive elements
function initializeInteractiveElements() {
    // Add hover effects for buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.classList.add('interactive');
    });
}

// Call initialization
document.addEventListener('DOMContentLoaded', initializeInteractiveElements);

console.log('WanderNest script loaded successfully!');
