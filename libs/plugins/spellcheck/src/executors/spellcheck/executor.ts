import { SpellcheckExecutorSchema } from "./schema";
import { execSync } from "child_process";
import { getCwdForCspell } from "../utils";
import { ExecutorContext } from "@nrwl/devkit";

export default async function runExecutor(
  options: SpellcheckExecutorSchema,
  context: ExecutorContext & {projectName: string}
  ) {
  const cwd = getCwdForCspell(context);
  const args = argsFromOptions(options);

  const command= ['cspell', 'lint', '"**"' ].concat(args).join(' ');
  execSync('pwd && cspell --help', {stdio: 'inherit', cwd});
  return { success: true};
}

function argsFromOptions(options: SpellcheckExecutorSchema): string [] {
  const args = [ ];
  if (options.cspellConfig){
    args.push('-c', options.cspellConfig);
  }
  if (!options.disableColor){
    args.push('--color');
  }
  return args;
}
