import Vue from 'vue';
import HighlevelContract from './HighlevelContract';

const RentView = Vue.component('rent-view', {
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
    }
  },
  template:`
    <div>
      <h1>
        Rent
      </h1>
      {{ mainMessage }}
      <highlevel-contract
        :contract="contract"
        :lesseeName="lesseeName"
        :active="false"
        :signatureDeadline="false"
        :signed="false"
        :securityDeposit="false"
        :duration="false"
      />
    </div>
  `
});

export default RentView;
