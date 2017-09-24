import Vue from 'vue';

const QuickView = Vue.component('quick-view', {
  props: [
    'open',
  ],
  template: `
    <div class="quick-view">
      <slot></slot>
      <div
        v-if="open"
        class="view"
      >
        view
      </div>
    </div>
  `
});

export default QuickView;
