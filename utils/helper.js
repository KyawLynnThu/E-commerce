module.exports ={
    fMsg: (res, msg="", result=[]) => {
        res.status(200).json({
            success: true,
            msg,
            result
        })
    }
}