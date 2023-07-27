const path = require('node:path')

// barra separadora de directiorios segun SO
console.group(path.sep);

// unir rutas con path.join
const filePath = path.join('/content', 'subfolder', 'test.txt')
console.log('filePath:', filePath);

// ver nombre del fichero en el path
const base = path.basename(filePath)
console.log('base:', base);

// ver extension del fichero en el path
const ext = path.extname(filePath)
console.log('ext:', ext);