const Player = require('../models/player.model');

class PlayerController {
    async addPlayer(req, res) {
        try {
            const { name, highScore, gamesPlayed } = req.body;
            if (!name) {
                return res.status(400).json({ status: 'error', message: 'Name is required' });
            }
            const result = await Player.create(name, highScore, gamesPlayed);
            res.json(result);
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    }

    async getPlayer(req, res) {
        try {
            const { name } = req.params;
            const player = await Player.findByName(name);
            if (player) {
                res.json({ status: 'success', data: player });
            } else {
                res.status(404).json({ status: 'error', message: 'Player not found' });
            }
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    }

    async updateScore(req, res) {
        try {
            const { name, highScore, gamesPlayed } = req.body;
            if (!name || highScore === undefined || gamesPlayed === undefined) {
                return res.status(400).json({ status: 'error', message: 'Missing required fields' });
            }
            const result = await Player.updateScore(name, highScore, gamesPlayed);
            res.json(result);
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    }

    async getTopPlayers(req, res) {
        try {
            const limit = parseInt(req.query.limit) || 10;
            const players = await Player.getTopPlayers(limit);
            res.json({ status: 'success', data: players });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    }
}

module.exports = new PlayerController(); 