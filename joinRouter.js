const express = require('express');
const jsonParser = require('body-parser').json();
const authenticationService = require('./service/authenticationService'); 
const {Join} = require('./models/join');
const JoinService = require('./service/joinService'); 
const router = express.Router();

router.use(jsonParser);
authenticationService.initialize(router);

//Get
router.get('/', async (req, res) => {
  let data = await Join.find({}).exec();
  res.status(200).json(data);
});

router.post('/join',authenticationService.loginRequired, jsonParser, async (req, res) =>  {
  try{
    req.body.createdBy = req.user.name;    
    let rewardAvailable = await JoinService.isRewardAvailable(req.body.rewardID);

    if (!rewardAvailable) {
      res.status(400).json({message: "Reward isn't available"}); 
      return; 
    }

    let reward = await JoinService.create(req.body);
    res.status(201).json({message : "Reward Created!!!!"});

  } catch(err) {
    res.status(500).json({message: err});
  }
//
});

module.exports = router;
