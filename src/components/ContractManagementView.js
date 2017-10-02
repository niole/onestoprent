import Vue from 'vue';
import { getAllContracts } from '../queryUtil';

const ContractManagementView = Vue.component('contract-management-view', {
  props: {
    userId: {
      type: String,
      required: true,
    },
    currentUserIsRenter: {
      type: Boolean,
      required: true,
    }
  },
  mounted: function() {
      this.getAllContracts(this.userId);
  },
  watch: {
    userId: function(id) {
      this.getAllContracts(id);
    },
  },
  data: function() {
    return {
      view: "find",
      contracts: [],
    };
  },
  methods: {
    getAllContracts: function(id) {
      getAllContracts(id, this.currentUserIsRenter)
        .then(({ data }) => {
          this.contracts = data.map(c => {
            c.show = false
            return c;
          });
        })
        .catch(error => console.error(error));
    },
    resetView: function() {
      this.view = "find";
    },
    updateView: function(event) {
      this.view = event.target.value;
    },
    getButtonClass: function(buttonType) {
      if (buttonType === this.view) {
        return "selected";
      }
    },
    filterContracts: function(event) {
      const value = event.target.value;
      const p = new RegExp(value, 'i');

      this.contracts = this.contracts.map(c => {
        if (value && p.test(c.address)) {
          c.show = true;
        } else if (c.show) {
          c.show = false;
        }
        return c;
      });
    },
  },
  computed: {
    subHeader: function() {
      if (this.view) {
        if (this.view === "terminate") {
          return "Use the search box to find the contract you wish to terminate.";
        } else if (this.view === "init") {
          return "Fill out the fields in order to start the contract initialization process.";
        } else if (this.view === "find") {
          return "Use the search box to find the contract you're looking for.";
        }
      }
    },
  },
  template: `
    <div>
      <h1>
        Manage Your Contracts
      </h1>
      <h3>
        {{ subHeader }}
      </h3>
      <div>
        <div>
          <button
            v-if="!currentUserIsRenter"
            value="init"
            v-on:click="updateView"
            :class="getButtonClass('init')"
          >
            Initialize New Contract
          </button>
          <button
            value="terminate"
            v-on:click="updateView"
            :class="getButtonClass('terminate')"
          >
            Terminate Contract
          </button>
          <button
            value="find"
            v-on:click="updateView"
            :class="getButtonClass('find')"
          >
            Find Contract
          </button>
        </div>
        <div>
          <input
            placeholder="find contract"
            type="search"
            v-on:keyup="filterContracts"
          />
          <ul>
            <li
              v-for="contract in contracts"
              v-if="contract.show"
            >
              {{ contract.address }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  `
});

export default ContractManagementView;
