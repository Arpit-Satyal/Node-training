exports.validateBody = function(schema) {
    return (req, res, next) => {
        const { body } = req;
        const { error } = schema.validate(body, {});
        error ? next(error.details[0].message) : next();
}
}