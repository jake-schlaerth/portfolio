import { ExternalLink } from "@/components";
import { SkillsList } from "./components/SkillsList";

const Code = () => (
  <>
    <h1>these are some of the technologies i use</h1>
    <SkillsList />
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
        <ExternalLink href="https://github.com/jake-schlaerth/portfolio/blob/main/apps/frontend/buildspec.yml">
          continuous deployment pipeline
        </ExternalLink>{" "}
        that triggers a deployment on a push to main
      </p>
    </div>
  </>
);

export default Code;
