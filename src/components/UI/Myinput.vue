<template>
    <input class="input" :value="modelValue" @input="updateInput" type="text"/>
</template>

<script>
export default {
  name: "my-input",
  props: {
    modelValue: [String, Number]
  },
  methods: {
    updateInput(e){
      this.$emit('update:modelValue', e.target.value)
    }
  }
}
</script>

<style>
.input {
  border: 2px solid teal;
  width: 100%;
  height: 25px;
  border-radius: 5px;
}
</style>