"use strict";

var minus = 0;
var bp = 768;
var _touchstart = ('ontouchstart' in document) ? 'touchstart' : 'mousedown';
var _touchend = ('ontouchend' in document) ? 'touchend' : 'mouseup';
var _touchmove = ('ontouchmove' in document) ? 'touchmove' : 'scroll';
var mousewheelevent = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
var isOnMouseShort = false;

//ブラウザ判定
(function(e,b,a,d){if("ontouchend" in document){d.className+=" touchevents"}else{d.className+=" no-touchevents"}if("pointer-events" in document.createElement("div").style){d.className+=" pointer-events"}else{d.className+=" no-pointer-events"}if(~a.indexOf("win")){d.className+=" os-windows"}else{d.className+=" os-mac"}if((~e.indexOf("iphone")&&!~e.indexOf("ipad"))||~e.indexOf("ipod")){d.className+=" os-iOS"}if(~e.indexOf("android")){d.className+=" os-android"}if(!~e.indexOf("iphone")||!~e.indexOf("ipad")){d.className+=" not-apple-device"}if(~e.indexOf("ipad")){d.className+=" ipad"}if(~e.indexOf("safari")&&!~e.indexOf("chrome")){d.className+=" safari"}else{d.className+=" not-safari"}if(~e.indexOf("chrome")&&!~e.indexOf("edge")){d.className+=" chrome"}else{d.className+=" not-chrome"}var c=~e.indexOf("msie")&&!~e.indexOf("opera");if(~e.indexOf("trident/7.0")||~e.indexOf("msie")||~e.indexOf("edge")){d.className+=" ie"}else{d.className+=" not-ie"}if(c&&~b.indexOf("msie 9.")){d.className+=" ie9"}if(c&&~b.indexOf("msie 10.")){d.className+=" ie10"}if(~e.indexOf("trident/7")){d.className+=" ie11"}if(~e.indexOf("edge")){d.className+=" edge"}}(navigator.userAgent.toLowerCase(),navigator.appVersion.toLowerCase(),navigator.platform.toLowerCase(),document.documentElement));

//consoleがあるかどうかチェックし、無ければエラーを吐かないようにする
if(!window.console){window.console={log:function(a){}}};

