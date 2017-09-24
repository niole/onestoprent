import Vue from 'vue';

const MenuItem = Vue.component('menu-item', {
  props: [
    'onClick',
  ],
  template: `
    <div v-on:click="onClick" class="menu-item">
      <slot></slot>
    </div>
  `
});

export default MenuItem;
