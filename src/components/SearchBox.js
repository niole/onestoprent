import Vue from 'vue';

const SearchBox = Vue.component('search-box', {
  props: [
    'onKeyUp',
    'items',
    'filter',
    'onClick',
    'formatLabel',
    'placeholder',
    'heightPerItem',
  ],
  computed: {
    shouldShow: function() {
      return this.filteredItems.length > 0;
    },
    filteredItems: function() {
      return this.items.filter(this.filter);
    },
  },
  template: `
      <div
        class="search-subview"
      >
        <input
          :placeholder="placeholder"
          type="search"
          v-on:keyup="onKeyUp"
        />
        <ul v-if="shouldShow" class="search-container">
          <li
            :style="{ height: heightPerItem }"
            v-for="item in filteredItems"
            v-on:click="onClick(item)"
          >
            {{ formatLabel(item) }}
          </li>
        </ul>
      </div>
  `
});

export default SearchBox;
