const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const joinSchema = mongoose.Schema({
    adventureID :  {type: String, required: true},
    userID: {type: String, required: true},
    rewardID: {type: String, required: true}
});

const Join = mongoose.model('Joins', joinSchema, 'joins');

module.exports = {Join};


