import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { AuthModal } from './components/AuthModal';
import { ChatbotWidget } from './components/ChatbotWidget';

// Pages
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { DiseaseDetectionPage } from './pages/DiseaseDetectionPage';
import { CropLibraryPage } from './pages/CropLibraryPage';
import { KnowledgeCenterPage } from './pages/KnowledgeCenterPage';
import { WeatherPage } from './pages/WeatherPage';
import { MarketplacePage } from './pages/MarketplacePage';
import { ConsultationPage } from './pages/ConsultationPage';
import { ReportsPage } from './pages/ReportsPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';
import { AdminPanelPage } from './pages/AdminPanelPage';

const MainContent: React.FC = () => {
  const { activeTab } = useApp();

  const renderTab = () => {
    switch (activeTab) {
      case 'landing':
        return <LandingPage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'detection':
        return <DiseaseDetectionPage />;
      case 'crops':
        return <CropLibraryPage />;
      case 'knowledge':
        return <KnowledgeCenterPage />;
      case 'weather':
        return <WeatherPage />;
      case 'marketplace':
        return <MarketplacePage />;
      case 'consultation':
        return <ConsultationPage />;
      case 'reports':
        return <ReportsPage />;
      case 'profile':
        return <ProfilePage />;
      case 'settings':
        return <SettingsPage />;
      case 'admin':
        return <AdminPanelPage />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen bg-[#09100c] text-emerald-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-emerald-950">
      {/* Top Navbar */}
      <Navbar />

      <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6">
        {/* Sidebar Navigation (Hidden on Landing Page) */}
        {activeTab !== 'landing' && <Sidebar />}

        {/* Main Content Render */}
        <main className="flex-1 min-w-0">
          {renderTab()}
        </main>
      </div>

      {/* Floating 24/7 Multi-Modal AI Chatbot */}
      <ChatbotWidget />

      {/* Authentication Modal */}
      <AuthModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
