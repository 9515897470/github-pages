// 🔥 Firebase Configuration (Replace with Your Own)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

const dropArea = document.getElementById("drop-area");
const fileInput = document.getElementById("fileInput");
const fileList = document.getElementById("file-list");

dropArea.addEventListener("click", () => fileInput.click());

dropArea.addEventListener("dragover", (event) => {
    event.preventDefault();
    dropArea.style.background = "#f0f8ff";
});

dropArea.addEventListener("dragleave", () => {
    dropArea.style.background = "white";
});

dropArea.addEventListener("drop", (event) => {
    event.preventDefault();
    dropArea.style.background = "white";
    handleFiles(event.dataTransfer.files);
});

fileInput.addEventListener("change", (event) => {
    handleFiles(event.target.files);
});

function handleFiles(files) {
    for (let file of files) {
        uploadFile(file);
    }
}

function uploadFile(file) {
    const storageRef = storage.ref(`uploads/${file.name}`);
    const uploadTask = storageRef.put(file);

    let li = document.createElement("li");
    li.textContent = `Uploading: ${file.name}`;
    fileList.appendChild(li);

    uploadTask.on("state_changed",
        (snapshot) => {
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            li.textContent = `Uploading: ${file.name} (${progress.toFixed(0)}%)`;
        },
        (error) => {
            li.textContent = `Error uploading: ${file.name}`;
        },
        () => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                li.textContent = `Uploaded: ${file.name} ✅`;
                console.log("File available at:", downloadURL);
            });
        }
    );
}
