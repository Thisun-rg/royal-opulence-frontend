import "./AdminDashboard.css";

export default function AdminDashboard() {
  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">ROYAL OPULENCE</h2>
        <ul>
          <li className="active">Dashboard</li>
          <li>Bookings</li>
          <li>Rooms</li>
          <li>Users</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main">
        <h1>Welcome, Admin</h1>

        {/* Stats */}
        <div className="stats">
          <div className="card">
            <h3>Total Bookings</h3>
            <p>482</p>
          </div>
          <div className="card">
            <h3>Rooms Available</h3>
            <p>51</p>
          </div>
          <div className="card">
            <h3>Pending Requests</h3>
            <p>12</p>
          </div>
        </div>

        {/* Table */}
        <section className="table-section">
          <h2>Recent Bookings</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Room</th>
                <th>Check-in</th>
                <th>Check-out</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Reved Imam</td>
                <td>Deluxe</td>
                <td>12 Dec</td>
                <td>14 Dec</td>
              </tr>
              <tr>
                <td>Conre Mwong</td>
                <td>Suite</td>
                <td>21 Dec</td>
                <td>23 Dec</td>
              </tr>
              <tr>
                <td>Nina Bockarem</td>
                <td>Standard</td>
                <td>25 Dec</td>
                <td>27 Dec</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
