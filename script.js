const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const music = document.getElementById('bg-music');
const igniteBtn = document.getElementById('ignite');

let particles = [];
let w, h;

// Slower, meaningful timeline (added 1s extra delay per scene)
const timeline = [
    { m: "Dear 2025...", s: "It was a wild chapter." },
    { m: "Thanks for the lessons.", s: "And definitely the stress. 😅" },
    { m: "But look at you now.", s: "Still standing. Still shining." },
    { m: "2026 is calling.", s: "And you're ready for the upgrade." }
];

class Particle {
    constructor(isEmoji) {
        this.isEmoji = isEmoji;
        this.reset();
    }
    reset() {
        this.x = Math.random() * w;
        this.y = h + Math.random() * 200;
        this.speed = Math.random() * 2 + 1;
        this.size = this.isEmoji ? 30 : Math.random() * 2 + 1;
        this.emoji = ["✨", "🎉", "🔥", "🚀", "🥂"][Math.floor(Math.random()*5)];
        this.opacity = Math.random();
    }
    update() {
        this.y -= this.speed;
        if (this.y < -50) this.reset();
    }
    draw() {
        ctx.globalAlpha = this.opacity;
        if (this.isEmoji) {
            ctx.font = `${this.size}px Arial`;
            ctx.fillText(this.emoji, this.x, this.y);
        } else {
            ctx.fillStyle = "#fff";
            ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI*2); ctx.fill();
        }
    }
}

function init() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}

function animate() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
}

async function runExperience() {
    document.getElementById('gatekeeper').classList.add('fade');
    music.volume = 0.4;
    music.play();
    
    const mainT = document.getElementById('main-text');
    const subT = document.getElementById('sub-text');

    for (let scene of timeline) {
        // Fade out
        mainT.style.opacity = 0;
        subT.style.opacity = 0;
        mainT.style.transform = "translateY(10px)";
        
        await new Promise(r => setTimeout(r, 800));

        // Fade in
        mainT.innerText = scene.m;
        subT.innerText = scene.s;
        mainT.style.opacity = 1;
        subT.style.opacity = 1;
        mainT.style.transform = "translateY(0)";

        // Total display time per scene: 3.5 seconds
        await new Promise(r => setTimeout(r, 3500));
    }
    
    // Final reveal
    document.getElementById('text-container').classList.add('hidden');
    document.getElementById('hero-moment').classList.remove('hidden');
    
    // Switch to celebration particles
    for(let i=0; i<35; i++) particles.push(new Particle(true));
}

window.addEventListener('resize', init);
igniteBtn.addEventListener('click', runExperience);

init();
for(let i=0; i<50; i++) particles.push(new Particle(false));
animate();