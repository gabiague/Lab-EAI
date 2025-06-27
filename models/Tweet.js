const db = require('../config/db');

const Tweet = {
  async getAll() {
    const [rows] = await db.query('SELECT * FROM tweets_airline ORDER BY tweet_created DESC');
    return rows;
  },
  async getById(id) {
    // Use BIGINT para tweet_id!
    const [rows] = await db.query('SELECT * FROM tweets_airline WHERE tweet_id = ?', [id]);
    return rows[0] || null;
  }
};

module.exports = Tweet;
