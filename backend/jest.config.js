module.exports = {
    roots: [
        "<rootDir>"
    ],
    testMatch: [
        "**/test/**/*.spec.ts"
    ],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    setupFilesAfterEnv:['<rootDir>/test/setupAfterEnv.ts'],
    globalSetup: '<rootDir>/test/setup.ts',
    globalTeardown: '<rootDir>/test/teardown.ts',
    testEnvironment: '<rootDir>/test/environment.js',
}