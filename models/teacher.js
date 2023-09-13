const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const teacherSchema = new Schema({
  
  fullname: {type: String,required: true},
  username: { type: String, required: true},
  email: { type: String, required: true },
  // phone: { type: Number, required: true},
  password: { type: String, required: true },
  courses : [
    {
        type: mongoose.ObjectId,
        ref: "courses",
    },
],
});


module.exports =  mongoose.model('teachers', teacherSchema);