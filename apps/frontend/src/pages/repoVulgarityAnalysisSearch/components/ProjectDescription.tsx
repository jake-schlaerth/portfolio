import { Link } from "react-router-dom";

interface ProjectDescriptionProps {
  className?: string;
}

export const ProjectDescription = ({
  className = "",
}: ProjectDescriptionProps) => {
  return (
    <div className={`max-w-2xl mx-auto mb-12 ${className}`}>
      <p>
        profanity can be funny. this is a full-stack application that analyzes
        git repositories for profane commit messages. i've analyzed thousands of
        open source projects and catalogued any commits with profane messages.
      </p>
      <br />
      <p>
        the application persists all analyzed commits in a postgres database
        with optimized text search capabilities. users can search for specific
        profanities and view direct links to the original commits on github.
      </p>
      <br />
      <p>
        <Link to="/repo-vulgarity-analysis/curated-results">
          here are some of my favorites
        </Link>
      </p>
    </div>
  );
};
