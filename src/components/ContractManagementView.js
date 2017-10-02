import Vue from 'vue';
import {
  getUserData,
  getAllContracts,
} from '../queryUtil';
import HighlevelContract from './HighlevelContract';
import InitializeContractProcess from './InitializeContractProcess';
import HeaderWithSideNav from './HeaderWithSideNav';

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
      selectedContract: {},
      userData: {},
    };
  },
  watch: {
    selectedContract: function(contract) {
      if (contract.lesseeUserId) {
        getUserData(contract.lesseeUserId)
          .then(({ data }) => {
            this.userData = data;
          })
          .catch(error => console.error(error));
      }
    },
  },
  methods: {
    resetSelectedContract: function() {
      this.selectedContract = {};
    },
    resetUserData: function() {
      this.userData = {};
    },
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
      this.resetSelectedContract();
      this.resetUserData();
      this.view = "find";
    },
    updateView: function(event) {
      this.resetSelectedContract();
      this.resetUserData();
      this.view = event.target.value;
    },
    getButtonClass: function(buttonType) {
      if (buttonType === this.view) {
        return "selected";
      }
    },
    selectContract: function(contract) {
      if (contract.id === this.selectedContract.id) {
        this.selectedContract = {};
      } else {
        this.selectedContract = contract;
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
    terminate: function() {
      // TODO add friction to this process
      console.log('terminate ', this.selectedContract);
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
    contractRenterName: function() {
      return `${this.userData.name}'s`;
    },
  },
  template: `
    <header-w-sidenav
      header="Manage Your Contracts"
      :subheader="subHeader"
    >
      <button
        slot="side-nav-content"
        v-if="!currentUserIsRenter"
        value="init"
        v-on:click="updateView"
        :class="getButtonClass('init')"
      >
        Initialize New Contract
      </button>

      <button
        slot="side-nav-content"
        value="terminate"
        v-on:click="updateView"
        :class="getButtonClass('terminate')"
      >
        Terminate Contract
      </button>
      <button
        slot="side-nav-content"
        value="find"
        v-on:click="updateView"
        :class="getButtonClass('find')"
      >
        Find Contract
      </button>

      <div
        slot="main-content"
        v-if="view !== 'init'"
        class="search-subview"
      >
        <input
          placeholder="find contract"
          type="search"
          v-on:keyup="filterContracts"
        />
        <ul>
          <li
            v-for="contract in contracts"
            v-if="contract.show"
            v-on:click="selectContract(contract)"
          >
            {{ contract.address }}
          </li>
        </ul>
      </div>

      <init-contract-process
        v-if="view === 'init'"
        slot="main-content"
        :userId="userId"
      />

      <div
        slot="main-content"
        v-if="selectedContract.id"
      >
        <highlevel-contract
          v-if="selectedContract.id"
          :contract="selectedContract"
          :lesseeName="contractRenterName"
        />
        <button
          v-if="view === 'terminate'"
          v-on:click="terminate"
        >
          Terminate This Renter's Contract
        </button>
      </div>
    </header-w-sidenav>
  `
});

export default ContractManagementView;
