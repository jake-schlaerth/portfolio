interface ProjectDescriptionProps {
  className?: string;
}

export const ProjectDescription = ({
  className = "",
}: ProjectDescriptionProps) => {
  return (
    <div className={`text-center max-w-2xl mx-auto mb-12 ${className}`}>
      <p>
        this is a full-stack collaborative whiteboard application built with
        rust and react. the backend uses axum and websockets to handle real-time
        updates, while the frontend leverages react and typescript for a smooth
        drawing experience. each pen stroke is synchronized instantly across all
        connected users.
      </p>
      <p>
        the application persists a complete history of all whiteboard events in
        a postgres database. websocket connections ensure that every live change
        is broadcast to all participants in real-time, creating a collaborative
        environment for sketching, brainstorming, and sharing ideas.
      </p>
    </div>
  );
};
