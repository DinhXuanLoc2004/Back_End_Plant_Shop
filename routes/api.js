var express = require('express');
var ApiRouter = express.Router();

// code từ đây 
/**
 * cần xác định :
 * 1. Method
 * 2. Url
 */
ApiRouter.get('/get', async (req, res, next) => {
    try {
        const chao = "chao tui bay"
        const sv = {
            mssv: 'PS32696',
            name: 'Dinh Xuan Loc'
        }
        res.status(200).json({ chao, sv })
    } catch (error) {
        console.log(error.Message);
        res.status(500).json({ Message: 'Co loi!' })
    }
})

ApiRouter.get('/getTraiCay', async (req, res, next) => {
    try {
        const {id, status} = req.query
        console.log(id, status);

        const tc = Arrtraicay.find(item => item.status == status)

        if (tc) {
            return res.status(200).json({ tc })
        } else {
            return res.status(400).json({ Message: 'Loi',Arrtraicay })
        } 
        
        
    } catch (error) {
        console.log(error.Message);
        return res.status(500).json({ Message: 'loi' })
    }
})
// đến đây
module.exports = ApiRouter;

var Arrtraicay = [{
    "_id": 1,
    "name": "Táo Mỹ Tho",
    "quantity": 100,
    "price": 5000,
    "status": 1
},
{
    "_id": 2,
    "name": "Hoa Hong DaLat",
    "quantity": 200,
    "price": 15000,
    "status": 0
},
{
    "_id": 3,
    "name": "Thanh long",
    "quantity": 100,
    "price": 35000,
    "status": 1
},
{
    "_id": 4,
    "name": "Thanh long",
    "quantity": 100,
    "price": 35000,
    "status": 1
},
{
    "_id": 5,
    "name": "Thanh long",
    "quantity": 100,
    "price": 35000,
    "status": 1
},
{
    "_id": 6,
    "name": "Thanh long",
    "quantity": 100,
    "price": 35000,
    "status": 1
}]