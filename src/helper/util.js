const fs = require('fs')

const DB = (archivo) => {
  const data = fs.readFileSync(`./src/data/${archivo}.json`)
  const json = JSON.parse(data)
  return json
}

module.exports = {
  DB
}