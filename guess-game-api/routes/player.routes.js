const express = require('express');
const router = express.Router();
const playerController = require('../controllers/player.controller');

router.post('/add', playerController.addPlayer);
router.get('/get/:name', playerController.getPlayer);
router.post('/updateScore', playerController.updateScore);
router.get('/topPlayers', playerController.getTopPlayers);

module.exports = router; 