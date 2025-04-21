import { Link } from "react-router-dom";
import { Layout } from "../../components";
import whiteboardScreenshot from "../../assets/whiteboard.png";
import repoVulgarityAnalysisScreenshot from "../../assets/repo-vulgarity-analysis.png";
import vfxRendererScreenshot from "../../assets/vfx-renderer.png";
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 p-8">
        <div className="flex flex-col items-center max-w-xs mx-auto">
          <Link
            to="/whiteboard"
            className="hover:opacity-80 transition-opacity flex flex-col items-center"
          >
            <p className="mb-2">whiteboarding app</p>
            <div className="max-w-full rounded-lg overflow-hidden">
              <img
                src={whiteboardScreenshot}
                alt="Whiteboard App Screenshot"
                className="w-auto h-auto max-w-full max-h-32 object-contain"
              />
            </div>
          </Link>
        </div>
        <div className="flex flex-col items-center max-w-xs mx-auto">
          <Link
            to="/repo-vulgarity-analysis/search"
            className="hover:opacity-80 transition-opacity flex flex-col items-center"
          >
            <p className="mb-2">repo vulgarity analysis</p>
            <div className="max-w-full rounded-lg overflow-hidden">
              <img
                src={repoVulgarityAnalysisScreenshot}
                alt="Repo Vulgarity Analysis Screenshot"
                className="w-auto h-auto max-w-full max-h-32 object-contain"
              />
            </div>
          </Link>
        </div>
        <div className="flex flex-col items-center max-w-xs mx-auto">
          <Link
            to="/vfx-renderer"
            className="hover:opacity-80 transition-opacity flex flex-col items-center"
          >
            <p className="mb-2">vfx renderer</p>
            <div className="max-w-full rounded-lg overflow-hidden">
              <img
                src={vfxRendererScreenshot}
                alt="VFX Renderer Screenshot"
                className="w-auto h-auto max-w-full max-h-32 object-contain"
              />
            </div>
          </Link>
        </div>
      </div>
    </Layout>
  );
};
