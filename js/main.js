        // Initialize Bootstrap toast
        const toastEl = document.getElementById('toast');
        const toast = new bootstrap.Toast(toastEl, { autohide: true, delay: 5000 });

         // Function to display properties
               function displayProperties(properties) {
            const listingsContainer = document.getElementById('propertyListings');
            listingsContainer.innerHTML = '';
            
            if (properties.length === 0) {
                listingsContainer.innerHTML = '<div class="col-12 text-center"><p>No properties found matching your criteria.</p></div>';
                return;
            }
            
            properties.forEach(property => {
                const propertyCard = document.createElement('div');
                propertyCard.className = 'col-md-4';
                propertyCard.innerHTML = `
                    <div class="property-card card h-100">
                        <div class="position-relative">
                            <img src="${property.image}" class="property-img" alt="${property.title}">
                            <span class="property-badge badge bg-${property.featured ? 'danger' : 'primary'}">
                                ${property.featured ? 'Featured' : 'For ' + (property.type === 'land' ? 'Sale' : (property.type === 'commercial' ? 'Lease' : 'Rent'))}
                            </span>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">${property.title}</h5>
                            <p class="card-text text-muted">${property.city.replace('-', ' ').toUpperCase()}</p>
                            <p class="property-price">${formatPrice(property.price)} ETB</p>
                            
                            <div class="property-features">
                                ${property.bedrooms ? `<span><i class="fas fa-bed"></i> ${property.bedrooms} Bed</span>` : ''}
                                ${property.bathrooms ? `<span><i class="fas fa-bath"></i> ${property.bathrooms} Bath</span>` : ''}
                                <span><i class="fas fa-vector-square"></i> ${property.area} sqm</span>
                            </div>
                        </div>
                        <div class="card-footer bg-white border-0">
                            <button class="btn btn-primary w-100" onclick="showPropertyDetails('${property.id}')">
                                View Details
                            </button>
                        </div>
                    </div>
                `;
                listingsContainer.appendChild(propertyCard);
            });
            
            // Show load more button if we have more properties
            document.getElementById('loadMoreBtn').style.display = properties.length >= 5 ? 'inline-block' : 'none';
        }

        // Format price with commas
        function formatPrice(price) {
            return new Intl.NumberFormat('en-ET').format(price);
        }

        // Filter properties based on search criteria
        function filterProperties() {
            const typeFilter = document.getElementById('propertyType').value;
            const cityFilter = document.getElementById('citySelect').value;
            const priceFilter = document.getElementById('priceRange').value;
            
            let filtered = sampleProperties;
            
            if (typeFilter) {
                filtered = filtered.filter(p => p.type === typeFilter);
            }
            
            if (cityFilter) {
                filtered = filtered.filter(p => p.city === cityFilter);
            }
            
            if (priceFilter) {
                const [min, max] = priceFilter.split('-').map(Number);
                if (max) {
                    filtered = filtered.filter(p => p.price >= min && p.price <= max);
                } else {
                    filtered = filtered.filter(p => p.price >= min);
                }
            }
            
            displayProperties(filtered);
        }

        // Show property details (would be a modal in a real implementation)
        function showPropertyDetails(propertyId) {
            const property = sampleProperties.find(p => p.id === propertyId);
            if (property) {
                alert(`Showing details for: ${property.title}\nPrice: ${formatPrice(property.price)} ETB\nLocation: ${property.city.replace('-', ' ').toUpperCase()}`);
            }
        }

        // Load more properties
        document.getElementById('loadMoreBtn').addEventListener('click', function() {
            // In a real app, this would fetch more properties from Firebase
            alert('Loading more properties...');
        });

        // Search form submission
        document.getElementById('searchForm').addEventListener('submit', function(e) {
            e.preventDefault();
            filterProperties();
        });

        // Initial load of properties
        window.addEventListener('DOMContentLoaded', function() {
            // Simulate loading from Firebase
            setTimeout(() => {
                displayProperties(sampleProperties);
            }, 1000);
        });



        // Social Sharing Functions
        function shareOnFacebook() {
            const url = encodeURIComponent(window.location.href);
            const text = encodeURIComponent("Check out EthioProperties - Ethiopia's premier real estate platform!");
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, '_blank', 'width=600,height=400');
        }

        function shareOnTwitter() {
            const url = encodeURIComponent(window.location.href);
            const text = encodeURIComponent("Discover your dream home in Ethiopia with @EthioProperties - the easiest way to buy, rent, or sell properties!");
            window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank', 'width=600,height=400');
        }

        function shareOnLinkedIn() {
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent("EthioProperties - Ethiopian Real Estate Marketplace");
            const summary = encodeURIComponent("The simplest way to buy, rent, or sell properties in Ethiopia");
            window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}&summary=${summary}`, '_blank', 'width=600,height=400');
        }

        function shareOnWhatsApp() {
            const url = encodeURIComponent(window.location.href);
            const text = encodeURIComponent("Check out EthioProperties - Ethiopia's premier real estate platform! ");
            if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                window.open(`whatsapp://send?text=${text}${url}`, '_blank');
            } else {
                window.open(`https://web.whatsapp.com/send?text=${text}${url}`, '_blank', 'width=600,height=400');
            }
        }

        function shareOnTelegram() {
            const url = encodeURIComponent(window.location.href);
            const text = encodeURIComponent("Check out EthioProperties - Ethiopia's premier real estate platform!");
            window.open(`https://t.me/share/url?url=${url}&text=${text}`, '_blank', 'width=600,height=400');
        }


        
        // Function to update counters
        function updateCounters() {
                
                // Count user types
                let buyers = 0;
                let agents = 0;
                let diaspora = 0;
                
                // Update UI
                document.getElementById('userCount').textContent = 50+userCount + '+';
                document.getElementById('buyerCount').textContent = 70+buyers + '+';
                document.getElementById('agentCount').textContent = 15+agents + '+';
                document.getElementById('listingCount').textContent = Math.floor(agents * 1.2) + '+'; // Estimated listings
          }
        
        // Initialize counters on page load
        updateCounters();









