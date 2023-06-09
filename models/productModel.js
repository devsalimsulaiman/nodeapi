let products = require('../data/products')
const { v4: uuidv4 } = require('uuid')
const { writeDataToFile } = require('../utils')

function findAll() {
    return new Promise((resolve, reject) => {
        resolve(products)
    })
}

function findById(id) {
    return new Promise((resolve, reject) => {
        const product = products.find((p) => p.id === id)
        resolve(product)
    })
}

function create(product) { // we installed npm i uuid    for generating id
    return new Promise((resolve, reject) => {
        const newProduct = {id: uuidv4(), ...product}
        products.push(newProduct)
        writeDataToFile('./data/products.json', products)
        resolve(newProduct)
    }) 
}

function update(id, product) { // we installed npm i uuid    for generating id
    return new Promise((resolve, reject) => {
        const index = products.findIndex((p) => p.id === id)
        products[index] = {id, ...product}
        writeDataToFile('./data/products.json', products)
        resolve(products[index])
    }) 
}

function remove(id) { // we installed npm i uuid    for generating id
    return new Promise((resolve, reject) => {
        // change identifier of the import of products to let not const, else you cannot re-write it
        products = products.filter((p) => p.id !== id)
        writeDataToFile('./data/products.json', products)
        resolve()
    }) 
}



module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
}