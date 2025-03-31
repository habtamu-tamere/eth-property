        // Initialize Bootstrap toast
        const toastEl = document.getElementById('toast');
        const toast = new bootstrap.Toast(toastEl, { autohide: true, delay: 5000 });

        // Initialize international telephone input
        const phoneInput = document.querySelector("#phoneInput");
        const iti = window.intlTelInput(phoneInput, {
            initialCountry: "et", // Ethiopia as default
            separateDialCode: true,
            preferredCountries: ["et", "us", "gb", "ca", "ae"], // Ethiopia first, then common diaspora countries
            utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.9/js/utils.js"
        });



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

        // Form submission handler
        document.getElementById('registrationForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate phone number
            if (!iti.isValidNumber()) {
                document.getElementById('toast-message').textContent = 'Please enter a valid phone number';
                toastEl.classList.remove('bg-success');
                toastEl.classList.add('bg-danger');
                toast.show();
                return;
            }
            
            // Get form values
            const name = document.getElementById('nameInput').value;
            const email = document.getElementById('emailInput').value;
            const phoneNumber = iti.getNumber(); // Gets full international number
            const userType = document.getElementById('userTypeInput').value;
            const timestamp = new Date().toISOString();
            
            // Show loading state
            const submitBtn = document.getElementById('submitBtn');
            const submitText = document.getElementById('submitText');
            const spinner = submitBtn.querySelector('.spinner-border');
            
            submitText.textContent = 'Processing...';
            spinner.style.display = 'inline-block';
            submitBtn.disabled = true;
            
            // Save to Firebase
            const newUserRef = database.ref('earlyAccessUsers').push();
            newUserRef.set({
                name: name,
                email: email,
                phone: phoneNumber,
                userType: userType,
                timestamp: timestamp,
                countryCode: iti.getSelectedCountryData().iso2
            })
            .then(() => {
                // Show success message
                document.getElementById('successMessage').style.display = 'block';
                
                // Show toast notification
                document.getElementById('toast-message').textContent = 'Registration successful!';
                toastEl.classList.remove('bg-danger');
                toastEl.classList.add('bg-success');
                toast.show();
                
                // Update counters
                updateCounters();
                
                // Reset form
                document.getElementById('registrationForm').reset();
                iti.setNumber(""); // Reset phone input
            })
            .catch((error) => {
                // Show error message
                document.getElementById('toast-message').textContent = 'Error: ' + error.message;
                toastEl.classList.remove('bg-success');
                toastEl.classList.add('bg-danger');
                toast.show();
            })
            .finally(() => {
                // Reset button state
                submitText.textContent = 'Get Early Access';
                spinner.style.display = 'none';
                submitBtn.disabled = false;
            });
        });
        
        // Function to update counters
        function updateCounters() {
            database.ref('earlyAccessUsers').once('value').then((snapshot) => {
                const users = snapshot.val() || {};
                const userCount = Object.keys(users).length;
                
                // Count user types
                let buyers = 0;
                let agents = 0;
                let diaspora = 0;
                
                Object.values(users).forEach(user => {
                    if (user.userType === 'buyer') buyers++;
                    if (user.userType === 'agent') agents++;
                    if (user.userType === 'diaspora') diaspora++;
                    
                    // Count diaspora by country code (non-ET)
                    if (user.countryCode && user.countryCode !== 'et') {
                        diaspora++;
                    }
                });
                
                // Update UI
                document.getElementById('userCount').textContent = 50+userCount + '+';
                document.getElementById('buyerCount').textContent = 70+buyers + '+';
                document.getElementById('agentCount').textContent = 15+agents + '+';
                document.getElementById('listingCount').textContent = Math.floor(agents * 1.2) + '+'; // Estimated listings
            });
        }
        
        // Initialize counters on page load
        updateCounters();
