import dynamic from "next/dynamic";

import { InternalLink } from "./components";
import { WebSocketClient } from "./components/WebSocket";

const AnalyticsMap = dynamic(
  () => import("./components/analyticsMap/AnalyticsMap"),
  {
    loading: () => <p>loading...</p>,
    ssr: false,
  }
);

const Home = () => (
  <>
    <WebSocketClient />
    <p>hi i&apos;m jake</p>
    <p className="mb-3">
      i write <InternalLink href="/code">code</InternalLink> and make{" "}
      <InternalLink href="/music">music</InternalLink>
    </p>

    <AnalyticsMap />
  </>
);

export default Home;
