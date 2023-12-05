// Initialize Firebase (replace this with your configuration)
var firebaseConfig = {
    apiKey: "AIzaSyC9fV9SVm7w16t7D8UannqxA49880cutJI",
    authDomain: "clientspbk.firebaseapp.com",
    projectId: "clientspbk",
    storageBucket: "gs://clientspbk.appspot.com",
    messagingSenderId: "792879644996",
    appId: "1:792879644996:web:8a83f37d98697855029711"
  };
  
  firebase.initializeApp(firebaseConfig);
  
  // Get a reference to the users node
  var usersRef = firebase.database().ref('users');
  
  // Get the user dropdown element
  var userDropdown = document.getElementById('userDropdown');
  
  // Populate the user dropdown
  usersRef.once('value', function(snapshot) {
    snapshot.forEach(function(userSnapshot) {
      var userId = userSnapshot.key;
      var userName = userSnapshot.child('name').val();
  
      var option = document.createElement('option');
      option.value = userId;
      option.text = userName;
      userDropdown.add(option);
    });
  });
  
  // Add event listener for the form submission
  var uploadForm = document.getElementById('uploadForm');
  uploadForm.addEventListener('submit', function(event) {
    event.preventDefault();
  
    // Get the selected user ID
    var selectedUserId = userDropdown.value;
  
    // TODO: Implement the logic to upload the photo to the selected user's profile
    // You can use the selectedUserId to determine which user's profile to update.
    // For example, you can create a node like "users/{selectedUserId}/photos" to store photos.
    // Use the File API to get the selected photo and upload it to Firebase Storage.
    // Don't forget to update the photo's information (e.g., description).
  });
  