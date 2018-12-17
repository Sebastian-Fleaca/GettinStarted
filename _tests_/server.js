
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

const SERVER = app.listen(PORT, () =>
    console.log('GitWizards\' API\'s listening on port'
        + PORT));

/*
RENDER PAGE AND PASS DATA TO IT
res.status(200).render('pagina.ejs', {data: data});
*/

/* Example variables */
var peerrev_prova = {
    id: 0,
    examid: 234,
    task: {
        'application/json': {
            id: 123,
            numeroDomanda: 2,
            question: 'diametro della Terra?',
            type: 1,
            answers: [
                '9.742 km',
                '19.742 km',
                '12.742 km'
            ]
        }
    },
    studentanswer: 3,
    mark: 30,
    description: 'The task is perfect as it is',
    deadline: 900
}

var peerrev_prova2 = peerrev_prova;
peerrev_prova2.id = 1;

var peerReviews = [peerrev_prova, peerrev_prova2];

//var tasks = null;

var exam_submission = { num: 42 };

var submissions = [exam_submission];


/* Peer Review */

// Peer Review GET
app.get('/peerreview', (req, res) => {
    try {
        if (peerReviews == null) {
            res.status(200).send("Al momento non ci sono peer review.");
        }
        else {
            res.status(200).json(peerReviews);
        }
    }
    catch (error) {
        res.status(400).end();      //AGGIUNGI END
        console.log("\n");
    }
});

/* POST method for Peer Review */
app.post('/peerreview', (req, res) => {
    var user = req.header.user_id;    // header field

    var new_id;
    if (peerReviews == null) { id_new = 0; }
    else { new_id = peerReviews.length; }

    let new_peerrev = {
        id: new_id,
        examid: req.body.examid,
        task: req.body.task,
        studentanswer: req.body.studentanswer,
        mark: req.body.mark,
        description: req.body.description,
        deadline: req.body.deadline
    };
    try {       //ATTENZIONE AL CHECK
        if (!(req.body instanceof Object) || Object.keys(req.body).length < 6) {
            res.status(400).end();
        }
        else {
            peerReviews.push(new_peerrev);
            res.status(201).json(new_peerrev);
            console.log(new_peerrev + "\n");
        }
    }
    catch (error) {
        res.status().end();
        console.log("\n");
    }
})

/* PUT method for Peer Review */
app.put('/peerreview/:id', (req, res) => {
    try {
        const index = peerReviews.findIndex((item) => {
            if (item.id === parseInt(req.params.id)) {
                return item;
            }
        });
        var new_peerrev = {
            id: req.params.id,
            examid: req.body.examid,
            task: req.body.task,
            studentanswer: req.body.studentanswer,
            mark: req.body.mark,
            description: req.body.description,
            deadline: req.body.deadline
        };
        peerReviews[index] = new_peerrev;
        res.status(200).json(peerReviews[index]);
        console.log(peerReviews[index] + "\n");
    }
    catch (error) {
        res.status().end();
        console.log("\n");
    }
})


/* Submissions */

/* GET method for Submission */
// DA ELIMINARE
app.get('/submission', (req, res) => {
    res.status(200).json(exam_submission);
});


/* POST method for Submission */
app.post('/submission', (req, res) => {
    let new_submission = {
        id: req.body.id,
        example: req.body.example,
        description: req.body.description,
        deadline: req.body.deadline,
        numerotasks: req.body.numerotasks,
        teacher: req.body.teacher,
        tasks: req.body.tasks,
        students: req.body.students
    };
    peerReviews.push(new_submission);
    res.status(201).json(submissions);
});

module.exports = SERVER;
