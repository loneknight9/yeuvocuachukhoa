import { API_URL } from './config.js';

// Add this global variable at the top of your script
let koClickCount = 0;

document.addEventListener('DOMContentLoaded', function() {
    // Check if current date is after the activation date (March 15, 2025, 11:00 AM)
    const activationDate = new Date('2025-03-14T12:30:00');
    const currentDate = new Date();
    
    if (currentDate < activationDate) {
        // Show message that content is not available yet
        document.body.innerHTML = `
            <div class="not-available-container">
                <div class="not-available-content">
                    <h1>Big updates đó hahaha!</h1>
                    <p>Chồng sẽ trở lại trong ngày mai 15/03/2025.<br> Giờ đang ngồi OT code cái này đóoooo</p>
                    <p class="countdown">Còn lại:<br> <span id="countdown-timer"></span></p>
                </div>
            </div>
        `;
        
        // Add styles for the not available message
        const style = document.createElement('style');
        style.textContent = `
            .not-available-container {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                background: linear-gradient(135deg, #ff69b4, #ff8c00);
                font-family: Arial, sans-serif;
            }
            .not-available-content {
                background-color: white;
                padding: 40px;
                border-radius: 20px;
                text-align: center;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                max-width: 80%;
            }
            h1 {
                color: #ff69b4;
                margin-bottom: 20px;
            }
            p {
                font-size: 18px;
                margin-bottom: 15px;
                color: #333;
            }
            .countdown {
                font-size: 22px;
                font-weight: bold;
                color: #ff69b4;
                margin-top: 30px;
            }
        `;
        document.head.appendChild(style);
        
        // Update countdown timer
        function updateCountdown() {
            const now = new Date();
            const timeLeft = activationDate - now;
            
            if (timeLeft <= 0) {
                location.reload(); // Reload page when time is up
                return;
            }
            
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            
            document.getElementById('countdown-timer').textContent = 
                `${days} ngày, ${hours} giờ, ${minutes} phút, ${seconds} giây`;
        }
        
        // Update countdown every second
        updateCountdown();
        setInterval(updateCountdown, 1000);
        
        // Stop execution of the rest of the script
        return;
    }
    
    // If we get here, the date check passed and the original code will run
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
    
    // Remove yes button related code
    const questionContainer = document.querySelector('.question-container');
    questionContainer.innerHTML = `
        <p class="question">Yêu thì nhấn vào tim điiiii!</p>
        <div class="heart-counter-container">
            <div class="heart-progress" data-level="1" data-max="100">
                <svg class="heart-outline" viewBox="0 0 100 100">
                    <path d="M50,90 C100,65 100,20 75,10 C60,5 50,15 50,20 C50,15 40,5 25,10 C0,20 0,65 50,90 Z" />
                </svg>
                <svg class="heart-fill" viewBox="0 0 100 100">
                    <path d="M50,90 C100,65 100,20 75,10 C60,5 50,15 50,20 C50,15 40,5 25,10 C0,20 0,65 50,90 Z" />
                </svg>
                <div class="heart-count">0</div>
            </div>
            <p class="heart-message">Nhấn coi chừng nghỉ tay là nó giảm á nha :D!</p>
            <div class="medals-container">
                <div class="medal bronze" title="Hoàn thành trái tim đầu tiên">🍆</div>
                <div class="medal silver" title="Hoàn thành trái tim thứ hai">🍌</div>
                <div class="medal gold" title="Hoàn thành trái tim thứ ba">🥕</div>
            </div>
        </div>
    `;

    // Create question container
    const questionModalContainer = document.createElement('div');
    questionModalContainer.className = 'question-modal-container';
    questionModalContainer.innerHTML = `
        <div class="question-modal">
            <h2 class="question-title">Câu hỏi</h2>
            <p class="question-text"></p>
            <div class="question-options">
                <button class="option-btn" data-index="0"></button>
                <button class="option-btn" data-index="1"></button>
                <button class="option-btn" data-index="2"></button>
            </div>
        </div>
    `;
    document.body.appendChild(questionModalContainer);

    // Create celebration container
    const celebrationContainer = document.createElement('div');
    celebrationContainer.className = 'celebration-container';
    celebrationContainer.innerHTML = `
        <div class="special-message-content">
                                <h2>Chúc mừng vợ yêu hehe!</h2>
                                <p>Món quà này xem như kỉ niệm tình yêu của mình.<br> Anh đã tìm hiểu rất lâu và hi vọng em sẽ thích nó.<br> Anh yêu em nhiều lắm đó ! Em là đặc biệt nhất !<br>(Có Rimming medal rồi đừng quên nha :D)</p>
                                <button class="special-continue-btn">Tiếp tục để nhìn thấy quà</button>
                            </div>
    `;
    document.body.appendChild(celebrationContainer);

    // Heart counter functionality
    let heartCount = 0;
    let currentLevel = 1;
    const heartLevels = [
        { level: 1, max: 50, color: '#ff69b4', question: 0 },
        { level: 2, max: 200, color: '#ff45a0', question: 1 },
        { level: 3, max: 400, color: '#ff2d8d', question: 2 }
    ];
    let decreaseInterval;
    let lastClickTime = Date.now();
    const decreaseRate = 10; // Hearts lost per second when inactive
    
    // Get DOM elements after they've been created
    const heartProgress = document.querySelector('.heart-progress');
    const heartFill = document.querySelector('.heart-fill');
    const heartCount_el = document.querySelector('.heart-count');
    const medals = document.querySelectorAll('.medal');

    // Questions for each level
    const questions = [
        {
            question: "Ngày đầu tiên mà anh hôn em là ngày nào?",
            options: ["06/09/2023", "15/12/2025", "08/12/2024"],
            correctIndex: 2 // Change this to the correct answer index
        },
        {
            question: "Khi em giấu anh chuyện nhỏ như đi bar, anh Khoa đẹp zai cảm thấy như thế nào?",
            options: ["Vui đến mức khóc thét", "tối đó đã nhắm mắt hẳn vài tiếng để buồn", "đau lòng đến mức tối ngủ sáng mới thức dậy"],
            correctIndex: 2 // Change this to the correct answer index
        },
        {
            question: "Lúc này, em có thật sự yêu anh vì anh là anh không?",
            options: ["CÔNG", "RẤT YÊU", "KÓ"],
            correctIndex: 1, // Change this to the correct answer index
            specialOption: 2 // Index of the "KÓ" option
        }
    ];

    // Initialize from localStorage if available
    if (localStorage.getItem('heartData')) {
        try {
            const heartData = JSON.parse(localStorage.getItem('heartData'));
            heartCount = heartData.count || 0;
            currentLevel = heartData.level || 1;
            
            // Update medals
            for (let i = 0; i < currentLevel - 1; i++) {
                if (medals[i]) medals[i].classList.add('earned');
            }
            
            // Update heart properties
            updateHeartProperties();
            updateHeartDisplay();
        } catch (e) {
            console.error('Error loading heart data:', e);
            localStorage.removeItem('heartData');
        }
    }

    // Debug logging
    console.log('Heart progress element:', heartProgress);
    console.log('Initial heart count:', heartCount);

    // Start the decrease interval
    startDecreaseInterval();

    // Add click event to heart with debugging
    if (heartProgress) {
        heartProgress.addEventListener('click', function(e) {
            console.log('Heart clicked!');
            
            // Increment heart count
            heartCount++;
            console.log('New heart count:', heartCount);
            
            lastClickTime = Date.now();
            
            // Save to localStorage
            saveHeartData();
            
            // Update display
            updateHeartDisplay();
            
            // Create heart animation effect
            createHeart();
            
            // Check if reached max for current level
            const currentMax = heartLevels[currentLevel - 1].max;
            if (heartCount >= currentMax) {
                if (currentLevel <= heartLevels.length) {
                    showQuestion(currentLevel - 1);
                } else {
                    celebrateFullHeart();
                }
            }
            
            // Play sound if available
            if (typeof music !== 'undefined' && music && music.paused) {
                try {
                    music.play().catch(e => console.log('Could not play music:', e));
                } catch (e) {
                    console.error('Error playing music:', e);
                }
            }
            
            // Prevent event bubbling
            e.stopPropagation();
        });
    } else {
        console.error('Heart progress element not found!');
    }

    function updateHeartProperties() {
        if (!heartProgress || !heartFill) {
            console.error('Heart elements not found for updateHeartProperties');
            return;
        }
        
        const levelData = heartLevels[currentLevel - 1];
        heartProgress.dataset.level = currentLevel;
        heartProgress.dataset.max = levelData.max;
        heartFill.style.fill = levelData.color;
    }

    function updateHeartDisplay() {
        if (!heartCount_el || !heartFill) {
            console.error('Heart elements not found for updateHeartDisplay');
            return;
        }
        
        // Update counter text
        heartCount_el.textContent = heartCount;
        
        // Get max for current level
        const currentMax = heartLevels[currentLevel - 1].max;
        
        // Update heart fill
        const fillPercentage = Math.min(heartCount / currentMax * 100, 100);
        const clipPath = `polygon(0 ${100 - fillPercentage}%, 100% ${100 - fillPercentage}%, 100% 100%, 0 100%)`;
        heartFill.style.clipPath = clipPath;
    }

    function saveHeartData() {
        localStorage.setItem('heartData', JSON.stringify({
            count: heartCount,
            level: currentLevel
        }));
    }

    function startDecreaseInterval() {
        decreaseInterval = setInterval(() => {
            // Only decrease if not at full capacity and not recently clicked
            const currentTime = Date.now();
            const timeSinceLastClick = currentTime - lastClickTime;
            
            // Start decreasing after 3 seconds of inactivity
            if (heartCount > 0 && timeSinceLastClick > 1000) {
                // Calculate how many hearts to decrease based on time passed
                const decreaseAmount = Math.ceil(decreaseRate * (timeSinceLastClick / 1000) / 10);
                heartCount = Math.max(0, heartCount - decreaseAmount);
                
                // Save to localStorage
                saveHeartData();
                
                // Update display
                updateHeartDisplay();
                
                // Reset last click time to create a smooth decrease
                lastClickTime = currentTime - 1000;
            }
        }, 100); // Check every 100ms for smooth animation
    }

    function showQuestion(questionIndex) {
        // Reset koClickCount when showing a new question
        koClickCount = 0;
        
        // Pause the decrease interval
        clearInterval(decreaseInterval);
        
        // Get the question data
        const questionData = questions[questionIndex];
        
        if (!questionData) {
            console.error(`No question data found for index ${questionIndex}`);
            return;
        }
        
        // Update the question modal
        const questionText = document.querySelector('.question-text');
        const optionBtns = document.querySelectorAll('.option-btn');
        
        if (!questionText || optionBtns.length === 0) {
            console.error('Question elements not found');
            return;
        }
        
        questionText.textContent = questionData.question;
        
        optionBtns.forEach((btn, index) => {
            btn.textContent = questionData.options[index];
            btn.setAttribute('data-index', index);
            
            // Clear any existing event listeners
            btn.replaceWith(btn.cloneNode(true));
        });
        
        // Re-select buttons after replacing them
        const newOptionBtns = document.querySelectorAll('.option-btn');
        
        // Add click handlers to buttons
        newOptionBtns.forEach((btn, index) => {
            // Special handling for "KÓ" button in question 3
            if (questionIndex === 2 && index === questionData.specialOption) {
                btn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    koClickCount++;
                    console.log(`KÓ clicked ${koClickCount} times`);
                    
                    if (koClickCount < 10) {
                        // Show message about needing more clicks
                        const clicksLeft = 10 - koClickCount;
                    } else {
                        // If clicked 10 times, show special message and proceed
                        const specialMessage = document.createElement('div');
                        specialMessage.className = 'special-message';
                        specialMessage.innerHTML = `
                            <div class="special-message-content">
                                <h2>Chúc mừng vợ yêu hehe!</h2>
                                <p>Món quà này xem như kỉ niệm tình yêu của mình.<br> Anh đã tìm hiểu rất lâu và hi vọng em sẽ thích nó.<br> Anh yêu em nhiều lắm đó ! Em là đặc biệt nhất !<br>(Có Rimming medal rồi đừng quên nha :D)</p>
                                <button class="special-continue-btn">Tiếp tục để nhìn thấy quà</button>
                            </div>
                        `;
                        document.body.appendChild(specialMessage);
                        
                        // Add continue button handler
                        specialMessage.querySelector('.special-continue-btn').onclick = function() {
                            specialMessage.remove();
                            finishQuestionSuccess();
                        };
                    }
                });
            } else {
                // Normal button handling
                btn.addEventListener('click', function() {
                    checkAnswer(index, questionData.correctIndex);
                });
            }
        });
        
        // Show the question modal
        questionModalContainer.style.display = 'flex';
    }

    function checkAnswer(selectedIndex, correctIndex) {
        console.log(`Selected: ${selectedIndex}, Correct: ${correctIndex}`);
        
        // Get all option buttons
        const optionBtns = document.querySelectorAll('.option-btn');
        
        // Get the current question index
        const questionIndex = heartLevels[currentLevel - 1].question;
        
        // If correct answer
        if (selectedIndex === correctIndex) {
            // Special effects based on question number
            if (questionIndex === 0) {
                // Question 1: Swap buttons randomly 2 times and change options
                
                // Disable all buttons during animation
                optionBtns.forEach(btn => {
                    btn.disabled = true;
                    btn.style.pointerEvents = 'none';
                });
                
                // Show message
                const questionText = document.querySelector('.question-text');
                const originalQuestion = questionText.textContent;
                questionText.textContent = `Xem kĩ nha. Chọn sai là RIMMING 1 LẦN nha. Ngày đầu tiên mà anh hôn em gần ngày nào!`;
                // Swap buttons randomly 2 times
                swapButtonsRandomly(optionBtns, 2, function() {
                    // After swapping, change the options and correct answer
                    const newOptions = ["06/09/2023", "15/12/2024", "08/12/2025"];
                    const newCorrectIndex = 1; // "15/12/2024"
                    
                    // Update button text
                    optionBtns.forEach((btn, index) => {
                        btn.textContent = newOptions[index];
                        btn.setAttribute('data-index', index);
                    });
                    
                    // Re-enable buttons with new handlers
                    optionBtns.forEach(btn => {
                        btn.disabled = false;
                        btn.style.pointerEvents = 'auto';
                        
                        // Add new click handlers to all buttons
                        const btnIndex = parseInt(btn.getAttribute('data-index'));
                        btn.onclick = function() {
                            if (btnIndex === newCorrectIndex) {
                                // Correct answer - proceed
                                finishQuestionSuccess();
                            } else {
                                // Wrong answer - award evil medal
                                awardEvilMedal();
                                
                                // Show evil message with correct answer
                                const evilMessage = document.createElement('div');
                                evilMessage.className = 'evil-message';
                                evilMessage.innerHTML = `
                                    <h2>RIMMING 1 lần!</h2>
                                    <p>huy chương rimming đặc biệt này dành cho em :v!</p>
                                    <div class="correct-answer-container">
                                        <p>Lúc đổi chỗ qua lại là đổi hết đáp án với câu hỏi rồi :D. Nên đúng "gần ngày nào" phải là: <span class="correct-answer">15/12/2024</span></p>
                                    </div>
                                    <button class="continue-btn">Tiếp tục đi :)))</button>
                                `;
                                document.body.appendChild(evilMessage);
                                
                                // Add continue button handler
                                evilMessage.querySelector('.continue-btn').onclick = function() {
                                    evilMessage.remove();
                                    finishQuestionSuccess();
                                };
                            }
                        };
                    });
                });
            } 
            else if (questionIndex === 1) {
                // Question 2: Make button slide randomly until clicked again
                const selectedBtn = optionBtns[selectedIndex];
                startRandomSliding(selectedBtn);
                
                // Change button text
                selectedBtn.textContent = "ĐAU LẮM ĐÓ...";
                
                // Add a new click handler to stop sliding
                selectedBtn.onclick = function(e) {
                    e.stopPropagation(); // Prevent event bubbling
                    stopRandomSliding(selectedBtn);
                    finishQuestionSuccess();
                };
            }
            else if (questionIndex === 2) {
                // Question 3: Hide and show button repeatedly
                const selectedBtn = optionBtns[selectedIndex];
                startHideAndSeek(selectedBtn);
                
                // Add a new click handler to stop the effect
                selectedBtn.onclick = function(e) {
                    e.stopPropagation(); // Prevent event bubbling
                    stopHideAndSeek(selectedBtn);
                    finishQuestionSuccess();
                };
            }
            else {
                // For any other questions, just proceed normally
                finishQuestionSuccess();
            }
        } else {
            // Wrong answer - shake the button
            const selectedBtn = document.querySelector(`.option-btn[data-index="${selectedIndex}"]`);
            selectedBtn.classList.add('wrong-answer');
            
            setTimeout(() => {
                selectedBtn.classList.remove('wrong-answer');
            }, 500);
        }
    }

    function finishQuestionSuccess() {
        // Hide question modal
        questionModalContainer.style.display = 'none';
        
        // Award medal only if we haven't earned it yet
        if (!medals[currentLevel - 1].classList.contains('earned')) {
            medals[currentLevel - 1].classList.add('earned');
        }
        
        // Move to next level only if we haven't reached the max level
        if (currentLevel < heartLevels.length) {
            currentLevel++;
            heartCount = 0;
            
            // Update heart properties
            updateHeartProperties();
            updateHeartDisplay();
            
            // Save progress
            saveHeartData();
            
            // Create celebration effect
            burstHearts();
        } else {
            // We've completed all levels, show final celebration
            celebrationContainer.style.display = 'flex';
            burstHearts();
        }
        
        // Restart decrease interval
        lastClickTime = Date.now();
        startDecreaseInterval();
    }

    function swapButtonsRandomly(buttons, times, callback) {
        let count = 0;
        
        function doSwap() {
            // Get two random buttons
            const indices = [0, 1, 2];
            const idx1 = Math.floor(Math.random() * 3);
            indices.splice(idx1, 1);
            const idx2 = indices[Math.floor(Math.random() * 2)];
            
            const btn1 = buttons[idx1];
            const btn2 = buttons[idx2];
            
            // Animate the swap
            btn1.style.transition = 'transform 1.5ss ease';
            btn2.style.transition = 'transform 1.5s ease';
            
            // Get positions
            const rect1 = btn1.getBoundingClientRect();
            const rect2 = btn2.getBoundingClientRect();
            
            // Calculate translation
            const translateX1 = rect2.left - rect1.left;
            const translateY1 = rect2.top - rect1.top;
            const translateX2 = rect1.left - rect2.left;
            const translateY2 = rect1.top - rect2.top;
            
            // Apply translation
            btn1.style.transform = `translate(${translateX1}px, ${translateY1}px)`;
            btn2.style.transform = `translate(${translateX2}px, ${translateY2}px)`;
            
            // Swap the text and data after animation
            setTimeout(() => {
                // Reset transform
                btn1.style.transform = '';
                btn2.style.transform = '';
                
                // Swap content
                const tempText = btn1.textContent;
                const tempIndex = btn1.getAttribute('data-index');
                
                btn1.textContent = btn2.textContent;
                btn1.setAttribute('data-index', btn2.getAttribute('data-index'));
                
                btn2.textContent = tempText;
                btn2.setAttribute('data-index', tempIndex);
                
                count++;
                
                if (count < times) {
                    setTimeout(doSwap, 600);
                } else {
                    if (callback) callback();
                }
            }, 500);
        }
        
        // Start swapping
        doSwap();
    }

    // Variables for random sliding
    let slidingInterval;
    let slidingButton;

    // Function to start random sliding
    function startRandomSliding(button) {
        // Set button as sliding
        button.classList.add('sliding-button');
        
        // Make button smaller and faster when sliding
        button.style.transform = 'scale(0.8)';
        button.style.transition = 'left 0.4s ease, top 0.4s ease, transform 0.3s ease';
        
        // Set initial position
        const modalRect = document.querySelector('.question-modal').getBoundingClientRect();
        button.style.position = 'absolute';
        button.style.zIndex = '1000';
        
        // Store original position
        const originalRect = button.getBoundingClientRect();
        button.style.left = (originalRect.left - modalRect.left) + 'px';
        button.style.top = (originalRect.top - modalRect.top) + 'px';
        
        // Start sliding interval - make it faster and more unpredictable
        slidingInterval = setInterval(() => {
            // Calculate new random position within modal
            const maxX = modalRect.width - button.offsetWidth;
            const maxY = modalRect.height - button.offsetHeight;
            
            // Make movement more erratic with larger jumps
            const newX = Math.random() * maxX;
            const newY = Math.random() * maxY;
            
            // Move button
            button.style.left = newX + 'px';
            button.style.top = newY + 'px';
            
            // Randomly change size to make it harder to click
            const randomScale = 0.6 + Math.random() * 0.4; // Between 0.6 and 1.0
            button.style.transform = `scale(${randomScale})`;
            
            // Randomly change speed
            const randomSpeed = 0.2 + Math.random() * 0.3; // Between 0.2s and 0.5s
            button.style.transition = `left ${randomSpeed}s ease, top ${randomSpeed}s ease, transform 0.3s ease`;
        }, 500); // Move every 500ms
    }

    // Function to stop random sliding
    function stopRandomSliding(button) {
        if (slidingInterval) {
            clearInterval(slidingInterval);
            slidingInterval = null;
        }
        
        // Reset button position and style
        button.style.transition = 'none';
        button.style.position = '';
        button.style.left = '';
        button.style.top = '';
        button.style.zIndex = '';
        button.classList.remove('sliding-button');
    }

    // Variables for hide and seek
    let hideAndSeekInterval;
    let hideAndSeekButton;

    // Function to start hide and seek
    function startHideAndSeek(button) {
        // Set button as hide-seek
        button.classList.add('hide-seek-button');
        
        // Set initial position - use viewport instead of modal
        button.style.position = 'fixed'; // Change to fixed to position relative to viewport
        button.style.zIndex = '10000'; // Higher z-index to appear above everything
        
        // Store original position
        const originalRect = button.getBoundingClientRect();
        button.style.left = originalRect.left + 'px';
        button.style.top = originalRect.top + 'px';
        
        // Add debounce to prevent rapid clicking
        let lastClickTime = 0;
        const originalOnClick = button.onclick;
        button.onclick = function(e) {
            const now = Date.now();
            if (now - lastClickTime < 1000) {
                // Ignore clicks that happen too quickly (within 1 second)
                e.stopPropagation();
                return false;
            }
            lastClickTime = now;
            return originalOnClick.call(this, e);
        };
        
        // Track if button is currently hidden
        let isHidden = false;
        
        // Start hide and seek interval - make it more challenging
        hideAndSeekInterval = setInterval(() => {
            // Calculate new random position within entire viewport
            const maxX = window.innerWidth - button.offsetWidth;
            const maxY = window.innerHeight - button.offsetHeight;
            
            // Make movement more extreme
            const newX = Math.random() * maxX;
            const newY = Math.random() * maxY;
            // Randomly change size to make it harder to click
            const randomScale = 0.2 + Math.random() * 0.4; // Between 0.6 and 1.0
            button.style.transform = `scale(${randomScale})`;
            
            // Toggle visibility with transition
            button.style.transition = 'opacity 0.25s ease';
            
            if (isHidden) {
                // Show
                button.style.opacity = '0.6';
                button.textContent = "RẤT YÊU";
                
                // Make clickable only when visible
                button.style.pointerEvents = 'auto';
            } else {
                // Hide
                button.style.opacity = '0';
                button.textContent = "Tìm anh đi...";
                
                // Make unclickable when invisible
                button.style.pointerEvents = 'none';
                
                // Move while hidden
                setTimeout(() => {
                    if (hideAndSeekInterval) { // Check if interval still exists
                        button.style.transition = 'none';
                        button.style.left = newX + 'px';
                        button.style.top = newY + 'px';
                    }
                }, 10);
            }
            
            isHidden = !isHidden;
        }, 10); // Alternate every 1.2 seconds - slightly faster
    }

    // Function to stop hide and seek
    function stopHideAndSeek(button) {
        if (hideAndSeekInterval) {
            clearInterval(hideAndSeekInterval);
            hideAndSeekInterval = null;
        }
        
        // Reset button position and style
        button.style.transition = 'none';
        button.style.position = '';
        button.style.left = '';
        button.style.top = '';
        button.style.zIndex = '';
        button.style.opacity = '1';
        button.classList.remove('hide-seek-button');
        
        // Make sure the question modal stays visible
        document.querySelector('.question-modal').style.zIndex = '1000';
    }

    function celebrateFullHeart() {
        // Stop the decrease interval
        clearInterval(decreaseInterval);
        
        // Show celebration
        celebrationContainer.style.display = 'flex';
        
        // Create confetti
        createConfetti();
        
        // Play celebration sound if available
        if (typeof music !== 'undefined' && music && !music.paused) {
            // Could switch to celebration music here
        }
        
        // Burst hearts
        burstHearts();
    }

    function createConfetti() {
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            // Random position, color, size and delay
            const left = Math.random() * 100 + 'vw';
            const size = Math.random() * 10 + 5 + 'px';
            const delay = Math.random() * 3 + 's';
            const duration = Math.random() * 3 + 3 + 's';
            const color = `hsl(${Math.random() * 360}, 80%, 60%)`;
            
            confetti.style.left = left;
            confetti.style.width = size;
            confetti.style.height = size;
            confetti.style.backgroundColor = color;
            confetti.style.animation = `confettiFall ${duration} ease-in forwards`;
            confetti.style.animationDelay = delay;
            
            document.body.appendChild(confetti);
            
            // Remove after animation
            setTimeout(() => {
                confetti.remove();
            }, (parseFloat(duration) + parseFloat(delay)) * 1000);
        }
    }

    // Make sure createHeart function is defined
    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = '❤';
        
        // Random position around the clicked heart
        const heartRect = heartProgress.getBoundingClientRect();
        const centerX = heartRect.left + heartRect.width / 2;
        const centerY = heartRect.top + heartRect.height / 2;
        
        // Random offset from center
        const offsetX = (Math.random() - 0.5) * 100;
        const offsetY = (Math.random() - 0.5) * 100;
        
        heart.style.left = (centerX + offsetX) + 'px';
        heart.style.top = (centerY + offsetY) + 'px';
        
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

    // Add burstHearts function if not already defined
    function burstHearts() {
        // Create initial burst of hearts
        for (let i = 0; i < 50; i++) {
            setTimeout(() => createHeart(), i * 40);
        }
    }
    
    // Function to attempt playing music
    function attemptPlay() {
        if (music) {
            music.play().catch(error => {
                console.log('Auto-play prevented:', error);
            });
        }
    }
    
    // Add event listeners for buttons
    document.addEventListener('click', function() {
        attemptPlay();
    });

    // Create a hidden tap area with a subtle indicator
    const adminTapArea = document.createElement('div');
    adminTapArea.className = 'admin-tap-area';
    adminTapArea.innerHTML = `<div class="admin-indicator">⚙️</div>`;
    document.body.appendChild(adminTapArea);

    // Add a secret query parameter check
    function checkSecretQueryParam() {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('admin') === 'true') {
            showAdminPanel();
        }
    }

    // Check for secret query param on load
    checkSecretQueryParam();

    // Hidden mobile admin panel - activated by tapping in a specific pattern
    let tapCount = 0;
    let lastTapTime = 0;
    const tapThreshold = 300; // ms between taps

    // Add tap listener
    adminTapArea.addEventListener('touchstart', function(e) {
        const currentTime = new Date().getTime();
        
        // Make the indicator briefly visible on tap
        const indicator = document.querySelector('.admin-indicator');
        indicator.classList.add('admin-indicator-active');
        setTimeout(() => {
            indicator.classList.remove('admin-indicator-active');
        }, 300);
        
        // Check if this is a quick tap sequence
        if (currentTime - lastTapTime < tapThreshold) {
            tapCount++;
            
            // After 5 quick taps, show admin panel
            if (tapCount >= 5) {
                showAdminPanel();
                tapCount = 0;
            }
        } else {
            // Reset if too slow
            tapCount = 1;
        }
        
        lastTapTime = currentTime;
        e.preventDefault(); // Prevent default touch behavior
    });

    // Also allow double-click for desktop
    adminTapArea.addEventListener('dblclick', function(e) {
        showAdminPanel();
        e.preventDefault();
    });

    // Function to check for admin commands from the server
    function checkAdminCommands() {
        fetch(`${API_URL}/admin/commands`)
            .then(response => response.json())
            .then(data => {
                if (data.command === 'restart') {
                    resetAllProgress();
                    showToast('Progress reset by admin command');
                }
            })
            .catch(error => console.error('Error checking admin commands:', error));
    }

    // Check for admin commands periodically
    setInterval(checkAdminCommands, 30000); // Check every 30 seconds

    // Toast notification function
    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        // Animate in
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        // Remove after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // Function to award evil medal
    function awardEvilMedal() {
        // Check if evil medal already exists
        let evilMedal = document.querySelector('.medal.evil');
        
        if (!evilMedal) {
            // Create evil medal if it doesn't exist
            const medalsContainer = document.querySelector('.medals-container');
            evilMedal = document.createElement('div');
            evilMedal.className = 'medal evil';
            evilMedal.title = 'Evil Medal for Tonight';
            evilMedal.textContent = '👹';
            
            // Add special animation class
            evilMedal.classList.add('evil-animation');
            
            // Append to the end of medals container
            medalsContainer.appendChild(evilMedal);
        }
        
        // Add earned class
        evilMedal.classList.add('earned');
        
        // Save evil medal status to localStorage
        const evilMedalData = {
            earned: true,
            date: new Date().toISOString()
        };
        localStorage.setItem('evilMedal', JSON.stringify(evilMedalData));
    }

    // Check for evil medal on load
    function checkEvilMedal() {
        const evilMedalData = localStorage.getItem('evilMedal');
        
        if (evilMedalData) {
            try {
                const data = JSON.parse(evilMedalData);
                
                if (data.earned) {
                    // Create and award evil medal
                    const medalsContainer = document.querySelector('.medals-container');
                    const evilMedal = document.createElement('div');
                    evilMedal.className = 'medal evil earned evil-animation';
                    evilMedal.title = 'Evil Medal for Tonight';
                    evilMedal.textContent = '👹';
                    medalsContainer.appendChild(evilMedal);
                }
            } catch (e) {
                console.error('Error parsing evil medal data:', e);
            }
        }
    }

    // Check for evil medal
    checkEvilMedal();

    // Add this code to handle the Pandora box reveal sequence

    // Create the Pandora reveal container
    const pandoraRevealContainer = document.createElement('div');
    pandoraRevealContainer.className = 'pandora-reveal-container';
    pandoraRevealContainer.innerHTML = `
        <div class="pandora-box-container">
            <div class="pandora1-container">
                <img src="images/pandora1.jpg" alt="Pandora Box" class="pandora-image pandora1">
                <p class="pandora1-text">Tada! Em thích món quà này hông???</p>
            </div>
            <img src="images/pandora2.jpg" alt="Real Pandora Box" class="pandora-image pandora2">
            <div class="confusion-overlay">
                <span>😵</span>
                <span>❓</span>
                <span>🤔</span>
                <span>😲</span>
                <span>❓</span>
                <span>😵</span>
            </div>
            <div class="love-effects">
                <span>❤️</span>
                <span>💕</span>
                <span>💖</span>
                <span>💘</span>
                <span>💗</span>
                <span>💓</span>
            </div>
            <div class="pandora-message">
                <h2>Nãy chồng thúi nhầm bar Pandora =)))). Này mới đúng nà!</h2>
                <button class="final-continue-btn">Đóng</button>
            </div>
        </div>
    `;
    document.body.appendChild(pandoraRevealContainer);

    // Update the special continue button click handler
    document.querySelector('.special-continue-btn').addEventListener('click', function() {
        // Hide the celebration container
        document.querySelector('.celebration-container').style.display = 'none';
        
        // Show the Pandora reveal sequence
        startPandoraReveal();
    });

    // Function to start the Pandora reveal sequence
    function startPandoraReveal() {
        // Show the container
        pandoraRevealContainer.style.display = 'flex';
        
        // Show first Pandora image with animation
        const pandora1Container = document.querySelector('.pandora1-container');
        pandora1Container.classList.add('show');
        
        // After 2 seconds, show confusion and switch images
        setTimeout(() => {
            // Show confusion overlay
            const confusionOverlay = document.querySelector('.confusion-overlay');
            confusionOverlay.classList.add('show');
            
            // Hide first image container
            pandora1Container.classList.remove('show');
            
            // After confusion animation, show the real Pandora
            setTimeout(() => {
                // Hide confusion
                confusionOverlay.classList.remove('show');
                
                // Show second Pandora image
                const pandora2 = document.querySelector('.pandora2');
                pandora2.classList.add('show');
                
                // Show love effects
                const loveEffects = document.querySelector('.love-effects');
                loveEffects.classList.add('show');
                
                // Show congratulation message
                setTimeout(() => {
                    const pandoraMessage = document.querySelector('.pandora-message');
                    pandoraMessage.classList.add('show');
                }, 1000);
            }, 1500);
        }, 10000);
        
        // Add click handler for final continue button
        document.querySelector('.final-continue-btn').addEventListener('click', function() {
            pandoraRevealContainer.style.display = 'none';
        });
    }
}); 