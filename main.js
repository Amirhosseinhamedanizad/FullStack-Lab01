const fs = require('fs')
const csv = require('csv-parser')
const { type } = require('os')

const canada = [], usa = []

if (fs.existsSync('canada.txt')) {
  fs.unlink('canada.txt', err => {
    if (err) {
      console.error(err)      
    }
    console.log("canada.txt was found and removed...")
  })
}

if (fs.existsSync('usa.txt')) {
  fs.unlink('usa.txt', err => {
    if (err) {
      console.error(err)      
    }
    console.log("usa.txt was found and removed...")
  })
}

fs.createReadStream('input_countries.csv')
  .pipe(csv()).on('data', row => {
    const headers = Object.keys(row)
    if (row[headers[0]] === 'Canada') canada.push(row)
    if (row[headers[0]] === 'United States') usa.push(row)
  }).on('end', () => {
    console.log('CSV read successfully...')
    const canadaArr = JSON.stringify(canada).split(',')
    const usaArr = JSON.stringify(usa).split(',')
    fs.writeFileSync('canada.txt', canadaArr.join("\n"), 'utf8')
    console.log('Entries written to canada.txt')
    fs.writeFileSync('usa.txt', usaArr.join("\n"), 'utf8')
    console.log('Entries written to usa.txt')
  })




