const readlineSync = require('readline-sync');
const db = require('../config/db');

async function feedback() {
  const resultId = readlineSync.questionInt('Digite o result_id da classificação para feedback: ');
  const correctSentiment = readlineSync.question('Classe correta (positive, negative, neutral): ');
  await db.query(
    `INSERT INTO feedback
      (result_id, correct_sentiment, feedback_date, processed)
     VALUES (?, ?, ?, 0)`,
    [resultId, correctSentiment, new Date()]
  );
  console.log('Feedback registrado! Execute o treino novamente para atualizar o modelo.');
  process.exit();
}

feedback();
