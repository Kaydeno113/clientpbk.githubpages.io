// Your Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyC9fV9SVm7w16t7D8UannqxA49880cutJI",
    authDomain: "clientspbk.firebaseapp.com",
    projectId: "clientspbk",
    storageBucket: "gs://clientspbk.appspot.com",
    messagingSenderId: "792879644996",
    appId: "1:792879644996:web:8a83f37d98697855029711"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// Check user authentication status
firebase.auth().onAuthStateChanged(function(user) {
    if (!user) {
        // User is not authenticated, redirect to login page
        window.location.href = '/index.html';
    } else {
        // User is authenticated, update UI or perform other tasks if needed
        document.getElementById('username').innerText = user.displayName;

        // Fetch and display photos for the authenticated user
        const photoContainer = document.getElementById('photoContainer');
        const userId = user.uid;

        // Assuming you want photos to be stored under "dashboard/photos/userId"
        const photosRef = firebase.database().ref('dashboard/photos/' + userId);

        // Listen for changes in the photos node
        photosRef.on('value', function(snapshot) {
            // Clear existing photos
            photoContainer.innerHTML = '';

            // Iterate through each photo and create HTML elements
            snapshot.forEach(function(photoSnapshot) {
                const photoData = photoSnapshot.val();
                const photoKey = photoSnapshot.key;

                // Create HTML elements for each photo
                const photoDiv = document.createElement('div');
                photoDiv.className = 'photo';

                const photoImg = document.createElement('img');
                photoImg.src = photoData.url;
                photoImg.alt = 'User Photo';

                const downloadButton = document.createElement('button');
                downloadButton.className = 'download-button';
                downloadButton.innerText = 'Download';
                downloadButton.addEventListener('click', function() {
                    // Add logic to download the photo (e.g., open in a new window or trigger a download)
                    // You may need to implement this part based on your requirements
                    console.log('Download photo:', photoKey);
                });

                // Append elements to the photo container
                photoDiv.appendChild(photoImg);
                photoDiv.appendChild(downloadButton);
                photoContainer.appendChild(photoDiv);
            });
        });
    }
});

// Function to handle user logout
function logout() {
    firebase.auth().signOut().then(function() {
        // Sign-out successful, redirect to login page
        window.location.href = '/index.html';
    }).catch(function(error) {
        console.error('Logout error:', error);
    });
}
