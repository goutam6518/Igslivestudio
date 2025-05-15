
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.7.1/firebase-analytics.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/11.7.1/firebase-analytics.js';

// Replace with your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRtPZ34Y1J-p5b7FJxEUagYg3h_D6PbhM",
    authDomain: "igsfogstudio-df541.firebaseapp.com",
    projectId: "igsfogstudio-df541",
    storageBucket: "igsfogstudio-df541.firebasestorage.app",
    messagingSenderId: "206722625476",
    appId: "1:206722625476:web:9ab922dc4853418af57e91",
    measurementId: "G-71VB7K6QS6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// --- DOM Element IDs (Update these to match your HTML) ---
const signupForm = document.getElementById('signup-form');
const signupEmailInput = document.getElementById('signup-email');
const signupPasswordInput = document.getElementById('signup-password');
const signupErrorElement = document.getElementById('signup-error');

const loginForm = document.getElementById('login-form');
const loginEmailInput = document.getElementById('login-email');
const loginPasswordInput = document.getElementById('login-password');
const loginErrorElement = document.getElementById('login-error');

const logoutButton = document.getElementById('logout-button'); // Optional logout button
const authStatusElement = document.getElementById('auth-status'); // Optional status display

// --- Sign Up Function ---
async function signUpWithEmailPassword(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('Sign up successful:', user);
    signupErrorElement.textContent = ''; // Clear any previous errors
    // Optionally redirect the user or update UI
    alert('Sign up successful! You can now log in.');
    // Example: window.location.href = '/login.html';
    return user;
  } catch (error) {
    console.error('Sign up error:', error);
    signupErrorElement.textContent = getErrorMessage(error.code);
    throw error;
  }
}

// --- Login Function ---
async function loginWithEmailPassword(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('Login successful:', user);
    loginErrorElement.textContent = ''; // Clear any previous errors
    // Optionally redirect the user to the main application page
    window.location.href = '/dashboard.html'; // Example redirect
    return user;
  } catch (error) {
    console.error('Login error:', error);
    loginErrorElement.textContent = getErrorMessage(error.code);
    throw error;
  }
}

// --- Sign Out Function (Optional) ---
async function signOutUser() {
  try {
    await signOut(auth);
    console.log('Sign out successful');
    // Optionally redirect to the login page or update UI
    window.location.href = '/login.html'; // Example redirect
  } catch (error) {
    console.error('Sign out error:', error);
    alert('Error signing out.');
  }
}

// --- Event Listeners ---

// Sign Up Form Submission
if (signupForm) {
  signupForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = signupEmailInput.value;
    const password = signupPasswordInput.value;

    if (email && password) {
      await signUpWithEmailPassword(email, password);
    } else {
      signupErrorElement.textContent = 'Please enter both email and password.';
    }
  });
}

// Login Form Submission
if (loginForm) {
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = loginEmailInput.value;
    const password = loginPasswordInput.value;

    if (email && password) {
      await loginWithEmailPassword(email, password);
    } else {
      loginErrorElement.textContent = 'Please enter both email and password.';
    }
  });
}

// Logout Button Click (Optional)
if (logoutButton) {
  logoutButton.addEventListener('click', signOutUser);
}

// --- Authentication State Listener (Optional - for persistent login and UI updates) ---
if (authStatusElement) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in
      console.log('User is signed in:', user);
      authStatusElement.textContent = `Logged in as: ${user.email}`;
      // Optionally update UI to show logged-in state
    } else {
      // User is signed out
      console.log('User is signed out');
      authStatusElement.textContent = 'Not logged in.';
      // Optionally update UI to show logged-out state (e.g., show login form)
    }
  });
}

// --- Helper Function to Get User-Friendly Error Messages ---
function getErrorMessage(errorCode) {
  switch (errorCode) {
    case 'auth/email-already-in-use':
      return 'The email address is already in use by another account.';
    case 'auth/invalid-email':
      return 'The email address is not valid.';
    case 'auth/user-not-found':
      return 'There is no user record corresponding to this email.';
    case 'auth/wrong-password':
      return 'The password is not valid.';
    case 'auth/weak-password':
      return 'The password is too weak.';
    case 'auth/network-request-failed':
      return 'Network error, please check your internet connection.';
    default:
      return 'An unexpected error occurred. Please try again.';
  }
}
