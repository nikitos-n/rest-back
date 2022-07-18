const createCache = () => {
  let cache = {}

  // Clear cache after 1 min
  setInterval(() => {
    cache = {}
    console.log('clear cache')
  }, 60000)

  return async (key, cb, res) => {
    if (cache[key]) {
      res.setHeader('X-Cached-Key', key)
      return cache[key]
    }
    const data = await cb(key)
    cache[key] = data
    return data
  }
}

const cache = createCache()

module.exports = { 
  cache
}
