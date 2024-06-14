import { ExternalLink, InternalLink } from "@/components";
import { SkillsList } from "./components/SkillsList";

const Code = () => (
  <>
    <h1>these are some of the technologies i use</h1>
    <SkillsList />
    <div className="flex flex-col items-start text-left">
      <p className="max-w-prose">
        this platform operates on a{" "}
        <ExternalLink href="https://github.com/jake-schlaerth/portfolio">
          monorepo architecture
        </ExternalLink>{" "}
        with distributed services, where each application within the monorepo is
        equipped with an independent deployment pipeline. automatic deployment
        of any modified app occurs upon a push to the main branch.{" "}
        <InternalLink href="/how-i-built-it">see how i built it</InternalLink>
      </p>
    </div>
  </>
);

export default Code;
