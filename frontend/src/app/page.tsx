import { Subtitle, Title, InternalLink } from "./components";
import { WebSocketClient } from "./components/WebSocket";

const Home = () => (
  <>
    <WebSocketClient />
    <Title>hi i&apos;m jake</Title>
    <Subtitle>
      i write <InternalLink href="/code">code</InternalLink> and make{" "}
      <InternalLink href="/music">music</InternalLink>
    </Subtitle>
  </>
);

export default Home;
