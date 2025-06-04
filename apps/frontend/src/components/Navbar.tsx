import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="p-4 border-b border-white">
      <div className="flex flex-col sm:flex-row justify-start gap-2 sm:gap-4 lg:gap-8">
        <Link to="/" className="hover:opacity-80">
          home
        </Link>
        <Link to="/code" className="hover:opacity-80">
          code
        </Link>
        <Link to="/music" className="hover:opacity-80">
          music
        </Link>
        <Link to="/whiteboard" className="hover:opacity-80">
          whiteboard
        </Link>
        <Link to="/repo-vulgarity-analysis/search" className="hover:opacity-80">
          <span className="sm:hidden">repo analysis</span>
          <span className="hidden sm:inline">repo vulgarity analysis</span>
        </Link>
        <Link to="/vfx-renderer" className="hover:opacity-80">
          vfx renderer
        </Link>
      </div>
    </nav>
  );
};
