// eslint-disable-next-line import/no-unassigned-import
import '@/styles/global.css';
import { App } from '@/App';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

const root = document.querySelector('#root');

if (!root) throw new Error('Root element not found');

ReactDOM.createRoot(root).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
