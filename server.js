const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const add = require('./fileSharing');

app.get('/', (request, response) => {
    response.send(add);
})

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage });

app.use(express.static('public'));

app.post('/upload', upload.single('file'), (req, res) => {
  res.status(200).send('Файл успешно загружен');
});

app.get('/download/:fileName', (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(__dirname, 'uploads', fileName);
  res.download(filePath, fileName, (err) => {
    if (err) {
      console.error('Ошибка скачивания файла:', err);
      res.status(404).end();
    }
  });
});

app.listen(8000, () => {
  console.log('Сервер запущен на порту 8000');
});