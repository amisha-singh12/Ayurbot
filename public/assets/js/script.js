document.getElementById('quizForm').addEventListener('submit', function(e) {
    // Client-side validation
    const unanswered = document.querySelectorAll('.question:not(:has(input:checked))');
    if (unanswered.length > 0) {
        e.preventDefault();
        alert('Please answer all questions before submitting!');
    }
});