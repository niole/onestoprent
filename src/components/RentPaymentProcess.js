import Vue from 'vue';

const RentPaymentProcess = Vue.component('rent-payment-process', {
  props: {
    contract: {
      type: Object,
      required: true,
    },
    landlordUserId: {
      type: String,
      required: true,
    },
    renterUserId: {
      type: String,
      required: true,
    },
  },
  watch: {
    landlordUserId: function() {
      this.resetView();
    },
    renterUserId: function() {
      this.resetView();
    },
  },
  data: function() {
    return {
      view: "",
    };
  },
  methods: {
    resetView: function() {
      this.view = "";
    },
    updatePaymentType: function(event) {
      this.view = event.target.value;
    },
  },
  computed: {
    amountOwed: function() {
      return this.contract.rent;
    },
    dueDate: function() {
      return this.contract.rentDue;
    },
  },
  components: {
    check: {
      template:`
        <div>
          <h3>
            You've chosen to pay your rent by check.
          </h3>
          This requires that you send your landlord a check in the mail.
        </div>
      `
    },
    paypal: {
      template:`
        <div>
          <h3>
            You've chosen to pay your rent by Paypal.
          </h3>
        </div>
      `
    },
    venmo: {
      template:`
        <div>
          <h3>
            You've chosen to pay your rent by Venmo.
          </h3>
        </div>
      `
    },
  },
  template:`
    <div>
      <h1>
        Pay Rent
      </h1>
      <div>
        You owe {{ amountOwed }} on {{ dueDate }}.
      </div>
      <select name="paymentType" v-on:change="updatePaymentType">
        <option value="" selected>
          Select a Payment Type
        </option>
        <option value="check">
          Check
        </option>
        <option value="venmo">
          Venmo
        </option>
        <option value="paypal">
          Paypal
        </option>
      </select>
      <component :is="view" />
    </div>
  `
});

export default RentPaymentProcess;
