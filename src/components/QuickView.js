import Vue from 'vue';

const QuickView = Vue.component('quick-view', {
  props: [
    'open',
    'shouldDropRight',
  ],
  computed: {
    viewPanelClass: function() {
      const baseClass = "view";
      if (this.shouldDropRight) {
        return `${baseClass} drop-right`;
      }
      return baseClass;
    },
  },
  template: `
    <div class="quick-view">
      <slot name="trigger"></slot>
      <div
        v-if="open"
        :class="viewPanelClass"
      >
        <slot name="content"></slot>
      </div>
    </div>
  `
});

export default QuickView;