var Common = {
	//高さや幅を揃える関数
	MutationObserver:('MutationObserver' in window)
	,
	sortElementStyle:function(targetVal/* 属性名 */, type/* 揃えるスタイル */, compareVals, i){//指定された要素とスタイルと値をそろえる関数
		//比較する要素をcompareValsに突っ込む
		compareVals = {};

		var elements = document.querySelectorAll('['+targetVal+']');
		for(i = 0; i < elements.length; i = 0|i+1){
			if(!compareVals[elements[i].getAttribute(targetVal)]){
				compareVals[elements[i].getAttribute(targetVal)] = [];
			}
			compareVals[elements[i].getAttribute(targetVal)].push(elements[i]);
		}
		//compareValsを捜査して、一番値が大きい値を、targetVal要素に設定
		for(var key in compareVals){
			(function(compareVal, i) {
				var cmp = [];
				var style = compareVal[0].currentStyle || window.getComputedStyle(compareVal[0]);
				if(type == 'width'){
					if(Common.MutationObserver) {
						(new MutationObserver(function (MutationRecords, MutationObserver) {
							for(i = 0; i < compareVal.length; i = 0|i+1){
								cmp.push(compareVal[i].clientWidth);
							}
							var maxV = Math.max.apply(null, cmp);
							if(style.boxSizing != 'border-box') {
								maxV = maxV - (parseInt(style.paddingLeft) + parseInt(style.paddingRight));
							}
							for(i = 0; i < compareVal.length; i = 0|i+1){
								compareVal[i].style.width = maxV + 'px';
								compareVal[i].style.WebkitTransition = '';
								compareVal[i].style.transition = '';
							}
							MutationObserver.disconnect();
						})).observe(compareVal[0], {attributes:true, attributeFilter:["class","style"]});
					}else{
						setTimeout(function(){
							for(i = 0; i < compareVal.length; i = 0|i+1){
								cmp.push(compareVal[i].clientWidth);
							}
							var maxV = Math.max.apply(null, cmp);
							if(style.boxSizing != 'border-box') {
								maxV = maxV - (parseInt(style.paddingLeft) + parseInt(style.paddingRight));
							}
							for(i = 0; i < compareVal.length; i = 0|i+1){
								compareVal[i].style.width = maxV + 'px';
								compareVal[i].style.WebkitTransition = '';
								compareVal[i].style.transition = '';
							}
						}, 400);
					}

					for(i = 0; i < compareVal.length; i = 0|i+1){
						compareVal[i].style.width = 'auto';
						compareVal[i].style.WebkitTransition = 'none';
						compareVal[i].style.transition = 'none';
					}
				}else if(type == 'height'){
					if(Common.MutationObserver) {
						(new MutationObserver(function (MutationRecords, MutationObserver) {
							for(i = 0; i < compareVal.length; i = 0|i+1){
								cmp.push(compareVal[i].clientHeight);
							}
							var maxV = Math.max.apply(null, cmp);
							if(style.boxSizing != 'border-box') {
								maxV = maxV - (parseInt(style.paddingTop) + parseInt(style.paddingBottom));
							}
							for(i = 0; i < compareVal.length; i = 0|i+1){
								compareVal[i].style.height =  maxV + 'px';
							}
							MutationObserver.disconnect();
						})).observe(compareVal[0], {attributes:true, attributeFilter:["class","style"]});
					}else{
						setTimeout(function(){
							for(i = 0; i < compareVal.length; i = 0|i+1){
								cmp.push(compareVal[i].clientHeight);
							}
							var maxV = Math.max.apply(null, cmp);
							if(style.boxSizing != 'border-box') {
								maxV = maxV - (parseInt(style.paddingTop) + parseInt(style.paddingBottom));
							}
							for(i = 0; i < compareVal.length; i = 0|i+1){
								compareVal[i].style.height =  maxV + 'px';
							}
						}, 400);
					}

					for(i = 0; i < compareVal.length; i = 0|i+1){
						compareVal[i].style.height = 'auto';
						compareVal[i].style.WebkitTransition = 'none';
						compareVal[i].style.transition = 'none';
					}
				}
			}(compareVals[key]));
		}
		return false;
	}
	,
	setAlignElem:function(i){
		
		//PCとSP両方の高さや幅を揃える
		//一度高さや幅をリセットする
		var elements = document.querySelectorAll('[data-autowidth]');
		for(i = 0; i < elements.length; i = 0|i+1){
			elements[i].style.width = '';
		}
		var elements = document.querySelectorAll('[data-autoheight]');
		for(i = 0; i < elements.length; i = 0|i+1){
			elements[i].style.height = '';
		}
		//PCとSP両方を常時揃える処理を設定
		Common.sortElementStyle('data-autowidth', 'width');
		Common.sortElementStyle('data-autoheight', 'height');
		
		if(640 < window.innerWidth){//pc
			//SPを一度高さや幅をリセットする
			var elements = document.querySelectorAll('[data-autowidth-sp]');
			for(i = 0; i < elements.length; i = 0|i+1){
				elements[i].style.width = '';
			}
			var elements = document.querySelectorAll('[data-autoheight-sp]');
			for(i = 0; i < elements.length; i = 0|i+1){
				elements[i].style.height = '';
			}
			Common.sortElementStyle('data-autowidth-pc', 'width');
			Common.sortElementStyle('data-autoheight-pc', 'height');
		}else{//smart
			//PCを一度高さや幅をリセットする
			var elements = document.querySelectorAll('[data-autowidth-pc]');
			for(i = 0; i < elements.length; i = 0|i+1){
				elements[i].style.width = '';
			}
			var elements = document.querySelectorAll('[data-autoheight-pc]');
			for(i = 0; i < elements.length; i = 0|i+1){
				elements[i].style.height = '';
			}
			Common.sortElementStyle('data-autowidth-sp', 'width');
			Common.sortElementStyle('data-autoheight-sp', 'height');
		}
	}
	,
	//URLパラメータを取得し配列に格納
	urlParams:(function(){
		var obj = {};
		var pair = location.search.substring(1).split('&');
		for(var i = 0; pair[i]; i++) {
			var kv = pair[i].split('=');
			obj[kv[0]]=kv[1];
		}

		//stat.js
		if('fps' in obj) {
			var script = document.createElement('script');
			script.onload = function() {
				var stats = new Stats();
				document.body.appendChild(stats.dom);
				requestAnimationFrame(function loop() {
					stats.update();
					requestAnimationFrame(loop)
				});
			};
			script.src = '//rawgit.com/mrdoob/stats.js/master/build/stats.min.js';
			document.head.appendChild(script);
		}
		
		return obj;
	}())
	,
	setloadfileEvent:function(targets, i,j){
		var targets = document.querySelectorAll('[data-lf-area]');
		for (i = 0; i < targets.length; ++i) {
			targets[i].setAttribute('data-lf-area', '0');
			targets[i].setAttribute('data-lf-area-ok', '');
		}
		Common.inview('[data-lf-area]', function(ele){
			var w = window.innerWidth,//画面幅
				itemsLen = 0,//読み込む数
				items = ele.querySelectorAll('[data-lf]'),//読み込む要素を調査
				itemsTarget = [],//読み込む要素の対象
				itemsTargetPath = [],//読み込む要素の画像パス
				loadCounter = 0;//読み込みをカウント
			
			//読み込む対象を選択
			var checkItems = function(elem){
				if(elem.getAttribute('data-lf')) {//data-lfに読み込む画像のパスがある場合
					itemsTarget.push(elem);
					itemsTargetPath.push(elem.getAttribute('data-lf'));
					itemsLen += 1;
				}else{
					if(640 < w && elem.hasAttribute('data-lf-pc')) {//SPサイズの時　＆　PC のときの画像パスが指定されている場合
						itemsTarget.push(elem);
						itemsTargetPath.push(elem.getAttribute('data-lf-pc'));
						itemsLen += 1;
					}else if(w <= 640 && elem.hasAttribute('data-lf-sp')) {//SPサイズの時　＆　SPのときの画像パスが指定されている場合
						itemsTarget.push(elem);
						itemsTargetPath.push(elem.getAttribute('data-lf-sp'));
						itemsLen += 1;
					}else{
					}
				}
			}
			
			//調査
			for(var i = 0; i < items.length; i++) {
				checkItems(items[i]);
			}
			checkItems(ele);
			
			//カウントをチェックして全て読み込めば実行
			var checkCount = function(){
				loadCounter += 1;
				if(itemsLen <= loadCounter) {
					//読み込みエリアに１を付与
					ele.setAttribute('data-lf-area', '1');
					
					//読み込みエリアにイベント発火
					var event  = document.createEvent('CustomEvent');
					event.initCustomEvent('loadfileComplete', false, false, {});
					ele.dispatchEvent(event);
				}
			};
			
			//読み込み
			for(var i = 0; i < itemsTarget.length; i++) {
				(function(target, path, image){
					var imageLoadFunc = function(){
						switch(target.tagName){
							case 'IMG':
								target.src = image.src;
								break;
							default:
								target.style.backgroundImage = 'url('+image.src+')';
								break;
						}
						checkCount();
						this.removeEventListener("load", imageLoadFunc);
					}
					image.addEventListener("load", imageLoadFunc);
					image.src = path;
				}(itemsTarget[i], itemsTargetPath[i], new Image()));
			}
		});
		
		return targets;
	}
	,
	inview_target:[]
	,
	inview_target_fromS:[]
	,
	inview_target_toS:[]
	,
	inview_enter:[]
	,
	inview_leave:[]
	,
	inview_once:[]
	,
	inview_viewstate:[]
	,
	intersectionObserverFlg:('IntersectionObserver' in window)
	,
	pxcelValueFromObject:function(value){
		if(typeof (value) == 'string' || value instanceof String) {
			if(value.indexOf('%') != -1) {
				value = window.innerHeight * (value.split('%')[0]/100) + 'px';
			}else if(value.indexOf('px') != -1) {
				value = value;
			}else{
				value = value + 'px';
			}
		}else if(!isNaN(value)) {
			value = value + 'px';
		}else{
			value = null;
		}
		return value;
	}
	,
	inview:('IntersectionObserver' in window)?
		function(target, enter, leave, rootMargin){
			var targets;
			if(typeof target == 'string') {
				targets = document.querySelectorAll(target);
			}else if(target.length){
				targets = target;
			}else{
				targets = [];
				targets.push(target);
			}
			for(var i = 0; i < targets.length; i++) {
				(function(target) {
					(new IntersectionObserver(
						leave?
							function(entries, observer){
								if(entries[0].isIntersecting) {//見えた
									enter(entries[0].target);
								}else{//見えないとき
									leave(entries[0].target);
								}
							}
							:
							function(entries, observer){
								if(entries[0].isIntersecting) {//見えた
									enter(entries[0].target);
									observer.disconnect();
								}
							}
						,
						{threshold: [0.0, 0.01], rootMargin:(rootMargin == '0px' || rootMargin == '0' || rootMargin === null || rootMargin === undefined)?'400px':Common.pxcelValueFromObject(rootMargin)}
				 	)).observe(target);
				}(targets[i]));
			}
		}
		:
		function(target, enter, leave){
			var newIndex,
				h = window.innerHeight;
			var vals;
			if(typeof target == 'string') {
				vals = document.querySelectorAll(target);
			}else if(target.length){
				vals = target;
			}else{
				vals = [];
				vals.push(target);
			}
			for(var i = 0; i < vals.length; i++) {
				newIndex = Common.inview_target.length;
				Common.inview_target[newIndex] = vals[i];
				Common.inview_target_fromS[newIndex] = window.pageYOffset + Common.inview_target[newIndex].getBoundingClientRect().top - h;
				Common.inview_target_toS[newIndex] = Common.inview_target[newIndex].clientHeight + Common.inview_target_fromS[newIndex] + h;
				Common.inview_enter[newIndex] = enter;
				Common.inview_leave[newIndex] = leave;
				Common.inview_once[newIndex] = leave?false:true;
				Common.inview_viewstate[newIndex] = 0;
			}

			if(document.createEvent){
				setTimeout(function(){
					var b=document.createEvent("HTMLEvents");
					b.initEvent('resize',true,true);
					window.dispatchEvent(b);
					b=document.createEvent("HTMLEvents");
					b.initEvent('scroll',true,true);
					window.dispatchEvent(b);
				}, 1)
			}else{
				window.fireEvent('onresize',document.createEventObject());
				window.fireEvent('onscroll',document.createEventObject());
			}
		}
	,
	scrollFunction:[]
	,
	scrollIDs:[]
	,
	scrollFunctionLength:0
	,
	resizeFunction:[]
	,
	resizeIDs:[]
	,
	addScroll:function(func, funcID){
		Common.scrollIDs.push(funcID?funcID:'');
		Common.scrollFunction.push(func);
		Common.scrollFunctionLength = Common.scrollFunction.length;
		func(window.innerWidth, window.innerHeight, window.pageYOffset);
	}
	,
	removeScroll:function(funcID){
		if(funcID != '' && funcID != null && funcID != undefined) {
			for(var i = 0; i < Common.scrollIDs.length; i++) {
				if(Common.scrollIDs[i] == funcID) {
					Common.scrollFunction.splice(i, 1);
					Common.scrollIDs.splice(i, 1);
					break;
				}
			}
		}
	}
	,
	addResize:function(func, funcID){
		Common.resizeIDs.push(funcID?funcID:'');
		Common.resizeFunction.push(func);
		func(window.innerWidth, window.innerHeight);
	}
	,
	removeResize:function(funcID){
		if(funcID != '' && funcID != null && funcID != undefined) {
			for(var i = 0; i < Common.resizeIDs.length; i++) {
				if(Common.resizeIDs[i] == funcID) {
					Common.resizeFunction.splice(i, 1);
					Common.resizeIDs.splice(i, 1);
					break;
				}
			}
		}
	}
	,
	addLoad:function(func){
		if(document.readyState == 'complete') {
			func();
		}else{
			window.addEventListener('load', function onload(){
				func();
				window.removeEventListener('load', onload);
			});
		}
	}
};

