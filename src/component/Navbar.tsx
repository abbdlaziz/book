import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-blue-700 text-white px-4 py-3 flex gap-6">
            <Link to="/" className="hover:underline">Books</Link>
            <Link to="/authors" className="hover:underline">Authors</Link>
            <Link to="/members" className="hover:underline">Members</Link>
            <Link to="/borrowed" className="hover:underline">Borrowed Books</Link>
        </nav>
    );
};

export default Navbar;