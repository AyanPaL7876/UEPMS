const Joi = require('joi');

const questionGroupValidation = (data) => {
    const schema = Joi.object({
        paperCode: Joi.string()
            .max(50)
            .required()
            .messages({
                'string.base': `"paperCode" should be a type of 'text'`,
                'string.empty': `"paperCode" cannot be an empty field`,
                'string.max': `"paperCode" should have a maximum length of {#limit}`,
                'any.required': `"paperCode" is a required field`
            }),

        year: Joi.string()
            .regex(/^(19|20)\d{2}-\d{2}$/)
            .required()
            .messages({
                'string.pattern.base': `"year" must be in the format YYYY-YY, e.g., 2024-25`,
                'any.required': `"year" is a required field`
            }),

        groupA: Joi.array().items(Joi.string().hex().length(24))
            .messages({
                'string.length': `"groupA" should contain valid ObjectId references`,
            }),

        groupB: Joi.array().items(Joi.string().hex().length(24))
            .messages({
                'string.length': `"groupB" should contain valid ObjectId references`,
            }),

        groupC: Joi.array().items(Joi.string().hex().length(24))
            .messages({
                'string.length': `"groupC" should contain valid ObjectId references`,
            }),

        mainQuestionPaper: Joi.string().hex().length(24)
            .required()
            .messages({
                'string.length': `"mainQuestionPaper" should be a valid ObjectId`,
                'any.required': `"mainQuestionPaper" is a required field`
            }),

        createdBy: Joi.string().hex().length(24)
            .required()
            .messages({
                'string.length': `"createdBy" should be a valid ObjectId`,
                'any.required': `"createdBy" is a required field`
            }),
    });

    return schema.validate(data);
};

export default questionGroupValidation;