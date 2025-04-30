$(document).ready(function(){
	var iOS = navigator.userAgent.match(/iPhone|iPad|iPod/i);
	var clobj = "click";
	if(iOS != null) clobj = "touchstart";
	$("#phone").inputmask({"mask": "+7(999)999-99-99"});
	
	$("body").on(clobj, '[href*="#"]', function(e){
		var fixed_offset = 100;
		$('html,body').stop().animate({ scrollTop: $(this.hash).offset().top - fixed_offset }, 1000);
		e.preventDefault();
	});
	
	$('.field_select_txt').on(clobj, function(){
		$(this).closest('.field_select_txt').find('.field_select_var').toggleClass('active');
	});
	$('.select_var_row').on(clobj, function(){
		var idfor = $(this).data('for');
		var value = $(this).html();
		$('#'+idfor).val(value).addClass('active');
	});
	$('.field_flag').on(clobj, function(){
		$('.hidden_flags').toggleClass('active');
	});
	$('.hidden_flags img').on(clobj, function(){
		var src = $(this).prop('src');
		var mask = $(this).data('mask');
		$('#flag').prop('src',src);
		$("#phone").inputmask({"mask": mask});
		$('#phone').prop('placeholder',mask);
		$('.hidden_flags').removeClass('active');
	});
	$('.tabs_list_item').on(clobj, function(){
		var tbl = $(this).data('tab');
		$('.tabs_list_item').removeClass('select');
		$(this).addClass('select');
		$('.block4_listing_block').removeClass('active');
		$('#'+tbl).addClass('active');
	});
	$('.tipyng_dark').on('keydown', function(){
		if($(this).val()) $(this).addClass('inp_dark');
		else $(this).removeClass('inp_dark');
	});

	/* Accordions */
	const accordions = document.querySelectorAll(".accordion");
	const openAccordion = (accordion) => {
	    let headerHeight = 0;
		const content = accordion.querySelector(".accordion__content");
		accordion.classList.add("accordion__active");
        var accordionActiveHeaight = $(".accordion__active .accordion__content").height();
        if(typeof(accordionActiveHeaight) === "undefined") {
            accordionActiveHeaight = 0;
        }
		content.style.maxHeight = content.scrollHeight + "px";
        $('html, body').stop().animate({ scrollTop:$(accordion).offset().top - accordionActiveHeaight - headerHeight}, 300);
	};

	const closeAccordion = (accordion) => {
		const content = accordion.querySelector(".accordion__content");
		accordion.classList.remove("accordion__active");
		content.style.maxHeight = null;
	};

	accordions.forEach((accordion) => {
		const intro = accordion.querySelector(".accordion__intro");
		const content = accordion.querySelector(".accordion__content");

		intro.onclick = () => {
			if (content.style.maxHeight) {
				closeAccordion(accordion);
			} else {
                openAccordion(accordion);
                $(accordions).not($(accordion)).each(function(){
                    closeAccordion($(this)[0]);
                });
			}
		};
	});

	/* burger menu */

	const burgerOpen = document.querySelector("[data-js=burgerOpen]")
	const burgerMenu = document.querySelector("[data-js=burgerMenu]")

	if(burgerOpen && burgerMenu) {
		const burgerOverlay = document.querySelector("[data-name=burgerOverlay]")
		const burgerCloses = document.querySelectorAll("[data-js=burgerClose]")

		burgerOpen.addEventListener('click', () => {
			burgerMenu.classList.add('active')
			if(burgerOverlay) {
				burgerOverlay.classList.add('active')
			}
		})

		burgerCloses.forEach(burgerClose => {
			burgerClose.addEventListener('click', () => {
				burgerMenu.classList.remove('active')
				if(burgerOverlay) {
					burgerOverlay.classList.remove('active')
				}
			})
		})
	}

	// Автовоспроизведение видео на мобильном
	var videos = document.querySelectorAll('[data-js="autoplayVideo"]');

	if(videos.length) {
		window.addEventListener('touchstart', function videoStart() {
			videos.forEach(video => {
				video.play();
				console.log('first touch');
			})
			this.removeEventListener('touchstart', videoStart);
		});

		let event = new Event("touchstart");
		window.dispatchEvent(event);
	}
})