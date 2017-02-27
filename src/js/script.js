var oldIE = false;

/* device detector*/
function testDevice() {
	var _doc_element, _find, _user_agent;
	window.device = {};
	_doc_element = window.document.documentElement;
	_user_agent = window.navigator.userAgent.toLowerCase();
	device.ios = function () {
		return device.iphone() || device.ipod() || device.ipad();
	};
	device.iphone = function () {
		return _find('iphone');
	};
	device.ipod = function () {
		return _find('ipod');
	};
	device.ipad = function () {
		return _find('ipad');
	};
	device.android = function () {
		return _find('android');
	};
	device.androidPhone = function () {
		return device.android() && _find('mobile');
	};
	device.androidTablet = function () {
		return device.android() && !_find('mobile');
	};
	device.blackberry = function () {
		return _find('blackberry') || _find('bb10') || _find('rim');
	};
	device.blackberryPhone = function () {
		return device.blackberry() && !_find('tablet');
	};
	device.blackberryTablet = function () {
		return device.blackberry() && _find('tablet');
	};
	device.windows = function () {
		return _find('windows');
	};
	device.windowsPhone = function () {
		return device.windows() && _find('phone');
	};
	device.windowsTablet = function () {
		return device.windows() && _find('touch');
	};
	device.fxos = function () {
		return (_find('(mobile;') || _find('(tablet;')) && _find('; rv:');
	};
	device.fxosPhone = function () {
		return device.fxos() && _find('mobile');
	};
	device.fxosTablet = function () {
		return device.fxos() && _find('tablet');
	};
	device.meego = function () {
		return _find('meego');
	};
	device.mobile = function () {
		return device.androidPhone() || device.iphone() || device.ipod() || device.windowsPhone() || device.blackberryPhone() || device.fxosPhone() || device.meego();
	};
	device.tablet = function () {
		return device.ipad() || device.androidTablet() || device.blackberryTablet() || device.windowsTablet() || device.fxosTablet();
	};
	device.portrait = function () {
		return Math.abs(window.orientation) !== 90;
	};
	device.landscape = function () {
		return Math.abs(window.orientation) === 90;
	};
	_find = function (needle) {
		return _user_agent.indexOf(needle) !== -1;
	};
	var HTM = document.getElementsByTagName('html')[0];
	var className = '';
}
testDevice();

var doc, scrollPos = 0;

var scrollDelay = 0;
var wnd;

$(document).ready(function () {
	var T;
	wnd = $(window);

	oldIE = $('html').hasClass('lt-ie10');

	doc = $(document);
	$('.seldate').seldate();
	/* всегда до кастомизации select*/
	$('input.custom, select.custom').styler();
	$('.b-form').formFunc();
	$('.js-scroll').mCustomScrollbar({
		live: true,
		axis: "y",
		advanced: {
			updateOnContentResize: true
		}
	});
	$('input.phone_mask').mask('Телефон +7 (999) 999-99-99', {placeholder: "Телефон +7 (ХХХ) ХХХ-ХХ-ХХ"});
	$('input.maskfrom4').mask('От 9999 руб.', {placeholder: "От 50 руб."});
	$('input.maskbefore4').mask('До 9999 руб.', {placeholder: "До 300 руб."});
	$('input.mask4').mask('9999 руб.', {placeholder: "200 руб."});
	$('input.maskfrom5').mask('От 99 999 руб.', {placeholder: "От 500 руб."});
	$('input.maskbefore5').mask('До 99 999 руб.', {placeholder: "До 1 000 руб."});
	$('input.mask5').mask('99 999 руб.', {placeholder: "700 руб."});
	$('input.maskfrom6').mask('От 999 999 руб.', {placeholder: "От 25 000 руб."});
	$('input.maskbefore6').mask('До 999 999 руб.', {placeholder: "До 50 000 руб."});
	$('input.mask6').mask('999 999 руб.', {placeholder: "25 000 руб."});
	$('input.maskdate').each(function () {
		$(this).mask('99/99/9999');
	});

	$('.datepicker').datepicker({
		format: "dd/mm/yyyy",
		language: "ru",
		autoclose: true
	});
	$('.hint').tooltip();
	if ($('#video').length > 0) {
		getVideo();
	}

	$('.b-slider').slideCarousel();
	if ($('.b-partners img').length > 5) {
		$('.b-partners').each(function () {
			var cont = $(this).find('.d_table');
			cont.on('init', function (evt, slick) {
				var prev = $('<a href="#" class="slick-arrow-prev s-prev"></a>').appendTo(cont);
				var next = $('<a href="#" class="slick-arrow-next s-next"></a>').appendTo(cont);
				prev.on('click', function (e) {
					e.preventDefault();
					slick.slickPrev();
				});
				next.on('click', function (e) {
					e.preventDefault();
					slick.slickNext();
				});
			}).slick({
				accessibility: false,
				arrows: false,
				draggable: false,
				infinite: true,
				swipe: false,
				touchMove: true,
				speed: 1000,
				slidesToShow: 5,
				slidesToScroll: 1
			});
		});
	}
	$('#change-city').cityChoose();
	$('input[autocomplete="on"]').autocomleteFunc();

	$(document).on('click', '.show-alert', function () {
		$($(this).data('target')).addClass('in');
	});
	$(document).on('click', '.hide-alert', function () {
		$(this).closest('.alert').removeClass('in');
	});
	$('.map-popup').on('show.bs.modal', function (e) {
		$('.map-popup').mapInit();
	});
	$('.all_reviews').moreReviews();
	
	$('.js-schedule').schedule();
});
/*  document ready*/

