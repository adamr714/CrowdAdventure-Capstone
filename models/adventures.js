const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const adventureSchema = mongoose.Schema({
    createdBy : {type: String, required: false},
    projectTitle : {type: String, required: false}, 
    category : {type: String, required: false},
    phase : {type: String, required: false},
    shortDescription : {type: String, required: false},
    longDescription : {type: String, required: false},
    rewards : [{
        title : {type: String, required: false},
        amount : {type: Number, required: false},
        descripton : {type: String, require: false}
    }],    
    fundingGoal : {type: Number, required: false},
    image : {type: String, required: false},
    startDate : {type: Date, required: false},
    endDate : {type: Date, required: false}
});

const Adventures = mongoose.model('Adventures', adventureSchema, 'adventures');

module.exports = {Adventures};


