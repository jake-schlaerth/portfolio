import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="p-4 border-b border-white">
      <div className="flex justify-start gap-8">
        <Link
          to="/"
          className="text-white text-base lowercase hover:opacity-80"
        >
          home
        </Link>
        <Link
          to="/code"
          className="text-white text-base lowercase hover:opacity-80"
        >
          code
        </Link>
        <Link
          to="/music"
          className="text-white text-base lowercase hover:opacity-80"
        >
          music
        </Link>
        <Link
          to="/whiteboard"
          className="text-white text-base lowercase hover:opacity-80"
        >
          whiteboard
        </Link>
      </div>
    </nav>
  );
};
