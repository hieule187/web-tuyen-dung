require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connection = require('./configs/database');
const route = require('./routes/index');

// Kết nối tới mongodb
connection();

// middleware
app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// routes
route(app);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Đang lắng nghe trên cổng ${port}...`));
