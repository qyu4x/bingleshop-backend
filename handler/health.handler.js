const getStatus = (req, res) => {
    res.status(200)
        .json({
            code: 200,
            status: "OK",
            data: {
                backendHealth: "UP",
                checkedAt: Date.now()
            }
        })
}

export default {
    getStatus
};