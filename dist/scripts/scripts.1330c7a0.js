function PrayTimes(a){var b,c,d,e,f,g={imsak:"Imsak",fajr:"Fajr",sunrise:"Sunrise",dhuhr:"Dhuhr",asr:"Asr",sunset:"Sunset",maghrib:"Maghrib",isha:"Isha",midnight:"Midnight"},h={MWL:{name:"Muslim World League",params:{fajr:18,isha:17}},ISNA:{name:"Islamic Society of North America (ISNA)",params:{fajr:15,isha:15}},Egypt:{name:"Egyptian General Authority of Survey",params:{fajr:19.5,isha:17.5}},Makkah:{name:"Umm Al-Qura University, Makkah",params:{fajr:18.5,isha:"90 min"}},Karachi:{name:"University of Islamic Sciences, Karachi",params:{fajr:18,isha:18}},Tehran:{name:"Institute of Geophysics, University of Tehran",params:{fajr:17.7,isha:14,maghrib:4.5,midnight:"Jafari"}},Jafari:{name:"Shia Ithna-Ashari, Leva Institute, Qum",params:{fajr:16,isha:14,maghrib:4,midnight:"Jafari"}}},i={maghrib:"0 min",midnight:"Standard"},j="MWL",k={imsak:"10 min",dhuhr:"0 min",asr:"Standard",highLats:"NightMiddle"},l="24h",m=["am","pm"],n="-----",o=1,p={},q=i;for(var r in h){var s=h[r].params;for(var t in q)"undefined"==typeof s[t]&&(s[t]=q[t])}j=h[a]?a:j;var s=h[j].params;for(var u in s)k[u]=s[u];for(var r in g)p[r]=0;return{setMethod:function(a){h[a]&&(this.adjust(h[a].params),j=a)},adjust:function(a){for(var b in a)k[b]=a[b]},tune:function(a){for(var b in a)p[b]=a[b]},getMethod:function(){return j},getSetting:function(){return k},getOffsets:function(){return p},getDefaults:function(){return h},getTimes:function(a,g,h,i,j){return b=1*g[0],c=1*g[1],d=g[2]?1*g[2]:0,l=j||l,a.constructor===Date&&(a=[a.getFullYear(),a.getMonth()+1,a.getDate()]),("undefined"==typeof h||"auto"==h)&&(h=this.getTimeZone(a)),("undefined"==typeof i||"auto"==i)&&(i=this.getDst(a)),e=1*h+(1*i?1:0),f=this.julian(a[0],a[1],a[2])-c/360,this.computeTimes()},getFormattedTime:function(a,b,c){if(isNaN(a))return n;if("Float"==b)return a;c=c||m,a=DMath.fixHour(a+.5/60);var d=Math.floor(a),e=Math.floor(60*(a-d)),f="12h"==b?c[12>d?0:1]:"",g="24h"==b?this.twoDigitsFormat(d):(d+12-1)%12+1;return g+":"+this.twoDigitsFormat(e)+(f?" "+f:"")},midDay:function(a){var b=this.sunPosition(f+a).equation,c=DMath.fixHour(12-b);return c},sunAngleTime:function(a,c,d){var e=this.sunPosition(f+c).declination,g=this.midDay(c),h=1/15*DMath.arccos((-DMath.sin(a)-DMath.sin(e)*DMath.sin(b))/(DMath.cos(e)*DMath.cos(b)));return g+("ccw"==d?-h:h)},asrTime:function(a,c){var d=this.sunPosition(f+c).declination,e=-DMath.arccot(a+DMath.tan(Math.abs(b-d)));return this.sunAngleTime(e,c)},sunPosition:function(a){var b=a-2451545,c=DMath.fixAngle(357.529+.98560028*b),d=DMath.fixAngle(280.459+.98564736*b),e=DMath.fixAngle(d+1.915*DMath.sin(c)+.02*DMath.sin(2*c)),f=(1.00014-.01671*DMath.cos(c)-14e-5*DMath.cos(2*c),23.439-3.6e-7*b),g=DMath.arctan2(DMath.cos(f)*DMath.sin(e),DMath.cos(e))/15,h=d/15-DMath.fixHour(g),i=DMath.arcsin(DMath.sin(f)*DMath.sin(e));return{declination:i,equation:h}},julian:function(a,b,c){2>=b&&(a-=1,b+=12);var d=Math.floor(a/100),e=2-d+Math.floor(d/4),f=Math.floor(365.25*(a+4716))+Math.floor(30.6001*(b+1))+c+e-1524.5;return f},computePrayerTimes:function(a){a=this.dayPortion(a);var b=k,c=this.sunAngleTime(this.eval(b.imsak),a.imsak,"ccw"),d=this.sunAngleTime(this.eval(b.fajr),a.fajr,"ccw"),e=this.sunAngleTime(this.riseSetAngle(),a.sunrise,"ccw"),f=this.midDay(a.dhuhr),g=this.asrTime(this.asrFactor(b.asr),a.asr),h=this.sunAngleTime(this.riseSetAngle(),a.sunset),i=this.sunAngleTime(this.eval(b.maghrib),a.maghrib),j=this.sunAngleTime(this.eval(b.isha),a.isha);return{imsak:c,fajr:d,sunrise:e,dhuhr:f,asr:g,sunset:h,maghrib:i,isha:j}},computeTimes:function(){for(var a={imsak:5,fajr:5,sunrise:6,dhuhr:12,asr:13,sunset:18,maghrib:18,isha:18},b=1;o>=b;b++)a=this.computePrayerTimes(a);return a=this.adjustTimes(a),a.midnight="Jafari"==k.midnight?a.sunset+this.timeDiff(a.sunset,a.fajr)/2:a.sunset+this.timeDiff(a.sunset,a.sunrise)/2,a=this.tuneTimes(a),this.modifyFormats(a)},adjustTimes:function(a){var b=k;for(var d in a)a[d]+=e-c/15;return"None"!=b.highLats&&(a=this.adjustHighLats(a)),this.isMin(b.imsak)&&(a.imsak=a.fajr-this.eval(b.imsak)/60),this.isMin(b.maghrib)&&(a.maghrib=a.sunset+this.eval(b.maghrib)/60),this.isMin(b.isha)&&(a.isha=a.maghrib+this.eval(b.isha)/60),a.dhuhr+=this.eval(b.dhuhr)/60,a},asrFactor:function(a){var b={Standard:1,Hanafi:2}[a];return b||this.eval(a)},riseSetAngle:function(){var a=.0347*Math.sqrt(d);return.833+a},tuneTimes:function(a){for(var b in a)a[b]+=p[b]/60;return a},modifyFormats:function(a){for(var b in a)a[b]=this.getFormattedTime(a[b],l);return a},adjustHighLats:function(a){var b=k,c=this.timeDiff(a.sunset,a.sunrise);return a.imsak=this.adjustHLTime(a.imsak,a.sunrise,this.eval(b.imsak),c,"ccw"),a.fajr=this.adjustHLTime(a.fajr,a.sunrise,this.eval(b.fajr),c,"ccw"),a.isha=this.adjustHLTime(a.isha,a.sunset,this.eval(b.isha),c),a.maghrib=this.adjustHLTime(a.maghrib,a.sunset,this.eval(b.maghrib),c),a},adjustHLTime:function(a,b,c,d,e){var f=this.nightPortion(c,d),g="ccw"==e?this.timeDiff(a,b):this.timeDiff(b,a);return(isNaN(a)||g>f)&&(a=b+("ccw"==e?-f:f)),a},nightPortion:function(a,b){var c=k.highLats,d=.5;return"AngleBased"==c&&(d=1/60*a),"OneSeventh"==c&&(d=1/7),d*b},dayPortion:function(a){for(var b in a)a[b]/=24;return a},getTimeZone:function(a){var b=a[0],c=this.gmtOffset([b,0,1]),d=this.gmtOffset([b,6,1]);return Math.min(c,d)},getDst:function(a){return 1*(this.gmtOffset(a)!=this.getTimeZone(a))},gmtOffset:function(a){var b=new Date(a[0],a[1]-1,a[2],12,0,0,0),c=b.toGMTString(),d=new Date(c.substring(0,c.lastIndexOf(" ")-1)),e=(b-d)/36e5;return e},eval:function(a){return 1*(a+"").split(/[^0-9.+-]/)[0]},isMin:function(a){return-1!=(a+"").indexOf("min")},timeDiff:function(a,b){return DMath.fixHour(b-a)},twoDigitsFormat:function(a){return 10>a?"0"+a:a}}}function lowerPrayers(a){for(var b in list){var c="#"+list[b].toLowerCase();angular.element(document.querySelector(c)).text(tConvert(a[1][list[b].toLowerCase()]));var d=".prayers_lower ."+list[b].toLowerCase();angular.element(document.querySelector(d)).bind("mouseover",function(){$("#next_prayer").removeClass().addClass(this.className.split(" ")[1]),$("#prayer_name").text(this.className.split(" ")[1].charAt(0).toUpperCase()+this.className.split(" ")[1].slice(1)),$("#prayer_time").text(tConvert(a[1][this.className.split(" ")[1]]))})}}function tConvert(a){return a=a.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/)||[a],a.length>1&&(a=a.slice(1),a[5]=+a[0]<12?"AM":"PM",a[0]=+a[0]%12||12),a.join("")}var DMath={dtr:function(a){return a*Math.PI/180},rtd:function(a){return 180*a/Math.PI},sin:function(a){return Math.sin(this.dtr(a))},cos:function(a){return Math.cos(this.dtr(a))},tan:function(a){return Math.tan(this.dtr(a))},arcsin:function(a){return this.rtd(Math.asin(a))},arccos:function(a){return this.rtd(Math.acos(a))},arctan:function(a){return this.rtd(Math.atan(a))},arccot:function(a){return this.rtd(Math.atan(1/a))},arctan2:function(a,b){return this.rtd(Math.atan2(a,b))},fixAngle:function(a){return this.fix(a,360)},fixHour:function(a){return this.fix(a,24)},fix:function(a,b){return a-=b*Math.floor(a/b),0>a?a+b:a}},prayTimes=new PrayTimes;angular.module("beautifulprayerApp",["ngAnimate","ngResource","ngRoute","ngSanitize","ngTouch","ngCookies","ngPrayTimes"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/api",{templateUrl:"views/api.html",controller:"ApiCtrl"}).otherwise({redirectTo:"/"})}]).run(["prayTimes",function(a){console.log(new a("ISNA").getTimes(new Date,[43.5944,-79.6935],-5))}]);var list=["fajr","sunrise","dhuhr","asr","maghrib","isha"];angular.module("beautifulprayerApp").controller("MainCtrl",["$scope","$http","$cookies","$cookieStore","googleLocation",function(a,b,c,d,e){function f(){setTimeout(function(){a.currentPrayer?g():f()},100)}function g(){navigator.geolocation?navigator.geolocation.getCurrentPosition(h):console.log("Geolocation is not supported by this browser.")}function h(b){var c=j(b.coords.latitude,b.coords.longitude);e.search(b.coords.latitude+", "+b.coords.longitude).then(function(b){a.typedLocation=b.data.results[0].formatted_address}),a.currentPrayer={prayer_name:c[0].next_prayer_name,prayer_time:c[0].next_prayer_time,prayerBg:c[0].next_prayer_name.toLowerCase(),currentDate:(new Date).toDateString()},lowerPrayers(c)}function i(){b.jsonp("http://freegeoip.net/json/?callback=JSON_CALLBACK").then(function(b){a.location={latitude:b.data.latitude,longitude:b.data.longitude},a.typedLocation=b.data.city+", "+b.data.region_code;var c=j(b.data.latitude,b.data.longitude);a.currentPrayer={prayer_name:c[0].next_prayer_name,prayer_time:c[0].next_prayer_time,prayerBg:c[0].next_prayer_name.toLowerCase(),currentDate:(new Date).toDateString()},lowerPrayers(c)})}function j(b,c){function d(a){var b=[];for(var c in a)f[a[c].toLowerCase()]>e.toTimeString()&&b.push([a[c],f[a[c].toLowerCase()]]);return b[0]}prayTimes.adjust(1==a.hanafi?{asr:"Hanafi"}:{asr:"Standard"}),prayTimes.setMethod(a.methodSelected);var e=new Date,f=prayTimes.getTimes(e,[b,c]);if(e.getHours()+":"+e.getMinutes()>=f.isha){e.setDate(e.getDate()+1),e.setHours(2);var f=prayTimes.getTimes(e,[b,c])}var g=["Fajr","Sunrise","Dhuhr","Asr","Maghrib","Isha"],h=[],i={next_prayer_name:d(g)[0],next_prayer_time:tConvert(d(g)[1])},j={};for(var k in g)j[g[k].toLowerCase()]=tConvert(f[g[k].toLowerCase()]);return h=[i,j]}var k;c.cookiedMethod||c.asrMethod?(a.methodSelected=c.cookiedMethod.replace(/\"/g,""),a.hanafi=JSON.parse(c.asrMethod)):(a.methodSelected="MWL",a.hanafi=!1),i(),f(),a.methodChanged=function(){d.put("asrMethod",a.hanafi),prayTimes.setMethod(a.methodSelected),d.put("cookiedMethod",a.methodSelected),console.log(c.cookiedMethod),k=j(a.location.latitude,a.location.longitude),a.currentPrayer.prayer_name=k[0].next_prayer_name,a.currentPrayer.prayer_time=k[0].next_prayer_time,lowerPrayers(k)},a.searchLocation=function(){a.typedLocation=""},a.returnLocation=function(b){13==b.which&&e.search(a.typedLocation).then(function(b){k=j(b.data.results[0].geometry.location.lat,b.data.results[0].geometry.location.lng),a.typedLocation=b.data.results[0].address_components[0].long_name+", "+b.data.results[0].address_components[2].short_name,a.currentPrayer.prayer_name=k[0].next_prayer_name,a.currentPrayer.prayer_time=k[0].next_prayer_time,a.currentPrayer.currentDate=(new Date).toDateString(),lowerPrayers(k)})}}]),angular.module("beautifulprayerApp").controller("ApiCtrl",["$scope","$routeParams","prayTimes",function(a,b,c){return b.lat&&b.lng&&b.method?(a.prayTimes=new c,void console.log("asdjaksdjakshdk")):{message:"Missing some methods"}}]);var api_key="&key=AIzaSyC-cXe4qFed7ER7hYdPQZkkN5b_qIC57Ks";angular.module("beautifulprayerApp").factory("googleLocation",["$http",function(a){return{search:function(b){var c="http://maps.googleapis.com/maps/api/geocode/json?address="+b+"&sensor=false",d=encodeURI(c);return a.get(d)}}}]);