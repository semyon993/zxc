const fileSharing = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<h1>Файлообменник</h1>
<input type="file" id="file-input">
<button id="upload"  onclick="uploadFile()">Загрузить файл</button>
<button id="Dowload" onclick="downloadLastUploadedFile()">Скачать файл</button>


<script>
let lastUploadedFile = null;

async function uploadFile() {
  const fileInput = document.getElementById('file-input');
  const file = fileInput.files[0];
  
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('/upload', {
    method: 'POST',
    body: formData
  });

  if (response.ok) {
    lastUploadedFile = file.name;
    console.log('Файл успешно загружен:', file.name);
  } else {
    console.error('Ошибка загрузки файла:', response.statusText);
  }
}

function downloadLastUploadedFile() {
  if (lastUploadedFile) {
    const downloadLink = document.createElement('a');
    downloadLink.href = '/download/' + lastUploadedFile;
    downloadLink.download = lastUploadedFile;
    downloadLink.click();
    console.log('Файл успешно скачан:', lastUploadedFile);
  } else {
    console.error('Ошибка: Нет загруженных файлов');
  }
}
</script>
</body>
</html>
`
module.exports = fileSharing;