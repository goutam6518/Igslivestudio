apiKey: "AIzaSyCRtPZ34Y1J-p5b7FJxEUagYg3h_D6PbhM",
    authDomain: "igsfogstudio-df541.firebaseapp.com",
    projectId: "igsfogstudio-df541",
    storageBucket: "igsfogstudio-df541.firebasestorage.app",
    messagingSenderId: "206722625476",
    appId: "1:206722625476:web:9ab922dc4853418af57e91",
    measurementId: "G-71VB7K6QS6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

let userId = "";

onAuthStateChanged(auth, (user) => {
    if (user) {
        userId = user.uid;
        console.log("User is already in authenticated state:", userId);
    } else {
        console.log("No user is signed in.");
        alert("Please sign in to upload a game.").then(() => {
            window.location.href = "auth.html";
        });
    }
});
