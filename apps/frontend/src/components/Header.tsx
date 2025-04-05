import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <>
      <h1 className="text-[#ff3e00] text-6xl font-thin leading-tight my-8">
        repo vulgarity analysis
      </h1>
      <nav className="bg-gray-800 text-gray-400 p-4 border-b border-gray-700">
        <div className="container mx-auto flex gap-6">
          <Link to="/" className="hover:text-[#ff3e00]">
            search
          </Link>
          <Link to="/favorites" className="hover:text-[#ff3e00]">
            favorites
          </Link>
        </div>
      </nav>
    </>
  );
};
