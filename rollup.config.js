import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

export default [
    {
        input: 'src/index.ts',
        external: [
            ...Object.keys(pkg.dependencies || {}),
            ...Object.keys(pkg.peerDependencies || {}),
        ],
        plugins: [
            typescript({
                tsconfig: './tsconfig.json',
                typescript: require('typescript'),
                useTsconfigDeclarationDir: true,
            }),
        ],
        output: { dir: 'dist', format: 'esm' },
    },
    {
        input: 'src/register.tsx',
        external: [
            ...Object.keys(pkg.dependencies || {}),
            ...Object.keys(pkg.peerDependencies || {}),
        ],
        plugins: [
            typescript({
                tsconfig: './tsconfig.json',
                typescript: require('typescript'),
                useTsconfigDeclarationDir: false,
                tsconfigOverride: {
                    compilerOptions: {
                        declaration: false
                    }
                }
            }),
        ],
        output: { dir: 'dist', format: 'esm' },
    },
];
