import mongoose from "mongoose";
import Joi from "joi";

export const userValidationSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(6).required(),
  //   password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
});
