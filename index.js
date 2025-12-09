import fs from 'fs';
import { compiler } from './src/compiler.js';

const code = fs.readFileSync('./examples/demo.ylang', 'utf-8');

compiler(code);   // execute language directly
