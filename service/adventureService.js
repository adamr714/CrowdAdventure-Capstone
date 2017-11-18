const {Adventures} = require('../models/adventures');
const mongoose = require('mongoose');

function verifyAdventure(adventureObject) {
    if (!adventureObject) {
        return 'No request body';
    }

    if (!('projectTitle' in adventureObject)) {
        return 'Missing field: Title';
    }

    if (!('category' in adventureObject)) {
        return 'Missing field: Category';
    }

    if (!('phase' in adventureObject)) {
        return 'Missing field: Phase';
    }

    if (!('shortDescription' in adventureObject)) {
        return 'Missing field: Short Description';
    }

    if (!('fundingGoal' in adventureObject)) {
        return 'Missing field: Long Description';
    }

    if (!('longDescription' in adventureObject)) {
        return 'Missing field: Funding Goal';
    }
 
    if (!('image' in adventureObject)) {
        return 'Missing field: image';
    }

    if (!('startDate' in adventureObject)) {
        return 'Missing field: Starting Date';
    }

    if (!('endDate' in adventureObject)) {
        return 'Missing field: Ending Date';
    }
    
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
            let {createdBy, projectTitle, category, phase, shortDescription, longDescription, rewards, fundingGoal,image, startDate, endDate} = adventureObject;

            if (!this.isAdventureAvailable(projectTitle)) {
                reject("Adventure already exists");
            }

            let newAdventure = await Adventures
                .create({
                    createdBy: createdBy, 
                    projectTitle: projectTitle, 
                    category: category, 
                    phase: phase, 
                    shortDescription: shortDescription, 
                    longDescription: longDescription, 
                    rewards: rewards, 
                    fundingGoal: fundingGoal,
                    image: image,
                    startDate: startDate,
                    endDate: endDate
    
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

