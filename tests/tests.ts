// eslint-disable-next-line @typescript-eslint/no-var-requires
(require("source-map-support") as { install: () => void }).install();

// Import test suites
import * as openzeppelin from "./openzeppelin";
import * as erc1155m from "./erc1155m";
import * as erc1155mExamples from "./examples";

// Run test suites
openzeppelin.runTests();
erc1155m.runTests();
erc1155mExamples.runTests();
