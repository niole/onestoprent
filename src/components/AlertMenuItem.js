import Vue from 'vue';
import MenuItem from './MenuItem';

const AlertMenuItem = Vue.component('alert-menu-item', {
  props: [
    'onClick',
    'isRenter',
    'alert',
  ],
  methods: {
    handleButtonClick: function() {
      this.onClick(this.alert.id, this.alert.alertType);
    },
  },
  template: `
    <menu-item>
      <button v-on:click="handleButtonClick">
        <span v-if="isRenter">
          {{ alert.landlordName }}
        </span>
        <span v-else>
          {{ alert.renterName }}
        </span>
        <span v-if="alert.level">
          {{ alert.level }}
        </span>
      </button>
    </menu-item>
  `
});

export default AlertMenuItem;
