import Vue from 'vue';
import NavBar from './NavBar';
import SingleUserActionView from './SingleUserActionView';
import MessagesView from './MessagesView';
import ContractManagementView from './ContractManagementView';
import store from '../store';
import {
  CONTRACT_MANAGEMENT_PAGE_ID,
  MAIN_PAGE_ID,
  RENT_PAGE_ID,
  CONTRACT_RENEW_PAGE_ID,
  CONTRACT_SIGN_PAGE_ID,
  MESSAGEPAGE_ID,
} from '../constants';


const Main = Vue.component('main-page', {
    data: function() {
      return store;
    },
    methods: {
      updatePage: function(pageId, alert = {}) {
        // TODO on select, kill alert

        this.currentView = pageId;
        this.renterUserId = alert.renterUserId;
        this.landlordUserId = alert.landlordUserId;
        this.alert = alert;
      },
    },
    computed: {
      showSingleUserActionView: function() {
        return this.currentView && this.currentView !== MAIN_PAGE_ID &&
          this.currentView !== MESSAGEPAGE_ID &&
          this.currentView !== CONTRACT_MANAGEMENT_PAGE_ID;
      },
      showMessagesView: function() {
        return this.currentView === MESSAGEPAGE_ID;
      },
      showContractManagementView: function() {
        return this.currentView === CONTRACT_MANAGEMENT_PAGE_ID;
      },
    },
    template: `
      <div>
        <nav-bar
          :updatePage="updatePage"
          :isRenter="isRenter"
          :userId="userId"
        />
        <div>
          <contract-management-view
            v-if="showContractManagementView"
            :userId="userId"
            :currentUserIsRenter="isRenter"
          />
          <messages-view
            v-if="showMessagesView"
            :currentUserIsRenter="isRenter"
            :renterUserId="renterUserId"
            :landlordUserId="landlordUserId"
            :defaultMessage="alert"
          />
          <single-user-action-view
            v-if="showSingleUserActionView"
            :viewType="currentView"
            :currentUserIsRenter="isRenter"
            :landlordUserId="landlordUserId"
            :renterUserId="renterUserId"
            :alertLevel="alert.level"
          />
        </div>
      </div>
    `
});

export default Main;
