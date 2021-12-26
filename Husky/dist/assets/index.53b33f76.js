var A=Object.defineProperty;var f=Object.getOwnPropertySymbols;var y=Object.prototype.hasOwnProperty,D=Object.prototype.propertyIsEnumerable;var E=(n,e,t)=>e in n?A(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t,w=(n,e)=>{for(var t in e||(e={}))y.call(e,t)&&E(n,t,e[t]);if(f)for(var t of f(e))D.call(e,t)&&E(n,t,e[t]);return n};var P=(n,e)=>{var t={};for(var a in n)y.call(n,a)&&e.indexOf(a)<0&&(t[a]=n[a]);if(n!=null&&f)for(var a of f(n))e.indexOf(a)<0&&D.call(n,a)&&(t[a]=n[a]);return t};var N=(n,e,t)=>(E(n,typeof e!="symbol"?e+"":e,t),t);const C=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function t(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerpolicy&&(o.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?o.credentials="include":r.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(r){if(r.ep)return;r.ep=!0;const o=t(r);fetch(r.href,o)}};C();const h={token:"CWB-34AC2BFB-2272-41E3-84FE-AAF40C0C42AA",host:"https://opendata.cwb.gov.tw",datastore:{weather:{apiPath:"api/v1/rest/datastore/O-A0003-001",elementName:["TIME","ELEV","WDIR","WDSD","TEMP","HUMD","PRES","24R","H_FX","H_XD","H_FXT","H_F10","H_10D","H_F10T","H_UVI","D_TX","D_TXT","D_TN","D_TNT","D_TS","VIS","Weather"],noData:-99},precipitation:{apiPath:"api/v1/rest/datastore/O-A0002-001",elementName:["ELEV","RAIN","MIN_10","HOUR_3","HOUR_6","HOUR_12","HOUR_24","NOW"],noData:-999},forecast:{apiPath:"api/v1/rest/datastore/F-D0047-089",elementName:["Wx","PoP12h","AT","T","RH","CI","WeatherDescription","PoP6h","WS","WD","Td"]}}};class F{async fetch(e,t){const a=new URLSearchParams(t);return await(await fetch(`${this.host}/${e}?${a.toString()}`)).json()}}const S=n=>{const r=n,{time:e,weatherElement:t}=r,a=P(r,["time","weatherElement"]);return a.weather=t.reduce((o,c)=>(o[c.elementName]=Number(c.elementValue),o),{}),a.parameter=a.parameter.reduce((o,c)=>(o[c.parameterName]=c.parameterValue,o),{}),a.obsTime=e.obsTime,a.lat=Number(a.lat),a.lon=Number(a.lon),a},O=n=>n.records.location.map(S),H=(n,e)=>n.records.locations[0].location.find(t=>t.locationName===e).weatherElement;class m extends F{constructor(){super()}get token(){return h.token}get host(){return h.host}static datastoreParameter(e){const{apiPath:t,elementName:a}=h.datastore[e];return{apiPath:t,elementName:a}}async getCurrent(e=[],t="weather"){const{apiPath:a,elementName:r}=m.datastoreParameter(t),c={elementName:r.filter(s=>e.includes(s)).join(","),parameterName:"CITY,TOWN",Authorization:this.token},l=await this.fetch(a,c);return O(l)}async getForecast(e=[],t="\u81FA\u5317\u5E02"){const a="forecast",{apiPath:r,elementName:o}=m.datastoreParameter(a),l={elementName:o.filter(i=>e.includes(i)).join(","),locationName:t,Authorization:this.token},s=await this.fetch(r,l);return H(s,t)}}const T=class{static chain(e){return T.queue=T.queue.then(e)}};let b=T;N(b,"queue",Promise.resolve());const u={min:n=>(e,t)=>n(t)<n(e)?t:e,max:n=>(e,t)=>n(t)<n(e)?e:t,bottom:n=>(e,t)=>n(e)<n(t)?-1:1,top:n=>(e,t)=>n(e)<n(t)?1:-1};class d extends b{constructor(e,t){super();N(this,"answer",null);if(e==null)throw"no title";this.title=e,this.calcFn=t}static createSection(e,t){const a=document.createElement("section");a.classList.add("bg-white","text-black","text-opacity-70","rounded-2xl","shadow-xl","p-8");const r=document.createElement("h6");if(r.classList.add("text-md","font-black"),r.innerHTML=e.trim(),a.appendChild(r),t){const o=document.createElement("textarea");o.disabled=!0,o.classList.add("w-full","p-4","text-black","text-opacity-70","text-sm"),o.value=t,o.rows=t.split(`
`).length,a.appendChild(o)}return a}getAnswer(e){return d.chain(async()=>{this.answer=await this.calcFn(e)}),this}output(e){return d.chain(async()=>{if(this.answer==null)throw"no answer";const t=JSON.stringify(this.answer,null,"    "),a=d.createSection(this.title),r=d.createSection("Answer\uFF1A",t),o=document.createElement("div");o.classList.add("space-y-6"),o.appendChild(a),o.appendChild(r),e.appendChild(o)}),this}}const{datastore:{weather:{noData:L}}}=h,M=new m,R="\u7B2C\u4E00\u984C\uFF1A\u627E\u5230\u5168\u53F0\u7576\u4E0B\u6700\u4F4E\u6EAB\u7684\u9EDE\uFF0C\u4E26\u5217\u51FA \u7E23\u5E02 \u884C\u653F\u5340 \u6E2C\u7AD9\u540D\u7A31 \u6EAB\u5EA6 \u5EA7\u6A19",v=async(n={field:"TEMP",calc:"min"})=>{const{field:e,calc:t}=n,a=o=>o.weather[e];return(await M.getCurrent([e],"weather")).filter(o=>a(o)!==L).reduce(u[t](a))},I=new d(R,v),{datastore:{weather:{noData:k}}}=h,x="ELEV",_=new m,$=n=>("0000"+n).slice(-4),q=n=>Object.entries(n).map(([e,t])=>({elevationRange:e,site:t})).sort(u.bottom(e=>e.elevRange)),W="\u7B2C\u4E8C\u984C\uFF1A\u540C\u4E0A\uFF0C\u91DD\u5C0D\u4E0D\u540C\u6D77\u62D4\u9AD8\u5EA6\u627E\u51FA\u6700\u4F4E\u6EAB\u6E2C\u7AD9\uFF0C\u6BCF500m\u4E00\u7D44\uFF0C\u4E26\u56DE\u50B3object",U=async(n={field:"TEMP",calc:"min",step:500})=>{const{field:e,calc:t,step:a}=n,r=s=>s.weather[e],o=s=>{const i=Math.floor(s.weather[x]/a)*a;return`${$(i)}-${$(i+a-1)}`},l=(await _.getCurrent([e,x],"weather")).filter(s=>r(s)!==k).reduce((s,i)=>{const p=o(i);return s[p]?s[p]=u[t](r)(s[p],i):s[p]=i,s},{});return q(l)},V=new d(W,U),{datastore:{precipitation:{noData:j}}}=h,B=new m,X="\u7B2C\u4E09\u984C\uFF1A\u8FD124\u5C0F\u6642\u964D\u96E8\u91CF\u524D20\u540D\u662F\u54EA\u4E9B\uFF1F\u5206\u5225\u7D71\u8A08\u6574\u7406\u5217\u5728\u54EA\u4E9B\u7E23\u5E02\uFF1F",Y=async(n={field:"HOUR_24",calc:"top",rank:20})=>{const{field:e,calc:t,rank:a}=n,r=s=>s.weather[e],c=(await B.getCurrent([e],"precipitation")).filter(s=>r(s)!==j).sort(u[t](r)).slice(0,a),l=c.reduce((s,i)=>(s[i.parameter.CITY]===void 0&&(s[i.parameter.CITY]=0),s[i.parameter.CITY]+=1,s),{});return{top:c,stat:l}},z=new d(X,Y),J=n=>n.map(e=>e.time.map(t=>({dataTime:t.dataTime,weather:t.elementValue.reduce((a,r)=>(a[e.elementName]=Number(r.value),a),{})}))).reduce((e,t)=>(e.forEach((a,r)=>{a.weather=w(w({},a.weather),t[r].weather)}),e)),K=(n,e)=>Object.entries(n.reduce((t,a)=>{const r=a.dataTime.slice(0,10);return t[r]===void 0&&(t[r]=[]),t[r].push(e(a)),t},{})).sort(u.bottom(t=>t[0])),Z=n=>{n=n.sort();const e=n.slice(-1)[0],t=n.slice(0)[0];return{range:`${t}~${e}`,diff:e-t}},G="\u7B2C\u56DB\u984C\uFF1A\u81EA\u5DF1\u6240\u5728\u7684\u7E23\u5E02\uFF0C\u672A\u4F86\u5169\u5929\u7684\u6700\u4F4E\u6EAB\u8207\u6700\u9AD8\u6EAB\u5206\u5225\u70BA\u591A\u5C11\uFF1F\u4E14\u6700\u5927\u55AE\u65E5\u6EAB\u5DEE\u70BA\u591A\u5C11\uFF1F",Q=async(n={field:"T",locationName:"\u81FA\u5317\u5E02"})=>{const{field:e,locationName:t}=n;let r=await new m().getForecast([e],t);r=J(r);const o=c=>c.weather[e];return{min:r.reduce(u.min(o)),max:r.reduce(u.max(o)),maxDiff:K(r,o).map(([c,l])=>w({date:c},Z(l))).reduce(u.max(c=>c.diff))}},ee=new d(G,Q),g=document.getElementById("app");I.getAnswer({field:"TEMP",calc:"min"}).output(g);V.getAnswer({field:"TEMP",calc:"min",step:500}).output(g);z.getAnswer({field:"HOUR_24",calc:"top",rank:20}).output(g);ee.getAnswer({field:"T",locationName:"\u81FA\u5317\u5E02"}).output(g);
