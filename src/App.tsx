import { Payout } from './pages/Payout';
import { Navigation } from '@/components/Navigation';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Home } from '@/pages/Home';
import { Seeding } from '@/pages/Seeding';
import { Settings } from '@/pages/Settings';
import { ThemeProvider } from '@/providers/theme.provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export const App = () => {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <ThemeProvider defaultTheme="system">
                    <div className="absolute right-4 z-50">
                        <ThemeToggle />
                    </div>
                    <div className="h-auto container">
                        <Navigation />
                        <Routes>
                            <Route element={<Payout />} path="/payout" />
                            <Route element={<Seeding />} path="/seeding" />
                            <Route element={<Settings />} path="/settings" />
                            <Route element={<Home />} path="*" />
                        </Routes>
                    </div>
                </ThemeProvider>
            </BrowserRouter>
        </QueryClientProvider>
    );
};
