import * as lib_wasm from '../lib/pkg/lib.js'
import * as fs from 'fs'
const data = []
for (let i = 0; i < 100000; i++) {
    const t1 = performance.now();
    lib_wasm.fast_slope (
                        Math.pow(Math.random(), 10000),
                        Math.pow(Math.random(), 10000),
                        Math.pow(Math.random(), 10000),
                        Math.pow(Math.random(), 10000),
    );
    const t2 = performance.now();
    data.push(t2 - t1)
}

const uqiue = [...new Set(data)]
fs.writeFileSync('data.json', JSON.stringify(uqiue, null, 2))