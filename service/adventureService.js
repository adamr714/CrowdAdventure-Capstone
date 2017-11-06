const {Adventures} = require('../models/adventures');
const mongoose = require('mongoose');

function verifyAdventure(adventureObject) {
    if (!userObject) {
        return 'No request body';
    }

    if (!('projectTitle' in userObject)) {
        return 'Missing field: Title';
    }

    if (!('category' in userObject)) {
        return 'Missing field: Category';
    }

    if (!('phase' in userObject)) {
        return 'Missing field: Phase';
    }

    if (!('shortDescription' in userObject)) {
        return 'Missing field: Short Description';
    }

    if (!('fundingGoal' in userObject)) {
        return 'Missing field: Long Description';
    }

    if (!('longDescription' in userObject)) {
        return 'Missing field: Funding Goal';
    }
 
    let {projectTitle, category, phase, shortDescription, longDescription, rewards, fundingGoal} = adventureObject;

    return null;
}

function AdventureService() {    
    this.create = function(adventureObject) {
        return new Promise(async (resolve,reject) => {
            let valid = verifyAdventure(adventureObject);
            if (valid != null) {
                reject(valid);
                return;
            }

            //.. Create the adventure
            let {projectTitle, category, phase, shortDescription, longDescription, rewards, fundingGoal} = adventureObject;

            if (!this.isAdventureAvailable(projectTitle)) {
                reject("Adventure already exists");
            }

            let newAdventure = await Adventures
                .create({
                    projectTitle: projectTitle, 
                    category: category, 
                    phase: phase, 
                    shortDescription: shortDescription, 
                    longDescription: longDescription, 
                    rewards: rewards, 
                    fundingGoal: fundingGoal
                 });
                 
            resolve(newAdventure);
        });
    }
    this.isAdventureAvailable = function(projectTitle) {
        return new Promise(async (resolve,reject) => {
            let adventureCount = await Adventures
                        .find({projectTitle: projectTitle})
                        .count()
                        .exec();
                if (projectTitle > 0) {
                    resolve(false);
                    return;
                } 
                resolve(true);
        });
    }
}

module.exports = new AdventureService();

