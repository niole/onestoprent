import Vue from 'vue';
import AlertIcon from './AlertIcon';
import QuickView from './QuickView';
import {
  getAlertsForRenter,
  getAlertsForLandlord,
} from '../queryUtil';

const NavBar = Vue.component('nav-bar', {
    props: [
      'isRenter',
      'userId',
    ],
    mounted: function() {
      if (!this.isRenter) {
        getAlertsForLandlord(this.userId)
          .then(({ data }) => {
            this.alerts = data;
          })
          .catch(error => console.error(error));
      } else {
        getAlertsForRenter(this.userId)
          .then(({ data }) => {
            this.alerts = data;
          })
          .catch(error => console.error(error));
      }
    },
    data: function() {
      return {
        alerts: [],
        alertTypes: [
          "rent",
          "contractsign",
          "contractrenew",
          "message"
        ],
        openAlert: ""
      };
    },
    computed: {
      alertMap: function() {
        return this.alerts.reduce((map, alert) => {
          map[alert.alertType] += 1;
          return map;
        }, {
          rent: 0,
          contractsign: 0,
          contractrenew: 0,
          message: 0,
        });
      },
    },
    methods: {
      handleAlertClick: function(event) {
        const alertToToggle = event.target.value;
        if (alertToToggle === this.openAlert) {
          this.openAlert = "";
        } else {
          // TODO get data for quick view
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
            slot="trigger"
          />
          <div slot="content">
            view
          </div>
        </quick-view>
      </header>
    `
});

export default NavBar;
