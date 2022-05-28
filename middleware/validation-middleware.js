// I used the tutorial found on https://blog.logrocket.com/how-to-handle-data-validation-in-node-using-validatorjs/ 

const validator = require('../helpers/validate');

//validation for the updating or creating a new customer with required fields
const customerValidation = (req, res, next) => {
    const validationRule = {
        // "email": "required|email",
        // "username": "required|string",
        // "phone": "required|string",
        // "password": "required|string|min:6|confirmed",
        // "gender": "string"
        "client_name": "required|string",
        "finger_size": "string",
        "current_date": "required|date",
        "project_volume": "required|numeric",
        "s_08_12mm": "numeric",
        "s_13_17mm": "numeric",
        "s_18_26mm": "numeric",
        "s_27_32mm": "numeric",
        "s_33_35mm": "numeric",
        "s_36_38mm": "numeric",
        "s_39_41mm": "numeric",
        "other_stone_1": "numeric",
        "other_stone_2": "numeric",
        "parts_1": "numeric",
        "parts_2": "numeric",
        "prong_set_standard": "numeric",
        "prong_set_fancy": "numeric",
        "channel_set_standard": "numeric",
        "channel_set_fancy": "numeric",
        "bezel_flush_standard": "numeric",
        "bezel_flush_fancy": "numeric",
        "plating": "numeric",
        "solder": "numeric",
        "laser": "numeric",
        "texture": "numeric",
        "center_stone_settting_RETAIL": "numeric",
        "other_labor_RETAIL": "required|numeric",
        "casting": "required|boolean",
        "CAD_modifier": "required|numeric",
        "metal_name": "required|string",
        "metal_price": "required|numeric",
        "metal_transaction_modifier": "required|numeric"
    }
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    });
}

//validation for metal update with required fields.
const metalValidation = (req, res, next) => {
    const validationRule = {
        "metal_name": "required|string",
        "metal_price": "required|numeric",
        "metal_transaction_modifier": "required|numeric"
    }
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    });
}

module.exports = { 
  customerValidation, 
  metalValidation
}