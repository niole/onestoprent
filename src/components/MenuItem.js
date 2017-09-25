import Vue from 'vue';

const MenuItem = Vue.component('menu-item', {
  template: `
    <div class="menu-item">
      <slot></slot>
    </div>
  `
});

export default MenuItem;
