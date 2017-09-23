import Vue from 'vue';

const Main = Vue.component('tea-list', {
    data: {
    },
    template: `
      <ul>
        <tea
          v-for="tea in teaList"
          :name="tea.name"
          :link="tea.link"
          :key="tea.link"
        />
      </ul>
    `
})

export default Main;
