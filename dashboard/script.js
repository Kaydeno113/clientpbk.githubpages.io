// Your Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyC9fV9SVm7w16t7D8UannqxA49880cutJI",
    authDomain: "clientspbk.firebaseapp.com",
    projectId: "clientspbk",
    storageBucket: "gs://clientspbk.appspot.com",
    messagingSenderId: "792879644996",
    appId: "1:792879644996:web:8a83f37d98697855029711"
};

// Your Google Drive API key
var googleDriveApiKey = 'AIzaSyAofUsQsipztfSWTBZlLwzBexLOPqPJJ5I';

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// Check user authentication status
firebase.auth().onAuthStateChanged(function(user) {
    if (!user) {
        // User is not authenticated, redirect to the login page
        window.location.href = 'https://clients.photographybykayden.studio';
    } else {
        // User is authenticated, update UI or perform other tasks if needed
        document.getElementById('username').innerText = user.displayName;

        // Assuming you have a node in your database like "users/uid_of_user/photos"
        const photoContainer = document.getElementById('photoContainer');
        const photosRef = firebase.database().ref('users/' + user.uid + '/photos');

        // Fetch and display photos from Google Drive
        fetchGoogleDrivePhotos(user.uid, '12DLhcLqjUN4EQ-ABSJcfQUpP5jI4-FsE', photoContainer);
    }
});

// Function to handle user logout
function logout() {
    firebase.auth().signOut().then(function() {
        // Sign-out successful, redirect to the login page
        window.location.href = 'https://clients.photographybykayden.studio';
    }).catch(function(error) {
        console.error('Logout error:', error);
    });
}

// Function to fetch photos from Google Drive API
function fetchGoogleDrivePhotos(userId, folderId, photoContainer) {
    // Construct the API endpoint for listing files in the user's subfolder
    var apiUrl = `https://www.googleapis.com/drive/v3/files?q=${userId}+in+parents+%27${folderId}%27&key=${googleDriveApiKey}`;


    // Log the constructed API URL to the console
    console.log('API URL:', apiUrl);

    // Make an API request using fetch or another AJAX method
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Log the response data to the console
            console.log('Response Data:', data);

            // Process the data (photo URLs or relevant information)
            // For simplicity, let's assume the URLs are available in the data

            // Display photos in your webpage
            data.files.forEach(function(file) {
                var photoImg = document.createElement('img');
                photoImg.src = file.webContentLink;
                photoImg.alt = 'User Photo';

                photoContainer.appendChild(photoImg);
            });
        })
        .catch(error => console.error('Error fetching photos:', error));
}
