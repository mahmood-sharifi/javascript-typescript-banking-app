import { throwError } from './helper';

export function validateNonEmptyString(value: string, fieldName: string) {
    if (value.trim() === '') {
        throwError(`${fieldName} is not a non-empty string.`);
    }
}

