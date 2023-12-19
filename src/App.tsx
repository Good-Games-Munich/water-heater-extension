import { SidebarNavigation } from './components/SidebarNavigation';
import { SeedingList } from './pages/SeedingList';
import { Flowbite } from 'flowbite-react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export const App = () => (
    <Flowbite>
        <div className="w-full flex-nowrap flex sm:flex-nowrap flex-grow font-medium text-text-light dark:text-text-dark bg-background-light dark:bg-background-dark">
            <BrowserRouter>
                <SidebarNavigation />
                <main className="w-full h-full flex-grow p-5 overflow-auto" role="main">
                    <Routes>
                        <Route element={<div />} path="/" />
                        <Route element={<SeedingList />} path="seeding" />
                    </Routes>
                </main>
            </BrowserRouter>
        </div>
    </Flowbite>
);
