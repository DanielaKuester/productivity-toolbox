const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500

    res.status(statusCode)
    
    res.json({
        message: err.message,
        // Show the error stack with line numbers, etc. if you're not in production mode, but in development mode
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    })
}