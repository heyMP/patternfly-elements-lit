// rollup.config.js
import configFactory from "@patternfly/pfe-tools/rollup.config.factory.js";
import pfelementPackage from "./package.json";

export default configFactory(pfelementPackage.pfelement);