function getVideo() {
	var videoStream = null;
	var video = document.getElementById("video");

	/* Поддержка браузерами*/
	window.navigator = window.navigator || {};
	navigator.getUserMedia = navigator.getUserMedia ||
		navigator.webkitGetUserMedia ||
		navigator.mozGetUserMedia ||
		null;

	if (navigator.getUserMedia === null) {
		document.getElementById('gum-unsupported').classList.remove('hidden');
		document.getElementById('button-play-gum').setAttribute('disabled', 'disabled');
		document.getElementById('button-stop-gum').setAttribute('disabled', 'disabled');
	} else {
		/* Опера <= 12.16 принимает direct stream.
		 Подробнее об этом здесь: http://dev.opera.com/articles/view/playing-with-html5-video-and-getusermedia-support/ */
		var createSrc = window.URL ? window.URL.createObjectURL : function (stream) {
			return stream;
		};

		/* Опера <= 12.16 поддерживает только видео.*/
		var audioContext = window.AudioContext ||
			window.webkitAudioContext ||
			null;
		if (audioContext === null) {
			document.getElementById('gum-partially-supported').classList.remove('hidden');
		}

		document.getElementById('button-play-gum').addEventListener('click', function () {
			document.getElementById('button-stop-gum').classList.remove('hidden');
			/* Захват аудио и видео с устройства пользователя*/
			navigator.getUserMedia({
					video: true,
					audio: true
				},
				function (stream) {
					videoStream = stream;
					/* Stream the data*/
					video.src = createSrc(stream);
					video.play();
				},
				function (error) {
					alert("Ошибка захвата видео: ", error.code);
				});
		});
		document.getElementById('button-stop-gum').addEventListener('click', function () {
			document.getElementById('video').controls = true;
			/* Пауза*/
			video.pause();
			/* Стоп*/
			videoStream.stop();
			return false;
		});
	}
}

(function ($) { /*create closure*/
	$.fn.heightAdjustment = function (options) {
		this.each(function () {
			var H = 0, el = $(this).children();
			el.height('').removeClass('evenlyready');
			el.each(function () {
				H = Math.max(H, $(this).height());
			});
			el.height(H).addClass('evenlyready');
		});
	};
	/*end of closure*/
})(jQuery);

