import React from 'react';
import { Users, BookOpen, Tractor, BarChart2, MapPin, TrendingUp, Calendar } from 'lucide-react';

const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className="bg-white rounded-lg shadow p-5 border-l-4" style={{ borderLeftColor: color }}>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-semibold mt-1">{value}</p>
        </div>
        <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${color}20` }}>
          {React.cloneElement(icon, { size: 24, style: { color } })}
        </div>
      </div>
    </div>
  );
};

const RecentActivity = () => {
  const activities = [
    { id: 1, title: 'New farmer registered', time: '2 hours ago', icon: <Users size={16} className="text-blue-500" /> },
    { id: 2, title: 'Updated Crop Insurance Scheme', time: '5 hours ago', icon: <BookOpen size={16} className="text-green-500" /> },
    { id: 3, title: 'Added 3 new farming instruments', time: '1 day ago', icon: <Tractor size={16} className="text-orange-500" /> },
    { id: 4, title: 'Published article on organic farming', time: '2 days ago', icon: <BookOpen size={16} className="text-purple-500" /> },
  ];

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-5 py-4 border-b">
        <h3 className="text-lg font-medium">Recent Activity</h3>
      </div>
      <div className="divide-y">
        {activities.map((activity) => (
          <div key={activity.id} className="px-5 py-4 flex items-start">
            <div className="mr-3 mt-1">{activity.icon}</div>
            <div>
              <p className="text-sm font-medium">{activity.title}</p>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="px-5 py-3 border-t">
        <button className="text-sm text-green-600 font-medium hover:text-green-700">
          View all activity
        </button>
      </div>
    </div>
  );
};

const UpcomingEvents = () => {
  const events = [
    { id: 1, title: 'Farmer Training Workshop', date: 'June 15, 2025' },
    { id: 2, title: 'Agriculture Exhibition', date: 'June 22, 2025' },
    { id: 3, title: 'Seasonal Crop Planning Meeting', date: 'June 27, 2025' },
  ];

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-5 py-4 border-b">
        <h3 className="text-lg font-medium">Upcoming Events</h3>
      </div>
      <div className="divide-y">
        {events.map((event) => (
          <div key={event.id} className="px-5 py-4 flex items-start">
            <div className="mr-3 mt-1">
              <Calendar size={16} className="text-green-500" />
            </div>
            <div>
              <p className="text-sm font-medium">{event.title}</p>
              <p className="text-xs text-gray-500">{event.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const DashboardPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Welcome to your agriculture management dashboard</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Farmers"
          value="1,253"
          icon={<Users />}
          color="#3B82F6" // blue
        />
        <StatCard
          title="Active Schemes"
          value="27"
          icon={<BookOpen />}
          color="#10B981" // green
        />
        <StatCard
          title="Farm Instruments"
          value="84"
          icon={<Tractor />}
          color="#F59E0B" // amber
        />
        <StatCard
          title="District Coverage"
          value="32"
          icon={<MapPin />}
          color="#8B5CF6" // purple
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Farmer Registration Trend</h3>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp size={16} className="mr-1" />
              <span>12% increase</span>
            </div>
          </div>
          <div className="h-60 flex items-center justify-center bg-gray-50 rounded">
            <BarChart2 size={40} className="text-gray-300" />
            <p className="ml-2 text-gray-500">Farmer registration chart</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Scheme Distribution</h3>
            <select className="text-sm border rounded px-2 py-1">
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>Last year</option>
            </select>
          </div>
          <div className="h-60 flex items-center justify-center bg-gray-50 rounded">
            <BarChart2 size={40} className="text-gray-300" />
            <p className="ml-2 text-gray-500">Scheme distribution chart</p>
          </div>
        </div>
      </div>

      {/* Activity and Events */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
        <div>
          <UpcomingEvents />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;