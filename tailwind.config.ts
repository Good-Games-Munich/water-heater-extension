/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable canonical/filename-match-exported */
import { type Config } from 'tailwindcss';
import { cyan, gray, white } from 'tailwindcss/colors';

const tailwindConfig: Config = {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
        'node_modules/flowbite-react/lib/esm/**/*.js',
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    light: cyan[700],
                    dark: cyan[800],
                },
                background: {
                    light: white,
                    dark: gray[900],
                },
                'content-background': {
                    light: white,
                    dark: gray[800],
                },
                text: {
                    light: gray[900],
                    dark: white,
                },
            },
        },
    },
    plugins: [require('flowbite/plugin')],
};
export default tailwindConfig;
