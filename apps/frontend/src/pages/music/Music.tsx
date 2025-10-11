import { Layout } from "../../components";

export const Music = () => {
  return (
    <Layout>
      <iframe
        style={{ border: 0, width: "600px", height: "1003px" }}
        src="https://bandcamp.com/EmbeddedPlayer/album=211853850/size=large/bgcol=181a1b/linkcol=056cc4/transparent=true/"
        seamless
        title="Pictures of Snakes"
      >
        <a href="https://picturesofsnakes.bandcamp.com/album/pictures-of-snakes">
          Pictures of Snakes
        </a>
      </iframe>
    </Layout>
  );
};
