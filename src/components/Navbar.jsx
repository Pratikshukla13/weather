import React from 'react';

function Navbar({ setSelectedView, onSearch }) {
  return (
    <div className="navbar bg-base-100 shadow-md">
      <div className="flex-1">
        <a href="/" className="btn btn-ghost normal-case text-xl">Weather App</a>
      </div>

      {/* Search Bar */}
      <div className="form-control flex-1 max-w-lg mx-4">
        <input 
          type="text" 
          placeholder="Search city..." 
          className="input input-bordered w-full md:w-auto lg:w-96" 
          aria-label="Search"
          onChange={(e) => onSearch(e.target.value)}  // Sends search input to parent component
        />
      </div>

      {/* Buttons for Weather Options */}
      <div className="flex-none gap-2">
        <div className="flex space-x-2">
          <button className="btn btn-outline" onClick={() => setSelectedView('today')}>Today</button>
          <button className="btn btn-outline" onClick={() => setSelectedView('tomorrow')}>Tomorrow</button>
          <button className="btn btn-outline" onClick={() => setSelectedView('thisWeek')}>This Week</button>
          {/*<button className="btn btn-outline" onClick={() => setSelectedView('aqi')}>AQI</button>*/}
        </div>

        {/* User Avatar Dropdown */}
        <div className="dropdown dropdown-end">
          <button tabIndex={0} className="btn btn-ghost btn-circle avatar" aria-label="Profile">
            <div className="w-10 rounded-full">
              <img
                alt="User avatar"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" 
              />
            </div>
          </button>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li><a href="/profile">Profile</a></li>
            <li><a href="/settings">Settings</a></li>
            <li><a href="/logout">Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
