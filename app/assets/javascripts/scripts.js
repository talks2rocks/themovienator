// BeerCamp at SXSW 2011
// by nclud

/*jshint undef: true, curly: true, asi: false, browser: true, eqeqeq: true */

(function( window, document, $, Modernizr ){

// check if browser is iOS -> iPhone / iPad / iPod Touch
var isIOS = !!('createTouch' in document);

var transformProp = Modernizr.prefixed('transform');

// array of visited levels

var visited = [false,false,false,false,false,false];

// BeerCamp '11 Global constructor
// don't necessarily need the constructor, but I like using the 'this' keyword
function Beercamper() {
  // properties
  this.levels = 7;
  this.distance3d = 1670;
  
  
  // cache some jQuery objects
  this.$window = $(window);
  this.$document = $(document);
  
  // which method should be used to return CSS transform styles
  this.getScrollTransform = Modernizr.csstransforms3d ? 
    this.getScroll3DTransform : this.getScroll2DTransform;
  
  // bind constructor to window.scroll event
  if ( Modernizr.csstransforms ) {
    window.addEventListener( 'scroll', this, false);
  }
  
}

// enables constructor to be used within event listener
// like obj.addEventListener( eventName, this, false )
Beercamper.prototype.handleEvent = function( event ) {
  if ( this[event.type] ) {
    this[event.type](event);
  }
};

Beercamper.prototype.getScroll2DTransform = function( scroll ) {
  // 2D scale is exponential
  var scale = Math.pow( 3, scroll * (this.levels - 1) );
  return 'scale(' + scale + ')';
};

Beercamper.prototype.getScroll3DTransform = function( scroll ) {
  var z = ( scroll * (this.levels - 1) * this.distance3d ),
      // how close are we to the nearest level
      leveledZ = this.distance3d / 2 - Math.abs( ( z % this.distance3d ) - this.distance3d / 2 ),
      style;
  
  // if close to nearest level, 
  // ensures that text doesn't get fuzzy after nav is clicked
  if ( leveledZ < 5 ) {
    z = Math.round( z / this.distance3d ) * this.distance3d;
  }
  
  var y = -( scroll * (this.levels - 1) * this.distance3d* 0.121 ),
      // how close are we to the nearest level
      leveledY = this.distance3d / 2 - Math.abs( ( z % this.distance3d ) - this.distance3d / 2 ),
      style;
  
  // if close to nearest level, 
  // ensures that text doesn't get fuzzy after nav is clicked
  // if ( leveledY < 5 ) {
//     y = Math.round( y / this.distance3d ) * this.distance3d;
//   }
  
  return 'translate3d( 0, '+y+'px, ' + z + 'px )';
};

Beercamper.prototype.scroll = function( event ) {

  // normalize scroll value from 0 to 1
  this.scrolled = this.$window.scrollTop() / ( this.$document.height() - this.$window.height() );

  this.transformScroll( this.scrolled );

  // change current selection on nav
  this.currentLevel = Math.round( this.scrolled * (this.levels-1) );
  
  if ( this.currentLevel !== this.previousLevel && this.$nav ) {
    if( !visited[this.currentLevel]){
    $("body").trigger({
    type:"enterLevel",
    level: this.currentLevel });
    visited[this.currentLevel]= true;	
    }
    this.$nav.find('.current').removeClass('current');
    if ( this.currentLevel < 5 ) {
      this.$nav.children().eq( this.currentLevel ).addClass('current');
    }
    this.previousLevel = this.currentLevel;
  }
};

// where the magic happens
// applies transform to content from position of scroll
Beercamper.prototype.transformScroll = function( scroll ) {
  // bail out if content is not there yet
  if ( !this.$content ) {
    return;
  }

  var style = {};
  style[ transformProp ] = this.getScrollTransform( scroll );
  this.$content.css( style );
};



Beercamper.prototype.webkitTransitionEnd = function( event ) {
  this.transitionEnded( event );
};

Beercamper.prototype.transitionend = function( event ) {
  this.transitionEnded( event );
};

Beercamper.prototype.oTransitionEnd = function( event ) {
  this.transitionEnded( event );
};

// disables transition after nav click
Beercamper.prototype.transitionEnded = function( event ) {
  this.$content.removeClass('transitions-on');
  this.$content[0].removeEventListener( 'webkitTransitionEnd', this, false );
  this.$content[0].removeEventListener( 'transitionend', this, false );
  this.$content[0].removeEventListener( 'oTransitionEnd', this, false );
};

//Yoel functions 

//loops the scroll text up and down
function loop(){
$("#scroll-message").children("img").addClass("down",1000).removeClass("down",1000, function(){loop();});
}


$(document).ready(function(){

  // BeerCamp '11 Global object
  // initialize Beercamper
  var BCXI = new Beercamper();

  BCXI.$content = $('#content');
  BCXI.$nav = $('#nav');

  var $body = $('body'),
      iOSclass = isIOS ? 'ios' : 'no-ios';

  $body.addClass( iOSclass );

  if ( Modernizr.csstransforms ) {
    $('.page-nav').each(function(){
      this.addEventListener( 'click', BCXI, false );
    });
  }
  //Stuff That Yoel Added
  
  setTimeout(function(){
  $("#scroll-message").children("img").addClass("visible", 2000);	
  loop();
  }, 2000);
  
  
  //stuff that happens when first entering a level
  $("html").on("enterLevel","body", function(event){ 
    if(event.level==1){
      // lock scroll position, but retain settings for later
      var scrollPosition = [
        self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
        self.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop
      ];
      var html = jQuery('html'); // it would make more sense to apply this to body, but IE7 won't have that
      html.data('scroll-position', scrollPosition);
      html.data('previous-overflow', html.css('overflow'));
      html.css('overflow', 'hidden');
      window.scrollTo(scrollPosition[0], scrollPosition[1]);
      
      
      setTimeout(function(){
        $("#reclining_zog").animate({ opacity: 1, top: "-96px" },500);
        $("#tagline").addClass("visible", 800);
      }, 2500);
      
      setTimeout(function(){
      $('html, body').animate({
        scrollTop: $("#featuring").offset().top
      }, 500);
      },1000);
// setTimeout(function(){
//       // un-lock scroll position
      // var html = jQuery('html');
//       var scrollPosition = html.data('scroll-position');
//       html.css('overflow', html.data('previous-overflow'));
//       window.scrollTo(scrollPosition[0], scrollPosition[1])
//       },5000);
      setTimeout(function(){
        $("#reclining_zog").animate({ opacity: 0},500);
        $("#tagline").animate({opacity:0},500);
        $("#logo").animate({opacity:0},500);
        $("#video").animate({opacity:1},1000);
        $("#top-navbar").animate({top:0},500);
      }, 5000);
      
    }
    else if (event.level==2){
      
      console.log("2 man");
    }
    else if (event.level==3){
      
    console.log("3 man");
    }
  });
  
});


})( window, window.document, window.jQuery, window.Modernizr );