const router = require('express').Router();
const tags = require('../data/tags.json');

router.get('/:tag_id', (req, res) => {
  if (req.params.tag_id && isNaN(Number(req.params.tag_id))) {
    res.status(400).json({
      message: 'Invalid tag id'
    });

    return;
  }

  const tagId = Number(req.params.tag_id);
  const targetTag = tags.filter(t => t.id === tagId)[0];

  if (!targetTag) {
    res.status(400).json({
      message: 'tag id does not exist'
    });
  } else {
    res.json(targetTag);
  }
});

module.exports = router;
