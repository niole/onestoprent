import Vue from 'vue';
import AlertIcon from './AlertIcon';
import QuickView from './QuickView';
import AlertMenuItem from './AlertMenuItem';
import {
  getAlertsForRenter,
  getAlertsForLandlord,
  getAlertsForUser,
} from '../queryUtil';
import {
  MAIN_PAGE_ID,
  RENT_PAGE_ID,
  CONTRACT_RENEW_PAGE_ID,
  CONTRACT_SIGN_PAGE_ID,
  MESSAGEPAGE_ID,
} from '../constants';


const NavBar = Vue.component('nav-bar', {
    props: [
      'isRenter',
      'userId',
      'updatePage',
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
          RENT_PAGE_ID,
          CONTRACT_RENEW_PAGE_ID,
          CONTRACT_SIGN_PAGE_ID,
          MESSAGEPAGE_ID,
        ],
        openAlert: "",
        selectedPage: MAIN_PAGE_ID,
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
      onQuickAlertClick: function(alert, pageId) {
        this.openAlert = "";
        this.selectedPage = pageId;

        if (this.isRenter) {
          this.updatePage(pageId, alert.landlordUserId);
        } else {
          this.updatePage(pageId, alert.renterUserId);
        }
      }
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
            :focused="selectedPage === alertType"
            slot="trigger"
          />
          <div slot="content">
            <alert-menu-item
              v-for="alert in alertMap[alertType]"
              :onClick="onQuickAlertClick"
              :isRenter="isRenter"
              :alert="alert"
            />
          </div>
        </quick-view>
      </header>
    `
});

export default NavBar;
