import Vue from 'vue';
import MenuItem from './MenuItem';

const LATE_CLASS = "late";
const APPROACHING_CLASS = "approaching";
const ONTIME_CLASS = "ontime";

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
    getLevelClass: function(alertLevel) {
      switch (alertLevel) {
      case "late":
        return `level ${LATE_CLASS}`;
      case "approaching":
        return `level ${APPROACHING_CLASS}`;
      case "ontime":
        return `level ${ONTIME_CLASS}`;
      }
    },
    getAlertLevelTitle: function(alertLevel) {
      switch (alertLevel) {
      case "late":
        return "this person has missed their deadline";
      case "approaching":
        return "this person's deadline is approaching";
      case "ontime":
        return "this person just met their deadline";
      }
    }
  },
  template: `
    <menu-item>
      <button v-on:click="handleButtonClick" class="alert-item">
        <span v-if="isRenter">
          {{ alert.landlordName }}
        </span>
        <span v-else>
          {{ alert.renterName }}
        </span>
        <div
          :title="getAlertLevelTitle(alert.level)"
          v-if="alert.level"
          :class="getLevelClass(alert.level)"
        />
      </button>
    </menu-item>
  `
});

export default AlertMenuItem;
