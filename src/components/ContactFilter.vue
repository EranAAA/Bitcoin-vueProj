<template>
   <div class="contact-filter">
      <input @input="filter" ref="filter" placeholder="Search contacts" v-model="filterBy.txt" type="text" />
   </div>
</template>

<script>
export default {
   data() {
      return {
         filterBy: { txt: '' }
      }
   },
   methods: {
      filter() {
         this.$emit('filter', this.filterBy)
      }
   },
   mounted() {
      this.$refs.filter.focus()
   }
}
</script>

<style lang="scss">
.contact-filter {
   display: flex;
   justify-content: center;
   align-items: center;
   align-content: center;
   // margin: 10px;
   input {
      min-width: 360px;
      width: 50%;
      height: 30px;
      padding: 10px;
      border: unset;
      font-size: 16px;
      box-shadow: 0 0 3px 0px
   }
}
</style>