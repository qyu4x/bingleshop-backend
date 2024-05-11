const routeNotFoundMiddleware = (req, res) => {
    res.status(404)
        .json({
            errors: "Are you lost?"
        }).end();
}

module.exports = {
    routeNotFoundMiddleware
};