document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    if (!currentUser) {
        showNotification('Please login to access dashboard', 'error');
        window.location.href = 'login.html';
        return;
    }
    
    // Load user data
    loadUserData();
    
    // Load user properties
    loadUserProperties();
    
    // Load saved properties if any
    loadSavedProperties();
    
    // Set up tab switching
    setupDashboardTabs();
    
    // Set up logout button
    document.getElementById('logout-btn').addEventListener('click', logout);
    
    // Set up profile form
    document.getElementById('profile-form').addEventListener('submit', updateProfile);
    
    // Check if user came from successful property posting
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('posted')) {
        showNotification('Property posted successfully and is under review', 'success');
    }
});

function loadUserData() {
    db.collection('users').doc(currentUser.uid).get()
        .then(doc => {
            if (doc.exists) {
                const userData = doc.data();
                
                // Update profile info
                document.getElementById('profile-name').textContent = userData.name || 'User Name';
                document.getElementById('profile-email').textContent = currentUser.email;
                document.getElementById('profile-phone').textContent = userData.phone || 'No phone number';
                document.getElementById('profile-type').textContent = userData.isAgent ? 'Real Estate Agent' : 'Regular User';
                
                // Update form fields
                document.getElementById('profile-name-input').value = userData.name || '';
                document.getElementById('profile-phone-input').value = userData.phone || '';
                document.getElementById('profile-email-input').value = currentUser.email;
                
                // Show subscription tab for agents
                if (userData.isAgent) {
                    document.getElementById('subscription-tab').style.display = 'block';
                    loadSubscriptionData();
                }
            }
        })
        .catch(error => {
            console.error('Error loading user data:', error);
        });
}

function loadUserProperties() {
    const propertiesList = document.getElementById('user-properties');
    propertiesList.innerHTML = '<div class="loading">Loading your properties...</div>';
    
    db.collection('properties')
        .where('userId', '==', currentUser.uid)
        .orderBy('createdAt', 'desc')
        .get()
        .then(querySnapshot => {
            propertiesList.innerHTML = '';
            
            if (querySnapshot.empty) {
                propertiesList.innerHTML = `
                    <div class="no-properties">
                        <i class="fas fa-home"></i>
                        <p data-i18n="no_properties">You haven't posted any properties yet</p>
                        <a href="post-property.html" class="btn-primary" data-i18n="post_first_property">Post Your First Property</a>
                    </div>
                `;
                return;
            }
            
            querySnapshot.forEach(doc => {
                const property = doc.data();
                const propertyCard = createDashboardPropertyCard(property, doc.id);
                propertiesList.appendChild(propertyCard);
            });
        })
        .catch(error => {
            propertiesList.innerHTML = '<div class="error">Error loading properties</div>';
            console.error('Error loading user properties:', error);
        });
}

function createDashboardPropertyCard(property, id) {
    const card = document.createElement('div');
    card.className = 'property-card dashboard-card';
    card.dataset.id = id;
    
    const statusClass = property.status === 'active' ? 'active' : property.status === 'pending' ? 'pending' : 'rejected';
    
    card.innerHTML = `
        <div class="property-image">
            <img src="${property.images[0] || 'images/default-property.jpg'}" alt="${property.title}">
            <span class="property-status ${statusClass}">${property.status}</span>
        </div>
        <div class="property-details">
            <h3>${property.title}</h3>
            <div class="property-meta">
                <span class="property-price">${formatPrice(property.price)} ${property.listingType === 'rent' ? '/month' : ''}</span>
                <span class="property-location"><i class="fas fa-map-marker-alt"></i> ${property.city}</span>
            </div>
            <div class="property-stats">
                <span><i class="fas fa-eye"></i> ${property.views || 0} views</span>
                <span><i class="fas fa-heart"></i> ${property.saves || 0} saves</span>
                <span><i class="fas fa-calendar-alt"></i> ${property.createdAt.toDate().toLocaleDateString()}</span>
            </div>
        </div>
        <div class="property-actions">
            <button class="action-btn" data-action="view"><i class="fas fa-eye"></i></button>
            <button class="action-btn" data-action="edit"><i class="fas fa-edit"></i></button>
            <button class="action-btn" data-action="delete"><i class="fas fa-trash"></i></button>
            <button class="more-actions-btn"><i class="fas fa-ellipsis-h"></i></button>
        </div>
    `;
    
    // Add event listeners to action buttons
    card.querySelector('[data-action="view"]').addEventListener('click', () => {
        viewPropertyDetails(id);
    });
    
    card.querySelector('[data-action="edit"]').addEventListener('click', () => {
        editProperty(id);
    });
    
    card.querySelector('[data-action="delete"]').addEventListener('click', () => {
        deleteProperty(id);
    });
    
    card.querySelector('.more-actions-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        showPropertyActionsModal(id, property);
    });
    
    return card;
}

