import Vue from 'vue';
import MessagesView from './MessagesView';
import HighlevelContract from './HighlevelContract';
import RentPaymentProcess from './RentPaymentProcess';

const RentView = Vue.component('rent-view', {
  props: [
    'renterData',
    'landlordUserId',
    'renterUserId',
    'currentUserIsRenter',
    'contract',
    'actionLevel',
  ],
  methods: {
    showMessaging: function() {
      this.view = "messages";
    },
    submit: function() {
      this.view = "payRent";
    },
    resetView: function() {
      this.view = "";
    },
  },
  data: function() {
    return {
      view: "",
    };
  },
  watch: {
    renterUserId: function() {
      this.resetView();
    },
    landlordUserId: function() {
      this.resetView();
    },
  },
  computed: {
    mainMessage: function() {
      if (this.currentUserIsRenter) {
        // is renter
        switch(this.actionLevel) {
          case "ontime":
            return "Your rent has been received.";
          case "approaching":
            return `Your rent is due on the ${this.contract.rentDue}.`;
          case "late":
            return `You missed your rent deadline. Your rent was due on the ${this.contract.rentDue}.`;
          default:
            console.warn("This user action doesn't exist");
            return "";
        }
      } else {
        // is landlord
        switch(this.actionLevel) {
          case "ontime":
            return `${this.renterData.name} just submitted a rent payment.`;
          case "approaching":
            return `${this.renterData.name}'s rent is due on the ${this.contract.rentDue}.`;
          case "late":
            return `${this.renterData.name}'s rent is late.`;
          default:
            console.warn("This user action doesn't exist");
            return "";
        }
      }
    },
    lesseeName: function() {
      if (this.currentUserIsRenter) {
        return "Your";
      }
      return `${this.renterData.name}'s`;
    },
    shouldShowSubmitButton: function() {
      return this.currentUserIsRenter &&
            (this.actionLevel === "approaching" ||
            this.actionLevel === "late");
    },
    submitLabel: function() {
      if (this.currentUserIsRenter &&
            (this.actionLevel === "approaching" ||
            this.actionLevel === "late")) {
        return "Submit Rent Payment";
      }
    },
    contactButtonLabel: function() {
      if (this.currentUserIsRenter) {
        return "Contact Your Landlord";
      }
      return `Contact ${this.renterData.name}`;
    },
  },
  components: {
    messages: MessagesView,
    payRent: RentPaymentProcess,
  },
  template:`
    <div>
      <h1>
        Rent
      </h1>
      {{ mainMessage }}
      <button v-on:click="showMessaging">
        {{ contactButtonLabel }}
      </button>
      <button v-if="shouldShowSubmitButton" v-on:click="submit">
        {{ submitLabel }}
      </button>
      <highlevel-contract
        :contract="contract"
        :lesseeName="lesseeName"
        :active="false"
        :signatureDeadline="false"
        :signed="false"
        :securityDeposit="false"
        :duration="false"
      />
      <component :is="view"
        :renterData="renterData"
        :landlordUserId="landlordUserId"
        :renterUserId="renterUserId"
        :currentUserIsRenter="currentUserIsRenter"
        :actionLevel="actionLevel"
        :contract="contract"
      />
    </div>
  `
});

export default RentView;
