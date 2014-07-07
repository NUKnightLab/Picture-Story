/**
	Bootstrap Project Template
	Designed and built by Zach Wise at VéritéCo
*/  

/*	Required Files
	CodeKit Import
	http://incident57.com/codekit/
================================================== */

// @codekit-prepend "source/jquery.smooth-scroll.js";
// @codekit-prepend "source/jquery.easing.1.3.js";

// @codekit-prepend "source/bootstrap/transition.js";
// @codekit-prepend "source/bootstrap/scrollspy.js";
// @codekit-prepend "source/bootstrap/tab.js";
// @codekit-prepend "source/bootstrap/tooltip.js";
// @codekit-prepend "source/bootstrap/carousel.js";
// @codekit-prepend "source/bootstrap/collapse.js";
// @codekit-prepend "source/bootstrap/modal.js";
// @codekit-prepend "source/bootstrap/dropdown.js";
// @codekit-prepend "source/bootstrap/affix.js";

// @codekit-prepend "source/waypoints.js";
// @codekit-prepend "source/waypoints-sticky.js";

// "source/jquery.fancybox.js"; 
// "source/jquery.fancybox-thumbs.js";

// @codekit-prepend "source/jquery.fluidbox.js"; 

// @codekit-prepend "source/jquery.laziestloader.js";

