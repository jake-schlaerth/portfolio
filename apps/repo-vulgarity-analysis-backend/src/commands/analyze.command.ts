import { PrismaClient } from "@prisma/client";
import simpleGit from "simple-git";
import Filter from "bad-words";
import fs from "fs";
import { Command, CommandRunner } from "nest-commander";
import { blacklist } from "./blacklist";

@Command({
  name: "analyze",
  description: "Analyze a git repository for profane commit messages",
})
export class AnalyzeCommand extends CommandRunner {
  private prisma = new PrismaClient();
  private filter: Filter;
  constructor() {
    super();
    this.filter = new Filter({ emptyList: true });
    this.filter.addWords(...blacklist);
  }

  async analyze(repoUrl: string) {
    const git = simpleGit();
    const repoName = repoUrl.split("/").pop()?.replace(".git", "") || "unknown";
    const repoPath = `./repos/${repoName}`;

    try {
      if (!fs.existsSync(repoPath) || !fs.statSync(repoPath).isDirectory()) {
        console.log(`Cloning repository ${repoUrl} to ${repoPath}`);
        await git.clone(repoUrl, repoPath);
      } else {
        console.log(`Using existing repository at ${repoPath}`);
      }

      const branches = await git.cwd(repoPath).branch(["-a"]);
      console.log(`Analyzing ${branches.all.length} branches`);

      for (const branch of branches.all) {
        const commits = await git.cwd(repoPath).log([branch]);

        for (const commit of commits.all) {
          if (this.filter.isProfane(commit.message)) {
            try {
              await this.prisma.commitAnalysis.create({
                data: {
                  repository: repoUrl,
                  branch,
                  commitHash: commit.hash,
                  commitMessage: commit.message,
                },
              });
              console.log(
                `Stored profane commit ${commit.hash} on branch ${branch}`
              );
            } catch (error: any) {
              if (error?.code === "P2002") {
                console.log(
                  `Skipping duplicate commit ${commit.hash} on branch ${branch}`
                );
              } else {
                throw error;
              }
            }
          }

          console.log(`Analyzed commit ${commit.hash} on branch ${branch}`);
        }
      }
    } catch (error) {
      console.error(`Error analyzing repository ${repoUrl}:`, error);
    }
  }

  async run(inputs: string[]): Promise<void> {
    const [repoUrl] = inputs;

    if (!repoUrl) {
      console.error("Please provide a repository URL");
      process.exit(1);
    }

    try {
      await this.analyze(repoUrl);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      await this.prisma.$disconnect();
    }
  }
}
