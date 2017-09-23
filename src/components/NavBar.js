import Vue from 'vue';

const NavBar = Vue.component('nav-bar', {
    props: ['text'],
    template: `
      <header>
        {{ text }}
      </header>
    `
});

export default NavBar;
