import dynamic from "next/dynamic";
import { useAtomValue } from "jotai";

import { InternalLink } from "./components";
import { WebSocketClient } from "./components/WebSocket";

const AnalyticsMap = dynamic(
  () => import("./components/analyticsMap/AnalyticsMap"),
  {
    loading: () => <p>loading...</p>,
    ssr: false,
  }
);

const Home = () => {
  const isAnalyticsEnabled = false;
  return (
    <>
      {isAnalyticsEnabled && <WebSocketClient />}
      <p>hi i&apos;m jake</p>
      <p className="mb-3">
        i write <InternalLink href="/code">code</InternalLink> and make{" "}
        <InternalLink href="/music">music</InternalLink>
      </p>

      {isAnalyticsEnabled && <AnalyticsMap />}
    </>
  );
};

export default Home;
