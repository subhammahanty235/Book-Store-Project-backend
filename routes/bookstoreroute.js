const express = require('express')
const Store = require('../model/store')
const router = express.Router()

// add new book to the database              <-- Working
router.post('/addbook' , async(req,res)=>{
    try {
        let flag = false;    //to check if operation of adding new book is successful or not
        const {name , ISBN , author , price , coor , nop , year , stock , digital_format} = req.body
        const find_book = await Store.findOne({ISBN:ISBN});
        if(!find_book){
            const data = await Store.create({
                Name:name,
                ISBN:ISBN,
                Author:author,
                Price:price,
                Counter_Of_Origin:coor,
                Number_Of_Pages:nop,
                Year:year,
                Stock_available:stock,
                Digital_Format_Available:digital_format
            })
            flag = true;
            res.json({flag , data})
        }
        else{
            res.send({flag , msg:"Book with same ISBN number already exists"})
        }
    } catch (error) {
        console.log(error)
    }
    
})

// fetch book by ISBN number               <-- Working
router.get('/fetchISBN/:ISBN' , async(req,res)=>{
    try {
        const ISBN = req.params.ISBN
        const find_book = await Store.findOne({ISBN:ISBN});
        if(!find_book){
            res.send("Book Not Exists")
        }
        else{
            res.json(find_book)
        }
    } catch (error) {
        console.log(error)
    }
})

// Fetch all books from the store           <-- Working
router.get('/fetchall' , async(req,res)=>{
    try {
        const find_books = await Store.find();
        res.json(find_books)
    } catch (error) {
        console.log(error)
    }
})
// delete a book by its ISBN number      <-- Working
router.delete('/deletebook/:ISBN' , async(req,res)=>{
    try {
        const ISBN = req.params.ISBN
        const find_book = await Store.findOne({ISBN:ISBN});
        if(!find_book){
            res.send("Book Not Exists")
        }
        else{
           await Store.deleteOne({ISBN:ISBN})
            res.send("Deleted Successfully")
        }
    } catch (error) {
        console.log(error)
    }
})
// Update a book's data by its ISBN number
router.put('/update-isbn/:ISBN' , async(req,res)=>{
    try {
        const ISBN = req.params.ISBN
        const find_book = await Store.findOne({ISBN:ISBN});
        if(!find_book){
            res.send("Book not exists")
        }
        else{
            const newdetails = {};
            const {name , ISBN , author , price , coor , nop , year , stock , digital_format} = req.body
            if (name) { newdetails.Name = name};
            if (ISBN) { newdetails.ISBN = ISBN};
            if (price) { newdetails.Price = price};
            if (author) { newdetails.Author = author};
            if (coor) { newdetails.Counter_Of_Origin = coor};
            if (nop) { newdetails.Number_Of_Pages = nop};
            if (year) { newdetails.Year = year};
            if (stock) { newdetails.stock = stock};
            if (digital_format) { newdetails.Digital_Format_Available = digital_format};
            const newdata = await Store.findOneAndUpdate({ISBN:ISBN} ,{$set:newdetails} , {new:true})
            res.json(newdata)
        }
    } catch (error) {
        res.send(error)
    }
})
// update  a data by its ID
router.put('/update/:id' , async(req,res)=>{
    try {
        const id = req.params.id
        const find_book = await Store.findById(id)
        if(!find_book){
            res.send("Book not exists")
        }
        else{
            const newdetails = {};
            const {name , ISBN , author , price , coor , nop , year , stock , digital_format} = req.body
            if (name) { newdetails.Name = name};
            if (ISBN) { newdetails.ISBN = ISBN};
            if (price) { newdetails.Price = price};
            if (author) { newdetails.Author = author};
            if (coor) { newdetails.Counter_Of_Origin = coor};
            if (nop) { newdetails.Number_Of_Pages = nop};
            if (year) { newdetails.Year = year};
            if (stock) { newdetails.stock = stock};
            if (digital_format) { newdetails.Digital_Format_Available = digital_format};
            const newdata = await Store.findByIdAndUpdate(id ,{$set:newdetails} , {new:true})
            res.json(newdata)
        }
    } catch (error) {
        res.send(error)
    }
})


module.exports = router
