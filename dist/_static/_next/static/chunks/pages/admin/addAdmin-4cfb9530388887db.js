(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[201],{1677:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/admin/addAdmin",function(){return r(2686)}])},5819:function(e,t,r){"use strict";var n=r(5893);r(7294);var o=r(1664),s=r.n(o),a=r(2177),i=r(1163);t.Z=function(){let e=(0,i.useRouter)(),t=()=>{a.Z.post("/adminLogout").then(t=>{e.push("/login")}).catch(e=>{console.log(e)})};return(0,n.jsxs)("div",{className:"fixed-top navbar navbar-default d-flex justify-content-end ",children:[(0,n.jsx)("div",{className:"profile",children:(0,n.jsx)(s(),{href:"/profile",children:(0,n.jsx)("button",{type:"button",className:"py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700",children:"Home"})})}),(0,n.jsx)("div",{className:"logout",children:(0,n.jsx)("button",{type:"button",onClick:t,className:"text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2",children:"Logout"})})]})}},2177:function(e,t,r){"use strict";var n=r(6154);let o=n.Z.create({baseURL:"http://localhost:5000",timeout:2e4,withCredentials:!0});t.Z=o},3019:function(e,t,r){"use strict";var n=r(2177);let o=async()=>{console.log("here");try{var e;let t=await n.Z.get("/checkAdminLogin");return(null==t?void 0:null===(e=t.data)||void 0===e?void 0:e.status)||void 0}catch(e){return console.log(e),!1}};t.Z=o},2686:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return m}});var n=r(5893),o=r(7294),s=r(1163),a=r(5301),i=r.n(a),l=r(2177),d=r(3019),c=r(5678);r(1399);var u=r(5819);function m(){let e=e=>c.Am.error(e,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored"}),t=e=>c.Am.success(e,{position:"top-right",autoClose:3500,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored"});(0,o.useEffect)(()=>{let e=async()=>{let e=await (0,d.Z)();e&&!1!==e||await r.push("/login")};e()},[]);let r=(0,s.useRouter)(),[a,m]=(0,o.useState)(""),[g,h]=(0,o.useState)(""),p=e=>{var t;m(null===(t=e.target)||void 0===t?void 0:t.value)},v=e=>{var t;h(null===(t=e.target)||void 0===t?void 0:t.value)},f=async r=>{r.preventDefault(),l.Z.post("/addAdmin",{username:a,password:g,PermissionType:"ADMIN"}).then(e=>{var r;t(null==e?void 0:null===(r=e.data)||void 0===r?void 0:r.success)}).catch(t=>{var r,n;e(null==t?void 0:null===(r=t.response)||void 0===r?void 0:null===(n=r.data)||void 0===n?void 0:n.error)})};return(0,n.jsxs)("div",{className:"container-fluid d-flex justify-content-center align-items-center align-content-center mt-auto",children:[(0,n.jsx)(i(),{}),(0,n.jsx)(u.Z,{}),(0,n.jsx)(c.Ix,{}),(0,n.jsx)("div",{className:"container-fluid container",children:(0,n.jsxs)("form",{children:[(0,n.jsx)("div",{className:"d-flex justify-content-center align-items-center align-content-center mt-auto",children:(0,n.jsx)("span",{children:"Add Admin"})}),(0,n.jsxs)("div",{className:"form-group",children:[(0,n.jsx)("label",{htmlFor:"exampleInputEmail1",children:"UserName"}),(0,n.jsx)("input",{type:"text",className:"form-control ",placeholder:"Enter UserName",onChange:e=>p(e),required:!0})]}),(0,n.jsxs)("div",{className:"form-group ",children:[(0,n.jsx)("label",{htmlFor:"exampleInputPassword1",children:"Password"}),(0,n.jsx)("input",{type:"password",className:"form-control ",placeholder:"password",onChange:e=>v(e),required:!0})]}),(0,n.jsx)("div",{className:"form-group ",children:(0,n.jsx)("button",{onClick:f,className:"loginBtn form-control mt-3",children:"Submit"})})]})})]})}}},function(e){e.O(0,[827,664,477,774,888,179],function(){return e(e.s=1677)}),_N_E=e.O()}]);