const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    todo:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date, default:Date.now()
    },
});
module.exports = Todo = mongoose.model('todo', PostSchema);