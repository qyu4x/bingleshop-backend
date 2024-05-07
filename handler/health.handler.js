const getStatus = (req, res) => {
    res.status(200)
        .json({code: 200, status: "OK",
            data: {
                status: "UP",
                checkedAt: Date.now()
            }
        })
}

export default {
    getStatus
};