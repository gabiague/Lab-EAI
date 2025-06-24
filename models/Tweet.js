const db = require('../config/db');

class Tweet {
  static async getAll(limit = 100) {
    const [rows] = await db.query(`SELECT * FROM tweets_airline LIMIT ?`, [limit]);
    return rows;
  }

  static async getById(tweet_id) {
    const [rows] = await db.query('SELECT * FROM tweets_airline WHERE tweet_id = ?', [tweet_id]);
    return rows[0];
  }
}

module.exports = Tweet;
