(function(){

//
// script loading for jquery if not supported
//

var loadScript = function(url, callback){
 
  var script = document.createElement("script")
  script.type = "text/javascript";
 
  if (script.readyState){  //IE
    script.onreadystatechange = function(){
      if (script.readyState == "loaded" || script.readyState == "complete"){
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {  //Others
    script.onload = function(){
      callback();
    };
  }
 
  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);

};


//
// custom jquery
//

var customScripts = function($){

  /* homepage grid gallery scroller */

  var $scroller_exists = false;
  var $viewport_small = 750;

  if ($('.gallery-sroller').length > 0) {
    $scroller_exists = true;
    $('.gallery-sroller').click(function(){
      var $first_item = $('.gallery-scroller-list').find('li').first();
      var $last_item = $('.gallery-scroller-list').find('li').last();

      if($(this).hasClass('left')) {
        console.log($first_item);
        $('.gallery-scroller-list').prepend($last_item);
      } else if ($(this).hasClass('right')) {
        $('.gallery-scroller-list').append($first_item);
      }
    });
  }

  function adjustGalleryScroller(screen_width) {
    if (screen_width <= $viewport_small) {
      var $item_height = $('.gallery-scroller-list').find('.grid__item').outerHeight();
      $('.gallery-scroller-list').css('height', $item_height);
    }
  }

  adjustGalleryScroller($(window).width());


  /* browser size tests */

  $(window).resize(function(){
    var win = $(this); //this = window
  
    if ($scroller_exists) {
      adjustGalleryScroller(win.width());
    }
  });

};

//
// script loading for jquery if not supported
//

if ((typeof jQuery === 'undefined') || (parseFloat(jQuery.fn.jquery) < 1.7)) {

  loadScript('//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js', function(){
    jQuery191 = jQuery.noConflict(true);
    customScripts(jQuery191);
  });
} else {
  customScripts(jQuery);
}


//
// confirm this file was loaded
//

console.log('loaded custom scripts');
})();