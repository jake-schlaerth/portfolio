import { ExternalLink } from "@/app/components";

const Code = () => (
  <>
    <h1>these are some of the technologies i use</h1>
    <div className="flex flex-wrap p-4">
      <div className="flex-1 m-8">
        <ul className="list-none">
          <li>typescript</li>
          <li>php</li>
          <li>dart</li>
        </ul>
      </div>
      <div className="flex-1 m-8">
        <ul className="list-none">
          <li>next</li>
          <li>gatsby</li>
          <li>react</li>
          <li>express</li>
          <li>laravel</li>
          <li>flutter</li>
        </ul>
      </div>
      <div className="flex-1 m-8">
        <ul className="list-none">
          <li>cypress</li>
          <li>playwright</li>
          <li>jest</li>
          <li>phpunit</li>
          <li>pest</li>
          <li>tailwind</li>
          <li>emotion</li>
        </ul>
      </div>
      <div className="flex-1 m-8">
        <ul className="list-none">
          <li>aws</li>
          <li>ecr</li>
          <li>ecs</li>
          <li>ec2</li>
          <li>codepipeline</li>
          <li>codebuild</li>
          <li>route 53</li>
          <li>rds</li>
        </ul>
      </div>
      <div className="flex-1 m-8">
        <ul className="list-none">
          <li>mysql</li>
          <li>mariadb</li>
          <li>mssql</li>
          <li>postgresql</li>
          <li>mongodb</li>
        </ul>
      </div>
    </div>
    <div className="flex flex-col items-center ">
      <p>
        <ExternalLink href="https://github.com/jake-schlaerth/portfolio">
          this site
        </ExternalLink>{" "}
        is hosted on aws
      </p>
      <p>
        {" "}
        it leverages a{" "}
        <ExternalLink href="https://github.com/jake-schlaerth/portfolio/blob/main/frontend/buildspec.yml">
          continuous deployment pipeline
        </ExternalLink>{" "}
        that triggers a deployment on a push to main
      </p>
    </div>
  </>
);

export default Code;
