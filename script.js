// Get elements
const video = document.getElementById('webcam');
const captureBtn = document.getElementById('capture-btn');
const saveBtn = document.getElementById('save-btn');
const canvas = document.getElementById('canvas');
const photo = document.getElementById('photo');

// Access the webcam
async function initWebcam() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
    } catch (err) {
        console.error("Error accessing the webcam: ", err);
        alert("Unable to access the webcam. Please ensure you have granted permission.");
    }
}

// Capture the image
captureBtn.addEventListener('click', () => {
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert canvas to image
    const dataUrl = canvas.toDataURL('image/png');
    photo.setAttribute('src', dataUrl);
    photo.style.display = 'block';
    saveBtn.style.display = 'inline-block';
});

// Save the image
saveBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'webcam-photo.png';
    link.href = photo.src;
    link.click();
});

// Initialize the webcam
initWebcam();
