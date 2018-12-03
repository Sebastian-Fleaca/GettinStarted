
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
const task_prova = {id: 123456,
                    numeroDomanda: 2,
                    question: 'diametro della Terra?',
                    type: 1,
                    answers: ['9.742 km',
                              '19.742 km',
                              '12.742 km'],
                    correctAnswer: '3',
                    studentAnswer: '1'};

const task_prova2 = task_prova;

var tasks = [task_prova, task_prova2];

//var tasks = null;

const exam_submission = { num: 42 };


/* Peer Review */

// Peer Review GET
app.get('/peerreview', async (req, res) => {
    try {
        if(tasks == null) {
            await res.status(200).send("Al momento non ci sono peer review.");
        }
        else {
            await res.status(200).json(tasks);
        }
    }
    catch (error) {
        res.status();
        console.log(res.status(error) + "\n");
    }
});

// Peer Review POST
app.post('/peerreview', async (req, res) => {
    var id_new = await req.body.id;     // just an example
    var user = await req.header.user_id;    // header field
    var numeroDomanda_new = await req.body.numeroDomanda;
    var question_new = await req.body.question;
    var type_new = await req.body.type;
    var answers_new = await req.body.answers;
    var correctAnswer_new = await req.body.correctAnswer;
    var studentAnswer_new = await req.body.studentAnswer; 
    var task_inserita = await { id:id_new,
                            numeroDomanda:numeroDomanda_new,
                            question:question_new,
                            type:type_new,
                            answers:answers_new,
                            correctAnswer:correctAnswer_new,
                            studentAnswer:studentAnswer_new
                        };
    try {
        if(numeroDomanda_new === task_prova.numeroDomanda){
            res.status(409).send("Esiste gia' una domanda con ID: "
                                + task_prova.id);
        }
        else if(/*!*/(res.body instanceof Object)){
            res.status(400);
        }
        else {
            tasks.push(task_inserita);
            res.status(201).json(task_inserita);
            console.log(task_inserita + "\n");
        }
    }
    catch (error) {
        res.status();
        console.log(res.status() + "\n");
    }
})

// Peer Review PUT
app.put('/peerreview/:id', async (req, res) => {
    try {
        const index = await tasks.findIndex((item) => {
            if(item.id===parseInt(req.params.id)){
                return item;
            }
        });
        res.status(200).json(tasks[index]);
        console.log(tasks[index] + "\n");
    }
    catch (error) {
        res.status();
        console.log(res.status() + "\n");
    }
})


/* Submissions */

// DA ELIMINARE
/*
app.get('/submissions', async (req, res) => {
    res.status(200).json(exam_submission);
});
*/

// Submission POST
app.post('/submissions', async (req, res) => {
    var submission = await exam_submission.num;
    res.status(201).json(submission);
});

module.exports = SERVER;
