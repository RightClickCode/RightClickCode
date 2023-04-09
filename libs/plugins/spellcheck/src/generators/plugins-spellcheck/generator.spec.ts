import { createTreeWithEmptyWorkspace } from "@nrwl/devkit/testing";
import { Tree, readProjectConfiguration } from "@nrwl/devkit";

import generator from "./generator";
import { PluginsSpellcheckGeneratorSchema } from "./schema";

describe("plugins-spellcheck generator", () => {
  let appTree: Tree;
  const options: PluginsSpellcheckGeneratorSchema = { name: "test" };

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace({ layout: "apps-libs" });
  });

  it("should run successfully", async () => {
    await generator(appTree, options);
    const config = readProjectConfiguration(appTree, "test");
    expect(config).toBeDefined();
  });
});
