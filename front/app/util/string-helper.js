export const isEmptyOrNull = value => {
    return value == null || typeof value !== 'string' || value === '';
};

export const nonEmptyOrNull = value => {
    return !isEmptyOrNull(value);
};
