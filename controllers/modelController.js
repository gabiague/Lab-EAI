const Model = require('../models/Model');
const db = require('../config/db');

exports.dashboard = async (req, res) => {
  try {
    // Lista modelos treinados
    const models = await Model.listTrainedModels();
    // Lista últimos resultados de classificação
    const [results] = await db.query(`
      SELECT r.*, m.model_name 
      FROM classification_results r
      JOIN classification_models m ON r.model_id = m.id
      ORDER BY r.classification_date DESC
      LIMIT 20
    `);
    res.render('pages/dashboard', { models, results });
  } catch (err) {
    res.status(500).send('Erro ao carregar dashboard');
  }
};
