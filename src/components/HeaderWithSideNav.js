import Vue from 'vue';

const HeaderWithSideNav = Vue.component('header-w-sidenav', {
  props: [
    'header',
    'subheader'
  ],
  template:`
    <div>
      <div class="center-horiz">
        <h1>
          {{ header }}
        </h1>
      </div>
      <div class="center-horiz">
        {{ subheader }}
      </div>
      <div class="main-with-left-nav">
        <div class="side-nav">
          <slot name="side-nav-content"></slot>
        </div>
        <slot name="main-content"></slot>
      </div>
    </div>
  `
});

export default HeaderWithSideNav;
