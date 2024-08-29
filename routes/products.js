var express = require('express');
var router = express.Router();
const { addProduct, listProduct, deleteProductByID, DetailById, updateProduct, listProductInCart, search } = require('../controllers/productController');


router.get('/getProducts', async (req, res, next) => {
  try {
    const products = await listProduct();
    return res.status(200).json({ status: true, products: products });
  } catch (error) {
    console.log('Get list product error:', error);
    return res.status(500).json({ message: error.message });
  }
});

router.post('/listProductInCart', async (req, res, next) => {
  const { cart } = req.body
  // console.log('cart:',cart);
  try {
    const listProductsCart = await listProductInCart(cart)
    return res.status(200).json({ status: true, listProductsCart: listProductsCart });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post('/getDetailProduct/:_id', async (req, res, next) => {
  try {
    const { _id } = req.params
    const result = await DetailById(_id)
    console.log(result);
    if (result) {
      return res.status(200).json({ status: true, result: result })
    } else {
      return res.status(400).json({ message: 'Không có sản phẩm' })
    }
  } catch (error) {
    console.log('error:', error);
    return res.status(500).json({ message: error.message });
  }
})


router.post('/addProduct', async (req, res, next) => {
  try {
    const { image, name, price, size, origin, inventory } = req.body;
    console.log('price:', price);
    const result = await addProduct(image, name, price, size, origin, inventory);
    if (result) {
      return res.status(200).json({ status: true, result: result });
    } else {
      return res.status(400).json({ message: 'Add fall!' })
    }
  } catch (error) {
    console.log('Add error:', error);
    return res.status(500).json({ message: error.message });
  }
})


router.put('/:_id/deleteProduct', async (req, res, next) => {
  try {
    const { _id } = req.params;
    const deletedProduct = await deleteProductByID(_id);
    // console.log('deleteProduct', deletedProduct);
    if (deletedProduct) {
      return res.status(200).json({ message: 'Xóa thành công', deletedProduct: deletedProduct });
    } else {
      throw new Error('Xóa thất bại')
    }
  } catch (error) {
    console.log('Delete product error:', error);
    return res.status(500).json({ message: error.message });
  }
})

router.put('/updateProduct/:_id', async (req, res, next) => {
  try {
    const { _id } = req.params
    const { image, name, price, size, origin, inventory } = req.body
    const result = await updateProduct(_id, image, name, price, size, origin, inventory)
    if (result) {
      return res.status(200).json({ message: 'Cập nhật thông tin sản phẩm thành công', result: result, status: true })
    } else {
      throw new Error('Update Fail')
    }
  } catch (error) {
    console.log(error);
  }
})

router.post('/search', async (req, res, next) => {
  try {
    const { name } = req.body
    if (name) {
      console.log('name...:', name);
      const result = await search(name)
      console.log('result...:', result);
      if (result) {
        return res.status(200).json({ status: true, result: result })
      } else {
        throw new Error('Search Fail')
      }
    } else {
      return res.status(300).json({ status: true, result: [] })
    }
  } catch (error) {
    console.log(error.message);
  }
})


module.exports = router;