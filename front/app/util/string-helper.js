export const isEmptyOrNull = value => {
    return value == null || typeof value !== 'string' || value === '';
};

export const nonEmptyOrNull = value => {
    return !isEmptyOrNull(value);
};

export const formatLength = (content, maxLength) => {
    return `${content.substring(0, maxLength)}${
        content.length > maxLength ? '…' : ''
    }`;
};
