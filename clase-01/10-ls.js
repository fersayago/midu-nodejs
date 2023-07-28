const fs = require('node:fs')

fs.readdir('.', (err, files) => {
  if (err){
    console.error('error:', err)
    return;
  }
  
  files.forEach(file => {
    console.log(file)
  })
})