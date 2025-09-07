import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Calendar, Download, Filter } from 'lucide-react';

export default function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [selectedMetric, setSelectedMetric] = useState('steps');

  const periods = [
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'quarter', label: 'This Quarter' },
    { id: 'year', label: 'This Year' }
  ];

  const metrics = [
    { id: 'steps', label: 'Steps', color: 'from-blue-400 to-blue-600' },
    { id: 'calories', label: 'Calories', color: 'from-red-400 to-red-600' },
    { id: 'distance', label: 'Distance', color: 'from-green-400 to-green-600' },
    { id: 'active_time', label: 'Active Time', color: 'from-purple-400 to-purple-600' }
  ];

  const weeklyData = [
    { day: 'Mon', steps: 8500, calories: 320, distance: 6.2, active_time: 45 },
    { day: 'Tue', steps: 12000, calories: 450, distance: 8.5, active_time: 65 },
    { day: 'Wed', steps: 9800, calories: 380, distance: 7.1, active_time: 52 },
    { day: 'Thu', steps: 11200, calories: 420, distance: 8.0, active_time: 58 },
    { day: 'Fri', steps: 10500, calories: 400, distance: 7.8, active_time: 55 },
    { day: 'Sat', steps: 15000, calories: 580, distance: 11.2, active_time: 85 },
    { day: 'Sun', steps: 7200, calories: 280, distance: 5.5, active_time: 38 }
  ];

  const summaryStats = [
    { 
      label: 'Total Steps', 
      value: '74,200', 
      change: '+12%', 
      trend: 'up',
      icon: '👟'
    },
    { 
      label: 'Calories Burned', 
      value: '2,830', 
      change: '+8%', 
      trend: 'up',
      icon: '🔥'
    },
    { 
      label: 'Distance Covered', 
      value: '54.3 km', 
      change: '+15%', 
      trend: 'up',
      icon: '📍'
    },
    { 
      label: 'Active Hours', 
      value: '6.5 hrs', 
      change: '-3%', 
      trend: 'down',
      icon: '⏱️'
    }
  ];

  const getMaxValue = (metric: string) => {
    return Math.max(...weeklyData.map(d => d[metric as keyof typeof d] as number));
  };

  const getMetricColor = (metric: string) => {
    return metrics.find(m => m.id === metric)?.color || 'from-gray-400 to-gray-600';
  };

  const exportReport = () => {
    // Simulate report export
    alert('Report exported successfully!');
  };

  return (
    <div className="flex-1 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Fitness Reports</h1>
          <p className="text-gray-600">Track your progress and analyze your performance</p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={exportReport}
            className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Download size={18} />
            <span>Export</span>
          </button>
          <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
            {periods.map((period) => (
              <button
                key={period.id}
                onClick={() => setSelectedPeriod(period.id)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  selectedPeriod === period.id
                    ? 'bg-white text-purple-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {summaryStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="text-2xl">{stat.icon}</div>
              <div className={`flex items-center space-x-1 text-sm font-medium ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                <span>{stat.change}</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Weekly Performance</h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter size={18} className="text-gray-400" />
              <select
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="bg-gray-100 border-0 rounded-lg px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-purple-500"
              >
                {metrics.map((metric) => (
                  <option key={metric.id} value={metric.id}>
                    {metric.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="h-64 flex items-end justify-between space-x-4">
          {weeklyData.map((data, index) => {
            const value = data[selectedMetric as keyof typeof data] as number;
            const maxValue = getMaxValue(selectedMetric);
            const height = (value / maxValue) * 100;
            
            return (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full flex flex-col items-center mb-2">
                  <div className="text-xs text-gray-600 mb-1">{value.toLocaleString()}</div>
                  <div 
                    className={`w-full bg-gradient-to-t ${getMetricColor(selectedMetric)} rounded-t-lg transition-all duration-500 hover:opacity-80 cursor-pointer`}
                    style={{ height: `${height}%`, minHeight: '20px' }}
                  ></div>
                </div>
                <div className="text-sm font-medium text-gray-700">{data.day}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-2 gap-6">
        {/* Goals Progress */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Goals Progress</h3>
          <div className="space-y-6">
            {[
              { goal: 'Daily Steps', current: 8547, target: 10000, unit: 'steps' },
              { goal: 'Weekly Workouts', current: 4, target: 5, unit: 'workouts' },
              { goal: 'Monthly Distance', current: 45.2, target: 60, unit: 'km' },
              { goal: 'Water Intake', current: 6, target: 8, unit: 'glasses' }
            ].map((item, index) => {
              const percentage = (item.current / item.target) * 100;
              return (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-900">{item.goal}</span>
                    <span className="text-sm text-gray-600">
                      {item.current} / {item.target} {item.unit}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-400 to-purple-600 h-2 rounded-full transition-all duration-500"
                      style={{width: `${Math.min(percentage, 100)}%`}}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{percentage.toFixed(0)}% complete</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Activity Breakdown */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Activity Breakdown</h3>
          <div className="space-y-4">
            {[
              { activity: 'Running', time: '2h 30m', percentage: 35, color: 'from-red-400 to-red-600' },
              { activity: 'Cycling', time: '1h 45m', percentage: 25, color: 'from-blue-400 to-blue-600' },
              { activity: 'Strength Training', time: '1h 20m', percentage: 20, color: 'from-green-400 to-green-600' },
              { activity: 'Yoga', time: '1h 10m', percentage: 15, color: 'from-purple-400 to-purple-600' },
              { activity: 'Other', time: '20m', percentage: 5, color: 'from-gray-400 to-gray-600' }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${item.color}`}></div>
                  <span className="font-medium text-gray-900">{item.activity}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">{item.time}</span>
                  <span className="text-sm font-medium text-gray-900 w-8">{item.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}