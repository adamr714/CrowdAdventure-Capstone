const {User} = require('../models/users');
const mongoose = require('mongoose');

function verifyUser(userObject) {
    if (!userObject) {
        return 'No request body';
    }

    if (!('email' in userObject)) {
        return 'Missing field: email';
    }

    let {password, name, email} = userObject;

    if (typeof email !== 'string') {
        return 'Incorrect field type: email';
    }

   email = email.trim();

    if (email === '') {
        return 'Incorrect field length: email';
    }

    if (!(password)) {
        return 'Missing field: password';
    }

    if (typeof password !== 'string') {
        return 'Incorrect field type: password';
    }

    password = password.trim();

    if (password === '') {
        return 'Incorrect field length: password';
    }

    return null;
}

function UserService() {    
    this.create = function(userObject) {
        return new Promise(async (resolve,reject) => {
            let valid = verifyUser(userObject);
            if (valid != null) {
                reject(valid);
                return;
            }

            //.. Create the user
            let {password, name, email} = userObject;

            if (!this.isUserAvailable(email)) {
                reject("email already exists");
            }

            let hashPassword = await User.hashPassword(password);
            let newUser = await User
                .create({
                    password: hashPassword,
                    name: name,
                    email: email
                 });
                 
            resolve(newUser);
        });
    }
    this.isUserAvailable = function(email) {
        return new Promise(async (resolve,reject) => {
            let userCount = await User
                        .find({email: email})
                        .count()
                        .exec();
                if (userCount > 0) {
                    resolve(false);
                    return;
                } 
                resolve(true);
        });
    }
}

module.exports = new UserService();

