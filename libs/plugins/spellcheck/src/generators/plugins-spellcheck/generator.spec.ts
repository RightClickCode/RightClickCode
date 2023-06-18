import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';

import { pluginsSpellcheckGenerator } from './generator';
import { PluginsSpellcheckGeneratorSchema } from './schema';

describe('plugins-spellcheck generator', () => {
  let tree: Tree;
  const options: PluginsSpellcheckGeneratorSchema = { name: 'test' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await pluginsSpellcheckGenerator(tree, options);
    const config = readProjectConfiguration(tree, 'test');
    expect(config).toBeDefined();
  });
});
