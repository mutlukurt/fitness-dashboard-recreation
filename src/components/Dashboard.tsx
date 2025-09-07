import React, { useState, useEffect } from 'react';
import { Search, Activity, Target, Bike, Users, MapPin, MessageCircle } from 'lucide-react';

interface Friend {
  id: number;
  name: string;
  status: string;
  avatar: string;
  color: string;
  isOnline: boolean;
  lastActive: string;
}

interface ActivityCard {
  id: number;
  title: string;
  duration: string;
  frequency: string;
  progress: number;
  timeSpent: string;
  timeLeft: string;
  icon: React.ReactNode;
  iconBg: string;
  progressColor: string;
}

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [timeFilter, setTimeFilter] = useState('Monthly');
  const [friendsFilter, setFriendsFilter] = useState('Activities');
  const [currentSteps, setCurrentSteps] = useState(9178);
  const [goalSteps] = useState(9200);
  const [activeTime, setActiveTime] = useState(748);

  const friends: Friend[] = [
    { id: 1, name: "Max Stone", status: "5 min ago", avatar: "MS", color: "from-blue-400 to-blue-500", isOnline: true, lastActive: "5 min ago" },
    { id: 2, name: "Grisha Jack", status: "10 min ago", avatar: "GJ", color: "from-orange-400 to-orange-500", isOnline: true, lastActive: "10 min ago" },
    { id: 3, name: "Levi Patrick", status: "3 hours ago", avatar: "LP", color: "from-green-400 to-green-500", isOnline: false, lastActive: "3 hours ago" },
    { id: 4, name: "Cody Bryan", status: "1 day ago", avatar: "CB", color: "from-red-400 to-red-500", isOnline: false, lastActive: "1 day ago" },
    { id: 5, name: "Max Stone", status: "2 days ago", avatar: "MS", color: "from-purple-400 to-purple-500", isOnline: false, lastActive: "2 days ago" }
  ];

  const [activities, setActivities] = useState<ActivityCard[]>([
    {
      id: 1,
      title: "Bicycle Drill",
      duration: "40 min",
      frequency: "3 days a week",
      progress: 45,
      timeSpent: "17.3 Min",
      timeLeft: "2 days left",
      icon: <Bike size={20} />,
      iconBg: "bg-blue-100",
      progressColor: "from-green-400 to-green-500"
    },
    {
      id: 2,
      title: "Jogging Hero",
      duration: "20 min",
      frequency: "1 week",
      progress: 13,
      timeSpent: "2.1 Days",
      timeLeft: "6 days left",
      icon: <Activity size={20} />,
      iconBg: "bg-orange-100",
      progressColor: "from-orange-400 to-orange-500"
    },
    {
      id: 3,
      title: "Healthy Busy",
      duration: "1000 steps",
      frequency: "3 weeks",
      progress: 90,
      timeSpent: "2000/3000 steps",
      timeLeft: "3 days left",
      icon: <Target size={20} />,
      iconBg: "bg-green-100",
      progressColor: "from-green-400 to-green-500"
    }
  ]);

  const filteredFriends = friends.filter(friend => {
    const matchesSearch = friend.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = friendsFilter === 'Activities' || 
                         (friendsFilter === 'Online' && friend.isOnline);
    return matchesSearch && matchesFilter;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSteps(prev => {
        const newSteps = prev + Math.floor(Math.random() * 5);
        return newSteps > goalSteps ? goalSteps : newSteps;
      });
      
      setActiveTime(prev => prev + Math.floor(Math.random() * 2));
    }, 5000);

    return () => clearInterval(interval);
  }, [goalSteps]);

  const updateActivityProgress = (id: number, increment: number) => {
    setActivities(prev => prev.map(activity => 
      activity.id === id 
        ? { ...activity, progress: Math.min(100, Math.max(0, activity.progress + increment)) }
        : activity
    ));
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const getStepsPercentage = () => {
    return Math.min(100, (currentSteps / goalSteps) * 100);
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row">
      <div className="flex-1 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 lg:mb-8 space-y-4 sm:space-y-0">
          <div>
            <p className="text-xs sm:text-sm text-gray-500 mb-1">{getGreeting()}</p>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Dashboard</h1>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-3 py-2 bg-gray-100 rounded-xl border-0 focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all w-full sm:w-48 lg:w-64 text-sm"
              />
            </div>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
              <span className="text-white font-semibold text-sm">JS</span>
            </div>
          </div>
        </div>

        {/* Overview Section */}
        <div className="mb-6 lg:mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 lg:mb-6 space-y-2 sm:space-y-0">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Overview</h2>
            <div className="bg-purple-100 rounded-lg px-3 py-1.5 sm:px-4 sm:py-2">
              <select 
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="bg-transparent text-purple-700 font-medium border-0 focus:ring-0 cursor-pointer text-sm"
              >
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
                <option>Yearly</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
            {/* Steps Chart Card */}
            <div className="lg:col-span-2 bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl lg:rounded-3xl p-4 sm:p-6 text-white relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <span className="text-purple-200">Steps</span>
                  <div className="w-4 h-4 bg-red-400 rounded-full animate-pulse"></div>
                </div>
                
                {/* Chart Area */}
                <div className="mb-4 sm:mb-6 h-16 sm:h-20 relative">
                  <svg viewBox="0 0 300 60" className="w-full h-full">
                    <path
                      d="M10,40 Q50,25 80,35 T150,30 T220,25 T290,35"
                      stroke="rgba(255,255,255,0.6)"
                      strokeWidth="2"
                      fill="none"
                    />
                    <circle cx="150" cy="30" r="4" fill="#ef4444" />
                  </svg>
                  <div className="absolute bottom-0 flex justify-between text-xs text-purple-300 w-full px-2">
                    <span>Jan</span>
                    <span>Feb</span>
                    <span>Mar</span>
                    <span>Apr</span>
                    <span>May</span>
                    <span>Jun</span>
                    <span>Jul</span>
                    <span>Aug</span>
                    <span>Sep</span>
                    <span>Oct</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center sm:text-left">
                  <div>
                    <p className="text-purple-200 text-xs sm:text-sm">Active Time</p>
                    <p className="text-lg sm:text-2xl font-bold">{activeTime} Hr</p>
                  </div>
                  <div>
                    <p className="text-purple-200 text-xs sm:text-sm">Total Steps</p>
                    <p className="text-lg sm:text-2xl font-bold">{currentSteps.toLocaleString()} St</p>
                  </div>
                  <div>
                    <p className="text-lg sm:text-2xl font-bold">{goalSteps.toLocaleString()} St</p>
                    <p className="text-purple-200 text-xs sm:text-sm">Goal</p>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="mt-3 sm:mt-4">
                  <div className="w-full bg-purple-800 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-pink-400 to-red-400 h-2 rounded-full transition-all duration-1000"
                      style={{width: `${getStepsPercentage()}%`}}
                    ></div>
                  </div>
                  <p className="text-purple-200 text-xs mt-1">{getStepsPercentage().toFixed(1)}% of daily goal</p>
                </div>
              </div>
            </div>

            {/* Activity Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 lg:gap-4 lg:space-y-0">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl lg:rounded-3xl p-4 lg:p-6 text-white relative cursor-pointer hover:scale-105 transition-transform">
                <div className="flex items-center justify-between mb-3 lg:mb-4">
                  <Activity size={24} />
                  <button className="text-white/70 hover:text-white transition-colors">
                    <span className="text-lg lg:text-xl">→</span>
                  </button>
                </div>
                <h3 className="font-semibold mb-1 text-sm lg:text-base">Daily Jogging</h3>
                <p className="text-purple-200 text-xs lg:text-sm">30 min • 4 days a week</p>
              </div>

              <div className="bg-gradient-to-br from-pink-500 to-red-500 rounded-2xl lg:rounded-3xl p-4 lg:p-6 text-white relative cursor-pointer hover:scale-105 transition-transform">
                <div className="flex items-center justify-between mb-3 lg:mb-4">
                  <Target size={24} />
                  <button className="text-white/70 hover:text-white transition-colors">
                    <span className="text-lg lg:text-xl">→</span>
                  </button>
                </div>
                <h3 className="font-semibold mb-1 text-sm lg:text-base">My Jogging</h3>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-pink-200 text-xs lg:text-sm">Total Time</p>
                    <p className="text-lg lg:text-2xl font-bold">{activeTime} hr</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {activities.map((activity) => (
            <div key={activity.id} className="bg-white rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3 lg:mb-4">
                <div className={`w-10 h-10 lg:w-12 lg:h-12 ${activity.iconBg} rounded-xl flex items-center justify-center`}>
                  <div className="text-blue-600">{activity.icon}</div>
                </div>
                <div className="flex space-x-1">
                  <button 
                    onClick={() => updateActivityProgress(activity.id, -5)}
                    className="text-gray-400 hover:text-red-500 transition-colors px-1"
                    title="Decrease progress"
                  >
                    -
                  </button>
                  <button 
                    onClick={() => updateActivityProgress(activity.id, 5)}
                    className="text-gray-400 hover:text-green-500 transition-colors px-1"
                    title="Increase progress"
                  >
                    +
                  </button>
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1 text-sm lg:text-base">{activity.title}</h3>
              <p className="text-xs lg:text-sm text-gray-500 mb-3 lg:mb-4">{activity.duration} • {activity.frequency}</p>
              
              <div className="mb-2 lg:mb-3">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-semibold text-gray-900">{activity.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`bg-gradient-to-r ${activity.progressColor} h-2 rounded-full transition-all duration-500`}
                    style={{width: `${activity.progress}%`}}
                  ></div>
                </div>
              </div>
              
              <div className="flex justify-between text-xs lg:text-sm text-gray-600">
                <span>{activity.timeSpent}</span>
                <span className="text-pink-500 font-medium">{activity.timeLeft}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-full lg:w-80 bg-gray-50 p-4 lg:p-6 border-t lg:border-t-0 lg:border-l border-gray-200">
        {/* Friends Section */}
        <div className="mb-6 lg:mb-8">
          <div className="flex items-center justify-between mb-4 lg:mb-6">
            <div className="flex items-center space-x-2">
              <Users className="text-gray-600" size={20} />
              <h3 className="font-semibold text-gray-900 text-sm lg:text-base">Friends</h3>
            </div>
            <button className="text-purple-600 text-xs lg:text-sm font-medium hover:text-purple-700 transition-colors">
              View all
            </button>
          </div>
          
          <div className="flex space-x-2 lg:space-x-3 mb-4 lg:mb-6">
            <button 
              onClick={() => setFriendsFilter('Activities')}
              className={`px-3 py-1.5 lg:px-4 lg:py-2 rounded-lg font-medium transition-colors text-xs lg:text-sm ${
                friendsFilter === 'Activities' 
                  ? 'bg-purple-600 text-white' 
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              Activities
            </button>
            <button 
              onClick={() => setFriendsFilter('Online')}
              className={`px-3 py-1.5 lg:px-4 lg:py-2 rounded-lg font-medium transition-colors text-xs lg:text-sm ${
                friendsFilter === 'Online' 
                  ? 'bg-purple-600 text-white' 
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              Online ({friends.filter(f => f.isOnline).length})
            </button>
          </div>
          
          <div className="space-y-3 lg:space-y-4 max-h-48 lg:max-h-64 overflow-y-auto">
            {filteredFriends.map((friend) => (
              <div key={friend.id} className="flex items-center justify-between hover:bg-white rounded-lg p-2 lg:p-2 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br ${friend.color} rounded-xl flex items-center justify-center relative`}>
                    <span className="text-white font-semibold text-xs lg:text-sm">{friend.avatar}</span>
                    {friend.isOnline && (
                      <div className="absolute -bottom-0.5 -right-0.5 lg:-bottom-1 lg:-right-1 w-2.5 h-2.5 lg:w-3 lg:h-3 bg-green-400 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm lg:text-base">{friend.name}</p>
                    <p className="text-xs lg:text-sm text-gray-500">{friend.status}</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-purple-600 transition-colors">
                  <MessageCircle size={16} className="lg:w-[18px] lg:h-[18px]" />
                </button>
              </div>
            ))}
            {filteredFriends.length === 0 && (
              <p className="text-gray-500 text-center py-4 text-sm">No friends found</p>
            )}
          </div>
        </div>

        {/* Live Map Section */}
        <div>
          <div className="flex items-center justify-between mb-3 lg:mb-4">
            <div className="flex items-center space-x-2">
              <MapPin className="text-gray-600" size={20} />
              <h3 className="font-semibold text-gray-900 text-sm lg:text-base">Live map</h3>
            </div>
            <button className="text-purple-600 text-xs lg:text-sm font-medium hover:text-purple-700 transition-colors">
              View
            </button>
          </div>
          
          <div className="bg-gray-200 rounded-xl lg:rounded-2xl h-32 lg:h-40 relative overflow-hidden cursor-pointer hover:bg-gray-300 transition-colors">
            <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100">
              {/* Map placeholder with user avatars */}
              <div className="absolute top-2 left-2 lg:top-4 lg:left-4 w-6 h-6 lg:w-8 lg:h-8 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full flex items-center justify-center animate-pulse">
                <span className="text-white font-bold text-xs">MS</span>
              </div>
              <div className="absolute top-8 right-4 lg:top-12 lg:right-8 w-6 h-6 lg:w-8 lg:h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center animate-pulse">
                <span className="text-white font-bold text-xs">GJ</span>
              </div>
              <div className="absolute bottom-4 left-4 lg:bottom-8 lg:left-8 w-6 h-6 lg:w-8 lg:h-8 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center animate-pulse">
                <span className="text-white font-bold text-xs">LP</span>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/80 rounded-lg px-2 py-1 lg:px-3 lg:py-1 text-xs lg:text-sm text-gray-700">
                  3 friends nearby
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}