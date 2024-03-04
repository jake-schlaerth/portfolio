import dynamic from "next/dynamic";

import { Subtitle, Title, InternalLink } from "./components";
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
    <h1>hi i&apos;m jake</h1>
    <h2 className="mb-10">
      i write <InternalLink href="/code">code</InternalLink> and make{" "}
      <InternalLink href="/music">music</InternalLink>
    </h2>
    <h2 className="mb-5">
      this a real-time map of people who have viewed my site
    </h2>
    <AnalyticsMap />
  </>
);

export default Home;
