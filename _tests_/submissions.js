//const SERVER = require('./server');
const app = require('./server');

const exam_submission = { num: 42 };

app.get('/submissions', (req, res) => {
    res.json(exam_submission);
    res.status(200);
});


app.post('/submissions', (req, res) => {
    const submission = req.exam_submission;
    res.status(201);
    res.json(exam_submission);
});

/*
//testo esempio
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
//module.exports = SERVER;