import Vue from 'vue';
import AlertIcon from './AlertIcon';
import QuickView from './QuickView';

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
        openAlert: "",
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
        const alertToToggle = event.target.value;
        if (alertToToggle === this.openAlert) {
          this.openAlert = "";
        } else {
          this.openAlert = alertToToggle;
        }
      },
      isQuickViewOpen: function(alertType) {
        return alertType === this.openAlert;
      },
    },
    template: `
      <header>
        <quick-view
          v-for="alertType in alertTypes"
          :open="isQuickViewOpen(alertType)"
        >
          <alert-icon
            :onClick="handleAlertClick"
            :count="alertMap[alertType]"
            :label="alertType"
            :type="alertType"
          />
        </quick-view>
        <quick-view
          :open="isQuickViewOpen('message')"
        >
          <alert-icon
            :onClick="handleAlertClick"
            :count="messages.length"
            :label="'message'"
            :type="'message'"
          />
        </quick-view>
      </header>
    `
});

export default NavBar;
