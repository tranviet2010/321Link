const express = require('express');
const bodyParser = require('body-parser');
const shortid = require('shortid');

const app = express();
const port = process.env.PORT || 3000;

// Sử dụng body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Lưu trữ các liên kết
const links = {};

// Route để tạo và trả về liên kết rút gọn
app.post('/shorten', (req, res) => {
    const { url } = req.body;
    const short = shortid.generate();
    links[short] = url;
    const shortUrl = `http://localhost:${port}/${short}`;
    res.json({ shortUrl });
});

// Route để chuyển hướng từ liên kết rút gọn đến liên kết gốc
app.get('/:short', (req, res) => {
    const { short } = req.params;
    const longUrl = links[short];
    if (longUrl) {
        res.redirect(longUrl);
    } else {
        res.status(404).send('Link not found');
    }
});

// Khởi động server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
