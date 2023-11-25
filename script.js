// script.js

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyC9fV9SVm7w16t7D8UannqxA49880cutJI",
    authDomain: "clientspbk.firebaseapp.com",
    projectId: "clientspbk",
    storageBucket: "gs://clientspbk.appspot.com",
    messagingSenderId: "792879644996",
    appId: "1:792879644996:web:8a83f37d98697855029711"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function login() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    firebase.auth().signInWithEmailAndPassword(username, password)
        .then(function(userCredential) {
<<<<<<< HEAD
            // Signed in successfully, redirect to the dashboard
            window.location.href = 'https://photogrpahybykayden.studio';
=======
            // Get the user's UID
            var userUID = userCredential.user.uid;

            // Redirect to the user's dashboard based on the UID
            window.location.href = 'https://clients.photographybykayden.studio/dashboard/' + userUID;
>>>>>>> afff6d8 (dashboard dependant on user login)
        })
        .catch(function(error) {
            // Handle errors, e.g., display an error message
            document.getElementById('message').innerHTML = 'Invalid username or password';
        });
}
