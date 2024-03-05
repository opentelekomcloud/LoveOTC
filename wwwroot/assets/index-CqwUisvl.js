import{m as h,s as d,t as u,aR as E,aS as O,j as n,J as D,aT as g,aE as w,i as y,D as R,v as I,B as H,k as F,l as z,n as A,o as G,aF as q,x,K as M,aU as X,aV as W,aW as $,V,aC as U,a9 as f,aX as J,av as K}from"./vendor-oO_J9ypD.js";import{C as T,F as P,a as L,L as v,H as C,G as Y,D as Q}from"./index-WvogOZQZ.js";function b(){return b=Object.assign?Object.assign.bind():function(i){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&(i[e]=t[e])}return i},b.apply(this,arguments)}var Z={strings:["These are the default values...","You know what you should do?","Use your own!","Have a great day!"],stringsElement:null,typeSpeed:0,startDelay:0,backSpeed:0,smartBackspace:!0,shuffle:!1,backDelay:700,fadeOut:!1,fadeOutClass:"typed-fade-out",fadeOutDelay:500,loop:!1,loopCount:1/0,showCursor:!0,cursorChar:"|",autoInsertCss:!0,attr:null,bindInputFocusEvents:!1,contentType:"html",onBegin:function(i){},onComplete:function(i){},preStringTyped:function(i,r){},onStringTyped:function(i,r){},onLastStringBackspaced:function(i){},onTypingPaused:function(i,r){},onTypingResumed:function(i,r){},onReset:function(i){},onStop:function(i,r){},onStart:function(i,r){},onDestroy:function(i){}},_=new(function(){function i(){}var r=i.prototype;return r.load=function(t,e,s){if(t.el=typeof s=="string"?document.querySelector(s):s,t.options=b({},Z,e),t.isInput=t.el.tagName.toLowerCase()==="input",t.attr=t.options.attr,t.bindInputFocusEvents=t.options.bindInputFocusEvents,t.showCursor=!t.isInput&&t.options.showCursor,t.cursorChar=t.options.cursorChar,t.cursorBlinking=!0,t.elContent=t.attr?t.el.getAttribute(t.attr):t.el.textContent,t.contentType=t.options.contentType,t.typeSpeed=t.options.typeSpeed,t.startDelay=t.options.startDelay,t.backSpeed=t.options.backSpeed,t.smartBackspace=t.options.smartBackspace,t.backDelay=t.options.backDelay,t.fadeOut=t.options.fadeOut,t.fadeOutClass=t.options.fadeOutClass,t.fadeOutDelay=t.options.fadeOutDelay,t.isPaused=!1,t.strings=t.options.strings.map(function(p){return p.trim()}),t.stringsElement=typeof t.options.stringsElement=="string"?document.querySelector(t.options.stringsElement):t.options.stringsElement,t.stringsElement){t.strings=[],t.stringsElement.style.cssText="clip: rect(0 0 0 0);clip-path:inset(50%);height:1px;overflow:hidden;position:absolute;white-space:nowrap;width:1px;";var a=Array.prototype.slice.apply(t.stringsElement.children),o=a.length;if(o)for(var c=0;c<o;c+=1)t.strings.push(a[c].innerHTML.trim())}for(var l in t.strPos=0,t.currentElContent=this.getCurrentElContent(t),t.currentElContent&&t.currentElContent.length>0&&(t.strPos=t.currentElContent.length-1,t.strings.unshift(t.currentElContent)),t.sequence=[],t.strings)t.sequence[l]=l;t.arrayPos=0,t.stopNum=0,t.loop=t.options.loop,t.loopCount=t.options.loopCount,t.curLoop=0,t.shuffle=t.options.shuffle,t.pause={status:!1,typewrite:!0,curString:"",curStrPos:0},t.typingComplete=!1,t.autoInsertCss=t.options.autoInsertCss,t.autoInsertCss&&(this.appendCursorAnimationCss(t),this.appendFadeOutAnimationCss(t))},r.getCurrentElContent=function(t){return t.attr?t.el.getAttribute(t.attr):t.isInput?t.el.value:t.contentType==="html"?t.el.innerHTML:t.el.textContent},r.appendCursorAnimationCss=function(t){var e="data-typed-js-cursor-css";if(t.showCursor&&!document.querySelector("["+e+"]")){var s=document.createElement("style");s.setAttribute(e,"true"),s.innerHTML=`
        .typed-cursor{
          opacity: 1;
        }
        .typed-cursor.typed-cursor--blink{
          animation: typedjsBlink 0.7s infinite;
          -webkit-animation: typedjsBlink 0.7s infinite;
                  animation: typedjsBlink 0.7s infinite;
        }
        @keyframes typedjsBlink{
          50% { opacity: 0.0; }
        }
        @-webkit-keyframes typedjsBlink{
          0% { opacity: 1; }
          50% { opacity: 0.0; }
          100% { opacity: 1; }
        }
      `,document.body.appendChild(s)}},r.appendFadeOutAnimationCss=function(t){var e="data-typed-fadeout-js-css";if(t.fadeOut&&!document.querySelector("["+e+"]")){var s=document.createElement("style");s.setAttribute(e,"true"),s.innerHTML=`
        .typed-fade-out{
          opacity: 0;
          transition: opacity .25s;
        }
        .typed-cursor.typed-cursor--blink.typed-fade-out{
          -webkit-animation: 0;
          animation: 0;
        }
      `,document.body.appendChild(s)}},i}()),S=new(function(){function i(){}var r=i.prototype;return r.typeHtmlChars=function(t,e,s){if(s.contentType!=="html")return e;var a=t.substring(e).charAt(0);if(a==="<"||a==="&"){var o;for(o=a==="<"?">":";";t.substring(e+1).charAt(0)!==o&&!(1+ ++e>t.length););e++}return e},r.backSpaceHtmlChars=function(t,e,s){if(s.contentType!=="html")return e;var a=t.substring(e).charAt(0);if(a===">"||a===";"){var o;for(o=a===">"?"<":"&";t.substring(e-1).charAt(0)!==o&&!(--e<0););e--}return e},i}()),tt=function(){function i(t,e){_.load(this,e,t),this.begin()}var r=i.prototype;return r.toggle=function(){this.pause.status?this.start():this.stop()},r.stop=function(){this.typingComplete||this.pause.status||(this.toggleBlinking(!0),this.pause.status=!0,this.options.onStop(this.arrayPos,this))},r.start=function(){this.typingComplete||this.pause.status&&(this.pause.status=!1,this.pause.typewrite?this.typewrite(this.pause.curString,this.pause.curStrPos):this.backspace(this.pause.curString,this.pause.curStrPos),this.options.onStart(this.arrayPos,this))},r.destroy=function(){this.reset(!1),this.options.onDestroy(this)},r.reset=function(t){t===void 0&&(t=!0),clearInterval(this.timeout),this.replaceText(""),this.cursor&&this.cursor.parentNode&&(this.cursor.parentNode.removeChild(this.cursor),this.cursor=null),this.strPos=0,this.arrayPos=0,this.curLoop=0,t&&(this.insertCursor(),this.options.onReset(this),this.begin())},r.begin=function(){var t=this;this.options.onBegin(this),this.typingComplete=!1,this.shuffleStringsIfNeeded(this),this.insertCursor(),this.bindInputFocusEvents&&this.bindFocusEvents(),this.timeout=setTimeout(function(){t.strPos===0?t.typewrite(t.strings[t.sequence[t.arrayPos]],t.strPos):t.backspace(t.strings[t.sequence[t.arrayPos]],t.strPos)},this.startDelay)},r.typewrite=function(t,e){var s=this;this.fadeOut&&this.el.classList.contains(this.fadeOutClass)&&(this.el.classList.remove(this.fadeOutClass),this.cursor&&this.cursor.classList.remove(this.fadeOutClass));var a=this.humanizer(this.typeSpeed),o=1;this.pause.status!==!0?this.timeout=setTimeout(function(){e=S.typeHtmlChars(t,e,s);var c=0,l=t.substring(e);if(l.charAt(0)==="^"&&/^\^\d+/.test(l)){var p=1;p+=(l=/\d+/.exec(l)[0]).length,c=parseInt(l),s.temporaryPause=!0,s.options.onTypingPaused(s.arrayPos,s),t=t.substring(0,e)+t.substring(e+p),s.toggleBlinking(!0)}if(l.charAt(0)==="`"){for(;t.substring(e+o).charAt(0)!=="`"&&(o++,!(e+o>t.length)););var k=t.substring(0,e),N=t.substring(k.length+1,e+o),B=t.substring(e+o+1);t=k+N+B,o--}s.timeout=setTimeout(function(){s.toggleBlinking(!1),e>=t.length?s.doneTyping(t,e):s.keepTyping(t,e,o),s.temporaryPause&&(s.temporaryPause=!1,s.options.onTypingResumed(s.arrayPos,s))},c)},a):this.setPauseStatus(t,e,!0)},r.keepTyping=function(t,e,s){e===0&&(this.toggleBlinking(!1),this.options.preStringTyped(this.arrayPos,this));var a=t.substring(0,e+=s);this.replaceText(a),this.typewrite(t,e)},r.doneTyping=function(t,e){var s=this;this.options.onStringTyped(this.arrayPos,this),this.toggleBlinking(!0),this.arrayPos===this.strings.length-1&&(this.complete(),this.loop===!1||this.curLoop===this.loopCount)||(this.timeout=setTimeout(function(){s.backspace(t,e)},this.backDelay))},r.backspace=function(t,e){var s=this;if(this.pause.status!==!0){if(this.fadeOut)return this.initFadeOut();this.toggleBlinking(!1);var a=this.humanizer(this.backSpeed);this.timeout=setTimeout(function(){e=S.backSpaceHtmlChars(t,e,s);var o=t.substring(0,e);if(s.replaceText(o),s.smartBackspace){var c=s.strings[s.arrayPos+1];s.stopNum=c&&o===c.substring(0,e)?e:0}e>s.stopNum?(e--,s.backspace(t,e)):e<=s.stopNum&&(s.arrayPos++,s.arrayPos===s.strings.length?(s.arrayPos=0,s.options.onLastStringBackspaced(),s.shuffleStringsIfNeeded(),s.begin()):s.typewrite(s.strings[s.sequence[s.arrayPos]],e))},a)}else this.setPauseStatus(t,e,!1)},r.complete=function(){this.options.onComplete(this),this.loop?this.curLoop++:this.typingComplete=!0},r.setPauseStatus=function(t,e,s){this.pause.typewrite=s,this.pause.curString=t,this.pause.curStrPos=e},r.toggleBlinking=function(t){this.cursor&&(this.pause.status||this.cursorBlinking!==t&&(this.cursorBlinking=t,t?this.cursor.classList.add("typed-cursor--blink"):this.cursor.classList.remove("typed-cursor--blink")))},r.humanizer=function(t){return Math.round(Math.random()*t/2)+t},r.shuffleStringsIfNeeded=function(){this.shuffle&&(this.sequence=this.sequence.sort(function(){return Math.random()-.5}))},r.initFadeOut=function(){var t=this;return this.el.className+=" "+this.fadeOutClass,this.cursor&&(this.cursor.className+=" "+this.fadeOutClass),setTimeout(function(){t.arrayPos++,t.replaceText(""),t.strings.length>t.arrayPos?t.typewrite(t.strings[t.sequence[t.arrayPos]],0):(t.typewrite(t.strings[0],0),t.arrayPos=0)},this.fadeOutDelay)},r.replaceText=function(t){this.attr?this.el.setAttribute(this.attr,t):this.isInput?this.el.value=t:this.contentType==="html"?this.el.innerHTML=t:this.el.textContent=t},r.bindFocusEvents=function(){var t=this;this.isInput&&(this.el.addEventListener("focus",function(e){t.stop()}),this.el.addEventListener("blur",function(e){t.el.value&&t.el.value.length!==0||t.start()}))},r.insertCursor=function(){this.showCursor&&(this.cursor||(this.cursor=document.createElement("span"),this.cursor.className="typed-cursor",this.cursor.setAttribute("aria-hidden",!0),this.cursor.innerHTML=this.cursorChar,this.el.parentNode&&this.el.parentNode.insertBefore(this.cursor,this.el.nextSibling)))},i}();const et=h({main:{position:"relative"},img:{...T,aspectRatio:"42/9",width:"100%",minHeight:"320px",...d.borderRadius(u.borderRadiusXLarge)},mask:{position:"absolute",top:0,left:0,right:0,bottom:"4px",...d.borderRadius(u.borderRadiusXLarge),backdropFilter:"brightness(110%)"},info:{...P,position:"absolute",top:0,...d.padding(u.spacingHorizontalXXXL),height:"-webkit-fill-available"},space:{flexBasis:"50%",flexShrink:0,"@media screen and (max-width: 1024px)":{flexBasis:0}},txt:{...L,justifyContent:"space-around"},white:{color:"white !important","@media screen and (max-width: 600px)":{fontSize:u.fontSizeBase300,lineHeight:u.lineHeightBase300}},bg:{width:"fit-content",backgroundColor:"rgba(0, 0, 0, 0.65)"},btn:{width:"fit-content"}}),st=E({background:"linear-gradient(to right, transparent, var(--colorScrollbarOverlay))"});function j(){const i=et(),r=st(),t=O(e=>{const s=new tt(e,{strings:["Performance","Safe","World","Love"],typeSpeed:60,backSpeed:40,startDelay:1500,backDelay:3e3,showCursor:!1});return()=>s.destroy()});return n.jsxs(n.Fragment,{children:[n.jsxs("div",{className:i.main,children:[n.jsx(D,{className:i.img,src:"/banner.webp"}),n.jsx("div",{className:g(i.mask,r)}),n.jsxs("div",{className:i.info,children:[n.jsx("div",{className:i.space}),n.jsxs("div",{className:i.txt,children:[n.jsxs("div",{className:i.bg,children:[n.jsx(w,{className:i.white,children:"Play "}),n.jsx(y,{ref:t,size:900,weight:"semibold",underline:!0,className:i.white,children:"?"}),n.jsx(w,{className:i.white,children:" With Open Telekom Cloud"})]}),n.jsx(y,{size:500,truncate:!0,className:g(i.bg,i.white),children:"Open Telekom Cloud is envisioned, run, and nurtured by a unique and dynamic team of experts committed to sovereignty and open-source innovation: The OTC tribe! To showcase your connection and #werkstolz, we're thrilled to offer our members an exclusive chance to snag up to three fashion items as a token of appreciation."}),n.jsxs(R,{modalType:"non-modal",children:[n.jsx(I,{disableButtonEnhancement:!0,children:n.jsx("div",{className:i.btn,children:n.jsx(H,{appearance:"outline",size:"large",className:g(i.bg,i.white),children:"Learn More"})})}),n.jsx(F,{children:n.jsxs(z,{children:[n.jsx(A,{children:"Welcome to LoveOTC Shop"}),n.jsx(G,{children:n.jsxs(y,{size:400,children:["Open Telekom Cloud is envisioned, run, and nurtured by a unique and dynamic team of experts committed to sovereignty and open-source innovation: The OTC tribe! To showcase your connection and #werkstolz, we're thrilled to offer our tribe members an exclusive chance to snag up to three fashion items as a token of appreciation.",n.jsx("br",{}),n.jsx("br",{}),`To start shopping, simply log in with your OTC-LDAP account in the top right corner. Don't forget to update your delivery address for a seamless experience – just click on your profile avatar and head to "Settings." Rest assured, we only keep your personal data until your awesome items reach your doorstep.`,n.jsx("br",{}),n.jsx("br",{}),`Found your style in the shop? Double-check your selections in the cart – sizes, variants, quantities – and when everything's perfect, hit "Checkout." Review your entire order, confirm your delivery address, and feel free to leave a note. Ready? Click "Submit" for a confirmation. Now, you can either close the shop or keep browsing. Expect your stylish delivery in 10-14 days. Happy shopping, OTC trendsetters!`]})})]})})]})]})]})]}),n.jsx(q,{})]})}const nt=h({img:{aspectRatio:"1",...T,borderTopLeftRadius:u.borderRadiusMedium,borderTopRightRadius:u.borderRadiusMedium},fore:{color:u.colorBrandForegroundLink}}),m=new v("Gallery","Category","Card");function it({Id:i}){const r=nt(),{data:t}=x(()=>C.Product.Get.Basic(i,m),{onError:m.error});return n.jsx(M,{href:`/Product/${i}`,children:n.jsxs(X,{children:[n.jsx(W,{children:n.jsx(Y,{className:r.img,Guid:t?.Cover,ParentLog:m})}),n.jsx($,{children:n.jsx(V,{className:r.fore,children:t?.Name||"Loading..."})})]})})}const rt=h({card:{flexBasis:"20%",flexGrow:1,flexShrink:0,maxWidth:"25%",minWidth:`${375/2}px`,boxSizing:"border-box",paddingRight:u.spacingHorizontalL,paddingLeft:u.spacingHorizontalL},cate:{...P,flexWrap:"wrap",rowGap:u.spacingVerticalXL}}),ot=new v("Gallery","Category");function at({Category:i}){const r=rt(),{data:t,loading:e}=x(()=>C.Gallery.Get.Products(i),{onError:ot.error});return n.jsxs(n.Fragment,{children:[n.jsx(U,{children:i}),n.jsx("div",{className:r.cate,children:e?n.jsx(f,{size:128}):t.map((s,a)=>n.jsx("div",{className:r.card,children:n.jsx(it,{Id:s},a)}))})]})}const ut=h({main:{...L,rowGap:u.spacingVerticalXL}}),ct=new v("Gallery");function ht(){const i=ut(),{data:r,loading:t}=x(()=>C.Gallery.Get.Categories(),{onError:ct.error});return t?n.jsxs(J,{className:i.main,children:[n.jsx(j,{}),n.jsx(f,{appearance:"translucent",size:32}),n.jsx(f,{size:128})]}):n.jsxs("div",{className:i.main,children:[n.jsx(K,{children:n.jsxs("title",{children:["Gallery - ",Q.Name]})}),n.jsx(j,{}),r?.map((e,s)=>n.jsx(at,{Category:e},s))]})}export{ht as default};