//一度のみ処理
(function() {
	var w = window.innerWidth,
		h = window.innerHeight,
		s
	;
	
	//スクロールevent
	var scrollEventFunc;
	(function() {
		var i, _window = window;
		scrollEventFunc = function(b,target){
			s = _window.pageYOffset;

			//一括処理登録の関数
			for(i = 0; i < Common.scrollFunctionLength; i = 0|i+1) {
				Common.scrollFunction[i](w,h,s);
			}
		};
		window.addEventListener('scroll', scrollEventFunc);
		scrollEventFunc();
	}());
	
	//intersectionObserverが効かないときのインビューevent
	(function() {
		if(Common.intersectionObserverFlg) {//intersectionObserverが有効
		}else{
			var i;
			Common.addScroll(function(w,h,s){
				for(i = 0; i < Common.inview_target.length; i = 0|i+1) {
					if(Common.inview_target_fromS[i] < s && s < Common.inview_target_toS[i]) {//見えたとき
						if(Common.inview_viewstate[i] !== 2) {//見えてない状態だったとき
							Common.inview_viewstate[i] = 2;
							Common.inview_enter[i](Common.inview_target[i]);
							if(Common.inview_once[i]) {//一度だけの処理の設定のとき
								Common.inview_target.splice(i, 1);
								Common.inview_target_fromS.splice(i, 1);
								Common.inview_target_toS.splice(i, 1);
								Common.inview_enter.splice(i, 1);
								Common.inview_leave.splice(i, 1);
								Common.inview_once.splice(i, 1);
								Common.inview_viewstate.splice(i, 1);
								i--;
							}
						}
					}else{//見えないとき
						if(Common.inview_viewstate[i] !== 1) {//見えてる状態だったとき
							Common.inview_viewstate[i] = 1;
							if(Common.inview_leave[i]) {//leave関数があるとき
								Common.inview_leave[i](Common.inview_target[i]);
							}
						}
					}
				}
			});
		}
	}());
	
	//リサイズevent
	(function() {
		var resizeEventFunc,i;
		resizeEventFunc = function(){
			w = window.innerWidth,
			h = window.innerHeight;

			//揃える
			Common.setAlignElem();
			
			//inviewの位置登録
			for(i = 0; i < Common.inview_target.length; i = 0|i+1) {
				Common.inview_target_fromS[i] = window.pageYOffset + Common.inview_target[i].getBoundingClientRect().top - h;
				Common.inview_target_toS[i] = Common.inview_target[i].clientHeight + Common.inview_target_fromS[i] + h;
			}
			
			//一括処理登録の関数
			for(i = 0; i < Common.resizeFunction.length; i = 0|i+1) {
				Common.resizeFunction[i](w,h);
			}
			scrollEventFunc();
		};

		window.addEventListener('resize', resizeEventFunc);
		
		resizeEventFunc();
	}());
	
	//メディアクエリevent
	(function() {
		if(typeof window.matchMedia == "function"){//IE10以降対応
			var mql = window.matchMedia('screen and (max-width: 720px)');
			var checkBreakPoint = function(mql) {
				/*
				if (mql.matches){// スマホ向け
				}else{// PC向け
				}
				*/
				
				//data-lf-area 要素を読み込む
				Common.setloadfileEvent(document.querySelectorAll('[data-lf-area]'));
			}
			// ブレイクポイントの瞬間に発火
			mql.addListener(checkBreakPoint);
			// 初回チェック
			checkBreakPoint(mql);
		}else{//レガシーブラウザ対応
			var switchResizeInit = true,
				switchResizeName = '';
			Common.addResize(function(w,h){
				if(720 < w){//pc
					//PCかスマホか切り替わった判定
					if(switchResizeName != 'pc'){
						switchResizeName = 'pc';
						switchResizeInit = true;
					}
				}else{//smart
					//PCかスマホか切り替わった判定
					if(switchResizeName != 'sp'){
						switchResizeName = 'sp';
						switchResizeInit = true;
					}
				}

				//PCからスマホ、スマホからPCへ繊維したとき一度だけ実行
				if(switchResizeInit){
					switchResizeInit = false;

					//data-lf-area 要素を読み込む
					Common.setloadfileEvent(document.querySelectorAll('[data-lf-area]'));
				}
			});
		}
	}());
}());

