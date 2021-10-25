const express = require("express");
const { check, validationResult } = require("express-validator");

exports.registerRules = () => [
  check("fullName", "This field is required").notEmpty(),
  check("email", "This field is required").notEmpty(),
  check("email", "This field should be a valid email").isEmail(),
  check("password", "This field should be at least 6 characters").isLength({
    min: 6,
  }),
];

exports.validator = (req, res, next) => {
  const errors = validationResult(req);
  return errors.isEmpty()
    ? next()
    : res.status(400).json({ errors: errors.array() });
};
