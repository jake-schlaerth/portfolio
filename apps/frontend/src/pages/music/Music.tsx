import { useLayoutEffect, useRef, useState } from "react";
import { Layout } from "../../components";

// Bandcamp's embedded player is a fixed-size document, not a responsive one.
// At its native size it overflows a phone screen and only the cover art
// (the left edge) ends up visible, cutting off the tracklist. Scale the
// whole iframe down to fit narrow viewports instead of letting it overflow.
const EMBED_WIDTH = 600;
const EMBED_HEIGHT = 1003;

export const Music = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateScale = () => {
      setScale(Math.min(1, container.clientWidth / EMBED_WIDTH));
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <Layout>
      <div
        style={{
          width: "100%",
          maxWidth: EMBED_WIDTH + 32,
          paddingInline: 16,
          boxSizing: "border-box",
        }}
      >
        <div
          ref={containerRef}
          style={{ width: "100%", maxWidth: EMBED_WIDTH, height: EMBED_HEIGHT * scale }}
        >
          <iframe
            style={{
              border: 0,
              width: EMBED_WIDTH,
              height: EMBED_HEIGHT,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
            }}
            src="https://bandcamp.com/EmbeddedPlayer/album=211853850/size=large/bgcol=181a1b/linkcol=056cc4/transparent=true/"
            seamless
            title="Pictures of Snakes"
          >
            <a href="https://picturesofsnakes.bandcamp.com/album/pictures-of-snakes">
              Pictures of Snakes
            </a>
          </iframe>
        </div>
      </div>
    </Layout>
  );
};
