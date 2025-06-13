<template>
  <input :value="modelValue" @input="updateInput" class="input" type="text">
</template>

<script>
   export default {
      name: 'Myinput',
      props: {
         modelValue :[String, Number],
      },
      methods: {
         updateInput(event) {
            this.$emit('update:modelValue', event.target.value);
         }
      }
   }
</script>

<style scoped>
.input {
   width: 100%;
   box-sizing: border-box;
   border-radius: 5px;
   padding: 10px 15px;
   border: 1px solid gray;
   font-size: 14px;
   margin-right: 10px;
   margin-top: 30px;
}

</style>
