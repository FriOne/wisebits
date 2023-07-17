(()=>{var t={837:(t,e,n)=>{t.exports=n(280)},280:(t,e,n)=>{var o=n(793);e.operation=function(t){var n=e.timeouts(t);return new o(n,{forever:t&&(t.forever||t.retries===1/0),unref:t&&t.unref,maxRetryTime:t&&t.maxRetryTime})},e.timeouts=function(t){if(t instanceof Array)return[].concat(t);var e={retries:10,factor:2,minTimeout:1e3,maxTimeout:1/0,randomize:!1};for(var n in t)e[n]=t[n];if(e.minTimeout>e.maxTimeout)throw new Error("minTimeout is greater than maxTimeout");for(var o=[],r=0;r<e.retries;r++)o.push(this.createTimeout(r,e));return t&&t.forever&&!o.length&&o.push(this.createTimeout(r,e)),o.sort((function(t,e){return t-e})),o},e.createTimeout=function(t,e){var n=e.randomize?Math.random()+1:1,o=Math.round(n*Math.max(e.minTimeout,1)*Math.pow(e.factor,t));return Math.min(o,e.maxTimeout)},e.wrap=function(t,n,o){if(n instanceof Array&&(o=n,n=null),!o)for(var r in o=[],t)"function"==typeof t[r]&&o.push(r);for(var s=0;s<o.length;s++){var i=o[s],a=t[i];t[i]=function(o){var r=e.operation(n),s=Array.prototype.slice.call(arguments,1),i=s.pop();s.push((function(t){r.retry(t)||(t&&(arguments[0]=r.mainError()),i.apply(this,arguments))})),r.attempt((function(){o.apply(t,s)}))}.bind(t,a),t[i].options=n}}},793:t=>{function e(t,e){"boolean"==typeof e&&(e={forever:e}),this._originalTimeouts=JSON.parse(JSON.stringify(t)),this._timeouts=t,this._options=e||{},this._maxRetryTime=e&&e.maxRetryTime||1/0,this._fn=null,this._errors=[],this._attempts=1,this._operationTimeout=null,this._operationTimeoutCb=null,this._timeout=null,this._operationStart=null,this._timer=null,this._options.forever&&(this._cachedTimeouts=this._timeouts.slice(0))}t.exports=e,e.prototype.reset=function(){this._attempts=1,this._timeouts=this._originalTimeouts.slice(0)},e.prototype.stop=function(){this._timeout&&clearTimeout(this._timeout),this._timer&&clearTimeout(this._timer),this._timeouts=[],this._cachedTimeouts=null},e.prototype.retry=function(t){if(this._timeout&&clearTimeout(this._timeout),!t)return!1;var e=(new Date).getTime();if(t&&e-this._operationStart>=this._maxRetryTime)return this._errors.push(t),this._errors.unshift(new Error("RetryOperation timeout occurred")),!1;this._errors.push(t);var n=this._timeouts.shift();if(void 0===n){if(!this._cachedTimeouts)return!1;this._errors.splice(0,this._errors.length-1),n=this._cachedTimeouts.slice(-1)}var o=this;return this._timer=setTimeout((function(){o._attempts++,o._operationTimeoutCb&&(o._timeout=setTimeout((function(){o._operationTimeoutCb(o._attempts)}),o._operationTimeout),o._options.unref&&o._timeout.unref()),o._fn(o._attempts)}),n),this._options.unref&&this._timer.unref(),!0},e.prototype.attempt=function(t,e){this._fn=t,e&&(e.timeout&&(this._operationTimeout=e.timeout),e.cb&&(this._operationTimeoutCb=e.cb));var n=this;this._operationTimeoutCb&&(this._timeout=setTimeout((function(){n._operationTimeoutCb()}),n._operationTimeout)),this._operationStart=(new Date).getTime(),this._fn(this._attempts)},e.prototype.try=function(t){console.log("Using RetryOperation.try() is deprecated"),this.attempt(t)},e.prototype.start=function(t){console.log("Using RetryOperation.start() is deprecated"),this.attempt(t)},e.prototype.start=e.prototype.try,e.prototype.errors=function(){return this._errors},e.prototype.attempts=function(){return this._attempts},e.prototype.mainError=function(){if(0===this._errors.length)return null;for(var t={},e=null,n=0,o=0;o<this._errors.length;o++){var r=this._errors[o],s=r.message,i=(t[s]||0)+1;t[s]=i,i>=n&&(e=r,n=i)}return e}}},e={};function n(o){var r=e[o];if(void 0!==r)return r.exports;var s=e[o]={exports:{}};return t[o](s,s.exports,n),s.exports}(()=>{"use strict";new Set;const t="undefined"!=typeof window?window:"undefined"!=typeof globalThis?globalThis:global;class e{_listeners="WeakMap"in t?new WeakMap:void 0;_observer=void 0;options;constructor(t){this.options=t}observe(t,e){return this._listeners.set(t,e),this._getObserver().observe(t,this.options),()=>{this._listeners.delete(t),this._observer.unobserve(t)}}_getObserver(){return this._observer??(this._observer=new ResizeObserver((t=>{for(const n of t)e.entries.set(n.target,n),this._listeners.get(n.target)?.(n)})))}}e.entries="WeakMap"in t?new WeakMap:void 0;let o,r=!1;function s(t,e){t.appendChild(e)}function i(t,e,n){t.insertBefore(e,n||null)}function a(t){t.parentNode&&t.parentNode.removeChild(t)}function c(t){return document.createElement(t)}function l(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function u(t){return document.createTextNode(t)}function f(){return u(" ")}function h(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function d(t,e){e=""+e,t.data!==e&&(t.data=e)}function p(t,e,n,o){null==n?t.style.removeProperty(e):t.style.setProperty(e,n,o?"important":"")}function $(){}function m(t,e){for(const n in e)t[n]=e[n];return t}function g(t){return t()}function _(){return Object.create(null)}function y(t){t.forEach(g)}function v(t){return"function"==typeof t}function b(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function w(t){const e={};for(const n in t)"$"!==n[0]&&(e[n]=t[n]);return e}function x(t){o=t}function T(){if(!o)throw new Error("Function called outside component initialization");return o}function E(t,e){const n=t.$$.callbacks[e.type];n&&n.slice().forEach((t=>t.call(this,e)))}new Map;const k=[],O=[];let z=[];const I=[],M=Promise.resolve();let S=!1;function A(t){z.push(t)}const L=new Set;let N=0;function j(){if(0!==N)return;const t=o;do{try{for(;N<k.length;){const t=k[N];N++,x(t),C(t.$$)}}catch(t){throw k.length=0,N=0,t}for(x(null),k.length=0,N=0;O.length;)O.pop()();for(let t=0;t<z.length;t+=1){const e=z[t];L.has(e)||(L.add(e),e())}z.length=0}while(k.length);for(;I.length;)I.pop()();S=!1,L.clear(),x(t)}function C(t){if(null!==t.fragment){t.update(),y(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(A)}}const R=new Set;let P,B;function D(){P={r:0,c:[],p:P}}function F(){P.r||y(P.c),P=P.p}function W(t,e){t&&t.i&&(R.delete(t),t.i(e))}function q(t,e,n,o){if(t&&t.o){if(R.has(t))return;R.add(t),P.c.push((()=>{R.delete(t),o&&(n&&t.d(1),o())})),t.o(e)}else o&&o()}function J(t){return void 0!==t?.length?t:Array.from(t)}function H(t,e){q(t,1,1,(()=>{e.delete(t.key)}))}function U(t){t&&t.c()}function Z(t,e,n){const{fragment:o,after_update:r}=t.$$;o&&o.m(e,n),A((()=>{const e=t.$$.on_mount.map(g).filter(v);t.$$.on_destroy?t.$$.on_destroy.push(...e):y(e),t.$$.on_mount=[]})),r.forEach(A)}function Y(t,e){const n=t.$$;null!==n.fragment&&(function(t){const e=[],n=[];z.forEach((o=>-1===t.indexOf(o)?e.push(o):n.push(o))),n.forEach((t=>t())),z=e}(n.after_update),y(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function G(t,e,n,s,i,c,l,u=[-1]){const f=o;x(t);const h=t.$$={fragment:null,ctx:[],props:c,update:$,not_equal:i,bound:_(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(f?f.$$.context:[])),callbacks:_(),dirty:u,skip_bound:!1,root:e.target||f.$$.root};l&&l(h.root);let d=!1;if(h.ctx=n?n(t,e.props||{},((e,n,...o)=>{const r=o.length?o[0]:n;return h.ctx&&i(h.ctx[e],h.ctx[e]=r)&&(!h.skip_bound&&h.bound[e]&&h.bound[e](r),d&&function(t,e){-1===t.$$.dirty[0]&&(k.push(t),S||(S=!0,M.then(j)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}(t,e)),n})):[],h.update(),d=!0,y(h.before_update),h.fragment=!!s&&s(h.ctx),e.target){if(e.hydrate){r=!0;const t=(p=e.target,Array.from(p.childNodes));h.fragment&&h.fragment.l(t),t.forEach(a)}else h.fragment&&h.fragment.c();e.intro&&W(t.$$.fragment),Z(t,e.target,e.anchor),r=!1,j()}var p;x(f)}function K(t,e,n,o){const r=n[t]?.type;if(e="Boolean"===r&&"boolean"!=typeof e?null!=e:e,!o||!n[t])return e;if("toAttribute"===o)switch(r){case"Object":case"Array":return null==e?null:JSON.stringify(e);case"Boolean":return e?"":null;case"Number":return null==e?null:e;default:return e}else switch(r){case"Object":case"Array":return e&&JSON.parse(e);case"Boolean":default:return e;case"Number":return null!=e?+e:e}}new Set(["allowfullscreen","allowpaymentrequest","async","autofocus","autoplay","checked","controls","default","defer","disabled","formnovalidate","hidden","inert","ismap","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","selected"]),"function"==typeof HTMLElement&&(B=class extends HTMLElement{$$ctor;$$s;$$c;$$cn=!1;$$d={};$$r=!1;$$p_d={};$$l={};$$l_u=new Map;constructor(t,e,n){super(),this.$$ctor=t,this.$$s=e,n&&this.attachShadow({mode:"open"})}addEventListener(t,e,n){if(this.$$l[t]=this.$$l[t]||[],this.$$l[t].push(e),this.$$c){const n=this.$$c.$on(t,e);this.$$l_u.set(e,n)}super.addEventListener(t,e,n)}removeEventListener(t,e,n){if(super.removeEventListener(t,e,n),this.$$c){const t=this.$$l_u.get(e);t&&(t(),this.$$l_u.delete(e))}}async connectedCallback(){if(this.$$cn=!0,!this.$$c){if(await Promise.resolve(),!this.$$cn)return;function t(t){return()=>{let e;return{c:function(){e=c("slot"),"default"!==t&&h(e,"name",t)},m:function(t,n){i(t,e,n)},d:function(t){t&&a(e)}}}}const e={},n=function(t){const e={};return t.childNodes.forEach((t=>{e[t.slot||"default"]=!0})),e}(this);for(const r of this.$$s)r in n&&(e[r]=[t(r)]);for(const s of this.attributes){const l=this.$$g_p(s.name);l in this.$$d||(this.$$d[l]=K(l,s.value,this.$$p_d,"toProp"))}this.$$c=new this.$$ctor({target:this.shadowRoot||this,props:{...this.$$d,$$slots:e,$$scope:{ctx:[]}}});const o=()=>{this.$$r=!0;for(const t in this.$$p_d)if(this.$$d[t]=this.$$c.$$.ctx[this.$$c.$$.props[t]],this.$$p_d[t].reflect){const e=K(t,this.$$d[t],this.$$p_d,"toAttribute");null==e?this.removeAttribute(t):this.setAttribute(this.$$p_d[t].attribute||t,e)}this.$$r=!1};this.$$c.$$.after_update.push(o),o();for(const u in this.$$l)for(const f of this.$$l[u]){const d=this.$$c.$on(u,f);this.$$l_u.set(f,d)}this.$$l={}}}attributeChangedCallback(t,e,n){this.$$r||(t=this.$$g_p(t),this.$$d[t]=K(t,n,this.$$p_d,"toProp"),this.$$c?.$set({[t]:this.$$d[t]}))}disconnectedCallback(){this.$$cn=!1,Promise.resolve().then((()=>{this.$$cn||(this.$$c.$destroy(),this.$$c=void 0)}))}$$g_p(t){return Object.keys(this.$$p_d).find((e=>this.$$p_d[e].attribute===t||!this.$$p_d[e].attribute&&e.toLowerCase()===t))||t}});class Q{$$=void 0;$$set=void 0;$destroy(){Y(this,1),this.$destroy=$}$on(t,e){if(!v(e))return $;const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function V(t,e,n){const o=t.slice();return o[3]=e[n],o[5]=n,o}function X(t){let e,n,o,r=t[3]+"";return{c(){e=c("div"),n=u(r),o=f(),h(e,"class","chip svelte-1yf02uk"),p(e,"background-color",t[1][t[5]%t[1].length])},m(t,r){i(t,e,r),s(e,n),s(e,o)},p(t,e){1&e&&r!==(r=t[3]+"")&&d(n,r)},d(t){t&&a(e)}}}function tt(t){let e,n,o=J(t[0]),r=[];for(let e=0;e<o.length;e+=1)r[e]=X(V(t,o,e));return{c(){e=c("div");for(let t=0;t<r.length;t+=1)r[t].c();h(e,"class",n="root "+t[2].class+" svelte-1yf02uk")},m(t,n){i(t,e,n);for(let t=0;t<r.length;t+=1)r[t]&&r[t].m(e,null)},p(t,[s]){if(3&s){let n;for(o=J(t[0]),n=0;n<o.length;n+=1){const i=V(t,o,n);r[n]?r[n].p(i,s):(r[n]=X(i),r[n].c(),r[n].m(e,null))}for(;n<r.length;n+=1)r[n].d(1);r.length=o.length}4&s&&n!==(n="root "+t[2].class+" svelte-1yf02uk")&&h(e,"class",n)},i:$,o:$,d(t){t&&a(e),function(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}(r,t)}}}function et(t,e,n){let{texts:o=[]}=e;return t.$$set=t=>{n(2,e=m(m({},e),w(t))),"texts"in t&&n(0,o=t.texts)},e=w(e),[o,["#007bff","#28a745","#dc3545","#ffc107","#17a2b8"],e]}"undefined"!=typeof window&&(window.__svelte||(window.__svelte={v:new Set})).v.add("4");const nt=class extends Q{constructor(t){super(),G(this,t,et,tt,b,{texts:0})}};function ot(t){let e,n,o,r,l,$,m,g,_,y,v,b,w,x,T,E,k,O,z,I=`url('${t[6]}')`;return E=new nt({props:{class:"chips",texts:t[5]}}),{c(){e=c("div"),n=c("div"),o=c("div"),r=u(t[1]),l=f(),$=c("div"),m=c("div"),g=u(t[2]),_=f(),y=c("div"),v=u(t[3]),b=f(),w=c("div"),x=u(t[4]),T=f(),U(E.$$.fragment),h(o,"class","image-text svelte-1hzzz2e"),h(n,"class","image svelte-1hzzz2e"),p(n,"background-image",I),h(m,"class","info-text svelte-1hzzz2e"),h(y,"class","title svelte-1hzzz2e"),h(w,"class","subtitle svelte-1hzzz2e"),h($,"class","bottom svelte-1hzzz2e"),h(e,"class",k="root "+t[7].class+" svelte-1hzzz2e"),h(e,"style",O=t[7].style),h(e,"data-testid",t[0])},m(t,a){i(t,e,a),s(e,n),s(n,o),s(o,r),s(e,l),s(e,$),s($,m),s(m,g),s($,_),s($,y),s(y,v),s($,b),s($,w),s(w,x),s($,T),Z(E,$,null),z=!0},p(t,[o]){(!z||2&o)&&d(r,t[1]),64&o&&I!==(I=`url('${t[6]}')`)&&p(n,"background-image",I),(!z||4&o)&&d(g,t[2]),(!z||8&o)&&d(v,t[3]),(!z||16&o)&&d(x,t[4]);const s={};32&o&&(s.texts=t[5]),E.$set(s),(!z||128&o&&k!==(k="root "+t[7].class+" svelte-1hzzz2e"))&&h(e,"class",k),(!z||128&o&&O!==(O=t[7].style))&&h(e,"style",O),(!z||1&o)&&h(e,"data-testid",t[0])},i(t){z||(W(E.$$.fragment,t),z=!0)},o(t){q(E.$$.fragment,t),z=!1},d(t){t&&a(e),Y(E)}}}function rt(t,e,n){let{testId:o}=e,{image:r}=e,{topImageText:s=""}=e,{infoText:i=""}=e,{title:a=""}=e,{subtitle:c=""}=e,{chips:l=[]}=e,u="https://placehold.co/300x250?text=coffee&font=roboto";const f=new FileReader;var h;return f.onloadend=()=>n(6,u=f.result),h=async()=>{try{const t=await fetch(r),e=await t.blob();f.readAsDataURL(e)}catch(t){}},T().$$.on_mount.push(h),T().$$.on_destroy.push((()=>{f.onloadend=void 0})),t.$$set=t=>{n(7,e=m(m({},e),w(t))),"testId"in t&&n(0,o=t.testId),"image"in t&&n(8,r=t.image),"topImageText"in t&&n(1,s=t.topImageText),"infoText"in t&&n(2,i=t.infoText),"title"in t&&n(3,a=t.title),"subtitle"in t&&n(4,c=t.subtitle),"chips"in t&&n(5,l=t.chips)},e=w(e),[o,s,i,a,c,l,u,e,r]}const st=class extends Q{constructor(t){super(),G(this,t,rt,ot,b,{testId:0,image:8,topImageText:1,infoText:2,title:3,subtitle:4,chips:5})}};function it(t){let e,n,o,r;return{c(){e=c("button"),h(e,"class",n="root "+t[2].class+" svelte-j56bud"),e.disabled=t[1],h(e,"data-testid",t[0])},m(n,s){var a,c,l,u;i(n,e,s),o||(a=e,c="click",l=t[3],a.addEventListener(c,l,u),r=()=>a.removeEventListener(c,l,u),o=!0)},p(t,[o]){4&o&&n!==(n="root "+t[2].class+" svelte-j56bud")&&h(e,"class",n),2&o&&(e.disabled=t[1]),1&o&&h(e,"data-testid",t[0])},i:$,o:$,d(t){t&&a(e),o=!1,r()}}}function at(t,e,n){let{testId:o}=e,{disabled:r=!1}=e;return t.$$set=t=>{n(2,e=m(m({},e),w(t))),"testId"in t&&n(0,o=t.testId),"disabled"in t&&n(1,r=t.disabled)},e=w(e),[o,r,e,function(e){E.call(this,t,e)}]}const ct=class extends Q{constructor(t){super(),G(this,t,at,it,b,{testId:0,disabled:1})}};function lt(t){let e,n,o,r;return{c(){e=l("svg"),n=l("path"),o=l("path"),h(n,"opacity",".2"),h(n,"fill-rule","evenodd"),h(n,"clip-rule","evenodd"),h(n,"d","M12 19a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm0 3c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z"),h(n,"fill","#000"),h(o,"d","M2 12C2 6.477 6.477 2 12 2v3a7 7 0 0 0-7 7H2Z"),h(o,"fill","#000"),h(e,"class",r="icon "+t[0].class+" svelte-4kn033"),h(e,"width","50"),h(e,"height","50"),h(e,"viewBox","0 0 24 24"),h(e,"fill","none"),h(e,"xmlns","http://www.w3.org/2000/svg")},m(t,r){i(t,e,r),s(e,n),s(e,o)},p(t,[n]){1&n&&r!==(r="icon "+t[0].class+" svelte-4kn033")&&h(e,"class",r)},i:$,o:$,d(t){t&&a(e)}}}function ut(t,e,n){return t.$$set=t=>{n(0,e=m(m({},e),w(t)))},[e=w(e)]}const ft=class extends Q{constructor(t){super(),G(this,t,ut,lt,b,{})}};var ht=n(837);const dt=new Set(["Failed to fetch","NetworkError when attempting to fetch resource.","The Internet connection appears to be offline.","Network request failed","fetch failed"]);class pt extends Error{constructor(t){super(),t instanceof Error?(this.originalError=t,({message:t}=t)):(this.originalError=new Error(t),this.originalError.stack=this.stack),this.name="AbortError",this.message=t}}const $t=t=>void 0===globalThis.DOMException?new Error(t):new DOMException(t);const mt=(...t)=>async function(t,e){return new Promise(((n,o)=>{e={onFailedAttempt(){},retries:10,...e};const r=ht.operation(e);r.attempt((async s=>{try{n(await t(s))}catch(t){if(!(t instanceof Error))return void o(new TypeError(`Non-error was thrown: "${t}". You should only throw errors.`));if(t instanceof pt)r.stop(),o(t.originalError);else if(t instanceof TypeError&&(i=t.message,!dt.has(i)))r.stop(),o(t);else{((t,e,n)=>{const o=n.retries-(e-1);t.attemptNumber=e,t.retriesLeft=o})(t,s,e);try{await e.onFailedAttempt(t)}catch(t){return void o(t)}r.retry(t)||o(r.mainError())}}var i})),e.signal&&!e.signal.aborted&&e.signal.addEventListener("abort",(()=>{r.stop();const t=void 0===e.signal.reason?$t("The operation was aborted."):e.signal.reason;o(t instanceof Error?t:$t(t))}),{once:!0})}))}((()=>(async(...t)=>{const e=await fetch(...t);if(!e.status.toString().startsWith("2"))throw new pt(e.statusText);return e})(...t)),{retries:3});function gt(t,e,n){const o=t.slice();return o[6]=e[n],o[8]=n,o}function _t(t,e){let n,o,r;return o=new st({props:{class:"app__card",style:"--card-index: "+e[8],testId:"card-"+e[8],image:"https://loremflickr.com/300/250/coffee",topImageText:e[6].intensifier,infoText:e[6].origin,title:e[6].blend_name,subtitle:e[6].variety,chips:e[6].notes}}),{key:t,first:null,c(){n=u(""),U(o.$$.fragment),this.first=n},m(t,e){i(t,n,e),Z(o,t,e),r=!0},p(t,n){e=t;const r={};2&n&&(r.style="--card-index: "+e[8]),2&n&&(r.testId="card-"+e[8]),2&n&&(r.topImageText=e[6].intensifier),2&n&&(r.infoText=e[6].origin),2&n&&(r.title=e[6].blend_name),2&n&&(r.subtitle=e[6].variety),2&n&&(r.chips=e[6].notes),o.$set(r)},i(t){r||(W(o.$$.fragment,t),r=!0)},o(t){q(o.$$.fragment,t),r=!1},d(t){t&&a(n),Y(o,t)}}}function yt(t){let e,n;return e=new ft({props:{class:"app__spinner",style:"--position: "+(t[1].length+1)}}),{c(){U(e.$$.fragment)},m(t,o){Z(e,t,o),n=!0},p(t,n){const o={};2&n&&(o.style="--position: "+(t[1].length+1)),e.$set(o)},i(t){n||(W(e.$$.fragment,t),n=!0)},o(t){q(e.$$.fragment,t),n=!1},d(t){Y(e,t)}}}function vt(t){let e,n,o,r,l,u=[],d=new Map,$=J(t[1]);const m=t=>t[6].id;for(let e=0;e<$.length;e+=1){let n=gt(t,$,e),o=m(n);d.set(o,u[e]=_t(o,n))}let g=t[0]&&yt(t);return r=new ct({props:{class:"app__add-button",testId:"add-button",disabled:t[0]}}),r.$on("click",t[2]),{c(){e=c("div");for(let t=0;t<u.length;t+=1)u[t].c();n=f(),g&&g.c(),o=f(),U(r.$$.fragment),h(e,"class","root svelte-xva9hd"),p(e,"--cards-count",t[1].length)},m(t,a){i(t,e,a);for(let t=0;t<u.length;t+=1)u[t]&&u[t].m(e,null);s(e,n),g&&g.m(e,null),s(e,o),Z(r,e,null),l=!0},p(t,[s]){2&s&&($=J(t[1]),D(),u=function(t,e,n,o,r,s,i,a,c,l,u,f){let h=t.length,d=s.length,p=h;const $={};for(;p--;)$[t[p].key]=p;const m=[],g=new Map,_=new Map,v=[];for(p=d;p--;){const t=f(r,s,p),o=n(t);let a=i.get(o);a?v.push((()=>a.p(t,e))):(a=l(o,t),a.c()),g.set(o,m[p]=a),o in $&&_.set(o,Math.abs(p-$[o]))}const b=new Set,w=new Set;function x(t){W(t,1),t.m(a,u),i.set(t.key,t),u=t.first,d--}for(;h&&d;){const e=m[d-1],n=t[h-1],o=e.key,r=n.key;e===n?(u=e.first,h--,d--):g.has(r)?!i.has(o)||b.has(o)?x(e):w.has(r)?h--:_.get(o)>_.get(r)?(w.add(o),x(e)):(b.add(r),h--):(c(n,i),h--)}for(;h--;){const e=t[h];g.has(e.key)||c(e,i)}for(;d;)x(m[d-1]);return y(v),m}(u,s,m,0,t,$,d,e,H,_t,n,gt),F()),t[0]?g?(g.p(t,s),1&s&&W(g,1)):(g=yt(t),g.c(),W(g,1),g.m(e,o)):g&&(D(),q(g,1,1,(()=>{g=null})),F());const i={};1&s&&(i.disabled=t[0]),r.$set(i),(!l||2&s)&&p(e,"--cards-count",t[1].length)},i(t){if(!l){for(let t=0;t<$.length;t+=1)W(u[t]);W(g),W(r.$$.fragment,t),l=!0}},o(t){for(let t=0;t<u.length;t+=1)q(u[t]);q(g),q(r.$$.fragment,t),l=!1},d(t){t&&a(e);for(let t=0;t<u.length;t+=1)u[t].d();g&&g.d(),Y(r)}}}function bt(t,e,n){let o,r=!1,s=[];async function i(t){if(!r){n(0,r=!0),clearTimeout(o);try{const t=await async function(){const t=await mt("https://random-data-api.com/api/coffee/random_coffee"),e=await t.json(),{notes:n}=e,o=function(t,e){var n={};for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&e.indexOf(o)<0&&(n[o]=t[o]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols){var r=0;for(o=Object.getOwnPropertySymbols(t);r<o.length;r++)e.indexOf(o[r])<0&&Object.prototype.propertyIsEnumerable.call(t,o[r])&&(n[o[r]]=t[o[r]])}return n}(e,["notes"]);return Object.assign({notes:n.split(", ")},o)}();n(1,s=[...s,t])}catch(e){console.error(e),t&&alert(t)}finally{n(0,r=!1),o=setTimeout((()=>i()),window.app.autoLoadInterval)}}}return window.app={autoLoadInterval:3e4,setAutoLoadInterval(t){window.app.autoLoadInterval=t}},i("There is an error, please, reload the page"),[r,s,function(){i("There is an error, please, try again")}]}new class extends Q{constructor(t){super(),G(this,t,bt,vt,b,{})}}({target:document.getElementById("root")})})()})();