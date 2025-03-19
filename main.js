function FinalCalculate() {
    const name = document.getElementById('name').value;
    const section = document.getElementById('section').value;
    const date = document.getElementById('date').value;

    if (!name || !section || !date) {
        alert('Please fill in all fields (Name, Section, Date).');
        return;
    }

    const categories = [
        { id: 'quiz', weight: 0.10, maxPercent: 100 },
        { id: 'recitation', weight: 0.15, maxPercent: 100 },
        { id: 'longtest', weight: 0.15, maxPercent: 100 },
        { id: 'project', weight: 0.35, maxPercent: 100 },
        { id: 'attendance', weight: 0.05, maxPercent: 100 },
        { id: 'exam', weight: 0.20, maxPercent: 100 }
    ];

    let totalGrade = 0;
    let validInput = true;

    categories.forEach(cat => {
        const score = parseFloat(document.getElementById(`${cat.id}-score`).value);

        if (isNaN(score) || score < 0 || score > 100) {
            validInput = false;
            document.getElementById(`${cat.id}-grade`).innerText = 'Invalid';
        } else {
            const grade = (score / cat.maxPercent) * 100; 
            document.getElementById(`${cat.id}-grade`).innerText = grade.toFixed(2) + '%';
            totalGrade += grade * cat.weight;
        }
    });

    if (validInput) {
        document.getElementById('final-grade').innerText = totalGrade.toFixed(2) + '%';

        // Display final message
        const finalMessage = `
            <strong>Name:</strong> ${name} <br>
            <strong>Section:</strong> ${section} <br>
            <strong>Date:</strong> ${date} <br>
            <strong>Final Grade:</strong> ${totalGrade.toFixed(2)}% <br>
        `;
        document.getElementById('final-message').innerHTML = finalMessage;

        // Remarks and Sound based on the final grade
        let remarks = '';
        let audioElement = null;

        if (totalGrade >= 95 && totalGrade <= 100) {
            remarks = "Sigma level performance! You nailed it!";
            audioElement = document.getElementById('sigma-song');
        } else if (totalGrade >= 90 && totalGrade < 95) {
            remarks = "Congratulations! You did great!";
            audioElement = document.getElementById('congrats-song');
        } else if (totalGrade >= 80 && totalGrade < 90) {
            remarks = "You're doing well, but there's room for improvement.";
            audioElement = document.getElementById('happy-song');
        } else if (totalGrade >= 75 && totalGrade < 80) {
            remarks = "Keep pushing, you're almost there!";
            audioElement = document.getElementById('little-happy');
        } else if (totalGrade >= 60 && totalGrade < 75) {
            remarks = "You need to improve, don't give up!";
            audioElement = document.getElementById('sad-song');
        } else {
            remarks = "Unfortunately, your grade is below expectations.";
            audioElement = document.getElementById('sad-song');
        }

        document.getElementById('remarks').innerText = remarks;

        // Play the sound based on the grade range
        if (audioElement) {
            audioElement.play();
        }

        document.getElementById('message-box').style.display = 'block';
    } else {
        document.getElementById('warning-msg').style.display = 'block';
    }
}
