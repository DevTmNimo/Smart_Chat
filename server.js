import express from 'express'; 
const app = express();
const PORT = process.env.PORT || 3000;
const date = new Date();
const onMessage = () => {
console.log(`If you're seeing this message first of all fuck you and second of all it's ${date}`);
};
onMessage();

app.listen (PORT , () => {
    console.log(`Hello , the server is running on port ${PORT}`);
})