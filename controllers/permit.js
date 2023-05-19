const DB = require('../models/permit');
const Helper = require('../utils/helper')

let add = async(req, res, next) => {
    let dbPermit = await DB.findOne({ name: req.body.name })
    if(dbPermit) {
        next(new Error("Permission Name is Already in Use"))
    } else {
        let result = await new DB(req.body).save()
        Helper.fMsg(res, "Permission Added Successfully", result)
    }
}


module.exports = {
    add
}