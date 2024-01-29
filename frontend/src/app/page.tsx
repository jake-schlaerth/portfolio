import { Subtitle, Title, InternalLink } from "./components";

const Home = () => (
  <>
    <Title>hi i&apos;m jake</Title>
    <Subtitle>
      i write <InternalLink href="/code">code</InternalLink> and make{" "}
      <InternalLink href="/music">music</InternalLink>
    </Subtitle>
  </>
);

export default Home;
