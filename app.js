const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const functions = firebase.functions();

// Logout functionality
document.getElementById("logout").addEventListener("click", () => {
    firebase.auth().signOut().then(() => {
        window.location.href = "login.html";
    });
});

// Post creation with AI moderation
function createPost() {
    let postText = document.getElementById('post-input').value;
    if (postText.trim() === '') return;

    // Trigger AI moderation
    const moderatedText = moderateContent(postText);
    if (moderatedText === 'inappropriate') {
        alert("This content is flagged as inappropriate.");
        return;
    }

    db.collection("posts").add({
        text: postText,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    document.getElementById('post-input').value = '';
}

// Mock moderation function (integrate Firebase Cloud Functions for real moderation)
function moderateContent(content) {
    // Replace with call to Firebase Cloud Function or Google Cloud NLP API for real moderation
    return 'safe'; // In a real app, use Cloud Functions to analyze content
}

// Start chat functionality
function startChat() {
    window.location.href = "chat.html";
}

// Start call functionality
function startCall() {
    window.location.href = "call.html";
}

// Report post functionality
function reportPost() {
    let postId = prompt("Enter the Post ID to report:");
    if (postId) {
        db.collection("reports").add({
            postId: postId,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            alert("Post reported successfully.");
        });
    }
}

// Life Guidance & Motivation
function getMotivation() {
    const quotes = [
        "Believe in yourself! Every day is a new opportunity.",
        "You are stronger than you think.",
        "Difficulties in life are just stepping stones to success.",
        "Every failure is a lesson in disguise.",
        "Stay positive and good things will happen."
    ];
    document.getElementById('motivation-text').innerText = quotes[Math.floor(Math.random() * quotes.length)];
}
