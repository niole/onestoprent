import Vue from 'vue';
import AlertIcon from './AlertIcon';

const NavBar = Vue.component('nav-bar', {
    props: [
      'messages',
      'alerts'
    ],
    data: function() {
      return {
        alertTypes: [
          "rent",
          "contractsign",
          "contractrenew",
        ],
      };
    },
    computed: {
      alertMap: function() {
        return this.alerts.reduce((map, alert) => {
          map[alert.type] += 1;
          return map;
        }, {
          rent: 0,
          contractsign: 0,
          contractrenew: 0,
        });
      },
    },
    methods: {
      handleAlertClick: function(event) {
        console.log(event.target.value);
      }
    },
    template: `
      <header>
        <alert-icon
          v-for="alertType in alertTypes"
          :onClick="handleAlertClick"
          :count="alertMap[alertType]"
          :label="alertType"
          :type="alertType"
        />
        <alert-icon
          :onClick="handleAlertClick"
          :count="messages.length"
          :label="'message'"
          :type="'message'"
        />
      </header>
    `
});

export default NavBar;
