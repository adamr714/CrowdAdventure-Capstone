const mongoose = required('mongoose');

const postSchema = mongoose.Schema({
    adveture : {type: String, required: true}, 
    author : {type: String, required: true}, 
    category : {type: String, required: true},
    short_description : {type: String, required: true},
    long_description : {type: String, required: true},
    rewards : {type: String, required: true},
});

const Adventures = mongoose.model('adventures', postSchema, 'adventures');
module.exports = {Adventures};