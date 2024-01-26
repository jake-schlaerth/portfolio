import { SineWaveLine } from "./(pages)/both/components/SineWaveLine";
import { Subtitle, Title } from "./components";
import Link from "next/link";

const Home = () => (
  <>
    <Title className="mb-4">hi i&apos;m jake</Title>
    <SineWaveLine />
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
