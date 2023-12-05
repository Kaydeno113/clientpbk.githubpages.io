// admin.js

// Assuming you have already initialized Firebase

// Fetch user data and populate the dropdown
const userDropdown = document.getElementById('userDropdown');

firebase.database().ref('users').once('value', function(snapshot) {
    snapshot.forEach(function(userSnapshot) {
        const userId = userSnapshot.key;
        const userName = userSnapshot.val().name;

        const option = document.createElement('option');
        option.value = userId;
        option.textContent = userName;
        userDropdown.appendChild(option);
    });
});

// Handle form submission
const uploadForm = document.getElementById('uploadForm');

uploadForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Get selected user ID and other form data
    const selectedUserId = userDropdown.value;
    const photoFile = document.getElementById('photoInput').files[0];
    const description = document.getElementById('descriptionInput').value;

    // Upload photo to Firebase Storage
    const storageRef = firebase.storage().ref().child('photos/' + selectedUserId + '/' + photoFile.name);
    const uploadTask = storageRef.put(photoFile);

    // Handle the upload progress and completion
    uploadTask.on('state_changed',
        function(snapshot) {
            // Handle progress if needed
            // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            // console.log('Upload is ' + progress + '% done');
        },
        function(error) {
            // Handle errors during upload
            console.error('Upload error:', error);
        },
        function() {
            // Upload successful, get download URL
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                // Save photo information to the user's node in the database
                const photoData = {
                    url: downloadURL,
                    description: description
                };

                const photosRef = firebase.database().ref('users/' + selectedUserId + '/photos');
                const newPhotoRef = photosRef.push();
                newPhotoRef.set(photoData);

                console.log('Photo uploaded successfully:', downloadURL);
            });
        }
    );
});
