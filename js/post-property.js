document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    if (!currentUser) {
        showNotification('Please login to post properties', 'error');
        window.location.href = 'login.html';
        return;
    }
    
    // Initialize form
    const propertyForm = document.getElementById('property-form');
    const imageUpload = document.getElementById('property-images');
    const imagePreview = document.getElementById('image-preview');
    const listingType = document.getElementById('listing-type');
    const pricePeriodContainer = document.getElementById('price-period-container');
    
    // Show/hide price period based on listing type
    listingType.addEventListener('change', () => {
        if (listingType.value === 'rent' || listingType.value === 'shortlet') {
            pricePeriodContainer.style.display = 'block';
        } else {
            pricePeriodContainer.style.display = 'none';
        }
    });
    
    // Handle image upload
    let uploadedImages = [];
    
    imageUpload.addEventListener('change', (e) => {
        imagePreview.innerHTML = '';
        uploadedImages = [];
        
        const files = e.target.files;
        if (files.length > 10) {
            showNotification('Maximum 5 images allowed', 'error');
            return;
        }
        
        if (files.length < 3) {
            showNotification('Please upload at least 3 images', 'warning');
        }
        
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (!file.type.match('image.*')) continue;
            
            uploadedImages.push(file);
            
            const reader = new FileReader();
            reader.onload = (event) => {
                const imgContainer = document.createElement('div');
                imgContainer.className = 'preview-image';
                imgContainer.innerHTML = `
                    <img src="${event.target.result}" alt="Preview">
                    <button type="button" class="remove-image" data-index="${i}">&times;</button>
                `;
                imagePreview.appendChild(imgContainer);
                
                // Add remove image functionality
                imgContainer.querySelector('.remove-image').addEventListener('click', (e) => {
                    e.stopPropagation();
                    const index = parseInt(e.target.getAttribute('data-index'));
                    uploadedImages.splice(index, 1);
                    imgContainer.remove();
                    updateImageIndexes();
                });
            };
            reader.readAsDataURL(file);
        }
    });
    
    function updateImageIndexes() {
        const removeButtons = document.querySelectorAll('.remove-image');
        removeButtons.forEach((button, index) => {
            button.setAttribute('data-index', index);
        });
    }
    
    // Handle form submission
    propertyForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (uploadedImages.length < 3) {
            showNotification('Please upload at least 3 images', 'error');
            return;
        }
        
        // Check if user is agent and has active subscription
        const userDoc = await db.collection('users').doc(currentUser.uid).get();
        const userData = userDoc.data();
        
        if (userData.isAgent && userData.subscription !== 'active') {
            // Show payment modal for agents without subscription
            document.getElementById('payment-modal').classList.remove('hidden');
            document.getElementById('payment-modal').classList.add('active');
            return;
        }
        
        if (!userData.isAgent) {
            // Show payment modal for regular users (pay per post)
            document.getElementById('payment-modal').classList.remove('hidden');
            document.getElementById('payment-modal').classList.add('active');
            return;
        }
        
        // If agent with active subscription, submit directly
        submitProperty();
    });
    
    // Prepare and submit property data
    async function submitProperty() {
        const submitBtn = document.getElementById('submit-btn');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Posting...';
        
        // Collect form data
        const propertyData = {
            title: document.getElementById('property-title').value,
            description: document.getElementById('property-description').value,
            type: document.getElementById('property-type').value,
            listingType: document.getElementById('listing-type').value,
            bedrooms: parseInt(document.getElementById('bedrooms').value) || 0,
            bathrooms: parseInt(document.getElementById('bathrooms').value) || 0,
            area: parseInt(document.getElementById('area').value),
            features: Array.from(document.querySelectorAll('input[name="features"]:checked')).map(el => el.value),
            address: document.getElementById('address').value,
            city: document.getElementById('city').value,
            subcity: document.getElementById('subcity').value,
            locationDescription: document.getElementById('location-description').value,
            price: parseInt(document.getElementById('price').value),
            pricePeriod: document.getElementById('listing-type').value === 'sale' ? null : document.getElementById('price-period').value,
            negotiable: document.getElementById('negotiable').value === 'yes',
            contactName: document.getElementById('contact-name').value,
            contactPhone: document.getElementById('contact-phone').value,
            contactEmail: document.getElementById('contact-email').value || null,
            userId: currentUser.uid,
            status: 'pending',
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            views: 0,
            saves: 0
        };
        
        try {
            await submitPropertyForm(propertyData, uploadedImages);
            window.location.href = 'dashboard.html?posted=true';
        } catch (error) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit Property';
            console.error('Error submitting property:', error);
        }
    }
    
    // Check if user came from successful property posting
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('posted')) {
        showNotification('Property posted successfully and is under review', 'success');
    }
});
