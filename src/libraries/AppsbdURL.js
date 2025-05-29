import AppsbdUtls from "@/libraries/AppsbdUtls";
const apssbd_admin_url={
    get_plugin: function (action) {
        let actionStr = window.apbd_el_woo.base_slug + '-' + action;
        actionStr = actionStr.toLowerCase().replace("_", "-");
        return window.apbd_el_woo.ajax_url + '&action=' + actionStr;
    },
    get_module_url: function (module_id, action) {
        let actionStr = apbd_el_woo.base_slug + '-m-' + module_id + '-' + action;
        actionStr = actionStr.toLowerCase().replace(/_/g, "-");
        return apbd_el_woo.ajax_url + '&action=' + actionStr;
    }
}

const AppsbdURL = {
    install(Vue,translate) {
        Vue.config.globalProperties.$appsbdURL = apssbd_admin_url;
    },
}
export {apssbd_admin_url};
export default AppsbdURL;