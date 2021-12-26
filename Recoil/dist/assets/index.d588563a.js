var P=Object.defineProperty,j=Object.defineProperties;var V=Object.getOwnPropertyDescriptors;var w=Object.getOwnPropertySymbols;var k=Object.prototype.hasOwnProperty,L=Object.prototype.propertyIsEnumerable;var C=(t,e,u)=>e in t?P(t,e,{enumerable:!0,configurable:!0,writable:!0,value:u}):t[e]=u,o=(t,e)=>{for(var u in e||(e={}))k.call(e,u)&&C(t,u,e[u]);if(w)for(var u of w(e))L.call(e,u)&&C(t,u,e[u]);return t},h=(t,e)=>j(t,V(e));import{j as F,c as b,r as p,R as I,a as M}from"./vendor.2c825550.js";const R=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function u(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerpolicy&&(i.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?i.credentials="include":r.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(r){if(r.ep)return;r.ep=!0;const i=u(r);fetch(r.href,i)}};R();const s=F.exports.jsx,l=F.exports.jsxs,E=F.exports.Fragment;function D({title:t,children:e}){return l("section",{className:"bg-white text-black text-opacity-70 rounded-2xl shadow-xl p-8",children:[s("h6",{className:"text-md font-black",children:t}),e]})}function S({title:t,children:e}){return s(D,{title:t,children:e})}function _({title:t="Answer:",className:e,children:u}){return s(D,{title:t,children:s("div",{className:"w-full p-4 text-black bg-slate-100 rounded-md outline-none my-2 text-opacity-70 text-sm  h-fit",children:s("div",{className:b("w-full h-full bg-cover rounded-md",e),children:s("div",{className:"rounded-md overflow-hidden filter backdrop-blur-sm flex flex-col gap-y-2 px-4 py-2 text-slate-200 bg-slate-600 bg-opacity-40",children:u})})})})}var d={Question:S,Answer:_};const Q="CWB-E8AC8336-9346-4D8A-A2D4-EB1934B7C25D";function $(t,e){if(!e)throw Error("Please type token of CWB");return async function(u,n){const r=new URLSearchParams(o({Authorization:e},n));return fetch(t+u+`?${r}`).then(i=>i.json())}}const y=$("https://opendata.cwb.gov.tw/api",Q),x=(...t)=>e=>t.reduce((u,n)=>n(u),e),f=t=>e=>e.reduce(t),W=(t,e)=>u=>u.sort(e).slice(0,t),T=(t,e)=>{if(t!==null){const u=e.weather.TEMP,n=t.weather.TEMP;return Number(u)<Number(n)?e:t}return e};class U{constructor({locationName:e,lat:u,lon:n,weatherElement:r,time:i,parameter:a}){this.name=e,this.geoLocation={lat:u,lon:n},this.district=a.reduce((c,m)=>h(o({},c),{[m.parameterName]:["TOWN_SN","CITY_SN"].includes(m.parameterName)?Number(m.parameterValue):m.parameterValue}),{}),this.weather=r.reduce((c,m)=>h(o({},c),{[m.elementName]:Number(m.elementValue)}),{}),this.time=i}}class q{constructor({locationName:e,lat:u,lon:n,weatherElement:r,time:i}){this.name=e,this.geoLocation={lat:u,lon:n},this.weather=r.reduce((a,c)=>h(o({},a),{[c.elementName]:{description:c.description,time:c.time}}),{}),this.time=i}}const H={noData:-99},B=t=>e=>e.map(u=>new t(u)),O=t=>t.filter(e=>e.weather.TEMP!==H.noData);function A(t,e){const[u,n]=p.exports.useState(null);return p.exports.useEffect(()=>{y(t,e).then(r=>r.records.location).then(B(U)).then(O).then(n)},[]),u}function Y(t,e){const[u,n]=p.exports.useState(null);return p.exports.useEffect(()=>{y(t,e).then(r=>r.records.locations[0].location).then(B(q)).then(O).then(n)},[]),u}function N({title:t,children:e}){return l("fieldset",{className:"border rounded-md px-4 py-2",children:[s("legend",{className:b("text-lg font-bold",{"px-2":t}),children:t}),e]})}function g({title:t,temp:e,time:u}){return s(N,{title:t,children:l("div",{className:"flex items-end",children:[l("section",{children:[s("span",{className:"text-2xl font-bold",children:e}),s("span",{className:"text-sm",children:"\xB0C"})]}),s("span",{className:"ml-auto",children:u})]})})}function v({type:t,name:e,district:u,elevation:n,temp:r,time:i}){return s(N,{title:t,children:l("div",{className:"flex flex-col",children:[l("div",{children:[s("span",{className:"text-lg font-bold font-lg",children:e}),l("span",{className:"text-sm font-bold font-lg ml-2",children:[n,"\u516C\u5C3A"]})]}),l("section",{className:"flex flex-row",children:[l("div",{children:[l("div",{className:"text-sm",children:[" ",u]}),l("div",{children:["\u6642\u9593: ",i]})]}),l("div",{className:"text-4xl ml-auto",children:[s("span",{children:r}),s("span",{className:"text-lg",children:"\xB0C"})]})]})]})})}function J(){const t=A("/v1/rest/datastore/O-A0001-001",{elementName:["TEMP","ELEV"]});if(!t)return s("div",{children:"loading"});const e=f(T),{name:u,district:n,weather:r,time:i}=e(t);return l(E,{children:[l(d.Question,{title:"\u984C\u76EE\u4E00:",children:["\u627E\u5230\u5168\u53F0\u7576\u4E0B\u6700\u4F4E\u6EAB\u7684\u9EDE\uFF0C\u4E26\u5217\u51FA",s("span",{className:"bg-blue-900 text-white",children:"\u7E23\u5E02"}),s("span",{className:"bg-blue-900 text-white",children:"\u884C\u653F\u5340"}),s("span",{className:"bg-blue-900 text-white",children:"\u6E2C\u7AD9\u540D\u7A31"}),s("span",{className:"bg-blue-900 text-white",children:"\u6EAB\u5EA6"}),s("span",{className:"bg-blue-900 text-white",children:"\u5EA7\u6A19"}),s("small",{className:"block",children:"(\u900F\u904E\u4E2D\u592E\u6C23\u8C61\u5C40\uFF21\uFF30\uFF29\u53D6\u5F97\u5168\u53F0\u6E2C\u7AD9\u5373\u6642\u8CC7\u6599)"}),s("small",{className:"block",children:"(API: v1/rest/datastore/O-A0001-001)"})]}),s(d.Answer,{title:"\u7576\u4E0B\u6700\u4F4E\u6EAB\u7684\u9EDE",className:"bg-[url('/src/assets/images/bg_snow.jpg')]",children:s(v,{name:u,elevation:r.ELEV,district:`${n.CITY} ${n.TOWN}`,temp:r.TEMP,time:i.obsTime})})]})}const K=(t,e)=>{const u=Math.ceil(e.weather.ELEV/500)*500,n=`${u-500}-${u}`;return t.hasOwnProperty(n)?(t[n].push(e),t):h(o({},t),{[n]:[e]})},G=t=>e=>e.reduce(t,{}),X=t=>t.sort((e,u)=>e.weather.ELEV-u.weather.ELEV),Z=t=>Object.keys(t).reduce((e,u)=>h(o({},e),{[u]:f(T)(t[u])}),{});function z(){const t=A("/v1/rest/datastore/O-A0001-001",{elementName:["ELEV","TEMP"]});if(!t)return s("div",{children:"loading"});const e=x(X,G(K),Z)(t),u=Object.keys(e).map(n=>{const{name:r,district:i,weather:a,time:c}=e[n];return s("li",{children:s(v,{type:n,name:r,elevation:a.ELEV,district:`${i.CITY} ${i.TOWN}`,temp:a.TEMP,time:c.obsTime})},n)});return l(E,{children:[l(d.Question,{title:"\u984C\u76EE\u4E8C:",children:["\u540C\u4E0A\uFF0C\u91DD\u5C0D\u4E0D\u540C\u6D77\u62D4\u9AD8\u5EA6\u627E\u51FA\u6700\u4F4E\u6EAB\u6E2C\u7AD9\uFF0C\u6BCF",s("span",{className:"bg-blue-900 text-white",children:"500m"}),"\u4E00\u7D44\uFF0C\u4E26\u56DE\u50B3object",s("small",{className:"block",children:"(API: v1/rest/datastore/O-A0001-001)"})]}),s(d.Answer,{className:"bg-[url('/src/assets/images/bg_snow.jpg')]",children:s("ul",{children:u})})]})}const ee=W(20,(t,e)=>e.weather.HOUR_24-t.weather.HOUR_24),te=(t,e)=>{const u=e.district.CITY;return t.hasOwnProperty(u)?(t[u].push(e),t):o({[u]:[e]},t)};function ue({name:t,weather:e}){return s("li",{children:l("div",{className:"shadow-md rounded-md p-2 flex flex-col justify-center items-center bg-white bg-opacity-20",children:[s("h2",{className:"text-md font-bold px-2",children:t}),l("div",{className:"w-full flex justify-center items-end",children:[s("span",{className:"text-base font-bold",children:e.HOUR_24}),s("span",{className:"ml-1",children:"\u6BEB\u7C73"})]})]})},t)}function se({name:t,stations:e}){return s("li",{children:s(N,{title:t,children:s("ul",{className:"flex flex-row flex-wrap gap-x-2 gap-y-4",children:e.map(u=>s(ue,{name:u.name,weather:u.weather},u.name))})})})}const ne=t=>t.reduce(te,{});function re(){const t=A("/v1/rest/datastore/O-A0002-001",{elementName:["HOUR_24"]});if(!t)return s("div",{children:"loading"});const e=x(ee,ne)(t),u=Object.keys(e).map(n=>s(se,{name:n,stations:e[n]},n));return l(E,{children:[l(d.Question,{title:"\u984C\u76EE\u4E09:\u683C\u5F0F\u81EA\u5DF1\u5B9A\u8FA3\uFF0C\u6211\u61F6",children:["\u8FD1",s("span",{className:"bg-blue-900 text-white",children:"24\u5C0F\u6642"}),"\u964D\u96E8\u91CF",s("span",{className:"bg-blue-900 text-white",children:"\u524D20\u540D"}),"\u662F\u54EA\u4E9B\uFF1F",s("br",{}),"\u5206\u5225\u7D71\u8A08\u6574\u7406\u5217\u5728\u54EA\u4E9B",s("span",{className:"bg-blue-900 text-white",children:"\u7E23\u5E02"}),"\uFF1F",s("small",{className:"block",children:"HOUR_24\u6B04\u4F4D\u70BA\u8FD124\u5C0F\u6642\u7684\u7D2F\u7A4D\u964D\u96E8\u91CF"}),s("small",{className:"block",children:"(API: /v1/rest/datastore/O-A0002-001)"})]}),s(d.Answer,{title:"\u8FD124\u5C0F\u6642\u964D\u96E8\u91CF\u524D20\u540D:",className:"bg-[url('/src/assets/images/q3_bg.jpeg')]",children:s("ul",{children:u})})]})}const ie=t=>t.reduce((e,u)=>{const n=u.dataTime.substring(0,10),r=Number(u.elementValue[0].value);return e.hasOwnProperty(n)?(e[n].push(r),e):h(o({},e),{[n]:[r]})},{}),le=t=>t.map(([e,u])=>({date:e,diffTemp:Math.max(...u)-Math.min(...u)})),ae=t=>f((e,u)=>e.diffTemp<u.diffTemp?u:e)(t);function ce(){const t=Y("/v1/rest/datastore/F-D0047-089",{locationName:["\u57FA\u9686\u5E02"],elementName:["T"]});if(!t)return s("div",{children:"loading"});const e=t[0].weather.T.time,u=f((i,a)=>i.elementValue[0].value>a.elementValue[0].value?i:a)(e),n=f((i,a)=>i.elementValue[0].value<a.elementValue[0].value?i:a)(e),r=x(ie,Object.entries,le,ae)(e);return l(E,{children:[l(d.Question,{title:"\u984C\u76EE\u56DB:\u683C\u5F0F\u81EA\u5DF1\u5B9A\u8FA3\uFF0C\u6211\u61F6",children:["\u81EA\u5DF1\u6240\u5728\u7684\u7E23\u5E02\uFF0C\u672A\u4F86\u5169\u5929\u7684",s("span",{className:"bg-blue-900 text-white",children:"\u6700\u4F4E\u6EAB"}),"\u8207",s("span",{className:"bg-blue-900 text-white",children:"\u6700\u9AD8\u6EAB"}),"\u5206\u5225\u70BA\u591A\u5C11\uFF1F",s("br",{}),"\u4E14",s("span",{className:"bg-blue-900 text-white",children:"\u6700\u5927\u55AE\u65E5\u6EAB\u5DEE"}),"\u70BA\u591A\u5C11\uFF1F",s("small",{className:"block",children:"(API: /v1/rest/datastore/F-D0047-089)"})]}),l(d.Answer,{title:"\u672A\u4F86\u4E00\u9031\u7684\u6700\u4F4E\u6EAB\u8207\u6700\u9AD8\u6EAB:",className:"bg-[url('/src/assets/images/bg_snow.jpg')]",children:[s(g,{title:"\u6700\u4F4E\u6EAB",temp:n.elementValue[0].value,time:n.dataTime}),s(g,{title:"\u6700\u9AD8\u6EAB",temp:u.elementValue[0].value,time:u.dataTime}),s(g,{title:"\u55AE\u65E5\u6EAB\u5DEE\u6700\u5927",temp:r.diffTemp,time:r.date})]})]})}function oe(){return s("div",{className:"App",children:l("main",{className:b("flex flex-col","w-screen max-w-3xl","mx-auto my-16 space-y-6"),children:[s("h4",{className:"text-2xl font-black",children:"JS\u8B80\u66F8\u6703\u5F8C\u6E2C\u5566"}),s(J,{}),s(z,{}),s(re,{}),s(ce,{})]})})}I.render(s(M.StrictMode,{children:s(oe,{})}),document.getElementById("root"));
