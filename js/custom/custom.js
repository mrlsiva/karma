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
	
	function initClickToTop($this) {
		if ($this.scrollTop() >= 50) {
			$('#return-to-top').fadeIn(200);
		} else {
			$('#return-to-top').fadeOut(200);
		}
	}	
	// SCROLL TOP 
	$(window).scroll(function () {
		var $this = $(this);
		initClickToTop($this);
	});
	$(window).load(function () {
		var $this = $(this);
		initClickToTop($this);
	});
	
	$('#return-to-top').click(function () {
		$('body,html').animate({
			scrollTop: 0
		}, 500);
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
 
	var accord = $(".faq-accord");
	if(accord.length){
	  var i = 0; 
	  accord.each(function(){
	   var all_panels = $(this).find('.faq-ans').hide();  
	  
		var all_titles = $(this).find('.faq-ques'); 
		
		$(this).find('.faq-ans.active').slideDown();    	
		
	  all_titles.on("click", function() { 
		
		var acc_title = $(this);
		var acc_parent = $(this).parents('.faq-container');
		var acc_ans = acc_title.next(); 
		
		  if (!acc_ans.hasClass('active')) {
				acc_parent.find('.faq-ques').removeClass('active');  
				acc_parent.find('.faq-ans').removeClass('active').slideUp();
				
				acc_title.addClass('active');  
				acc_ans.addClass('active').slideDown(); 
			  } else {
				 all_panels.removeClass('active').slideUp();
				 all_titles.removeClass('active'); 
			  } 
	  });
	  });        
	}
	
	//CONTACT FORM VALIDATION	
	if ($('.form-res').length) {
        $('.form-res').each(function() {
            $(this).validate({
                errorClass: 'error',
                submitHandler: function(form) {
                    $.ajax({
                        type: "POST",
						dataType: "json",
                        url: "mail/mail.php",
                        data: $(form).serialize(),
						success: function(data) {
							//console.log(' data > ', data);							
                            if (data.success) {
                                $(form)[0].reset();
                                $(form).find('.sucessMessage').html(data.message);
                                $(form).find('.sucessMessage').show();
                                $(form).find('.sucessMessage').delay(5000).fadeOut();
                            } else {
                                $(form).find('.failMessage').html(data.message);
                                $(form).find('.failMessage').show();
                                $(form).find('.failMessage').delay(5000).fadeOut();
                            }
                        },
                        error: function(XMLHttpRequest, textStatus, errorThrown) {
                            $(form).find('.failMessage').html(textStatus + '  '+ errorThrown );
                            $(form).find('.failMessage').show();
                            $(form).find('.failMessage').delay(5000).fadeOut();
                        }
						
                    });
                }
            });
        });
    }
	
});