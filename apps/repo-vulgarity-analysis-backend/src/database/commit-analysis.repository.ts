import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class CommitAnalysisRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createCommitAnalysis(commitAnalysis: Prisma.commitAnalysisCreateInput) {
    return this.prisma.commitAnalysis.create({
      data: commitAnalysis,
    });
  }

  async searchCommitAnalysisByProfanity(
    profanity: string,
    limit: number = 100,
    offset: number = 0
  ) {
    const query = Prisma.sql`
      SELECT commit_message, commit_hash, repository FROM commit_analysis
      WHERE commit_message ILIKE ${`%${profanity}%`}
      ORDER BY updated_at DESC
      LIMIT ${limit}
      OFFSET ${offset}
    `;

    const result = (await this.prisma.$queryRaw(query)) as {
      commit_message: string;
      commit_hash: string;
      repository: string;
    }[];

    const camelCaseResult = result.map((row: any) => ({
      commitMessage: row.commit_message,
      commitHash: row.commit_hash,
      repository: row.repository,
    }));

    return camelCaseResult;
  }
}
