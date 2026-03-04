import './App.css'
import LoginPage from './components/Login/components/LoginPage'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import UrlsPage from './components/UrlsTable/components/UrlsPage'
import AppSidebar from './features/AppSidebar'
import { SidebarProvider } from './components/ui/sidebar'
import UrlInfo from './components/UrlsTable/components/UrlInfo'
import AboutPage from './features/AboutPage'
import { Toaster } from 'sonner'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
function App() {

  const queryClient = new QueryClient();


  return (


    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SidebarProvider>
          <AppSidebar />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/urls" element={<UrlsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="urls/:id" element={<UrlInfo />} />
            <Route path="*" element={<Navigate to="/urls" />} />
          </Routes>
        </ SidebarProvider >

        <Toaster />
      </BrowserRouter>
    </QueryClientProvider>
  )
}
export default App
