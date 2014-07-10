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
// "source/bootstrap/carousel.js";
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
		_story_nav_active = false,
		_has_story_cover = false,
		_story_cover_height = 100,
		_path = "../",
		_is_index = false;
		

	if (typeof path != "undefined") {
		_path = path;
	}
	if (typeof is_index != "undefined") {
		_is_index = is_index;
	}
	
	// TITLE
	var the_title = $("h1").html();
	$( "#navbar-title" ).html( the_title );
	
	/*	STORY NAV BAR
	================================================== */
	function loadStoryBarStories(json_url, storybar_id) {
		//$( "#navbar-story" ).html( the_title );
		$.getJSON( json_url, function(d) {
			var number_of_stories = d.stories.length,
				column_width,
				story_container = $( storybar_id + " .row" ).first(),
				story_container_height,
				many_stories = false,
				stories = {
					small: [],
					large: [],
				}
				
			column_width = 12/number_of_stories;
			
			if (column_width < 2) {
				many_stories = true;
				column_width = 2;
			} else {
				column_width = Math.floor(column_width);
			}
			
			
			// Create elements
			if (many_stories) {
				var small_stories_element,
					storybar_small_height,
					storybar_large_height;
				
				
				for (var i = 0; i < d.stories.length; i++) {
					var story 		= d.stories[i];
				
					if (story.large == "true") {
						stories.large.push(story);
					} else {
						stories.small.push(story);
					}
				};
				
				if (stories.small.length > 4) {
					small_stories_element = createElement("div", "col-sm-4 small-column");
				} else {
					small_stories_element = createElement("div", "col-sm-4 small-column");
				}
				
				$(story_container).append(small_stories_element);
				
				column_width = 8 / (stories.large.length);
				
				if (column_width < 2) {
					column_width = 2;
				} else {
					column_width = Math.floor(column_width);
				}
				
				// LARGE
				var large_rows = 1;
				var large_column_count = 0;
				for (var j = 0; j < stories.large.length; j++) {
					var story 		= stories.large[j],
						story_el;
						
					if (large_column_count < 4) {
						large_column_count ++;
					} else {
						large_column_count = 0;
						large_rows ++;
					}
						
					story_el = createStoryNavElement(story, column_width, true);
					$(story_container).append(story_el);
					
				}

				// SMALL
				var small_rows = 1;
				var small_column_count = 0;
				
				for (var k = 0; k < stories.small.length; k++) {
					var story 		= stories.small[k],
						story_el;
					
					if (small_column_count < 2) {
						small_column_count ++;
					} else {
						small_column_count = 0;
						small_rows ++;
					}
					
					story_el = createStoryNavElement(story, 6, false);
					$(small_stories_element).append(story_el);
				}
				
				// SIZE
				story_container_height = $(story_container).height();
				
				if (story_container_height < 250) {
					story_container_height = 250;
				}
				
				storybar_small_height = story_container_height / small_rows;
				$( small_stories_element).find( ".story-item" ).height(storybar_small_height);
				$( small_stories_element).find( ".story-item-container" ).height(storybar_small_height);
				$( small_stories_element).find( ".story-item-background" ).height(storybar_small_height);
				
				story_container_height = $(story_container).height();
				
				if (story_container_height < 250) {
					story_container_height = 250;
				}
				
				storybar_large_height = story_container_height / large_rows;
				$( story_container).find( ".story-item.tall" ).height(storybar_large_height);
				$( story_container).find( ".story-item.tall .story-item-container" ).height(storybar_large_height);
				$( story_container).find( ".story-item.tall .story-item-background" ).height(storybar_large_height);
				
				//(100 / small_rows)
				trace("SMALL ROWS " + small_rows)
				
				
				
			} else {
				for (var i = 0; i < d.stories.length; i++) {
					var story 		= d.stories[i],
						story_el;
				
					story_el = createStoryNavElement(story, column_width, true);
					$(story_container).append(story_el);
				
				};
				storybar_large_height = 250;
				$( story_container).find( ".story-item.tall" ).height(storybar_large_height);
				$( story_container).find( ".story-item.tall .story-item-container" ).height(storybar_large_height);
				$( story_container).find( ".story-item.tall .story-item-background" ).height(storybar_large_height);
				
			}
			
			if (!_story_nav_active) {
				showNavbarStories(false, _speed*2);
			}
		});
	}
	
	function createStoryNavElement(story, column_width, tall) {
		var story_el	= "";
		
		story_el 		+=  "<div class='col-sm-" + column_width + " col-xs-" + column_width + "'>";
		story_el 		+=		"<div class='row'>";
		story_el 		+= 			"<div class='col-sm-12'>";
		if (tall) {
			story_el 	+= 				"<a class='story-item tall' href='" + _path + story.url + "'>";
		} else {
			story_el 	+= 				"<a class='story-item' href='" + _path + story.url + "'>";
		}
		story_el 		+= 					"<div class='story-item-background' style='background-image:url(" + _path + story.background.url + ")'></div>";
		story_el 		+= 					"<div class='story-item-container'>";
		story_el 		+= 						"<div class='story-item-content'>";
		story_el 		+= 							"<h3>" + story.headline + "</h3>";
		story_el 		+= 							"<p>" + story.deck + "</p>";
		story_el 		+= 							"<p class='byline'>" + story.byline + "</p>";
		
		story_el 		+= 						"</div>";
		story_el 		+= 					"</div>";
		story_el 		+= 				"</a>";
		story_el 		+= 			"</div>";
		story_el 		+= 		"</div>";
		story_el 		+= "</div>";
		
		return story_el;
		
	}
	
	
	/*	STORY COVER
	================================================== */
	if ($('#story-cover').length ) {
		
		_has_story_cover = true;
		
		_story_cover_height = $( window ).height();
		
		$('#story-cover').height(_story_cover_height);
		
		$( window ).resize(function() {
			_story_cover_height = $( window ).height();
			$('#story-cover').height(_story_cover_height);
			if (_is_index) {
				var story_cover_content = $("#story-cover .story-cover-content");
				story_cover_content.css("bottom", (_story_cover_height/2) - (story_cover_content.height()/2) + "px" );
			}
		});
		
		if (_is_index) {
			var story_cover_content = $("#story-cover .story-cover-content");
			story_cover_content.css("bottom", (_story_cover_height/2) - (story_cover_content.height()/2) + "px" );
			$('#product-navbar-collapse').css('opacity', "0");
			$("#navbar-title").css('display','none');
		}
		
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
	function showNavbarStories(show, speed) {
		var nav_speed = _speed;
		if (speed) {
			nav_speed = speed;
		}
		if (show) {
			
			$("#navbar-story").animate({
			  marginTop:"0px"
			}, nav_speed, "easeInOutCubic");
			_story_nav_active = true;
		} else {
			$("#navbar-story").animate({
			  marginTop:-$("#navbar-story").height()-4//"-254px"
			}, nav_speed, "easeInOutCubic");
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
				$('#product-navbar-collapse').css('opacity', '1');
				//$('.knightlab-logo img').attr('src', '../css/knightlab-logo-diamond-190.png');
				$('#navbar-product').addClass('in-article');
				$('#navbar-product').css('marginTop', '-56px');
				$("#navbar-product").animate({
					marginTop:"0px",
					opacity:"1"
				}, _speed, "easeInOutCubic");
			} else {
				if (_is_index) {
					$('#product-navbar-collapse').css('opacity', '0');
				} else {
					$('#product-navbar-collapse').css('opacity', '1');
				}
				//$('img.knightlab-logo').attr('src', '../css/kngihtlab-logo-NOtagline.png');
				//$('.knightlab-logo img').attr('src', '../css/knightlab-logo-diamond-190.png');
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
	$('#stories-btn').click(function() {
		event.preventDefault();
		if (_story_nav_active) {
			showNavbarStories();
			$(this).removeClass("open");
		} else {
			showNavbarStories(true);
			$(this).addClass("open");
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
	
	/*	ZOOMABLE IMAGES
	================================================== */
	// Find Images and make them zoomable
	function makeImagesZoomable() {
		$( "figure" ).each(function(figure) {
			if ($(this).find( "a img" ).length ) {
				trace("FOUND ZOOM READY IMAGE");
			} else {
				var img_url,
					el_link = createElement("a", "enlarge"),
					el_img = $(this).find("img");
					
					
				img_url = $(this).find("img").attr("data-src");
				
				if (img_url == undefined) {
					img_url = $(this).find("img").attr("src");
				}
				
				$( el_img ).detach();
				
				$(el_link).attr("href", img_url);
				$(el_link).append(el_img);
				$(this).prepend(el_link);
				

			}
		});
		
		$('.enlarge').fluidbox({
		 	viewportFill:0.85
		});
		
	}
	
	
	/*	Smooth Scroll
	================================================== */
	$('a').smoothScroll({
		offset: -290
	});
	
	/*	Laziest Loader
	================================================== */
	$("img").laziestloader();
	 
	$('img').load(function() {
		this.style.opacity = 1;
	});
	 
 	/*	Init
 	================================================== */
	loadStoryBarStories(_path + "stories.json", "#navbar-story");
	loadStoryBarStories(_path + "footer_stories.json", "#footer-storybar");
	makeImagesZoomable();
	
});

/* Trace (console.log)
================================================== */
trace = function( msg ) {
	if (window.console) {
		console.log(msg);
	} else if ( typeof( jsTrace ) != 'undefined' ) {
		jsTrace.send( msg );
	} else {
		//alert(msg);
	}
}

createElement = function(tagName, className) {
	var el = document.createElement(tagName);
	el.className = className;
	return el;
}