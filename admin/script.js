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
            // Get the user's UID
            var userUID = userCredential.user.uid;

            // Redirect to the user's dashboard based on the UID
            window.location.href = 'https://clients.photographybykayden.studio/admin/adminDB' + userUID;
        })
        .catch(function(error) {
            // Handle errors, e.g., display an error message
            document.getElementById('message').innerHTML = 'Invalid username or password';
        });
}
