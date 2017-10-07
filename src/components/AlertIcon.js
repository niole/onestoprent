import Vue from 'vue';

const AlertIcon = Vue.component('alert-icon', {
    props: [
      'focused',
      'onClick',
      'count',
      'label',
      'type'
    ],
    computed: {
      alertButtonClass: function() {
        return `${this.type}-alert`;
      },
      iconClass: function() {
        if (this.focused) {
          return 'alert-icon selected';
        }
        return 'alert-icon';
      },
      countClass: function() {
        if (this.count === 0) {
          return "count disabled";
        }
        return "count";
      },
      isDisabled: function() {
        return this.count === 0;
      },
    },
    template: `
      <div :class="iconClass">
        <button
          :disabled="isDisabled"
          :class="alertButtonClass"
          :id="label"
          :value="label"
          v-on:click="onClick"
        >
          {{ label }}
        </button>
        <div :class="countClass">
          {{ count }}
        </div>
      </div>
    `
});

export default AlertIcon;
