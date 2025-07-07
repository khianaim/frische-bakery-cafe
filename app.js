//Loader//
window.addEventListener("load", () => {
  setTimeout(() => {
    document.body.classList.add("loaded");
    document.getElementById("topProgressBar").style.display = "none";
  }, 2700);
});

//Carousel Motions for all pages & back button after viewing products:
let nextButton = document.getElementById('next');
let prevButton = document.getElementById('prev');
let carousel = document.querySelector('.carousel');
let listHTML = document.querySelector('.carousel .list');
let seeMoreButtons = document.querySelectorAll('.seeMore');
let backButton = document.getElementById('back');

nextButton.onclick = () => showSlider('next');
prevButton.onclick = () => showSlider('prev');

let unAcceppClick;
const showSlider = (type) => {
  nextButton.style.pointerEvents = 'none';
  prevButton.style.pointerEvents = 'none';

  carousel.classList.remove('next', 'prev');
  let items = document.querySelectorAll('.carousel .list .item');

  if (type === 'next') {
    listHTML.appendChild(items[0]);
    carousel.classList.add('next');
  } else {
    listHTML.prepend(items[items.length - 1]);
    carousel.classList.add('prev');
  }

  clearTimeout(unAcceppClick);
  unAcceppClick = setTimeout(() => {
    nextButton.style.pointerEvents = 'auto';
    prevButton.style.pointerEvents = 'auto';
  }, 2000);
};

seeMoreButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const detail = button.closest('.item').querySelector('.detail');
    detail.style.display = 'block';
    backButton.style.display = 'block';
    carousel.classList.add('showDetail');

    // Hide side navigation
    const sideNav = document.querySelector('.side-nav');
    if (sideNav) sideNav.style.display = 'none';
  });
});


backButton.addEventListener('click', () => {
  const openDetail = document.querySelector('.detail[style*="display: block"]');
  if (openDetail) openDetail.style.display = 'none';
  backButton.style.display = 'none';
  carousel.classList.remove('showDetail');
});


  // Pop-Up Review Section for both pages:
function openModal() {
  document.getElementById("modalOverlay").style.display = "block";
  document.getElementById("commentModal").style.display = "block";
}

function closeModal() {
  document.getElementById("modalOverlay").style.display = "none";
  document.getElementById("commentModal").style.display = "none";
}

// Menu Change Via Buttons:
const viewCafeBtn = document.getElementById('viewCafe');
const viewBakeryBtn = document.getElementById('viewBakery');

// Redirect logic without fade
function navigateTo(page) {
  if (!window.location.pathname.includes(page)) {
    window.location.href = page;  // immediate redirect
  }
}

// Event listeners for buttons
viewCafeBtn.addEventListener('click', () => navigateTo('index.html'));
viewBakeryBtn.addEventListener('click', () => navigateTo('drinks.html'));

// Highlight the correct active button on load
window.addEventListener('DOMContentLoaded', () => {
  const cafeBtn = document.getElementById('viewCafe');
  const bakeryBtn = document.getElementById('viewBakery');

  if (window.location.pathname.includes('drinks')) {
    cafeBtn.classList.remove('active');
    bakeryBtn.classList.add('active');
  } else {
    cafeBtn.classList.add('active');
    bakeryBtn.classList.remove('active');
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const tutorial = document.getElementById("tutorial");
  const closeTutorial = document.getElementById("closeTutorial");
  const contactIcon = document.getElementById("contactIcon");
  const seeMore = document.querySelector(".seeMore");

  if (contactIcon) {
    contactIcon.addEventListener("click", function () {
      if (tutorial) tutorial.style.display = "block";
    });
  }

  if (closeTutorial) {
    closeTutorial.onclick = function () {
      if (tutorial) tutorial.style.display = "none";
    };
  }

  window.onclick = function (event) {
    if (event.target === tutorial) {
      tutorial.style.display = "none";
    }
  };

  // Mobile logic for seeMore → triggers contactIcon
  if (window.innerWidth <= 440 && seeMore) {
    seeMore.addEventListener("click", function () {
      contactIcon?.click(); // Simulate click on #contactIcon
    });
  }

  const toggle = document.getElementById("toggle-pastry-drinks");
  if (toggle && window.location.pathname.includes("drinks")) {
    toggle.checked = true;
  }
});

//Desktop Navigation with Arrow Keys
document.addEventListener("keydown", (event) => {
   // If user presses UP arrow key
  if (event.key === "ArrowUp") {
    const prevBtn = document.getElementById("prev");
    if (prevBtn) prevBtn.click(); // simulate a click
  }

  // If user presses DOWN arrow key
  if (event.key === "ArrowDown") {
    const prevBtn = document.getElementById("next");
    if (prevBtn) prevBtn.click(); // simulate a click
  }

  // If user presses LEFT arrow key
  if (event.key === "ArrowLeft") {
    const prevBtn = document.getElementById("prev");
    if (prevBtn) prevBtn.click(); // simulate a click
  }

  // If user presses RIGHT arrow key
  if (event.key === "ArrowRight") {
    const nextBtn = document.getElementById("next");
    if (nextBtn) nextBtn.click(); // simulate a click
  }
});


//Swipe Navigation on Phones/Tablets 
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;

document.addEventListener("touchstart", function (e) {
  touchStartX = e.changedTouches[0].screenX;
  touchStartY = e.changedTouches[0].screenY;
}, false);

document.addEventListener("touchend", function (e) {
  touchEndX = e.changedTouches[0].screenX;
  touchEndY = e.changedTouches[0].screenY;
  handleSwipeGesture();
}, false);

function handleSwipeGesture() {
  const deltaX = touchEndX - touchStartX;
  const deltaY = touchEndY - touchStartY;

  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    // Horizontal swipe
    if (deltaX > 50) {
      // Swipe Right
      document.getElementById("prev")?.click();
    } else if (deltaX < -50) {
      // Swipe Left
      document.getElementById("next")?.click();
    }
  } else {
    // Vertical swipe
    if (deltaY > 50) {
      // Swipe Down
      document.getElementById("next")?.click();
    } else if (deltaY < -50) {
      // Swipe Up
      document.getElementById("prev")?.click();
    }
  }
}
