import { Navigation } from '@/components/Navigation';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Home } from '@/pages/Home';
import { Seeding } from '@/pages/Seeding';
import { ThemeProvider } from '@/providers/theme.provider';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export const App = () => (
    <BrowserRouter>
        <ThemeProvider defaultTheme="system">
            <div className="absolute right-4 z-50">
                <ThemeToggle />
            </div>
            <div className="h-auto container">
                <Navigation />
                <Routes>
                    <Route element={<Seeding />} path="/seeding" />
                    <Route element={<Home />} path="*" />
                </Routes>
            </div>
        </ThemeProvider>
    </BrowserRouter>
);
