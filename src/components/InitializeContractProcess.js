import Vue from 'vue';
import {
  getLandlordProperties,
} from '../queryUtil';
import FormInput from './FormInput';

const InitializeContractProcess = Vue.component('init-contract-process', {
  props: {
    userId: {
      type: String,
      required: true,
    },
  },
  mounted: function() {
    this.getProperties();
  },
  data: function() {
    return {
      properties: [],
      selectedProperty: "",
    };
  },
  methods: {
    getProperties: function() {
      getLandlordProperties(this.userId)
        .then(({ data }) => {
          this.properties = data;
        })
        .catch(error => console.error(error));
    },
    selectProperty: function(event) {
      const propertyId = event.target.value;
      this.selectedProperty = propertyId;
    },
  },
  template: `
    <div>
      <h1>
        Initialize New Contract
      </h1>
      <form action="">

        <select
          name="whichProperty"
          v-on:change="selectProperty"
        >
          <option selected value="">
            Add Property To Contract
          </option>
          <option
            v-for="property in properties"
            :value="property.id"
          >
            {{ property.address }}
          </option>
        </select>

        <form-input
          label="Apartment Number (optional)"
          name="apartmentNumber"
        />
        <form-input
          label="Lessee Name"
          name="lesseeName"
        />
        <form-input
          label="Duration (days)"
          name="duration"
        />
        <form-input
          label="Sign Deadline"
          name="signDeadline"
        />
        <form-input
          label="Monthly Rent"
          name="rent"
        />
        <form-input
          label="Rent Due"
          name="rentDue"
        />
        <form-input
          label="Security Deposit"
          name="securityDeposit"
        />
        <button type="submit">
          Create Contract and Notify Lessee
        </button>
      </form>
    </div>
  `
});

export default InitializeContractProcess;
