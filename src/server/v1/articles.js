const router = require('express').Router();
const articles = require('../data/articles.json');
const comments = require('../data/comments.json');

router.get('/', (req, res) => {
  if (req.query.limit && isNaN(Number(req.query.limit))) {
    res.status(400).json({
      message: 'Invalid limit parameter'
    });

    return;
  }

  const limit = req.query.limit ? Number(req.query.limit) : 50;

  if (req.query.sort && req.query.sort !== 'asc' && req.query.sort !== 'dsc') {
    res.status(400).json({
      message: 'Invalid sort parameter'
    });

    return;
  }

  const sort = req.query.sort || 'asc';

  if (req.query.pageIndex && isNaN(Number(req.query.pageIndex))) {
    res.status(400).json({
      message: 'Invalid pageIndex parameter'
    });

    return;
  }

  const pageIndex = req.query.pageIndex ? Number(req.query.pageIndex) : 0;

  const posts = articles.slice();

  const totalPostCount = posts.length;

  if (sort === 'asc') {
    posts.sort((a, b) => {
      return new Date(a.created_at) - new Date(b.created_at);
    });
  } else {
    posts.sort((a, b) => {
      return new Date(b.created_at) - new Date(a.created_at);
    });
  }

  res.status(200).json({
    page_index: pageIndex,
    total_post_count: totalPostCount,
    posts: posts.slice(limit * pageIndex, limit * (pageIndex + 1)).map(p => {
      return {
        by: p.by,
        comments_count: p.comments.length,
        id: p.id,
        created_at: p.created_at,
        tags: p.tags,
        title: p.title,
        thumbnail_image_url: p.thumbnail_image_url
      };
    })
  });
});

router.get('/:article_id', (req, res) => {
  const articleId = Number(req.params.article_id);

  if (isNaN(articleId)) {
    res.status(400).json({
      message: 'Invalid article id'
    });

    return;
  }

  const targetArticle = articles.filter(a => a.id === articleId)[0];

  if (!targetArticle) {
    res.status(400).json({
      message: 'article id not found'
    });
  } else {
    res.json(targetArticle);
  }
});

router.delete('/:article_id', (req, res) => {
  const articleId = Number(req.params.article_id);

  if (isNaN(articleId)) {
    res.status(400).json({
      message: 'Invalid article id'
    });

    return;
  }

  const targetArticle = articles.filter(a => a.id === articleId)[0];

  if (!targetArticle) {
    res.status(400).json({
      message: 'article id not found'
    });
  } else {
    const articleIndex = articles.indexOf(targetArticle);

    articles.splice(articleIndex, 1);

    res.json({
      result: 'ok'
    });
  }
});

router.get('/:article_id/comments', (req, res) => {
  const articleId = Number(req.params.article_id);

  if (isNaN(articleId)) {
    res.status(400).json({
      message: 'Invalid article id'
    });

    return;
  }

  const targetArticle = articles.filter(a => a.id === articleId)[0];
  const commentIds = targetArticle.comments;
  const commentsCopy = comments.slice();

  res.json(commentsCopy.filter(c => commentIds.indexOf(c.id) !== -1));
});

module.exports = router;
