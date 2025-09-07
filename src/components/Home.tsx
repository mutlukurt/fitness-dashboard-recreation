import React, { useState } from 'react';
import { Play, Pause, RotateCcw, Timer, Target, TrendingUp, Award } from 'lucide-react';

export default function Home() {
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);
  const [workoutTime, setWorkoutTime] = useState(0);
  const [selectedWorkout, setSelectedWorkout] = useState('cardio');

  const workoutTypes = [
    { id: 'cardio', name: 'Cardio', duration: '30 min', calories: '250 cal', icon: '🏃‍♂️' },
    { id: 'strength', name: 'Strength', duration: '45 min', calories: '180 cal', icon: '💪' },
    { id: 'yoga', name: 'Yoga', duration: '60 min', calories: '120 cal', icon: '🧘‍♀️' },
    { id: 'hiit', name: 'HIIT', duration: '20 min', calories: '300 cal', icon: '⚡' }
  ];

  const todayStats = [
    { label: 'Steps', value: '8,547', target: '10,000', percentage: 85, color: 'from-blue-400 to-blue-600' },
    { label: 'Calories', value: '1,247', target: '2,000', percentage: 62, color: 'from-red-400 to-red-600' },
    { label: 'Active Time', value: '2h 15m', target: '3h', percentage: 75, color: 'from-green-400 to-green-600' },
    { label: 'Water', value: '6 glasses', target: '8 glasses', percentage: 75, color: 'from-cyan-400 to-cyan-600' }
  ];

  const achievements = [
    { title: '7-Day Streak', description: 'Completed workouts for 7 days', icon: '🔥', earned: true },
    { title: 'Step Master', description: 'Reached 10,000 steps', icon: '👟', earned: true },
    { title: 'Early Bird', description: 'Morning workout completed', icon: '🌅', earned: false },
    { title: 'Hydration Hero', description: 'Drank 8 glasses of water', icon: '💧', earned: false }
  ];

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isWorkoutActive) {
      interval = setInterval(() => {
        setWorkoutTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isWorkoutActive]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const resetWorkout = () => {
    setIsWorkoutActive(false);
    setWorkoutTime(0);
  };

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Welcome Back!</h1>
        <p className="text-sm sm:text-base text-gray-600">Ready to crush your fitness goals today?</p>
      </div>

      {/* Quick Workout Section */}
      <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 text-white mb-6 lg:mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 lg:mb-6 space-y-3 sm:space-y-0">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-2">Quick Workout</h2>
            <p className="text-purple-200 text-sm sm:text-base">Start your fitness journey now</p>
          </div>
          <div className="text-right">
            <div className="text-2xl sm:text-3xl font-bold">{formatTime(workoutTime)}</div>
            <div className="text-purple-200 text-xs sm:text-sm">Workout Time</div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:gap-4 mb-4 lg:mb-6">
          {workoutTypes.map((workout) => (
            <button
              key={workout.id}
              onClick={() => setSelectedWorkout(workout.id)}
              className={`p-3 lg:p-4 rounded-xl lg:rounded-2xl transition-all ${
                selectedWorkout === workout.id
                  ? 'bg-white text-purple-700 shadow-lg'
                  : 'bg-purple-500 hover:bg-purple-400 text-white'
              }`}
            >
              <div className="text-xl lg:text-2xl mb-1 lg:mb-2">{workout.icon}</div>
              <div className="font-semibold text-xs lg:text-sm">{workout.name}</div>
              <div className="text-xs opacity-75">{workout.duration}</div>
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          <button
            onClick={() => setIsWorkoutActive(!isWorkoutActive)}
            className="bg-white text-purple-700 px-6 lg:px-8 py-2.5 lg:py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
          >
            {isWorkoutActive ? <Pause size={20} /> : <Play size={20} />}
            <span>{isWorkoutActive ? 'Pause' : 'Start'} Workout</span>
          </button>
          <button
            onClick={resetWorkout}
            className="bg-purple-500 hover:bg-purple-400 px-4 lg:px-6 py-2.5 lg:py-3 rounded-xl font-semibold transition-colors flex items-center justify-center space-x-2"
          >
            <RotateCcw size={20} />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Today's Progress */}
      <div className="mb-6 lg:mb-8">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 lg:mb-6">Today's Progress</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {todayStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-3 lg:mb-4">
                <h3 className="font-semibold text-gray-900 text-sm lg:text-base">{stat.label}</h3>
                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${stat.color}`}></div>
              </div>
              <div className="mb-2 lg:mb-2">
                <div className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-xs lg:text-sm text-gray-500">of {stat.target}</div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`bg-gradient-to-r ${stat.color} h-2 rounded-full transition-all duration-500`}
                  style={{width: `${stat.percentage}%`}}
                ></div>
              </div>
              <div className="text-xs text-gray-500 mt-1 lg:mt-1">{stat.percentage}% complete</div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div>
        <div className="flex items-center justify-between mb-4 lg:mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Achievements</h2>
          <button className="text-purple-600 text-xs lg:text-sm font-medium hover:text-purple-700 transition-colors">
            View All
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
          {achievements.map((achievement, index) => (
            <div key={index} className={`p-4 lg:p-6 rounded-xl lg:rounded-2xl border-2 transition-all ${
              achievement.earned 
                ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200' 
                : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-center space-x-3 lg:space-x-4">
                <div className={`text-2xl lg:text-3xl ${achievement.earned ? 'grayscale-0' : 'grayscale'}`}>
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <h3 className={`font-semibold text-sm lg:text-base ${achievement.earned ? 'text-gray-900' : 'text-gray-500'}`}>
                    {achievement.title}
                  </h3>
                  <p className={`text-xs lg:text-sm ${achievement.earned ? 'text-gray-600' : 'text-gray-400'}`}>
                    {achievement.description}
                  </p>
                </div>
                {achievement.earned && (
                  <Award className="text-yellow-500" size={20} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}