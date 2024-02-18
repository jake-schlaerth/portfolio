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
    <Title>hi i&apos;m jake</Title>
    <Subtitle className="mb-20">
      i write <InternalLink href="/code">code</InternalLink> and make{" "}
      <InternalLink href="/music">music</InternalLink>
    </Subtitle>

    <AnalyticsMap />
  </>
);

export default Home;
