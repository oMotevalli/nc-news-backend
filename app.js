const express = require('express');
const {
  getTopics,
  getAPI,
  getArticleByID,
  getArticles,
  editArticleVotes,
} = require('./controllers/articles.controllers');
const {
  handlePsqlErrors,
  handleCustomErrors,
  handleServerErrors,
} = require('./errors');
const {
  getComments,
  getCommentsByArticleID,
  addComment,
  deleteCommentByCommentId,
} = require('./controllers/comments.controllers');
const {
  getUsers,
  getUserByUserId,
} = require('./controllers/users.controllers');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/topics', getTopics);

app.get('/api/comments', getComments);

app.get('/api/users', getUsers);

app.get('/api/users/:username', getUserByUserId);

app.get('/api/', getAPI);

app.get('/api/articles/:article_id', getArticleByID);

app.get('/api/articles/:article_id/comments', getCommentsByArticleID);
app.get('/api/articles', getArticles);

app.post('/api/articles/:article_id/comments', addComment);

app.patch('/api/articles/:article_id', editArticleVotes);

app.delete('/api/comments/:comment_id', deleteCommentByCommentId);

app.all('*', (_, res) => {
  res.status(404).send({ msg: 'Not found' });
});

app.use(handlePsqlErrors);

app.use(handleCustomErrors);

app.use(handleServerErrors);

module.exports = app;
