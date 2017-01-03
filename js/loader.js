// 加载器
define(['jquery', 'pxloader', 'pxloaderimage'], function($, PxLoader, PxLoaderImage) {
  
	var init = function(assets,callback){
    var loader,percentage,preloader;
		loader = new PxLoader();
    percentage = $('#percentage');
		preloader = $('#preloader');
		preloader.show();
    $.each(assets,function(i){
      loader.addImage("images/" + assets[i]);
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
});