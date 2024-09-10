import type { PlaywrightTestConfig, Project } from "@playwright/test";
import * as fs from 'fs';
import * as yaml from 'yaml';

// Load the YAML configuration
const file = fs.readFileSync('./browserConfig.yaml', 'utf8');
const configYaml = yaml.parse(file);

// Function to create the project list
const createProjects = (): Project[] => {
  const projects: Project[] = [];

  configYaml.browsers.forEach((browser: string) => {
    configYaml.platforms.forEach((platform: string) => {
      configYaml.viewports.forEach((viewport: { width: number; height: number }) => {
        projects.push({
          name: `${browser}:latest:${platform}@lambdatest`,
          use: {
            viewport,  // Apply the viewport settings directly
          },
        });
      });
    });
  });

  return projects;
};

// Playwright config to run tests on LambdaTest platform and local
const config: PlaywrightTestConfig = {
  testDir: "tests",
  timeout: 300000,
  use: {},
  projects: createProjects(),
};

export default config;
