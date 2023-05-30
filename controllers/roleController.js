const DB = require('../models/role');
const PermitDB = require('../models/permit');
const Helper = require('../utils/helper');

const getAllRoles = async (_req, res, _next) => {
    let roles = await DB.find().populate('permits', '-__v').select('-__v');
    Helper.fMsg(res, "All Roles", roles);
}

const getSingleRole = async (req, res, next) => {
    let role = await DB.findById(req.params.id).select('-__v');
    if (role) {
        Helper.fMsg(res, "Single Role", role);
    } else {
        next(new Error("No Role with that id"));
    }
}

const addRole = async (req, res, next) => {
    let dbRole = await DB.findOne({ name: req.body.name });
    if (dbRole) {
        next(new Error("Role Name is Already in Use"));
    } else {
        let result = await new DB(req.body).save();
        Helper.fMsg(res, "Role Added Successfully", result);
    }
}

const updateRole = async (req, res, next) => {
    let dbRole = await DB.findById(req.params.id).select('-__v');
    if (dbRole) {
        await DB.findByIdAndUpdate(dbRole._id, req.body);
        let result = await DB.findById(dbRole._id).select('-__v');
        Helper.fMsg(res, "Role Updated Successfully", result);
    } else {
        next(new Error("No Role with that id"));
    }
}

const deleteRole = async (req, res, next) => {
    let role = await DB.findById(req.params.id);
    if (role) {
        await DB.findByIdAndDelete(role._id);
        Helper.fMsg(res, "Role Deleted Successfully");
    } else {
        next(new Error("No Role with that id"));
    }
}

const roleAddPermit = async (req, res, next) => {
    let dbRole = await DB.findById(req.body.roleId);
    let dbPermit = await PermitDB.findById(req.body.permitId);

    if (dbRole && dbPermit) {
        await DB.findByIdAndUpdate(dbRole._id, { $push: { permits: dbPermit._id } });
        let result = await DB.findById(dbRole._id).populate('permits', '-__v').select('-__v');
        Helper.fMsg(res, "Permit Add to Role", result);
    } else {
        next(new Error("Role Id and Permit Id need to be valided!"));
    }
}

const roleRemovePermit = async (req, res, next) => {
    let dbRole = await DB.findById(req.body.roleId);
    let dbPermit = await PermitDB.findById(req.body.permitId);

    if (dbRole && dbPermit) {
        await DB.findByIdAndUpdate(dbRole._id, { $pull: { permits: dbPermit._id } });
        let result = await DB.findById(dbRole._id).populate('permits', '-__v').select('-__v');
        Helper.fMsg(res, "Permit Removed from Role", result);
    } else {
        next(new Error("Role Id and Permit Id need to be valided!"));
    }
}

module.exports = {
    getAllRoles,
    getSingleRole,
    addRole,
    updateRole,
    deleteRole,
    roleAddPermit,
    roleRemovePermit
}