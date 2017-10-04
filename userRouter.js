const express = require('express');
const jsonParser = require('body-parser').json();
const authenticationService = require('./service/authenticationService'); 
const {User} = require('./models/users');
const UserService = require('./service/userService');
const router = express.Router();

router.use(jsonParser);
authenticationService.initialize(router);



router.get('/profile', authenticationService.loginRequired, async (req,res) => {
  res.status(200).json({message: "WOO HOO YOU ARE AUTHORIZED!!!!"}); 
})


router.post('/register', async (req, res) => {
  try {
    let userAvailable = await UserService.isUserAvailable(req.body.email); 

      if (!userAvailable) { 
        res.status(400).json({message: "User name isn't available"}); 
        return; 
      }

    let user = await UserService.create(req.body);
    res.status(201).json({message: 'Created'});

  } catch (err) {
    res.status(500).json({message: err});
  }
});

router.get('/available/:username', async (req, res) => {
  try {
    let userAvailable = await UserService.isUserAvailable(req.params.username);
    res.status(200).json(userAvailable);
  } catch (err) {
    res.status(500).json({message: err});
  }
});

router.post('/login', authenticationService.loginRequired, (req,res) => {
    return res.status(200).json({message: 'ok'});
});


router.post('/', (req, res) => {
  if (!req.body) {
    return res.status(400).json({message: 'No request body'});
  }

  if (!('username' in req.body)) {
    return res.status(422).json({message: 'Missing field: username'});
  }

  if (typeof username !== 'string') {
    return res.status(422).json({message: 'Incorrect field type: username'});
  }

  username = username.trim();

  if (username === '') {
    return res.status(422).json({message: 'Incorrect field length: username'});
  }

  if (!(password)) {
    return res.status(422).json({message: 'Missing field: password'});
  }

  if (typeof password !== 'string') {
    return res.status(422).json({message: 'Incorrect field type: password'});
  }

  password = password.trim();

  if (password === '') {
    return res.status(422).json({message: 'Incorrect field length: password'});
  }

  // check for existing user
  return User
    .find({username})
    .count()
    .exec()
    .then(count => {
      if (count > 0) {
        return res.status(422).json({message: 'username already taken'});
      }
      // if no existing user, hash password
      return User.hashPassword(password)
    })
    .then(hash => {
      return User
        .create({
          username: username,
          password: hash,
          firstName: firstName,
          lastName: lastName,
          reference: reference
        })
    })


    .then(user => {
      return res.status(201).json(user.apiRepr());
    })
    .catch(err => {
      console.error('Internal server error:' + err);
      res.status(500).json({message: 'Internal server error'})
    });
});


module.exports = router;
