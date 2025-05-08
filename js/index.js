const cover = document.getElementById('cardCover');
const buttonWrapper = document.getElementById('externalButtons');
const noBtn = document.getElementById('no_btn');
const yesBtn = document.getElementById('yes_btn');
const buttonArea = document.getElementById('buttonArea');
const backBtn = document.getElementById('backBtn');
const imageDisplay = document.getElementById('imageDisplay');
const mainContent = document.getElementById('mainContent');
const imagePaths = [
  'img/IMG_01.png',
  'img/IMG_01.png',
  'img/IMG_01.png',
  'img/IMG_01.png',
  'img/IMG_01.png',
  'img/IMG_01.png',
  'img/IMG_01.png',
  'img/IMG_01.png',
  'img/IMG_01.png',
  'img/IMG_01.png'
];

cover.addEventListener('click', () => {
  cover.classList.toggle('open');

  const isOpen = cover.classList.contains('open');
  buttonWrapper.style.opacity = isOpen ? '1' : '0';
  buttonWrapper.style.pointerEvents = isOpen ? 'auto' : 'none';
});

yesBtn.addEventListener('click', () => {
  alert('เย้! ได้เป็นแฟนกันแล้ว~ 💖');
  mainContent.style.display = 'none';
  imageDisplay.classList.add('show');
  showRandomImages(10); 
});

backBtn.addEventListener('click', () => {
  imageDisplay.classList.remove('show');
  imageDisplay.innerHTML = `<button class="btn back-btn" id="backBtn">Back</button>`;
  mainContent.style.display = 'flex';
  attachBackListener();
});

function attachBackListener() {
  document.getElementById('backBtn').addEventListener('click', () => {
    imageDisplay.classList.remove('show');
    imageDisplay.innerHTML = `<button class="btn back-btn" id="backBtn">Back</button>`;
    mainContent.style.display = 'flex';
    attachBackListener();
  });
}

function showRandomImages(count) {
  const placedImages = [];

  for (let i = 0; i < count; i++) {
    const img = document.createElement('img');
    const path = imagePaths[Math.floor(Math.random() * imagePaths.length)];
    img.src = path;
    img.classList.add('img-item');

    const size = 300; 
    let x, y;
    let attempts = 0;
    const maxAttempts = 50;

    do {
      x = Math.floor(Math.random() * (window.innerWidth - size));
      y = Math.floor(Math.random() * (window.innerHeight - size));
      attempts++;
    } while (isOverlapping(x, y, size, placedImages) && attempts < maxAttempts);

    img.style.width = `${size}px`;
    img.style.left = `${x}px`;
    img.style.top = `${y}px`;

    placedImages.push({ x, y, size });

    imageDisplay.appendChild(img);
  }
}

function isOverlapping(x, y, size, placedImages) {
  return placedImages.some(img => {
    return (
      x < img.x + img.size &&
      x + size > img.x &&
      y < img.y + img.size &&
      y + size > img.y
    );
  });
}


noBtn.addEventListener('mouseover', () => {
  const btnWidth = noBtn.offsetWidth;
  const btnHeight = noBtn.offsetHeight;

  const maxX = buttonArea.clientWidth - btnWidth;
  const maxY = buttonArea.clientHeight - btnHeight;

  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  noBtn.style.left = `${randomX}px`;
  noBtn.style.top = `${randomY}px`;
});
