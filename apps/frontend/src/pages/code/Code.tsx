import { Link } from "react-router-dom";
import { Layout } from "../../components";
import whiteboardScreenshot from "../../assets/whiteboard.png";

export const Code = () => {
  return (
    <Layout>
      <p>these are some of the technologies i use</p>
      <div className="grid grid-cols-4 gap-8 p-8">
        <ul className="space-y-2 list-none">
          <li>typescript</li>
          <li>php</li>
          <li>rust</li>
          <li>python</li>
          <li>dart</li>
        </ul>
        <ul className="space-y-2 list-none">
          <li>nestjs</li>
          <li>nextjs</li>
          <li>gatsby</li>
          <li>react</li>
          <li>express</li>
          <li>hapi</li>
          <li>laravel</li>
          <li>symfony</li>
          <li>flutter</li>
          <li>axum</li>
          <li>django</li>
        </ul>
        <ul className="space-y-2 list-none">
          <li>cypress</li>
          <li>playwright</li>
          <li>jest</li>
          <li>mocha</li>
          <li>chai</li>
          <li>phpunit</li>
          <li>pest</li>
          <li>tailwind</li>
          <li>emotion</li>
          <li>vite</li>
          <li>eslint</li>
          <li>docker</li>
          <li>cargo</li>
          <li>diesel</li>
          <li>prisma</li>
          <li>sequelize</li>
        </ul>
        <ul className="space-y-2 list-none">
          <li>postgresql</li>
          <li>mysql</li>
          <li>mariadb</li>
          <li>mssql</li>
          <li>mongodb</li>
          <li>redis</li>
          <li>aws</li>
        </ul>
      </div>
      <p>these are some things i've built</p>
      <div className="grid grid-cols-4 gap-8 p-8">
        <ul className="space-y-2 list-none">
          <li>
            <Link
              to="/whiteboard"
              className="hover:opacity-80 transition-opacity"
            >
              <p className="text-center">whiteboarding app</p>
              <img
                src={whiteboardScreenshot}
                alt="Whiteboard App Screenshot"
                className="w-48 h-32 object-cover rounded-lg"
              />
            </Link>
          </li>
        </ul>
      </div>
    </Layout>
  );
};
