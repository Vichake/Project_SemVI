import React, { memo } from 'react';

// Reusable SVG icons
const UserIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2h5M12 12a4 4 0 100-8 4 4 0 000 8z" />
  </svg>
);

const BookIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 20h9M12 4h9M4 6h16M4 18h16M4 12h16" />
  </svg>
);

const TractorIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2 12h4l3 8h9l2-5h2" />
  </svg>
);

const MapPinIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c1.656 0 3-1.343 3-3S13.656 5 12 5s-3 1.343-3 3 1.344 3 3 3z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11v10" />
  </svg>
);

const TrendingUpIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="green" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 17l6-6 4 4 8-8" />
  </svg>
);

const BarChartIcon = () => (
  <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 4h10a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V9a2 2 0 012-2z" />
  </svg>
);

// Optimized StatCard
const StatCard = memo(({ title, value, icon, color }) => (
  <div className="bg-white rounded-lg shadow p-5 border-l-4" style={{ borderLeftColor: color }}>
    <div className="flex justify-between items-center">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-semibold mt-1">{value}</p>
      </div>
      <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${color}20` }}>
        <div style={{ color }}>
          {icon}
        </div>
      </div>
    </div>
  </div>
));

// Optimized RecentActivity
const RecentActivity = memo(() => {
  const activities = [
    { id: 1, title: 'New farmer registered', time: '2 hours ago', icon: <UserIcon /> },
    { id: 2, title: 'Updated Crop Insurance Scheme', time: '5 hours ago', icon: <BookIcon /> },
    { id: 3, title: 'Added 3 new farming instruments', time: '1 day ago', icon: <TractorIcon /> },
    { id: 4, title: 'Published article on organic farming', time: '2 days ago', icon: <BookIcon /> },
  ];

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-5 py-4 border-b">
        <h3 className="text-lg font-medium">Recent Activity</h3>
      </div>
      <div className="divide-y">
        {activities.map(({ id, title, time, icon }) => (
          <div key={id} className="px-5 py-4 flex items-start">
            <div className="mr-3 mt-1">{icon}</div>
            <div>
              <p className="text-sm font-medium">{title}</p>
              <p className="text-xs text-gray-500">{time}</p>
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
});

// Optimized UpcomingEvents
const UpcomingEvents = memo(() => {
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
        {events.map(({ id, title, date }) => (
          <div key={id} className="px-5 py-4 flex items-start">
            <div className="mr-3 mt-1"><CalendarIcon /></div>
            <div>
              <p className="text-sm font-medium">{title}</p>
              <p className="text-xs text-gray-500">{date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

// Dashboard
const DashboardPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Welcome to your agriculture management dashboard</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Farmers" value="1,253" icon={<UserIcon />} color="#3B82F6" />
        <StatCard title="Active Schemes" value="27" icon={<BookIcon />} color="#10B981" />
        <StatCard title="Farm Instruments" value="84" icon={<TractorIcon />} color="#F59E0B" />
        <StatCard title="District Coverage" value="32" icon={<MapPinIcon />} color="#8B5CF6" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Farmer Registration Trend</h3>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUpIcon />
              <span className="ml-1">12% increase</span>
            </div>
          </div>
          <div className="h-60 flex items-center justify-center bg-gray-50 rounded">
            <BarChartIcon />
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
            <BarChartIcon />
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
