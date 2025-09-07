import React, { useState } from 'react';
import { Home, BarChart3, FileText, Calendar, Settings, User } from 'lucide-react';
import Dashboard from './components/Dashboard';
import HomePage from './components/Home';
import Reports from './components/Reports';
import CalendarPage from './components/CalendarPage';
import SettingsPage from './components/Settings';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const sidebarItems = [
    { id: 'home', icon: Home, label: 'Home', component: HomePage },
    { id: 'dashboard', icon: BarChart3, label: 'Dashboard', component: Dashboard },
    { id: 'reports', icon: FileText, label: 'Reports', component: Reports },
    { id: 'calendar', icon: Calendar, label: 'Calendar', component: CalendarPage },
    { id: 'settings', icon: Settings, label: 'Settings', component: SettingsPage }
  ];

  const ActiveComponent = sidebarItems.find(item => item.id === activeTab)?.component || Dashboard;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-4">
      <div className="max-w-[1400px] mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex h-[900px]">
          {/* Left Sidebar */}
          <div className="w-20 bg-gradient-to-b from-purple-600 to-purple-700 flex flex-col items-center py-6">
            <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-8 cursor-pointer hover:bg-purple-400 transition-colors">
              <div className="w-6 h-6 bg-white rounded-full"></div>
            </div>
            
            <nav className="flex flex-col space-y-4 flex-1">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all group relative ${
                      isActive 
                        ? 'text-white bg-purple-500 shadow-lg' 
                        : 'text-purple-300 hover:text-white hover:bg-purple-500'
                    }`}
                    title={item.label}
                  >
                    <Icon size={20} />
                    <div className="absolute left-16 bg-gray-900 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                      {item.label}
                    </div>
                  </button>
                );
              })}
            </nav>
            
            <button className="w-12 h-12 rounded-xl flex items-center justify-center text-purple-300 hover:text-white hover:bg-purple-500 transition-all group relative">
              <User size={20} />
              <div className="absolute left-16 bg-gray-900 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
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