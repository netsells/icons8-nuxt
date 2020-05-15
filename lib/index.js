import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';

/**
 * Register the module.
 *
 * @param {object} moduleOptions
 */
export default function Icons8Module(moduleOptions = {}) {
    const options = {
        componentName: 'app-icon',
        componentNamePascal: 'AppIcon',
        normaliseSpritesheet: true,
        ...moduleOptions,
        ...(this.options.icons8 || {}),
    };

    if (!options.spritePath || !existsSync(options.spritePath)) {
        throw new Error('[Nuxt Icons8] spritePath not provided or does not exist at the path specified.');
    }

    const toPascal = (str) => {
        let camelCase = str.replace(/([-_]\w)/g, g => g[1].toUpperCase());
        return camelCase[0].toUpperCase() + camelCase.substr(1);
    };

    options.componentNamePascal = toPascal(options.componentName);
    options.sprite = readFileSync(options.spritePath, 'utf-8');

    // Remove all fills as this will be enforced by font colour
    options.normalisedSprite = options.sprite.replace(/(fill=".\w+")/g, '');

    const { dst: spritePath } = this.addTemplate({
        src: resolve(__dirname, './icon-sprite.svg'),
        fileName: `./icons8/icon-sprite.svg`,
        options: {
            sprite: options.sprite,
        },
    });

    const { dst: normalisedSpritePath } = this.addTemplate({
        src: resolve(__dirname, './icon-sprite.svg'),
        fileName: `./icons8/icon-sprite-normalised.svg`,
        options: {
            sprite: options.normalisedSprite,
        },
    });

    options.normalisedSpritePath = normalisedSpritePath;
    options.spritePath = spritePath;

    this.addTemplate({
        src: resolve(__dirname, './components/AppIcon.vue'),
        fileName: `./icons8/components/${ options.componentNamePascal }.vue`,
        options,
    });

    const plugin = this.addTemplate({
        src: resolve(__dirname, './plugin.js'),
        fileName: './icons8/plugin.js',
        options,
    });

    this.options.plugins.push(resolve(this.options.buildDir, plugin.dst));
}
