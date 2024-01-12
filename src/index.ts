import { app } from './settings'

const port = 3000

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})






























/*import express from  'express'
export const app = express()
const port = 3000

const jsonBodyMiddleware = express.json();
app.use(jsonBodyMiddleware);

const db = {
    courses:[
        {id: 1, title: 'front-end'},
        {id: 2, title: 'back-end'},
        {id: 3, title: 'devops'},
        {id: 4, title: 'automation qa'}
    ]
}
app.get('/courses', (req, res) => {
    let foundCourses = db.courses;
    if(req.query.title){
     foundCourses = foundCourses
         .filter(c => c.title.indexOf(req.query.title as string) > -1)
    }
    res
        .status(200)
        .json(foundCourses)
})
app.get('/courses/:id', (req, res) => {
const foundCourses = db.courses.find(c => c.id === parseInt(req.params.id));
    if(!foundCourses){
        res.sendStatus(404);
        return;
    }

    res.json(foundCourses);
})
app.post('/courses', (req,res) => {
    if(!req.body.title){
        res.sendStatus(400);
        return;
    }
    const createdCourse = {
        id: +(new Date()),
        title: req.body.title
    };
    db.courses.push(createdCourse)
    res
        .status(201)
        .json(createdCourse)
})
app.delete('/courses/:id', (req, res) => {
    db.courses = db.courses.filter(c => c.id !== parseInt(req.params.id));
    res.sendStatus(204);
})
app.put('/courses/:id', (req, res) => {
    if(!req.body.title){
        res.sendStatus(404);
        return;
    }
    const foundCourses = db.courses.find(c => c.id === parseInt(req.params.id));
    if(!foundCourses){
        res.sendStatus(404);
        return;
    }
    foundCourses.title = req.body.title;
    res.json(foundCourses);
})

app.delete('/__test__/data', (req, res) => {
    db.courses =[];
    res.sendStatus(204);
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})*/
