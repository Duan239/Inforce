import { useState } from 'react'
import './App.css'
import LoginPage from './components/Login/components/LoginPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UrlsPage from './components/UrlsTable/components/UrlsPage'
import { useAuthStore } from './stores/AuthStore'
import UserProfile from './features/UserProfile'
import AppSidebar from './features/AppSidebar'
import { SidebarProvider } from './components/ui/sidebar'
import { Sidebar } from 'lucide-react'
import UrlInfo from './components/UrlsTable/components/UrlInfo'
import AboutPage from './features/AboutPage'
import { Toaster } from 'sonner'

function App() {
  const { getUserId, getUsername, isAdmin, logout, token } = useAuthStore();

  return (
    <BrowserRouter>
      <SidebarProvider>
        <AppSidebar />
        {/* {getUserId() && <UserProfile />} */}
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/urls" element={<UrlsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="urls/:id" element={<UrlInfo />} />
        </Routes>
      </ SidebarProvider >

      <Toaster />
    </BrowserRouter>
  )
}
export default App
