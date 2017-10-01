import Vue from 'vue';
import HighlevelContract from './HighlevelContract';

const ContractRenewalView = Vue.component('contract-renewal-view', {
  props: [
    'renterData',
    'landlordUserId',
    'renterUserId',
    'currentUserIsRenter',
    'contract',
    'actionLevel',
  ],
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
    getSubmitHandler: function() {
      if (this.currentUserIsRenter) {
        // is renter
        switch(this.actionLevel) {
          case "ontime":
            // view contract
            return "Your landlord has approved your contract renewal request.";
          case "approaching":
            // renew contract
            return "Your contract is almost up. Would you like to renew?";
          case "late":
            // ask landlord for an extension
            return "Your contract has expired. Contact your ";
          default:
            console.warn("This user action doesn't exist");
            return "";
        }
      } else {
        // is landlord
        switch(this.actionLevel) {
          case "ontime":
            // view contract and approve
            return `${this.renterData.name} wants to start the contract renewal process.`;
          case "approaching":
            // contact renter
            return `${this.renterData.name}'s contract is about to expire. We have reminded ${this.renterData.name}. Feel free to contact ${this.renterData.name} with further details if necessary.`;
          case "late":
            // contact user
            return `${this.renterData.name}'s contract has expired. We have reminded ${this.renterData.name}. Feel free to contact ${this.renterData.name} with further details if necessary.`;
          default:
            console.warn("This user action doesn't exist");
            return "";
        }
      }
    }
  },
  template: `
    <div>
      <h1>
        Contract Renew
      </h1>
      {{ mainMessage }}
      <button v-on:click="getSubmitHandler">
        {{ submitLabel }}
      </button>
      <highlevel-contract
        :contract="contract"
        :lesseeName="lesseeName"
        :signed="false"
        :active="false"
        :signatureDeadline="false"
        :securityDeposit="false"
        :rentDue="false"
      />
    </div>
  `
});

export default ContractRenewalView;
