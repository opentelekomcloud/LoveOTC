import{d as y,X as Fe,U as We,r as x,u as ge,j as n,A as Qe,W as Xe,a as W,b as ve,T as qe,h as Ye,t as p,s as $,m as P,c as Je,e as ee,f as te,g as se,i as U,D as Te,k as Se,l as Ee,n as Ke,o as Le,F as L,I as _,L as H,p as Ie,q as pe,B as N,S as xe,v as M,H as Q,w as Ne,M as ke,x as Ge,y as h,z as G,C as Oe,E as Ze,G as et,J as tt,K as R,N as oe,O as st,P as nt,Q as rt,R as at,V as ot,Y as it,Z as ct,_ as ut,$ as V,a0 as lt,a1 as dt,a2 as Pe,a3 as ht,a4 as mt,a5 as Ae,a6 as X,a7 as pt,a8 as q,a9 as gt,aa as xt,ab as ft,ac as wt,ad as yt,ae as Pt,af as Ct,ag as jt,ah as bt,ai as vt,aj as Tt,ak as St,al as Et,am as Lt,an as It,ao as Nt,ap as kt,aq as Gt,ar as Y,as as Ot,at as At,au as $t}from"./vendor-4TK-gWq9.js";class k{namespace;info;error;warn;debug;throw;constructor(...e){this.namespace=e.join(" > "),this.error=console.error.bind(this,this.baseColor(101,"error"),`
	`),this.warn=console.warn.bind(this,this.baseColor(103,"warn"),`
	`),this.info=console.info.bind(this,this.baseColor(104,"info"),`
	`),this.debug=console.debug.bind(this,this.baseColor(102,"debug"),`
	`),this.throw=console.log.bind(this,this.baseColor(105,"throw"),"↓ The Following Error is Thrown ↓")}With(...e){return new k(this.namespace,...e)}baseColor(e,t){return`\x1B[${e};30;1m ${t.toUpperCase()} \x1B[0m\x1B[100;97m ${y().format("YY-M-D H:m:s")} \x1B[1m\x1B[40;97m ${this.namespace} `}}class Ut{constructor(e,t){this.DB=e,this.Name=t,this.Sto=e.table(t),this.Trim()}Sto;async Get(e,t){const s=await this.Sto.get(e);return s?t&&await Promise.resolve(t(s))||typeof s.Exp=="number"&&s.Exp<y().unix()?(await this.Sto.delete(e),null):s.Val:null}async GetOrSet(e,t,s,r){const a=await this.Get(e,r);return a||this.Set(e,await Promise.resolve(t()),s)}async Set(e,t,s){if(!t)throw TypeError("Value cannot be null");if(s===null)return await this.Sto.put({Id:e,Exp:s,Val:t}),t;const r=(s||y().add(1,"week")).unix();if(s&&r<y().unix())throw RangeError(`Expire time [${r}] cannot be less than now [${y().unix()}]`);return await this.Sto.put({Id:e,Exp:r,Val:t}),t}Trim(){return this.Sto.filter(e=>typeof e.Exp=="number"&&e.Exp<y().unix()).delete()}}const ne=new Fe("EShop",{autoOpen:!1});ne.version(1).stores({Shared:"Id, Exp",ShopCart:"Id"});ne.open();const E=new Ut(ne,"Shared"),ie=ne.table("ShopCart");class z{static get LocalUser(){const e=localStorage.getItem("oidc.user:https://keycloak.eco.tsi-dev.otc-service.com/realms/eco:loveotc");return e?We.fromStorageString(e):null}static AuthSlot;static get Auth(){return new Promise(e=>{if(this.AuthSlot)return e(this.AuthSlot);const t=setInterval(()=>{this.AuthSlot&&(clearInterval(t),e(this.AuthSlot))},100)})}static async AccessToken(){let{isAuthenticated:e,user:t,signinSilent:s}=await this.Auth;if(e||(t=await s()),t)return t.access_token}}function ce(o){return`/${o.filter(t=>t).map(t=>t.toString().replace(/^\/+/,"")).join("/")}`}const $e=x.createContext({});function O(){return x.useContext($e)}function Mt({children:o}){const[e,t]=x.useState(()=>({Paths:location.pathname.split("/").filter(c=>c),Search:new URLSearchParams(location.search),Put:s,Nav:(...c)=>a(ce(c)),Rep:(...c)=>i(ce(c)),Reload:(...c)=>u(c)}));function s(c){history.replaceState(null,"",`${location.pathname}${c.size?"?":""}${c.toString()}`),e.Search=new URLSearchParams(c),t({...e})}function r(c){e.Paths=c.split("/").filter(l=>l),e.Search=new URLSearchParams(location.search),t({...e})}function a(c){history.pushState(null,"",c),r(c)}function i(c){history.replaceState(null,"",c),r(c)}function u(c){history.replaceState(null,"","/Reload"),r("/Reload"),setTimeout(()=>{const l=c.length?ce(c):location.pathname;history.pushState(null,"",l),r(l)},100)}return ge(()=>{location.pathname==="/"&&location.search.startsWith("?/")&&i(location.search.substring(2)),addEventListener("click",c=>{const l=c.target?.closest("a");if(l){if(l.origin!==location.origin){l.target="_blank";return}c.preventDefault(),a(l.pathname)}}),addEventListener("popstate",c=>{c.preventDefault(),r(location.pathname)})}),n.jsx($e.Provider,{value:e,children:o})}function Rt({children:o}){const{Rep:e}=O();return n.jsxs(Qe,{client_id:"loveotc",scope:"openid profile email address phone",userStore:new Xe({store:window.localStorage}),onSigninCallback:()=>{e("/"),location.reload()},authority:"https://keycloak.eco.tsi-dev.otc-service.com/realms/eco",post_logout_redirect_uri:"https://shop.eco.tsi-dev.otc-service.com/Logout",redirect_uri:"https://shop.eco.tsi-dev.otc-service.com/Login",children:[n.jsx(Bt,{}),o]})}const Dt=new k("Auth");function Bt(){const o=z.AuthSlot=W(),{Paths:e,Rep:t}=O();return ge(()=>{if(e.at(0)==="Logout")return o.removeUser(),t("/");!Ye()&&!o.isAuthenticated&&!o.activeNavigator&&!o.isLoading&&o.signinRedirect()}),ve(()=>{o.error&&Dt.warn(o.error)},[o.error]),n.jsx(qe,{pauseOnHover:!0})}function J({children:o}){const e=W();return e.isLoading?"Authenticating...":e.isAuthenticated?o:null}function Vt({children:o}){return W().isAuthenticated?null:o}const j={display:"flex"},Ht={flexDirection:"column"},D={...j,...Ht},en={...j,backgroundColor:p.colorNeutralBackground1,boxShadow:p.shadow4,...$.borderRadius(p.borderRadiusMedium)},_t={whiteSpace:"pre-line"},fe=60,we="1636px",zt={objectFit:"cover",objectPosition:"center"},Ft=P({pre:_t});function re(o){const e=Ft(),{dispatchToast:t}=Je();return{dispatch:s=>{const r=s.Error.message,a=r.indexOf("Exception:");let i=r;a!==-1&&(i=r.substring(a+10)),t(n.jsxs(ee,{children:[n.jsx(te,{children:"Internal Error"}),n.jsx(se,{subtitle:n.jsxs(U,{className:e.pre,children:[i,n.jsx("br",{}),"More Info, See Console"]}),children:n.jsx(U,{className:e.pre,children:s.Message})})]}),{intent:"error",timeout:1e4}),o.error(s)},dispatchToast:t}}const Wt=P({box:{...D,rowGap:p.spacingVerticalM},one:{...j,columnGap:p.spacingVerticalXXXL}}),Ce=new k("Setting");function Ue({Open:o,Toggle:e,New:t}){const s=Wt(),r=W(),[a,i]=x.useState(),[u,c]=x.useState(),[l,d]=x.useState(),m=b.User.Get.useMe(Ce);x.useEffect(()=>{if(t||!m)return;const{Name:w,Phone:g,Address:ze}=m;i(w),c(g),d(ze)},[m]);const{dispatch:f,dispatchToast:T}=re(Ce),{run:S}=b.User.Post.useUpdate({manual:!0,onError(w,[g]){f({Message:`Failed ${t?"Create":"Update"} Info`,Error:w,Request:g})},onSuccess(w,[g]){T(n.jsxs(ee,{children:[n.jsxs(te,{children:["Info ",t?"Created":"Updated"]}),n.jsxs(se,{children:[g.Name,n.jsx("br",{}),g.Phone,n.jsx("br",{}),g.Address]})]}),{intent:"success"}),t&&(B.next(!1),B.complete(),B.closed=!0),e()}});return n.jsx(Te,{open:o,onOpenChange:e,modalType:t?"alert":"modal",children:n.jsx(Se,{children:n.jsxs(Ee,{children:[n.jsx(Ke,{children:t?"Welcome! Fill in your info to get started.":"Personal Information"}),n.jsxs(Le,{className:s.box,children:[n.jsxs("div",{className:s.one,children:[n.jsx(L,{label:"Name",size:"large",required:!0,children:n.jsx(_,{size:"medium",value:a,maxLength:20,onChange:(w,g)=>i(g.value)})}),n.jsx(L,{label:"Phone",size:"large",required:!0,children:n.jsx(_,{size:"medium",value:u,maxLength:20,onChange:(w,g)=>c(g.value)})})]}),n.jsx(L,{label:"E-Mail",size:"large",children:n.jsx(H,{children:r.user?.profile.email})}),n.jsx(L,{label:"Address",size:"large",required:!0,children:n.jsx(_,{size:"medium",value:l,maxLength:100,minLength:20,onChange:(w,g)=>d(g.value)})})]}),n.jsxs(Ie,{children:[!t&&n.jsx(pe,{disableButtonEnhancement:!0,children:n.jsx(N,{appearance:"secondary",children:"Cancel"})}),n.jsx(N,{appearance:"primary",onClick:()=>S({EMail:r.user?.profile.email,Name:a,Address:l,Phone:u}),children:"Submit"})]})]})})})}const B=new xe;function Qt(){const[o,{toggle:e}]=M();return ge(()=>B.subscribe(t=>t&&e())),n.jsx(J,{children:n.jsx(Ue,{Open:o,Toggle:e,New:!0})})}class Me extends Error{constructor(){super("Please Login First")}}class Xt extends Error{constructor(){super("Server Returned False")}}class Re extends Error{constructor(){super("Server Returned Empty Response")}}class De{static async EnsureConnected(){return this.Hub.state===Q.Connected?Promise.resolve():((this.Hub.state===Q.Disconnected||this.Hub.state===Q.Disconnecting)&&await this.Hub.start(),new Promise(e=>{const t=setInterval(()=>{this.Hub.state===Q.Connected&&(clearInterval(t),e())},100)}))}static async Invoke(e,...t){return await this.EnsureConnected(),this.Hub.invoke(e,...t)}static EnsureLogin(){if(!z.LocalUser||z.LocalUser.expired)throw new Me}static EnsureTrue(e){if(!e)throw new Xt}static Index(e,t){return`${t}_${e}`}static async UpdateCache(e,t,s,r){const a=this.Index(t,s),i=await E.Get(a);if(!i)return;const u=e(i);i.QueryExp?await E.Set(a,{...u,QueryExp:y().add(1,"m").unix()},null):await E.Set(a,u,r||null)}static async GetVersionCache(e,t){const s=this.Index(e,t),r=await E.Get(s);if(r&&r.QueryExp>y().unix())return r;const a=await Promise.resolve(this.Invoke(t,e,r?.Version));if(a===!0)return E.Set(s,{...r,QueryExp:y().add(1,"m").unix()},null),r;if(!a)throw E.Sto.delete(s),new Re;return await E.Set(s,{...a,QueryExp:y().add(1,"m").unix()},null),a}static async GetTimeCache(e,t,s,...r){return await E.GetOrSet(this.Index(e,t),async()=>await this.Invoke(t,...r),s(y()))}static async HandleFileStream(e,t,s){const a=Math.ceil(e.size/30720);let i=0;for(;i<a;){const u=i*30720,c=Math.min(u+30720,e.size),l=e.slice(u,c),d=new FileReader,m=await new Promise((f,T)=>{d.onload=()=>f(new Uint8Array(d.result)),d.onerror=()=>T(d.error),d.readAsArrayBuffer(l)});t.next(m),s?.debug(`Sent chunk ${i+1}/${a}`),i++}t.complete()}}class v extends De{static Log=["|","ShopNet"];static Hub=new Ne().withUrl("/Hub",{logMessageContent:!1,async accessTokenFactory(){const e=await z.AccessToken();return e||""}}).withAutomaticReconnect().withStatefulReconnect().withHubProtocol(new ke).configureLogging(Ge.Information).build()}v.Hub.on("OnNewUser",()=>{B.next(!0),console.debug("OnNewUser")});class qt extends v{static Categories(){return this.GetTimeCache("","GalleryGetCategories",e=>e.add(1,"m"))}static async Products(e){const t=await this.GetTimeCache(e,"GalleryGetProducts",s=>s.add(1,"m"),e);return[t,4-t.length%4]}}const Yt={Get:qt};class Jt extends v{static async Get(e){if(!/^[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}$/i.test(e))throw new Error(`Invalid ObjectId ${e}`);return await this.EnsureConnected(),this.Hub.stream("ObjectStorageGet",e)}static GetBySlice(e,t){const s=[];return E.GetOrSet(e,()=>new Promise((r,a)=>{this.Get(e).then(i=>i.subscribe({error(u){a(u)},next(u){s.push(u),t.debug("Received Slice",e,s.length)},complete(){r(s)}}))}))}}class Kt extends v{static useDelete(e){return h(async t=>{this.EnsureLogin();const s=await this.Invoke("OrderDeleteCancel",t);return this.EnsureTrue(s),s},e)}}class I extends v{static Product(e){return this.GetVersionCache(e,"ProductEntity")}static Lexical(e){return this.GetVersionCache(e,"LexicalEntity")}static Photo(e){return this.GetVersionCache(e,"PhotoEntity")}static Type(e){return this.GetVersionCache(e,"TypeEntity")}static Variant(e){return this.GetVersionCache(e,"VariantEntity")}}class A extends I{static Log=[...super.Log,"Product","Get"];static async Basic(e,t){const s=t.With(...this.Log,"Basic"),r=await this.Product(e);if(!r)throw new Error(`Product ${e} Not Found`);const[a,i]=await this.PhotoList(e,t);return i?{Name:r.Name,Cover:i}:(s.warn(`Product ${e} has no photo`),{Name:r.Name,Cover:""})}static Limit(e){return this.Invoke("ProdGetLimit",e)}static async Combo(e,t){const s=t.With(...this.Log,"Combo"),r=await this.ComboList(e),a=[];for(const i of r){const u={};for(const c of i.Types){const l=await this.Type(c);if(!l){s.error(`[Mismatch] Type ${c} not found. Combo ${i.ComboId} : Product ${e}`);continue}const d=await this.Variant(l.VariantId);if(!d){s.error(`[Mismatch] Variant ${l.VariantId} not found. Combo ${i.ComboId} : Type ${c} : Product ${e}`);continue}u[d.Name]=l.Name}a.push({Id:i.ComboId,Stock:i.Stock,Combo:u})}return a}static ComboList(e){return this.GetTimeCache(e,"ProductGetComboList",t=>t.add(1,"m"),e)}static async PhotoList(e,t){const s=t.With(...this.Log,"PhotoList"),r=await this.GetTimeCache(e,"ProductGetPhotoList",u=>u.add(1,"m"),e).catch(s.error);let a=[],i="";for(const u of r||[]){const c=await this.Photo(u).catch(s.error);c?(a.push(c),c.Cover&&(i=c.ObjectId)):s.warn(`Photo ${u} not found in Product ${e}`)}return a=a.sort((u,c)=>u.Order-c.Order),!i&&a.length>0?(s.warn(`Product ${e} has no cover photo, using first photo instead`),[a,a[0].ObjectId]):[a,i]}}class ue extends v{static Order(e){return this.EnsureLogin(),this.GetVersionCache(e,"OrderEntity")}static Comment(e){return this.EnsureLogin(),this.GetVersionCache(e,"CommentEntity")}}class Zt extends v{static Log=[...super.Log,"Order","Get"];static async List(e){this.EnsureLogin();const t=e.With(...this.Log,"List"),s=await this.GetTimeCache("","OrderGetList",a=>a.add(1,"m")),r=[];for(const a of s){const i=await ue.Order(a.OrderId);if(!i){t.warn(`[Mismatch] Order ${a.OrderId} not found`);continue}const u=[];for(const c of a.Products){const l=await I.Product(c);if(!l){t.warn(`[Mismatch] Product ${c} not found`);continue}u.push(l.Name)}r.push({Id:a.OrderId,Items:u,Quantity:a.Quantity,Status:i.Status,TrackNumber:i.TrackingNumber,OrderDate:i.CreateAt})}return r.sort((a,i)=>i.OrderDate.getTime()-a.OrderDate.getTime())}static async Detail(e,t){this.EnsureLogin();const s=t.With(...this.Log,"Detail"),r=await this.GetTimeCache(e,"OrderGetDetail",c=>c.add(1,"m"),e),a=[];let i=0;for(const c of r.Items){const l={};let d=0;for(const S of c.Types){const w=await I.Type(S);if(!w){s.warn(`[Mismatch] Type ${S} not found. Order : ${e}`);continue}const g=await I.Variant(w.VariantId);if(!g){s.warn(`[Mismatch] Variant ${w.VariantId} not found. Type : ${S}, Order : ${e}`);continue}l[g.Name]=w.Name,d=g.ProductId}const m=await I.Product(d);if(!m){s.warn(`[Mismatch] Product ${d} not found. Order : ${e}`);continue}const[f,T]=await A.PhotoList(d,s);T||s.warn(`Product ${d} has no photo`),a.push({Id:i++,ProdId:d,Cover:T||"",Name:m.Name,Type:l,Quantity:c.Quantity})}const u=[];for(const c of r.Comments){const l=await ue.Comment(c);if(!l){s.warn(`[Mismatch] Comment ${c} not found. Order : ${e}`);continue}u.push({Content:l.Content,Time:l.CreateAt,User:l.Name||"You"})}return{ShopCart:a,Comments:u.sort((c,l)=>c.Time.getTime()-l.Time.getTime())}}static Order=ue.Order}class es extends v{static useNew(e){return h((t,s)=>{this.EnsureLogin();const r=t.map(a=>({ProdId:a.ProdId,Type:Object.values(a.Type),Quantity:a.Quantity}));return this.Invoke("OrderPostNew",r,s)},e)}static useAppend(e){return h(async(t,s)=>{this.EnsureLogin();const r=await this.Invoke("OrderPostAppend",t,s);return this.EnsureTrue(r),r},e)}static useCancel(e){return h(async(t,s)=>{this.EnsureLogin();const r=await this.Invoke("OrderPostCancel",t,s);return this.EnsureTrue(r),r},e)}static useReceived(e){return h(async t=>{this.EnsureLogin();const s=await this.Invoke("OrderPostReceived",t);return this.EnsureTrue(s),s},e)}}const ts={Get:Zt,Post:es,Delete:Kt},ss={Get:A};class ns extends v{static useMe(e){const t=G(()=>e.With("|","Hub","User","Get","Me")),{dispatch:s}=re(t);return Oe(async()=>{try{return this.EnsureLogin(),await this.GetVersionCache(0,"UserGetMe")}catch(a){if(a instanceof Re)return;a instanceof Me?t.info(a):s({Message:"Failed to Get Your Info",Error:a,Request:""})}})}}class rs extends v{static useUpdate(e){return h(async t=>{this.EnsureLogin();const s=await this.Invoke("UserPostUpdate",t);return this.EnsureTrue(s),this.UpdateCache(r=>({...r,...t}),0,"UserGetMe"),s},e)}}const as={Get:ns,Post:rs},b={Gallery:Yt,Product:ss,User:as,Order:ts,Storage:Jt},Be=x.createContext({});function F(){return x.useContext(Be)}const le=new k("ShopCart","Context");function os({children:o}){const[e,t]=x.useState([]);h(async()=>{const a=await ie.toArray(),i=[];for(const u of a){const c=await b.Product.Get.Basic(u.ProdId,le);i.push({...u,...c})}t(i)},{onError:le.error});async function s(a){for(let i=0;i<a.length;i++)a[i].Id=i;t([...a]),await ie.clear(),await ie.bulkPut(a.map(i=>({Id:i.Id,ProdId:i.ProdId,Type:i.Type,Quantity:i.Quantity})))}async function r(a,i,u){const c=await b.Product.Get.Basic(a,le);e.push({...c,Id:e.length,ProdId:a,Type:i,Quantity:u}),s(e)}return n.jsx(Be.Provider,{value:{List:e,Add:r,Update:s},children:o})}const ye={Name:"LoveOTC"},is=function(){const e=typeof document<"u"&&document.createElement("link").relList;return e&&e.supports&&e.supports("modulepreload")?"modulepreload":"preload"}(),cs=function(o){return"/"+o},je={},ae=function(e,t,s){let r=Promise.resolve();if(t&&t.length>0){const a=document.getElementsByTagName("link");r=Promise.all(t.map(i=>{if(i=cs(i),i in je)return;je[i]=!0;const u=i.endsWith(".css"),c=u?'[rel="stylesheet"]':"";if(!!s)for(let m=a.length-1;m>=0;m--){const f=a[m];if(f.href===i&&(!u||f.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${i}"]${c}`))return;const d=document.createElement("link");if(d.rel=u?"stylesheet":is,u||(d.as="script",d.crossOrigin=""),d.href=i,document.head.appendChild(d),u)return new Promise((m,f)=>{d.addEventListener("load",m),d.addEventListener("error",()=>f(new Error(`Unable to preload CSS for ${i}`)))})}))}return r.then(()=>e()).catch(a=>{const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=a,window.dispatchEvent(i),!i.defaultPrevented)throw a})},us=P({box:{width:"-webkit-fill-available",marginTop:p.spacingVerticalXXXL,...$.padding(p.spacingVerticalXXL,0),backgroundColor:p.colorNeutralBackgroundInverted},main:{...j,maxWidth:we,...$.margin(0,"auto")},white:{color:"white"},mag:{color:"#ED538B"},text:{...j,...$.margin("64px",0)}}),de={size:800,weight:"medium"};function ls(){const o=us();return n.jsx("footer",{className:o.box,children:n.jsx("div",{className:o.main,children:n.jsxs("div",{className:o.text,children:[n.jsx(U,{...de,className:o.mag,children:"Open"}),n.jsx(U,{...de,weight:"medium",className:o.white,children:"Telekom"}),n.jsx(U,{...de,weight:"medium",className:o.mag,children:"Cloud"})]})})})}function ds(){const{Paths:o,Search:e,Put:t}=O(),s=o.at(0),r=o.at(1),a=r==="User",i=r==="Order",u=a?"admin":"pending";return s==="Admin"&&(a||i)&&n.jsxs(n.Fragment,{children:[n.jsx(_,{placeholder:"Search in Any Field",contentBefore:n.jsx(Ze,{}),appearance:"underline",onChange:(c,l)=>{l.value?e.set("search",l.value):e.delete("search"),t(e)}}),n.jsx(et,{label:`Only ${a?"Admin":"Pending"}`,checked:e.get(u)==="",onChange:(c,l)=>{l.checked?e.set(u,""):e.delete(u),t(e)}})]})}const hs=P({box:{...j,flexGrow:1,height:"inherit",marginLeft:p.spacingHorizontalS,alignItems:"center"},div:{color:p.colorNeutralForegroundDisabled},link:{textDecorationLine:"unset !important"}});function ms(){const o=hs(),{Paths:e}=O(),t=e.at(0),s=e.at(1)||"Product";return t==="Admin"&&n.jsxs("div",{className:o.box,children:[n.jsx(U,{size:600,font:"monospace",className:o.div,children:"|"}),n.jsxs(tt,{selectedValue:s,children:[n.jsx(R,{appearance:"subtle",href:"/Admin",className:o.link,children:n.jsx(oe,{value:"Product",children:"Product List"})}),n.jsx(R,{appearance:"subtle",href:"/Admin/Order",className:o.link,children:n.jsx(oe,{value:"Order",children:"Order List"})}),n.jsx(R,{appearance:"subtle",href:"/Admin/User",className:o.link,children:n.jsx(oe,{value:"User",children:"User List"})})]})]})}class C extends De{static Log=["|","AdminNet"];static Hub=new Ne().withUrl("/AdminHub",{logMessageContent:!1,async accessTokenFactory(){const e=await z.AccessToken();if(e)return e;throw new Error("Please Login First")}}).withAutomaticReconnect().withStatefulReconnect().withHubProtocol(new ke).configureLogging(Ge.Information).build();static Index(e,t){return`${t}_Admin_${e}`}}class Z extends C{static User(e){return this.EnsureLogin(),this.GetVersionCache(e,"UserEntity")}}class K extends C{static Order(e){return this.EnsureLogin(),this.GetVersionCache(e,"OrderEntity")}static Comment(e){return this.EnsureLogin(),this.GetVersionCache(e,"CommentEntity")}}class ps extends C{static Log=[...super.Log,"Order","Get"];static async List(e){this.EnsureLogin();const t=e.With(...this.Log,"List"),s=await this.GetTimeCache("","OrderGetList",a=>a.add(1,"m")),r=[];for(const a of s){const i=await K.Order(a.OrderId);if(!i){t.warn(`[Mismatch] Order ${a.OrderId} not found`);continue}const u=[];for(const l of a.Products){const d=await I.Product(l);if(!d){t.warn(`[Mismatch] Product ${l} not found`);continue}u.push(d.Name)}const c=await Z.User(i.UserId);if(!c){t.error(`[Mismatch] User ${i.UserId} not found`);continue}r.push({Id:a.OrderId,Items:u,Quantity:a.Quantity,Status:i.Status,TrackNumber:i.TrackingNumber,OrderDate:i.CreateAt,User:c.Name})}return r.sort((a,i)=>i.OrderDate.getTime()-a.OrderDate.getTime())}static async Detail(e,t){this.EnsureLogin();const s=t.With(...this.Log,"Detail"),r=await this.GetTimeCache(e,"OrderGetDetail",c=>c.add(1,"m"),e),a=[];let i=0;for(const c of r.Items){const l={};let d=0;for(const S of c.Types){const w=await I.Type(S);if(!w){s.warn(`[Mismatch] Type ${S} not found. Order : ${e}`);continue}const g=await I.Variant(w.VariantId);if(!g){s.warn(`[Mismatch] Variant ${w.VariantId} not found. Type : ${S}, Order : ${e}`);continue}l[g.Name]=w.Name,d=g.ProductId}const m=await I.Product(d);if(!m){s.warn(`[Mismatch] Product ${d} not found. Order : ${e}`);continue}const[f,T]=await A.PhotoList(d,s);T||s.warn(`Product ${d} has no photo`),a.push({Id:i++,ProdId:d,Cover:T||"",Name:m.Name,Type:l,Quantity:c.Quantity})}const u=[];for(const c of r.Comments){const l=await K.Comment(c);if(!l){s.warn(`[Mismatch] Comment ${c} not found. Order : ${e}`);continue}let d="Client";if(l.UserId){const m=await Z.User(l.UserId);m?d=m.Name:s.warn(`[Mismatch] User ${l.UserId} not found. Order : ${e}`)}u.push({Content:l.Content,Time:l.CreateAt,User:d})}return{ShopCart:a,Comments:u.sort((c,l)=>c.Time.getTime()-l.Time.getTime())}}static Order=K.Order}class gs extends C{static useAppend(e){return h(async(t,s)=>{const r=await this.Invoke("OrderPostAppend",t,s);return this.EnsureTrue(r),r},e)}static useClose(e){return h(async(t,s)=>{const r=await this.Invoke("OrderPostClose",t,s);return this.EnsureTrue(r),r},e)}static useShip(e){return h(async(t,s)=>{const r=await this.Invoke("OrderPostShip",t,s);return this.EnsureTrue(r),r},e)}static useAccept(e){return h(async t=>{const s=await this.Invoke("OrderPostAccept",t);return this.EnsureTrue(s),s},e)}}const xs={Get:ps,Post:gs};class fs extends C{static usePhoto(e){return h(async t=>{const s=await this.Invoke("ProductDeletePhoto",t);return this.EnsureTrue(s),s},e)}static useVariant(e){return h(async t=>{const s=await this.Invoke("ProductDeleteVariant",t);return this.EnsureTrue(s),s},e)}static useType(e){return h(async(t,s)=>{const r=await this.Invoke("ProductDeleteType",t,s);return this.EnsureTrue(r),r},e)}static useCombo(e){return h(async t=>{const s=await this.Invoke("ProductDeleteCombo",t);return this.EnsureTrue(s),s},e)}static useProduct(e){return h(async t=>{const s=await this.Invoke("ProductDeleteProduct",t);return this.EnsureTrue(s),this.UpdateCache(r=>r.filter(a=>a!==t),"","ProductGetList",y().add(1,"m")),s},e)}}class ws extends C{static Log=[...super.Log,"Product","Get"];static useList(e){const t=G(()=>e.With(...this.Log,"List"));return Oe(()=>this.GetTimeCache("","ProductGetList",r=>r.add(1,"m")).catch(t.error))}static Count(e){return this.GetTimeCache(e,"ProductGetCount",t=>t.add(1,"m"),e)}static async Name(e){const t=await A.Product(e);if(!t)throw new Error(`Product ${e} Not Found`);return t.Name}static async Category(e){const t=await A.Product(e);if(!t)throw new Error(`Product ${e} Not Found`);return t.Category}static async Variants(e,t){const s=t.With(...this.Log,"Variants"),r=await this.GetTimeCache(e,"ProductGetVariants",i=>i.add(1,"m"),e),a=[];for(const i of r){const u=await A.Variant(i.VariantId);if(!u){s.warn(`Variant ${i} Not Found. Product : ${e}`);continue}const c=[];for(const l of i.Types){const d=await A.Type(l);if(!d){s.warn(`Type ${l} Not Found. Variant : ${i.VariantId}, Product : ${e}`);continue}c.push(d.Name)}a.push({Id:i.VariantId,Name:u.Name,Types:c})}return a}}class ys extends C{static Log=[...super.Log,"Product","Patch"];static useName(e){return h(async(t,s)=>{const r=await this.Invoke("ProductPatchName",t,s);return this.EnsureTrue(r),r},e)}static useCategory(e){return h(async(t,s)=>{const r=await this.Invoke("ProductPatchCategory",t,s);return this.EnsureTrue(r),r},e)}static usePhoto(e,t){const s=G(()=>e.With(...this.Log,"Photo"));return h(async(r,a)=>{if(!a.type.startsWith("image/"))throw new TypeError("File is not an image");if(a.size>10*1024*1024)throw new RangeError("File is too large, max 10MB");await this.EnsureConnected();const i=new xe,u=this.Hub.invoke("ProductPatchPhoto",r,i);return await this.HandleFileStream(a,i,s),this.EnsureTrue(await u),!0},t)}static useCaption(e){return h(async(t,s)=>{const r=await this.Invoke("ProductPatchCaption",t,s);return this.EnsureTrue(r),r},e)}static useVariantName(e){return h(async(t,s)=>{const r=await this.Invoke("ProductPatchVariantName",t,s);return this.EnsureTrue(r),r},e)}static useType(e){return h(async(t,s,r)=>{const a=await this.Invoke("ProductPatchType",t,s,r);return this.EnsureTrue(a),a},e)}static useCombo(e){return h(async(t,s,r)=>{const a=await this.Invoke("ProductPatchCombo",t,s,r);return this.EnsureTrue(a),a},e)}}let Ve;function tn(o){Ve=o}class Ps extends C{static Log=[...super.Log,"Product","Post"];static useCreate(e){return h(async t=>{const s=await this.Invoke("ProductPostCreate",t);return this.UpdateCache(r=>[s,...r],"","ProductGetList",y().add(1,"m")),s},e)}static useMovePhoto(e){return h(async(t,s)=>{const r=await this.Invoke("ProductPostMovePhoto",t,s);return this.EnsureTrue(r),r},e)}static usePhoto(e,t){const s=G(()=>e.With(...this.Log,"Photo"));return h(async(r,a)=>{if(!a.type.startsWith("image/"))throw new TypeError("File is not an image");if(a.size>10*1024*1024)throw new RangeError("File is too large, max 10MB");const i=new xe,u=this.Invoke("ProductPostPhoto",r,i);return await this.HandleFileStream(a,i,s),this.EnsureTrue(await u),!0},t)}static useVariant(e){return h((t,s)=>this.Invoke("ProductPostVariant",t,s),e)}static useType(e){return h((t,s)=>this.Invoke("ProductPostType",t,s),e)}static useCombo(e){return h((t,s,r)=>this.Invoke("ProductPostCombo",t,s,r),e)}static useLexical(e){return h(async t=>{const s=Ve?.getEditorState();let r;s&&!s.isEmpty()&&(r=JSON.stringify(s.toJSON()));const a=await this.Invoke("ProductPostDescription",t,r);return this.EnsureTrue(a),a},e)}}const Cs={Get:ws,Post:Ps,Patch:ys,Delete:fs};class js extends C{static useUser(e){return h(async t=>{const s=await this.Invoke("UserDeleteUser",t);return this.EnsureTrue(s),s},e)}static useAdmin(e){return h(async t=>{const s=await this.Invoke("UserDeleteAdmin",t);return this.EnsureTrue(s),s},e)}}class bs extends C{static async OrderUser(e){const t=await K.Order(e);if(!t)throw new Error(`Order ${e} not found`);const s=await Z.User(t.UserId);if(!s)throw new Error(`User ${t.UserId} not found in order ${e}`);return s}static async List(){const e=await this.GetTimeCache("","UserGetList",s=>s.add(1,"m")),t=[];for(const s of e){const r=await Z.User(s);if(!r){console.warn(`User ${s} not found`);continue}t.push({Id:s,Name:r.Name,EMail:r.EMail,Admin:r.Admin})}return t}}class vs extends C{static useAdmin(e){return h(async t=>{const s=await this.Invoke("UserPostAdmin",t);return this.EnsureTrue(s),s},e)}}const Ts={Get:bs,Post:vs,Delete:js},Ss={Product:Cs,Order:xs,User:Ts},Es=P({body:D}),Ls=new k("Admin","Product","AddButton");function Is(){const{Nav:o,Paths:e}=O(),t=e.at(0),s=e.at(1),r=Es(),[a,i]=x.useState(""),{dispatch:u,dispatchToast:c}=re(Ls),{run:l,loading:d}=Ss.Product.Post.useCreate({manual:!0,onError(m,f){u({Message:`Failed Create ${a}`,Request:f,Error:m})},onSuccess(m){c(n.jsxs(ee,{children:[n.jsx(te,{children:"New Product Created"}),n.jsxs(se,{children:[m," ",a]})]}),{intent:"success"}),o("Admin",m),i("")}});return t==="Admin"&&!s&&n.jsxs(Te,{children:[n.jsx(pe,{disableButtonEnhancement:!0,children:n.jsx(N,{appearance:"primary",icon:n.jsx(st,{}),children:"New Product"})}),n.jsx(Se,{children:n.jsxs(Ee,{children:[n.jsx(Le,{className:r.body,children:n.jsx(_,{required:!0,size:"large",value:a,maxLength:15,appearance:"underline",onChange:(m,f)=>i(f.value),contentBefore:n.jsx(nt,{children:"Give A Name"})})}),n.jsxs(Ie,{children:[n.jsx(pe,{disableButtonEnhancement:!0,children:n.jsx(N,{appearance:"secondary",children:"Cancel"})}),n.jsx(N,{disabled:d,appearance:"primary",onClick:()=>l(a),children:"Create"})]})]})})]})}const Ns=new k("Avatar","Menu");function ks(){const[o,{toggle:e}]=M(),[t,{toggle:s}]=M(),r=W(),[a,{set:i}]=M(!0);x.useEffect(()=>{B.subscribe(l=>i(!l))},[]);const u=b.User.Get.useMe(Ns),c=r.user?.profile.preferred_username;return n.jsxs(n.Fragment,{children:[n.jsxs(rt,{open:o,onOpenChange:e,children:[n.jsx(at,{children:n.jsx(ot,{size:36,active:o?"active":"unset",name:c})}),n.jsx(it,{children:n.jsxs(ct,{children:[n.jsx(J,{children:n.jsxs(ut,{children:["Hi ",c]})}),n.jsx(Vt,{children:n.jsx(V,{onClick:()=>r.signinRedirect(),children:"Login"})}),n.jsxs(J,{children:[n.jsx(R,{appearance:"subtle",href:"/History",children:n.jsx(V,{children:"History"})}),u?.Admin&&n.jsx(R,{appearance:"subtle",href:"/Admin",children:n.jsx(V,{children:"Admin"})}),n.jsx(V,{onClick:s,children:"Setting"}),n.jsx(V,{onClick:()=>r.signoutRedirect(),children:"Logout"})]})]})})]}),a&&n.jsx(J,{children:n.jsx(Ue,{Open:t,Toggle:s})})]})}function He({Items:o,Columns:e,NoHeader:t}){return n.jsxs(lt,{items:o||[],columns:e,getRowId:s=>s.Id,children:[!t&&n.jsx(dt,{children:n.jsx(Pe,{children:({renderHeaderCell:s})=>s()})}),n.jsx(ht,{children:({item:s,rowId:r})=>n.jsx(Pe,{children:({renderCell:a})=>a(s)},r)}),!o&&n.jsx(mt,{size:48})]})}function Gs({Guid:o,Log:e,...t}){const s=G(()=>e.With("GuidImage")),{data:r,run:a}=h(b.Storage.GetBySlice.bind(b.Storage),{manual:!0,onError:s.error});return x.useEffect(()=>{o&&a(o,s)},[o]),n.jsx(Ae,{...t,src:r?URL.createObjectURL(new Blob(r)):"https://placehold.co/400?text=Loading..."})}const be=P({unset:{flexBasis:"unset",flexGrow:0},img:{...zt,aspectRatio:"1",marginTop:p.spacingVerticalXS,marginBottom:p.spacingVerticalXS}});function Os(o,e){const t={width:`${o}px`};return X({columnId:"Cover",renderHeaderCell:()=>{const s=be();return n.jsx(pt,{className:s.unset,children:n.jsx("div",{style:t})})},renderCell(s){const r=be();return n.jsx(q,{className:r.unset,children:n.jsx(Gs,{className:r.img,style:t,Guid:s.Cover,Log:e})})}})}function As(o){const{List:e}=F(),{data:t}=h(()=>b.Product.Get.Limit(o)),s=t||3;let r=0;for(const a of e)if(a.ProdId===o&&(r+=a.Quantity),r>=s)return[!0,s];return[!1,s]}const he=P({prod:{...D,alignItems:"flex-start",justifyContent:"center"},qua:{flexBasis:"12%",flexGrow:0},act:{flexBasis:"7%",flexGrow:0}}),$s=[X({columnId:"Product",renderCell(o){return n.jsxs(q,{className:he().prod,children:[n.jsx(R,{href:`/Product/${o.ProdId}`,appearance:"subtle",children:n.jsx(gt,{children:o.Name})}),n.jsx(xt,{children:Object.values(o.Type).reduce((e,t)=>`${e} ${t},`,"")})]})}}),X({columnId:"Quantity",renderCell(o){const{List:e,Update:t}=F(),[s,r]=As(o.ProdId);return n.jsx(q,{className:he().qua,children:n.jsx(ft,{min:1,max:r,value:o.Quantity,onChange:(a,i)=>{s&&i.value>=o.Quantity||(o.Quantity=i.value,t(e))}})})}}),X({columnId:"Action",renderCell(o){const{List:e,Update:t}=F();return n.jsx(q,{className:he().act,children:n.jsx(N,{appearance:"subtle",icon:n.jsx(wt,{}),onClick:()=>t(e.filter(s=>s.Id!==o.Id))})})}})];function _e(o){return[Os(44,o),...$s]}const Us=P({person:j,inf:{...D,flexBasis:"50%",rowGap:p.spacingVerticalM}});function Ms({Log:o}){const e=Us(),t=G(()=>o.With("PersonaInfo")),s=b.User.Get.useMe(t);return n.jsxs(n.Fragment,{children:[n.jsxs("div",{className:e.person,children:[n.jsx("div",{className:e.inf,children:n.jsx(L,{label:"Name",size:"large",children:n.jsx(H,{children:s?.Name})})}),n.jsx("div",{className:e.inf,children:n.jsx(L,{label:"Phone",size:"large",children:n.jsx(H,{children:s?.Phone})})})]}),n.jsx(L,{label:"E-Mail",size:"large",children:n.jsx(H,{children:s?.EMail})}),n.jsx(L,{label:"Address",size:"large",children:n.jsx(H,{children:s?.Address})})]})}const Rs=P({body:{...D,rowGap:p.spacingVerticalXL},sub:{width:"fit-content",alignSelf:"flex-end"}}),me=new k("TopNavBar","ShopCart","Confirm");function Ds(){const[o,e]=x.useState(),[t,{toggle:s}]=M(),{List:r,Update:a}=F(),{Nav:i}=O(),u=Rs(),{dispatch:c,dispatchToast:l}=re(me),{run:d}=b.Order.Post.useNew({manual:!0,onError(m,f){c({Message:"Failed Create Order",Request:f,Error:m})},onSuccess(m){l(n.jsxs(ee,{children:[n.jsx(te,{children:"Order Placed"}),n.jsxs(se,{children:["Order Id: ",m]})]}),{intent:"success"}),a([]),s(),i("History",m)}});return n.jsxs(n.Fragment,{children:[n.jsx(N,{appearance:"primary",onClick:s,disabled:!r.length,children:"Checkout"}),n.jsxs(yt,{open:t,onOpenChange:s,position:"end",size:"medium",modalType:"alert",children:[n.jsx(Pt,{children:n.jsx(Ct,{action:n.jsx(N,{appearance:"subtle",icon:n.jsx(jt,{}),onClick:s}),children:"Confirm Order"})}),n.jsx(bt,{children:n.jsxs("div",{className:u.body,children:[n.jsx(Ms,{Log:me}),n.jsx(He,{Items:r,Columns:G(()=>_e(me)),NoHeader:!0}),n.jsx(L,{label:"Comment",size:"large",children:n.jsx(vt,{value:o,onChange:(m,f)=>e(f.value),maxLength:1e3})}),n.jsx(N,{appearance:"primary",className:u.sub,disabled:!r.length,onClick:()=>d(r,o),children:"Submit"})]})})]})]})}const Bs=P({conf:{...j,width:"100%",alignItems:"center",justifyContent:"space-between",marginTop:p.spacingVerticalS,columnGap:p.spacingHorizontalL},tooltip:{backgroundColor:p.colorBrandBackground,color:p.colorNeutralForegroundInverted,...$.borderRadius(p.borderRadiusCircular)}}),Vs=new k("TopNavBar","ShopCart");function Hs(){const[o,{toggle:e}]=M(),[t,{toggle:s}]=M(),r=Bs(),{List:a}=F();return ve(()=>{if(o)return;s();const i=setTimeout(s,2e3);return()=>clearTimeout(i)},[a]),n.jsxs(Tt,{withArrow:!0,open:o,onOpenChange:e,children:[n.jsx(St,{disableButtonEnhancement:!0,children:n.jsx(Et,{visible:t,withArrow:!0,content:{children:"↑",className:r.tooltip},relationship:"inaccessible",children:n.jsx(Lt,{icon:n.jsx(It,{}),appearance:"subtle",size:"large",checked:o})})}),n.jsxs(Nt,{children:[n.jsx(He,{Items:a,Columns:G(()=>_e(Vs)),NoHeader:!0}),n.jsxs("div",{className:r.conf,children:[a.map(i=>i.Quantity).reduce((i,u)=>i+u,0)," items in shopping cart",n.jsx(Ds,{})]})]})]})}const _s=P({navBox:{position:"fixed",top:0,width:"100%",height:`${fe}px`,...$.padding(0,p.spacingHorizontalXXXL),backgroundColor:"#fff",boxSizing:"border-box",boxShadow:p.shadow4},navBar:{...j,maxWidth:we,height:"100%",...$.margin(0,"auto"),alignItems:"center",justifyContent:"space-between"},logoBox:{...j,columnGap:p.spacingHorizontalL,alignItems:"center"},logoText:{color:p.colorBrandForeground2}});function zs(){const o=_s();return n.jsx(kt,{children:n.jsx("header",{className:o.navBox,children:n.jsxs("nav",{className:o.navBar,children:[n.jsxs(R,{className:o.logoBox,href:"/",appearance:"subtle",children:[n.jsx(Ae,{src:"/telekom-logo.svg",height:fe}),n.jsx(U,{size:600,font:"monospace",className:o.logoText,children:ye.Name})]}),n.jsx(ms,{}),n.jsxs("div",{className:o.logoBox,children:[n.jsx(Is,{}),n.jsx(ds,{}),n.jsx(Hs,{}),n.jsx(ks,{})]})]})})})}function Fs(){const{Rep:o}=O();return setTimeout(()=>o("/"),3e3),n.jsxs(n.Fragment,{children:[n.jsxs(Gt,{children:[n.jsxs("title",{children:["Redirect - Not Found - ",ye.Name]}),n.jsx("meta",{name:"robots",content:"noindex, nofollow"})]}),n.jsx(Y,{size:"huge",label:"Redirecting..."})]})}const Ws=P({body:{...D,minWidth:"1024px",position:"absolute",marginTop:`${fe}px`,width:"100%",minHeight:"-webkit-fill-available",justifyContent:"space-between",backgroundColor:p.colorNeutralBackground2},content:{...D,maxWidth:we,width:"-webkit-fill-available",marginLeft:"auto",marginRight:"auto",paddingLeft:p.spacingHorizontalM,paddingRight:p.spacingHorizontalM,paddingTop:p.spacingVerticalXXXL}});function Qs(){const o=Ws(),{Paths:e}=O(),t=e.at(0),s=x.useMemo(()=>{switch(t){case"Product":return n.jsx(Xs,{});case"Admin":return n.jsx(qs,{});case"History":return n.jsx(Ys,{});case"Login":return n.jsx(Y,{size:"huge",label:"Login Redirecting..."});case"Reload":return n.jsx(Y,{size:"huge",label:"Reloading..."});case"":case void 0:return n.jsx(Js,{});default:return n.jsx(Fs,{})}},[t]);return n.jsxs(n.Fragment,{children:[n.jsx(zs,{}),n.jsxs("div",{className:o.body,children:[n.jsx("main",{className:o.content,children:n.jsx(x.Suspense,{fallback:n.jsx(Y,{}),children:s})}),n.jsx(ls,{})]}),n.jsx(Qt,{})]})}const Xs=x.lazy(()=>ae(()=>import("./index-7Ug169_e.js"),__vite__mapDeps([0,1,2,3,4,5]))),qs=x.lazy(()=>ae(()=>import("./index-SgHg0iXt.js"),__vite__mapDeps([6,1,7,8,3,4]))),Ys=x.lazy(()=>ae(()=>import("./index-grtuTcro.js"),__vite__mapDeps([9,1,7]))),Js=x.lazy(()=>ae(()=>import("./index-HERpqTHm.js"),__vite__mapDeps([10,1,2,3,8]))),Ks={10:"#390024",20:"#51002f",30:"#69003b",40:"#810046",50:"#9a0052",60:"#b2005d",70:"#ca0069",80:"#e20074",90:"#e51e85",100:"#e93d95",110:"#ec5ba6",120:"#ef79b7",130:"#f297c7",140:"#f6b6d8",150:"#f9d4e8",160:"#fcf2f9"};Ot.createRoot(document.getElementById(ye.Name)).render(n.jsx(At,{theme:$t(Ks),children:n.jsx(Mt,{children:n.jsx(Rt,{children:n.jsx(os,{children:n.jsx(Qs,{})})})})}));export{Ss as A,en as B,zt as C,ye as D,j as F,Gs as G,b as H,k as L,Os as M,tn as S,ae as _,D as a,As as b,O as c,Ht as d,re as e,He as f,F as u};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/index-7Ug169_e.js","assets/vendor-4TK-gWq9.js","assets/isArrayLike--sVJAW2Y.js","assets/isObject-tyZXtoJz.js","assets/Lazy-d3D2BVG8.js","assets/index-scunr7sf.css","assets/index-SgHg0iXt.js","assets/Columns-Q8UMSWUm.js","assets/toFinite-GMFxiq4g.js","assets/index-grtuTcro.js","assets/index-HERpqTHm.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
