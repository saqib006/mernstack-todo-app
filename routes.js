const express = require('express');
const router = express.Router();
const Todo = require('./models/todo');


router.get('/', (req, res)=>{
    Todo.find()
    .then(todo =>{
        res.json(todo)
    })
})


router.post('/', (req, res)=>{
    const newPost = new Todo({
        todo:req.body.todo,
        
    })
    newPost.save().then((item)=>{
        res.json(item)
    })
})

router.delete('/:id', (req, res)=>{
    Todo.findById(req.params.id)
    .then(item=>{
        item.remove().then(()=>{
            res.json({success:true})
        })
    }).catch(err => res.status(404).json({success:false}))
})

router.put("/", function (req, res) {
    const findById = { _id: req.body._id }
    const data = {todo: req.body.todo}
    
    //const update = { }
  //  const createdAt = {createdAt: new Date()}
    const query = Todo.update(findById, data);
    query.exec(callback);
    function callback(error, data) {
        if (error) {
            console.log("error", error);
            res.status(500).send({ error: error });
            return;
        }
        res.status(200).send({ todo: req.body });
    }
});
module.exports = router;
