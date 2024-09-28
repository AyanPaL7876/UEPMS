import Joi from 'joi';
import mongoose from 'mongoose';

const questionValidation = Joi.object({
  knowledgeLevel: Joi.string()
    .valid("L-1", "L-2", "L-3", "L-4", "L-5", "L-6")
    .required()
    .messages({
      'any.only': 'Knowledge level must be one of [L-1, L-2, L-3, L-4, L-5, L-6]',
      'any.required': 'Knowledge level is required'
    }),
  
  courseOutcome: Joi.string()
    .valid("CO-1", "CO-2", "CO-3", "CO-4", "CO-5")
    .required()
    .messages({
      'any.only': 'Course outcome must be one of [CO-1, CO-2, CO-3, CO-4, CO-5]',
      'any.required': 'Course outcome is required'
    }),
  
  imageUrl: Joi.string()
    .uri()
    .allow('')
    .messages({
      'string.uri': 'Image URL must be a valid URI',
    }),
  
  text: Joi.string()
    .min(10)
    .max(500)
    .required()
    .messages({
      'string.min': 'Text must be at least 10 characters long',
      'string.max': 'Text cannot exceed 500 characters',
      'any.required': 'Text is required',
    }),
  
  option: Joi.array()
    .items(Joi.string().min(1))
    .min(2)
    .messages({
      'array.min': 'There must be at least 2 options',
      'string.min': 'Each option must be at least 1 character long',
    }),
  
  marks: Joi.number()
    .integer()
    .positive()
    .max(100)
    .required()
    .messages({
      'number.base': 'Marks must be a number',
      'number.positive': 'Marks must be a positive number',
      'number.max': 'Marks cannot exceed 100',
      'any.required': 'Marks are required',
    }),
  
  underGroup: Joi.string()
    .valid("A", "B", "C")
    .required()
    .messages({
      'any.only': 'Under group must be one of [A, B, C]',
      'any.required': 'Under group is required',
    }),
  
  mainQuestionGroup: Joi.array()
    .items(Joi.string().custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error('any.invalid', { value });
      }
      return value;
    }))
    .min(1)
    .required()
    .messages({
      'array.min': 'Main question group must contain at least one valid ObjectId',
      'any.invalid': 'Invalid ObjectId in main question group',
      'any.required': 'Main question group is required',
    }),
  
  mainpaper: Joi.string()
    .custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error('any.invalid', { value });
      }
      return value;
    })
    .required()
    .messages({
      'any.invalid': 'Invalid ObjectId for main paper',
      'any.required': 'Main paper is required',
    })
});

export default questionValidation;
