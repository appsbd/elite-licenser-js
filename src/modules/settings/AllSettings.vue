<template>
  <module-loader v-if="is_loading" />
  <div v-else class="row g-3">
    <div class="col-sm-7">
      <div class="card apbd-theme-card el-shadow m-3 " style="margin-right: unset !important;">
        <div class="card-header">
          <h6>Woocommerce Elite Licenser Settings</h6>
        </div>
        <SettingsForm  @invalid="$emit('loading',false)" ref="gs-form"  :on-submit="storeSettings"
                              class="needs-validation ">
        <div class="card-body p-3">

            <div class="row mb-3">
              <label for="license_generate_event" class="col-sm-4 col-form">License Generate Event</label>
              <div class="col-sm-8">
                <Field class="form-select form-select-sm" name="generate_status" label="License Generate Event"
                       as="select" rules="required" id="generate_status"
                       v-model="settings.generate_status">
                  <option value='' disabled>Select</option>
                  <option :value="item.val" v-for="(item,s_key) in this.gen_status">{{ item.label }}</option>

                </Field>
                <ErrorMessage name="generate_status" class="apbd-v-error"/>
              </div>
            </div>
            <div class="row mb-3">
              <label class="col-sm-4 col-form">Elite Licenser Installed Type</label>
              <div class="col-sm-8">
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="installed_type" value="R" v-model="settings.installed_type" id="installed_type1">
                  <label class="form-check-label" for="installed_type1">
                    Remote Server
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="installed_type" value="A" :disabled="has_el_self=='N'"  v-model="settings.installed_type" id="installed_type2" >
                  <label class="form-check-label" for="installed_type2">
                    In this APP [Not Installed or Activated]
                  </label>
                </div>
              </div>
            </div>
            <div class="row mb-3">
              <label for="api_end_point" class="col-sm-4 col-form">API End Point</label>
              <div class="col-sm-8">
                <Field type="text" class="form-control form-control-sm"  placeholder="Elite Licenser API End Point"  name="api_end_point" label="Api end point"  rules="required" id="api_end_point" v-model="settings.api_end_point" />
                <ErrorMessage name="api_end_point" class="apbd-v-error"/>
              </div>
            </div>
            <div class="row ">
              <label for="api_key" class="col-sm-4 col-form">API Key</label>
              <div class="col-sm-8">
                <Field type="text" class="form-control form-control-sm " placeholder="Elite Licenser API Key" name="api_key" label="Api key"  rules="required" id="api_key" v-model="settings.api_key" />
                  <ErrorMessage name="api_key" class="apbd-v-error"/>
              </div>
            </div>
          <div class="row mb-3">
            <div class="col-sm-12">
              <hr>
            </div>
            <div class="col-sm-6 ">
              <h6 v-translate>Disable the license key when the order status is set to:</h6>
            </div>
          </div>
          <div>
            <field label="Refund Status" rules="required" v-model="settings.refund_status" class="form-select"
                   name="refund_status">

              <image-radio-input type="checkbox" :is-inline="true" margin="0 10px 0 0" :options="cancel_status"
                                 name="refund_status" v-model="settings.refund_status"/>
            </field>
            <ErrorMessage name="refund_status" class="apbd-v-error"/>
            <small class="d-flex  help-text text-muted text-italic ">
              Select these statuses when you want to deactivate the license key in Elite Licenser.</small>
          </div>
        </div>
          <div class="card-footer d-flex justify-content-end">
            <button type="submit" class="btn btn-sm btn-success">Save</button>
          </div>
        </SettingsForm>
      </div>
    </div>
    <div class="col-sm-5">
       <div class="card apbd-theme-card m-3 el-shadow" style="margin-left: unset !important;">
         <div class="card-header">
           <h6>About Eite Licenser</h6>
         </div>
         <div class="card-body p-3">
           <div class="mb-3">
             <small>
               Elite Licenser is a WordPress plugin for any types of product licensing. It also manages product updates, auto generates license code, built in Envato licensing verification system, full license control and more. It has full set of API, so you can handle it by other applications as well. One app handles license of all your products. You can handle any language (PHP, .Net, Java, Android, etc.). Also you can add licensing to more than one WordPress plugin or theme and it can be installed on same WordPress.
             </small>
           </div>

           <div>
             <a href="https://elitelicenser.com/" class="btn btn-success" target="_blank">View Details</a>
           </div>
         </div>
       </div>
      <div class="card apbd-theme-card el-shadow m-3" style="margin-left: unset !important;">
        <div class="card-header">
          <h6>Related App or Plugins</h6>
        </div>
        <div class="card-body p-3">

          <div class="row row-cols-3 g-3">
            <div class="col" v-for="addon in addons">
              <div class="card h-100 shadow-sm border-0 mt-0">
                <img class="card-img-top" :src="addon.img_url" alt="Support system">
                <div class="card-body">
                  <h5 class="card-title"> {{ addon.title }}</h5>
                  <small class="card-text ">{{ addon.details }}</small>

                </div>
                <div class="card-footer border-0 p-3">
                  <a :href="addon.product_link" target="_blank" class="btn-sm btn btn-primary">View Details</a>
                </div>
              </div>
          </div>

          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import {Form, Field, ErrorMessage} from "vee-validate";
import ModuleLoader from "@/components/ModuleLoader";
import SettingsForm from "@/components/SettingsForm";
import {mapStores} from 'pinia';
import {useSettingStore} from "@/modules/settings/SettingStore";
import ImageRadioInput from "@/components/ImageRadioInput.vue";
export default {
name: "AllSettings",
  components:{ImageRadioInput, ModuleLoader, Form,Field,ErrorMessage,SettingsForm},
  data()
  {
    return{
      is_loading:false,
      settings:{
        installed_type:'',
        api_end_point:'',
        order_refund:'N',
        order_cancel:'N',
        order_failed:'N',
      },
      has_el_self:'N',
      gen_status:[ ],
      cancel_status:[ ],
      addons:[ ],
    }
  },
  mounted() {
    this.getSettings();
  },
  computed:{
     ...mapStores(useSettingStore)
  },
  methods:{
    async getSettings() {
      this.is_loading = true;
      let resp = await this.settingStore.loadSettings();
      if (resp) {
        console.log(resp);
        this.settings = {...resp.settings};
        this.gen_status =  resp?.gen_status?[...resp.gen_status]:[];
        this.cancel_status = resp?.cancel_status?[...resp.cancel_status]:[];
        this.has_el_self = resp?.has_el_self?resp.has_el_self:'N';
        this.addons = resp?.addons?[...resp.addons]:[];

      }
      this.is_loading = false;
    },
    async storeSettings()
    {
      try {
        let response = await this.settingStore.storeSettings(this.settings);
        if (response.status) {
          this.settings = response.data;
        }
        if(response?.msg){
          this.$appsbdUtls.ShowServerResponseNotification(response.msg, 5000);
        }

      }catch (e)
      {
        console.log(e)
      }
      this.$emit('loading', false);
    }
  }

}
</script>

<style lang="scss" scoped>
.el-shadow{
  box-shadow: var(--bs-box-shadow-sm) !important;
  border:none;
  .card-header,hr,.card-footer{
    border-color: rgba(190, 190, 190, 0.15);
  }
  hr{
    opacity: 1;
  }
}
.el-more-addon{
  display: flex;
  flex-direction: column;
  .el-more-img{
    height:100px;
    border:1px solid red;
    overflow: hidden;
    padding: 0;
    img{
      padding: 0;
      width: 100%;
      max-height: 100%;
      object-fit: cover;
    }
  }
}
</style>