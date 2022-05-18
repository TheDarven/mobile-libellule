module.exports = {
    root: true,
    extends: '@react-native-community',
    plugins: ['detox'],
    env: {
        jest: true
    },
    rules: {
        'comma-dangle': ['error', 'only-multiline'],
        'react-native/no-inline-styles': 0,
        'prettier/prettier': [
            'error',
            {
                'no-inline-styles': false
            }
        ]
    }
};
