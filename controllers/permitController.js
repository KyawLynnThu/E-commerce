const DB = require('../models/permit');
const Helper = require('../utils/helper')

const getAllPermissions = async (_req, res, _next) => {
    let permits = await DB.find().select('-__v');
    Helper.fMsg(res, "All Permissions", permits);
}

const getSinglePermission = async (req, res, next) => {
    let permit = await DB.findById(req.params.id).select('-__v');
    if (permit) {
        Helper.fMsg(res, "Single Permission", permit);
    } else {
        next(new Error("No Permission with that id"));
    }
}

const addPermission = async (req, res, next) => {
    let dbPermit = await DB.findOne({ name: req.body.name });
    if (dbPermit) {
        next(new Error("Permission Name is Already in Use"));
    } else {
        let result = await new DB(req.body).save();
        Helper.fMsg(res, "Permission Added Successfully", result);
    }
}

const updatePermission = async (req, res, next) => {
    let dbPermit = await DB.findById(req.params.id).select('-__v');
    if (dbPermit) {
        await DB.findByIdAndUpdate(dbPermit._id, req.body);
        let result = await DB.findById(dbPermit._id).select('-__v');
        Helper.fMsg(res, "Permisiion Updated Successfully", result);
    } else {
        next(new Error("No Permission with that id"));
    }
}

const deletePermission = async (req, res, next) => {
    let permit = await DB.findById(req.params.id);
    if (permit) {
        await DB.findByIdAndDelete(permit._id);
        Helper.fMsg(res, "Permisiion Deleted Successfully");
    } else {
        next(new Error("No Permission with that id"));
    }
}
module.exports = {
    getAllPermissions,
    getSinglePermission,
    addPermission,
    updatePermission,
    deletePermission
}