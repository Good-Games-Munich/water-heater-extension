import { SeedingList } from './components/SeedingList';
import { SidebarNavigation } from './components/SidebarNavigation';
import { Flowbite } from 'flowbite-react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export const App = () => (
    <Flowbite>
        <div className="mx-auto h-full min-h-screen w-full bg-background-light dark:bg-background-dark flex font-medium text-text-light dark:text-text-dark">
            <BrowserRouter>
                <SidebarNavigation />
                <div className="flex-grow p-10 ml-64">
                    <Routes>
                        <Route element={<div />} path="/" />
                        <Route element={<SeedingList />} path="seeding" />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    </Flowbite>
);
