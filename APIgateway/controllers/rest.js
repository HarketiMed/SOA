const { getRecommendations } = require('../services/grpcClient');

async function recommendMovies(req, res) {
  try {
    const genre = req.query.genre;
    if (!genre) throw new Error('Genre parameter is required');
    
    const movies = await getRecommendations(genre);
    res.json({ movies });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { recommendMovies };