exports.routerMiddleware =
  (callbacks) =>
  async (...args) => {
    const [_, res] = args
    for await (const cb of callbacks) {
      try {
        await cb(...args)
      } catch (err) {
        const statusCode = err.statusCode || 500
        res.writeHead(statusCode)
        return res.end(
          JSON.stringify({
            error: {
              status: statusCode || 500,
              message: err.message || 'Internal server error.',
            },
          })
        )
      }
    }
  }
