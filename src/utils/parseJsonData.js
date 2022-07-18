const { readFile, writeFile } = require('fs')

const { PORT, HOST } = process.env

exports.parseJsonBody = (request) => new Promise((resolve, reject) => {
  let rawJson = ''
  request
      .on('data', (chunk) => {
          rawJson += chunk
      })
      .on('end', () => {
          try {
              if (rawJson) {
                  const requestBody = JSON.parse(rawJson)
                  resolve(requestBody)
              } else {
                  resolve(null)
              }
          } catch (err) {
              reject(err)
          }
      })
      .on('error', reject)
})

exports.parseQueryParams = (request) => {
    const parseUrl = new URL(request.url, `http://${HOST}:${PORT}`)
    const { searchParams } = parseUrl
    const queryParams = {}
    for([key, value] of searchParams.entries()) {
        queryParams[key] = value
    }
    return queryParams
}

exports.readJSONAsync = (path) => new Promise((resolve, reject) => {
    readFile(path, 'utf-8', (err, data) => {
        err ? reject(err) : resolve(JSON.parse(data))
    })
})

exports.writeJSONAsync = (path, data) => new Promise((resolve, reject) => {
    const buff = Buffer.from(JSON.stringify(data, null, 4))
    writeFile(path, buff, (err) => {
        err ? reject(err) : resolve()
    })
})
