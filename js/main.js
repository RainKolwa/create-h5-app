require.config({
  paths: {
    "jquery": "../node_modules/jquery/dist/jquery.min",
    "pxloader": "../node_modules/pxloader/PxLoader",
    "pxloaderimage":  "../node_modules/pxloader/PxLoaderImage",
    "swiper": "../node_modules/swiper/dist/js/swiper.min",
    "tweenmax": "../node_modules/gsap/src/minified/TweenMax.min",
    "timelinemax": "../node_modules/gsap/src/minified/TimelineMax.min",
　},
  shim: {
    "pxloaderimage": {
      deps: ["pxloader"]
    },
    "tweenmax": {
      exports: "TweenMax"
    },
    "timelinemax": {
      exports: "TweenlineMax"
    }
  }
});

require(['jquery', 'loader', 'config', 'swiper', 'page'], function ($, loader, config, Swiper, Page){
  // init 
  Page.init(0);
  Page.init(1);
  Page.init(2);
  
  var start = function() {
    $('#wrapper').height(config.windowHeight);
    
    // init swiper
    var mySwiper = new Swiper ('.swiper-container', {
      direction: 'vertical',
      loop: false
    });
    
    Page.start(0);
    
    mySwiper.on('slideChangeStart', function (swiper) {
      Page.start(swiper.activeIndex)
    });
  };
  
  // init loader
  loader.init(config.assets, start());
});