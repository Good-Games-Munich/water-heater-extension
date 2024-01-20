import packageJson from './package.json';
import { defineManifest } from '@crxjs/vite-plugin';

const { version, author } = packageJson;

// Convert from Semver (example: 0.1.0-beta6)
const [major, minor, patch, label = '0'] = version
    // can only contain digits, dots, or dash
    .replace(/[^\d.-]+/gu, '')
    // split into version parts
    .split(/[.-]/u);

export const manifest = defineManifest(async environment => ({
    manifest_version: 3,
    name:
        environment.mode === 'staging'
            ? `[INTERNAL] __MSG_extensionName__`
            : '__MSG_extensionName__',
    description: '__MSG_extensionDescription__',
    author,
    // up to four numbers separated by dots
    version: `${major}.${minor}.${patch}.${label}`,
    // semver is OK in "version_name"
    version_name: version,
    permissions: ['tabs'],
    default_locale: 'en',
    browser_specific_settings: {
        gecko: {
            id: '{123e4567-e89b-12d3-a456-426614174000}',
        },
    },
    action: {
        default_popup: 'popup.html',
    },
    icons: {
        512: 'icon512.png', // public folder builds into /
    },
    content_scripts: [
        {
            matches: ['https://*.challonge.com/*'],
            js: ['src/content-scripts/challonge/fixWrapper.ts'],
        },
        {
            matches: ['https://*.challonge.com/*/module'],
            js: ['src/content-scripts/challonge/fixModule.ts'],
        },
    ],
}));
