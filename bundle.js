!function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a="function"==typeof require&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n||e)},l,l.exports,e,t,n,r)}return n[o].exports}for(var i="function"==typeof require&&require,o=0;o<r.length;o++)s(r[o]);return s}({1:[function(require,module,exports){"use strict";for(var animateHeader=require("./lib/animate-header"),animateText=require("./lib/animate-text"),animator=require("./lib/controller"),anim=animator(),seed=(Math.random(),Math.random()),p5={color:[0,0,0],duration:300,delay:200,seed:seed},headers=document.querySelectorAll("h1,h2"),i=0;i<headers.length;i++)anim.add(animateHeader(headers[i],p5));for(var p3={etchSpeed:10+Math.round(4*Math.random()),targetBGColor:"rgb(255,255,255)",targetFGColor:"rgb(40, 40, 40)",etchBGColor:"rgb(62, 62, 62)",etchFGColor:"rgb(255,20,147)",seed:seed},lis=document.querySelectorAll("li,p"),_i=0;_i<lis.length;_i++)anim.add(animateText(lis[_i],p3));anim.start()},{"./lib/animate-header":2,"./lib/animate-text":3,"./lib/controller":4}],2:[function(require,module,exports){"use strict";var scale=require("./scale-alpha");module.exports=function(el){function step(dt){var finished=accum+options.delay>=options.duration;if(!((accum+=dt)<options.delay)){var actual=accum-options.delay;if(actual<=options.duration){var amount=1-actual/options.duration;span.style.backgroundColor=scale(options.color,amount)}!finished&&actual>=options.duration&&(span.style.backgroundColor="")}}var opts=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},options=JSON.parse(JSON.stringify(opts));el.innerHTML="<span>"+el.innerText+"</span>";var span=el.querySelector("span");span.style.color="rgb("+options.color.join(",")+")",span.style.backgroundColor="",span.style.fontSize="inherit";var accum=0;return{step:step}}},{"./scale-alpha":5}],3:[function(require,module,exports){"use strict";var seedrandom=require("seedrandom"),spanify=require("./spanify");module.exports=function(el){function etch(i){if(!(i>=spans.length)){if(" "===spans[i].innerText)return void(spans[i].style.backgroundColor="");spans[i].style.color=options.etchFGColor,spans[i].style.backgroundColor=options.etchBGColor}}function done(i){i>=spans.length||(spans[i].style.color="initial",spans[i].style.backgroundColor=options.targetBGColor)}var opts=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},options=JSON.parse(JSON.stringify(opts)),spans=void 0,index=0,accum=0,delay=options.delay?options.delay:0,rng=seedrandom(options.randSeed),etchWidth=rng()>.5?1:2,setText=function(text){_setup(text),accum=delay},_setup=function(text){el.innerHTML=text.trim(),spanify(el),index=0,spans=el.querySelectorAll("span");for(var pageBgColor=window.getComputedStyle(document.body,null).getPropertyValue("background-color"),i=0;i<spans.length;i++)spans[i].style.color=pageBgColor},step=function(dt){if(!((accum+=dt)<delay))for(var actual=accum-delay;actual>=options.etchSpeed;){if(done(index),etchWidth>1&&done(index+1),(index+=etchWidth)>=spans.length)return;etchWidth=rng()>.5?1:2,etch(index),etchWidth>1&&etch(index+1),actual-=options.etchSpeed,accum-=options.etchSpeed}};return _setup(el.innerText),{setText:setText,step:step}}},{"./spanify":6,seedrandom:11}],4:[function(require,module,exports){"use strict";var raf=require("raf");module.exports=function(){function _step(){var now=Date.now(),dt=now-lastTime;lastTime=now;for(var i=0;i<items.length;i++)items[i].step(dt);raf(_step)}var items=[],lastTime=Date.now();return{add:function(item){items.push(item)},remove:function(item){for(var i=0;i<items.length;i++)if(items[i]===item)return items.splice(i,1)},start:function(){raf(_step)}}}},{raf:10}],5:[function(require,module,exports){"use strict";module.exports=function(color,amount){return"rgba("+color.join(",")+","+amount+")"}},{}],6:[function(require,module,exports){"use strict";module.exports=function(el){for(var content=el.innerText,newContent="",i=0;i<content.length;i++)newContent+="<span>"+content[i]+"</span>";el.innerHTML=newContent}},{}],7:[function(require,module,exports){},{}],8:[function(require,module,exports){(function(process){(function(){var getNanoSeconds,hrtime,loadTime;"undefined"!=typeof performance&&null!==performance&&performance.now?module.exports=function(){return performance.now()}:void 0!==process&&null!==process&&process.hrtime?(module.exports=function(){return(getNanoSeconds()-loadTime)/1e6},hrtime=process.hrtime,getNanoSeconds=function(){var hr;return hr=hrtime(),1e9*hr[0]+hr[1]},loadTime=getNanoSeconds()):Date.now?(module.exports=function(){return Date.now()-loadTime},loadTime=Date.now()):(module.exports=function(){return(new Date).getTime()-loadTime},loadTime=(new Date).getTime())}).call(this)}).call(this,require("_process"))},{_process:9}],9:[function(require,module,exports){function defaultSetTimout(){throw new Error("setTimeout has not been defined")}function defaultClearTimeout(){throw new Error("clearTimeout has not been defined")}function runTimeout(fun){if(cachedSetTimeout===setTimeout)return setTimeout(fun,0);if((cachedSetTimeout===defaultSetTimout||!cachedSetTimeout)&&setTimeout)return cachedSetTimeout=setTimeout,setTimeout(fun,0);try{return cachedSetTimeout(fun,0)}catch(e){try{return cachedSetTimeout.call(null,fun,0)}catch(e){return cachedSetTimeout.call(this,fun,0)}}}function runClearTimeout(marker){if(cachedClearTimeout===clearTimeout)return clearTimeout(marker);if((cachedClearTimeout===defaultClearTimeout||!cachedClearTimeout)&&clearTimeout)return cachedClearTimeout=clearTimeout,clearTimeout(marker);try{return cachedClearTimeout(marker)}catch(e){try{return cachedClearTimeout.call(null,marker)}catch(e){return cachedClearTimeout.call(this,marker)}}}function cleanUpNextTick(){draining&&currentQueue&&(draining=!1,currentQueue.length?queue=currentQueue.concat(queue):queueIndex=-1,queue.length&&drainQueue())}function drainQueue(){if(!draining){var timeout=runTimeout(cleanUpNextTick);draining=!0;for(var len=queue.length;len;){for(currentQueue=queue,queue=[];++queueIndex<len;)currentQueue&&currentQueue[queueIndex].run();queueIndex=-1,len=queue.length}currentQueue=null,draining=!1,runClearTimeout(timeout)}}function Item(fun,array){this.fun=fun,this.array=array}function noop(){}var cachedSetTimeout,cachedClearTimeout,process=module.exports={};!function(){try{cachedSetTimeout="function"==typeof setTimeout?setTimeout:defaultSetTimout}catch(e){cachedSetTimeout=defaultSetTimout}try{cachedClearTimeout="function"==typeof clearTimeout?clearTimeout:defaultClearTimeout}catch(e){cachedClearTimeout=defaultClearTimeout}}();var currentQueue,queue=[],draining=!1,queueIndex=-1;process.nextTick=function(fun){var args=new Array(arguments.length-1);if(arguments.length>1)for(var i=1;i<arguments.length;i++)args[i-1]=arguments[i];queue.push(new Item(fun,args)),1!==queue.length||draining||runTimeout(drainQueue)},Item.prototype.run=function(){this.fun.apply(null,this.array)},process.title="browser",process.browser=!0,process.env={},process.argv=[],process.version="",process.versions={},process.on=noop,process.addListener=noop,process.once=noop,process.off=noop,process.removeListener=noop,process.removeAllListeners=noop,process.emit=noop,process.binding=function(name){throw new Error("process.binding is not supported")},process.cwd=function(){return"/"},process.chdir=function(dir){throw new Error("process.chdir is not supported")},process.umask=function(){return 0}},{}],10:[function(require,module,exports){(function(global){for(var now=require("performance-now"),root="undefined"==typeof window?global:window,vendors=["moz","webkit"],suffix="AnimationFrame",raf=root["request"+suffix],caf=root["cancel"+suffix]||root["cancelRequest"+suffix],i=0;!raf&&i<vendors.length;i++)raf=root[vendors[i]+"Request"+suffix],caf=root[vendors[i]+"Cancel"+suffix]||root[vendors[i]+"CancelRequest"+suffix];if(!raf||!caf){var last=0,id=0,queue=[];raf=function(callback){if(0===queue.length){var _now=now(),next=Math.max(0,1e3/60-(_now-last));last=next+_now,setTimeout(function(){var cp=queue.slice(0);queue.length=0;for(var i=0;i<cp.length;i++)if(!cp[i].cancelled)try{cp[i].callback(last)}catch(e){setTimeout(function(){throw e},0)}},Math.round(next))}return queue.push({handle:++id,callback:callback,cancelled:!1}),id},caf=function(handle){for(var i=0;i<queue.length;i++)queue[i].handle===handle&&(queue[i].cancelled=!0)}}module.exports=function(fn){return raf.call(root,fn)},module.exports.cancel=function(){caf.apply(root,arguments)},module.exports.polyfill=function(){root.requestAnimationFrame=raf,root.cancelAnimationFrame=caf}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"performance-now":8}],11:[function(require,module,exports){var alea=require("./lib/alea"),xor128=require("./lib/xor128"),xorwow=require("./lib/xorwow"),xorshift7=require("./lib/xorshift7"),xor4096=require("./lib/xor4096"),tychei=require("./lib/tychei"),sr=require("./seedrandom");sr.alea=alea,sr.xor128=xor128,sr.xorwow=xorwow,sr.xorshift7=xorshift7,sr.xor4096=xor4096,sr.tychei=tychei,module.exports=sr},{"./lib/alea":12,"./lib/tychei":13,"./lib/xor128":14,"./lib/xor4096":15,"./lib/xorshift7":16,"./lib/xorwow":17,"./seedrandom":18}],12:[function(require,module,exports){!function(global,module,define){function Alea(seed){var me=this,mash=Mash();me.next=function(){var t=2091639*me.s0+2.3283064365386963e-10*me.c;return me.s0=me.s1,me.s1=me.s2,me.s2=t-(me.c=0|t)},me.c=1,me.s0=mash(" "),me.s1=mash(" "),me.s2=mash(" "),me.s0-=mash(seed),me.s0<0&&(me.s0+=1),me.s1-=mash(seed),me.s1<0&&(me.s1+=1),me.s2-=mash(seed),me.s2<0&&(me.s2+=1),mash=null}function copy(f,t){return t.c=f.c,t.s0=f.s0,t.s1=f.s1,t.s2=f.s2,t}function impl(seed,opts){var xg=new Alea(seed),state=opts&&opts.state,prng=xg.next;return prng.int32=function(){return 4294967296*xg.next()|0},prng.double=function(){return prng()+1.1102230246251565e-16*(2097152*prng()|0)},prng.quick=prng,state&&("object"==typeof state&&copy(state,xg),prng.state=function(){return copy(xg,{})}),prng}function Mash(){var n=4022871197;return function(data){data=data.toString();for(var i=0;i<data.length;i++){n+=data.charCodeAt(i);var h=.02519603282416938*n;n=h>>>0,h-=n,h*=n,n=h>>>0,h-=n,n+=4294967296*h}return 2.3283064365386963e-10*(n>>>0)}}module&&module.exports?module.exports=impl:define&&define.amd?define(function(){return impl}):this.alea=impl}(0,"object"==typeof module&&module,"function"==typeof define&&define)},{}],13:[function(require,module,exports){!function(global,module,define){function XorGen(seed){var me=this,strseed="";me.next=function(){var b=me.b,c=me.c,d=me.d,a=me.a;return b=b<<25^b>>>7^c,c=c-d|0,d=d<<24^d>>>8^a,a=a-b|0,me.b=b=b<<20^b>>>12^c,me.c=c=c-d|0,me.d=d<<16^c>>>16^a,me.a=a-b|0},me.a=0,me.b=0,me.c=-1640531527,me.d=1367130551,seed===Math.floor(seed)?(me.a=seed/4294967296|0,me.b=0|seed):strseed+=seed;for(var k=0;k<strseed.length+20;k++)me.b^=0|strseed.charCodeAt(k),me.next()}function copy(f,t){return t.a=f.a,t.b=f.b,t.c=f.c,t.d=f.d,t}function impl(seed,opts){var xg=new XorGen(seed),state=opts&&opts.state,prng=function(){return(xg.next()>>>0)/4294967296};return prng.double=function(){do{var top=xg.next()>>>11,bot=(xg.next()>>>0)/4294967296,result=(top+bot)/(1<<21)}while(0===result);return result},prng.int32=xg.next,prng.quick=prng,state&&("object"==typeof state&&copy(state,xg),prng.state=function(){return copy(xg,{})}),prng}module&&module.exports?module.exports=impl:define&&define.amd?define(function(){return impl}):this.tychei=impl}(0,"object"==typeof module&&module,"function"==typeof define&&define)},{}],14:[function(require,module,exports){!function(global,module,define){function XorGen(seed){var me=this,strseed="";me.x=0,me.y=0,me.z=0,me.w=0,me.next=function(){var t=me.x^me.x<<11;return me.x=me.y,me.y=me.z,me.z=me.w,me.w^=me.w>>>19^t^t>>>8},seed===(0|seed)?me.x=seed:strseed+=seed;for(var k=0;k<strseed.length+64;k++)me.x^=0|strseed.charCodeAt(k),me.next()}function copy(f,t){return t.x=f.x,t.y=f.y,t.z=f.z,t.w=f.w,t}function impl(seed,opts){var xg=new XorGen(seed),state=opts&&opts.state,prng=function(){return(xg.next()>>>0)/4294967296};return prng.double=function(){do{var top=xg.next()>>>11,bot=(xg.next()>>>0)/4294967296,result=(top+bot)/(1<<21)}while(0===result);return result},prng.int32=xg.next,prng.quick=prng,state&&("object"==typeof state&&copy(state,xg),prng.state=function(){return copy(xg,{})}),prng}module&&module.exports?module.exports=impl:define&&define.amd?define(function(){return impl}):this.xor128=impl}(0,"object"==typeof module&&module,"function"==typeof define&&define)},{}],15:[function(require,module,exports){!function(global,module,define){function XorGen(seed){var me=this;me.next=function(){var t,v,w=me.w,X=me.X,i=me.i;return me.w=w=w+1640531527|0,v=X[i+34&127],t=X[i=i+1&127],v^=v<<13,t^=t<<17,v^=v>>>15,t^=t>>>12,v=X[i]=v^t,me.i=i,v+(w^w>>>16)|0},function(me,seed){var t,v,i,j,w,X=[],limit=128;for(seed===(0|seed)?(v=seed,seed=null):(seed+="\0",v=0,limit=Math.max(limit,seed.length)),i=0,j=-32;j<limit;++j)seed&&(v^=seed.charCodeAt((j+32)%seed.length)),0===j&&(w=v),v^=v<<10,v^=v>>>15,v^=v<<4,v^=v>>>13,j>=0&&(w=w+1640531527|0,t=X[127&j]^=v+w,i=0==t?i+1:0);for(i>=128&&(X[127&(seed&&seed.length||0)]=-1),i=127,j=512;j>0;--j)v=X[i+34&127],t=X[i=i+1&127],v^=v<<13,t^=t<<17,v^=v>>>15,t^=t>>>12,X[i]=v^t;me.w=w,me.X=X,me.i=i}(me,seed)}function copy(f,t){return t.i=f.i,t.w=f.w,t.X=f.X.slice(),t}function impl(seed,opts){null==seed&&(seed=+new Date);var xg=new XorGen(seed),state=opts&&opts.state,prng=function(){return(xg.next()>>>0)/4294967296};return prng.double=function(){do{var top=xg.next()>>>11,bot=(xg.next()>>>0)/4294967296,result=(top+bot)/(1<<21)}while(0===result);return result},prng.int32=xg.next,prng.quick=prng,state&&(state.X&&copy(state,xg),prng.state=function(){return copy(xg,{})}),prng}module&&module.exports?module.exports=impl:define&&define.amd?define(function(){return impl}):this.xor4096=impl}(0,"object"==typeof module&&module,"function"==typeof define&&define)},{}],16:[function(require,module,exports){!function(global,module,define){function XorGen(seed){var me=this;me.next=function(){var t,v,X=me.x,i=me.i;return t=X[i],t^=t>>>7,v=t^t<<24,t=X[i+1&7],v^=t^t>>>10,t=X[i+3&7],v^=t^t>>>3,t=X[i+4&7],v^=t^t<<7,t=X[i+7&7],t^=t<<13,v^=t^t<<9,X[i]=v,me.i=i+1&7,v},function(me,seed){var j,X=[];if(seed===(0|seed))X[0]=seed;else for(seed=""+seed,j=0;j<seed.length;++j)X[7&j]=X[7&j]<<15^seed.charCodeAt(j)+X[j+1&7]<<13;for(;X.length<8;)X.push(0);for(j=0;j<8&&0===X[j];++j);for(8==j?X[7]=-1:X[j],me.x=X,me.i=0,j=256;j>0;--j)me.next()}(me,seed)}function copy(f,t){return t.x=f.x.slice(),t.i=f.i,t}function impl(seed,opts){null==seed&&(seed=+new Date);var xg=new XorGen(seed),state=opts&&opts.state,prng=function(){return(xg.next()>>>0)/4294967296};return prng.double=function(){do{var top=xg.next()>>>11,bot=(xg.next()>>>0)/4294967296,result=(top+bot)/(1<<21)}while(0===result);return result},prng.int32=xg.next,prng.quick=prng,state&&(state.x&&copy(state,xg),prng.state=function(){return copy(xg,{})}),prng}module&&module.exports?module.exports=impl:define&&define.amd?define(function(){return impl}):this.xorshift7=impl}(0,"object"==typeof module&&module,"function"==typeof define&&define)},{}],17:[function(require,module,exports){!function(global,module,define){function XorGen(seed){var me=this,strseed="";me.next=function(){var t=me.x^me.x>>>2;return me.x=me.y,me.y=me.z,me.z=me.w,me.w=me.v,(me.d=me.d+362437|0)+(me.v=me.v^me.v<<4^t^t<<1)|0},me.x=0,me.y=0,me.z=0,me.w=0,me.v=0,seed===(0|seed)?me.x=seed:strseed+=seed;for(var k=0;k<strseed.length+64;k++)me.x^=0|strseed.charCodeAt(k),k==strseed.length&&(me.d=me.x<<10^me.x>>>4),me.next()}function copy(f,t){return t.x=f.x,t.y=f.y,t.z=f.z,t.w=f.w,t.v=f.v,t.d=f.d,t}function impl(seed,opts){var xg=new XorGen(seed),state=opts&&opts.state,prng=function(){return(xg.next()>>>0)/4294967296};return prng.double=function(){do{var top=xg.next()>>>11,bot=(xg.next()>>>0)/4294967296,result=(top+bot)/(1<<21)}while(0===result);return result},prng.int32=xg.next,prng.quick=prng,state&&("object"==typeof state&&copy(state,xg),prng.state=function(){return copy(xg,{})}),prng}module&&module.exports?module.exports=impl:define&&define.amd?define(function(){return impl}):this.xorwow=impl}(0,"object"==typeof module&&module,"function"==typeof define&&define)},{}],18:[function(require,module,exports){!function(pool,math){function seedrandom(seed,options,callback){var key=[];options=1==options?{entropy:!0}:options||{};var shortseed=mixkey(flatten(options.entropy?[seed,tostring(pool)]:null==seed?autoseed():seed,3),key),arc4=new ARC4(key),prng=function(){for(var n=arc4.g(chunks),d=startdenom,x=0;n<significance;)n=(n+x)*width,d*=width,x=arc4.g(1);for(;n>=overflow;)n/=2,d/=2,x>>>=1;return(n+x)/d};return prng.int32=function(){return 0|arc4.g(4)},prng.quick=function(){return arc4.g(4)/4294967296},prng.double=prng,mixkey(tostring(arc4.S),pool),(options.pass||callback||function(prng,seed,is_math_call,state){return state&&(state.S&&copy(state,arc4),prng.state=function(){return copy(arc4,{})}),is_math_call?(math[rngname]=prng,seed):prng})(prng,shortseed,"global"in options?options.global:this==math,options.state)}function ARC4(key){var t,keylen=key.length,me=this,i=0,j=me.i=me.j=0,s=me.S=[];for(keylen||(key=[keylen++]);i<width;)s[i]=i++;for(i=0;i<width;i++)s[i]=s[j=mask&j+key[i%keylen]+(t=s[i])],s[j]=t;(me.g=function(count){for(var t,r=0,i=me.i,j=me.j,s=me.S;count--;)t=s[i=mask&i+1],r=r*width+s[mask&(s[i]=s[j=mask&j+t])+(s[j]=t)];return me.i=i,me.j=j,r})(width)}function copy(f,t){return t.i=f.i,t.j=f.j,t.S=f.S.slice(),t}function flatten(obj,depth){var prop,result=[],typ=typeof obj;if(depth&&"object"==typ)for(prop in obj)try{result.push(flatten(obj[prop],depth-1))}catch(e){}return result.length?result:"string"==typ?obj:obj+"\0"}function mixkey(seed,key){for(var smear,stringseed=seed+"",j=0;j<stringseed.length;)key[mask&j]=mask&(smear^=19*key[mask&j])+stringseed.charCodeAt(j++);return tostring(key)}function autoseed(){try{var out;return nodecrypto&&(out=nodecrypto.randomBytes)?out=out(width):(out=new Uint8Array(width),(global.crypto||global.msCrypto).getRandomValues(out)),tostring(out)}catch(e){var browser=global.navigator,plugins=browser&&browser.plugins;return[+new Date,global,plugins,global.screen,tostring(pool)]}}function tostring(a){return String.fromCharCode.apply(0,a)}var nodecrypto,global=this,width=256,chunks=6,rngname="random",startdenom=math.pow(width,chunks),significance=math.pow(2,52),overflow=2*significance,mask=width-1;if(math["seed"+rngname]=seedrandom,mixkey(math.random(),pool),"object"==typeof module&&module.exports){module.exports=seedrandom;try{nodecrypto=require("crypto")}catch(ex){}}else"function"==typeof define&&define.amd&&define(function(){return seedrandom})}([],Math)},{crypto:7}]},{},[1]);