(function ($) { /*create closure*/
	$.fn.formFunc = function (options) {
		this.each(function () {
			var form = $(this),
				bsubmit = form.find('button'), 
				langsblock = form.find('.langsblock'), 
				agreebox = $('.agreebox', form), 
				langbox = $('.lngbox', form), 
				execprice = $('.inpprice .exec a', form),
				valtextarea = $('.valtextarea', form), 
				agreed = $('.agreed', form),
				checkweek = $('.checkweek', form);

			agreebox.on('change', function () {
				if (agreebox.is(":checked")) {
					bsubmit.prop("disabled", false);
					bsubmit.removeClass('btdisable');
				} else {
					bsubmit.prop("disabled", true);
					bsubmit.addClass('btdisable');
				}
			});
			checkweek.on('change', function () {
				if (checkweek.is(":checked")) {
					for (i=0; i<5; i++)
					{			
						checkweek.closest('.field').find('.chkwrap:eq('+i+') input').attr("checked", 'checked');
						checkweek.closest('.field').find('.chkwrap:eq('+i+') .jq-checkbox').addClass('checked');
					}
				} else {
					for (i=0; i<5; i++)
					{			

						checkweek.closest('.field').find('.chkwrap:eq('+i+') input').removeAttr("checked");
						checkweek.closest('.field').find('.chkwrap:eq('+i+') .jq-checkbox').removeClass('checked');
					}			
				}
			});
			langbox.on('change bind', function () {

				if (langbox.is(":checked")) {
					langsblock.show();
				} else {
					langsblock.hide();
				}

			});
			valtextarea.on('keyup', function () {
				var val = $(this).val();
				$(this).closest('.fieldrow').find('.num').text(val.length);
			});
			execprice.on('click', function () {
				if (!$(this).closest('.field').hasClass('disabled')) {
					if ($(this).parent().hasClass('range')) {
						$(this).closest('.fieldrow').find('.exectly').removeClass('hidden');
						$(this).closest('.fieldrow').find('.range').addClass('hidden');
					} else {
						$(this).closest('.fieldrow').find('.range').removeClass('hidden');
						$(this).closest('.fieldrow').find('.exectly').addClass('hidden');

					}
					return false;
				} else {
					return false;
				}
			});
			agreed.on('change', function () {
				if (agreed.is(":checked")) {
					agreed.closest('.field').find('input[type="text"], select').prop("disabled", true);

					agreed.closest('.field').addClass('disabled');
				} else {
					agreed.closest('.field').find('input[type="text"], select').prop("disabled", false);
					agreed.closest('.field').removeClass('disabled');
				}
			});
			form.find('.seldate').each(function () {
				var block = $(this);
				block.find('select').on('change', function () {
					testSelDate(block);
				});
				/*					testSelDate(block);*/
			});

			/*form.submit(function(e) {
			 e.preventDefault();
			 var form = $(this);

			 $.ajax({
			 url: form.attr('action'),
			 method: getFormMethod(form),
			 data: form.serialize(),
			 cache: false
			 }).success(function(data) {
			 data = $.parseJSON(data);
			 if (data.status === 'success') {
			 form.find('.buttonrow .error').remove();
			 location.reload();
			 } else {
			 form.find('.buttonrow').append('<em class="error" style="display:block; margin-top:10px;">'+data.msg+'</em>');
			 }
			 return false;
			 });
			 });*/

			/* языки */
			langsblock.each(function () {
				var lngb = $(this);
				lngb.delegate('.onelang a', 'click', function () {
					var par = $(this).parent(), inp = par.children('input');
					inp.val('');
					par.remove();
					return false;
				});
				lngb.find('.addlang').click(function () {
					var srcblock = lngb.find('.onelang:first()'), trgblock = srcblock.clone();
					srcblock.before(trgblock);
					trgblock.show();
					srcblock.find('.hidden').removeClass('hidden');
					var inp = trgblock.find('input'), a = trgblock.find('a');
					srcblock.find('input').addClass('hidden');
					srcblock.find('.text').text(inp.val());
					var regexNAME = /^([a-z_]*?)\[([0-9]*?)\]$/i, N = regexNAME.exec(inp.attr("name")), ntxt = N[1], nnum = N[2] * 1 + 1;
					inp.attr('name', ntxt + '[' + nnum + ']').attr('id', ntxt + '[' + nnum + ']').val('');
					a.attr('href', '#' + ntxt + '[' + nnum + ']');
					return false;
				});
			});
		});
	};
	/*end of closure*/
})(jQuery);

