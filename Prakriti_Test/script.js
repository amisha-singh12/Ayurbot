const questions = [
    "What is your skin type?",
    "Describe your hair type.",
    "How would you characterize your eyes?",
    "What is your body built like?",
    "Tell me about your joints.",
    "Describe your body organs.",
    "Explain your lip characteristics.",
    "How would you describe your teeth?",
    "What is your appetite for food and digestion like?",
    "Share your dietary habits with me.",
    "What tastes do you desire?",
    "How do you experience thirst and perspiration?",
    "Tell me about your bowel habits as part of your digestive system.",
    "Describe your level of vigour (strength or energy).",
    "How would you characterize your sleep in terms of amount and quality?",
    "Explain your body odor."
];


const options = [
    [
        "Dry, rough",
        "Soft, sensitive",
        "Smooth, moist, cold"
    ],
    [
        "Thin, less, dry",
        "Oily, thin, red",
        "Thick, glossy, black hair"
    ],
    [
        "Dry, unsteady and blinking",
        "Sharp, easily become red, copper eye lashes",
        "Large, attractive and full with thick eye lashes"
    ],
    [
        "Thin, lean, slender, long or short, disproportionate",
        "Good looking, delicately shaped",
        "Well formed, proportionate, compact, glossy body"
    ],
    [
        "Unstable, stiff joints with crackling sounds",
        "Soft and loose Joints, muscles and limbs",
        "Strong, well hidden joints"
    ],
    [
        "Short/less/thin/cracked, stiff, dry, rough organs",
        "Coppery nails, eye palate, tongue, lips palm and soles",
        "Compact, firm and full grown organs, long arms, big and elevated chest"
    ],
    [
        "Dark, dry, cracked",
        "Soft, pink, copper coloured",
        "Full, thick, moist and oily"
    ],
    [
        "Small, crooked, easily cracked",
        "Moderate size, yellowish",
        "Strong, large, white"
    ],
    [
        "Inconsistent, varies between strong and weak",
        "Intense, cannot skip the meal",
        "Regular eating habit and likes, slow food intake"
    ],
    [
        "Irregular diet habits and likes",
        "Eats too often and too much",
        "Regular eating habits and likes, slow food intake"
    ],
    [
        "Sweet, salt and sour",
        "Sweet, bitter and astringent",
        "Pungent, astringent and bitter"
    ],
    [
        "Variable",
        "Excessive and intense",
        "Less"
    ],
    [
        "Constipated bowel",
        "Loose stools, excessive sweating and urination",
        "Normal steady evacuation"
    ],
    [
        "Lesser quantity of strength and procreation",
        "Insufficiency of semen, sexual desire and procreation",
        "Great vigour, sexual prowess, desire in tastes"
    ],
    [
        "Interrupted and less shallow, eyes half open during sleep",
        "Moderate/sound",
        "Excessive and deep sleep"
    ],
    [
        "Mild/variable",
        "Strong",
        "Very less"
    ]
];

let responses = {
    vata: 0,
    pitta: 0,
    kapha: 0
};

let currentQuestion = 0;
const totalQuestions = questions.length;

const quizContainer = document.getElementById("quiz");
const submitButton = document.getElementById("submit");
const resultContainer = document.getElementById("result");

function displayQuestion() {
    const question = questions[currentQuestion];
    const optionList = options[currentQuestion].map((option, index) => {
        return `<li>
                    <input type="radio" name="answer" value="${index + 1}" id="option${index + 1}" class="answer">
                    <label for="option${index + 1}" id="option${index + 1}_text">${option}</label>
                </li>`;
    }).join('');

    const buttonText = currentQuestion === totalQuestions - 1 ? "Submit" : "Next";

    quizContainer.innerHTML = `<div class="quiz-header"><h2 id="question">${question}</h2><ul>${optionList}</ul><button id="submit">${buttonText}</button></div>`;

    // Add an event listener to the new submit button
    const newSubmitButton = document.getElementById("submit");
    newSubmitButton.addEventListener("click", submitAnswer);
}

function submitAnswer() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (selectedAnswer) {
        const answerValue = parseInt(selectedAnswer.value);
        if (answerValue === 1) {
            responses.vata++;
        } else if (answerValue === 2) {
            responses.pitta++;
        } else if (answerValue === 3) {
            responses.kapha++;
        }

        if (currentQuestion < totalQuestions - 1) {
            currentQuestion++;
            displayQuestion();
        } else {
            // All questions answered, show result
            quizContainer.innerHTML = "";
            submitButton.style.display = "none";
            const prakritiResult = determinePrakriti();
            resultContainer.innerHTML = `<h2>${prakritiResult}</h2>`;
        }
    }
}

function determinePrakriti() {
    const maxDosha = Math.max(responses.vata, responses.pitta, responses.kapha);
    let prakritiResult = "";
    if (maxDosha === responses.vata) {
        prakritiResult = "Vata";
        // return "Your dominant dosha is Vata.";
    } else if (maxDosha === responses.pitta) {
        prakritiResult = "Pitta";
        // return "Your dominant dosha is Pitta.";
    } else {
        prakritiResult = "Kapha";
        // return "Your dominant dosha is Kapha.";
    }

    // Redirect the user to the appropriate page based on their dosha
    window.location.href = `.\\Prakriti_Test\\Prakriti_Pages\\${prakritiResult}.html`;
    // window.location.href = `.\\prakriti check\\Prakriti_Test\\Prakriti_Pages\\${prakritiResult}.html`;
}


displayQuestion();
