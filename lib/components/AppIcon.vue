<template>
    <svg class="<%- options.componentName %>" v-bind="$attrs" v-on="$listeners">
        <use :xlink:href="source" />
    </svg>
</template>

<script>
    import spriteSource from '!!file-loader!../icon-sprite.svg';
    import normalisedSpriteSource from '!!file-loader!../icon-sprite-normalised.svg';

    export default {
        name: '<%- options.componentName %>',

        props: {
            name: {
                type: String,
                default: '',
            },

            normalise: {
                type: Boolean,
                default: <%- options.normaliseSpritesheet %>,
        },
    },

    computed: {
        /**
         * Return the iconSprites source.
         *
         * @returns {string}
         */
        source() {
            let sprite = spriteSource;

            if (this.normalise) {
                sprite = normalisedSpriteSource;
            }

            sprite = `${ sprite }#icon-${ this.name }`;

            return sprite;
        },
    },
    };
</script>

<style scoped>
    .icon {
        display: inline-block;
        width: 1em;
        height: 1em;
        stroke-width: 0;
        color: inherit;
        stroke: currentColor;
        fill: currentColor;
    }
</style>
