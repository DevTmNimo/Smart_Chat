import express from 'express';
const app = express();
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const date = new Date();
console.log('current date and time is : ' + date);
