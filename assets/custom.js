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

  /* homepage grid hover script */

  if ($('body').hasClass('template-index')) {

    $('.index-section ul.grid .product-card.has-hover-image').each(function(){

    });

  }

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