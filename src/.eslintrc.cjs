module.exports = {
	env: {
		node: true,
		browser: true,
		es2021: true,
		'jest/globals': true
	},
	extends: ['eslint:recommended', 'plugin:jest/recommended'],
	parserOptions: {
		ecmaVersion: 13,
		sourceType: 'module'
	},
	rules: {},
	plugins: ['jest']
}
