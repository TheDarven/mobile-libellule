module.exports = {
    root: true,
    extends: '@react-native-community',
    plugins: ['detox'],
    env: {
        jest: true
    },
    rules: {
        'comma-dangle': ['error', 'only-multiline']
    }
};
