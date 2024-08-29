var express = require('express');
var Books = express.Router();

const Arr = () => {
    return ArrBooksNotDelete = ArrBooks.filter((item) =>
            !('statusDelete' in item) ||
            item.statusDelete === false)
}

Books.get('/:sub', async (req, res, next) => {
    try {
        const ArrBooksNotDelete = Arr()
        console.log(ArrBooksNotDelete);
        const { sub } = req.params
        const { id, name } = req.query
        console.log(sub);
        const book = ArrBooksNotDelete.find(item => item.id == id)
        switch (sub) {
            case 'detail':
                if (id) {
                    if (book) {
                        return res.status(200).json({ Boodetail: book })

                    } else {
                        return res.status(500).json({ Message: 'Không tìm thấy id', ArrBooksNotDelete })
                    }
                } else {
                    return res.status(500).json({ Message: 'Chưa nhập id' })
                }
                break;

            case 'search':
                if (name) {
                    const ArrSearchName = ArrBooksNotDelete.filter((item) => item.name.toLowerCase().includes(name.toLowerCase()))
                    if (ArrSearchName) {
                        return res.status(500).json({ ArrSearchName })
                    } else {
                        return res.status(505).json({ Message: 'Tên sách không có trong danh sách' })
                    }
                } else {
                    return res.status(500).json({ Message: 'Chưa nhập tên sách' })
                }
                break;

            case 'getBooks':
                return res.status(200).json({ ArrBooksNotDelete })
                break;
            default:
                break;
        }
    } catch (error) {
        return res.status(505).json({ Message: error })
    }
})



Books.post('/add', async (req, res, next) => {
    try {
        const data = req.body
        const id = data.id
        const name = data.name
        const detail = data.detail
        const price = data.price
        const ArrBooksNotDelete = Arr()
        if (id && name && detail) {
            if (ArrBooksNotDelete.find(item => item.id == id)) {
                throw new Error('ID đã tồn tại')
            } else {
                ArrBooksNotDelete.push(data)
                return res.status(200).json({ status: 'Thêm thành công !' })
            }
        } else {
            if (!id) {
                throw new Error('ID chưa nhập')
            }
            if (!name) {
                throw new Error('Name chưa nhập')
            }
            if (!price) {
                throw new Error('Price chưa nhập')
            }
            if (!detail) {
                throw new Error('Detail chưa nhập')
            }
        }
    } catch (error) {
        console.log('Loi: ', error);
        return res.status(500).json({ Message: error.message })
    }
})

Books.put('/:sub/:_id', async (req, res, next) => {
    try {
        const data = req.body
        const name = data.name
        const price = data.price
        const detail = data.detail
        const { sub, _id, } = req.params
        const ArrBooksNotDelete = Arr()
        const index = ArrBooksNotDelete.findIndex(item => item.id == _id)
        console.log(index);
        console.log(_id);
        switch (sub) {
            case 'update':
                if (index == -1) {
                    throw new Error('ID không tồn tại')
                } else {
                    ArrBooksNotDelete[index].name = name
                    ArrBooksNotDelete[index].price = price
                    ArrBooksNotDelete[index].detail = detail
                    return res.status(200).json({ Message: "Update Success!" })
                }
                break;
            case 'delete':
                if (index == -1) {
                    throw new Error('ID không tồn tại')
                } else {
                    const ojbDelete = { ...ArrBooks[index], statusDelete: true }
                    ArrBooks[index] = ojbDelete
                    console.log(ArrBooks);
                    return res.status(200).json({ Message: "Delete Success!" })
                }
                break;
            default:
                break;
        }

    } catch (error) {
        return res.status(505).json({ Message: error.message })
    }
})



module.exports = Books;



var ArrBooks = [{ "id": 1, "name": "Phil Gianolo", "price": 29, "detail": "Enchante Accessories" },
{ "id": 2, "name": "Roxanna Manis", "price": 40, "detail": "General Air Service & Supply Co" },
{ "id": 3, "name": "Vilma Hamstead", "price": 64, "detail": "H.J. Harkins Company, Inc." },
{ "id": 4, "name": "Bern Brasted", "price": 85, "detail": "CHANEL PARFUMS BEAUTE" },
{ "id": 5, "name": "Clary Steadman", "price": 73, "detail": "Uriel Pharmacy Inc." },
]