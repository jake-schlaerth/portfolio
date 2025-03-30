import { Layout } from "../../components";

export const Music = () => {
  return (
    <Layout>
      <div className="flex flex-col gap-12 p-16 mx-auto min-w-lg">
        <iframe
          className="w-[600px] h-[450px] border-0"
          src="https://www.youtube.com/embed/BdtLK9pAh5k?si=Camjyvj7vEg1Q944"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
        <iframe
          className="w-[600px] h-[450px] border-0"
          src="https://www.youtube.com/embed/6wTo_8-kz3k?si=aW-pF67RYkxyVxLE"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
        <div className="flex justify-center">
          <iframe
            className="border-0 w-[350px] h-[470px]"
            src="https://bandcamp.com/EmbeddedPlayer/album=305360011/size=large/bgcol=333333/linkcol=ffffff/tracklist=false/transparent=true/"
            seamless
          />
        </div>
      </div>
    </Layout>
  );
};
