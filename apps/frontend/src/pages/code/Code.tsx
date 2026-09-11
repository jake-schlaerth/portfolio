import { Layout } from "../../components";

export const Code = () => {
  return (
    <Layout>
      <p>these are some of the technologies i use</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 p-4 sm:p-6 lg:p-8 w-full max-w-6xl">
        <ul className="space-y-2 list-none">
          <li>typescript</li>
          <li>php</li>
          <li>rust</li>
          <li>python</li>
          <li>dart</li>
          <li>gdscript</li>
          <li>glsl</li>
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
          <li>godot</li>
          <li>webgl</li>
        </ul>
        <ul className="space-y-2 list-none">
          <li>cypress</li>
          <li>playwright</li>
          <li>jest</li>
          <li>vitest</li>
          <li>mocha</li>
          <li>chai</li>
          <li>phpunit</li>
          <li>pest</li>
        </ul>
        <ul className="space-y-2 list-none">
          <li>tailwind</li>
          <li>emotion</li>
          <li>vite</li>
          <li>eslint</li>
          <li>docker</li>
          <li>cargo</li>
          <li>diesel</li>
          <li>prisma</li>
          <li>sequelize</li>
          <li>bullmq</li>
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
    </Layout>
  );
};
