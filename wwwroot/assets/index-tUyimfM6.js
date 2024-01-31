import{m as N,j as e,e as f,f as b,F as M,B as i,r as D,ai as He,a6 as h,a7 as C,a8 as g,v as $,I as B,aC as J,aD as F,t as E,y as I,aE as ve,ad as he,ae as xe,af as je,ag as q,ah as pe,L as Ce,aF as ge,aG as _,ac as K,D as W,q as V,k as Z,l as ee,n as ne,o as se,ab as Ie,aH as $e,P as re,az as fe,aj as be,ak as ye,ao as Pe,Q as ke,C as Oe,aI as Me,aJ as Be,g as qe,p as Le,aK as ze,a3 as Re,a1 as _e,a2 as Qe,a4 as Xe,a5 as Ye,a9 as Ae,aL as Je,ar as Ke}from"./vendor-5ZkFytdp.js";import{L as x,a as U,e as A,A as m,F as k,f as R,c as X,H as L,C as We,G as Ze,M as Ge}from"./index-FLK-PSOw.js";import{O as en,a as nn,H as sn}from"./Columns-ph83xaOY.js";import{L as rn}from"./Lazy-GAlofe0X.js";const tn=N({body:{...U,alignItems:"flex-start"}}),an=new x("Admin","Order","Detail","Action");function on({OrderId:n,Status:s,Refresh:r}){const t=tn(),{dispatch:a,dispatchToast:o}=A(an),{run:c}=m.Order.Post.useAccept({manual:!0,onError(l,u){a({Message:"Failed Accept Order",Request:u,Error:l})},onSuccess(){o(e.jsx(f,{children:e.jsx(b,{children:"Order Accepted"})}),{intent:"success"}),r()}});switch(s){case"Processing":case"Shipping":case"Finished":case"Cancelled":case"Returning":return null}return e.jsx(M,{label:"Action",size:"large",children:e.jsx("div",{className:t.body,children:s==="Pending"&&e.jsx(i,{appearance:"subtle",onClick:()=>c(n),children:"Accept Order"})})})}const cn=N({body:{...k,justifyContent:"space-between"}}),ln=new x("Admin","Order","Detail","Append");function dn({OrderId:n,Refresh:s}){const r=cn(),[t,a]=D.useState(),{dispatch:o,dispatchToast:c}=A(ln),{run:l}=m.Order.Post.useAppend({manual:!0,onError(j,d){o({Message:"Failed Append Comment",Request:d,Error:j})},onSuccess(){c(e.jsx(f,{children:e.jsx(b,{children:"Comment Appended"})}),{intent:"success"}),s()}}),{run:u}=m.Order.Post.useClose({manual:!0,onError(j,d){o({Message:"Failed Close Order",Request:d,Error:j})},onSuccess(){c(e.jsx(f,{children:e.jsx(b,{children:"Order Closed"})}),{intent:"success"}),s()}});return e.jsxs(e.Fragment,{children:[e.jsx(M,{label:"Append",size:"large",children:e.jsx(He,{value:t,onChange:(j,d)=>a(d.value),maxLength:1e3})}),e.jsxs("div",{className:r.body,children:[e.jsx(i,{onClick:()=>u(n,t),children:"Force Close with Reason"}),e.jsx(i,{appearance:"primary",onClick:()=>l(n,t),children:"Add Comment"})]})]})}const we=N({ten:{flexBasis:"10%",flexGrow:0}}),un=[h({columnId:"Product",renderHeaderCell(){return e.jsx(C,{children:"Name"})},renderCell(n){return e.jsx(g,{children:n.Name})}}),h({columnId:"Type",renderHeaderCell(){return e.jsx(C,{children:"Type"})},renderCell(n){return e.jsx(g,{children:Object.entries(n.Type).reduce((s,r)=>`${s} ${r[0]} : ${r[1]} ;`,"")})}}),h({columnId:"Quantity",renderHeaderCell(){return e.jsx(C,{className:we().ten,children:"Quantity"})},renderCell(n){return e.jsx(g,{className:we().ten,children:n.Quantity})}})];function mn({Items:n}){return e.jsx(R,{Items:n,Columns:un})}const hn=new x("Admin","Order","Detail","Shipment");function xn({OrderId:n,TrackingNumber:s,Refresh:r}){const[t,{setTrue:a,setFalse:o}]=$(),[c,l]=D.useState(s),{dispatch:u,dispatchToast:j}=A(hn),{run:d}=m.Order.Post.useShip({manual:!0,onError(p,y){u({Message:"Failed Update Tracking Number",Request:y,Error:p})},onSuccess(){j(e.jsx(f,{children:e.jsx(b,{children:"Tracking Number Updated"})}),{intent:"success"}),o(),r()}});return e.jsx(M,{label:"Shipment",size:"large",children:e.jsx(B,{value:c,disabled:!t,appearance:"underline",onChange:(p,y)=>l(y.value),placeholder:"Fill in this field to ship the order.",contentAfter:t?e.jsx(i,{appearance:"subtle",icon:e.jsx(J,{}),onClick:()=>d(n,c)}):e.jsx(i,{appearance:"subtle",icon:e.jsx(F,{}),onClick:a})})})}const jn=N({body:{...U,rowGap:E.spacingVerticalXL}}),te=new x("Admin","Order","Detail");function pn({OrderId:n}){const s=jn(),[r,{setTrue:t,setFalse:a}]=$(),{Nav:o,Paths:c}=X(),l=parseInt(c.at(2)),{data:u,run:j}=I(()=>m.Order.Get.Detail(n,te),{manual:!0,onError:te.error}),{data:d,run:p}=I(()=>m.Order.Get.Order(n),{onError(w){o("Admin","Order"),te.error(w)},manual:!0});function y(){p(),j()}return D.useEffect(()=>{l===n?(y(),t()):a()},[l]),e.jsxs(e.Fragment,{children:[e.jsx(i,{appearance:"subtle",icon:e.jsx(ve,{}),onClick:()=>o("Admin","Order",n)}),e.jsxs(he,{open:r,position:"end",size:"medium",modalType:"alert",children:[e.jsx(xe,{children:e.jsx(je,{action:e.jsx(i,{appearance:"subtle",icon:e.jsx(q,{}),onClick:()=>o("Admin","Order")}),children:"Order Detail"})}),e.jsxs(pe,{className:s.body,children:[e.jsx(en,{OrderId:n,Order:d,Admin:!0}),e.jsx(M,{label:"Required Products",size:"large",children:e.jsx(mn,{Items:u?.ShopCart})}),e.jsx(xn,{OrderId:n,TrackingNumber:d?.TrackingNumber,Refresh:y}),e.jsx(nn,{Comments:u?.Comments}),e.jsx(dn,{OrderId:n,Refresh:y}),e.jsx(on,{OrderId:n,Status:d?.Status,Refresh:y})]})]})]})}const Y=N({two:{flexBasis:"2.5%",flexGrow:0},twoc:{flexBasis:"2.5%",flexGrow:0,justifyContent:"center"},ten:{flexBasis:"10%",flexGrow:0}}),le=new x("Admin","Order"),Cn=[...sn(le).slice(0,-1),h({columnId:"User",renderHeaderCell:()=>e.jsx(C,{className:Y().ten,children:"User"}),renderCell(n){return e.jsx(g,{className:Y().ten,children:n.User})}}),h({columnId:"Action",renderHeaderCell:()=>e.jsx(C,{className:Y().two,children:"Action"}),renderCell(n){return e.jsx(g,{className:Y().twoc,children:e.jsx(pn,{OrderId:n.Id})})}})];function gn(){const{data:n}=I(()=>m.Order.Get.List(le),{onError:le.error});return e.jsx(R,{Items:n,Columns:Cn})}const fn=N({body:{...k,alignItems:"center"},input:{flexGrow:1}}),ae=new x("Admin","Product","Detail","Category");function bn({ProdId:n}){const[s,r]=D.useState(""),[t,{setTrue:a,setFalse:o}]=$();I(()=>m.Product.Get.Category(n),{onSuccess(P){P&&r(P)},onError:ae.error});const{dispatch:c,dispatchToast:l}=A(ae),{run:u}=m.Product.Patch.useCategory({manual:!0,onError(P,v){c({Message:"Failed Update Category",Request:v,Error:P})},onSuccess(){l(e.jsx(f,{children:e.jsx(b,{children:"Category Updated"})}),{intent:"success"}),o()}}),{run:j}=m.Product.Delete.useCategory({manual:!0,onError(P,v){c({Message:"Failed Detach Category",Request:v,Error:P})},onSuccess(){l(e.jsx(f,{children:e.jsx(b,{children:"Category Detached"})}),{intent:"success"}),o()}}),{data:d}=I(()=>L.Gallery.Get.Categories(),{onSuccess(P){y(P)},onError:ae.error}),[p,y]=D.useState(d),[w,S]=D.useState(""),T=fn();return e.jsxs("div",{className:T.body,children:[e.jsx(Ce,{size:"large",disabled:!t,children:"Category"}),e.jsxs(ge,{className:T.input,size:"large",disabled:!t,freeform:!0,placeholder:s||"Pending",appearance:"underline",onChange:P=>{const v=P.target.value.trim(),G=d?.filter(Ue=>Ue.toLowerCase().indexOf(v.toLowerCase())===0);y(G),v&&G&&G.length<1?S(v):S("")},onOptionSelect:(P,v)=>{const G=v.optionText;r(G),G&&d?.includes(G)?S(""):S(G)},children:[w&&e.jsxs(_,{text:w,children:['Create New "',w,'"']},w),p?.map(P=>e.jsx(_,{children:P},P)),p?.length===d?.length?e.jsx(_,{text:"",children:"Pending"},""):null]}),t?e.jsx(i,{appearance:"subtle",icon:e.jsx(J,{}),onClick:()=>{s?u(n,s):j(n)}}):e.jsx(i,{appearance:"subtle",icon:e.jsx(F,{}),onClick:a})]})}const yn=new x("Admin","Product","Detail","Combo","Delete");function Pn({ComboId:n,Refresh:s}){const{dispatch:r,dispatchToast:t}=A(yn),{run:a}=m.Product.Delete.useCombo({manual:!0,onError(o,c){r({Message:"Failed Delete Combo",Request:c,Error:o})},onSuccess(){t(e.jsx(f,{children:e.jsx(b,{children:"Combo Deleted"})}),{intent:"success"}),s()}});return e.jsx(i,{appearance:"subtle",icon:e.jsx(K,{}),onClick:()=>a(n)})}const An=[h({columnId:"Variant",renderHeaderCell:()=>e.jsx(C,{children:"Variant"}),renderCell(n){return e.jsx(g,{children:n.Name})}}),h({columnId:"Type",renderHeaderCell:()=>e.jsx(C,{children:"Type"}),renderCell(n){return e.jsx(g,{children:e.jsx(ge,{defaultValue:n.Current,defaultSelectedOptions:[n.Current],onOptionSelect:(s,r)=>n.Update(r.optionValue),children:n.Types.map((s,r)=>e.jsx(_,{children:s},r))})})}})],wn=N({body:{...k,justifyContent:"flex-end",alignItems:"center",columnGap:E.spacingVerticalM,marginTop:E.spacingHorizontalM}}),oe=new x("Admin","Product","Detail","Combo","Detail");function Nn({Id:n,ProdId:s,Combo:r,Stock:t,Refresh:a}){const[o,{toggle:c}]=$(),[l,u]=D.useState(r),[j,d]=D.useState(t),{data:p}=I(()=>m.Product.Get.Variants(s,oe),{onError:oe.error}),{dispatch:y,dispatchToast:w}=A(oe),{run:S}=m.Product.Patch.useCombo({manual:!0,onError(T,P){y({Message:"Failed Update Combo",Request:P,Error:T})},onSuccess(){w(e.jsx(f,{children:e.jsx(b,{children:"Combo Updated"})}),{intent:"success"}),a(),c()}});return e.jsxs(W,{open:o,onOpenChange:c,children:[e.jsx(V,{disableButtonEnhancement:!0,children:e.jsx(i,{appearance:"subtle",icon:e.jsx(F,{})})}),e.jsx(Z,{children:e.jsxs(ee,{children:[e.jsx(ne,{action:e.jsx(V,{disableButtonEnhancement:!0,children:e.jsx(i,{appearance:"subtle",icon:e.jsx(q,{})})}),children:"Combo Detail"}),e.jsxs(se,{children:[e.jsx(R,{Items:p?.map(T=>({Current:l[T.Name],Update(P){l[T.Name]=P,u({...l})},...T})),Columns:An}),e.jsxs("div",{className:wn().body,children:[e.jsx(Ce,{children:"Stock"}),e.jsx(Ie,{value:j,min:0,onChange:(T,P)=>{if(P.value)d(P.value);else if(P.displayValue){const v=parseInt(P.displayValue);$e(v)&&d(v)}}}),e.jsx(i,{appearance:"primary",onClick:()=>S(n,l,j),children:"Submit"})]})]})]})})]})}const Dn=[h({columnId:"Variant",renderHeaderCell:()=>e.jsx(C,{children:"Variant"}),renderCell(n){return e.jsx(g,{children:n.Name})}}),h({columnId:"Type",renderHeaderCell:()=>e.jsx(C,{children:"Type"}),renderCell(n){return e.jsx(g,{children:e.jsx(ge,{onOptionSelect:(s,r)=>n.Update(r.optionValue),children:n.Types.map((s,r)=>e.jsx(_,{children:s},r))})})}})],Sn=N({body:{...k,justifyContent:"flex-end",alignItems:"center",columnGap:E.spacingVerticalM,marginTop:E.spacingHorizontalM}}),ce=new x("Admin","Product","Detail","Combo","NewCombo");function En({ProdId:n,Refresh:s}){const[r,{toggle:t}]=$(),[a,o]=D.useState({}),[c,l]=D.useState(1),{data:u}=I(()=>m.Product.Get.Variants(n,ce),{onSuccess(y){for(const w of y)a[w.Name]="";o({...a})},onError:ce.error}),{dispatch:j,dispatchToast:d}=A(ce),{run:p}=m.Product.Post.useCombo({manual:!0,onError(y,w){j({Message:"Failed Create Combo",Request:w,Error:y})},onSuccess(){d(e.jsx(f,{children:e.jsx(b,{children:"Combo Created"})}),{intent:"success"}),s(),t()}});return e.jsxs(W,{open:r,onOpenChange:t,children:[e.jsx(V,{disableButtonEnhancement:!0,children:e.jsx(i,{appearance:"primary",icon:e.jsx(re,{}),children:"New Combo"})}),e.jsx(Z,{children:e.jsxs(ee,{children:[e.jsx(ne,{action:e.jsx(V,{disableButtonEnhancement:!0,children:e.jsx(i,{appearance:"subtle",icon:e.jsx(q,{})})}),children:"New Combo"}),e.jsxs(se,{children:[e.jsx(R,{Items:u?.map(y=>({Update(w){a[y.Name]=w,o({...a})},...y})),Columns:Dn}),e.jsxs("div",{className:Sn().body,children:[e.jsx(Ce,{children:"Stock"}),e.jsx(Ie,{value:c,min:0,onChange:(y,w)=>{if(w.value)l(w.value);else if(w.displayValue){const S=parseInt(w.displayValue);$e(S)&&l(S)}}}),e.jsx(i,{appearance:"primary",onClick:()=>p(n,a,c),children:"Create"})]})]})]})})]})}const H=N({body:{...k,justifyContent:"space-between"},four:{flexBasis:"4%",flexGrow:0},seven:{flexBasis:"7%",flexGrow:0},five:{flexBasis:"5%",flexGrow:0}}),Ne=new x("Admin","Product","Detail","Combo"),Tn=[h({columnId:"Id",renderHeaderCell:()=>e.jsx(C,{className:H().four,children:"Id"}),renderCell(n){return e.jsx(g,{className:H().four,children:n.Id})}}),h({columnId:"Combo",renderHeaderCell:()=>e.jsx(C,{children:"Combo"}),renderCell(n){return e.jsx(g,{children:Object.entries(n.Combo).reduce((s,r)=>`${s} ${r[0]} : ${r[1]} ;`,"")})}}),h({columnId:"Stock",renderHeaderCell:()=>e.jsx(C,{className:H().five,children:"Stock"}),renderCell(n){return e.jsx(g,{className:H().five,children:n.Stock})}}),h({columnId:"Action",renderHeaderCell:()=>e.jsx(C,{className:H().seven,children:"Action"}),renderCell(n){return e.jsxs(g,{className:H().seven,children:[e.jsx(Nn,{...n}),e.jsx(Pn,{ComboId:n.Id,Refresh:n.Refresh})]})}})];function vn({ProdId:n}){const{data:s,run:r}=I(()=>L.Product.Get.Combo(n,Ne),{onError:Ne.error});return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:H().body,children:[e.jsx(fe,{children:"Combo"}),e.jsx(En,{ProdId:n,Refresh:r})]}),e.jsx(R,{Items:s?.map(t=>({ProdId:n,Refresh:r,...t})),Columns:Tn})]})}const In=new x("Admin","Product","Detail","Delete"),$n=N({root:{...U,rowGap:E.spacingHorizontalS}});function kn({ProdId:n}){const{Nav:s}=X(),{dispatch:r,dispatchToast:t}=A(In),{run:a,loading:o}=m.Product.Delete.useProduct({manual:!0,onError(l,u){r({Message:"Failed Delete Product",Request:u,Error:l})},onSuccess(){t(e.jsx(f,{children:e.jsx(b,{children:"Product Deleted"})}),{intent:"success"}),s("/Admin")}}),c=$n();return e.jsx("div",{children:e.jsxs(be,{withArrow:!0,children:[e.jsx(ye,{disableButtonEnhancement:!0,children:e.jsx(i,{children:"Delete Product"})}),e.jsxs(Pe,{className:c.root,children:["Are You Sure?",e.jsx(i,{disabled:o,appearance:"primary",onClick:()=>a(n),children:"Yes"})]})]})})}const Rn=N({btn:{...k,columnGap:E.spacingVerticalS},drawer:{width:"1100px"}}),Gn=new x("Admin","Product","Lexical");function Vn({ProdId:n}){const s=Rn(),[r,{toggle:t,setTrue:a}]=$(),{data:o,run:c}=I(()=>L.Product.Get.Lexical(n)),{dispatch:l,dispatchToast:u}=A(Gn),{run:j}=m.Product.Post.useLexical({manual:!0,onError(d,p){l({Message:"Failed Update Description",Request:p,Error:d})},onSuccess(){u(e.jsx(f,{children:e.jsx(b,{children:"Description Updated"})}),{intent:"success"}),c(),t()}});return e.jsxs(e.Fragment,{children:[e.jsx("div",{children:e.jsx(i,{onClick:()=>a(),children:"Open Description Editor"})}),e.jsxs(he,{open:r,onOpenChange:t,position:"start",size:"large",modalType:"alert",className:s.drawer,children:[e.jsx(xe,{children:e.jsx(je,{action:e.jsxs("div",{className:s.btn,children:[e.jsx(i,{appearance:"primary",onClick:()=>j(n),children:"Save"}),e.jsx(i,{onClick:()=>t(),children:"Cancel"})]}),children:"Edit Product Description"})}),e.jsx(pe,{children:e.jsx(rn,{State:o?.Description})})]})]})}const De=new x("Admin","Product","Detail","Name");function Fn({ProdId:n}){const[s,r]=D.useState(""),[t,{setTrue:a,setFalse:o}]=$(),{Nav:c}=X();I(()=>m.Product.Get.Name(n),{onSuccess(d){r(d)},onError(d){c("Admin"),De.error(d)}});const{dispatch:l,dispatchToast:u}=A(De),{run:j}=m.Product.Patch.useName({manual:!0,onError(d,p){l({Message:"Failed Update Name",Request:p,Error:d})},onSuccess(){u(e.jsx(f,{children:e.jsx(b,{children:"Name Updated"})}),{intent:"success"}),o()}});return e.jsx(B,{size:"large",value:s,disabled:!t,appearance:"underline",onChange:(d,p)=>r(p.value),contentBefore:e.jsx(ke,{children:"Name"}),contentAfter:t?e.jsx(i,{appearance:"subtle",icon:e.jsx(J,{}),onClick:()=>j(n,s)}):e.jsx(i,{appearance:"subtle",icon:e.jsx(F,{}),onClick:a})})}const Un=new x("Admin","Product","Detail","Photo","Edit","Caption");function Hn({Id:n,Caption:s}){const[r,t]=D.useState(s||""),{dispatch:a,dispatchToast:o}=A(Un),{run:c}=m.Product.Patch.useCaption({manual:!0,onError(l,u){a({Message:"Failed Update Caption",Request:u,Error:l})},onSuccess(){o(e.jsx(f,{children:e.jsx(b,{children:"Caption Updated"})}),{intent:"success"})}});return e.jsxs(e.Fragment,{children:[e.jsx(M,{label:"Caption",children:e.jsx(B,{value:r,placeholder:"Write some infomation here?",onChange:(l,u)=>t(u.value)})}),e.jsx(i,{onClick:()=>c(n,r),children:"Save Caption"})]})}const On=new x("Admin","Product","Detail","Photo","Edit","Delete");function Mn({Id:n,ProductId:s}){const{dispatch:r,dispatchToast:t}=A(On),{run:a}=m.Product.Delete.usePhoto({manual:!0,onError(o,c){r({Message:"Failed Delete Photo",Request:c,Error:o})},onSuccess(){t(e.jsx(f,{children:e.jsx(b,{children:"Photo Deleted"})}),{intent:"success"})}});return e.jsx(i,{appearance:"primary",onClick:()=>a(s,n),children:"Delete"})}const Se=new x("Admin","Product","Detail","Photo","Edit","Replace");function Bn({Id:n}){const{dispatch:s,dispatchToast:r}=A(Se),{run:t}=m.Product.Patch.usePhoto(Se,{manual:!0,onBefore([a,o]){r(e.jsx(f,{children:e.jsxs(b,{children:["Uploading Photo ",o.name," for Product ",a," to replace ",n]})}),{intent:"info"})},onError(a,o){s({Message:"Failed Update Photo",Request:o,Error:a})},onSuccess(){r(e.jsx(f,{children:e.jsx(b,{children:"Photo Updated"})}),{intent:"success"})}});return e.jsx(i,{onClick:()=>{const a=document.createElement("input");a.type="file",a.accept="image/*",a.onchange=()=>{a.files&&t(n,a.files[0])},a.click()},children:"Replace"})}const qn=N({box:{...k,columnGap:E.spacingHorizontalL},img:{...We,aspectRatio:"1",width:"50%"},cap:{...U,flexGrow:1,rowGap:E.spacingVerticalL}}),Ln=new x("Admin","Product","Detail","Photo","Edit");function zn(n){const{Id:s,Cover:r}=n,t=qn();return e.jsxs(W,{children:[e.jsx(V,{disableButtonEnhancement:!0,children:e.jsx(i,{appearance:"subtle",icon:e.jsx(F,{})})}),e.jsx(Z,{children:e.jsxs(ee,{children:[e.jsx(ne,{action:e.jsx(V,{disableButtonEnhancement:!0,children:e.jsx(i,{appearance:"subtle",icon:e.jsx(q,{})})}),children:"Image Detail"}),e.jsxs(se,{className:t.box,children:[e.jsx(Ze,{shape:"rounded",className:t.img,Guid:r,Log:Ln}),e.jsxs("div",{className:t.cap,children:[e.jsx(Hn,{...n}),e.jsx(Bn,{Id:s}),e.jsx(Mn,{...n})]})]})]})})]})}const ie=N({f11:{flexBasis:"11%",flexGrow:0},box:{...k,justifyContent:"space-between"}}),Q=new x("Admin","Product","Detail","Photo"),_n=[Ge(70,Q),h({columnId:"Caption",renderHeaderCell:()=>e.jsx(C,{children:"Caption"}),renderCell(n){return e.jsx(g,{children:n.Caption||"No Caption"})}}),h({columnId:"Action",renderHeaderCell:()=>e.jsx(C,{className:ie().f11,children:"Action"}),renderCell(n){const{dispatch:s}=A(Q),{run:r}=m.Product.Post.useMovePhoto({manual:!0,onError(t,a){s({Message:"Failed Update Order",Request:a,Error:t})},onSuccess:Qn});return e.jsxs(g,{className:ie().f11,children:[e.jsx(i,{appearance:"subtle",icon:e.jsx(Me,{}),onClick:()=>r(n.Id,!0)}),e.jsx(i,{appearance:"subtle",icon:e.jsx(Be,{}),onClick:()=>r(n.Id,!1)}),e.jsx(zn,{...n})]})}})];let Qn=()=>{};function Xn({ProdId:n}){const s=Oe(async()=>{const[o]=await L.Product.Get.PhotoList(n,Q);return o.map(l=>({Id:l.PhotoId,Cover:l.ObjectId,Caption:l.Caption,ProductId:l.ProductId}))}),{dispatch:r,dispatchToast:t}=A(Q),{run:a}=m.Product.Post.usePhoto(Q,{manual:!0,onBefore([o,c]){t(e.jsx(f,{children:e.jsxs(b,{children:["Uploading Photo ",c.name," for Product ",o]})}),{intent:"info"})},onError(o,c){r({Message:"Failed Upload Photo",Request:c,Error:o})},onSuccess(){t(e.jsx(f,{children:e.jsx(b,{children:"Photo Uploaded"})}),{intent:"success"})}});return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:ie().box,children:[e.jsx(fe,{children:"Photos"}),e.jsx(i,{appearance:"primary",icon:e.jsx(re,{}),onClick:()=>{const o=document.createElement("input");o.type="file",o.accept="image/*",o.onchange=()=>{o.files&&a(n,o.files[0])},o.click()},children:"New Image"})]}),e.jsx(R,{Items:s,Columns:_n})]})}const Yn=new x("Admin","Product","Detail","Variant","Delete");function Jn({VariantId:n,Refresh:s}){const{dispatch:r,dispatchToast:t}=A(Yn),{run:a}=m.Product.Delete.useVariant({manual:!0,onError(o,c){r({Message:"Failed Delete Variant",Request:c,Error:o})},onSuccess(){t(e.jsx(f,{children:e.jsx(b,{children:"Variant Deleted"})}),{intent:"success"}),s()}});return e.jsx(i,{appearance:"subtle",icon:e.jsx(K,{}),onClick:()=>a(n)})}const Kn=new x("Admin","Product","Detail","Variant","Edit","TypeDelete");function Wn({VariantId:n,Type:s,Refresh:r}){const{dispatch:t,dispatchToast:a}=A(Kn),{run:o}=m.Product.Delete.useType({manual:!0,onError(c,l){t({Message:"Failed Delete Type",Request:l,Error:c})},onSuccess(){a(e.jsx(f,{children:e.jsx(b,{children:"Type Deleted"})}),{intent:"success"}),r()}});return e.jsx(i,{appearance:"subtle",icon:e.jsx(K,{}),onClick:()=>o(n,s)})}const Zn=new x("Admin","Product","Detail","Variant","Edit","Name");function es({Id:n,Name:s}){const[r,t]=D.useState(s),[a,{setTrue:o,setFalse:c}]=$(),{dispatch:l,dispatchToast:u}=A(Zn),{run:j}=m.Product.Patch.useVariantName({manual:!0,onError(d,p){l({Message:"Failed Update Variant Name",Request:p[0],Error:d})},onSuccess(){u(e.jsx(f,{children:e.jsx(b,{children:"Variant Name Updated"})}),{intent:"success"}),c()}});return e.jsx(B,{size:"large",value:r,disabled:!a,appearance:"underline",onChange:(d,p)=>t(p.value),contentBefore:e.jsx(ke,{children:"Name"}),contentAfter:a?e.jsx(i,{appearance:"subtle",icon:e.jsx(J,{}),onClick:()=>j(n,r)}):e.jsx(i,{appearance:"subtle",icon:e.jsx(F,{}),onClick:o})})}const ns=N({body:{...U,rowGap:E.spacingVerticalM}}),ss=new x("Admin","Product","Detail","Variant","Edit","Type");function Ve({VariantId:n,Type:s,Refresh:r,New:t}){const a=ns(),[o,{toggle:c}]=$(),[l,u]=D.useState(s||""),{dispatch:j,dispatchToast:d}=A(ss),p={manual:!0,onError(S,T){j({Message:`Failed ${t?"Create":"Update"} Type ${l}`,Request:T,Error:S})},onSuccess(S){d(e.jsxs(f,{children:[e.jsxs(b,{children:["Type ",t?"Created":"Updated"]}),e.jsxs(qe,{children:[S," ",l]})]}),{intent:"success"}),r(),u(""),c()}},{run:y}=m.Product.Post.useType(p),{run:w}=m.Product.Patch.useType(p);return e.jsxs(be,{withArrow:!0,open:o,onOpenChange:c,children:[e.jsx(ye,{disableButtonEnhancement:!0,children:t?e.jsx(i,{icon:e.jsx(re,{}),appearance:"primary",children:"New Type"}):e.jsx(i,{appearance:"subtle",icon:e.jsx(F,{})})}),e.jsxs(Pe,{className:a.body,children:[e.jsx(M,{label:"Type Name",children:e.jsx(B,{value:l,onChange:(S,T)=>u(T.value)})}),e.jsx(i,{onClick:()=>t?y(n,l):w(n,s,l),children:"Submit"})]})]})}const de=N({body:{...U,rowGap:E.spacingVerticalM},twelve:{flexBasis:"12%",flexGrow:0}}),rs=[h({columnId:"Name",renderHeaderCell:()=>e.jsx(C,{children:"Name"}),renderCell(n){return e.jsx(g,{children:n.Name})}}),h({columnId:"Action",renderHeaderCell:()=>e.jsx(C,{className:de().twelve,children:"Action"}),renderCell(n){return e.jsxs(g,{className:de().twelve,children:[e.jsx(Ve,{VariantId:n.VariantId,Type:n.Name,Refresh:n.Refresh}),e.jsx(Wn,{VariantId:n.VariantId,Type:n.Name,Refresh:n.Refresh})]})}})];function ts({Variant:n,Refresh:s}){return e.jsxs(W,{children:[e.jsx(V,{disableButtonEnhancement:!0,children:e.jsx(i,{appearance:"subtle",icon:e.jsx(F,{})})}),e.jsx(Z,{children:e.jsxs(ee,{children:[e.jsx(ne,{action:e.jsx(V,{disableButtonEnhancement:!0,children:e.jsx(i,{appearance:"subtle",icon:e.jsx(q,{})})}),children:"Variant Detail"}),e.jsxs(se,{className:de().body,children:[e.jsx(es,{Id:n.Id,Name:n.Name}),e.jsx(R,{Items:n.Types.map((r,t)=>({Id:t,Name:r,VariantId:n.Id,Refresh:s})),Columns:rs})]}),e.jsx(Le,{children:e.jsx(Ve,{VariantId:n.Id,Refresh:s,New:!0})})]})})]})}const as=N({body:{...U,rowGap:E.spacingVerticalM}}),os=new x("Admin","Product","Detail","Variant","New");function cs({ProdId:n,Refresh:s}){const r=as(),[t,{toggle:a}]=$(),[o,c]=D.useState(""),{dispatch:l,dispatchToast:u}=A(os),{run:j}=m.Product.Post.useVariant({manual:!0,onError(d,p){l({Message:"Failed Create Variant",Request:p,Error:d})},onSuccess(){u(e.jsx(f,{children:e.jsx(b,{children:"Variant Created"})}),{intent:"success"}),s(),c(""),a()}});return e.jsxs(be,{withArrow:!0,open:t,onOpenChange:a,children:[e.jsx(ye,{disableButtonEnhancement:!0,children:e.jsx(i,{appearance:"primary",icon:e.jsx(re,{}),children:"New Variant"})}),e.jsxs(Pe,{className:r.body,children:[e.jsx(M,{required:!0,label:"Variant Name",children:e.jsx(B,{value:o,onChange:(d,p)=>c(p.value)})}),e.jsx(i,{onClick:()=>j(n,o),children:"Add"})]})]})}const O=N({body:{...k,justifyContent:"space-between"},four:{flexBasis:"4%",flexGrow:0},seven:{flexBasis:"7%",flexGrow:0},twelve:{flexBasis:"12%",flexGrow:0}}),Ee=new x("Admin","Product","Detail","Variant"),ls=[h({columnId:"Id",renderHeaderCell:()=>e.jsx(C,{className:O().four,children:"Id"}),renderCell(n){return e.jsx(g,{className:O().four,children:n.Id})}}),h({columnId:"Name",renderHeaderCell:()=>e.jsx(C,{className:O().twelve,children:"Name"}),renderCell(n){return e.jsx(g,{className:O().twelve,children:n.Name})}}),h({columnId:"Type",renderHeaderCell:()=>e.jsx(C,{children:"Type"}),renderCell(n){return e.jsx(g,{children:n.Types.reduce((s,r)=>`${s} ${r} ;`,"")})}}),h({columnId:"Action",renderHeaderCell:()=>e.jsx(C,{className:O().seven,children:"Action"}),renderCell(n){return e.jsxs(g,{className:O().seven,children:[e.jsx(ts,{Variant:n,Refresh:ue}),e.jsx(Jn,{VariantId:n.Id,Refresh:ue})]})}})];let ue;function is({ProdId:n}){const s=O(),{data:r,run:t}=I(()=>m.Product.Get.Variants(n,Ee),{onError:Ee.error});return ue=t,e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:s.body,children:[e.jsx(fe,{children:"Variant"}),e.jsx(cs,{ProdId:n,Refresh:t})]}),e.jsx(R,{Items:r,Columns:ls})]})}const ds=N({body:{...U,rowGap:E.spacingVerticalXL,paddingBottom:E.spacingVerticalXXXL}});function us({ProdId:n}){const s=ds(),[r,{setFalse:t,setTrue:a}]=$(),{Nav:o,Paths:c}=X(),l=parseInt(c.at(1));return D.useEffect(()=>{l===n?a():t()},[c]),e.jsxs(e.Fragment,{children:[e.jsx(i,{appearance:"subtle",icon:e.jsx(ve,{}),onClick:()=>{o("Admin",n),a()}}),e.jsxs(he,{open:r,position:"end",size:"large",modalType:"alert",children:[e.jsx(xe,{children:e.jsx(je,{action:e.jsx(i,{appearance:"subtle",icon:e.jsx(q,{}),onClick:()=>{o("Admin"),t()}}),children:"Product Detail"})}),e.jsxs(pe,{className:s.body,children:[e.jsx(Fn,{ProdId:n}),e.jsx(bn,{ProdId:n}),e.jsx(Xn,{ProdId:n}),e.jsx(is,{ProdId:n}),e.jsx(vn,{ProdId:n}),e.jsx(Vn,{ProdId:n}),e.jsx(kn,{ProdId:n})]})]})]})}const z=new x("Admin","Product","Row");function ms({item:n}){const[s,r]=D.useState(()=>({Id:n,Cover:"",Name:"Loading..."})),[t,{setTrue:a}]=$(),o=L.Product.Get;return ze(async()=>{const c=await o.Product(n).catch(z.error);if(!c)return z.warn(`Product ${n} Not Found`),a();let l={...s,Name:c.Name,Category:c.Category||"Pending"};r(l);const[u,j]=await o.PhotoList(n,z);j||z.warn(`Product ${n} has no photo`),r(l={...l,Cover:j});const d=await m.Product.Get.Count(n).catch(z.error);d&&r({...l,...d})},[]),t?null:e.jsx(Re,{children:({renderCell:c})=>c(s)},n)}const Te=N({two:{flexBasis:"2.5%",flexGrow:0},twoc:{flexBasis:"2.5%",flexGrow:0,justifyContent:"center"}}),Fe=new x("Admin","Product"),hs=[Ge(50,Fe),h({columnId:"Product",renderHeaderCell:()=>e.jsx(C,{children:"Product"}),renderCell(n){return e.jsx(g,{children:e.jsx(Ae,{children:n.Name})})}}),h({columnId:"Category",renderHeaderCell:()=>e.jsx(C,{children:"Category"}),renderCell(n){return e.jsx(g,{children:e.jsx(Ae,{children:n.Category})})}}),h({columnId:"Variant",renderHeaderCell:()=>e.jsx(C,{children:"Variant"}),renderCell(n){return e.jsx(g,{children:n.Variant})}}),h({columnId:"Combo",renderHeaderCell:()=>e.jsx(C,{children:"Combo"}),renderCell(n){return e.jsx(g,{children:n.Combo})}}),h({columnId:"Stock",renderHeaderCell:()=>e.jsx(C,{children:"Stock"}),renderCell(n){return e.jsx(g,{children:n.Stock})}}),h({columnId:"Action",renderHeaderCell:()=>e.jsx(C,{className:Te().two,children:"Detail"}),renderCell(n){return e.jsx(g,{className:Te().twoc,children:e.jsx(us,{ProdId:n.Id})})}})];function xs(){const n=m.Product.Get.useList(Fe);return e.jsxs(_e,{items:n?n.reverse():[],columns:hs,children:[e.jsx(Qe,{children:e.jsx(Re,{children:({renderHeaderCell:s})=>s()})}),e.jsx(Xe,{children:s=>e.jsx(ms,{...s})}),!n&&e.jsx(Ye,{size:48})]})}const js=new x("Admin","User","Delete");function ps({UserId:n,Refresh:s}){const{dispatch:r,dispatchToast:t}=A(js),{run:a}=m.User.Delete.useUser({manual:!0,onError(o,c){r({Message:"Failed Delete User",Request:c,Error:o})},onSuccess(){t(e.jsx(f,{children:e.jsx(b,{children:"User Deleted"})}),{intent:"success"}),s()}});return e.jsx(i,{appearance:"subtle",icon:e.jsx(K,{}),onClick:()=>a(n)})}const Cs=new x("Admin","User","Grant");function gs({UserId:n,Admin:s,Refresh:r}){const{dispatch:t,dispatchToast:a}=A(Cs),{run:o}=m.User.Post.useAdmin({manual:!0,onError(l,u){t({Message:"Failed Grant Admin",Request:u,Error:l})},onSuccess(){a(e.jsx(f,{children:e.jsx(b,{children:"Admin Granted"})}),{intent:"success"}),r()}}),{run:c}=m.User.Delete.useAdmin({manual:!0,onError(l,u){t({Message:"Failed Revoke Admin",Request:u,Error:l})},onSuccess(){a(e.jsx(f,{children:e.jsx(b,{children:"Admin Revoked"})}),{intent:"success"}),r()}});return e.jsx(Je,{checked:s,onChange:(l,u)=>{u.checked?o(n):c(n)}})}const fs=new x("Admin","User"),bs=[h({columnId:"Id",renderHeaderCell:()=>"Id",renderCell(n){return n.Id}}),h({columnId:"Name",renderHeaderCell:()=>"Real Name",renderCell(n){return n.Name}}),h({columnId:"Email",renderHeaderCell:()=>"E-Mail",renderCell(n){return n.EMail}}),h({columnId:"Admin",renderHeaderCell:()=>"Admin",renderCell(n){return e.jsx(gs,{UserId:n.Id,Admin:n.Admin,Refresh:me})}}),h({columnId:"Delete",renderHeaderCell:()=>"Delete",renderCell(n){return e.jsx(ps,{UserId:n.Id,Refresh:me})}})].map(({renderHeaderCell:n,renderCell:s,...r})=>({...r,renderHeaderCell:()=>e.jsx(C,{children:n()}),renderCell:t=>e.jsx(g,{children:s(t)})}));let me;function ys(){const{data:n,run:s}=I(()=>m.User.Get.List(),{onError:fs.error});return me=s,e.jsx(R,{Items:n,Columns:bs})}const Ps=new x("Admin");function Ss(){const{Paths:n,Nav:s}=X(),r=n.at(1),t=D.useMemo(()=>{switch(r){case"Order":return e.jsx(gn,{});case"User":return e.jsx(ys,{});default:return e.jsx(xs,{})}},[r]),a=L.User.Get.useMe(Ps);return a?a.Admin?t:s("/"):e.jsx(Ke,{size:"huge",label:"Authenticating..."})}export{Ss as default};