(function ($) { /*create closure*/
	$.fn.seldate = function () {
		var block = $(this), realinp = block.find('.realseldate'), presetdate = realinp.val();
		if (presetdate && presetdate !== '') {
			presetdate = presetdate.split('.');
			var dd = block.find('.sel_day'), mm = block.find('.sel_month'), yy = block.find('.sel_year');
			dd.val(presetdate[0]);
			mm.val(presetdate[1]);
			yy.val(presetdate[2]);
		}
	};
})(jQuery);


(function ($) {
	$.fn.slideCarousel = function (options) {
		this.each(function () {

			var cont = $(this);

			cont.on('init', function (evt, slick) {
				cont.find('.b-image').each(function () {
					var bgimgcont = $(this);
					bgimg = bgimgcont.find('img');
					bgimg.css('display', 'none');
					bgimgcont.css({
						'background-image': 'url("' + bgimg.attr('src') + '")',
						'background-position': '50% 50%',
						'background-size': 'cover'
					});
				});
				$('.b-sub_menu a:first-child').addClass('active');

			}).on('afterChange', function (slick, currentSlide) {
				$('.b-sub_menu a').removeClass('active');
				$('.b-sub_menu a:eq(' + currentSlide.currentSlide + ')').addClass('active');

			}).slick({
				infinite: true,
				dots: false,
				cssEase: 'ease-in-out',
				easing: 'easeInOutCubic',
				speed: 600,
				autoplay: true,
				fade: true,
				accessibility: false,
				arrows: false,
				draggable: false,
				swipe: false,
				touchMove: true,
				autoplaySpeed: cont.data('speed')
			});
			$('.b-sub_menu a')
				.off('mouseover')
				.on('mouseover', function () {
					var ind = $(this).index();
					cont.slick('slickGoTo', ind);
				});
		});
	};
})(jQuery);

/*функция устанавливает cookie c нужным id города*/
function setCityAndReload(city_id) {
	var date = new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 365);
	/*1 год*/
	document.cookie = "city=" + city_id + "; path=/; expires=" + date.toUTCString();
}

(function () { /*create closure*/
	$.fn.cityChoose = function () {
		this.each(function () {

			var cont = $(this);
			var form = $('.b-form', cont), tbox = $('.input', form);
			$('.city_change a', form).click(function (e) {
				e.preventDefault();
				tbox.val($(this).text());
			});

			var path = tbox.data('path');
			var city = new Bloodhound({
				datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
				queryTokenizer: Bloodhound.tokenizers.whitespace,
				prefetch: path
			});

			tbox.typeahead({
					hint: true,
					highlight: true,
					minLength: 1
				},
				{
					name: 'city',
					display: 'value',
					source: city
				});

			form.find('input.tt-input').each(function () {
				var inp = $(this);
				inp.on('keypress', function (e) {
					if (e.which === 13) {
						(form.get(0)).submit();
						return true;
					}
				});
				inp.on('click', function (e) {
					$(this).select();
				});
			});

			form.on('submit', function (e) {
				e.preventDefault();
				var city_id = $(form).find(".inp").val();

				if (city_id !== '') {
					setCityAndReload(city_id);
				}

			});
		});
	};
})(jQuery);
(function () { /*create closure*/
	$.fn.autocomleteFunc = function () {
		this.each(function () {

			var tbox = $(this);
			var form = tbox.closest('form'); 
			

			var path = tbox.data('path');
			var city = new Bloodhound({
				datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
				queryTokenizer: Bloodhound.tokenizers.whitespace,
				prefetch: path
			});

			tbox.typeahead({
					hint: true,
					highlight: true,
					minLength: 1
				},
				{
					name: 'city',
					display: 'value',
					source: city
				});

			form.find('input.tt-input').each(function () {
				var inp = $(this);
				inp.on('keypress', function (e) {
					if (e.which === 13) {
						(form.get(0)).submit();
						return true;
					}
				});
				inp.on('click', function (e) {
					$(this).select();
				});
			});

			
		});
	};
})(jQuery);

