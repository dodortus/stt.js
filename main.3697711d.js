parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"yCDU":[function(require,module,exports) {

},{}],"Sn5z":[function(require,module,exports) {
"use strict";function e(e){return{all:e=e||new Map,on:function(t,n){var i=e.get(t);i&&i.push(n)||e.set(t,[n])},off:function(t,n){var i=e.get(t);i&&i.splice(i.indexOf(n)>>>0,1)},emit:function(t,n){(e.get(t)||[]).slice().map(function(e){e(n)}),(e.get("*")||[]).slice().map(function(e){e(t,n)})}}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=e;
},{}],"ObAN":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.isSupportedBrowser=void 0;var e=function(){return"function"==typeof window.webkitSpeechRecognition};exports.isSupportedBrowser=e();
},{}],"Bzn5":[function(require,module,exports) {
"use strict";var t=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(exports,"__esModule",{value:!0});var i=t(require("mitt")),n=require("./env"),o=window.webkitSpeechRecognition,r=new o,e=i.default(),s=function(){function t(t){var i=this,o=t.lang,s=void 0===o?navigator.language:o,u=t.continuous,c=void 0!==u&&u,a=t.interimResults,l=void 0!==a&&a;this.isRecognizing=!1,this.finalTranscript="",this.start=function(){n.isSupportedBrowser?i.isRecognizing?i.stop():(i.finalTranscript="",i.recognition.start()):e.emit("error","not-supported-browser")},this.stop=function(){i.recognition.stop()},this.onStart=function(){i.isRecognizing=!0,e.emit("start")},this.onEnd=function(){i.isRecognizing=!1,e.emit("end")},this.onResult=function(t){var n="";if(void 0===t.results)return r.onend=null,r.stop(),!1;for(var o=t.resultIndex;o<t.results.length;++o){var s=t.results[o][0].transcript;t.results[o].isFinal?(i.finalTranscript+=s,console.log("isFinal :>> ",s,t.results)):n+=s}e.emit("result",{finalTranscript:i.finalTranscript,interimTranscript:n,results:t.results})},this.onError=function(t){i.isRecognizing=!1,e.emit("error",t.error)},this.getIsRecognizing=function(){return i.isRecognizing},this.recognition=r,this.recognition.lang=s,this.recognition.continuous=c,this.recognition.interimResults=l,this.recognition.onstart=this.onStart,this.recognition.onend=this.onEnd,this.recognition.onresult=this.onResult,this.recognition.onerror=this.onError}return t.prototype.on=function(t,i){e.on(t,i)},t.prototype.off=function(t,i){e.off(t,i)},t}();exports.default=s;
},{"mitt":"Sn5z","./env":"ObAN"}],"epB2":[function(require,module,exports) {
"use strict";require("./main.scss");var e=t(require("../dist"));function t(e){return e&&e.__esModule?e:{default:e}}var n=new e.default({continuous:!0,interimResults:!0}),o="입력된 내용이 없습니다.",s=document.querySelector("#result"),i=document.querySelector("#final-text"),r=document.querySelector("#interim-text"),c=document.querySelector("#btn-mic"),l=document.querySelector("#btn-tts"),d=document.querySelector("#icon-music"),a=document.querySelector("#audio"),u=document.querySelector("#commands"),h=document.querySelector("#btn-commands-opener");function f(){n.on("start",function(){console.log("start :>> "),c.classList.replace("off","on"),i.innerHTML="",r.innerHTML=""}),n.on("end",function(){console.log("end :>> "),c.classList.replace("on","off")}),n.on("result",function(e){var t=e.finalTranscript,n=e.interimTranscript;console.log("result :>> ",t,n),i.innerHTML=t,r.innerHTML=n,y(n)}),n.on("error",function(e){switch(console.log("error :>> ",e),c.classList.replace("on","off"),e){case"not-allowed":alert("마이크 권한이 필요합니다.");break;default:alert(e)}})}function m(){c.addEventListener("click",function(){n[n.getIsRecognizing()?"stop":"start"]()}),l.addEventListener("click",function(){W(i.innerText||o)}),h.addEventListener("click",function(){h.classList.contains("active")?(h.classList.remove("active"),u.classList.remove("active")):(h.classList.add("active"),u.classList.add("active"))})}function y(e){e.endsWith("레드")?s.style.backgroundColor="red":e.endsWith("블루")?s.style.backgroundColor="blue":e.endsWith("그린")?s.style.backgroundColor="green":e.endsWith("옐로우")?s.style.backgroundColor="yellow":e.endsWith("오렌지")?s.style.backgroundColor="orange":e.endsWith("그레이")?s.style.backgroundColor="grey":e.endsWith("골드")?s.style.backgroundColor="gold":e.endsWith("화이트")?s.style.backgroundColor="white":e.endsWith("블랙")?(s.style.backgroundColor="black",s.style.color="white"):e.endsWith("알람")||e.endsWith("알 람")?alert("알람"):e.endsWith("노래 켜")||e.endsWith("음악 켜")?(a.play(),d.classList.add("visible")):e.endsWith("노래 꺼")||e.endsWith("음악 꺼")?(a.pause(),d.classList.remove("visible")):e.endsWith("볼륨 업")||e.endsWith("볼륨업")?a.volume+=.2:e.endsWith("볼륨 다운")||e.endsWith("볼륨다운")?a.volume-=.2:(e.endsWith("스피치")||e.endsWith("말해줘")||e.endsWith("말 해 줘"))&&W(i.innerHTML||o)}function W(e){console.log("textToSpeech",arguments),window.speechSynthesis.speak(new SpeechSynthesisUtterance(e))}function g(){m(),f()}g();
},{"./main.scss":"yCDU","../dist":"Bzn5"}]},{},["epB2"], null)