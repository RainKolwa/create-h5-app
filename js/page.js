define(['jquery', 'tweenmax'], function($, TweenMax) {
  var slide = $('#wrapper >div').find('.swiper-slide');
  var init = function(index) {
    var page = slide.eq(index);
    TweenMax.set(page.find('span'), {opacity: 0, x: -100})
  }
  
  
  
  var start = function(index) {
    var page = slide.eq(index);
    TweenMax.to(page.find('span'), 1, {opacity: 1, x: 0})
  };
  
  var firstPage = function() {
    function init() {
      var page = slide.eq(0);
      TweenMax.set(page.find('span'), {opacity: 0, x: -100})
    }
    
    function start() {
      
    }
    
    return {
      init: init,
      start: start
    }
  }
  
  return {
    init: init,
    start: start
  }
})