# Nuxt Icons8 Module

> A simple module to provide an Icons8 SVG spritesheet to your Nuxt app

This module aims to make it easier to integrate with Icons8 in a more uniform way, allowing you to simply pass in your SVG file and have it globally provided to your app.

## Why does this component use SVGs rather than font?

Fonts are inherently bad, and are penalised by tools such as Google PageSpeed and Lighthouse as they are an additional request. Add to this issues with accessibility and general size of these files, it's highly recommended to use SVGs for application icons.

## What does this module do?

A global component will be registered in your app, and this can be referenced using the `componentName` provided or `app-icon` by default.

```vue
<template>
    <app-icon name="email" />
</template>

<style lang="scss" scoped>
    // SVG "fill" will use the font colour provided, 
    // and will inherit the current colour if not set
    .app-icon {
        color: red;
    }
</style>
```

## Normalisation

If the `normaliseSpritesheet` option is set to `true` the sprite sheet will automatically have all `fill` attributes removed. This is because the `fill` on the icons will be enforced by the font `color` css value and inherited by `currentColor` in the component CSS.

If set to `false` for any reason, it can be enabled on a per-component basis using the `:normalise="false"` prop on the component.

## Usage

Install the module:

```bash
$ yarn add @netsells/nuxt-icons8
```

Add the module to your nuxt config:

```js
modules: {
    // Other modules
    '@netsells/nuxt-icons8',
}, 
```

[Configure](#options) the module to your needs:

```
icons8: {
    spritePath: '',
    componentName: '',
    normaliseSpritesheet: true,
},
```

## Options

### `spritePath`
> Path to your svg spritesheet in your application

* Default: `''`
* Type: `string`
* *Required*

### `componentName`
> The name of the global icon component

* Default: `'app-icon'`
* Type: `string`

### `normaliseSpritesheet`
> Whether to apply normalisation to the spritesheet. See above for details 

* Default: `true`
* Type: `boolean`

## Storybook

This component can be utilised in storybook by first doing a build of your nuxt app. This will generate the `.nuxt` folder with the generated component from this module. You can then register it globally in your storybook project by simply pulling in the generated file:

```js
import '../.nuxt/icons8/plugin';
```
