var express = require('express');
var router = express.Router();

const UserRepository = require('../repository/user');

/* GET users listing. */
router.get('/', async (req, res, next) => {
  res.send('respond with a resource');
});

router.get('/users', async (req, res) => {
  const data = await UserRepository.getUsers();
  console.log(`${JSON.stringify(data)}`);
  res.send(`${JSON.stringify(data)}`);
});

router.put('/user', async (req, res) => {
  console.log(req.body);
  await UserRepository.createUser(req.body.user).then(data => res.json(data));
});

module.exports = router;
