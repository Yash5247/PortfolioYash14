"use client";

import { motion } from "framer-motion";
import { GitCommit, FolderGit2 } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { GitHubIcon } from "@/components/icons/brand-icons";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { Card, CardContent } from "@/components/ui/card";

const { openSourceStats, githubRepos, socials } = portfolioData;

function getHeatmapLevel(week: number, day: number) {
  return ((week * 7 + day) * 13 + 7) % 5;
}

function ContributionHeatmap() {
  const weeks = 52;
  const days = 7;

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-[3px]">
        {Array.from({ length: weeks }).map((_, w) => (
          <div key={w} className="flex flex-col gap-[3px]">
            {Array.from({ length: days }).map((_, d) => {
              const level = getHeatmapLevel(w, d);
              return (
                <div
                  key={d}
                  className="h-3 w-3 rounded-sm"
                  style={{
                    backgroundColor:
                      level === 0
                        ? "var(--muted)"
                        : `rgba(120, 119, 198, ${0.2 + level * 0.2})`,
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export function OpenSource() {
  return (
    <section id="opensource" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          label="Open Source"
          title="GitHub Activity"
          description="Contributing to open source and maintaining personal projects."
        />

        <div className="mb-12 grid gap-4 sm:grid-cols-3">
          {[
            {
              icon: GitCommit,
              label: "Contributions",
              value: openSourceStats.contributions,
              suffix: "+",
            },
            {
              icon: FolderGit2,
              label: "Repositories",
              value: openSourceStats.repositories,
              suffix: "",
            },
            {
              icon: GitHubIcon,
              label: "Commits",
              value: openSourceStats.commits,
              suffix: "+",
            },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card>
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
                    <stat.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold">
                      <AnimatedCounter
                        value={stat.value}
                        suffix={stat.suffix}
                      />
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Card className="mb-8">
          <CardContent className="p-6">
            <h3 className="mb-4 text-sm font-medium text-muted-foreground">
              Contribution Activity
            </h3>
            <ContributionHeatmap />
          </CardContent>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2">
          {githubRepos.map((repo, i) => (
            <motion.a
              key={repo.name}
              href={`${socials.github}/${repo.name}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center justify-between rounded-xl border border-border p-4 transition-all hover:border-foreground/20 hover:shadow-md"
              data-cursor="pointer"
            >
              <div className="flex items-center gap-3">
                <GitHubIcon className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">{repo.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {repo.language}
                  </p>
                </div>
              </div>
              <span className="text-sm text-muted-foreground">
                ★ {repo.stars}
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
