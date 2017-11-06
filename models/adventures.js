const mongoose = required('mongoose');

const postSchema = mongoose.Schema({
    projectTitle : {type: String, required: true}, 
    category : {type: String, required: true},
    phase : {type: String, required: true},
    shortDescription : {type: String, required: true},
    longDescription : {type: String, required: true},
    rewards : [{
        title : {type: String},
        amount : {type: Number},
        descripton : {type: String}
    }],    
    fundingGoal : {type: Number, required: true}
});

const Adventures = mongoose.model('adventures', postSchema, 'adventures');
module.exports = {Adventures};


