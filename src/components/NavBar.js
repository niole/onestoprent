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
        const alertToToggle = event.currentTarget.value;
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
    components: {
      [RENT_PAGE_ID]: {
        template: `
          <money-icon
            :width="26"
            :height="19"
            :title="'rent payment alerts'"
          />
        `,
      },
      [CONTRACT_RENEW_PAGE_ID]: {
        template: "<span>Contract Renewal</span>",
      },
      [CONTRACT_SIGN_PAGE_ID]: {
        template: "<span>Contract Sign</span>",
      },
      [MESSAGEPAGE_ID]: {
        template: "<span>Messages</span>",
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
        <div class="alerts">
          <quick-view
            v-for="(alertType, index) in alertTypes"
            :open="isQuickViewOpen(alertType)"
            :shouldDropRight="index === (alertTypes.length - 1)"
          >
            <alert-icon
              :onClick="handleAlertClick"
              :count="alertMap[alertType].length"
              :value="alertType"
              :type="alertType"
              :focused="selectedPage === alertType"
              slot="trigger"
            >
              <component :is="alertType" slot="label" />
            </alert-icon>
            <div slot="content">
              <alert-menu-item
                v-for="alert in alertMap[alertType]"
                :onClick="onQuickAlertClick"
                :isRenter="isRenter"
                :alert="alert"
              />
            </div>
          </quick-view>
        </div>
      </header>
    `
});

export default NavBar;