function showPropertyActionsModal(id, property) {
    const modal = document.getElementById('property-actions-modal');
    const title = document.getElementById('property-actions-title');
    const editBtn = document.getElementById('edit-property-btn');
    const deleteBtn = document.getElementById('delete-property-btn');
    const featuredBtn = document.getElementById('mark-featured-btn');
    const viewBtn = document.getElementById('view-property-btn');
    
    title.textContent = property.title;
    
    // Set up buttons
    editBtn.onclick = () => {
        modal.classList.remove('active');
        modal.classList.add('hidden');
        editProperty(id);
    };
    
    deleteBtn.onclick = () => {
        modal.classList.remove('active');
        modal.classList.add('hidden');
        deleteProperty(id);
    };
    
    featuredBtn.onclick = () => {
        modal.classList.remove('active');
        modal.classList.add('hidden');
        markAsFeatured(id, !property.featured);
    };
    
    viewBtn.onclick = () => {
        modal.classList.remove('active');
        modal.classList.add('hidden');
        viewPropertyDetails(id);
    };
    
    // Show/hide featured button based on current status
    featuredBtn.style.display = property.status === 'active' ? 'block' : 'none';
    featuredBtn.textContent = property.featured ? 'Remove Featured' : 'Mark as Featured';
    
    // Show modal
    modal.classList.remove('hidden');
    modal.classList.add('active');
}

function editProperty(id) {
    window.location.href = `post-property.html?edit=${id}`;
}

function deleteProperty(id) {
    if (confirm('Are you sure you want to delete this property?')) {
        db.collection('properties').doc(id).delete()
            .then(() => {
                showNotification('Property deleted successfully', 'success');
                loadUserProperties();
            })
            .catch(error => {
                showNotification('Error deleting property', 'error');
                console.error('Error deleting property:', error);
            });
    }
}

function markAsFeatured(id, featured) {
    db.collection('properties').doc(id).update({
        featured: featured
    })
    .then(() => {
        showNotification(`Property ${featured ? 'marked as featured' : 'removed from featured'}`, 'success');
        loadUserProperties();
    })
    .catch(error => {
        showNotification('Error updating property', 'error');
        console.error('Error updating property:', error);
    });
}

function loadSavedProperties() {
    const savedList = document.getElementById('saved-properties-list');
    
    db.collection('users').doc(currentUser.uid).get()
        .then(doc => {
            const savedProperties = doc.data().savedProperties || [];
            
            if (savedProperties.length === 0) {
                savedList.innerHTML = `
                    <div class="no-properties">
                        <i class="fas fa-heart"></i>
                        <p data-i18n="no_saved_properties">You haven't saved any properties yet</p>
                    </div>
                `;
                return;
            }
            
            // Fetch each saved property
            savedList.innerHTML = '<div class="loading">Loading saved properties...</div>';
            
            const promises = savedProperties.map(propertyId => {
                return db.collection('properties').doc(propertyId).get();
            });
            
            Promise.all(promises)
                .then(docs => {
                    savedList.innerHTML = '';
                    
                    docs.forEach(doc => {
                        if (doc.exists) {
                            const property = doc.data();
                            savedList.appendChild(createPropertyCard(property, doc.id));
                        }
                    });
                })
                .catch(error => {
                    savedList.innerHTML = '<div class="error">Error loading saved properties</div>';
                    console.error('Error loading saved properties:', error);
                });
        })
        .catch(error => {
            savedList.innerHTML = '<div class="error">Error loading saved properties</div>';
            console.error('Error loading saved properties:', error);
        });
}