// DOM Elements
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');
const postPropertyBtn = document.getElementById('post-property-btn');
const loginModal = document.getElementById('login-modal');
const signupModal = document.getElementById('signup-modal');
const closeModals = document.querySelectorAll('.close-modal');
const showSignup = document.getElementById('show-signup');
const showLogin = document.getElementById('show-login');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const notificationToast = document.getElementById('notification-toast');
const toastMessage = document.getElementById('toast-message');

// Toggle mobile menu
burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burger.classList.toggle('toggle');
});

// Show login modal
loginBtn.addEventListener('click', () => {
    loginModal.classList.remove('hidden');
    loginModal.classList.add('active');
});

// Show signup modal
signupBtn.addEventListener('click', () => {
    signupModal.classList.remove('hidden');
    signupModal.classList.add('active');
});

// Post property button
postPropertyBtn.addEventListener('click', () => {
    // Check if user is logged in
    if (currentUser) {
        window.location.href = 'post-property.html';
    } else {
        showNotification('Please login to post a property', 'warning');
        loginModal.classList.remove('hidden');
        loginModal.classList.add('active');
    }
});

// Close modals
closeModals.forEach(btn => {
    btn.addEventListener('click', () => {
        loginModal.classList.remove('active');
        loginModal.classList.add('hidden');
        signupModal.classList.remove('active');
        signupModal.classList.add('hidden');
    });
});

// Switch between login and signup modals
showSignup.addEventListener('click', (e) => {
    e.preventDefault();
    loginModal.classList.remove('active');
    loginModal.classList.add('hidden');
    signupModal.classList.remove('hidden');
    signupModal.classList.add('active');
});

showLogin.addEventListener('click', (e) => {
    e.preventDefault();
    signupModal.classList.remove('active');
    signupModal.classList.add('hidden');
    loginModal.classList.remove('hidden');
    loginModal.classList.add('active');
});

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.classList.remove('active');
        loginModal.classList.add('hidden');
    }
    if (e.target === signupModal) {
        signupModal.classList.remove('active');
        signupModal.classList.add('hidden');
    }
});

// Show notification function
function showNotification(message, type = 'info') {
    toastMessage.textContent = message;
    notificationToast.className = 'toast show ' + type;
    
    setTimeout(() => {
        notificationToast.classList.remove('show');
    }, 5000);
}

// Load featured properties
document.addEventListener('DOMContentLoaded', () => {
    loadFeaturedProperties();
    
    // Check if user is logged in
    if (currentUser) {
        updateAuthUI();
    }
});

// Update UI based on auth state
function updateAuthUI() {
    if (currentUser) {
        document.getElementById('login-btn').style.display = 'none';
        document.getElementById('signup-btn').style.display = 'none';
        
        // Create profile button
        const profileBtn = document.createElement('button');
        profileBtn.id = 'profile-btn';
        profileBtn.innerHTML = `<i class="fas fa-user"></i> ${currentUser.displayName || 'Profile'}`;
        profileBtn.addEventListener('click', () => {
            window.location.href = 'dashboard.html';
        });
        
        // Insert profile button
        const authButtons = document.querySelector('.auth-buttons');
        authButtons.insertBefore(profileBtn, postPropertyBtn);
    }
}
