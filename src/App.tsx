import React, { useState } from 'react';
import { Home, BarChart3, FileText, Calendar, Settings, User } from 'lucide-react';
import Dashboard from './components/Dashboard';
import HomePage from './components/Home';
import Reports from './components/Reports';
import CalendarPage from './components/CalendarPage';
import SettingsPage from './components/Settings';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sidebarItems = [
    { id: 'home', icon: Home, label: 'Home', component: HomePage },
    { id: 'dashboard', icon: BarChart3, label: 'Dashboard', component: Dashboard },
    { id: 'reports', icon: FileText, label: 'Reports', component: Reports },
    { id: 'calendar', icon: Calendar, label: 'Calendar', component: CalendarPage },
    { id: 'settings', icon: Settings, label: 'Settings', component: SettingsPage }
  ];

  const ActiveComponent = sidebarItems.find(item => item.id === activeTab)?.component || Dashboard;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-2 sm:p-4">
      <div className="max-w-[1400px] mx-auto bg-white rounded-xl sm:rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row min-h-[100vh] lg:h-[900px]">
          {/* Left Sidebar */}
          <div className="lg:w-20 w-full bg-gradient-to-b lg:bg-gradient-to-b bg-gradient-to-r from-purple-600 to-purple-700 flex lg:flex-col flex-row items-center py-4 lg:py-6 px-4 lg:px-0">
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center cursor-pointer hover:bg-purple-400 transition-colors"
            >
              <div className="w-5 h-5 bg-white rounded-full"></div>
            </button>
            
            {/* Desktop Logo */}
            <div className="hidden lg:flex w-12 h-12 bg-purple-500 rounded-xl items-center justify-center mb-8 cursor-pointer hover:bg-purple-400 transition-colors">
              <div className="w-6 h-6 bg-white rounded-full"></div>
            </div>
            
            {/* Navigation */}
            <nav className={`${isMobileMenuOpen ? 'flex' : 'hidden'} lg:flex flex-col lg:space-y-4 space-y-2 lg:flex-1 absolute lg:relative top-16 lg:top-0 left-0 lg:left-auto right-0 lg:right-auto bg-purple-700 lg:bg-transparent p-4 lg:p-0 rounded-b-xl lg:rounded-none shadow-lg lg:shadow-none z-50 lg:z-auto`}>
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full lg:w-12 h-12 rounded-xl flex items-center lg:justify-center justify-start px-4 lg:px-0 space-x-3 lg:space-x-0 transition-all group relative ${
                      isActive 
                        ? 'text-white bg-purple-500 shadow-lg' 
                        : 'text-purple-300 hover:text-white hover:bg-purple-500'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="lg:hidden text-sm font-medium">{item.label}</span>
                    <div className="hidden lg:block absolute left-16 bg-gray-900 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                      {item.label}
                    </div>
                  </button>
                );
              })}
            </nav>
            
            {/* Profile Button */}
            <button className="hidden lg:flex w-12 h-12 rounded-xl items-center justify-center text-purple-300 hover:text-white hover:bg-purple-500 transition-all group relative">
              <User size={20} />
              <div className="hidden lg:block absolute left-16 bg-gray-900 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                Profile
              </div>
            </button>
            
          </div>

          {/* Main Content */}
          <ActiveComponent />
        </div>
      </div>
    </div>
  );
}

export default App;