function setupDashboardTabs() {
    const tabs = document.querySelectorAll('.dashboard-nav li');
    const tabContents = document.querySelectorAll('.dashboard-tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.querySelector('a').getAttribute('href');
            
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Update active content
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === target.substring(1)) {
                    content.classList.add('active');
                }
            });
        });
    });
}

function updateProfile(e) {
    e.preventDefault();
    
    const name = document.getElementById('profile-name-input').value;
    const phone = document.getElementById('profile-phone-input').value;
    const currentPassword = document.getElementById('current-password').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-new-password').value;
    
    const submitBtn = e.target.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Updating...';
    
    // Update profile data in Firestore
    db.collection('users').doc(currentUser.uid).update({
        name: name,
        phone: phone
    })
    .then(() => {
        // Update profile in auth if name changed
        if (name !== currentUser.displayName) {
            return currentUser.updateProfile({
                displayName: name
            });
        }
    })
    .then(() => {
        // Update password if provided
        if (newPassword && currentPassword) {
            if (newPassword !== confirmPassword) {
                throw new Error('New passwords do not match');
            }
            
            const credential = firebase.auth.EmailAuthProvider.credential(
                currentUser.email, 
                currentPassword
            );
            
            return currentUser.reauthenticateWithCredential(credential)
                .then(() => currentUser.updatePassword(newPassword));
        }
    })
    .then(() => {
        showNotification('Profile updated successfully', 'success');
        loadUserData(); // Refresh displayed data
    })
    .catch(error => {
        showNotification(error.message, 'error');
        console.error('Error updating profile:', error);
    })
    .finally(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Update Profile';
        
        // Clear password fields
        document.getElementById('current-password').value = '';
        document.getElementById('new-password').value = '';
        document.getElementById('confirm-new-password').value = '';
    });
}

function loadSubscriptionData() {
    const planName = document.getElementById('plan-name');
    const planExpiry = document.getElementById('plan-expiry');
    
    db.collection('payments')
        .where('userId', '==', currentUser.uid)
        .where('type', '==', 'subscription')
        .orderBy('createdAt', 'desc')
        .limit(1)
        .get()
        .then(querySnapshot => {
            if (querySnapshot.empty) {
                planName.textContent = 'No Active Subscription';
                planExpiry.textContent = '';
                return;
            }
            
            const payment = querySnapshot.docs[0].data();
            const expiresAt = payment.expiresAt.toDate();
            
            planName.textContent = 'Monthly Subscription';
            planExpiry.textContent = `Expires on ${expiresAt.toLocaleDateString()}`;
            
            if (expiresAt < new Date()) {
                planExpiry.innerHTML += ' <span class="expired">(Expired)</span>';
                
                // Update user subscription status
                db.collection('users').doc(currentUser.uid).update({
                    subscription: 'none'
                });
            }
        })
        .catch(error => {
            console.error('Error loading subscription data:', error);
        });
    
    // Set up subscribe button
    document.getElementById('subscribe-monthly-btn').addEventListener('click', () => {
        // In a real app, this would redirect to payment gateway
        showNotification('Redirecting to payment gateway...', 'info');
        
        // Simulate successful payment
        setTimeout(() => {
            db.collection('payments').add({
                userId: currentUser.uid,
                amount: 500,
                type: 'subscription',
                status: 'completed',
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
            })
            .then(() => {
                return db.collection('users').doc(currentUser.uid).update({
                    subscription: 'active'
                });
            })
            .then(() => {
                showNotification('Subscription activated successfully', 'success');
                loadSubscriptionData();
            })
            .catch(error => {
                showNotification('Error activating subscription', 'error');
                console.error('Subscription error:', error);
            });
        }, 1500);
    });
}
