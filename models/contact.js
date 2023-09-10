const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const contactUs = new Schema({
  firstname: { type: String, required: true},
  lastname:{type: String},
  email: { type: String, required: true },
  message: { type: String, required: true },
  
});

module.exports = mongoose.model('contactUs', contactUs);