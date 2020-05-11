<template>
    <svg class="<%- options.componentName %>" v-bind="$attrs" v-on="$listeners">
        <use :xlink:href="`${ source }#icon-${ name }`" />
    </svg>
</template>

<script>
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
                let sprite = `<%= options.sprite %>`;

                if (this.normalise) {
                    // Remove all fills as this will be enforced by font colour
                    sprite = sprite.replace(/(fill=".\w+")/g, '');
                }

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
