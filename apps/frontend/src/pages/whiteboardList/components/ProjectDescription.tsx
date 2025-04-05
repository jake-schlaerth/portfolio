interface ProjectDescriptionProps {
  className?: string;
}

export const ProjectDescription = ({
  className = "",
}: ProjectDescriptionProps) => {
  return (
    <div className={`max-w-2xl mx-auto mb-12 ${className}`}>
      <p>
        this is a full-stack collaborative whiteboard application built with
        rust and react. the backend uses axum and websockets to handle real-time
        updates, while the frontend leverages react and the html canvas element
        for a smooth drawing experience.
      </p>
      <br />
      <p>
        the application persists whiteboard history in a postgres database.
        websocket connections ensure that every live change is broadcast to all
        participants in real-time.
      </p>
    </div>
  );
};
