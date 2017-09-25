import Vue from 'vue';
import AlertIcon from './AlertIcon';
import QuickView from './QuickView';
import MenuItem from './MenuItem';
import {
  getAlertsForRenter,
  getAlertsForLandlord,
  getAlertsForUser,
} from '../queryUtil';

const NavBar = Vue.component('nav-bar', {
    props: [
      'isRenter',
      'userId',
    ],
    mounted: function() {
      getAlertsForUser(this.userId)
        .then(({ data }) => {
          this.alerts = data;
        })
        .catch(error => console.error(error));
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
          map[alert.alertType].push(alert);
          return map;
        }, {
          rent: [],
          contractsign: [],
          contractrenew: [],
          message: [],
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
            :count="alertMap[alertType].length"
            :label="alertType"
            :type="alertType"
            slot="trigger"
          />
          <div slot="content">
            <menu-item
              v-for="alert in alertMap[alertType]"
            >
              <span v-if="isRenter">
                {{ alert.landlordName }}
              </span>
              <span v-else>
                {{ alert.renterName }}
              </span>
              {{ alert.alertType }}
              <span v-if="alert.level">
                {{ alert.level }}
              </span>
            </menu-item>
          </div>
        </quick-view>
      </header>
    `
});

export default NavBar;
