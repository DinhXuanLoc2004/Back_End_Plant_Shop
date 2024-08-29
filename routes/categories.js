var express = require('express');
var router = express.Router();
const { listCategory, addCategory, updateCategory, deleteCategoryByID } = require('../controllers/categoryController');


//listCategory
//get
//http://localhost:3000/categorys/
router.get('/', async (req, res, next) => {
    try {
      const categorys = await listCategory();
      if (categorys.length === 0) {
        return res.status(200).json({ message: 'Không có loại nào.' });
      }
      return res.json({ categorys });
    } catch (error) {
      console.log('Get list category error:', error);
      return res.status(500).json({ message: error.message });
    }
  });

//add category
//post
//http://localhost:3000/categorys/addCategory
router.post('/addCategory', async (req, res, next) => {
    try {
      const { name, description } = req.body;
  
      const result = await addCategory(name, description);
  
      if (result) {
        return res.json({ result });
      } else {
        return res.status(400).json({ message: 'Add fall!' })
      }
    } catch (error) {
      console.log('Add error:', error);
      return res.status(500).json({ status: 1,message: error.message });
    }
  })

  //update
//put
//http://localhost:3000/categorys/id/update
router.put('/:id/update', async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, description } = req.body;
      const result = await updateCategory(id, name, description);
      if (result) {
        return res.status(200).json({message: 'Cập nhật sản phẩm thành công'})
      } else {
        throw new Error ('Update fail!')
      }
    } catch (error) {
      console.log('Update error:', error);
      return res.status(500).json({ message: error.message });
    }
  })

//delete
//delete
//http://localhost:3000/categorys/delete
  router.delete('/delete', async (req, res, next) => {
    try {
      const { _id } = req.body;
      const deletedCategory = await deleteCategoryByID(_id);
    } catch (error) {
      console.log('Delete category error:', error);
      return res.status(500).json({ message: error.message });
    }
  })

module.exports = router;