import Vue from 'vue';
import Contract from './Contract';
import HighlevelContract from './HighlevelContract';
import MessagesView from './MessagesView';
import ContractRenewalProcess from './ContractRenewalProcess';
import ContractRenewalApprovalProcess from './ContractRenewalApprovalProcess';
import HeaderWithSideNav from './HeaderWithSideNav';

const ContractRenewalView = Vue.component('contract-renewal-view', {
  props: [
    'renterData',
    'landlordUserId',
    'renterUserId',
    'currentUserIsRenter',
    'contract',
    'actionLevel',
  ],
  data: function() {
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
    mainMessage: function() {
      if (this.currentUserIsRenter) {
        // is renter
        switch(this.actionLevel) {
          case "ontime":
            return "Your landlord has approved your contract renewal request.";
          case "approaching":
            return "Your contract is almost up. Would you like to renew?";
          case "late":
            return "Your contract has expired.";
          default:
            console.warn("This user action doesn't exist");
            return "";
        }
      } else {
        // is landlord
        switch(this.actionLevel) {
          case "ontime":
            return `${this.renterData.name} wants to start the contract renewal process.`;
          case "approaching":
            return `${this.renterData.name}'s contract is about to expire. We have reminded ${this.renterData.name}. Feel free to contact ${this.renterData.name} with further details if necessary.`;
          case "late":
            return `${this.renterData.name}'s contract has expired. We have reminded ${this.renterData.name}. Feel free to contact ${this.renterData.name} with further details if necessary.`;
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
    contactButtonLabel: function() {
      if (this.currentUserIsRenter) {
        return "Contact Landlord";
      }
      return `Contact ${this.renterData.name}`;
    },
    shouldShowSubmitButton: function() {
      if (this.currentUserIsRenter) {
        return this.actionLevel !== "late";
      }
      return this.actionLevel === "ontime";

    },
    submitLabel: function() {
      if (this.currentUserIsRenter) {
        // is renter
        switch(this.actionLevel) {
          case "ontime":
            // view contract
            return "View Contract";
          case "approaching":
            // renew contract
            return "Start Renewal Process";
          case "late":
            // ask landlord for an extension
            return "Contact Landlord";
          default:
            console.warn("This user action doesn't exist");
            return "";
        }
      } else {
        // is landlord
        switch(this.actionLevel) {
          case "ontime":
            // view contract and approve
            return "Start Renewal Process";
          case "approaching":
            // contact renter
            return "Contact Renter";
          case "late":
            // contact user
            return "Contact Renter";
          default:
            console.warn("This user action doesn't exist");
            return "";
        }
      }
    }
  },
  methods: {
    getButtonClass: function(buttonType) {
      if (this.view === buttonType) {
        return "selected";
      }
    },
    resetView: function() {
      this.view = "";
    },
    showMessaging: function() {
      this.view = "messages";
    },
    showContract: function() {
      this.view = "contract";
    },
    startContractRenewalProcess: function() {
      this.view = "contractRenewalProcess";
    },
    startRenewalApprovalProcess: function() {
      this.view = "contractRenewalApprovalProcess";
    },
    submit: function() {
      if (this.currentUserIsRenter) {
        if (this.actionLevel === "ontime") {
          this.showContract();
        } else if (this.actionLevel === "approaching") {
          // TODO start contract renewal process for renter
          this.startContractRenewalProcess();
        }
      } else {
        // is landlord
        if (this.actionLevel === "ontime") {
            // TODO view contract and approve or decline renter's renewal request
            this.startRenewalApprovalProcess();
        }
      }
    }
  },
  components: {
    messages: MessagesView,
    contract: Contract,
    contractRenewalProcess: ContractRenewalProcess,
    contractRenewalApprovalProcess: ContractRenewalApprovalProcess
  },
  template: `
    <header-w-sidenav
      header="Contract Renew"
      :subheader="mainMessage"
    >
      <button
        :class="getButtonClass('messages')"
        v-on:click="showMessaging"
        slot="side-nav-content"
      >
        {{ contactButtonLabel }}
      </button>
      <button
        slot="side-nav-content"
        v-if="shouldShowSubmitButton"
        v-on:click="submit"
      >
        {{ submitLabel }}
      </button>
      <highlevel-contract
        slot="main-content"
        :contract="contract"
        :lesseeName="lesseeName"
        :signed="false"
        :active="false"
        :signatureDeadline="false"
        :securityDeposit="false"
        :rentDue="false"
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

export default ContractRenewalView;
