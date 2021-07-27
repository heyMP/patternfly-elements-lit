import { fromRollup } from '@web/dev-server-rollup';
import rollupLitCSS from 'rollup-plugin-lit-css';

const pluginLitCSS = fromRollup(rollupLitCSS);

export default {
  watch: true,
  nodeResolve: true,
  open: true,
  rootDir: "./"
};