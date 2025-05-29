<template>
  <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
    <symbol id="icon-menu-bars" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-menu">
      <line x1="3" y1="12" x2="21" y2="12"></line>
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <line x1="3" y1="18" x2="21" y2="18"></line>
    </symbol>
  </svg>
  <div class="container-fluid mt-3">
    <app-loader v-if="isLoading"></app-loader>
    <router-view v-else/>
  </div>
</template>
<script>



import AppLoader from "@/components/AppLoader";
import AppContainer from "@/components/AppContainer";


export default {
  name: 'SinglePageLayout',
  components: {
    AppLoader,
    AppContainer
  },
  data() {
    return {
      isLoading: true,
      view_help: false,
      isMinMenu: false
    }
  },
  computed: {

  },
  async mounted() {
    this.isLoading = false;
  },
  methods: {

  }
}
</script>
