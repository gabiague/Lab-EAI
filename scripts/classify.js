const readlineSync = require('readline-sync');
const Model = require('../models/Model');
const db = require('../config/db');

async function classifyAndRegister() {
  try {
    // 1. Solicita o texto ao utilizador
    const text = readlineSync.question('Digite o tweet a ser classificado: ');

    // 2. Obtém o id do último modelo treinado
    const modelId = await Model.getLastModelId();

    // 3. Classifica o texto e obtém a confiança
    const { predictedSentiment, confidenceScore } = Model.classifyWithConfidence(text);

    // 4. Insere na tabela classification_results (sem tweet_id)
    const [result] = await db.query(
      `INSERT INTO classification_results
        (model_id, predicted_sentiment, confidence_score, classification_date)
       VALUES (?, ?, ?, ?)`,
      [modelId, predictedSentiment, confidenceScore, new Date()]
    );
    const resultId = result.insertId;

    // 5. Mostra o resultado ao utilizador
    console.log(`Classificação: ${predictedSentiment}`);
    console.log(`Confiança: ${confidenceScore}`);
    console.log(`result_id: ${resultId}`);
    process.exit();
  } catch (err) {
    console.error('Erro ao classificar e registrar:', err);
    process.exit(1);
  }
}

classifyAndRegister();
