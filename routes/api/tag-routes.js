const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try{
    const myData = await Tag.findAll(req.param.id,{
      include:[{model: Product, attributes: 'product_name'}]
    });
    res.status(200).json(myData);
  }catch (err){
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try{
    const myData = await Tag.findOne({
      where: { 
        id: req.params.id
      }, 
        include: [{model: Product, attributes: 'category_id'}]
    });
   
    if(!myData){
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(myData);
  }catch (err){
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try{
    const myData = await Tag.create({tag_name :req.body.tag_name});
    res.status(200).json(myData);
  }catch (err){
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try{
    const myData = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
  });

    res.status(200).json(myData);
  }catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try{
    const myData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!myData) {
      res.status(404).json({message: 'No Tag found with this ID!'});
      return;
    }

    res.status(200).json(myData);
  }catch (err){
    res.status(500).json(err);
  }
});

module.exports = router;
