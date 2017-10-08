import Vue from 'vue';

const FormInput = Vue.component('form-input', {
  props: [
    'name',
    'label',
    'placeholder',
    'id',
  ],
  template: `
    <div class="form-group">
      <label
        :for="name"
      >
        {{ label }}
      </label>
      <input :name="name" :placeholder="placeholder" :id="id" />
    </div>
  `
});

export default FormInput;