(function ($) { /*create closure*/
	$.fn.mapInit = function (options) {
		this.each(function () {
			var defaults = {};
			var errors = 0,
				msg = '',
				o;
			if (typeof options !== 'string') {
				o = $.extend(defaults, options);
			} else {
				o = defaults;
			}
			var cont = $(this);
			ymaps.ready(init);
			/* on MAP READY*/
			var maproot = cont.find('#map2');

			function init() {
				map = new ymaps.Map("map2", {
					center: [maproot.data('lat'), maproot.data('lng')],
					zoom: (maproot.data('zoom')) ? maproot.data('zoom') : 9,
					type: "yandex#map",
					controls: []
				});
				map.events.add('click', function (e) {
					if (map.balloon.isOpen()) {
						map.balloon.close();
					}
				});
				var clusterIcon = [{
						href: './icons/clustericon.png',
						size: [55, 55],
						offset: [-20, -20]
					}],
					clusterNumbers = [10, 40],
					clusterer = new ymaps.Clusterer({
						clusterIcons: clusterIcon,
						clusterNumbers: clusterNumbers
					});
				clusterer.options.set({gridSize: maproot.data('gridsize')});
				map.behaviors.enable(['scrollZoom']);
				if (!maproot.data('path')) {
					alert('Не указан путь к файлу с точками');
					return false;
				}
				var arr = [];

				function resetPlacemarks(nany) {
					for (var i = 0; i < nany.length; i++) {

						var id = nany[i].id;

						for (var k = 0; k < nany[i].regions.length; k++) { /* добавить в нее точки*/
							var city = nany[i].regions[k].city,
								coordinates = nany[i].regions[k].coordinates,
								metro = nany[i].regions[k].metro;
							/* metro array (minimum, one item)*/
							for (var m = 0; m < metro.length; m++) {
								var station = metro[m].station;
								for (var p = 0; p < metro[m].points.length; p++) {
									var point = metro[m].points[p];
									var placemark = new ymaps.GeoObject({
										geometry: {
											type: "Point",
											coordinates: [point.coordinates[0], point.coordinates[1]]
										},
										properties: {
											balloonContentBody: '<span class="marker">' +
											((point.img) ? '<img src="' + point.img + '" alt="">' : '') +
											((point.link) ? '<a href="' + point.link + '">' + point.name + '</a><br />' : '') +
											((point.age) ? '<b class="b-marker_age">' + point.age + '</b>' : '') +
											((point.date) ? '<b class="b-marker_date ic_date">' + point.date + '</b>' : '') +
											((point.exp) ? '&nbsp;<span class="b-color_grey">|</span>&nbsp;опыт: <b class="b-marker_exp">' + point.exp + '</b><br />' : '') +
											((point.fio) ? '&nbsp;<span class="b-color_grey">|</span>&nbsp;<b class="b-marker_name">' + point.fio + '</b><br />' : '') +
											((point.remot) ? 'Менее <b class="b-marker_remot">' + point.remot + '</b> (<span class="ic_metro">' + station + '</span>)<br />' : '') +
											((point.pay) ? '<span class="b-color_grey">Оплата:</span> <b class="b-marker_pay">' + point.pay + '</b> <span class="b-rub">Р</span>/час</span>' : '</span>')

										}
									}, {
										balloonCloseButton: false,
										balloonOffset: [0, 177],
										balloonMaxWidth: 225,
										balloonMinWidth: 225,
										balloonAutoPan: true,
										hideIconOnBalloonOpen: false,
										iconLayout: 'default#image',
										iconImageHref: maproot.data('icon'),
										iconImageSize: [34, 48],
										iconImageOffset: [-17, -21]
									});
									clusterer.add(placemark);
									arr.push(placemark);
								}
							}
						}
						map.geoObjects.add(clusterer);
					}
				}

				maproot.on('nanyloaded', function (e, nany) {
					resetPlacemarks(nany);
				});
				$.getJSON(maproot.data('path'), function (json) {
					$.each(json, function (key, val) {
						maproot.trigger('nanyloaded', [val]);
					});
				});
			}
		});

	};
})(jQuery);
(function($) {

	$.fn.schedule = function(options){
		this.each(function(){
			var $that = $(this),
				$radio = $('input[type="radio"]', $that),
				$checkbox = $('input[type="checkbox"]', $that),
				radiosObject = {
					radio_2: ['checkbox_14', 'checkbox_15', 'checkbox_16', 'checkbox_17', 'checkbox_18', 'checkbox_19', 'checkbox_20', 'checkbox_21', 'checkbox_22', 'checkbox_23', 'checkbox_24', 'checkbox_25', 'checkbox_26', 'checkbox_27', 'checkbox_28', 'checkbox_29', 'checkbox_30', 'checkbox_31', 'checkbox_32', 'checkbox_33', 'checkbox_34', 'checkbox_35', 'checkbox_36', 'checkbox_37', 'checkbox_38', 'checkbox_39', 'checkbox_40', 'checkbox_41', 'checkbox_42', 'checkbox_43', 'checkbox_44', 'checkbox_45', 'checkbox_46', 'checkbox_47', 'checkbox_48', 'checkbox_49', 'checkbox_50', 'checkbox_51', 'checkbox_52', 'checkbox_53', 'checkbox_54', 'checkbox_55', 'checkbox_56', 'checkbox_57', 'checkbox_58', 'checkbox_59', 'checkbox_60', 'checkbox_61', 'checkbox_62'],
					radio_3: ['checkbox_14', 'checkbox_15', 'checkbox_16', 'checkbox_17', 'checkbox_18', 'checkbox_21', 'checkbox_22', 'checkbox_23', 'checkbox_24', 'checkbox_25', 'checkbox_28', 'checkbox_29', 'checkbox_30', 'checkbox_31', 'checkbox_32', 'checkbox_35', 'checkbox_36', 'checkbox_37', 'checkbox_38', 'checkbox_39'],
					radio_5: ['checkbox_35', 'checkbox_36', 'checkbox_37', 'checkbox_38', 'checkbox_39', 'checkbox_40', 'checkbox_41'],
					radio_6: ['checkbox_42', 'checkbox_43', 'checkbox_44', 'checkbox_45', 'checkbox_46', 'checkbox_47', 'checkbox_48'],
					radio_7: ['checkbox_49', 'checkbox_50', 'checkbox_51', 'checkbox_52', 'checkbox_53', 'checkbox_54', 'checkbox_55'],
					radio_8: ['checkbox_56', 'checkbox_57', 'checkbox_58', 'checkbox_59', 'checkbox_60', 'checkbox_61', 'checkbox_62'],
					radio_23: ['checkbox_14', 'checkbox_15', 'checkbox_16', 'checkbox_17', 'checkbox_18', 'checkbox_19', 'checkbox_20', 'checkbox_21', 'checkbox_22', 'checkbox_23', 'checkbox_24', 'checkbox_25', 'checkbox_26', 'checkbox_27', 'checkbox_28', 'checkbox_29', 'checkbox_30', 'checkbox_31', 'checkbox_32', 'checkbox_33', 'checkbox_34', 'checkbox_35', 'checkbox_36', 'checkbox_37', 'checkbox_38', 'checkbox_39', 'checkbox_40', 'checkbox_41', 'checkbox_42', 'checkbox_43', 'checkbox_44', 'checkbox_45', 'checkbox_46', 'checkbox_47', 'checkbox_48', 'checkbox_49', 'checkbox_50', 'checkbox_51', 'checkbox_52', 'checkbox_53', 'checkbox_54', 'checkbox_55', 'checkbox_56', 'checkbox_57', 'checkbox_58', 'checkbox_59', 'checkbox_60', 'checkbox_61', 'checkbox_62'],
					radio_24: ['checkbox_14', 'checkbox_15', 'checkbox_16', 'checkbox_17', 'checkbox_18', 'checkbox_21', 'checkbox_22', 'checkbox_23', 'checkbox_24', 'checkbox_25', 'checkbox_28', 'checkbox_29', 'checkbox_30', 'checkbox_31', 'checkbox_32', 'checkbox_35', 'checkbox_36', 'checkbox_37', 'checkbox_38', 'checkbox_39'],
					radio_26: ['checkbox_35', 'checkbox_36', 'checkbox_37', 'checkbox_38', 'checkbox_39', 'checkbox_40', 'checkbox_41'],
					radio_27: ['checkbox_42', 'checkbox_43', 'checkbox_44', 'checkbox_45', 'checkbox_46', 'checkbox_47', 'checkbox_48'],
					radio_28: ['checkbox_49', 'checkbox_50', 'checkbox_51', 'checkbox_52', 'checkbox_53', 'checkbox_54', 'checkbox_55'],
					radio_29: ['checkbox_56', 'checkbox_57', 'checkbox_58', 'checkbox_59', 'checkbox_60', 'checkbox_61', 'checkbox_62'],
					radio_13: ['checkbox_14', 'checkbox_15', 'checkbox_16', 'checkbox_17', 'checkbox_18', 'checkbox_19', 'checkbox_20', 'checkbox_21', 'checkbox_22', 'checkbox_23', 'checkbox_24', 'checkbox_25', 'checkbox_26', 'checkbox_27', 'checkbox_28', 'checkbox_29', 'checkbox_30', 'checkbox_31', 'checkbox_32', 'checkbox_33', 'checkbox_34', 'checkbox_35', 'checkbox_36', 'checkbox_37', 'checkbox_38', 'checkbox_39', 'checkbox_40', 'checkbox_41', 'checkbox_42', 'checkbox_43', 'checkbox_44', 'checkbox_45', 'checkbox_46', 'checkbox_47', 'checkbox_48', 'checkbox_49', 'checkbox_50', 'checkbox_51', 'checkbox_52', 'checkbox_53', 'checkbox_54', 'checkbox_55', 'checkbox_56', 'checkbox_57', 'checkbox_58', 'checkbox_59', 'checkbox_60', 'checkbox_61', 'checkbox_62'],
					radio_15: ['checkbox_14', 'checkbox_15', 'checkbox_16', 'checkbox_17', 'checkbox_18', 'checkbox_21', 'checkbox_22', 'checkbox_23', 'checkbox_24', 'checkbox_25', 'checkbox_28', 'checkbox_29', 'checkbox_30', 'checkbox_31', 'checkbox_32', 'checkbox_35', 'checkbox_36', 'checkbox_37', 'checkbox_38', 'checkbox_39'],
					radio_17: ['checkbox_35', 'checkbox_36', 'checkbox_37', 'checkbox_38', 'checkbox_39', 'checkbox_40', 'checkbox_41'],
					radio_18: ['checkbox_42', 'checkbox_43', 'checkbox_44', 'checkbox_45', 'checkbox_46', 'checkbox_47', 'checkbox_48'],
					radio_19: ['checkbox_49', 'checkbox_50', 'checkbox_51', 'checkbox_52', 'checkbox_53', 'checkbox_54', 'checkbox_55'],
					radio_20: ['checkbox_56', 'checkbox_57', 'checkbox_58', 'checkbox_59', 'checkbox_60', 'checkbox_61', 'checkbox_62']


				},
				customRadio = $('.timesel', $that);

				init();

				function init() {
					bindRadioHandler();
					bindCheckboxHandler();
				};
			
				function bindRadioHandler () {
					$radio
						.on('change.scheduleRadioChange', function (e) {
							var $radio = $(this),
								radioID = $radio.attr('id');
							if (radiosObject[radioID] && $radio.is(':checked')) {
								checkCheckboxes(radiosObject[radioID]);
							}
						});
				};

				function bindCheckboxHandler () {
					$checkbox
						.on('change.scheduleCheckboxChange', checkIfRadioIsActive)
				};

				function checkCheckboxes (checkboxesArr) {
					$checkbox.off('change.scheduleCheckboxChange');
					
					$checkbox.prop('checked', false).trigger('change');
					$.each(checkboxesArr, function (i) {
						var checkboxID = checkboxesArr[i];
						$('#' + checkboxID, $that).prop('checked', true).trigger('change');
					});

					bindCheckboxHandler();
				};

				function checkIfRadioIsActive () {
					for (radio in radiosObject) {
						var radioChecksArr = radiosObject[radio];
						if (checkIfCheckboxesAreChecked(radioChecksArr)) {
							$('#' + radio, $that).trigger('click');
						} else {
							customRadio.trigger('click');
						}
					}
				};

				function checkIfCheckboxesAreChecked (checksArr) {
					for (i in checksArr) {
						var checkboxIsChecked = $('#' + checksArr[i], $that).prop('checked');
						if (!checkboxIsChecked) {
							return false;
						}
					}
					return true;
				};
		});
	};

})(jQuery);

