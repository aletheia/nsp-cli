//import {main} from './main';

const {_: parameters} = yargs(process.argv.slice(2)).usage(
  'Generate .scss.d.ts from CSS module .scss files.\nUsage: $0 <glob pattern> [options]'
).argv;

console.log(parameters);
