import{m as c,t as i,y as m,j as n,aM as x,aN as G,aO as h,K as j,ax as g,a4 as d,aP as v,aq as C}from"./vendor-4TK-gWq9.js";import{L as f,C as R,H as u,G as L,F,D as N,a as b}from"./index-Gy9QnzAl.js";import{c as M,b as k,e as P}from"./isArrayLike--sVJAW2Y.js";import{i as S}from"./isObject-tyZXtoJz.js";import{t as y}from"./toFinite-GMFxiq4g.js";function $(e,a,s){if(!S(s))return!1;var r=typeof a;return(r=="number"?M(s)&&k(a,s.length):r=="string"&&a in s)?P(s[a],e):!1}var E=Math.floor,I=Math.random;function q(e,a){return e+E(I()*(a-e+1))}var z=parseFloat,B=Math.min,H=Math.random;function T(e,a,s){if(s&&typeof s!="boolean"&&$(e,a,s)&&(a=s=void 0),s===void 0&&(typeof a=="boolean"?(s=a,a=void 0):typeof e=="boolean"&&(s=e,e=void 0)),e===void 0&&a===void 0?(e=0,a=1):(e=y(e),a===void 0?(a=e,e=0):a=y(a)),e>a){var r=e;e=a,a=r}if(s||e%1||a%1){var t=H();return B(e+t*(a-e+z("1e-"+((t+"").length-1))),a)}return q(e,a)}const V=c({card:{flexBasis:"23%",flexGrow:0},img:{aspectRatio:"1",...R,borderTopLeftRadius:i.borderRadiusMedium,borderTopRightRadius:i.borderRadiusMedium}}),l=new f("Gallery","Category","Card");function A({Id:e}){const a=V(),{data:s}=m(()=>u.Product.Get.Basic(e,l),{onError:l.error});return n.jsxs(x,{className:a.card,children:[n.jsx(G,{children:n.jsx(L,{className:a.img,Guid:s?.Cover,Log:l})}),n.jsx(h,{children:n.jsx(j,{href:`/Product/${e}`,children:s?.Name||"Loading..."})})]})}const D=c({card:{flexBasis:"23%",flexGrow:0},cate:{...F,flexWrap:"wrap",justifyContent:"space-evenly",columnGap:i.spacingVerticalL,rowGap:i.spacingVerticalXL}}),O=new f("Gallery","Category");function X({Category:e}){const a=D(),{data:s,loading:r}=m(()=>u.Gallery.Get.Products(e),{onError:O.error});return n.jsxs(n.Fragment,{children:[n.jsx(g,{children:e}),n.jsx("div",{className:a.cate,children:r?n.jsx(d,{size:128}):s[0].map((t,o)=>n.jsx(A,{Id:t},o)).concat(Array(s[1]).fill(null).map((t,o)=>n.jsx("div",{className:a.card},o+T(10,100))))})]})}const K=c({main:{...b,rowGap:i.spacingVerticalXL}}),W=new f("Gallery");function Z(){const e=K(),{data:a,loading:s}=m(()=>u.Gallery.Get.Categories(),{onError:W.error});return s?n.jsxs(v,{className:e.main,children:[n.jsx(d,{appearance:"translucent",size:32}),n.jsx(d,{size:128})]}):n.jsxs("div",{className:e.main,children:[n.jsx(C,{children:n.jsxs("title",{children:["Gallery - ",N.Name]})}),a?.map((r,t)=>n.jsx(X,{Category:r},t))]})}export{Z as default};
