const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const frame = document.getElementById('frame');
const snapBtn = document.getElementById('snap');
const downloadBtn = document.getElementById('download');
const retakeBtn = document.getElementById('retake');
const frame1Btn = document.getElementById('frame1Btn');
const frame2Btn = document.getElementById('frame2Btn');
const frame3Btn = document.getElementById('frame3Btn');
const frame4Btn = document.getElementById('frame4Btn');
const frame5Btn = document.getElementById('frame5Btn')

// Hide download and retake buttons at start
downloadBtn.style.display = 'none';
retakeBtn.style.display = 'none';

// Start video stream
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;
  })
  .catch(err => {
    console.error("Error accessing webcam:", err);
  });

  frame1Btn.addEventListener('click', () => {
  frame.src = 'https://raw.githubusercontent.com/crispyacha/photobooth/main/Untitled_design__3_-removebg-preview.png'; // Replace with your first frame image URL
});

frame2Btn.addEventListener('click', () => {
  frame.src = 'https://raw.githubusercontent.com/crispyacha/photobooth/main/123456.png'; // Replace with your second frame image URL
});

frame3Btn.addEventListener('click', () => {
  frame.src = 'https://raw.githubusercontent.com/crispyacha/photobooth/main/2-removebg-preview.png'; // Replace with your second frame image URL
});

frame4Btn.addEventListener('click', () => {
  frame.src = 'http://raw.githubusercontent.com/crispyacha/photobooth/main/0987654321.png'; // Replace with your second frame image URL
});

frame5Btn.addEventListener('click', () => {
  frame.src = 'https://raw.githubusercontent.com/crispyacha/photobooth/main/10101.png'; // Replace with your second frame image URL
});

// Capture photo
snapBtn.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Mirror the image horizontally
  ctx.save();
  ctx.translate(canvas.width, 0);
  ctx.scale(-1, 1);
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  ctx.restore();

  const frameImg = new Image();
  frameImg.crossOrigin = "anonymous";
  frameImg.onload = () => {
    ctx.drawImage(frameImg, 0, 0, canvas.width, canvas.height);
    canvas.style.display = 'block';
    video.style.display = 'none';
    // frame.style.display = 'none'; // Remove or comment out this line
    snapBtn.style.display = 'none';
    retakeBtn.style.display = 'inline-block';
    downloadBtn.style.display = 'inline-block'; // <-- Add this line
  };
  frameImg.src = frame.src;
});

// Download photo
downloadBtn.addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'bleh_photobooth.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
});

// Retake photo
retakeBtn.addEventListener('click', () => {
  canvas.style.display = 'none';
  video.style.display = 'block';
  snapBtn.style.display = 'inline-block';
  retakeBtn.style.display = 'none';
});
