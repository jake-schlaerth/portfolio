import { Layout } from "../../components";

export const Code = () => {
  return (
    <Layout>
      <div className="grid grid-cols-4 gap-8 p-8">
        <div>
          <ul className="space-y-2 list-none">
            <li>typescript</li>
            <li>php</li>
            <li>dart</li>
            <li>rust</li>
            <li>python</li>
          </ul>
        </div>
        <div>
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
        </div>
        <div>
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
          </ul>
        </div>
        <div>
          <ul className="space-y-2 list-none">
            <li>mysql</li>
            <li>mariadb</li>
            <li>mssql</li>
            <li>postgresql</li>
            <li>mongodb</li>
            <li>aws</li>
            <li>ecr</li>
            <li>ecs</li>
            <li>ec2</li>
            <li>s3</li>
            <li>lambda</li>
            <li>codepipeline</li>
            <li>codebuild</li>
            <li>route 53</li>
            <li>rds</li>
            <li>diesel</li>
            <li>prisma</li>
            <li>sequelize</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};