(function ($) { /*create closure*/
	$.fn.moreReviews = function (options) {
		this.each(function () {
			var link = $(this);
			link.on('click', function (e) {
				var a = $(this);
				var data;
				$.getJSON(a.attr('href'), function (json) {
					data = json;
					resetReviews(data);
				});
				var items = '';

				function resetReviews(val) {
					for (var i = 0; i < val.length; i++) {
						items += '<div class="b-reviews"><a href="' + val[i].href + '">' +
							'<img src="' + val[i].img + '" alt="">' + val[i].name + '</a>' +
							'<div class="date">' + val[i].date + '</div>' +
							'<div class="b-rating"><span class="stars" style="width:' + val[i].rating + ';"></span></div>' +
							'<div class="tit">' + val[i].title + '</div>' +
							'<p>' + val[i].text + '</p></div>';
					}

					a.parent().before(items);

				}

				return false;
			});
		});
	};
	/*end of closure*/
})(jQuery);

function getFormMethod(el) {
	var method;
	if (el.find('input[name="_method"]').length > 0) {
		method = el.find('input[name="_method"]').val();
	} else {
		method = el.attr('method');
	}
	return method;
}

function sendValidatedForm(form, validator) {
	var formmy = $(form);

	if (typeof formmy.data('ajax') !== "undefined" && formmy.data('ajax') === false) {
		return form.submit();
	}

	$.ajax({
		type: getFormMethod(formmy), // :TODO: Take it dynamically
		url: formmy.attr('action'),
		data: formmy.serialize(),
		dataType: 'json',
		success: function (response) {
			if (response.redirect) {
				window.location.replace(response.redirect);
			}
			// :TODO: What to do if redirect not present?
			console.log(response);
		},
		error: function (response) {
			switch (response.status) {
				case 422:
					var errors = $.parseJSON(response.responseText);
					console.log(errors);
					validator.showErrors(errors);
					break;
				case 400:
				case 401:
				case 403:
					break;
				default:
					console.log(response.status + ':' + response.responseText);
					// :TODO: Вынести это в отдельную функцию
					var notification = '<div class="alert fade in alert-warning">' +
						'<div class="wrapper">' +
						'<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
						'<p class="b_warn">' + response.responseText + '</p>' +
						'</div>' +
						'</div>';
					$('#header').after(notification);
					break;
			}
		}
	});
	return false;
}

$(document).ajaxError(function (event, jqxhr, settings, exception) {
	switch (jqxhr.status) {
		case 400: // exception = Bad Request
			// CSRF токена нет или просрочен
			window.location.reload();
			break;
		case 401: // exception = Unauthorized
			// :TODO: Надо красиво стилизовать всплывающее сообщение
			// :TODO: Ещё лучше вместо всплывающего сообщения открывать форму логина в модальном окне
			var redirect = confirm("Your session has been expired. Would you like to be redirected to the login page?");
			if (redirect) {
				window.location = '/auth/login';
			}
			break;
		case 403: // exception = Forbidden
			// :TODO: Пользователь авторизован, но у него нет прав на действие, что делать?
			break;
	}
});