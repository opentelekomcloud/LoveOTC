import{m as d,s as p,t as l,aM as E,j as r,E as B,az as k,i as f,D,q as A,B as F,k as I,l as R,n as G,o as M,aA as q,y as b,aN as H,aO as z,aP as X,Q as $,G as W,ax as V,a5 as m,aQ as Q,aq as U}from"./vendor-XtknNJBP.js";import{C as P,F as w,a as L,L as v,H as C,G as Y,D as _}from"./index-PVaEwox_.js";import{c as J,b as K,e as Z}from"./isArrayLike--sVJAW2Y.js";import{i as tt}from"./isObject-tyZXtoJz.js";import{t as j}from"./toFinite-GMFxiq4g.js";function st(n,e,t){if(!tt(t))return!1;var s=typeof e;return(s=="number"?J(t)&&K(e,t.length):s=="string"&&e in t)?Z(t[e],n):!1}var et=Math.floor,nt=Math.random;function it(n,e){return n+et(nt()*(e-n+1))}var rt=parseFloat,at=Math.min,ot=Math.random;function ut(n,e,t){if(t&&typeof t!="boolean"&&st(n,e,t)&&(e=t=void 0),t===void 0&&(typeof e=="boolean"?(t=e,e=void 0):typeof n=="boolean"&&(t=n,n=void 0)),n===void 0&&e===void 0?(n=0,e=1):(n=j(n),e===void 0?(e=n,n=0):e=j(e)),n>e){var s=n;n=e,e=s}if(t||n%1||e%1){var i=ot();return at(n+i*(e-n+rt("1e-"+((i+"").length-1))),e)}return it(n,e)}function g(){return g=Object.assign?Object.assign.bind():function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var s in t)Object.prototype.hasOwnProperty.call(t,s)&&(n[s]=t[s])}return n},g.apply(this,arguments)}var ct={strings:["These are the default values...","You know what you should do?","Use your own!","Have a great day!"],stringsElement:null,typeSpeed:0,startDelay:0,backSpeed:0,smartBackspace:!0,shuffle:!1,backDelay:700,fadeOut:!1,fadeOutClass:"typed-fade-out",fadeOutDelay:500,loop:!1,loopCount:1/0,showCursor:!0,cursorChar:"|",autoInsertCss:!0,attr:null,bindInputFocusEvents:!1,contentType:"html",onBegin:function(n){},onComplete:function(n){},preStringTyped:function(n,e){},onStringTyped:function(n,e){},onLastStringBackspaced:function(n){},onTypingPaused:function(n,e){},onTypingResumed:function(n,e){},onReset:function(n){},onStop:function(n,e){},onStart:function(n,e){},onDestroy:function(n){}},lt=new(function(){function n(){}var e=n.prototype;return e.load=function(t,s,i){if(t.el=typeof i=="string"?document.querySelector(i):i,t.options=g({},ct,s),t.isInput=t.el.tagName.toLowerCase()==="input",t.attr=t.options.attr,t.bindInputFocusEvents=t.options.bindInputFocusEvents,t.showCursor=!t.isInput&&t.options.showCursor,t.cursorChar=t.options.cursorChar,t.cursorBlinking=!0,t.elContent=t.attr?t.el.getAttribute(t.attr):t.el.textContent,t.contentType=t.options.contentType,t.typeSpeed=t.options.typeSpeed,t.startDelay=t.options.startDelay,t.backSpeed=t.options.backSpeed,t.smartBackspace=t.options.smartBackspace,t.backDelay=t.options.backDelay,t.fadeOut=t.options.fadeOut,t.fadeOutClass=t.options.fadeOutClass,t.fadeOutDelay=t.options.fadeOutDelay,t.isPaused=!1,t.strings=t.options.strings.map(function(h){return h.trim()}),t.stringsElement=typeof t.options.stringsElement=="string"?document.querySelector(t.options.stringsElement):t.options.stringsElement,t.stringsElement){t.strings=[],t.stringsElement.style.cssText="clip: rect(0 0 0 0);clip-path:inset(50%);height:1px;overflow:hidden;position:absolute;white-space:nowrap;width:1px;";var a=Array.prototype.slice.apply(t.stringsElement.children),o=a.length;if(o)for(var u=0;u<o;u+=1)t.strings.push(a[u].innerHTML.trim())}for(var c in t.strPos=0,t.currentElContent=this.getCurrentElContent(t),t.currentElContent&&t.currentElContent.length>0&&(t.strPos=t.currentElContent.length-1,t.strings.unshift(t.currentElContent)),t.sequence=[],t.strings)t.sequence[c]=c;t.arrayPos=0,t.stopNum=0,t.loop=t.options.loop,t.loopCount=t.options.loopCount,t.curLoop=0,t.shuffle=t.options.shuffle,t.pause={status:!1,typewrite:!0,curString:"",curStrPos:0},t.typingComplete=!1,t.autoInsertCss=t.options.autoInsertCss,t.autoInsertCss&&(this.appendCursorAnimationCss(t),this.appendFadeOutAnimationCss(t))},e.getCurrentElContent=function(t){return t.attr?t.el.getAttribute(t.attr):t.isInput?t.el.value:t.contentType==="html"?t.el.innerHTML:t.el.textContent},e.appendCursorAnimationCss=function(t){var s="data-typed-js-cursor-css";if(t.showCursor&&!document.querySelector("["+s+"]")){var i=document.createElement("style");i.setAttribute(s,"true"),i.innerHTML=`
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
      `,document.body.appendChild(i)}},e.appendFadeOutAnimationCss=function(t){var s="data-typed-fadeout-js-css";if(t.fadeOut&&!document.querySelector("["+s+"]")){var i=document.createElement("style");i.setAttribute(s,"true"),i.innerHTML=`
        .typed-fade-out{
          opacity: 0;
          transition: opacity .25s;
        }
        .typed-cursor.typed-cursor--blink.typed-fade-out{
          -webkit-animation: 0;
          animation: 0;
        }
      `,document.body.appendChild(i)}},n}()),T=new(function(){function n(){}var e=n.prototype;return e.typeHtmlChars=function(t,s,i){if(i.contentType!=="html")return s;var a=t.substring(s).charAt(0);if(a==="<"||a==="&"){var o;for(o=a==="<"?">":";";t.substring(s+1).charAt(0)!==o&&!(1+ ++s>t.length););s++}return s},e.backSpaceHtmlChars=function(t,s,i){if(i.contentType!=="html")return s;var a=t.substring(s).charAt(0);if(a===">"||a===";"){var o;for(o=a===">"?"<":"&";t.substring(s-1).charAt(0)!==o&&!(--s<0););s--}return s},n}()),ht=function(){function n(t,s){lt.load(this,s,t),this.begin()}var e=n.prototype;return e.toggle=function(){this.pause.status?this.start():this.stop()},e.stop=function(){this.typingComplete||this.pause.status||(this.toggleBlinking(!0),this.pause.status=!0,this.options.onStop(this.arrayPos,this))},e.start=function(){this.typingComplete||this.pause.status&&(this.pause.status=!1,this.pause.typewrite?this.typewrite(this.pause.curString,this.pause.curStrPos):this.backspace(this.pause.curString,this.pause.curStrPos),this.options.onStart(this.arrayPos,this))},e.destroy=function(){this.reset(!1),this.options.onDestroy(this)},e.reset=function(t){t===void 0&&(t=!0),clearInterval(this.timeout),this.replaceText(""),this.cursor&&this.cursor.parentNode&&(this.cursor.parentNode.removeChild(this.cursor),this.cursor=null),this.strPos=0,this.arrayPos=0,this.curLoop=0,t&&(this.insertCursor(),this.options.onReset(this),this.begin())},e.begin=function(){var t=this;this.options.onBegin(this),this.typingComplete=!1,this.shuffleStringsIfNeeded(this),this.insertCursor(),this.bindInputFocusEvents&&this.bindFocusEvents(),this.timeout=setTimeout(function(){t.strPos===0?t.typewrite(t.strings[t.sequence[t.arrayPos]],t.strPos):t.backspace(t.strings[t.sequence[t.arrayPos]],t.strPos)},this.startDelay)},e.typewrite=function(t,s){var i=this;this.fadeOut&&this.el.classList.contains(this.fadeOutClass)&&(this.el.classList.remove(this.fadeOutClass),this.cursor&&this.cursor.classList.remove(this.fadeOutClass));var a=this.humanizer(this.typeSpeed),o=1;this.pause.status!==!0?this.timeout=setTimeout(function(){s=T.typeHtmlChars(t,s,i);var u=0,c=t.substring(s);if(c.charAt(0)==="^"&&/^\^\d+/.test(c)){var h=1;h+=(c=/\d+/.exec(c)[0]).length,u=parseInt(c),i.temporaryPause=!0,i.options.onTypingPaused(i.arrayPos,i),t=t.substring(0,s)+t.substring(s+h),i.toggleBlinking(!0)}if(c.charAt(0)==="`"){for(;t.substring(s+o).charAt(0)!=="`"&&(o++,!(s+o>t.length)););var x=t.substring(0,s),O=t.substring(x.length+1,s+o),N=t.substring(s+o+1);t=x+O+N,o--}i.timeout=setTimeout(function(){i.toggleBlinking(!1),s>=t.length?i.doneTyping(t,s):i.keepTyping(t,s,o),i.temporaryPause&&(i.temporaryPause=!1,i.options.onTypingResumed(i.arrayPos,i))},u)},a):this.setPauseStatus(t,s,!0)},e.keepTyping=function(t,s,i){s===0&&(this.toggleBlinking(!1),this.options.preStringTyped(this.arrayPos,this));var a=t.substring(0,s+=i);this.replaceText(a),this.typewrite(t,s)},e.doneTyping=function(t,s){var i=this;this.options.onStringTyped(this.arrayPos,this),this.toggleBlinking(!0),this.arrayPos===this.strings.length-1&&(this.complete(),this.loop===!1||this.curLoop===this.loopCount)||(this.timeout=setTimeout(function(){i.backspace(t,s)},this.backDelay))},e.backspace=function(t,s){var i=this;if(this.pause.status!==!0){if(this.fadeOut)return this.initFadeOut();this.toggleBlinking(!1);var a=this.humanizer(this.backSpeed);this.timeout=setTimeout(function(){s=T.backSpaceHtmlChars(t,s,i);var o=t.substring(0,s);if(i.replaceText(o),i.smartBackspace){var u=i.strings[i.arrayPos+1];i.stopNum=u&&o===u.substring(0,s)?s:0}s>i.stopNum?(s--,i.backspace(t,s)):s<=i.stopNum&&(i.arrayPos++,i.arrayPos===i.strings.length?(i.arrayPos=0,i.options.onLastStringBackspaced(),i.shuffleStringsIfNeeded(),i.begin()):i.typewrite(i.strings[i.sequence[i.arrayPos]],s))},a)}else this.setPauseStatus(t,s,!1)},e.complete=function(){this.options.onComplete(this),this.loop?this.curLoop++:this.typingComplete=!0},e.setPauseStatus=function(t,s,i){this.pause.typewrite=i,this.pause.curString=t,this.pause.curStrPos=s},e.toggleBlinking=function(t){this.cursor&&(this.pause.status||this.cursorBlinking!==t&&(this.cursorBlinking=t,t?this.cursor.classList.add("typed-cursor--blink"):this.cursor.classList.remove("typed-cursor--blink")))},e.humanizer=function(t){return Math.round(Math.random()*t/2)+t},e.shuffleStringsIfNeeded=function(){this.shuffle&&(this.sequence=this.sequence.sort(function(){return Math.random()-.5}))},e.initFadeOut=function(){var t=this;return this.el.className+=" "+this.fadeOutClass,this.cursor&&(this.cursor.className+=" "+this.fadeOutClass),setTimeout(function(){t.arrayPos++,t.replaceText(""),t.strings.length>t.arrayPos?t.typewrite(t.strings[t.sequence[t.arrayPos]],0):(t.typewrite(t.strings[0],0),t.arrayPos=0)},this.fadeOutDelay)},e.replaceText=function(t){this.attr?this.el.setAttribute(this.attr,t):this.isInput?this.el.value=t:this.contentType==="html"?this.el.innerHTML=t:this.el.textContent=t},e.bindFocusEvents=function(){var t=this;this.isInput&&(this.el.addEventListener("focus",function(s){t.stop()}),this.el.addEventListener("blur",function(s){t.el.value&&t.el.value.length!==0||t.start()}))},e.insertCursor=function(){this.showCursor&&(this.cursor||(this.cursor=document.createElement("span"),this.cursor.className="typed-cursor",this.cursor.setAttribute("aria-hidden",!0),this.cursor.innerHTML=this.cursorChar,this.el.parentNode&&this.el.parentNode.insertBefore(this.cursor,this.el.nextSibling)))},n}();const dt=d({main:{position:"relative"},img:{...P,aspectRatio:"42/9",width:"100%",...p.borderRadius(l.borderRadiusXLarge)},mask:{position:"absolute",top:0,left:0,right:0,bottom:"4px",...p.borderRadius(l.borderRadiusXLarge),backdropFilter:"blur(1px) brightness(105%)"},info:{...w,position:"absolute",top:0,...p.padding(l.spacingHorizontalXXXL),height:"-webkit-fill-available"},space:{flexBasis:"50%",flexShrink:0},txt:{...L,justifyContent:"space-around"},white:{color:"white !important"}});function S(){const n=dt(),e=E(t=>{const s=new ht(t,{strings:["Performance","Safe","World","Love"],typeSpeed:60,backSpeed:40,startDelay:1500,backDelay:3e3,showCursor:!1});return()=>s.destroy()});return r.jsxs(r.Fragment,{children:[r.jsxs("div",{className:n.main,children:[r.jsx(B,{className:n.img,src:"/banner.jpg"}),r.jsx("div",{className:n.mask,style:{background:"linear-gradient(to right, transparent, var(--colorBackgroundOverlay))"}}),r.jsxs("div",{className:n.info,children:[r.jsx("div",{className:n.space}),r.jsxs("div",{className:n.txt,children:[r.jsxs("div",{children:[r.jsx(k,{className:n.white,children:"Play "}),r.jsx(f,{ref:e,size:900,weight:"semibold",underline:!0,className:n.white,children:"?"}),r.jsx(k,{className:n.white,children:" With Open Telekom Cloud"})]}),r.jsx(f,{size:500,className:n.white,children:'We offer an exclusive chance for OTC tribe members to get up to three fashion items until February 29, 2024. Members can log in using their OTC-LDAP account, update their delivery address in the "Settings," and shop for their preferred styles. After selecting items and sizes, confirm and submit their order and address. Orders are expected to arrive within 10-14 days.'}),r.jsxs(D,{modalType:"non-modal",children:[r.jsx(A,{disableButtonEnhancement:!0,children:r.jsx("div",{children:r.jsx(F,{appearance:"outline",size:"large",className:n.white,children:"Learn More"})})}),r.jsx(I,{children:r.jsxs(R,{children:[r.jsx(G,{children:"Welcome to LoveOTC Shop"}),r.jsx(M,{children:r.jsxs(f,{size:400,children:["Open Telekom Cloud is envisioned, run, and nurtured by a unique and dynamic team of experts committed to sovereignty and open-source innovation: The OTC tribe! To showcase your connection and #werkstolz, we're thrilled to offer our tribe members an exclusive chance to snag up to three fashion items as a token of appreciation. Hurry, this offer is only open until February 29, 2024!",r.jsx("br",{}),r.jsx("br",{}),`To start shopping, simply log in with your OTC-LDAP account in the top right corner. Don't forget to update your delivery address for a seamless experience – just click on your profile avatar and head to "Settings." Rest assured, we only keep your personal data until your awesome items reach your doorstep.`,r.jsx("br",{}),r.jsx("br",{}),`Found your style in the shop? Double-check your selections in the cart – sizes, variants, quantities – and when everything's perfect, hit "Checkout." Review your entire order, confirm your delivery address, and feel free to leave a note. Ready? Click "Submit" for a confirmation. Now, you can either close the shop or keep browsing. Expect your stylish delivery in 10-14 days. Happy shopping, OTC trendsetters!`]})})]})})]})]})]})]}),r.jsx(q,{})]})}const pt=d({card:{flexBasis:"23%",flexGrow:0},img:{aspectRatio:"1",...P,borderTopLeftRadius:l.borderRadiusMedium,borderTopRightRadius:l.borderRadiusMedium}}),y=new v("Gallery","Category","Card");function ft({Id:n}){const e=pt(),{data:t}=b(()=>C.Product.Get.Basic(n,y),{onError:y.error});return r.jsxs(H,{className:e.card,children:[r.jsx(z,{children:r.jsx(Y,{className:e.img,Guid:t?.Cover,Log:y})}),r.jsx(X,{children:r.jsx($,{children:r.jsx(W,{href:`/Product/${n}`,children:t?.Name||"Loading..."})})})]})}const yt=d({card:{flexBasis:"23%",flexGrow:0},cate:{...w,flexWrap:"wrap",justifyContent:"space-evenly",columnGap:l.spacingVerticalL,rowGap:l.spacingVerticalXL}}),mt=new v("Gallery","Category");function gt({Category:n}){const e=yt(),{data:t,loading:s}=b(()=>C.Gallery.Get.Products(n),{onError:mt.error});return r.jsxs(r.Fragment,{children:[r.jsx(V,{children:n}),r.jsx("div",{className:e.cate,children:s?r.jsx(m,{size:128}):t[0].map((i,a)=>r.jsx(ft,{Id:i},a)).concat(Array(t[1]).fill(null).map((i,a)=>r.jsx("div",{className:e.card},a+ut(10,100))))})]})}const bt=d({main:{...L,rowGap:l.spacingVerticalXL}}),vt=new v("Gallery");function St(){const n=bt(),{data:e,loading:t}=b(()=>C.Gallery.Get.Categories(),{onError:vt.error});return t?r.jsxs(Q,{className:n.main,children:[r.jsx(S,{}),r.jsx(m,{appearance:"translucent",size:32}),r.jsx(m,{size:128})]}):r.jsxs("div",{className:n.main,children:[r.jsx(U,{children:r.jsxs("title",{children:["Gallery - ",_.Name]})}),r.jsx(S,{}),e?.map((s,i)=>r.jsx(gt,{Category:s},i))]})}export{St as default};
