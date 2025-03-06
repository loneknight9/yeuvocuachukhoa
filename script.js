document.addEventListener('DOMContentLoaded', function() {
    // Play background music when user interacts with the page
    const music = document.getElementById('background-music');
    
    // We need user interaction to play audio due to browser policies
    document.addEventListener('click', function() {
        if (music.paused) {
            music.play().catch(error => {
                console.error('Error playing audio:', error);
            });
        }
    }, { once: true });
    
    // Handle the "Yes" button
    const yesBtn = document.getElementById('yes-btn');
    yesBtn.addEventListener('click', function() {
        // Create celebration effect
        createHearts();
        
        // Change the question text
        const questionText = document.querySelector('.question');
        questionText.textContent = 'Đúng rồi! Bạn là người phụ nữ đẹp nhất thế giới! ❤️';
        questionText.classList.add('animate__animated', 'animate__heartBeat');
        
        // Hide the buttons
        document.querySelector('.buttons').style.display = 'none';
        
        // Show a special message
        const specialMessage = document.createElement('p');
        specialMessage.textContent = 'Chúc bạn ngày 8/3 thật vui vẻ và hạnh phúc!';
        specialMessage.classList.add('special-message', 'animate__animated', 'animate__fadeIn');
        specialMessage.style.fontSize = '1.5rem';
        specialMessage.style.marginTop = '20px';
        specialMessage.style.color = '#ff69b4';
        document.querySelector('.question-container').appendChild(specialMessage);
    });
    
    // Handle the "No" button - make it run away from cursor
    const noBtn = document.getElementById('no-btn');
    noBtn.addEventListener('mouseover', function(e) {
        // Calculate new position
        const x = Math.random() * (window.innerWidth - 100);
        const y = Math.random() * (window.innerHeight - 50);
        
        // Set new position
        noBtn.style.position = 'absolute';
        noBtn.style.left = x + 'px';
        noBtn.style.top = y + 'px';
    });
    
    // If they somehow manage to click "No"
    noBtn.addEventListener('click', function() {
        // Force the "Yes" button click
        yesBtn.click();
    });
});

// Function to create falling hearts
function createHearts() {
    // Create many hearts
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.innerHTML = '❤️';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDuration = Math.random() * 3 + 2 + 's';
            document.body.appendChild(heart);
            
            // Remove heart after animation completes
            setTimeout(() => {
                heart.remove();
            }, 5000);
        }, i * 100);
    }
} 