$(document).ready(function(){
	var iOS = navigator.userAgent.match(/iPhone|iPad|iPod/i);
	var clobj = "click";
	if(iOS != null) clobj = "touchstart";

	/* burger menu */

	const burgerOpen = document.querySelector("[data-js=burgerOpen]")
	const burgerMenu = document.querySelector("[data-js=burgerMenu]")
	const burgerOverlay = document.querySelector("[data-name=burgerOverlay]")

	if(burgerOpen && burgerMenu) {
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

	/* Anhors */
	
	$("body").on(clobj, '[href*="#"]', function(e){
		var fixed_offset = 50;
		$('html,body').stop().animate({ scrollTop: $(this.hash).offset().top - fixed_offset }, 1000);
		burgerMenu.classList.remove('active')
		if(burgerOverlay) {
			burgerOverlay.classList.remove('active')
		}
		e.preventDefault();
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
})