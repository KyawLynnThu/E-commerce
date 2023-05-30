const router = require('express').Router()
const controller = require('../controllers/permit')
const { PermitSchema, AllSchema } = require('../utils/schema');
const { validateBody, validateParam } = require('../utils/validator')

router.get('/', controller.getAllPermissions)
router.post('/', [validateBody(PermitSchema.add)], controller.addPermission)

router.route('/:id')
    .get(validateParam(AllSchema.id, "id"), controller.getSinglePermission)
    .patch(validateParam(AllSchema.id, "id"), controller.updatePermission)
    .delete(validateParam(AllSchema.id, "id"), controller.deletePermission)

module.exports = router