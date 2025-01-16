function validateNonEmptyString(value, fieldName) {
    if (typeof value !== 'string' || value.trim() === '') {
        throw new Error(`${fieldName} is not a non-empty string.`);
    }
}

function validateNumber(value, fieldName) {
    if (isNaN(value)) {
        throw new Error(`${fieldName} is not a number.`);
    }
}

function validateDate(value, fieldName) {
    if (!(value instanceof Date) || isNaN(value.getTime())) {
        throw new Error(`${fieldName} is not a valid date type.`);
    }
}

function validateInstance(value, expectedType) {
    if (!value || value.type !== expectedType) {
        throw new Error(`It is not a valid type of ${expectedType}.`);
    }
}

export {
    validateNonEmptyString,
    validateNumber,
    validateDate,
    validateInstance
}