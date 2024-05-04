const routesNotFoundMiddleware = (req, res) => {
    res.status(404)
        .json({
            code: 404,
            message: "Are you lost?"
        })
}

export {
    routesNotFoundMiddleware
};