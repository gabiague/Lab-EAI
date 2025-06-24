const readlineSync = require('readline-sync');
const Model = require('../models/Model');
const db = require('../config/db');

async function classifyAndRegister() {
  const text = readlineSync.question('Digite o tweet a ser classificado: ');
  const predictedSentiment = Model.classify(text);
  const modelId = await Model.getLastModelId();
  const confidenceScore = null; // Pode ser null se não tiver
  const tweetId = null; // Se não for tweet do banco, deixe null

  // Insere em classification_results
  const [result] = await db.query(
    `INSERT INTO classification_results
      (tweet_id, model_id, predicted_sentiment, confidence_score, classification_date)
     VALUES (?, ?, ?, ?, ?)`,
    [tweetId, modelId, predictedSentiment, confidenceScore, new Date()]
  );
  const resultId = result.insertId;

  console.log(`Classificação: ${predictedSentiment} (result_id: ${resultId})`);
  process.exit();
}

classifyAndRegister();
