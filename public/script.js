
// Splash screen timer
setTimeout(() => {
    const splash = document.getElementById("splash");
    splash.style.opacity = "0";
    splash.style.visibility = "hidden";
    document.body.style.overflow = "auto";
}, 2500); // Reduced time for faster entry
function selectRole(element) {
    let roles = document.querySelectorAll(".role");
    roles.forEach(r => r.classList.remove("active"));
    element.classList.add("active");
}
/*scripting of register page*/
let currentRole = "student";

function selectRole(element, role) {
    let roles = document.querySelectorAll(".role");
    roles.forEach(r => r.classList.remove("active"));
    element.classList.add("active");

    currentRole = role;
    updateFields();
}

function updateFields() {
    let container = document.getElementById("dynamicFields");

    if (currentRole === "student") {
        container.innerHTML = `
            <div class="input-box">
                <input type="text" required>
                <label>College Name</label>
            </div>
            <div class="input-box">
                <input type="text" required>
                <label>Course (BCA, MCA, etc.)</label>
            </div>
        `;
    }

    else if (currentRole === "admin") {
        container.innerHTML = `
            <div class="input-box">
                <input type="text" required>
                <label>Admin ID</label>
            </div>
            <div class="input-box">
                <input type="text" required>
                <label>Department</label>
            </div>
        `;
    }

    else if (currentRole === "teacher") {
        container.innerHTML = `
            <div class="input-box">
                <input type="text" required>
                <label>Subject Expertise</label>
            </div>
            <div class="input-box">
                <input type="text" required>
                <label>Experience (Years)</label>
            </div>
        `;
    }
}
/* aptitude page js */
let currentIndex = 0;
let currentTopic = "";

const questions = {
    quant: [
        {
            q: "If CP = 100 and SP = 120, find profit %",
            options: ["10%", "20%", "25%", "30%"],
            answer: "20%"
        }
    ],
    logical: [
        {
            q: "Find next: 2, 4, 8, 16, ?",
            options: ["18", "24", "32", "64"],
            answer: "32"
        }
    ],
    verbal: [
        {
            q: "Synonym of 'Happy'?",
            options: ["Sad", "Joyful", "Angry", "Tired"],
            answer: "Joyful"
        }
    ]
};

function loadTopic(topic) {
    currentTopic = topic;
    currentIndex = 0;
    showQuestion();
}

function showQuestion() {
    let qObj = questions[currentTopic][currentIndex];

    document.getElementById("question").innerText = qObj.q;

    let options = document.querySelectorAll(".option");
    options.forEach((opt, index) => {
        opt.innerText = qObj.options[index];
        opt.classList.remove("selected");
    });
}

function selectOption(element) {
    let options = document.querySelectorAll(".option");
    options.forEach(opt => opt.classList.remove("selected"));
    element.classList.add("selected");
}

function nextQuestion() {
    currentIndex++;
    if (currentIndex >= questions[currentTopic].length) {
        alert("No more questions!");
        currentIndex = 0;
    }
    showQuestion();
}


function openChat() {
    document.getElementById("chatbox").style.display = "block";
}

async function sendQuestion() {
    let question = document.getElementById("userInput").value;

    let responseBox = document.getElementById("response");
    responseBox.innerHTML = "Thinking...";

    try {
        let res = await fetch("http://localhost:3000/ask", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ question })
        });

        let data = await res.json();
        responseBox.innerHTML = data.answer;

    } catch (error) {
        responseBox.innerHTML = "Error fetching response";
    }
}
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
    // let nextIndex = (index + 1) % images.length;

    // let nextImg = document.createElement("img");
    // nextImg.src = images[nextIndex];

    if (imageArray[index]) {
        img.src = imageArray[index];
        console.log(imageArray, index);
    } else {
        console.log("Image not found");
    }
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

