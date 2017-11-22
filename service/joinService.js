const {Join} = require('../models/join');
const mongoose = require('mongoose');

function verifyJoin(joinObject) {
    if (!joinObject) {
        return 'No request body';
    }

    if (!('adventureID' in joinObject)) {
        return 'Missing field: Adventure';
    }

    if (!('userID' in joinObject)) {
        return 'Missing field: User';
    }

    if (!('rewardID' in joinObject)) {
        return 'Missing field: Reward';
    }
    
    return null;
}

function JoinService() {    
    this.create = function(joinObject) {
        return new Promise(async (resolve,reject) => {
            let valid = verifyJoin(joinObject);
            if (valid != null) {
                reject(valid);
                return;
            }

            //.. Create the Reward / User collection
            let {adventureID, userID, rewardID} = joinObject;

            if (!this.isARewardAvailable(adventureID, userID, rewardID)) {
                reject("Already backing this project");
            }

            let newRewards = await Join
                .create({
                    adventureID: adventureID,
                    userID: userID,
                    rewardID: rewardID
                 });
                 
            resolve(newRewards);
        });
    }

    this.isRewardAvailable = function(adventureID, userID, rewardID) {
        return new Promise(async (resolve,reject) => {
            let rewardCount = await Join
                        .find({$and:[{adventureID : adventureID}, {userID: userID}, {rewardID: rewardID}]}) 
                        .count()
                        .exec();
                if (rewardID > 0) {
                    resolve(false);
                    return;
                } 
                resolve(true);
        });
    }
}

module.exports = new JoinService();

