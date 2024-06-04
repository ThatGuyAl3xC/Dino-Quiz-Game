document.addEventListener('DOMContentLoaded', () => {

    let currentQuestionIndex = 0;
    let score = 0;
    
    const questionEl = document.getElementById('question');
    const optionsEl = document.querySelectorAll('.option');
    const submitBtn = document.getElementById('submit');
    const replayBtn = document.getElementById('replay-quiz');
    
    const gameModal = document.querySelector('.game-modal');
    const modalText = document.getElementById('modal-text');
    const modalTitle = document.getElementById('modal-title');
    const modalImg = document.getElementById('modal-img');
    
    function loadQuestion() {
        const currentQuestion = quizData[currentQuestionIndex];
        questionEl.innerText = currentQuestion.question;

        // shuffle the answer choices
        const shuffledOptions = shuffleArray(currentQuestion.options);

        optionsEl.forEach((option, index) => {
            option.innerText = shuffledOptions[index];
            option.classList.remove('correct', 'incorrect'); // clear previous highlight
            option.onclick = () => selectOption(option);
        });
    };

    function shuffleArray(array){
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    function selectOption(selectedOption) {
        optionsEl.forEach(option => {
            option.classList.remove('selected');
        });
        selectedOption.classList.add('selected');
    };
    
    submitBtn.onclick = () => {
        const selectedOption = document.querySelector('.option.selected');
        if (!selectedOption) return alert("Please select an option!");
    
        const answer = selectedOption.innerText;
        const correctAnswer = quizData[currentQuestionIndex].answer;

        optionsEl.forEach(option => {
            if(option.innerText === correctAnswer){
                option.classList.add('correct');
            } else if (option.innerText === answer){
                option.classList.add('incorrect');
            }
        });

        if (answer === correctAnswer) {
            score++;
        }
    
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            setTimeout(loadQuestion, 1000); // add a one second delay
        } else {
            showResult();
        }
    };
    
    function showResult() {
        modalText.innerText = `You scored ${score} out of ${quizData.length}!`;
        if (score === quizData.length){
            modalImg.src = 'images/welldone-dino.gif';
            modalTitle.innerText = 'Congrats, You Are A Dino Expert!';
        }
        else if (score >= quizData.length / 2){
            modalImg.src = 'images/almost-there-dino.gif';
            modalTitle.innerText = 'Good Job, but I know you can do better!';
        }
        else {
            modalImg.src = 'images/umm-do-better-dino.jpg';
            modalTitle.innerText = 'Game Over, You Need To Study Your Dinos More!';
        }
        gameModal.classList.add('show'); 
        submitBtn.style.display = 'none';
    };
    
    replayBtn.onclick = () => {
        currentQuestionIndex = 0;
        score = 0;
        modalText.innerText = ''; // Clear modal text if necessary
        modalImg.src = ''; // Clear modal image if necessary
        submitBtn.style.display = 'inline-block';
        gameModal.classList.remove('show');
        loadQuestion();
    };
    
    loadQuestion();

});

