import {BrowserRouter, Routes, Route, Link } from "react-router-dom"

//pages
import Databases from "my-app/pages/Databases"
import Create from "my-app/pages/Create"
import Update from "my-app/pages/Update"

function App() {
    return (
        <BrowserRouter>
        <nav>
            <h1>Database Home</h1>
            <Link to="/">Databases</Link>
            <Link to="/create">Create New Home Description</Link>
        </nav>
        <Routes>
            <Route path="/" element={<Databases />} />
            <Route path="/create" element={<Create />} />
            <Route path="/:id" element={<Update />} />
        </Routes>
        </BrowserRouter>
    );
}
