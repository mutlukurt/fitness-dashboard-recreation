import React, { useState } from 'react';
import { User, Bell, Shield, Palette, Globe, Smartphone, Save, Eye, EyeOff } from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState({
    // Profile settings
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@example.com',
    phone: '+1 (555) 123-4567',
    bio: 'Fitness enthusiast and marathon runner',
    
    // Notification settings
    pushNotifications: true,
    emailNotifications: true,
    workoutReminders: true,
    goalAchievements: true,
    friendActivity: false,
    
    // Privacy settings
    profileVisibility: 'friends',
    activitySharing: true,
    locationSharing: false,
    
    // App settings
    theme: 'light',
    language: 'en',
    units: 'metric',
    
    // Goals
    dailySteps: 10000,
    weeklyWorkouts: 5,
    dailyWater: 8,
    sleepHours: 8
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'goals', label: 'Goals', icon: Smartphone }
  ];

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const saveSettings = () => {
    // Simulate saving settings
    alert('Settings saved successfully!');
  };

  const renderProfileTab = () => (
    <div className="space-y-4 lg:space-y-6">
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
        <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-xl lg:text-2xl">JS</span>
        </div>
        <div className="text-center sm:text-left">
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm">
            Change Photo
          </button>
          <p className="text-xs lg:text-sm text-gray-500 mt-1">JPG, PNG or GIF. Max size 2MB</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
          <input
            type="text"
            value={settings.firstName}
            onChange={(e) => updateSetting('firstName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
          <input
            type="text"
            value={settings.lastName}
            onChange={(e) => updateSetting('lastName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
        <input
          type="email"
          value={settings.email}
          onChange={(e) => updateSetting('email', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
        <input
          type="tel"
          value={settings.phone}
          onChange={(e) => updateSetting('phone', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
        <textarea
          value={settings.bio}
          onChange={(e) => updateSetting('bio', e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-4 lg:space-y-6">
      <div className="space-y-4">
        <h3 className="text-base lg:text-lg font-semibold text-gray-900">Push Notifications</h3>
        {[
          { key: 'pushNotifications', label: 'Enable push notifications', description: 'Receive notifications on your device' },
          { key: 'workoutReminders', label: 'Workout reminders', description: 'Get reminded about scheduled workouts' },
          { key: 'goalAchievements', label: 'Goal achievements', description: 'Celebrate when you reach your goals' },
          { key: 'friendActivity', label: 'Friend activity', description: 'See when friends complete workouts' }
        ].map((item) => (
          <div key={item.key} className="flex items-center justify-between p-3 lg:p-4 bg-gray-50 rounded-lg">
            <div>
              <div className="font-medium text-gray-900 text-sm lg:text-base">{item.label}</div>
              <div className="text-xs lg:text-sm text-gray-500">{item.description}</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings[item.key as keyof typeof settings] as boolean}
                onChange={(e) => updateSetting(item.key, e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-10 h-5 lg:w-11 lg:h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 lg:after:h-5 lg:after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="text-base lg:text-lg font-semibold text-gray-900">Email Notifications</h3>
        <div className="flex items-center justify-between p-3 lg:p-4 bg-gray-50 rounded-lg">
          <div>
            <div className="font-medium text-gray-900 text-sm lg:text-base">Email notifications</div>
            <div className="text-xs lg:text-sm text-gray-500">Receive weekly progress reports via email</div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.emailNotifications}
              onChange={(e) => updateSetting('emailNotifications', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-10 h-5 lg:w-11 lg:h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 lg:after:h-5 lg:after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
          </label>
        </div>
      </div>
    </div>
  );

  const renderPrivacyTab = () => (
    <div className="space-y-4 lg:space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Profile Visibility</label>
        <select
          value={settings.profileVisibility}
          onChange={(e) => updateSetting('profileVisibility', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
        >
          <option value="public">Public</option>
          <option value="friends">Friends Only</option>
          <option value="private">Private</option>
        </select>
      </div>

      <div className="space-y-4">
        {[
          { key: 'activitySharing', label: 'Activity Sharing', description: 'Allow friends to see your workout activities' },
          { key: 'locationSharing', label: 'Location Sharing', description: 'Share your workout locations with friends' }
        ].map((item) => (
          <div key={item.key} className="flex items-center justify-between p-3 lg:p-4 bg-gray-50 rounded-lg">
            <div>
              <div className="font-medium text-gray-900 text-sm lg:text-base">{item.label}</div>
              <div className="text-xs lg:text-sm text-gray-500">{item.description}</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings[item.key as keyof typeof settings] as boolean}
                onChange={(e) => updateSetting(item.key, e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-10 h-5 lg:w-11 lg:h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 lg:after:h-5 lg:after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAppearanceTab = () => (
    <div className="space-y-4 lg:space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-4">
          {['light', 'dark', 'auto'].map((theme) => (
            <button
              key={theme}
              onClick={() => updateSetting('theme', theme)}
              className={`p-3 lg:p-4 border-2 rounded-lg text-center capitalize transition-colors text-sm ${
                settings.theme === theme
                  ? 'border-purple-500 bg-purple-50 text-purple-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {theme}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
        <select
          value={settings.language}
          onChange={(e) => updateSetting('language', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
        >
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Units</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
          {['metric', 'imperial'].map((unit) => (
            <button
              key={unit}
              onClick={() => updateSetting('units', unit)}
              className={`p-3 lg:p-4 border-2 rounded-lg text-center capitalize transition-colors text-sm ${
                settings.units === unit
                  ? 'border-purple-500 bg-purple-50 text-purple-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {unit}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderGoalsTab = () => (
    <div className="space-y-4 lg:space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Daily Steps Goal</label>
          <input
            type="number"
            value={settings.dailySteps}
            onChange={(e) => updateSetting('dailySteps', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Weekly Workouts</label>
          <input
            type="number"
            value={settings.weeklyWorkouts}
            onChange={(e) => updateSetting('weeklyWorkouts', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Daily Water (glasses)</label>
          <input
            type="number"
            value={settings.dailyWater}
            onChange={(e) => updateSetting('dailyWater', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Sleep Hours</label>
          <input
            type="number"
            value={settings.sleepHours}
            onChange={(e) => updateSetting('sleepHours', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
          />
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileTab();
      case 'notifications':
        return renderNotificationsTab();
      case 'privacy':
        return renderPrivacyTab();
      case 'appearance':
        return renderAppearanceTab();
      case 'goals':
        return renderGoalsTab();
      default:
        return renderProfileTab();
    }
  };

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 lg:mb-8 space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-sm sm:text-base text-gray-600">Manage your account and app preferences</p>
        </div>
        <button
          onClick={saveSettings}
          className="flex items-center justify-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm w-full sm:w-auto"
        >
          <Save size={18} />
          <span>Save Changes</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
        {/* Settings Navigation */}
        <div className="lg:space-y-2">
          {/* Mobile Tabs */}
          <div className="lg:hidden mb-6">
            <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'bg-white text-purple-700 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Icon size={16} />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
          
          {/* Desktop Sidebar */}
          <div className="hidden lg:block space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors text-sm lg:text-base ${
                  activeTab === tab.id
                    ? 'bg-purple-100 text-purple-700 border border-purple-200'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl lg:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-gray-100">
            <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4 lg:mb-6">
              {tabs.find(tab => tab.id === activeTab)?.label}
            </h2>
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
}