import {Router} from 'express'
import {Product} from '../models/product.js'
import { Category } from '../models/category.js';

export const appRoutes = Router()

appRoutes.get('/products', async(req, res) => {
    try{
        const products = await Product.find().populate('category')
        res.json(products)
    }catch(error){
        return res.status(500).send({message: error.message})
    }
})

appRoutes.get('/category', async(req, res) => {
    try{
        const category = await Category.find()
        res.json(category)
    }catch(error){
        return res.status(500).send({message: error.message})
    }
})

appRoutes.post('/products', async(req, res) => {
    try{
        const {name, price, category} = req.body
        const foundedCategory = await  Category.findById(category)
        if(!foundedCategory){
            return res.status(400).json({message: 'Category not found'})
        }
        const newProduct = await Product.create({name,price,category: foundedCategory._id})
        res.status(201).json(newProduct)
    }catch(error){
        return res.status(500).send({message: error.message})
    }
})

appRoutes.post('/category', async(req, res) => {
    try{
        // const {name} = req.body
        const category = await Category.create(req.body)
        res.status(201).json(category)
    }catch(error){
        res.staus(500).send(error.message)
    }
})