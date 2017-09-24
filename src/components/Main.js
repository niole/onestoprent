import Vue from 'vue';
const NavBar = require('./NavBar');

const Main = Vue.component('main-page', {
    data: function() {
      return {
        isRenter: false,
        userId: "123",
      };
    },
    template: `
      <div>
        <nav-bar
          :isRenter="isRenter"
          :userId="userId"
        />
      </div>
    `
});

export default Main;
