// Initialize Firebase with your own config
firebase.initializeApp(firebaseConfig);

const authForm = document.getElementById('auth-form');
const phoneAuthSection = document.getElementById('phone-auth-section');
let isSignup = false;

function toggleAuthMethod() {
    isSignup = !isSignup;

    if (isSignup) {
        authForm.querySelector('button').textContent = 'Sign Up';
        phoneAuthSection.style.display = 'block';
    } else {
        authForm.querySelector('button').textContent = 'Login';
        phoneAuthSection.style.display = 'none';
    }
}

authForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const phone = document.getElementById('phone').value;

    if (isSignup) {
        // Sign up with email and password
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('User signed up:', user);

                // Update user display name
                user.updateProfile({
                    displayName: `${firstname} ${lastname}`
                }).then(() => {
                    console.log('Display name updated:', user.displayName);
                }).catch((error) => {
                    console.error('Error updating display name:', error);
                });

                // Send verification email
                user.sendEmailVerification().then(() => {
                    console.log('Verification email sent.');
                }).catch((error) => {
                    console.error('Error sending verification email:', error);
                });

            })
            .catch((error) => {
                console.error('Sign up error:', error.message);
            });
    } else {
        // Login with email and password
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('User logged in:', user);

                // Check if email is verified
                if (!user.emailVerified) {
                    console.error('Email not verified. Please check your email for verification.');
                }

            })
            .catch((error) => {
                console.error('Login error:', error.message);
            });
    }
});
