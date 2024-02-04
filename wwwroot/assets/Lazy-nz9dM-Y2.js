import{_ as b}from"./index-5ghN_70M.js";import{r as i,j as o,as as j}from"./vendor-ZeJDWgeN.js";var g=typeof global=="object"&&global&&global.Object===Object&&global,p=typeof self=="object"&&self&&self.Object===Object&&self,u=g||p||Function("return this")(),n=u.Symbol,c=Object.prototype,d=c.hasOwnProperty,y=c.toString,e=n?n.toStringTag:void 0;function O(t){var r=d.call(t,e),s=t[e];try{t[e]=void 0;var f=!0}catch{}var l=y.call(t);return f&&(r?t[e]=s:delete t[e]),l}var S=Object.prototype,T=S.toString;function m(t){return T.call(t)}var v="[object Null]",x="[object Undefined]",a=n?n.toStringTag:void 0;function E(t){return t==null?t===void 0?x:v:a&&a in Object(t)?O(t):m(t)}function L(t){return t!=null&&typeof t=="object"}function $(t){var r=typeof t;return t!=null&&(r=="object"||r=="function")}function R(t){return o.jsx(i.Suspense,{fallback:o.jsx(j,{}),children:o.jsx(_,{...t})})}const _=i.lazy(()=>b(()=>import("./index-53aQlcth.js").then(t=>t.q),__vite__mapDeps([0,1,2,3])));export{R as L,n as S,L as a,E as b,g as f,$ as i,u as r};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/index-53aQlcth.js","assets/vendor-ZeJDWgeN.js","assets/index-5ghN_70M.js","assets/index-RvD1uQDq.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
