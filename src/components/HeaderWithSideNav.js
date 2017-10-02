import Vue from 'vue';

const HeaderWithSideNav = Vue.component('header-w-sidenav', {
  props: [
    'header',
    'subheader'
  ],
  template:`
    <div>
      <div class="main-with-left-nav">
        <div class="side-nav">
          <slot name="side-nav-content"></slot>
        </div>
        <div class="main-content">

        <div class="center-horiz">
          <h1>
            {{ header }}
          </h1>
        </div>
        <div class="center-horiz">
          {{ subheader }}
        </div>

        <slot name="main-content"></slot>
        </div>
      </div>
    </div>
  `
});

export default HeaderWithSideNav;
