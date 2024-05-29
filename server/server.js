const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

mongoose.connect('mongodb+srv://serMin:SerVerAdMin@serboard.4p7s0j9.mongodb.net/?retryWrites=true&w=majority&appName=serboard',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use('/admin', adminRoutes);
app.use('/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
