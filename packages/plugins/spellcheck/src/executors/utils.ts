export function getCwdForCspell(context: {
  projectsConfigurations?: {
    projects: Record<string, { root: string }>;
  };
  workspace?: {
    projects: Record<string, { root: string }>;
  };
  projectName?: string;
  cwd: string;
}) {
  if (context.projectsConfigurations && context.projectName) {
    return context.projectsConfigurations.projects[context.projectName].root;
  } else if (context.workspace && context.projectName) {
    return context.workspace.projects[context.projectName].root;
  } else {
    return context.cwd;
  }
}
