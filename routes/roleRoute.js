const router = require('express').Router()
const controller = require('../controllers/roleController')
const { PermitSchema, AllSchema, RoleAddPermit } = require('../utils/schema');
const { validateBody, validateParam } = require('../utils/validator')

router.get('/', controller.getAllRoles)
router.post('/', [validateBody(PermitSchema.add)], controller.addRole)
router.post('/add/permit', [validateBody(RoleAddPermit.addPermit)], controller.roleAddPermit)
router.post('/remove/permit', [validateBody(RoleAddPermit.addPermit)], controller.roleRemovePermit)

router.route('/:id')
    .get(validateParam(AllSchema.id, "id"), controller.getSingleRole)
    .patch(validateParam(AllSchema.id, "id"), controller.updateRole)
    .delete(validateParam(AllSchema.id, "id"), controller.deleteRole)

module.exports = router