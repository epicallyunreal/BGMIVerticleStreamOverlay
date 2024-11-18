// Initialize progress values and global variables
let finishesToday;
let finishGoal; // Set finish goal at the beginning of the stream
let subscriberGoal; 
let currentSubscribers;
let highestFinish;
//const todayDate = "16/11/2024"; // Global date to manage daily reset

document.addEventListener("DOMContentLoaded", loadStoredData(false));

function loadStoredData(startNew = false) {
    // Reset local storage if the date has changed
    if (startNew) {
        localStorage.clear();
        localStorage.setItem("finishGoal", finishGoal);
        localStorage.setItem("subscriberGoal", subscriberGoal);
        localStorage.setItem("currentSubscribers", currentSubscribers);
    } else {
        finishesToday = parseInt(localStorage.getItem("finishesToday")) || 0;
        currentSubscribers = parseInt(localStorage.getItem("currentSubscribers")) || 0;
        highestFinish = parseInt(localStorage.getItem("highestFinish")) || 0;
        finishGoal = parseInt(localStorage.getItem("finishGoal")) || 0;
        subscriberGoal = parseInt(localStorage.getItem("subscriberGoal")) || 0;
    }

    document.getElementById("finish-count").textContent = `${finishesToday} / ${finishGoal}`;
    document.getElementById("subscriber-count").textContent = `${currentSubscribers} / ${subscriberGoal}`;
    document.getElementById("highest-finish-count").textContent = highestFinish;

    updateProgress();
}

function updateProgress() {
    const currentFinish = parseInt(document.getElementById("current-finish").value) || 0;
    finishesToday += currentFinish;

    const change = parseInt(document.getElementById("subscriber-change").value) || 0;
    currentSubscribers = Math.max(0, currentSubscribers + change); 
    partyAnimation();

    if (currentFinish > highestFinish) {
        highestFinish = currentFinish;
        milestoneReached(3, 2);
    }
    if (currentSubscribers >= subscriberGoal) {
        milestoneReached(5, 3);
    }

    document.getElementById("finish-count").textContent = `${finishesToday} / ${finishGoal}`;
    document.getElementById("finish-bar").style.width = `${(finishesToday / finishGoal) * 100}%`;

    document.getElementById("subscriber-count").textContent = `${currentSubscribers} / ${subscriberGoal}`;
    document.getElementById("subscriber-bar").style.width = `${(currentSubscribers / subscriberGoal) * 100}%`;

    document.getElementById("highest-finish-count").textContent = highestFinish;

    localStorage.setItem("finishesToday", finishesToday);
    localStorage.setItem("currentSubscribers", currentSubscribers);
    localStorage.setItem("highestFinish", highestFinish);

    document.getElementById("current-finish").value = 0;
    document.getElementById("subscriber-change").value = 0;

}

function createNewStream() {
    finishesToday = 0;
    finishGoal = parseInt(document.getElementById("in-finish-goal").value) || 0;
    subscriberGoal = parseInt(document.getElementById("in-subsciber-goal").value) || 0;
    currentSubscribers = parseInt(document.getElementById("in-current-subs").value) || 0;
    highestFinish = 0;

    loadStoredData(true);
}


function boom() {
    const colors = ['#ff0000', '#ff3300', '#ff6600', '#ff9900', '#ffff00', '#ff1493', '#800080', '#00ff00', '#00ffff'];
    const shapes = ['circle', 'square', 'star', 'triangle'];
    const randomParticleCount = Math.floor(Math.random() * 500) + 500; // Random count between 500-1000
    const randomAngle = Math.floor(Math.random() * 360); // Random angle between 0-360
    const randomOriginX = Math.random(); // Random x origin between 0-1
    const randomOriginY = Math.random() * 0.5; // Random y origin between 0-0.5
    const randomVelocity = Math.random() * 20 + 30; // Random velocity between 30-50

    confetti({
        particleCount: randomParticleCount,
        angle: randomAngle,
        spread: 360,
        origin: { x: randomOriginX, y: randomOriginY },
        startVelocity: randomVelocity,
        shapes: shapes,
        colors: colors,
        scalar: Math.random() * 0.5 + 0.5, // Random size scalar between 0.5-2.0
        gravity: Math.random() * 0.5 + 0.3, // Random gravity between 0.3-0.8
        ticks: Math.floor(Math.random() * 100) + 150, // Random duration between 150-250 ticks
        drift: Math.random() - 0.5, // Random drift between -0.5 to 0.5
    });
}

