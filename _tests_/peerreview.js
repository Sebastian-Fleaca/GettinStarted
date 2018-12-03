//const SERVER = require('./server');
const app = require('./server');

const task_prova = {  id: 123456,
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

app.get('/peerreview', async (req, res) => {
    res.status(200).send(tasks);
});

app.post('/peerreview', async (req, res) => {
    var id_new = task_prova.id;     // just an example
    var numeroDomanda_new = req.body.numeroDomanda;
    var question_new = req.body.question;
    var type_new = await req.body.type;
    var answers_new = await req.body.answers;
    var correctAnswer_new = await req.body.correctAnswer;
    var studentAnswer_new = await req.body.studentAnswer; 
    var task_inserita = { id:id_new,
                            numeroDomanda:numeroDomanda_new,
                            question:question_new,
                            type:type_new,
                            answers:answers_new,
                            correctAnswer:correctAnswer_new,
                            studentAnswer:studentAnswer_new
                          }
    tasks.push(task_inserita);
    res.status(201);
    res.json(task_inserita);
    console.log(task_inserita);
})

app.put('/peerreview/:id', async (req, res) => {
    try {
        const index = await tasks.findIndex((item) => {
            return item.id===req.params.id
        });
        res.status(200);
    }
    catch (error) {
        res.status();
    }
})

//module.exports = SERVER;