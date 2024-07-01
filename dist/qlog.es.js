var t=1e3,e=6e4,r=36e5,n="millisecond",i="second",o="minute",s="hour",a="day",u="week",c="month",l="quarter",f="year",h="date",d="Invalid Date",v=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,$=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,p={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],r=t%100;return"["+t+(e[(r-20)%10]||e[r]||e[0])+"]"}},y=function(t,e,r){var n=String(t);return!n||n.length>=e?t:""+Array(e+1-n.length).join(r)+t},g={s:y,z:function(t){var e=-t.utcOffset(),r=Math.abs(e),n=Math.floor(r/60),i=r%60;return(e<=0?"+":"-")+y(n,2,"0")+":"+y(i,2,"0")},m:function t(e,r){if(e.date()<r.date())return-t(r,e);var n=12*(r.year()-e.year())+(r.month()-e.month()),i=e.clone().add(n,c),o=r-i<0,s=e.clone().add(n+(o?-1:1),c);return+(-(n+(r-i)/(o?i-s:s-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:c,y:f,w:u,d:a,D:h,h:s,m:o,s:i,ms:n,Q:l}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},m="en",b={};b[m]=p;var S="$isDayjsObject",M=function(t){return t instanceof O||!(!t||!t[S])},D=function t(e,r,n){var i;if(!e)return m;if("string"==typeof e){var o=e.toLowerCase();b[o]&&(i=o),r&&(b[o]=r,i=o);var s=e.split("-");if(!i&&s.length>1)return t(s[0])}else{var a=e.name;b[a]=e,i=a}return!n&&i&&(m=i),i||!n&&m},w=function(t,e){if(M(t))return t.clone();var r="object"==typeof e?e:{};return r.date=t,r.args=arguments,new O(r)},k=g;k.l=D,k.i=M,k.w=function(t,e){return w(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var O=function(){function p(t){this.$L=D(t.locale,null,!0),this.parse(t),this.$x=this.$x||t.x||{},this[S]=!0}var y=p.prototype;return y.parse=function(t){this.$d=function(t){var e=t.date,r=t.utc;if(null===e)return new Date(NaN);if(k.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var n=e.match(v);if(n){var i=n[2]-1||0,o=(n[7]||"0").substring(0,3);return r?new Date(Date.UTC(n[1],i,n[3]||1,n[4]||0,n[5]||0,n[6]||0,o)):new Date(n[1],i,n[3]||1,n[4]||0,n[5]||0,n[6]||0,o)}}return new Date(e)}(t),this.init()},y.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},y.$utils=function(){return k},y.isValid=function(){return!(this.$d.toString()===d)},y.isSame=function(t,e){var r=w(t);return this.startOf(e)<=r&&r<=this.endOf(e)},y.isAfter=function(t,e){return w(t)<this.startOf(e)},y.isBefore=function(t,e){return this.endOf(e)<w(t)},y.$g=function(t,e,r){return k.u(t)?this[e]:this.set(r,t)},y.unix=function(){return Math.floor(this.valueOf()/1e3)},y.valueOf=function(){return this.$d.getTime()},y.startOf=function(t,e){var r=this,n=!!k.u(e)||e,l=k.p(t),d=function(t,e){var i=k.w(r.$u?Date.UTC(r.$y,e,t):new Date(r.$y,e,t),r);return n?i:i.endOf(a)},v=function(t,e){return k.w(r.toDate()[t].apply(r.toDate("s"),(n?[0,0,0,0]:[23,59,59,999]).slice(e)),r)},$=this.$W,p=this.$M,y=this.$D,g="set"+(this.$u?"UTC":"");switch(l){case f:return n?d(1,0):d(31,11);case c:return n?d(1,p):d(0,p+1);case u:var m=this.$locale().weekStart||0,b=($<m?$+7:$)-m;return d(n?y-b:y+(6-b),p);case a:case h:return v(g+"Hours",0);case s:return v(g+"Minutes",1);case o:return v(g+"Seconds",2);case i:return v(g+"Milliseconds",3);default:return this.clone()}},y.endOf=function(t){return this.startOf(t,!1)},y.$set=function(t,e){var r,u=k.p(t),l="set"+(this.$u?"UTC":""),d=(r={},r[a]=l+"Date",r[h]=l+"Date",r[c]=l+"Month",r[f]=l+"FullYear",r[s]=l+"Hours",r[o]=l+"Minutes",r[i]=l+"Seconds",r[n]=l+"Milliseconds",r)[u],v=u===a?this.$D+(e-this.$W):e;if(u===c||u===f){var $=this.clone().set(h,1);$.$d[d](v),$.init(),this.$d=$.set(h,Math.min(this.$D,$.daysInMonth())).$d}else d&&this.$d[d](v);return this.init(),this},y.set=function(t,e){return this.clone().$set(t,e)},y.get=function(t){return this[k.p(t)]()},y.add=function(n,l){var h,d=this;n=Number(n);var v=k.p(l),$=function(t){var e=w(d);return k.w(e.date(e.date()+Math.round(t*n)),d)};if(v===c)return this.set(c,this.$M+n);if(v===f)return this.set(f,this.$y+n);if(v===a)return $(1);if(v===u)return $(7);var p=(h={},h[o]=e,h[s]=r,h[i]=t,h)[v]||1,y=this.$d.getTime()+n*p;return k.w(y,this)},y.subtract=function(t,e){return this.add(-1*t,e)},y.format=function(t){var e=this,r=this.$locale();if(!this.isValid())return r.invalidDate||d;var n=t||"YYYY-MM-DDTHH:mm:ssZ",i=k.z(this),o=this.$H,s=this.$m,a=this.$M,u=r.weekdays,c=r.months,l=r.meridiem,f=function(t,r,i,o){return t&&(t[r]||t(e,n))||i[r].slice(0,o)},h=function(t){return k.s(o%12||12,t,"0")},v=l||function(t,e,r){var n=t<12?"AM":"PM";return r?n.toLowerCase():n};return n.replace($,(function(t,n){return n||function(t){switch(t){case"YY":return String(e.$y).slice(-2);case"YYYY":return k.s(e.$y,4,"0");case"M":return a+1;case"MM":return k.s(a+1,2,"0");case"MMM":return f(r.monthsShort,a,c,3);case"MMMM":return f(c,a);case"D":return e.$D;case"DD":return k.s(e.$D,2,"0");case"d":return String(e.$W);case"dd":return f(r.weekdaysMin,e.$W,u,2);case"ddd":return f(r.weekdaysShort,e.$W,u,3);case"dddd":return u[e.$W];case"H":return String(o);case"HH":return k.s(o,2,"0");case"h":return h(1);case"hh":return h(2);case"a":return v(o,s,!0);case"A":return v(o,s,!1);case"m":return String(s);case"mm":return k.s(s,2,"0");case"s":return String(e.$s);case"ss":return k.s(e.$s,2,"0");case"SSS":return k.s(e.$ms,3,"0");case"Z":return i}return null}(t)||i.replace(":","")}))},y.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},y.diff=function(n,h,d){var v,$=this,p=k.p(h),y=w(n),g=(y.utcOffset()-this.utcOffset())*e,m=this-y,b=function(){return k.m($,y)};switch(p){case f:v=b()/12;break;case c:v=b();break;case l:v=b()/3;break;case u:v=(m-g)/6048e5;break;case a:v=(m-g)/864e5;break;case s:v=m/r;break;case o:v=m/e;break;case i:v=m/t;break;default:v=m}return d?v:k.a(v)},y.daysInMonth=function(){return this.endOf(c).$D},y.$locale=function(){return b[this.$L]},y.locale=function(t,e){if(!t)return this.$L;var r=this.clone(),n=D(t,e,!0);return n&&(r.$L=n),r},y.clone=function(){return k.w(this.$d,this)},y.toDate=function(){return new Date(this.valueOf())},y.toJSON=function(){return this.isValid()?this.toISOString():null},y.toISOString=function(){return this.$d.toISOString()},y.toString=function(){return this.$d.toUTCString()},p}(),x=O.prototype;function _(t){return Object.prototype.toString.call(t)}function L(t){return"[object Array]"===_(t)}w.prototype=x,[["$ms",n],["$s",i],["$m",o],["$H",s],["$W",a],["$M",c],["$y",f],["$D",h]].forEach((function(t){x[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),w.extend=function(t,e){return t.$i||(t(e,O,w),t.$i=!0),w},w.locale=D,w.isDayjs=M,w.unix=function(t){return w(1e3*t)},w.en=b[m],w.Ls=b,w.p={};var Y,I,W,H,T={en:{type:"type","log-param-error":"the param of func is error",start:"start",end:"end",date:"date",timestamp:"timestamp"},"zh-cn":{type:"类型","log-param-error":"打印参数错误",start:"开始",end:"结束",date:"日期",timestamp:"时间戳"}};function j(t){for(var e=[],r=1;r<arguments.length;r++)e[r-1]=arguments[r];var n=t;if(L(e)){for(var i=0;i<e.length;i++)n+=";",n+=e[i];return n}return n}!function(t){t.VerBose="VerBose",t.Info="Info",t.Warning="Warning",t.Error="Error"}(Y||(Y={})),function(t){t.VerBose="background-color:#67C23A;color:#ffffff",t.Info="background-color:#909399;color:#ffffff",t.Warning="background-color:#E6A23C;color:#ffffff",t.Error="background-color:#F56C6C;color:#ffffff"}(I||(I={})),function(t){t.ltb="border-radius:6px 0 0 6px",t.rtb="border-radius:0 6px 6px 0"}(W||(W={})),function(t){t.all10="padding:10px"}(H||(H={}));var A="background-color:#409EFF;padding:10px;color:#ffffff",C="  ";function B(t){var e,r,n,i,o,s,a,u;this.level=null!==(e=null==t?void 0:t.level)&&void 0!==e?e:Y.VerBose,this.locale=null!==(r=null==t?void 0:t.locale)&&void 0!==r?r:"en",this.zIndex=null!==(n=null==t?void 0:t.zIndex)&&void 0!==n?n:0,this.VerBoseStyle=null!==(i=null==t?void 0:t.VerBoseStyle)&&void 0!==i?i:"",this.InfoStyle=null!==(o=null==t?void 0:t.InfoStyle)&&void 0!==o?o:"",this.WarningStyle=null!==(s=null==t?void 0:t.WarningStyle)&&void 0!==s?s:"",this.ErrorStyle=null!==(a=null==t?void 0:t.ErrorStyle)&&void 0!==a?a:"",this.format=null!==(u=null==t?void 0:t.format)&&void 0!==u?u:void 0}B.level=Y,B.prototype.console=window.console,B.prototype.filter=function(t){this.filterKey=t},B.prototype.print=function(t,e){var r,n,i,o=null!==(r=null==e?void 0:e.style)&&void 0!==r?r:"",s=this;function a(t,e,r){console.log("%c"+T[s.locale].type+C+t+C,r),console.log(e)}switch((i=n=t)&&i.nodeName&&1===i.nodeType?"Dom":_(n).replace("[object ","").replace("]","")){case"Array":console.log("%c"+T[s.locale].type+"  Array"+C,o),console.table(t);break;case"Boolean":a("Boolean",t,o);break;case"String":a("String",t,o);break;case"Null":a("Null",t,o);break;case"Undefined":a("Undefined",t,o);break;case"Number":a("Number",t,o);break;case"Symbol":a("Symbol",t,o);break;case"Object":a("Object",t,o);break;case"Dom":a("Dom",t,o);break;default:a("any",t,o)}},B.prototype.beforeLog=function(t,e){var r;void 0===e&&(e="YYYY-MM-DD HH:mm:ss");var n=null!==(r=this.format)&&void 0!==r?r:e;console.log("%c"+t+"%c"+T[this.locale].date+":"+C+w().format(n)+"%c"+T[this.locale].start,j(I[this.level],W.ltb,H.all10),A,j(I[this.level],W.rtb,H.all10))},B.prototype.afterLog=function(t){console.log("%c"+t+"%c"+T[this.locale].timestamp+":"+C+w().unix()+"%c"+T[this.locale].end,j(I[this.level],W.ltb,H.all10),A,j(I[this.level],W.rtb,H.all10))},B.prototype.log=function(t,e,r){this.baseLog(t,e,Y.VerBose,r)},B.prototype.info=function(t,e,r){this.baseLog(t,e,Y.Info,r)},B.prototype.warn=function(t,e,r){this.baseLog(t,e,Y.Warning,r)},B.prototype.error=function(t,e,r){this.baseLog(t,e,Y.Error,r)},B.prototype.baseLog=function(t,e,r,n){var i;try{var o=1;if("[object Object]"===_(n)&&(o=null!==(i=null==n?void 0:n.zIndex)&&void 0!==i?i:1),o<this.zIndex)return;var s=null!=r?r:Y.VerBose;if(this.level!=s)return;if(this.filterKey){if(!t)return;if(!t.toString().includes(this.filterKey))return}if(this.beforeLog(t),L(e))for(var a=0;a<e.length;a++){var u=e[a];this.print(u,n)}else this.print(e,n);this.afterLog(t)}catch(t){var c=T[this.locale]["log-param-error"];throw new Error(c+t)}return this};export{B as default};