function partyAnimation() {
    const duration = Math.random() * 2000 + 1000; // Random duration between 2000-5000ms
    const animationEnd = Date.now() + duration;
    const colors = ['#bb0000', '#ffffff', '#FFD700', '#C0C0C0', '#1E90FF', '#32CD32', '#800080', '#FF69B4', '#FFA500', '#40E0D0', '#FFFF00', '#FF00FF'];
    const shapes = ['circle', 'square', 'star', 'triangle'];

    (function frame() {
        const randomParticleCount = Math.floor(Math.random() * 10) + 5; // Random count between 5-15
        const randomAngle1 = Math.floor(Math.random() * 60) + 30; // Random angle between 30-90
        const randomAngle2 = Math.floor(Math.random() * 60) + 120; // Random angle between 120-180
        const randomSpread = Math.floor(Math.random() * 50) + 50; // Random spread between 50-100
        // const randomOriginX1 = Math.random() * 0.5; // Random x origin for left side
        // const randomOriginX2 = 0.5 + Math.random() * 0.5; // Random x origin for right side

        confetti({
            particleCount: randomParticleCount,
            angle: randomAngle1,
            spread: randomSpread,
            origin: { x: 0.0 },
            shapes: shapes,
            colors: colors,
        });

        confetti({
            particleCount: randomParticleCount,
            angle: randomAngle2,
            spread: randomSpread,
            origin: { x: 1.0 },
            shapes: shapes,
            colors: colors,
        });

        if (Date.now() < animationEnd) {
            requestAnimationFrame(frame);
        }
    }());
}

function milestoneReached(r, b) {
    const shots = Math.floor(Math.random() * r) + b; // Random number of shots between 3-7
    for (let i = 0; i < shots; i++) {
        setTimeout(() => {
            boom();
        }, i * 500); // 500ms interval between each shot
    }

    partyAnimation(); // Trigger the main animation
}


// document.getElementById('fireButton').addEventListener('click', () => {
//     particlesJS('particles-js', {
//         particles: {
//             number: { value: 20, density: { enable: true, value_area: 800 } },
//             color: { value: "#ff4500" },
//             shape: { type: "circle" },
//             size: { value: 5, random: true },
//             line_linked: { enable: false },
//             move: { speed: 10, direction: "top", out_mode: "out" }
//         }
//     });
// });

// document.getElementById('explodeButton').addEventListener('click', () => {
//     particlesJS('particles-js', {
//         particles: {
//             number: { value: 100, density: { enable: true } },
//             color: { value: ["#ff3333", "#ff6600", "#ffff66", "#ff5050"] },
//             shape: { type: "polygon" },
//             opacity: {
//                 value: 1,
//                 anim: { enable: true, speed: 3, opacity_min: 0, sync: false }
//             },
//             size: {
//                 value: 8,
//                 random: true,
//                 anim: { enable: true, speed: 10, size_min: 0.5, sync: false }
//             },
//             line_linked: { enable: false }, // Disable lines between particles
//             move: {
//                 enable: true,
//                 speed: 20,
//                 direction: "none",
//                 random: false,
//                 straight: false,
//                 out_mode: "out", // Particles move outwards without returning
//                 bounce: false,
//                 attract: { enable: false }
//             }
//         },
//         retina_detect: true,
//     });

//     // Custom start position and movement for particles
//     setTimeout(() => {
//         if (pJSDom && pJSDom.length > 0 && pJSDom[0].pJS) {
//             pJSDom[0].pJS.particles.array.forEach(particle => {
//                 // Start all particles from the center
//                 particle.x = window.innerWidth / 2;
//                 particle.y = window.innerHeight / 2;
                
//                 // Scatter particles in random directions
//                 const angle = Math.random() * 2 * Math.PI;
//                 const speed = Math.random() * 10; // Adjust for explosion effect
//                 particle.vx = Math.cos(angle) * speed;
//                 particle.vy = Math.sin(angle) * speed;
//             });
//         }
//     }, 10);  // Adjust timeout for initialization
// });