import { createTreeWithEmptyWorkspace } from "@nx/devkit/testing";
import { Tree, addProjectConfiguration } from "@nx/devkit";
import { configureSpellcheckGenerator } from "./generator";
import { ConfigureSpellcheckGeneratorSchema } from "./schema";

describe("configure-spellcheck generator", () => {
  let tree: Tree;
  const options: ConfigureSpellcheckGeneratorSchema = { project: "test" };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();

    // Set up a proper project configuration using Nx's addProjectConfiguration
    addProjectConfiguration(tree, "test", {
      root: "apps/test",
      sourceRoot: "apps/test/src",
      projectType: "application",
      targets: {},
    });
  });

  it("should create root cspell config if not exists", async () => {
    await configureSpellcheckGenerator(tree, options);
    expect(tree.exists(".cspell.json")).toBeTruthy();
  });

  it("should create project-specific config and dictionary", async () => {
    await configureSpellcheckGenerator(tree, options);
    expect(tree.exists("apps/test/.cspell.json")).toBeTruthy();
    expect(tree.exists("apps/test/.cspell/test.txt")).toBeTruthy();
  });

  it("should configure project config to extend root config", async () => {
    await configureSpellcheckGenerator(tree, options);
    const configContent = JSON.parse(
      tree.read("apps/test/.cspell.json", "utf-8")
    );
    expect(configContent.import).toContain("../.cspell.json");
  });
});
