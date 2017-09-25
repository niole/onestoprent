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
    },
    template: `
      <div :class="iconClass">
        <div class="count">
          {{ count }}
        </div>
        <button
          :class="alertButtonClass"
          :id="label"
          :value="label"
          v-on:click="onClick"
        >
          {{ label }}
        </button>
      </div>
    `
});

export default AlertIcon;
