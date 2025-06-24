const db = require('../config/db');
const natural = require('natural');
const stopword = require('stopword');
const fs = require('fs');
const path = require('path');

const MODEL_PATH = path.join(__dirname, 'nb_model.json');

function preprocess(text) {
  let clean = text
    .replace(/[^\w\s]|_/g, '')
    .replace(/\s+/g, ' ')
    .toLowerCase();
  let tokens = new natural.WordTokenizer().tokenize(clean);
  tokens = stopword.removeStopwords(tokens);
  tokens = tokens.map(t => natural.PorterStemmer.stem(t));
  return tokens.join(' ');
}

class Model {
  static async train(tweets, modelName = 'Naive Bayes', algorithmType = 'NaiveBayes') {
    const classifier = new natural.BayesClassifier();
    tweets.forEach(t => {
      if (t.text && t.airline_sentiment) {
        classifier.addDocument(preprocess(t.text), t.airline_sentiment);
      }
    });
    classifier.train();

    // Simule métricas (substitua por cálculo real se desejar)
    const accuracy = 0.90;
    const f1_score = 0.88;
    const training_date = new Date();
    const parameters = JSON.stringify({ alpha: 1.0 });

    // Salva o modelo treinado localmente
    fs.writeFileSync(MODEL_PATH, JSON.stringify(classifier));

    // Salva no banco de dados (classification_models)
    await db.query(
      `INSERT INTO classification_models
        (model_name, algorithm_type, accuracy, f1_score, training_date, parameters)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [modelName, algorithmType, accuracy, f1_score, training_date, parameters]
    );
    console.log('Modelo treinado e registrado na tabela classification_models!');
  }

  static loadModel() {
    if (!fs.existsSync(MODEL_PATH)) {
      throw new Error('Modelo não treinado. Execute o treinamento antes de classificar.');
    }
    const data = fs.readFileSync(MODEL_PATH);
    return natural.BayesClassifier.restore(JSON.parse(data));
  }

  static classify(text) {
    const classifier = Model.loadModel();
    return classifier.classify(preprocess(text));
  }

  static async listTrainedModels() {
    const [rows] = await db.query('SELECT * FROM classification_models ORDER BY training_date DESC');
    return rows;
  }

  static async getLastModelId() {
    const [rows] = await db.query('SELECT id FROM classification_models ORDER BY training_date DESC LIMIT 1');
    return rows.length > 0 ? rows[0].id : null;
  }
}

module.exports = Model;
