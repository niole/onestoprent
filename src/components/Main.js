import Vue from 'vue';
import NavBar from './NavBar';
import SingleUserActionView from './SingleUserActionView';
import MessagesView from './MessagesView';
import {
  MAIN_PAGE_ID,
  RENT_PAGE_ID,
  CONTRACT_RENEW_PAGE_ID,
  CONTRACT_SIGN_PAGE_ID,
  MESSAGEPAGE_ID,
} from '../constants';


const Main = Vue.component('main-page', {
    data: function() {
      return {
        isRenter: false,
        userId: "123",
        currentView: MAIN_PAGE_ID,
        renterUserId: "",
        landlordUserId: "",
        alert: {
          level: "",
        },
      };
    },
    methods: {
      updatePage: function(pageId, alert) {
        // TODO on select, kill alert

        this.currentView = pageId;
        this.renterUserId = alert.renterUserId;
        this.landlordUserId = alert.landlordUserId;
        this.alert = alert;
      }
    },
    computed: {
      showSingleUserActionView: function() {
        return this.currentView && this.currentView !== MAIN_PAGE_ID &&
          this.currentView !== MESSAGEPAGE_ID;
      },
      showMessagesView: function() {
        return this.currentView === MESSAGEPAGE_ID;
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
