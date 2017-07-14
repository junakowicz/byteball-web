/* Theme Name: Worthy - Free Powerful Theme by HtmlCoder
 * Author:HtmlCoder
 * Author URI:http://www.htmlcoder.me
 * Version:1.0.0
 * Created:November 2014
 * License: Creative Commons Attribution 3.0 License (https://creativecommons.org/licenses/by/3.0/)
 * File Description: Initializations of plugins 
 */

(function($){
	$(document).ready(function(){
	
		
		// Fixed header
		//-----------------------------------------------
		$(window).scroll(function() {
			if (($(".header.fixed").length > 0)) { 
				if(($(this).scrollTop() > 0) && ($(window).width() > 767)) {
					$("body").addClass("fixed-header-on");
				} else {
					$("body").removeClass("fixed-header-on");
				}
			};
		});

		$(window).load(function() {
			if (($(".header.fixed").length > 0)) { 
				if(($(this).scrollTop() > 0) && ($(window).width() > 767)) {
					$("body").addClass("fixed-header-on");
				} else {
					$("body").removeClass("fixed-header-on");
				}
			};
		});

		//Scroll Spy
		//-----------------------------------------------
		if($(".scrollspy").length>0) {
			$("body").addClass("scroll-spy");
			$('body').scrollspy({ 
				target: '.scrollspy',
				offset: 152
			});
		}

		//Smooth Scroll
		//-----------------------------------------------
		if ($(".smooth-scroll").length>0) {
			$('.smooth-scroll a[href*=#]:not([href=#]), a[href*=#]:not([href=#]).smooth-scroll').click(function() {
				if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
					var target = $(this.hash);
					target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
					if (target.length) {
						$('html,body').animate({
							scrollTop: target.offset().top-151
						}, 1000);
						return false;
					}
				}
			});
		}

		// Animations
		//-----------------------------------------------
		if (($("[data-animation-effect]").length>0) && !Modernizr.touch) {
			$("[data-animation-effect]").each(function() {
				var $this = $(this),
				animationEffect = $this.attr("data-animation-effect");
				if(Modernizr.mq('only all and (min-width: 768px)') && Modernizr.csstransitions) {
					$this.appear(function() {
						setTimeout(function() {
							$this.addClass('animated object-visible ' + animationEffect);
						}, 10);
					}, {accX: 0, accY: -130});
				} else {
					$this.addClass('object-visible');
				}
			});
		};

		// Isotope filters
		//-----------------------------------------------
		if ($('.isotope-container').length>0) {
			$(window).load(function() {
				$('.isotope-container').fadeIn();
				var $container = $('.isotope-container').isotope({
					itemSelector: '.isotope-item',
					layoutMode: 'masonry',
					transitionDuration: '0.4s',
					filter: "*"
				});
				// filter items on button click
				$('.filters').on( 'click', 'ul.nav li a', function() {
					var filterValue = $(this).attr('data-filter');
					$(".filters").find("li.active").removeClass("active");
					$(this).parent().addClass("active");
					$container.isotope({ filter: filterValue });
					return false;
				});
			});
		};

		//Modal
		//-----------------------------------------------
		if($(".modal").length>0) {
			$(".modal").each(function() {
				$(".modal").prependTo( "body" );
			});
		}
//ANiMATED FRAME BORDER
		// $(".frame-it").rollingBorder({

		// padding: 0,

		// color: "rgba(113, 194, 255, 0.48)",

		// width: 2,

		// length: "100%"

		// });
		// $(".frame-it1").rollingBorder({

		// padding: 0,

		// color: "rgba(113, 194, 255, 0.48)",

		// width: 1,

		// length: "100%"

		// });

		// COUNTDOWN
		var now = new Date().getTime()/1000

		var upcoming = null; 
		var last= null;

		var fullMoons = [
			{epoch: 1497013800, sDate: 'June 9 13:10 UTC'},
			{epoch: 1499573220, sDate: 'July 9 04:07 UTC'},
			{epoch: 1502129400, sDate: 'August 7 18:10 UTC'},
			{epoch: 1504681320, sDate: 'September 6 07:02 UTC'},
			{epoch: 1507228800, sDate: 'October 5 18:40 UTC'},
			{epoch: 1509772980, sDate: 'November 4 05:23 UTC'},
			{epoch: 1512316020, sDate: 'December 3 15:47 UTC'},
			{epoch: 9999999999, sDate: 'LAST we already conquered the world'},
		]

		for (var i = 0;i<fullMoons.length -1;i++ ){
			if(now > fullMoons[i].epoch && now< fullMoons[i+1].epoch){
				last = fullMoons[i]
				upcoming = fullMoons[i+1]
				break;

			} else {
				last = fullMoons[fullMoons.length-1]
				upcoming = fullMoons[fullMoons.length-1]

			}
		}
		$( "#distDate" ).html('Full Moon, ' + upcoming.sDate)
		var circleBorderFactor = 0.5
		$('.countdown').final_countdown({
			start : last.epoch, //Here use Milisecond. To convert your time you can go to this(https://currentmillis.com/) website. 
			end   : upcoming.epoch,
			now : now,
			seconds: {
				borderColor: 'rgb(139, 142, 150)',
				borderWidth: 3*circleBorderFactor
			},
			minutes: {
				borderColor: 'rgb(139, 142, 150)',
				borderWidth: 5*circleBorderFactor
			},
			hours: {
				borderColor: 'rgb(139, 142, 150)',
				borderWidth: 8*circleBorderFactor
			},
			days: {
				borderColor: 'rgb(139, 142, 150)',
				borderWidth: 13*circleBorderFactor
			}}, function() {
			});

//localize

i18next
  .use(i18nextXHRBackend)
  .use(i18nextBrowserLanguageDetector)
  .init({
    fallbackLng: 'en',
    debug: true,
    ns: ['common'],
    // ns: ['special', 'common'],
    defaultNS: 'common',
    backend: {
      // load from i18next-gitbook repo
      loadPath: './locales/{{lng}}/{{ns}}.json',
      crossDomain: true
    }
  }, function(err, t) {
    // init set content
    updateContent();
  });


// just set some content and react to language changes
// could be optimized using vue-i18next, jquery-i18next, react-i18next, ...
function updateContent() {
	//intro page
  document.getElementById('slogan').innerHTML = i18next.t('intro.slogan');
  document.getElementById('get-byteball').innerHTML = i18next.t('intro.get-byteball');
  document.getElementById('a-whitepaper').innerHTML = i18next.t('intro.a-whitepaper');
  document.getElementById('next-dist').innerHTML = i18next.t('intro.next-dist');
  document.getElementById('s1-p').innerHTML = i18next.t('s1.p');
//  $(".type-time").i18next();
//   document.getElementById('saveBtn').innerHTML = i18next.t('common:button.save', { count: Math.floor(Math.random()*2+1)  });
  
//   document.getElementById('info').innerHTML = `detected user language: "${i18next.language}"  --> loaded languages: "${i18next.languages.join(', ')}"`;

console.log(`detected user language: "${i18next.language}"  --> loaded languages: "${i18next.languages.join(', ')}"`)
}

function changeLng(lng) {
	console.log('VVlng'+ lng)
  i18next.changeLanguage(lng);
}

i18next.on('languageChanged', () => {
  updateContent();
});



	}); // End document ready
})(this.jQuery);

