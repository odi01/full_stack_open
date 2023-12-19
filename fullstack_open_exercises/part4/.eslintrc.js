module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es2021: true,
		jest: true,
	},
	extends: ["airbnb-base", "plugin:lodash/canonical"],
	overrides: [
		{
			env: {
				node: true,
				jest: true,
			},
			files: [".eslintrc.{js,cjs}"],
			parserOptions: {
				sourceType: "script",
			},
		},
	],
	parserOptions: {
		ecmaVersion: "latest",
	},
	rules: {
		semi: 0,
		"no-console": 0,
		indent: ["error", { allowIndentationTabs: true }],
		"no-plusplus": 0,
		"import/no-extraneous-dependencies": ["error", { devDependencies: true }],
	},
	plugins: ["lodash"],
};
