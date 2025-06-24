const Tweet = require('../models/Tweet');

exports.listTweets = async (req, res) => {
  try {
    const tweets = await Tweet.getAll();
    res.render('pages/index', { tweets });
  } catch (err) {
    console.error('Erro ao buscar tweets:', err);
    res.status(500).send('Erro ao buscar tweets');
  }
};

exports.tweetDetail = async (req, res) => {
  try {
    const tweet = await Tweet.getById(req.params.id);
    if (!tweet) {
      return res.status(404).send('Tweet não encontrado');
    }
    res.render('pages/tweet', { tweet });
  } catch (err) {
    console.error('Erro ao buscar tweet:', err);
    res.status(500).send('Erro ao buscar tweet');
  }
};
