const express = require('express');
var bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

//const SOME_NUM = process.env.def || 40;

const SERVER = app.listen(PORT, () => console.log('Example app listening on port'
                                                   + PORT/*, SOME_NUM*/));

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
//     next();
// });

const exam_submission = { num: 4 };

app.get('/submissions', async (req, res) =>{
    try{
        res.json(exam_submission);
        res.status(200);        
    }catch(err){

    }
});

app.post('/submissions', async (req, res) => {
    const submission = await req.exam_submission;
    res.json(submission);
    res.status(201);
});

//testo esempio
/*
app.post('/courses', (req, res) => {
    const course_name = req.body.name
    const new_id = course_name.replace(/\s/g, '')
    const new_course =  {id:new_id, name:course_name}
    courses_offered.push(new_course)
    res.status(201)
    res.json(new_course)
    console.log(courses_offered)
})

//testo esempio
app.post('/students', (req, res) => {
    const url_parameters = req.query
    console.log(url_parameters)
    res.status(201)
    res.json({status: 'done'})
})
*/

module.exports = SERVER;