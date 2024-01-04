// eslint-disable-next-line import/no-unassigned-import
import '@/styles/global.css';
import { Button } from '@/components/ui/button';
import { ThemeProvider } from '@/providers/theme.provider';
import { ExternalLinkIcon } from 'lucide-react';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

const App = () => (
    <ThemeProvider defaultTheme="system">
        <div className="flex justify-center w-64 p-4">
            <Button
                onClick={async () =>
                    await chrome.tabs.create({ url: chrome.runtime.getURL('index.html') })
                }
                variant="outline"
            >
                {chrome.i18n.getMessage('openDashboard')}
                <ExternalLinkIcon className="ml-2 h-4 w-4" />
            </Button>
        </div>
    </ThemeProvider>
);

const root = document.querySelector('#root');

if (!root) throw new Error('Root element not found');

ReactDOM.createRoot(root).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
