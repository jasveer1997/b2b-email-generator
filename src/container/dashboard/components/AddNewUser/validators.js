
const validateName = (rule, value, callback) => {
    const nameRegex = /^[A-Za-z]+$/;

    if (!value.match(nameRegex)) {
        callback('Name should contain only letters.');
    } else {
        callback();
    }
};

const validateDomain = (rule, value, callback) => {
    const domainRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!value.match(domainRegex)) {
        callback('Please enter a valid domain (e.g., example.com).');
    } else {
        callback();
    }
};

export { validateDomain, validateName };