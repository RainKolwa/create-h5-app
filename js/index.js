var Xxjz = window.Xxjz || {};
var ROOT = "";
var API_ROOT = "";

var $window = $(window),
    windowWidth = $window.width(),
	  windowHeight = $window.height();

Xxjz.Assets = (function(){
	var baseAssets = [
    "badge_blue.png"
	];

	return {
		baseAssets: baseAssets,
	}
})();

// 加载器
Xxjz.Loader = (function(){
  
	var loader,percentage,preloader;
	
	function init(assets,callback){
		loader = new PxLoader();
    percentage = $('#percentage');
		preloader = $('#preloader');
		preloader.show();
		
    $.each(assets,function(i){
      loader.addImage("../images/" + assets[i]);
		}); 
		
    loader.addCompletionListener(function() { 
			preloader.fadeOut(1000,function(){
				percentage.text("0%");
				callback && callback();
			})
		});
		loader.addProgressListener(function(e) { 
    	percentage.text(Math.ceil(e.completedCount/e.totalCount * 100) + '%'); 
		}); 
		
		loader.start(); 
	}
	
	return {
		init : init	
	}
})();	

Xxjz.Main = (function(){
	function init(){
		$('#wrapper').height(windowHeight);
    // init modules
		Xxjz.Popup.init();
		Xxjz.Weixin.init();
    
    // start swiper
    var mySwiper = new Swiper ('.swiper-container', {
      direction: 'vertical',
      loop: false
    })
	}
  
  function start() {
    console.log('start')
            
  }
	
	return {
		init : init,
    start: start
	}
})();	

Xxjz.Dialog = (function(){

	var overlayer,
		dialog;

	var timer = null;
	var msg = "";

	function init(){
		overlayer = $('<div class="dialog-mask"></div>');
		dialog = $('<div class="dialog"></div>')
		overlayer.hide();
		dialog.hide();
		$('body').append(overlayer).append(dialog);
	}

	function show(msg){
		msg = msg;
		dialog.text(msg);
		overlayer.show();
		dialog.fadeIn();
		setTimeout(function(){
			overlayer.hide();
			dialog.fadeOut();
		},3000)
	}

	return {
		init : init,
		show : show
	}
})();

// 弹出框
Xxjz.Popup = (function(){
	
	var popups,
		overlayer;  //第一层弹出框遮罩层
		
	function init(){
		popups = $('.popup-panel');
		overlayer = $('.overlayer');
		popups.hide();
		bindEvent();
	}

	function bindEvent(){
		overlayer.on('touchstart', function(e){
      e.preventDefault();
      popups.fadeOut();
      overlayer.fadeOut();
    });
	}

	/*
		name : 弹出框名字 [name=xxx]
		needover : 是否需要显示半透明遮罩层，1为需要，其他值为不需要
		over : 是否为弹出层上的弹出层，1为需要，其他值为不需要
	*/
	function show(name,needover,over){
		var popup = popups.filter('[name='+name+']');
		popup.fadeIn();
		if(over){
			popup.css({zIndex: 41});
		}
		if(needover == 1){
			overlayer.fadeIn();
		}
		return this;
	}

	/*
		name : 弹出框名字 [name=xxx]，name="all"时则关闭全部弹出框
		needover : 是否需要隐藏半透明遮罩层，1为需要，其他值为不需要
		homebg : 是否弹出层全部关闭了，并且回到首页了（需开启首页动画背景），1为是，其他值为不是
		over : 是否为弹出层上的弹出层，1为需要，其他值为不需要
	*/
	function hide(name,needover,homebg,over){
		var popup = popups.filter('[name='+name+']');
		popup.fadeOut();
		if(over == 1){
			popup.css({zIndex: 21});
		}
		if(needover == 1){
			over ? overlayer2.fadeOut() : overlayer1.fadeOut();
		}
		if(name == 'all'){
			popups.hide();
			overlayer1.hide();
			overlayer2.hide();
		}
		return this;
	}

	return {
		init : init,
		show : show,
		hide : hide	
	}
})(); 

// 微信
Xxjz.Weixin = (function(){
	var iscreate = false;
	var defaultDesc = "快来制作专属你的初礼·GOO.N大王初生礼纸尿裤蛋糕吧！";
	var defaultTitle = "纸尿裤蛋糕DIY！";

	var wxData = {
		title: defaultTitle,
		link: ROOT,
		imgUrl: ROOT + 'images/sharePic.jpg' , 
		desc:defaultDesc,
		success: function () { 
			// if(iscreate){
			// 	Xxjz.Popup.show("ShareSucPanel",1,1).hide("ShareTips",0,0,1);
			// }
		},
		cancel: function () {  
		}	
	}
  
	var wxDataTimeline = {
		title: defaultDesc,
		link: ROOT,
		imgUrl:ROOT + 'images/sharePic.jpg' , 
		success: function () { 
			// if(iscreate){
			// 	Xxjz.Popup.show("ShareSucPanel",1,1).hide("ShareTips",0,0,1);
			// }
		},
		cancel: function () {  
		}	
	}

	function setShare(){
		wx.onMenuShareTimeline(wxDataTimeline);
		wx.onMenuShareAppMessage(wxData);
		wx.onMenuShareQQ(wxData);
		wx.onMenuShareWeibo(wxData);
	}

	function init(){
		$.ajax({
			type: "POST",
			dataType: "json",
			async: false,
			crossDomain: true,
			url : API_ROOT + "users/jssdk",
			success : function(result){
				var data = result.config;
				wx.config({
					debug: false,
					appId: data.appId,
					timestamp: data.timestamp,
					nonceStr: data.nonceStr,
					signature: data.signature,
					jsApiList: [
					  'checkJsApi',
					  'onMenuShareTimeline',
					  'onMenuShareAppMessage',
					  'onMenuShareQQ',
					  'onMenuShareWeibo',
					  'hideMenuItems',
					  'showMenuItems',
					  'hideAllNonBaseMenuItem'
					]
				});
			
				wx.ready(function () {
					setShare();
				});
			}
		});
	}

	return {
		init : init,
		setShare : setShare
	}
})();

// 启动项目
$(function() {
  // prevent default touch move event 
  document.addEventListener('touchmove', function(e){e.preventDefault()}, false);
  // start
	Xxjz.Main.init();
  Xxjz.Loader.init(Xxjz.Assets.baseAssets, Xxjz.Main.start);
});



