import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const Sidebar = () => {
return (
<div style={{ display: 'flex' }}>
<aside style={{ width: '250px', padding: '1rem' }}> <h2>Student Management</h2>

```
    <nav>
      <ul>
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/students">Students</Link>
        </li>
      </ul>
    </nav>
  </aside>

  <main style={{ flex: 1, padding: '1rem' }}>
    <Outlet />
  </main>
</div>
```

);
};

export default Sidebar;
