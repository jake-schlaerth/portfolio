import { Link } from "react-router-dom";
import { Layout } from "../../components";

export const Home = () => {
  return (
    <Layout>
      <p>hi i'm jake</p>
      <p>
        i write <Link to="/code">code</Link> and make{" "}
        <Link to="/music">music</Link>
      </p>
    </Layout>
  );
};
