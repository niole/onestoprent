import Vue from 'vue';
const NavBar = require('./NavBar');

const Main = Vue.component('main-page', {
    template: `
      <div>
        <nav-bar v-bind:text="'sdlfkjsf'"/>
        sdlfkjds
      </div>
    `
});

export default Main;
