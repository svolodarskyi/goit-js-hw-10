import"./assets/modulepreload-polyfill-B5Qt9EMX.js";/* empty css                      */import{f,i as T}from"./assets/vendor-BbbuE1sJ.js";const n=document.querySelector("input#datetime-picker"),o=document.querySelector("button[data-start]"),p=document.querySelector("[data-days]"),v=document.querySelector("[data-hours]"),y=document.querySelector("[data-minutes]"),k=document.querySelector("[data-seconds]");o.addEventListener("click",g);function r(...e){e.forEach(t=>t.classList.add("disabled"))}function c(...e){e.forEach(t=>t.classList.remove("disabled"))}function a(e){return new Date(e).getTime()}function I(e){const t=Date.now();return e-t}function S(e){return Date.now()<e}function u(e=a(n.value)){return S(e)?(c(o),!0):(r(o),T.warning({message:"Please choose a date in the future",position:"topRight"}),!1)}const b={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(e){const t=a(e[0]);u(t)}};function D({days:e,hours:t,minutes:i,seconds:s}){p.textContent=e,v.textContent=t,y.textContent=i,k.textContent=s}class M{constructor({onTick:t,startTime:i}){this.onTick=t,this.startTime=i,this.intervalId=null,this.timerInitTime=null,this.init()}init(){this.timerInitTime=I(this.startTime),this.onTick(this.convertMs(this.timerInitTime))}start(){r(n,o);let t=0;this.intervalId=setInterval(()=>{t+=1e3,t<=this.timerInitTime?this.onTick(this.convertMs(this.timerInitTime-t)):(clearInterval(this.intervalId),c(n))},1e3)}convertMs(t){const d=this.pad(Math.floor(t/864e5)),m=this.pad(Math.floor(t%864e5/36e5)),l=this.pad(Math.floor(t%864e5%36e5/6e4)),h=this.pad(Math.floor(t%864e5%36e5%6e4/1e3));return{days:d,hours:m,minutes:l,seconds:h}}pad(t){return String(t).padStart(2,"0")}}function g(e){u()&&new M({onTick:D,startTime:a(n.value)}).start()}f(n,b);
//# sourceMappingURL=1-timer.js.map