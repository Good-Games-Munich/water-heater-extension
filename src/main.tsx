import styles from './index.module.css';
import { App } from './pages/App/App';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

const root = document.querySelector('#root');

if (!root) throw new Error('Root element not found');

root.id = styles.root;

ReactDOM.createRoot(root).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
