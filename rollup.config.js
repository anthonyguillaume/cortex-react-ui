import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import copy from 'rollup-plugin-copy';
import { terser } from 'rollup-plugin-terser';

const packageJson = require('./package.json');

const globals = {
    react: 'React',
    'react-dom': 'ReactDOM',
    'prop-types': 'propTypes'
};

const commonjsOptions = {
    ignoreGlobal: true,
    include: /node_modules/,
    namedExports: {
        '../../node_modules/prop-types/index.js': [
            'elementType',
            'bool',
            'func',
            'object',
            'oneOfType',
            'element'
        ],
        '../../node_modules/react/jsx-runtime.js': ['jsx', 'jsxs'],
        '../../node_modules/react-is/index.js': [
            'ForwardRef',
            'isFragment',
            'isLazy',
            'isMemo',
            'Memo',
            'isValidElementType'
        ]
    }
};

export default [
    {
        input: './src/index.ts',
        output: [
            {
                file: packageJson.main,
                format: 'umd',
                sourcemap: true,
                name: 'react-ui',
                globals
            }
        ],
        external: Object.keys(globals),
        plugins: [
            resolve(),
            commonjs(commonjsOptions),
            typescript({ tsconfig: './tsconfig.json' }),
            copy({
                targets: [
                    { src: 'src/*.scss', dest: 'lib/styles' },
                    { src: 'src/Popper/*.scss', dest: 'lib/styles/Popper' },
                    { src: 'src/Tooltip/*.scss', dest: 'lib/styles/Tooltip' },
                    { src: 'src/Spinner/*.scss', dest: 'lib/styles/Spinner' },
                    { src: 'src/Transition/*.scss', dest: 'lib/styles/Transition' },
                    { src: 'src/DomContainer/*.scss', dest: 'lib/styles/DomContainer' },
                    { src: 'src/Button/*.scss', dest: 'lib/styles/Button' },
                    { src: 'src/DatePicker/*.scss', dest: 'lib/styles/DatePicker' },
                    { src: 'src/TagInput/*.scss', dest: 'lib/styles/TagInput' },
                    { src: 'src/typings', dest: 'lib/typings' }
                ]
            }),
            terser()
        ]
    },
    {
        input: 'lib/cjs/types/index.d.ts',
        output: [{ file: 'lib/index.d.ts', format: 'esm' }],
        plugins: [dts()]
    }
];
