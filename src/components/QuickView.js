import Vue from 'vue';

const QuickView = Vue.component('quick-view', {
  props: [
    'open',
  ],
  template: `
    <div class="quick-view">
      <slot name="trigger"></slot>
      <div
        v-if="open"
        class="view"
      >
        <slot name="content"></slot>
      </div>
    </div>
  `
});

export default QuickView;
