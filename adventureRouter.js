const express = require('express');
const jsonParser = require('body-parser').json();
const authenticationService = require('./service/authenticationService'); 
const {Adventures} = require('./models/adventures');
const AdventureService = require('./service/adventureService');
const router = express.Router();

router.use(jsonParser);
authenticationService.initialize(router);

//Get
router.get('/', async (req, res) => {
  let data = await Adventures.find({}).exec();
  res.status(200).json(data);
});

router.get('/:projectTitle', async (req, res) => { 
  let data = await Adventures.findOne({projectTitle: req.params.projectTitle}).exec();
  res.status(200).json(data);
}); 

router.post('/join', authenticationService.loginRequired, jsonParser, async (req, res) => {
  
})

router.post('/create',authenticationService.loginRequired, jsonParser, async (req, res) =>  {
  try{
    req.body.createdBy = req.user.name;    
    let adventureAvailable = await AdventureService.isAdventureAvailable(req.body.projectTitle);

    if (!adventureAvailable) {
      res.status(400).json({message: "Adventure's name isn't available"}); 
      return; 
    }

    let adventure = await AdventureService.create(req.body);
    res.status(201).json({message : "Adventure Created!!!!"});

  } catch(err) {
    res.status(500).json({message: err});
  }
//
});


module.exports = router;
