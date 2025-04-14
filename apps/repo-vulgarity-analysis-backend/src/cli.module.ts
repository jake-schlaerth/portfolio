import { Module } from "@nestjs/common";
import { AnalyzeCommand } from "./commands/analyze.command";

@Module({
  imports: [],
  providers: [AnalyzeCommand],
})
export class CliModule {}
