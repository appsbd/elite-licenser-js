//
// import {useUserStore} from '@/modules/users/UserStore';
// const ACL = {
//     checkACL: (action_param) => {
//         try {
//             const userStore = useUserStore();
//             if (userStore?.adminUser?.caps && userStore.adminUser.caps[action_param] && userStore.adminUser.caps[action_param]=='Y') {
//                 return true;
//             }
//         }catch (e) { }
//         return true;//temporary, it should be return false;
//     },
//     install(Vue) {
//         Vue.config.globalProperties.$CheckACL = ACL.checkACL;
//     },
// }
// export default ACL;