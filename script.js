// Create floating hearts
function createFloatingHearts() {
    const heartsContainer = document.getElementById('heartsContainer');
    const heartEmojis = ['❤️', '💕', '💖', '💗', '💓', '💝'];

    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 3 + 5) + 's';
        heart.style.fontSize = (Math.random() * 15 + 15) + 'px';

        heartsContainer.appendChild(heart);

        // Remove heart after animation
        setTimeout(() => {
            heart.remove();
        }, 8000);
    }, 300);
}

// No button movement logic
const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const successScreen = document.getElementById('successScreen');
const mainContainer = document.getElementById('mainContainer');

let noBtnClickAttempts = 0;

// Make the No button run away from cursor
noBtn.addEventListener('mouseenter', (e) => {
    moveNoButton();
});

noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveNoButton();
});

noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    moveNoButton();
    noBtnClickAttempts++;
});

function moveNoButton() {
    // Add moving class to make it absolute positioned
    noBtn.classList.add('moving');

    const container = document.querySelector('.card');
    const containerRect = container.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    // Calculate safe boundaries (inside the card with padding)
    const padding = 40;
    const maxX = containerRect.width - btnRect.width - padding;
    const maxY = containerRect.height - btnRect.height - padding;

    // Generate random position
    let randomX = Math.random() * maxX;
    let randomY = Math.random() * maxY;

    // Ensure it's not too close to Yes button
    const yesBtnRect = yesBtn.getBoundingClientRect();
    const centerX = yesBtnRect.left - containerRect.left + yesBtnRect.width / 2;
    const centerY = yesBtnRect.top - containerRect.top + yesBtnRect.height / 2;

    const distance = Math.sqrt(
        Math.pow(randomX + btnRect.width / 2 - centerX, 2) +
        Math.pow(randomY + btnRect.height / 2 - centerY, 2)
    );

    if (distance < 200) {
        // Move it to opposite corner
        randomX = randomX < maxX / 2 ? maxX - padding : padding;
        randomY = randomY < maxY / 2 ? maxY - padding : padding;
    }

    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';

    // Add shake animation to No button
    noBtn.style.animation = 'none';
    setTimeout(() => {
        noBtn.style.animation = 'shake 0.5s';
    }, 10);
}

// Add shake animation
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);

// Yes button click handler
yesBtn.addEventListener('click', () => {
    showSuccessScreen();
});

function showSuccessScreen() {
    successScreen.classList.add('show');
    mainContainer.style.display = 'none';

    // Create fireworks effect
    createFireworks();

    // Setup WhatsApp button
    setupWhatsAppButton();

    // Play celebration sound (if you want to add audio later)
    // const audio = new Audio('celebration.mp3');
    // audio.play();
}

// WhatsApp Notification Setup
function setupWhatsAppButton() {
    const whatsappBtn = document.getElementById('whatsappBtn');

    // Your WhatsApp number (with country code, no + or spaces)
    // Example: For India +91 1234567890, use: 911234567890
    const yourPhoneNumber = '917037845773'; // REPLACE with your actual number!

    // The message she'll send you
    const message = encodeURIComponent(
        '🎉 Congratulations Kiruuuu babbyyyyy!\n\n' +
        'I said YES! ✨\n\n' +
        'I am now officially your valentine babbyyyy! 💝\n\n' +
        'I forgive you... and I love you! ❤️'
    );

    // Create WhatsApp link
    const whatsappLink = `https://wa.me/${yourPhoneNumber}?text=${message}`;

    whatsappBtn.href = whatsappLink;
    whatsappBtn.target = '_blank';
}

function createFireworks() {
    const fireworksContainer = document.getElementById('fireworks');
    const emojis = ['✨', '🎉', '🎊', '💖', '💝', '⭐', '🌟'];

    setInterval(() => {
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const firework = document.createElement('div');
                firework.classList.add('firework');
                firework.textContent = emojis[Math.floor(Math.random() * emojis.length)];

                const startX = Math.random() * window.innerWidth;
                const startY = Math.random() * window.innerHeight;

                firework.style.left = startX + 'px';
                firework.style.top = startY + 'px';

                const tx = (Math.random() - 0.5) * 400;
                const ty = (Math.random() - 0.5) * 400;

                firework.style.setProperty('--tx', tx + 'px');
                firework.style.setProperty('--ty', ty + 'px');

                fireworksContainer.appendChild(firework);

                setTimeout(() => {
                    firework.remove();
                }, 1500);
            }, i * 100);
        }
    }, 800);
}

// Enhanced Yes button hover effect
yesBtn.addEventListener('mouseenter', () => {
    yesBtn.style.transform = 'scale(1.15)';
});

yesBtn.addEventListener('mouseleave', () => {
    yesBtn.style.transform = 'scale(1)';
});

// Prevent context menu on buttons (for mobile)
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });
});

// Easter egg: Make yes button grow bigger after multiple no attempts
setInterval(() => {
    if (noBtnClickAttempts >= 3) {
        yesBtn.style.transform = 'scale(1.2)';
        yesBtn.style.fontSize = '24px';
    }
    if (noBtnClickAttempts >= 5) {
        yesBtn.style.transform = 'scale(1.3)';
        yesBtn.style.fontSize = '26px';
    }
}, 500);

// Initialize floating hearts
createFloatingHearts();

// Add sparkle cursor effect
document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.9) {
        const sparkle = document.createElement('div');
        sparkle.textContent = '✨';
        sparkle.style.position = 'fixed';
        sparkle.style.left = e.clientX + 'px';
        sparkle.style.top = e.clientY + 'px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.fontSize = '12px';
        sparkle.style.zIndex = '9999';
        sparkle.style.animation = 'sparkleDisappear 1s ease-out forwards';

        document.body.appendChild(sparkle);

        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }
});

// Add sparkle animation
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkleDisappear {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-30px) scale(0);
        }
    }
`;
document.head.appendChild(sparkleStyle);
