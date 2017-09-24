import Vue from 'vue';

const AlertIcon = Vue.component('alert-icon', {
    props: [
      'onClick',
      'count',
      'label',
      'type'
    ],
    computed: {
      alertButtonClass: function() {
        return `${this.type}-alert`;
      },
    },
    template: `
      <div class="alert-icon">
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
