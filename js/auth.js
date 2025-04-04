// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA6m95mbim9ftrMdzRAIvyYLu902LDMFoc",
    authDomain: "realestate-4a5e6.firebaseapp.com",
    projectId: "realestate-4a5e6",
    storageBucket: "realestate-4a5e6.firebasestorage.app",
    messagingSenderId: "440556777624",
    appId: "1:440556777624:web:ec982b1855a4b1f06de0ed"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

let currentUser = null;

// Auth state observer
auth.onAuthStateChanged(user => {
    if (user) {
        currentUser = user;
        updateAuthUI();
        checkUserRole(user.uid);
    } else {
        currentUser = null;
        updateAuthUI();
    }
});

// Login function
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Success
            loginModal.classList.remove('active');
            loginModal.classList.add('hidden');
            showNotification('Login successful', 'success');
        })
        .catch((error) => {
            // Error
            showNotification(error.message, 'error');
        });
});

// Signup function
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const phone = document.getElementById('signup-phone').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;
    const isAgent = document.getElementById('signup-is-agent').checked;
    
    if (password !== confirmPassword) {
        showNotification('Passwords do not match', 'error');
        return;
    }
    
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Add user to Firestore
            return db.collection('users').doc(userCredential.user.uid).set({
                name: name,
                email: email,
                phone: phone,
                isAgent: isAgent,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                subscription: isAgent ? 'none' : null
            });
        })
        .then(() => {
            // Update user profile
            return auth.currentUser.updateProfile({
                displayName: name
            });
        })
        .then(() => {
            // Success
            signupModal.classList.remove('active');
            signupModal.classList.add('hidden');
            showNotification('Account created successfully', 'success');
        })
        .catch((error) => {
            // Error
            showNotification(error.message, 'error');
        });
});

// Logout function
function logout() {
    auth.signOut()
        .then(() => {
            showNotification('Logged out successfully', 'success');
            window.location.href = 'index.html';
        })
        .catch((error) => {
            showNotification(error.message, 'error');
        });
}

// Check user role
function checkUserRole(uid) {
    db.collection('users').doc(uid).get()
        .then(doc => {
            if (doc.exists) {
                const userData = doc.data();
                if (userData.isAgent && userData.subscription === 'none') {
                    // Redirect to subscription page if agent hasn't subscribed
                    showNotification('Please complete your subscription to post properties', 'warning');
                    window.location.href = 'subscription.html';
                }
            }
        })
        .catch(error => {
            console.error('Error checking user role:', error);
        });
}
