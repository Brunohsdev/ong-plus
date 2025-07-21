const advancedResults = (model) => async (req, res, next) => {
  try {
    const results = await model.find();
    res.advancedResults = results;
    next();
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

module.exports = advancedResults;
