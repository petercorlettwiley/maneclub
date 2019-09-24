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


  /* instagram images on homepage -- change link */

  $(document).on('click', 'a.rap__med__wrap__inside', function(e){ 
    e.preventDefault(); 
    var url = 'https://www.instagram.com/maneclubnyc/';//$(this).attr('href'); 
    window.open(url, '_blank');
  });


  /* EU cookie banner */

  var settings = {};

  $.cookieMessage = function (options) {
    var defaults = {
      mainMessage: "",
      acceptButton: "Accept",
      expirationDays: 20,
      backgroundColor: '#000',
      fontSize: '16px',
      fontColor: 'white',
      btnBackgroundColor: '#fc0000',
      btnFontSize: '16px',
      btnFontColor: 'white',
      linkFontColor: '#ffff00',
      cookieName: 'cookieMessage'
    };

    settings = $.extend( {}, defaults, options );
    ready();
  }

  function ready() {
    var coo = getCookie(settings.cookieName);
    if (coo != "true") {
      $(document).ready(function() {
        cookieMessageGenerate();
      })
    }
  }

  function setCookie(c_name, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = c_name + "=" + c_value;
  }

  function getCookie(c_name) {
    var i, x, y, ARRcookies = document.cookie.split(";");
    for (i = 0; i < ARRcookies.length; i++) {
      x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
      y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
      x = x.replace(/^\s+|\s+$/g, "");
      if (x == c_name) {
        return unescape(y);
      }
    }
  }

  function cookieMessageGenerate() {
    var html = '<div id="cookie-msg">'+
      '<span class="msg">'+settings.mainMessage+
      '<a href="" class="btn-accept">'+settings.acceptButton+'</a>'+
      '</span></div>';

    $("body").append(html);

    $("#cookie-msg").css({
      'position': 'fixed',
      'bottom': '0',
      'z-index': '999',
      'width': '100%',
      'text-align': 'center',
      'padding': '30px 50px',
      'background-color': settings.backgroundColor,
      'color': settings.fontColor,
      'font-size': settings.fontSize,
    });

    $("#cookie-msg a").css({
      'color': settings.linkFontColor,
      'text-decoration': 'underline',
    });

    $("#cookie-msg a.btn-accept").css({
      'padding': '2px 8px',
      'border-radius': '1px',
      'margin-left': '0.5em',
      'border': '1px solid white',
      'background-color': settings.btnBackgroundColor,
      'color': settings.btnFontColor,
      'font-size': settings.btnFontSize,
      'font-family': 'Poppins,sans-serif',
      'font-weight': 'bold',
      'text-decoration': 'none',
      'cursor': 'pointer'
    });

    $("#cookie-msg a.btn-accept").hover(function(e){
      $(this).css(
        'background-color',
        e.type === "mouseenter"?"#c90000":"#fc0000");
    });

    $("#cookie-msg a.btn-accept").on("click", function(){
      var coo = setCookie(settings.cookieName, true, settings.expirationDays);
      $("#cookie-msg").remove();

      return false;
    })
  }

  $.cookieMessage({
    'mainMessage': 'This website uses cookies. By using this website you consent to our use of these cookies. ',
    'acceptButton': 'GOT IT',
    'fontSize': '16px',
    'btnFontSize': '14px',
    'backgroundColor': '#000',
  });

  $('a').filter(function() {
   return this.hostname && this.hostname !== location.hostname;
}).attr("target","_blank");

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