<template>
    <div class="accordion-item">
      <h2 class="accordion-header" >
        <button class="accordion-button p-0" type="button" @click="toggle_collapse">
          <i v-show="!hideMenuIcon" ref="togglar" class="apbd-toggler ms-2 vps vps-side-menu-three collapsed" data-bs-toggle="collapse" :data-bs-target="'#item-collapse-field-'+acc_id" aria-expanded="true" :aria-controls="'item-collapse-field-'+acc_id"></i>
          <div class="header-full w-100">
            <slot  name="header-full" :stop_propagation="stop_propagation">
              <div class="w-100" @click="stop_propagation($event)">
                <slot  name="header">
                  <div class="p-3 "> Title </div>
                </slot>
              </div>
            </slot>
          </div>
          <span class="apbd-accrodian-icon"></span>
        </button>
      </h2>
      <div ref="apbdAccBody" :id="'item-collapse-field-'+acc_id" class="accordion-collapse collapse" :aria-labelledby="'heading_'+acc_id"  :data-bs-parent="'#'+parentId">
        <div class="accordion-body">
          <slot name="body"></slot>
        </div>
      </div>
    </div>


</template>

<script>
var id=1;
export default {
  name: "ApbdAccrodionItem",
  props:{
    hideMenuIcon:{
      default:false
    },
    parentId:{
      default:'noparent'
    },
    isShow:{
      default:false
    }
  },
  data(){
    return {
      acc_id:0
    }
  },
  created() {
    this.acc_id=id;
    id++;

  },
  mounted() {
    try{
      if(this.isShow) {
        this.$refs.apbdAccBody.classList.add('show');
        this.$refs.togglar.classList.remove('collapsed');
      }
    }catch (e) {
      
    }
  },
  methods: {
    stop_propagation(e) {
      e.preventDefault();
      e.stopPropagation();
      try {
        if(!this.$refs.apbdAccBody.classList.contains('show')) {
          this.toggle_collapse();
        }
      }catch (e) {}

    },
    toggle_collapse() {
      this.$refs.togglar.click();
    },

  }
}
</script>

<style scoped lang="scss">

.accordion-header {

  .accordion-button {
    box-shadow: none;

    &::after {
      margin-right: 15px;
      display:none;
    }
    .apbd-toggler+.header-full+.apbd-accrodian-icon{
      margin-right: 15px;
      background-image: var(--bs-accordion-btn-active-icon);
      background-repeat: no-repeat;
      transition: var(--bs-accordion-btn-icon-transition);
      width: var(--bs-accordion-btn-icon-width);
      height: var(--bs-accordion-btn-icon-width);
    }
    .apbd-toggler.collapsed+.header-full+.apbd-accrodian-icon{
       transform: var(--bs-accordion-btn-icon-transform);
     }
  }
}
.accordion-collapse{
  border-top:1px solid var(--bs-accordion-border-color);
}
</style>
