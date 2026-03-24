const images = [
  "images/img1.jpg",
  "images/img2.jpg",
  "images/img3.jpg",
  "images/img4.jpg"
];

const hero = document.querySelector(".hero");

let index = 0;

// create first image
let currentImg = document.createElement("img");
currentImg.src = images[index];
currentImg.classList.add("active");
hero.appendChild(currentImg);

function changeImage() {
  let nextIndex = (index + 1) % images.length;

  let nextImg = document.createElement("img");
  nextImg.src = images[nextIndex];
  hero.appendChild(nextImg);

  // trigger animation fast
  setTimeout(() => {
    nextImg.classList.add("active");
  }, 50);

  // remove old image quickly
  setTimeout(() => {
    hero.removeChild(currentImg);
    currentImg = nextImg;
    index = nextIndex;
  }, 800);
}

// 🔥 faster switching (more engaging)
setInterval(changeImage, 2500);


// Scroll reveal (faster too)
const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
  reveals.forEach(el => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;

    if (elementTop < windowHeight - 80) {
      el.classList.add("active");
    }
  });
});