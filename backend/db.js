const express = require('express'); //import express
const app = express();
const mongoose = require('mongoose')
// const mongoDbClient = require("mongodb").MongoClient
const connectDB = function (callback) {
    mongoose.connect('mongodb://localhost:27017/Food', { useNewUrlParser: true, useUnifiedTopology: true }, async (err, result) => {
        if (err) {
            console.log('Failed to connect to MongoDB:', err);
        } else {
            console.log('Connected to MongoDB');
            const foodCollection = await mongoose.connection.db.collection('food_items');
            foodCollection.find({}).toArray(async function (err, data) {
                const categoryCollection = await mongoose.connection.db.collection('foodCategory');
                categoryCollection.find({}).toArray(async function (err, catData) {
                    callback(err, data, catData);
                });
            });
        }
    });
};

module.exports = connectDB;