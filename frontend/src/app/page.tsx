import { Subtitle } from "@components/Subtitle";
import { Title } from "@components/Title";
import Link from "next/link";

const Home = () => (
  <>
    <Title>hi i&apos;m jake</Title>
    <Subtitle>
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
