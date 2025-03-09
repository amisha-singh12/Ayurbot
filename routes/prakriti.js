const express = require('express');
const router = express.Router();
const User = require('../models/User');
const PrakritiResult = require('../models/PrakritiResult');

// Middleware to check authentication
const requireAuth = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    next();
};

const questions = [
    {
        id: 1,
        text: "Your body frame is generally...",
        options: [
            { dosha: 'vata', text: "Thin and light" },
            { dosha: 'pitta', text: "Medium and proportionate" },
            { dosha: 'kapha', text: "Broad and sturdy" }
        ]
    },
    {
        id: 2,
        text: "Your skin tends to be...",
        options: [
            { dosha: 'vata', text: "Dry and cool" },
            { dosha: 'pitta', text: "Oily and warm" },
            { dosha: 'kapha', text: "Thick and moist" }
        ]
    },
];


router.get('/test', requireAuth, (req, res) => {
    res.render('prakriti_index', {
        user: req.session.user,
        questions: questions
    });
});


router.post('/test', requireAuth, async (req, res) => {
    try {
        const answers = req.body;
        const scores = { vata: 0, pitta: 0, kapha: 0 };


        Object.keys(answers).forEach(questionId => {
            const qId = parseInt(questionId);
            const selectedOption = parseInt(answers[questionId]);

            const question = questions.find(q => q.id === qId);
            if (question && question.options[selectedOption]) {
                scores[question.options[selectedOption].dosha]++;
            }
        });


        const maxScore = Math.max(...Object.values(scores));
        const dominantDosha = Object.keys(scores).find(
            key => scores[key] === maxScore
        );


        const result = new PrakritiResult({
            userId: req.session.user._id,
            scores: scores,
            dominantDosha: dominantDosha,
            testDate: new Date()
        });

        await result.save();

        // Redirect to result page
        res.redirect(`/result/${dominantDosha}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error processing results');
    }
});



router.get('/result/:dosha', requireAuth, (req, res) => {
    const allowedDoshas = ['vata', 'pitta', 'kapha'];
    const dosha = req.params.dosha.toLowerCase();

    if (!allowedDoshas.includes(dosha)) {
        return res.status(404).send('Invalid dosha type');
    }

    res.render(dosha, {
        user: req.session.user,
        dosha: dosha
    });
});



router.get('/history', requireAuth, async (req, res) => {
    try {
        const results = await PrakritiResult.find(
            { userId: req.session.user._id }
        ).sort({ testDate: -1 });

        res.render('history', {
            user: req.session.user,
            results: results
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving history');
    }
});

module.exports = router;
























// Prakriti Test Page
// router.get('/test', requireAuth, (req, res) => {
//     const questions = [
//         {
//             id: 1,
//             text: "Your body frame is generally...",
//             options: [
//                 { dosha: 'vata', text: "Thin and light" },
//                 { dosha: 'pitta', text: "Medium and proportionate" },
//                 { dosha: 'kapha', text: "Broad and sturdy" }
//             ]
//         },
//         {
//             id: 2,
//             text: "Your skin tends to be...",
//             options: [
//                 { dosha: 'vata', text: "Dry and cool" },
//                 { dosha: 'pitta', text: "Oily and warm" },
//                 { dosha: 'kapha', text: "Thick and moist" }
//             ]
//         },
//         // Add more questions following the same structure
//     ];

//     res.render('prakriti_index', {
//         user: req.session.user,
//         questions: questions
//     });
// });

// // Process Test Results
// router.post('/test', requireAuth, async (req, res) => {
//     try {
//         const answers = req.body;
//         const scores = { vata: 0, pitta: 0, kapha: 0 };

//         // Calculate scores (replace with your actual questions data)
//         Object.keys(answers).forEach(questionId => {
//             const selectedOption = parseInt(answers[questionId]);
//             const question = questions.find(q => q.id === parseInt(questionId));
//             if (question) {
//                 const doshaType = question.options[selectedOption].dosha;
//                 scores[doshaType]++;
//             }
//         });

//         // Determine dominant dosha
//         const maxScore = Math.max(...Object.values(scores));
//         const dominantDosha = Object.keys(scores).find(
//             key => scores[key] === maxScore
//         );

//         // Save result to database
//         const result = new PrakritiResult({
//             userId: req.session.user._id,
//             scores: scores,
//             dominantDosha: dominantDosha,
//             testDate: new Date()
//         });

//         await result.save();

//         // Redirect to result page
//         res.redirect(`/result/${dominantDosha}`);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Error processing results');
//     }
// });

// // Display Result
// router.get('/result/:dosha', requireAuth, (req, res) => {
//     const allowedDoshas = ['vata', 'pitta', 'kapha'];
//     const dosha = req.params.dosha.toLowerCase();

//     if (!allowedDoshas.includes(dosha)) {
//         return res.status(404).send('Invalid dosha type');
//     }

//     res.render(dosha, {
//         user: req.session.user,
//         dosha: dosha
//     });
// });

// // Previous Results
// router.get('/history', requireAuth, async (req, res) => {
//     try {
//         const results = await PrakritiResult.find(
//             { userId: req.session.user._id }
//         ).sort({ testDate: -1 });

//         res.render('history', {
//             user: req.session.user,
//             results: results
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Error retrieving history');
//     }
// });

// module.exports = router;
