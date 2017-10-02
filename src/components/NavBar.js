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
  CONTRACT_MANAGEMENT_PAGE_ID,
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
        contractManagementId: CONTRACT_MANAGEMENT_PAGE_ID,
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
      shouldShowContractMangementButton: function() {
         return !this.isRenter;
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
        this.updatePage(pageId, alert);
      },
      showContractMangement: function(event) {
        this.updatePage(
          event.target.value, {
          renterUserId: "",
          landlordUserId: this.userId,
        });
      },
      home: function() {
        this.updatePage(MAIN_PAGE_ID, {});
      },
    },
    template: `
      <header>
        <button v-on:click="home">
          Home
        </button>
        <button
          v-if="shouldShowContractMangementButton"
          v-on:click="showContractMangement"
          :value="contractManagementId"
        >
          Manage Contracts
        </button>

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