$(document).ready(function(){
	var _speed = 500,
		_story_nav_active = true,
		_has_story_cover = false,
		_story_cover_height = 100;
	
	// TITLE
	var the_title = $("h1").html();
	$( "#navbar-title" ).html( the_title );
	
	/*	STORY COVER
	================================================== */
	if ($('#story-cover').length ) {
		
		_has_story_cover = true;
		
		_story_cover_height = $( window ).height();
		
		$('#story-cover').height(_story_cover_height);
		
		$( window ).resize(function() {
			_story_cover_height = $( window ).height();
			$('#story-cover').height(_story_cover_height);
		});
		
		$('article').waypoint({
			handler: function(direction) {
			
				if (direction === "up") {
					//$('.story-cover-image').css("opacity", "1");
					$('.story-cover-content').css("opacity", "1");
					navbarChange(false);
				}
				if (direction === "down") {

					//$('.story-cover-image').css("opacity", "0");
					$('.story-cover-content').css("opacity", "0");
					navbarChange(true);
				}
			 
			},
			offset:100
		});

		$('.story-cover-arrow').click(function() {
			$.smoothScroll({
				scrollElement: $('body'),
				scrollTarget: 'article'
			});
		});
		
	} else {
		
		$('#navbar-product').addClass('no-cover');
		
		$('article').waypoint({
			handler: function(direction) {
			
				if (direction == "down") {
					$('#navbar-product').addClass('in-article');
				} else if (direction == "up") {
					$('#navbar-product').removeClass('in-article');
				}
			 
			},
			offset:-2
		});
	}
	
	/*	NAV BAR STATE
	================================================== */
	function showNavbarStories(show) {
		if (show) {
			$("#navbar-story").animate({
			  marginTop:"0px"
			}, _speed, "easeInOutCubic");
			_story_nav_active = true;
		} else {
			$("#navbar-story").animate({
			  marginTop:-$("#navbar-story").height()//"-254px"
			}, _speed, "easeInOutCubic");
			_story_nav_active = false;
		}
	}
	
	function navbarChange(in_article) {
		var animate_props = {
			
		}
		if (in_article) {
			animate_props.opacity = "0";
			animate_props.marginTop = "0";
		} else {
			animate_props.opacity = "1";
			animate_props.marginTop = "-56px";
		}
		
		$("#navbar-product").animate(animate_props, _speed/2, "easeInOutCubic", function() {
			
			if (in_article) {
				$('.knightlab-logo img').attr('src', '../css/knightlab-logo-diamond-190.png');
				$('#navbar-product').addClass('in-article');
				$('#navbar-product').css('marginTop', '-56px');
				$("#navbar-product").animate({
					marginTop:"0px",
					opacity:"1"
				}, _speed, "easeInOutCubic");
			} else {
				//$('img.knightlab-logo').attr('src', '../css/kngihtlab-logo-NOtagline.png');
				$('.knightlab-logo img').attr('src', '../css/knightlab-logo-diamond-190.png');
				$('#navbar-product').removeClass('in-article');
				$('#navbar-product').css('opacity', '0');
				$('#navbar-product').css('marginTop', '0');
				$("#navbar-product").animate({
					opacity:"1"
				}, _speed*2, "easeInOutCubic");
			}
			

  
		});
		
	}
	
	/*	NAVIGATION NAVBAR STORIES
	================================================== */
	showNavbarStories(false);
	
	$('#stories-btn').click(function() {
		event.preventDefault();
		if (_story_nav_active) {
			showNavbarStories();
		} else {
			showNavbarStories(true);
		}
		
	});
	
	
	/*	Way Point Article
	================================================== */
	$('article').waypoint({
	  handler: function(direction) {
		  if (direction == "down") {
			  console.log("DOWN");

			  $(".navbar-secondary").animate({
				  top:"-250px"
			  }, _speed, "easeInOutCubic");
			  
			  //var the_title = $("h1").html();
			  
			  /*
			  $("#title-bar-title").animate({
				  opacity:"0"
			  }, _speed, "easeInOutCubic", function() {
				  $( "#title-bar-title" ).html( the_title );
				  $("#title-bar-title").animate({
					  opacity:"1"
				  }, _speed/2, "easeInOutCubic");
				  $(".navbar-header img").animate({
					  opacity:"1"
				  }, _speed/2, "easeInOutCubic");
			  });
			  */
			  $( ".navbar-header img" ).animate({
				  opacity:"0"
			  }, _speed/2, "easeInOutCubic", function() {
				  
			  });
			  
		  } else if (direction == "up") {
			  console.log("UP");
			  
			  $(".navbar-secondary").animate({
				  top:"34px"
			  }, _speed, "easeInOutCubic");
			  
			  $(".navbar-header img").animate({
				  opacity:"0"
			  }, _speed, "easeInOutCubic", function() {
				  $(".navbar-header img").animate({
					  opacity:"1"
				  }, _speed/2, "easeInOutCubic");
			  
			  });
			  
			  /*
			  $("#title-bar-title").animate({
				  opacity:"0"
			  }, _speed, "easeInOutCubic", function() {
				  $( "#title-bar-title" ).html("Picture Story");
				  $("#title-bar-title").animate({
					  opacity:"1"
				  }, _speed/2, "easeInOutCubic");
			  });
			  */
		  }
	  },
	  offset:154
	});
	
	/*	On Scroll
	================================================== */
	$( window ).scroll(function() {
		 
		if (_has_story_cover) {
			var current_scroll = $("body").scrollTop(),
				scroll_opacity = 0;

			scroll_opacity = current_scroll/(_story_cover_height);
			
			if (scroll_opacity > 1) {
				scroll_opacity = 1;
			} else {
				scroll_opacity = Math.floor((1- scroll_opacity) * 10) / 10;
				//$('.story-cover-content').css("opacity", scroll_opacity);
			}
			
			$('.story-cover-content').css("opacity", scroll_opacity);
			
		}

	});
	
	/*	Fluid Box
	================================================== */
	 $('.enlarge').fluidbox({
	 	viewportFill:0.85
	 });
	 
	/*	Fancy Box
	================================================== */
	/*
	$(".enlarge").fancybox({
		openEffect: 'elastic',
		closeEffect: 'elastic',
		padding: 1,
		loop: false,
		helpers: {
			title: {
				type: 'inside'
			},
			thumbs: {
				width	: 50,
				height	: 50
			
		}
	});
	*/
	
	/*	Smooth Scroll
	================================================== */
	$('a').smoothScroll({
		offset: -290
	});
	
	/*	Laziest Loader
	================================================== */
	/*
	 $("img").laziestloader({}, function() {
	     this.style.opacity = 1;
	 });
	*/
	// $("img").laziestloader();
	 $("img").laziestloader();
	 
	 $('img').load(function() {
	     console.log('Image Loaded');
		 this.style.opacity = 1;
	 });
	
});