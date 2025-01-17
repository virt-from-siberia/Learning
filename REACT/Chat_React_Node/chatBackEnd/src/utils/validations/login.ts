
import { check, validationResult } from 'express-validator'

export default [
    check('email').isEmail(),
    check('password').isLength({ min: 5 })
]