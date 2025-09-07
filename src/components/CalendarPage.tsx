import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Clock, MapPin, Users } from 'lucide-react';

interface WorkoutEvent {
  id: number;
  title: string;
  time: string;
  duration: string;
  type: 'workout' | 'rest' | 'nutrition';
  color: string;
  location?: string;
  participants?: number;
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAddEvent, setShowAddEvent] = useState(false);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Sample events data
  const events: { [key: string]: WorkoutEvent[] } = {
    '2024-01-15': [
      { id: 1, title: 'Morning Run', time: '07:00', duration: '30 min', type: 'workout', color: 'bg-blue-500', location: 'Central Park' },
      { id: 2, title: 'Strength Training', time: '18:00', duration: '45 min', type: 'workout', color: 'bg-green-500', location: 'Gym', participants: 3 }
    ],
    '2024-01-16': [
      { id: 3, title: 'Yoga Session', time: '08:00', duration: '60 min', type: 'workout', color: 'bg-purple-500', participants: 8 },
      { id: 4, title: 'Rest Day', time: 'All Day', duration: '', type: 'rest', color: 'bg-gray-400' }
    ],
    '2024-01-17': [
      { id: 5, title: 'HIIT Workout', time: '17:30', duration: '25 min', type: 'workout', color: 'bg-red-500', location: 'Home' }
    ],
    '2024-01-18': [
      { id: 6, title: 'Meal Prep', time: '10:00', duration: '2 hours', type: 'nutrition', color: 'bg-orange-500' },
      { id: 7, title: 'Evening Walk', time: '19:00', duration: '20 min', type: 'workout', color: 'bg-teal-500' }
    ]
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const formatDateKey = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date) => {
    return date.toDateString() === selectedDate.toDateString();
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dateKey = formatDateKey(date);
      const dayEvents = events[dateKey] || [];

      days.push(
        <div
          key={day}
          onClick={() => setSelectedDate(date)}
          className={`h-24 p-2 border border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
            isToday(date) ? 'bg-purple-50 border-purple-200' : ''
          } ${isSelected(date) ? 'ring-2 ring-purple-500' : ''}`}
        >
          <div className={`text-sm font-medium mb-1 ${
            isToday(date) ? 'text-purple-600' : 'text-gray-900'
          }`}>
            {day}
          </div>
          <div className="space-y-1">
            {dayEvents.slice(0, 2).map((event) => (
              <div
                key={event.id}
                className={`text-xs px-2 py-1 rounded text-white truncate ${event.color}`}
              >
                {event.time} {event.title}
              </div>
            ))}
            {dayEvents.length > 2 && (
              <div className="text-xs text-gray-500">+{dayEvents.length - 2} more</div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  const selectedDateEvents = events[formatDateKey(selectedDate)] || [];

  return (
    <div className="flex-1 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Fitness Calendar</h1>
          <p className="text-gray-600">Plan and track your workouts</p>
        </div>
        <button
          onClick={() => setShowAddEvent(true)}
          className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Plus size={18} />
          <span>Add Event</span>
        </button>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Calendar */}
        <div className="col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Calendar Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">
                {months[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => navigateMonth('prev')}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => setCurrentDate(new Date())}
                  className="px-3 py-1 text-sm bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors"
                >
                  Today
                </button>
                <button
                  onClick={() => navigateMonth('next')}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            {/* Days of Week Header */}
            <div className="grid grid-cols-7 border-b border-gray-100">
              {daysOfWeek.map((day) => (
                <div key={day} className="p-4 text-center text-sm font-medium text-gray-500 bg-gray-50">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7">
              {renderCalendarDays()}
            </div>
          </div>
        </div>

        {/* Event Details Sidebar */}
        <div className="space-y-6">
          {/* Selected Date Events */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {selectedDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
              })}
            </h3>
            
            {selectedDateEvents.length > 0 ? (
              <div className="space-y-4">
                {selectedDateEvents.map((event) => (
                  <div key={event.id} className="border border-gray-100 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className={`w-3 h-3 rounded-full ${event.color}`}></div>
                      <h4 className="font-medium text-gray-900">{event.title}</h4>
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Clock size={14} />
                        <span>{event.time}</span>
                        {event.duration && <span>• {event.duration}</span>}
                      </div>
                      
                      {event.location && (
                        <div className="flex items-center space-x-2">
                          <MapPin size={14} />
                          <span>{event.location}</span>
                        </div>
                      )}
                      
                      {event.participants && (
                        <div className="flex items-center space-x-2">
                          <Users size={14} />
                          <span>{event.participants} participants</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No events scheduled for this day</p>
            )}
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">This Week</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Workouts Planned</span>
                <span className="font-semibold text-gray-900">5</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Rest Days</span>
                <span className="font-semibold text-gray-900">2</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Duration</span>
                <span className="font-semibold text-gray-900">4h 30m</span>
              </div>
              <div className="pt-2 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Completion Rate</span>
                  <span className="font-semibold text-green-600">80%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">Morning Run</div>
                  <div className="text-sm text-gray-600">Tomorrow, 7:00 AM</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">Strength Training</div>
                  <div className="text-sm text-gray-600">Tomorrow, 6:00 PM</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Event Modal (placeholder) */}
      {showAddEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-96">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Event</h3>
            <p className="text-gray-600 mb-4">Event creation form would go here...</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowAddEvent(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowAddEvent(false)}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Add Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}