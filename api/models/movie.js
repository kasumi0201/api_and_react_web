const mongoose = require('./base');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const CommentSchema = Schema({
  body: String
});
const person = {
  type: ObjectId,
  ref: 'Person'
};
const movieSchema = mongoose.Schema({
  title: String,
  yearReleased: Number,
  star: String,
  comments: [CommentSchema],
  director: { type: ObjectId, ref: 'Person' },
  cast: [{ actor: { type: ObjectId, ref: 'Person' } }],
  crew: [{ person: { type: ObjectId, role: String } }]
});
const Movie = mongoose.model.Movie || mongoose.model('Movie', movieSchema);
module.exports = Movie;
