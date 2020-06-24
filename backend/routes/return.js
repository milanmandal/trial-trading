const router = require('express').Router();
let Return = require('../models/stocklist.model');


router.route('/').get((req, res) => {
  Return.find()
    .then(stock => res.json(stock))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Return.findById(req.params.id)
    .then(stock => res.json(stock))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/addlist').post((req, res) => {
  const stock = req.body.stock;
  const RETURN = req.body.RETURN;
  const pic = req.body.pic;

  const newReturn = new Return({
    stock,
    RETURN,
    pic,
  });

  newReturn.save()
    .then(() => res.json('Data added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

/*router.route('/:id').get((req, res) => {
  Exercise.findById(req.params.id)
    .then(Return => res.json(Return))
    .catch(err => res.status(400).json('Error: ' + err));
});*/

module.exports = router;