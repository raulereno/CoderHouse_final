class ValidationError extends Error {
  constructor(errors) {
    super("Error de validación");
    this.errors = errors;
  }
}

module.exports = ValidationError;
