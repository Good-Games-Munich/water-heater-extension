// eslint-disable-next-line import/no-unassigned-import
import './index.css';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { Button, Flowbite } from 'flowbite-react';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

const App = () => (
    <Flowbite>
        <div className="flex items-center justify-center mx-auto w-64 bg-background-light p-4 dark:bg-background-dark">
            <Button
                onClick={async () =>
                    await chrome.tabs.create({ url: chrome.runtime.getURL('index.html') })
                }
                outline
            >
                {chrome.i18n.getMessage('openDashboard')}
                <ArrowTopRightOnSquareIcon className="ml-2 h-5 w-5" />
            </Button>
        </div>
    </Flowbite>
);

const root = document.querySelector('#root');

if (!root) throw new Error('Root element not found');

ReactDOM.createRoot(root).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
