import type { Config } from "jest";

const config: Config = {
	testEnvironment: "node",
	roots: ["<rootDir>/src", "<rootDir>/tests"],
	testMatch: ["**/?(*.)+(test|spec).ts"],
	setupFiles: ["<rootDir>/tests/setup-env.ts"],
	moduleFileExtensions: ["ts", "js", "json"],
	transform: {
		"^.+\\.ts$": [
			"ts-jest",
			{
				isolatedModules: false,
				tsconfig: "<rootDir>/tsconfig.json",
			},
		],
	},
	clearMocks: true,
	collectCoverageFrom: [
		"src/**/*.ts",
		"!src/migration/**",
		"!src/seeders/**",
		"!src/app.ts",
	],
	coverageDirectory: "coverage",
	verbose: false,
};

export default config;
