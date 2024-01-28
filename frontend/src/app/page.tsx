import Link from "next/link";
import { Canvas, Subtitle, Title } from "@components";

const Home = () => (
  <>
    <Title className="mb-4">hi i&apos;m jake</Title>
    <Canvas
      canvasHeight={150}
      canvasWidth={200}
      displayHeight={60}
      displayWidth={80}
    />
    <Subtitle className="mt-4">
      i write{" "}
      <Link href="/code" className="text-gray-400 underline">
        code
      </Link>{" "}
      and make{" "}
      <Link href="/music" className="text-gray-400 underline">
        music
      </Link>
    </Subtitle>
  </>
);

export default Home;
