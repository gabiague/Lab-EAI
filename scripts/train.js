const Tweet = require('../models/Tweet');
const Model = require('../models/Model');

(async () => {
  const tweets = await Tweet.getAll(1000);
  await Model.train(tweets, 'Modelo Naive Bayes', 'NaiveBayes');
  // Para SVM, troque o nome e o tipo
  // await Model.train(tweets, 'Modelo SVM', 'SVM');
  process.exit();
})();
