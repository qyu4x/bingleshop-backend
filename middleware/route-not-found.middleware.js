const routeNotFoundMiddleware = (req, res) => {
    res.status(404)
        .json({
            code: 404,
            message: "Are you lost?"
        }).end();
}

export {
    routeNotFoundMiddleware
};