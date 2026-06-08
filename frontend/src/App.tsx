import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';

function App() {
return ( <BrowserRouter> <Routes>
<Route path="/" element={<Sidebar />}>
<Route index element={<Dashboard />} />
<Route path="students" element={<Students />} /> </Route> </Routes> </BrowserRouter>
);
}

export default App;
