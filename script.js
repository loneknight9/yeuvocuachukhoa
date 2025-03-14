import { API_URL } from './config.js';

document.addEventListener('DOMContentLoaded', function() {
    // Collect and send user data
    async function collectAndSendUserData() {
        console.log('Collecting and sending user data');
        try {
            console.log ("API_URL", API_URL);
            const userData = {
                date: new Date().toLocaleDateString('en-GB').split('/').join('-'), // dd-mm-yyyy
                time: new Date().toLocaleTimeString('en-GB'), // hh:mm:ss
                userAgent: navigator.userAgent,
                platform: navigator.platform,
                screenResolution: `${window.screen.width}x${window.screen.height}`,
                windowSize: `${window.innerWidth}x${window.innerHeight}`,
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                touchPoints: navigator.maxTouchPoints,
                vendor: navigator.vendor,
                referrer: document.referrer || 'Direct',
            };

            console.log('User data collected:', userData);
            // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
            const response = await fetch(`${API_URL}/initInfo`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                throw new Error('Failed to send user data');
            }

            console.log('User data sent successfully');
        } catch (error) {
            console.error('Error sending user data:', error);
        }
    }
    collectAndSendUserData();

    const music = document.getElementById('background-music');
    music.loop = true;
    music.volume = 0.7;
    
    // Initialize Heart Garden counter
    let heartCount = initializeHeartCount();
    createHeartCounter();
    
    function initializeHeartCount() {
        const savedCount = localStorage.getItem('heartCount');
        const targetDate = new Date('2025-03-07');
        const today = new Date();
        
        // Always return 82 for testing
        return 82;
    }
    
    function createHeartCounter() {
        if (heartCount === null) return; // Don't show counter if not time yet
        
        const counter = document.createElement('div');
        counter.className = 'heart-counter';
        counter.innerHTML = `
            <div class="heart-count">
                <span class="count-label">Ngày yêu:</span>
                <span class="count-number">${heartCount}</span>
                <span class="heart-symbol">❤️</span>
            </div>
        `;
        document.body.appendChild(counter);
        
        // Add styles dynamically
        const style = document.createElement('style');
        style.textContent = `
            .heart-counter {
                position: fixed;
                top: 20px;
                left: 20px;
                z-index: 1000;
                background: rgba(255, 105, 180, 0.3);
                backdrop-filter: blur(5px);
                padding: 15px 25px;
                border-radius: 25px;
                box-shadow: 0 4px 15px rgba(255,105,180,0.3);
                border: 2px solid rgba(255,105,180,0.5);
                transition: all 0.3s ease;
            }
            .heart-counter:hover {
                transform: scale(1.05);
                box-shadow: 0 6px 20px rgba(255,105,180,0.4);
            }
            .heart-count {
                display: flex;
                align-items: center;
                gap: 10px;
                color: #fff;
                font-size: 1.5rem;
                font-weight: bold;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
            }
            .count-label {
                font-size: 1.2rem;
                color: #fff;
            }
            .count-number {
                min-width: 2ch;
                text-align: center;
                color: #ff69b4;
                font-size: 1.8rem;
            }
            .heart-symbol {
                animation: pulse 1.5s infinite;
                font-size: 1.8rem;
            }
            .count-target {
                font-size: 1rem;
                color: rgba(255,255,255,0.8);
                text-align: center;
                margin-top: 5px;
            }
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.2); }
                100% { transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
    }
    
    function updateHeartCount() {
        if (heartCount === null) return false;
        
        const lastClick = localStorage.getItem('lastClickDate');
        const today = new Date();
        
        if (!lastClick || today.toDateString() !== new Date(lastClick).toDateString()) {
            heartCount++;
            
            localStorage.setItem('heartCount', heartCount.toString());
            localStorage.setItem('lastClickDate', today.toDateString());
            
            // Update counter display with animation
            const countDisplay = document.querySelector('.count-number');
            if (countDisplay) {
                countDisplay.style.animation = 'numberChange 0.5s ease';
                countDisplay.textContent = heartCount;
                
                // Add animation keyframes
                const style = document.createElement('style');
                style.textContent = `
                    @keyframes numberChange {
                        0% { transform: scale(1); }
                        50% { transform: scale(1.5); color: gold; }
                        100% { transform: scale(1); }
                    }
                `;
                document.head.appendChild(style);
                
                // Remove animation class after it completes
                setTimeout(() => {
                    countDisplay.style.animation = '';
                }, 500);
            }
            
            // Check for special event
            if (heartCount === 90) {
                setTimeout(triggerSpecialEvent, 1000);
            }
            
            return true;
        }
        return false;
    }
    
    function triggerSpecialEvent() {
        // Create special celebration effect
        document.body.style.overflow = 'hidden';
        
        // Create golden hearts burst
        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                createSpecialHeart();
            }, i * 50);
        }
        
        // Add special message with dinner surprise
        const specialMessage = document.createElement('div');
        specialMessage.className = 'special-90-message animate__animated animate__fadeInUp';
        specialMessage.innerHTML = `
            <div class="message-content">
                <h2>❤️ Ngày thứ 90 của chúng mình ❤️</h2>
                <p class="love-text">Em yêu, anh có một điều bất ngờ...</p>
                <div class="dinner-reveal animate__animated animate__fadeIn animate__delay-2s">
                    <p class="dinner-text">
                        <i class="fas fa-utensils"></i>
                        Tối nay 7h, anh đã đặt bàn cho hai đứa mình
                        <i class="fas fa-wine-glass"></i>
                    </p>
                    <p class="dinner-note">Hãy để anh được tận hưởng bữa tối lãng mạn cùng em nhé!</p>
                </div>
            </div>
        `;
        document.body.appendChild(specialMessage);
        
        // Add styles for special event
        const style = document.createElement('style');
        style.textContent = `
            .special-90-message {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(255, 255, 255, 0.95);
                padding: 3rem;
                border-radius: 30px;
                text-align: center;
                color: #ff69b4;
                box-shadow: 0 0 50px rgba(255, 105, 180, 0.5),
                            0 0 100px rgba(255, 105, 180, 0.3);
                z-index: 2000;
                max-width: 90vw;
                width: 600px;
                backdrop-filter: blur(10px);
                border: 3px solid rgba(255, 105, 180, 0.5);
            }
            .message-content {
                display: flex;
                flex-direction: column;
                gap: 1.5rem;
            }
            .special-90-message h2 {
                font-size: 2.5rem;
                margin-bottom: 0.5rem;
                background: linear-gradient(45deg, #ff69b4, #ff8da1, #ffa8b6, #ffb6c1);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
            }
            .love-text {
                font-size: 1.8rem;
                color: #ff69b4;
                margin-bottom: 1rem;
            }
            .dinner-reveal {
                background: linear-gradient(135deg, #ff69b4, #ff8da1);
                color: white;
                padding: 2rem;
                border-radius: 20px;
                margin-top: 1rem;
                box-shadow: 0 10px 20px rgba(255,105,180,0.2);
            }
            .dinner-text {
                font-size: 1.6rem;
                margin-bottom: 1rem;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 15px;
            }
            .dinner-note {
                font-size: 1.4rem;
                font-style: italic;
                opacity: 0.9;
            }
            .fas {
                color: gold;
                text-shadow: 0 0 10px rgba(255,215,0,0.5);
            }
            @media (max-width: 768px) {
                .special-90-message {
                    padding: 2rem;
                    width: 90vw;
                }
                .special-90-message h2 {
                    font-size: 2rem;
                }
                .love-text {
                    font-size: 1.5rem;
                }
                .dinner-text {
                    font-size: 1.3rem;
                }
                .dinner-note {
                    font-size: 1.2rem;
                }
            }
        `;
        document.head.appendChild(style);

        // Create sparkle effect
        createSparkleEffect();
    }

    function createSparkleEffect() {
        const sparkleContainer = document.createElement('div');
        sparkleContainer.className = 'sparkle-container';
        document.body.appendChild(sparkleContainer);

        const sparkleStyle = document.createElement('style');
        sparkleStyle.textContent = `
            .sparkle {
                position: fixed;
                pointer-events: none;
                background: radial-gradient(circle, #fff 0%, transparent 60%);
                border-radius: 50%;
                z-index: 1999;
                animation: sparkle-fade 1s ease-in-out forwards;
            }
            @keyframes sparkle-fade {
                0% { transform: scale(0); opacity: 0; }
                50% { transform: scale(1); opacity: 0.8; }
                100% { transform: scale(0); opacity: 0; }
            }
        `;
        document.head.appendChild(sparkleStyle);

        function createSparkle() {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = Math.random() * 100 + 'vw';
            sparkle.style.top = Math.random() * 100 + 'vh';
            sparkle.style.width = (Math.random() * 10 + 5) + 'px';
            sparkle.style.height = sparkle.style.width;
            sparkleContainer.appendChild(sparkle);

            sparkle.addEventListener('animationend', () => sparkle.remove());
        }

        // Create sparkles periodically
        const sparkleInterval = setInterval(createSparkle, 200);
        setTimeout(() => clearInterval(sparkleInterval), 10000); // Stop after 10 seconds
    }

    function createSpecialHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart special';
        heart.innerHTML = '❤';
        
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = Math.random() * 100 + 'vh';
        heart.style.fontSize = (Math.random() * 2 + 1.5) + 'rem';
        heart.style.filter = `
            hue-rotate(${Math.random() * 45}deg) 
            brightness(${150 + Math.random() * 50}%)
        `;
        heart.style.color = '#FFD700';
        document.body.appendChild(heart);
        
        heart.addEventListener('animationend', () => {
            heart.remove();
        });
    }

    // Initialize volume control with improved autoplay handling
    function initVolumeControl() {
        const volumeBtn = document.getElementById('volume-btn');
        const volumeIcon = volumeBtn.querySelector('i');
        const wasPlaying = localStorage.getItem('musicPlaying') === 'true';
        
        // Update button appearance
        function updateVolumeButton(isPlaying) {
            volumeIcon.className = isPlaying ? 'fas fa-volume-up' : 'fas fa-play';
            volumeBtn.classList.toggle('muted', !isPlaying);
        }

        // Function to handle play attempt
        async function attemptPlay() {
            try {
                await music.play();
                localStorage.setItem('musicPlaying', 'true');
                updateVolumeButton(true);
            } catch (err) {
                console.log('Autoplay prevented:', err);
                localStorage.setItem('musicPlaying', 'false');
                updateVolumeButton(false);
            }
        }

        // Add click event listener for volume button
        volumeBtn.addEventListener('click', function() {
            if (music.paused) {
                attemptPlay();
            } else {
                music.pause();
                localStorage.setItem('musicPlaying', 'false');
                updateVolumeButton(false);
            }
        });

        // Try to autoplay if previously playing
        if (wasPlaying) {
            attemptPlay();
        }

        // Add click event listener to document for music playback
        document.addEventListener('click', function(event) {
            if (music.paused && event.target.id !== 'volume-btn') {
                attemptPlay();
            }
        });

        return { attemptPlay }; // Return the function for use elsewhere
    }

    const { attemptPlay } = initVolumeControl();

    // Create heart effects
    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = '❤';
        
        // Random position across the entire screen
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = Math.random() * 100 + 'vh';
        
        // Random size and rotation
        const size = Math.random() * 2 + 1;
        const rotation = Math.random() * 360;
        heart.style.fontSize = `${size}rem`;
        heart.style.transform = `rotate(${rotation}deg)`;
        
        // Random color variation
        const hue = Math.random() * 30 - 15; // Variation around pink
        const saturation = 85 + Math.random() * 15;
        const lightness = 65 + Math.random() * 15;
        heart.style.color = `hsl(${340 + hue}, ${saturation}%, ${lightness}%)`;
        
        document.body.appendChild(heart);
        
        // Remove the heart element after animation completes
        setTimeout(() => {
            heart.remove();
        }, 2000);
    }

    // Add styles for heart animations
    const heartStyle = document.createElement('style');
    heartStyle.textContent = `
        .heart {
            position: fixed;
            z-index: 1000;
            pointer-events: none;
            animation: floatHeart 2s ease-in-out;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }

        @keyframes floatHeart {
            0% {
                transform: translate(0, 0) scale(0);
                opacity: 0;
            }
            10% {
                transform: translate(0, 0) scale(1);
                opacity: 1;
            }
            90% {
                transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * -100}px) scale(0.5);
                opacity: 0.5;
            }
            100% {
                transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * -200}px) scale(0);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(heartStyle);

    function burstHearts() {
        // Create initial burst of hearts
        for (let i = 0; i < 50; i++) {
            setTimeout(() => createHeart(), i * 40);
        }
    }

    function startContinuousHearts() {
        return setInterval(() => {
            for (let i = 0; i < 3; i++) {
                createHeart();
            }
        }, 300);
    }

    // Update the yes button click handler to include music playback
    const yesBtn = document.getElementById('yes-btn');
    yesBtn.addEventListener('click', function() {
        // Track button click
        // Try to play music if it's paused
        if (music.paused) {
            attemptPlay();
        }

        const questionText = document.querySelector('.question');
        questionText.textContent = 'Anh biết mà! Anh cũng yêu em nhiều lắm! ❤️';
        questionText.classList.add('animate__animated', 'animate__heartBeat');
        
        yesBtn.style.display = 'none';
        
        // Create heart effects regardless of count update
        burstHearts();
        const heartInterval = startContinuousHearts();
        
        // Store the interval ID
        localStorage.setItem('heartInterval', heartInterval);
        
        // Update heart count
        updateHeartCount();
        
        if (!document.querySelector('.special-message')) {
            const specialMessage = document.createElement('p');
            specialMessage.textContent = 'Chúc vợ yêu ngày 8/3 thật vui vẻ và hạnh phúc nhaaaaa!';
            specialMessage.classList.add('special-message', 'animate__animated', 'animate__fadeIn');
            specialMessage.style.fontSize = '1.5rem';
            specialMessage.style.marginTop = '20px';
            specialMessage.style.color = '#ff69b4';
            document.querySelector('.question-container').appendChild(specialMessage);
        }
    });
});

// Create heart effects
function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = '❤';
    
    // Random position across the entire screen
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.top = Math.random() * 100 + 'vh';
    
    // Random size and rotation
    const size = Math.random() * 2 + 1;
    const rotation = Math.random() * 360;
    heart.style.fontSize = `${size}rem`;
    heart.style.transform = `rotate(${rotation}deg)`;
    
    // Random color variation
    const hue = Math.random() * 30 - 15; // Variation around pink
    const saturation = 85 + Math.random() * 15;
    const lightness = 65 + Math.random() * 15;
    heart.style.color = `hsl(${340 + hue}, ${saturation}%, ${lightness}%)`;
    
    document.body.appendChild(heart);
    
    // Remove the heart element after animation completes
    setTimeout(() => {
        heart.remove();
    }, 2000);
}

// Add styles for heart animations
const heartStyle = document.createElement('style');
heartStyle.textContent = `
    .heart {
        position: fixed;
        z-index: 1000;
        pointer-events: none;
        animation: floatHeart 2s ease-in-out;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    }

    @keyframes floatHeart {
        0% {
            transform: translate(0, 0) scale(0);
            opacity: 0;
        }
        10% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        90% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * -100}px) scale(0.5);
            opacity: 0.5;
        }
        100% {
            transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * -200}px) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(heartStyle);

function burstHearts() {
    // Create initial burst of hearts
    for (let i = 0; i < 50; i++) {
        setTimeout(() => createHeart(), i * 40);
    }
}

function startContinuousHearts() {
    return setInterval(() => {
        for (let i = 0; i < 3; i++) {
            createHeart();
        }
    }, 300);
} 