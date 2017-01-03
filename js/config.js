// config
define(['jquery'], function($) {
  var $window = $(window),
      windowWidth = $window.width(),
  	  windowHeight = $window.height();
  
  var assets = [
    "badge_blue.png"
	];
  
  var api = "";

	return {
    windowHeight: windowHeight,
		assets: assets,
    api: api
	}
})