// Property Functions
function loadFeaturedProperties() {
    const propertiesGrid = document.getElementById('featured-properties');
    propertiesGrid.innerHTML = '<div class="loading">Loading properties...</div>';
    
    db.collection('properties')
        .where('featured', '==', true)
        .limit(6)
        .get()
        .then(querySnapshot => {
            propertiesGrid.innerHTML = '';
            
            if (querySnapshot.empty) {
                propertiesGrid.innerHTML = '<div class="no-properties">No featured properties found</div>';
                return;
            }
            
            querySnapshot.forEach(doc => {
                const property = doc.data();
                propertiesGrid.appendChild(createPropertyCard(property, doc.id));
            });
        })
        .catch(error => {
            propertiesGrid.innerHTML = '<div class="error">Error loading properties</div>';
            console.error('Error loading properties:', error);
        });
}

function createPropertyCard(property, id) {
    const card = document.createElement('div');
    card.className = 'property-card';
    
    card.innerHTML = `
        <div class="property-image">
            <img src="${property.images[0] || 'images/default-property.jpg'}" alt="${property.title}">
        </div>
        <div class="property-details">
            <h3>${property.title}</h3>
            <div class="property-price">${formatPrice(property.price)} ${property.type === 'rent' ? '/month' : ''}</div>
            <div class="property-location">
                <i class="fas fa-map-marker-alt"></i>
                ${property.location}
            </div>
            <div class="property-features">
                <span><i class="fas fa-bed"></i> ${property.bedrooms} beds</span>
                <span><i class="fas fa-bath"></i> ${property.bathrooms} baths</span>
                <span><i class="fas fa-vector-square"></i> ${property.area} sqm</span>
            </div>
            <div class="property-actions">
                <button class="view-details" onclick="viewPropertyDetails('${id}')">View Details</button>
                <button class="save-property" onclick="saveProperty('${id}', this)">Save</button>
            </div>
        </div>
    `;
    
    return card;
}

function formatPrice(price) {
    return new Intl.NumberFormat('en-ET', {
        style: 'currency',
        currency: 'ETB'
    }).format(price);
}

function viewPropertyDetails(id) {
    window.location.href = `property-details.html?id=${id}`;
}

function saveProperty(id, button) {
    if (!currentUser) {
        showNotification('Please login to save properties', 'warning');
        loginModal.classList.remove('hidden');
        loginModal.classList.add('active');
        return;
    }
    
    const userRef = db.collection('users').doc(currentUser.uid);
    
    userRef.get()
        .then(doc => {
            const savedProperties = doc.data().savedProperties || [];
            
            if (savedProperties.includes(id)) {
                // Remove from saved
                return userRef.update({
                    savedProperties: firebase.firestore.FieldValue.arrayRemove(id)
                });
            } else {
                // Add to saved
                return userRef.update({
                    savedProperties: firebase.firestore.FieldValue.arrayUnion(id)
                });
            }
        })
        .then(() => {
            button.classList.toggle('saved');
            showNotification('Property saved successfully', 'success');
        })
        .catch(error => {
            showNotification('Error saving property', 'error');
            console.error('Error saving property:', error);
        });
}

// Post Property Functionality
function submitPropertyForm(propertyData, images) {
    if (!currentUser) {
        showNotification('Please login to post properties', 'error');
        return Promise.reject('User not logged in');
    }
    
    // Check if user is agent and has active subscription
    return db.collection('users').doc(currentUser.uid).get()
        .then(doc => {
            const userData = doc.data();
            
            if (userData.isAgent && userData.subscription !== 'active') {
                throw new Error('Agent subscription required to post properties');
            }
            
            // Upload images to storage
            const uploadPromises = images.map((image, index) => {
                const storageRef = storage.ref(`properties/${currentUser.uid}/${Date.now()}_${index}`);
                return storageRef.put(image)
                    .then(snapshot => snapshot.ref.getDownloadURL());
            });
            
            return Promise.all(uploadPromises);
        })
        .then(imageUrls => {
            // Add property to Firestore
            return db.collection('properties').add({
                ...propertyData,
                images: imageUrls,
                userId: currentUser.uid,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                featured: false,
                status: 'active'
            });
        })
        .then(() => {
            showNotification('Property posted successfully', 'success');
            return true;
        })
        .catch(error => {
            showNotification(error.message, 'error');
            console.error('Error posting property:', error);
            throw error;
        });
}
