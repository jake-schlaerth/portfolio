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
        rust and react. the backend uses axum while the frontend leverages react
        and the html canvas element.
      </p>
      <br />
      <p>
        the application persists whiteboard history in a postgres database.
        websocket connections broadcast real time updates to all participants.
      </p>
    </div>
  );
};
