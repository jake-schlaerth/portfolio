import { Layout } from "../../components";

export const Music = () => {
  return (
    <Layout>
      <iframe
        className="w-[800px] h-[450px] border-0"
        src="https://www.youtube.com/embed/6wTo_8-kz3k?si=aW-pF67RYkxyVxLE"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </Layout>
  );
};
