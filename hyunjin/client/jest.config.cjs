/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.cjs"], // jest.setup을 이용하여 환경 설정
  transform: {
    // ts-jest를 이용하여 typescript 사용 환경 설정
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/tsconfig.jest.json", // tsconfig.jest.json 사용 설정
      },
    ],
    // babel-jest를 이용하여 javascrit 사용 환경 설정 (cjs파일에서 import 활용 등)
    "^.+\\.(js|cjs|jsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "^@shared/(.*)$": "<rootDir>/src/shared/$1",
    "^@app/(.*)$": "<rootDir>/src/app/$1",
    "^@pages/(.*)$": "<rootDir>/src/pages/$1",
    "^@widgets/(.*)$": "<rootDir>/src/widgets/$1",
    "^@features/(.*)$": "<rootDir>/src/features/$1",
    "^@entities/(.*)$": "<rootDir>/src/entities/$1",
  },
};
