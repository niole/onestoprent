import Vue from 'vue';
import MessagesView from './MessagesView';
import HeaderWithSideNav from './HeaderWithSideNav';
import HighlevelContract from './HighlevelContract';
import ContractSignProcess from './ContractSignProcess';
import Contract from './Contract';

const ContractSignView = Vue.component('contract-sign-view', {
  props: [
    'renterData',
    'landlordUserId',
    'renterUserId',
    'currentUserIsRenter',
    'contract',
    'actionLevel',
  ],
  data: function () {
    return {
      view: "",
    };
  },
  watch: {
    landlordUserId: function() {
      this.resetView();
    },
    renterUserId: function() {
      this.resetView();
    },
  },
  computed: {
    resetView: function() {
      this.view = "";
    },
    contactButtonLabel: function() {
      if (this.currentUserIsRenter) {
        return "Contact Landlord";
      }
      return `Contact ${this.renterData.name}`;
    },
    shouldShowSubmit: function() {
      return this.currentUserIsRenter && this.actionLevel === "approaching" ||
        !this.currentUserIsRenter && this.actionLevel === "ontime";
    },
    submitLabel: function() {
      if (this.currentUserIsRenter && this.actionLevel === "approaching") {
        return "Review and Sign Contract";
      }

      if (!this.currentUserIsRenter && this.actionLevel === "ontime") {
        return "Review Contract";
      }
    },
    mainMessage: function() {
      if (this.currentUserIsRenter) {
        // is renter
        switch(this.actionLevel) {
          case "ontime":
            return "Your signature has been received.";
          case "approaching":
            return `Your contract sign deadline is ${contract.signDeadline}.`;
          case "late":
            return `You missed your contract sign deadline on ${contract.signDeadline}. Contact your landlord if you'd like to start over.`;
          default:
            console.warn("This user action doesn't exist");
            return "";
        }
      } else {
        // is landlord
        switch(this.actionLevel) {
          case "ontime":
            return `${this.renterData.name}'s contract has been signed.`;
          case "approaching":
            return `${this.renterData.name}'s contract sign deadline is approaching.`;
          case "late":
            return `${this.renterData.name}'s contract sign deadline has expired.`;
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
    }
  },
  methods: {
    showMessaging: function() {
      this.view = "messages";
    },
    showSignProcess: function() {
      this.view = "contractSignProcess";
    },
    showContract: function() {
      this.view = "contract";
    },
    submit: function() {
      if (this.currentUserIsRenter && this.actionLevel === "approaching") {
        this.showSignProcess();
      } else if (!this.currentUserIsRenter && this.actionLevel === "ontime") {
        this.showContract();
      }
    },
  },
  components: {
    messages: MessagesView,
    contractSignProcess: ContractSignProcess,
    contract: Contract,
  },
  template: `
    <header-w-sidenav
      header="Sign Contract"
      :subheader="mainMessage"
    >
      <button
        slot="side-nav-content"
        v-on:click="showMessaging"
      >
        {{ contactButtonLabel }}
      </button>
      <button
        slot="side-nav-content"
        v-if="shouldShowSubmit"
        v-on:click="submit"
      >
        {{ submitLabel }}
      </button>
      <highlevel-contract
        slot="main-content"
        :contract="contract"
        :lesseeName="lesseeName"
        :active="false"
        :signatureDeadline="false"
      />
      <component :is="view"
        slot="main-content"
        :landlordUserId="landlordUserId"
        :renterUserId="renterUserId"
        :currentUserIsRenter="currentUserIsRenter"
        :contract="contract"
        :renterData="renterData"
      />
    </header-w-sidenav>
  `
});

export default ContractSignView;
