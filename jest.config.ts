import { pathsToModuleNameMapper, type JestConfigWithTsJest } from "ts-jest";
import { compilerOptions } from "./tsconfig.json";

const pathsToIgnore = [
  "<rootDir>/dist/",
  "<rootDir>/poc-react/",
  "<rootDir>/poc-angular/",
];

const config: JestConfigWithTsJest = {
  clearMocks: true,
  maxWorkers: "80%",
  moduleDirectories: ["node_modules"],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json"],
  transform: {
    "^.+\\.(ts|tsx)?$": ["ts-jest", { useESM: true }],
    ".+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$":
      "jest-transform-stub",
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>",
  }),
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  verbose: true,
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "jsdom",
  testPathIgnorePatterns: pathsToIgnore,
  collectCoverage: true,
  collectCoverageFrom: [
    "src/components/**/*.{ts,tsx}",
    "!src/components/**/*.stories.{ts,tsx}",
    "!src/components/**/*.types.ts",
  ],
  coveragePathIgnorePatterns: pathsToIgnore,
};

export default config;
