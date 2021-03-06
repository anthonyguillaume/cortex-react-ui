import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import copy from 'rollup-plugin-copy';

const packageJson = require('./package.json');

export default [
    {
        input: 'src/index.ts',
        output: [
            {
                file: packageJson.main,
                format: 'cjs',
                sourcemap: true
            },
            {
                file: packageJson.module,
                format: 'esm',
                sourcemap: true
            }
        ],
        plugins: [
            resolve(),
            commonjs(),
            typescript({ tsconfig: './tsconfig.json' }),
            copy({
                targets: [
                    { src: 'src/**/*.scss', dest: 'lib' }
                ]
            })
        ]
    },
    {
        input: 'lib/esm/types/index.d.ts',
        output: [{ file: 'lib/index.d.ts', format: 'esm' }],
        plugins: [dts()]
    }
];