//ページを読み込んだときの処理（複数実行可能）
Common.pageLoadedInit = function(){
	//電話
	(function() {
		var targets = document.querySelectorAll('[data-tel]:not([data-tel-ok])');
		for (var i = 0; i < targets.length; ++i) {
			targets[i].setAttribute('data-tel-ok', '');
			if('ontouchend' in document){//タッチデバイスのとき
				targets[i].setAttribute('href', 'tel:' + targets[i].getAttribute('data-tel').replace((new RegExp('-', "g")) ,''));
			}
			targets[i].innerHTML = targets[i].innerHTML.replace(/-/g, '<span class="hyphen">-</span>');
		}
	}());

	//遅延画像読み込み
	Common.setloadfileEvent(document.querySelectorAll('[data-lf-area]:not([data-lf-area-ok])'));
};
Common.pageLoadedInit();


$(function(){

	if( $(window).innerWidth()<bp ){
		minus = 0;
	}else{
		minus = 0;
	}

	/* smooth scroll */
	function smoothScroll(hash) {
		var target = $(hash).offset().top;
	
		$('body,html').stop().animate({
			scrollTop: target - minus
		}, 800, function() {
			$(this).unbind("mousewheel DOMMouseScroll");
		}).bind("mousewheel DOMMouseScroll", function() {
			$(this).queue([]).stop();
			$(this).unbind("mousewheel DOMMouseScroll");
		});
	}
	$('a[href^="#"], a[href^="' + location.pathname + '#"]').on('click', function() {
		var hash = $(this).attr("href");
		if(hash === "#"){
			return;
		}
		smoothScroll(hash);

			$(".mod-gnav,.mod-gnav-btn").removeClass('on');
			$(".mod-mainContent").removeClass("gnavOpen");
		
		return false;
	});

	var ua = navigator.userAgent.toLowerCase();
	var isMobile = /iphone/.test(ua)||/android(.+)?mobile/.test(ua);

	if (!isMobile) {

		$('a[href^="tel:"]').on('click', function(e) {
			e.preventDefault();
		});
		$('a[href^="tel:"]').css({"text-decoration":"none"});
	}

	

	$(".mod-gnav-btn,.mod-gnav-close").click(function(event) {
		if($(".mod-gnav").hasClass("on")){
			$(".mod-gnav-btn").removeClass("on");
			$(".mod-gnav").removeClass("on");
			$(".mod-mainContent").removeClass("gnavOpen");
		}else{
			$(".mod-gnav-btn").addClass("on");
			$(".mod-gnav").addClass("on");
			$(".mod-mainContent").addClass("gnavOpen");
		}
	});

	$(".mod-gnav-links-item").hover(function() {
		var n = $(".mod-gnav-links-item").index(this);
		$(".mod-megaNav-cats-item").removeClass('on');
		$(".mod-megaNav-cats-item").eq(n).addClass('on');
	}, function() {
	});
	$(".mod-header").hover(function() {
		$(".mod-megaNav-cats-item").removeClass('on');
	}, function() {
		$(".mod-megaNav-cats-item").removeClass('on');
	});


	/*------------------------
	lightbox
	------------------------*/
	if($("a.lightbox")[0]){
		$('a.lightbox').photoSwipe({
			"showAnimationDuration":400
		});
	}


	function fadeAnimation(){
		if($(window).scrollTop()>500 && !$("body").hasClass('is-scrolled')){
			$("body").addClass('is-scrolled');
		}else if($(window).scrollTop()<=500 && $("body").hasClass('is-scrolled')){
			$("body").removeClass('is-scrolled');
		}
		var winHeight = $(window).height();
		var $list = $('.mod-onScrollAddClass');
		$list.each(function(i){
			if( $(window).scrollTop()  + winHeight/2 > $list.eq(i).offset().top || $(window).scrollTop() + winHeight > $("body").innerHeight() - 30 ){
				$(this).addClass('on').dequeue();
			}
		});

	}
	fadeAnimation();
	$(window).on({
		'resize':function(){fadeAnimation();},
		'scroll':function(){fadeAnimation();}
	});

	if($(".home-mv-slide")[0]){
		$('.home-mv-slide').each(function() {
			$(this).slick({
				autoplay: true,
				autoplaySpeed: 3000,
				infinite: true,
				fade: false,
				speed: 600,
				// variableWidth: true,
				touchThreshold: 10,
				// centerMode: true,
				arrows: false,
				dots: false,
			});
		});

		$('.home-mv-slide').on("beforeChange", function(event, slick, currentSlide, nextSlide){
			$(".home-mv-thumbs-item").removeClass('on');
			$(".home-mv-thumbs-item").eq(nextSlide).addClass('on');
		});

		$(".home-mv-thumbs-item").click(function(event) {
			var n = $(".home-mv-thumbs-item").index(this);
			$(".home-mv-slide").slick("slickGoTo",n);
		});

		$(".home-mv-slide").slick("slickGoTo",0);

	}

	if($(".beginner-hospital-photo-photos")[0]){
		$('.beginner-hospital-photo-photos').each(function() {
			$(this).slick({
				autoplay: true,
				autoplaySpeed: 3000,
				infinite: true,
				// fade: true,
				speed: 600,
				variableWidth: true,
				touchThreshold: 10,
				centerMode: true,
				arrows: false,
				dots: false,
			});
		});
	}

	if($(".orthodontic-flow-span-secs")[0]){
		$('.orthodontic-flow-span-secs').each(function() {
			var $prevBtn = '<div class="orthodontic-flow-span-secs-slideBtn mod-slide-btn01 is-prev"><img src="/common2019/img/base/ico_arrow2_c1.svg" alt=""></div>';
			var $nextBtn = '<div class="orthodontic-flow-span-secs-slideBtn mod-slide-btn01 is-next"><img src="/common2019/img/base/ico_arrow2_c1.svg" alt=""></div>';
			$(this).slick({
				autoplay: true,
				autoplaySpeed: 3000,
				infinite: true,
				// fade: true,
				speed: 600,
				touchThreshold: 10,
				arrows: true,
				dots: false,
				prevArrow:$prevBtn,
				nextArrow:$nextBtn,
			});
		});
	}

	if($(".preventive-flow-maintenance-cats")[0]){
		$(".preventive-flow-maintenance-cats-item").click(function(event) {
			var n = $(".preventive-flow-maintenance-cats-item").index(this);
			$(".preventive-flow-maintenance-cats-item").removeClass('on');
			$(".preventive-flow-maintenance-cats-item").eq(n).addClass('on');
			$(".preventive-flow-maintenance-tab").removeClass('on');
			$(".preventive-flow-maintenance-tab").eq(n).addClass('on');
		});
		$(".preventive-flow-maintenance-cats-item").eq(0).trigger('click');
	}

	if($(".beginner-flow-first-tabNav")[0]){
		$(".beginner-flow-first-tabNav-item").click(function(event) {
			var n = $(".beginner-flow-first-tabNav-item").index(this);
			$(".beginner-flow-first-tabNav-item").removeClass('on');
			$(".beginner-flow-first-tabNav-item").eq(n).addClass('on');
			$(".beginner-flow-first-tabSec").removeClass('on');
			$(".beginner-flow-first-tabSec").eq(n).addClass('on');
		});
		$(".beginner-flow-first-tabNav-item").eq(0).trigger('click');
	}

	if($(".orthodontic-faq-sec-q")[0]){
		$(".orthodontic-faq-sec-q").click(function(event) {
			var n = $(".orthodontic-faq-sec-q").index(this);
			if($(this).hasClass("on")){
				$(this).removeClass('on');
				$(".orthodontic-faq-sec-a").eq(n).slideUp(400);
			}else{
				$(this).addClass('on');
				$(".orthodontic-faq-sec-a").eq(n).slideDown(400);
			}
		});
		$(".orthodontic-faq-sec-a-closeBtn").click(function(event) {
			var n = $(".orthodontic-faq-sec-a-closeBtn").index(this);
			$(".orthodontic-faq-sec-q").removeClass('on');
			$(".orthodontic-faq-sec-a").eq(n).slideUp(400);
		});
	}



	if($(".mod-gnav-foldingBtn-btn")[0]){
		$(".mod-gnav-foldingBtn-btn").click(function(event) {
			var n = $(".mod-gnav-foldingBtn-btn").index(this);
			if($(this).hasClass("on")){
				$(this).removeClass('on');
				$(".mod-gnav-links2").eq(n).slideUp(200);
			}else{
				$(this).addClass('on');
				$(".mod-gnav-links2").eq(n).slideDown(200);
			}
		});
	}

});



