const db = require('../config/db.config');

class Player {
    static async create(name, highScore = 0, gamesPlayed = 0) {
        try {
            const [result] = await db.execute(
                'INSERT INTO players (name, high_score, games_played) VALUES (?, ?, ?)',
                [name, highScore, gamesPlayed]
            );
            return { status: 'success', message: 'Player created successfully' };
        } catch (error) {
            throw new Error('Error creating player: ' + error.message);
        }
    }

    static async findByName(name) {
        try {
            const [rows] = await db.execute(
                'SELECT * FROM players WHERE name = ?',
                [name]
            );
            return rows[0];
        } catch (error) {
            throw new Error('Error finding player: ' + error.message);
        }
    }

    static async updateScore(name, highScore, gamesPlayed) {
        try {
            const [result] = await db.execute(
                'UPDATE players SET high_score = ?, games_played = ? WHERE name = ? AND high_score < ?',
                [highScore, gamesPlayed, name, highScore]
            );
            return {
                status: 'success',
                message: 'Score updated successfully',
                updated: result.affectedRows > 0
            };
        } catch (error) {
            throw new Error('Error updating score: ' + error.message);
        }
    }

    static async getTopPlayers(limit = 10) {
        try {
            const [rows] = await db.execute(
                'SELECT * FROM players ORDER BY high_score DESC, games_played ASC LIMIT ?',
                [limit]
            );
            return rows;
        } catch (error) {
            throw new Error('Error getting top players: ' + error.message);
        }
    }
}

module.exports = Player; 