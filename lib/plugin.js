import Vue from 'vue';

Vue.component('<%- options.componentName %>', () => import('./components/<%- options.componentNamePascal %>'));
