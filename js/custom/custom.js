/*========================================== MASTER JAVASCRIPT ===================================================================

	Project : RAACK SITE TEMPLATE 
	Version : 1.0 
	Primary Use : RAACK SITE TEMPLATE

=================================================================================================================================*/

$(document).ready(function () {
	"use strict"; //Start of Use Strict
	var menu_li = $('.navbar-nav li a');
	var collapse = $('.navbar-collapse');
	var top_nav = $('.navbar-menu');
	
	/* Add & Remove active class in Menu and Submenu based on url(location) Start*/
        var url = window.location;
    // Will only work if string in href matches with location
        $('ul.navbar-nav a[href="' + url + '"]').parent().addClass('active');

    // Will also work for relative and absolute hrefs
        $('ul.navbar-nav a').filter(function () {
            return this.href == url;
		}).parent().addClass('active').parent().parent().addClass('active');

	
	 //NUMBER COUNTING
	var counter = $('.count-num');
	if (counter.length) { 
		counter.counterUp({
			delay: 10,
			time: 1000
		});
	}	 
	
	//SLIDER ADD CLASS
	$(document).on("click", '.owl-next', function() {
		$(this).parents('.owl-next-add').addClass('next-cls');
	});
	
	$(document).on("click", '.owl-prev', function() {
		$(this).parents('.owl-next-add').removeClass('next-cls');
	});
	
	
	//ANIMATION
	$.fn.isOutViewport = function() {
		var elementVisible = 0;	
		var elementTop = $(this).offset().top;
		var elementBottom = elementTop + $(this).outerHeight();
		var viewportTop = $(window).scrollTop() - elementVisible;
		return viewportTop > elementBottom;
	};
	
	$.fn.isInViewport = function() {
		var elementVisible = 50;	
		var elementTop = $(this).offset().top;
		var elementBottom = elementTop + $(this).outerHeight();

		var viewportTop = $(window).scrollTop() - elementVisible;
		var viewportBottom = viewportTop + $(window).height();	
		return elementBottom > viewportTop && elementTop < viewportBottom;
	};
	
	$(window).bind('scroll load', function () {
		if( $('.animate-scroll').length ){ 
			$(".animate-scroll").each(function(){
			if ($(this).isInViewport() || $(this).isOutViewport() ) {
				if( $(this).data('animate') ){
					if( !$(this).hasClass( $(this).data('animate') ) ){
						$(this).addClass( $(this).data('animate') );
					}			
				}		
			  }
			});
		}
	});
	
	
	// MAIN PART FOR THE VIDEO AND PLAY BUTTON
	if( $('#video-container').length ){ 
	const videoContainer = document.getElementById("video-container");
	const playButton = document.getElementById("play-button");

	videoContainer.addEventListener("mousemove", function (event) {
		const containerRect = videoContainer.getBoundingClientRect();
		const mouseX = event.clientX - containerRect.left;
		const mouseY = event.clientY - containerRect.top;

		const buttonWidth = playButton.offsetWidth;
		const buttonHeight = playButton.offsetHeight;
		const buttonX = mouseX - buttonWidth / 2;
		const buttonY = mouseY - buttonHeight / 2;

		const maxButtonX = containerRect.width - buttonWidth;
		const maxButtonY = containerRect.height - buttonHeight;
		playButton.style.left = Math.min(Math.max(buttonX, 0), maxButtonX) + "px";
		playButton.style.top = Math.min(Math.max(buttonY, 0), maxButtonY) + "px";
	});

	videoContainer.addEventListener("mouseleave", function () {
		setTimeout(function () {
			playButton.style.left = "50%";
			playButton.style.top = "50%";
			playButton.style.transform = "translate(-50%, -50%) scale(1)";
			playButton.style.transition = "all 0.3s ease-out";
		}, 50);
	});
	

	videoContainer.addEventListener("mouseover", function () {
		playButton.style.transition = "transform ease-out 0.3s";
		playButton.style.transform = "scale(1.2)";
	});
 
	}
	//STICKY SIDEBAR
	if( $('.scroll-container .leftSidebar').length ){ 
		$('.scroll-container .leftSidebar').theiaStickySidebar();
	}
	
});