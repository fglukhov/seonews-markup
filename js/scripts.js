var monthName = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря"
  ];
  
var monthName2 = [
    "январь",
    "февраль",
    "март",
    "апрель",
    "май",
    "июнь",
    "июль",
    "август",
    "сентябрь",
    "октябрь",
    "ноябрь",
    "декабрь"
  ];

var dayName = [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота"
  ];  

// Лоадер с крутилкой над элементом  
  
function elementLoader(elementId,loaderBg) {
  var el = $("#"+elementId);
  if (el.length) {
    if (!$(".element-loader[rel='"+elementId+"']").length) {
      $("body").append("<div class='element-loader' rel='"+elementId+"'></div>");
      var loader = $(".element-loader[rel='"+elementId+"']");
      loader.css({
        "left":el.offset().left,
        "top":el.offset().top,
        "width":el.width(),
        "height":el.height()
      }).append("<div class='loader-bg' />").append("<div class='loader-pic' />");
    if(!loaderBg){
      loaderBg = "#fff";
    }
      loader.find(".loader-bg").css("background-color",loaderBg)
    }
  }
}

// Удаление лоадера

function removeLoader(elementId) {
  if ($(".element-loader[rel='"+elementId+"']")) {
    $(".element-loader[rel='"+elementId+"']").remove();
  }
}

// Разметка новостей
  
function newsMakeup() {
  if ($(".newslist").length) {
    $(".newslist").each(function() {
      var list = $(this);
      
      if (!$(this).children(".newslist-item-big").length && !$(this).find(".newslist-row").length) {
        
        var items = list.children(".newslist-item");
        
        for(var i = 0; i < items.length; i+=2) {
          items.slice(i, i+2)
             .wrapAll("<div class='newslist-row fc' />");
        }
        
        list.find(".newslist-row").first().addClass("first-row");
      
      } else {
        list.addClass("newslist-alternate")
      } 
      
      
    });
  }
} 
  
$(window).load(function () {

  // $(".post-text img").each(function() {
    // if ($(this).width() > 400) {
      // $(this).addClass("nofloat");
    // }
  // });

  // Вызов фунции адаптации под ширину окна браузера
  
  adaptation();

  $(".vk-popup").addClass("initial");
  $(".facebook-popup").addClass("initial");
  $(".twitter-popup").addClass("initial");
  
  // if (window.location.hash == "#comments") {
    // $("html,body").animate({
      // scrollTop: $(".comments-block").offset().top - 100
    // },100)
  // }
  
});

$(window).resize(function() {
  adaptation();
  
  // Скрытие кнопки "Наверх" при маленькой ширине окна
  
  if ($(window).width() < 1300) {
    $(".sidenav").fadeOut(250,function() {
      $(this).addClass("invisible")
    });
  } else {
    $(".sidenav").fadeIn(250).removeClass("invisible");
  }
  
  if ($(".popup").length) {
    pupMakeup();
  }
  
});

$(window).scroll(function () {
  
  // Фиксация меню и части шапки при скролле страницы
  
  if ($(window).scrollTop() > ($(".header").offset().top + $(".header").height())) {
    $(".header-content").addClass("header-fixed").removeClass("header-normal").css("margin-left",-$(document).scrollLeft());
    if (!$(".sidenav").hasClass("invisible")) {
      $(".sidenav").fadeIn(250);
    }
    if ($(".top-filter").hasClass("top-filter-locked")) {
      $(".top-filter-wrapper").hide();
    } else {
      $(".top-filter-shadow").fadeIn(250);
    }
  } else {
    $(".header-content").removeClass("header-fixed").addClass("header-normal").css("margin-left",0);
    
    if (!$(".sidenav").hasClass("invisible")) {
      $(".sidenav").fadeOut(250);
    }
    if ($(".top-filter").hasClass("top-filter-locked")) {
      $(".top-filter-wrapper").show();
    } else {
      $(".top-filter-shadow").fadeOut(250);
    }
  }
  
  // Фиксация меню в левой колонке
  
  if ($(".nav-placeholder").length) {
    if ($(window).scrollTop() > parseInt($(".nav-placeholder").offset().top - 70)) {
      if ($(".main-column").height() > $(".sidebar").height()) {
        $(".nav-calendar-wrapper").addClass("nav-fixed").css({
          position: "fixed",
          top: 70
        });
        if ($(".nav-calendar-wrapper").offset().top >= $(".footer").offset().top - $(".nav-calendar-wrapper").outerHeight(true) - 25) {
          $(".nav-calendar-wrapper").addClass("nav-abs").removeClass("nav-fixed").css({
            position: "absolute",
            top: $(".main-column").height() - $(".nav-calendar-wrapper").height()
          });
        } 
        
        if ($(".nav-calendar-wrapper").hasClass("nav-abs")) {
          if ($(window).scrollTop() < $(".nav-abs").offset().top - 70) {
            $(".nav-calendar-wrapper").removeClass("nav-abs").addClass("nav-fixed").css({
              position: "fixed",
              top: 70
            });
          }
        }
      }
    } else {
      $(".nav-calendar-wrapper").removeClass("nav-fixed").css({
        position: "relative",
        top: "auto"
      });
    }
  }
  
  // if ($(window).scrollTop() > $(".sidebar").offset().top) {
    // $(".up-link *").fadeIn(250);
    // $(".sidenav").stop().animate({
      // top: $(window).scrollTop() - $(".sidebar").offset().top + 20
    // },500);
  // } else {
    // $(".up-link *").stop().fadeOut(250);
  // }
  
  // Автоподгрузка при скролле
  
	if (($(window).scrollTop() > parseInt($(document).height() - $(".footer").height() - $(window).height() - 50)) && !$(".navigation").hasClass("loaded")) {
	   
		$(".navigation").addClass("loaded");
		var page = $(".navigation").find(".next_page").attr("rel");
		var url = $(".navigation").find(".next_page").attr("href");
		if(page){
		
			if ($(".experts").length) {
				$.ajaxhelper({
					url: url,
					method : "get",
					beforeSend 		: function()	{
						$("body").css("cursor","progress");
					},
					success:function(data){
						$(".navigation").remove();
						$(".experts").append(data);
						$("body").css("cursor","default");
						preparePage();
						
					}
				}) 
			
			} else if($(".search_list_elements").length){
				$.ajaxhelper({
					url: url,
					method : "get",
					beforeSend 		: function()	{
						$("body").css("cursor","progress");
					},
					success:function(data){
						$(".navigation").remove();
						$(".search_list_elements").append(data);
						$("body").css("cursor","default");
						preparePage();
						
					}
				})
			
			} else
			{
				 $.ajaxhelper({
					url: url,
					method : "get",
					beforeSend 		: function()	{
						$("body").css("cursor","progress");
					},
					success:function(data){
						$(".navigation").remove();
						$(".main-column").append(data);
						$("body").css("cursor","default");
						preparePage();
						
					}
				}) 
			}
		

		}
		return false;

	} 
  
}); 

$(document).ready(function () {

	$(".expandable").customExpandable();

	// Фэнсибокс с окном логина
	
	$(".login-fancybox").fancybox({
		// maxWidth	: 800,
		// maxHeight	: 600,
		fitToView	: false,
		width		: 730,
		height		: 'auto',
		autoSize	: false,
		closeClick	: false,
		openEffect	: 'none',
		closeEffect	: 'none',
		tpl: {
			wrap     : '<div class="fancybox-wrap fancybox-login" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>'
		},
		afterShow: function() {
			makeup()
		}
	});

	// Пойду/ не пойду в мероприятиях
	$(".event_go_button").click(function(){
		var idEl = $(this).data("id");
		var toGo = $(this).data("to");
		var _this = $(this);
		$.ajaxhelper({
			url: "/go.php",
			params : {id:idEl, to:toGo},
			beforeSend : function()	{
				$("body").css("cursor","progress");
			},
			success:function(data){
				$(".total_go_value").text(data);
				if(toGo){
					_this.data("to", 0);
					_this.text("Я не пойду");
				} else {
					_this.data("to", 1);
					_this.text("Я пойду");
				}
				$("body").css("cursor","default");
			}
		})
		
	})
	
	$(".post-controls div").click(function() {
		$(".post-controls").css("z-index",5);
		$(this).parents(".post-controls").css("z-index",6);
	});

  validateForms();
  
	$(".content-filter .date-filter-trigger .ttl").click(function() {
		if (!$(this).parents(".date-filter-trigger").hasClass("date-filter-trigger-on")) {
			$(this).parents(".date-filter-trigger").addClass("date-filter-trigger-on");
			$(".content-date-filter").slideDown(150);
		}
	});
	
	$(".content-filter .date-filter-trigger .close").click(function() {
		$(".content-date-filter").slideUp(150);
		$(this).parents(".date-filter-trigger").removeClass("date-filter-trigger-on");
		
		$('.content-date-filter .form-select [value="0"]').attr("selected", "selected");
		$('.content-date-filter .param-sel .sel-value').text('-');
		$('.content-date-filter .dropdown div').each(function(){
			$(this).removeClass('selected');
		});
		$('.content-date-filter .dropdown [val=0]').addClass('selected'); 

		
	});
	
  $('.form-checkboxes input').on('ifChecked', function(event){
    $(this).parents(".form-checkboxes").find("label.error").remove();
  });
  
  $(".form-checkboxes").on('click', "label",  function(event){
    $(this).parents(".form-checkboxes").find("label.error").remove();
	$("#"+$(this).attr("for")).iCheck('check');
  });

  //клик по кнопке "показать еще"
  $(document).on("click", ".rating-show-more a", function() {
    var page = $(this).attr("rel");
    var url = "/ratings/?PAGEN_1="+page;
    var tab = $(this).parents('.rating-content').attr('id');
    console.log(tab);
	//var url = $(this).attr("href");
	//var del = page - 1;
	if(page){
		 $.ajaxhelper({
			url: url,
			method : "get",
			beforeSend : function()	{
				$("body").css("cursor","progress");
			},
			success:function(data){
				 $("#" + tab + " #navigation_" + page).remove(); //удаляем навигацию с прошлой страницы
				
				//добавляем ссылку на след. страницу
				var link = $(data).find("div.rating-show-more");
				$("#" + tab + " #rating-table-content").append($(link));
				
				//добавляем блок 
				$("#" + tab + " #rating_table").append(data);
				
				//удаляем временную навигацию из скрытого блока
				$("#" + tab + " #temp_navigation").remove();
				
				$("body").css("cursor","default");
				preparePage();
			}
		}) 
	}
	return false; 
  });

  //согласие в форме регистрации
    $('#regForm input#7').on('change', function(){
	    console.log('test123');
    });

  $(".form-text,.form-password, .form-textarea").each(function() {
    if ($(this).val()) {
      $(this).prev(".placeholder").hide();
    }
  });

  $("input:text, input:password, textarea, input:password").each(function() {
    $(this).addClass("initial");
    
    if ($(this).prop("tagName") == "INPUT" || $(this).prop("tagName") == "TEXTAREA") {
      // if (!$(this).parents(".input-wrapper").length) $(this).wrap("<div class='input-wrapper'></div>");
      if ($(this).hasClass("form-phone") || $(this).hasClass("form-date")) {
        $(this).focus(function() {
          $(this).removeClass("initial");
          $(this).parents(".form-item").find(".placeholder").hide();
        });
      } else {
        $(this).focus(function() {
          $(this).parents(".form-item").find(".placeholder").addClass("placeholder-initial");
        });
        $(this).keydown(function() {
          $(this).removeClass("initial");
          $(this).parents(".form-item").find(".placeholder").hide();
        });
      }
      $(this).blur(function() {
        $(this).prev().prev(".placeholder").hide();
        $(this).parents(".form-item").find(".placeholder").removeClass("placeholder-initial");
        if (!$(this).val()) {
          $(this).addClass("initial");
          $(this).parents(".form-item").find(".placeholder").show();
        }
      });
    } else {
      $(this).focus(function() {
        $(this).removeClass("initial");
        $(this).parents(".form-item").find(".placeholder").hide();
      });
      $(this).blur(function() {
        if (!$(this).val()) {
          $(this).addClass("initial");
          $(this).parents(".form-item").find(".placeholder").show();
        }
      });
    }
      
    $(this).parents(".form-item").find(".placeholder").click(function() {
      $(this).focus();
    });
    
  });
  
  
  // if (window.location.hash == "#comments") {
    // $("html,body").animate({
      // scrollTop: $(".comments-block").offset().top + 150
    // },100)
  // }

  // Календарь новостей
  
  $(".nav-calendar span.year").click(function() {
    if (!$(this).hasClass("year-act")) {
      $(".nav-calendar li ul").slideUp(250)
      $(this).parents("li").children("ul").slideDown(250);
      //$(".nav-calendar .month-act").removeClass("month-act");
      $(".nav-calendar .year-act").removeClass("year-act");
      $(this).addClass("year-act");
    } else {
      $(this).parents("li").children("ul").slideUp(250);
      //$(".nav-calendar .month-act").removeClass("month-act");
      $(this).removeClass("year-act");
    }
  });
  
  $(".nav-calendar a.year").click(function() {
    if (!$(this).hasClass("year-act")) {
      $(".nav-calendar li ul").slideUp(250)
      //$(this).parents("li").children("ul").slideDown(250);
      $(".nav-calendar .month-act").removeClass("month-act");
      $(".nav-calendar .year-act").removeClass("year-act");
      $(this).addClass("year-act");
    }
  });
  
  $(".nav-calendar li li a").click(function() {
    $(".month-act").removeClass("month-act");
    $(".nav-calendar .month-act").removeClass("month-act");
    $(this).addClass("month-act");
	
  });
  
  // Обработка клика по кнопке поиска - раскрытие и скрытие формы

  $(".search-trigger").click(function() {
    $('.search-trigger .txt').html($('.search-trigger .txt').text() == 'Поиск по сайту' ? 'Свернуть поиск' : 'Поиск по сайту');
    $(".search-block").slideToggle(250);
    $(".search-trigger .ico").toggleClass("ico-collapse");
  });
  
  // Всплывающее окно с меню пользователя в шапке

  $(".user-link").hover(function() {
    $(".user-controls").fadeToggle(150);
  });

  // Плагин с соцкнопками
  
  var addthis_config = {"data_track_addressbar":true};

  var addthisScript = document.createElement('script');
  addthisScript.setAttribute('src', 'http://s7.addthis.com/js/300/addthis_widget.js#domready=1')
  document.body.appendChild(addthisScript)
  
  // Фильтр в шапке
  
  $(".top-filter-locked a").on("click",function() {
    return false;
  });

  // Top filter
  // , .nav-calendar a, .section-filter a
	$(".top-filter").not(".top-filter-locked").find("a").on("click", function(){
		
		elementLoader("news_list_pageID");
		var href = $(this).attr("href");
		var questionPos = href.indexOf("?");

		if ( questionPos != -1 ) {
			var queryString = href.slice(questionPos-(-1));	//только параметры
			var clearUrl = href.slice(0, questionPos);	
		} else {
			var clearUrl = href;
		}
		
		
		var oldQuery = "";
		if($("body").data("topQuery")){
			oldQuery = $("body").data("topQuery");
		}
		if($(this).parent().hasClass("act") && oldQuery.length){
			// удалить параметр
			var newQuery = oldQuery.replace("&"+queryString, "");
		} else {
			if($(".top-filter li.act").length>=2){
				$(".top-filter li.act").removeClass("act");
				$("body").data("topQuery", "");
				oldQuery = "";
			}
			
			// добавить параметр
			var newQuery = oldQuery+"&"+queryString;
		}
		$(this).parent().toggleClass("act");
		
		$("body").data("topQuery", newQuery);
		
		// собрать все фильтры
		
		if($("body").data("rubricQuery")){
			newQuery = newQuery+$("body").data("rubricQuery");
		}
		if($("body").data("calendarQuery")){
			newQuery = newQuery+"&"+$("body").data("calendarQuery");
		}
		if($("body").data("sortQuery")){
			newQuery = newQuery+"&"+$("body").data("sortQuery");
		}
		$.ajaxhelper({
			url : clearUrl+"?"+newQuery,
			beforeSend 		: function()	{
				$("body").css("cursor","progress");
			},
			success:function(data){
				
				var result = $(data).html();
				$(".main-column").html(data);
				$("body").css("cursor","default");
				preparePage();
				evCalendar();
				removeLoader("news_list_pageID");
				
			}
		})
		return false;
	}) 
	
	// SORT
	$(".top-main").on("click", ".section-filter a", function(){
		elementLoader("news_list_pageID");
		var href = $(this).attr("href");
		var questionPos = href.indexOf("?");

		if ( questionPos != -1 ) {
			var queryString = href.slice(questionPos-(-1));	//только параметры
			var clearUrl = href.slice(0, questionPos);	
		} else {
			var clearUrl = href;
		}
		
		$("body").data("sortQuery", queryString);
		// собрать все фильтры
		if($("body").data("topQuery")){
			queryString = queryString+$("body").data("topQuery");
		}
		if($("body").data("calendarQuery")){
			queryString = queryString+"&"+$("body").data("calendarQuery");
		}
		
		$.ajaxhelper({
			url : clearUrl+"?"+queryString,
			success:function(data){
				var result = $(data).html();
				$(".main-column").html(data);
				$("body").css("cursor","default");
				preparePage();
				removeLoader("news_list_pageID");
			}
		})
		return false;
	})
	
	//новый фильтр
	$(".content-filter-content").on("click", "#right_filter_submit", function(){
		
		var fields = $('#right_filter_form_block form:eq(0)').serialize();
		var href = $('#right_filter_form_block form:eq(0)').attr("action");
		
		elementLoader("news_list_pageID");
		
		var questionPos = href.indexOf("?");

		if ( questionPos != -1 ) {
			var queryString = href.slice(questionPos-(-1));	//только параметры
			var clearUrl = href.slice(0, questionPos);	
		} else {
			var clearUrl = href;
		}
		
		$.ajaxhelper({
			url : clearUrl+"?"+queryString + "&" + fields,
			method : "get",
			success:function(data){
				var result = $(data).html();
				$(".main-column").html(data);
				$("body").css("cursor","default");
				preparePage();
				removeLoader("news_list_pageID");
			}
		})
		return false;
	})
	 
	
	// Calendar
	$(".top-main").on("click", ".nav-calendar a", function(){
		elementLoader("news_list_pageID");
		var href = $(this).attr("href");
		var questionPos = href.indexOf("?");

		if ( questionPos != -1 ) {
			var queryString = href.slice(questionPos-(-1));	//только параметры
			var clearUrl = href.slice(0, questionPos);	
		} else {
			var clearUrl = href;
		}
		
		$("body").data("calendarQuery", queryString);
		// собрать все фильтры
		if($("body").data("topQuery")){
			queryString = queryString+$("body").data("topQuery");
		}
		if($("body").data("sortQuery")){
			queryString = queryString+"&"+$("body").data("sortQuery");
		}
		
		//ajaxUpdateHref(queryString, clearUrl+"?"+queryString);
		
		$.ajaxhelper({
			url : clearUrl+"?"+queryString,
			method : "get",
			success:function(data){
				var result = $(data).html();
				$(".main-column").html(data);
				$("body").css("cursor","default");
				preparePage();
				removeLoader("news_list_pageID");
			}
		})
		return false;
	}) 
  
	preparePage();

  // Separating news items by rows

  

/*  if ($(".newslist").length) {

    $(".newslist").each(function() {

      var list = $(this);

     

     if (!$(this).children(".newslist-item-big").length) {

        

        var items = list.children(".newslist-item");

        

       for(var i = 0; i < items.length; i+=2) {

          items.slice(i, i+2)

             .wrapAll("<div class='newslist-row fc' />");

        }

        

      

		 list.find(".newslist-row").first().addClass("first-row");     

      } else {
       list.addClass("newslist-alternate")
     } 
      

  

      

    });

 }*/
  
});

// Календарь событий на главной странице

(function( jQuery ) {
  jQuery.fn.mainpageCalendar = function() {
    
    var calendar = $(this);
    
    var eventsXml = $.getValues("/calendar/calendar.xml.php");
    
    if (eventsXml) {
    
      var events = $.xml2json(eventsXml).event;
      
      var curDateObj = new Date();
      
      // Определяем текущую дату с точностью до дня
      
      var curDate = new Date(curDateObj.getFullYear(),curDateObj.getMonth(),curDateObj.getDate());
      
      for (i in events) {
        eDateStr = events[i].date.split(".");
        eDay = eDateStr[0];
        eMonth = eDateStr[1];
        eYear = eDateStr[2];
        var eDate = new Date(eYear, eMonth-1, eDay);
        if (eDate - curDate >= 0) {
          var startIndex = parseInt(i);
          break;
        } else {
          var startIndex = events.length - 3;
        }
      }
      
      finishIndex = startIndex + 2;
      
      if (finishIndex >= events.length) {
        finishIndex = events.length - 1
      }
      
      if (startIndex > 0) {
        var prevBtn = $("<div class='prev'><span class='arr'></span><span class='text'>Предыдущие события</span></div>");
      } else {
        var prevBtn = $("<div class='prev inact'><span class='arr'></span><span class='text'>Предыдущие события</span></div>");
      }
      
      if ((startIndex+3) < events.length) {
        var nextBtn = $("<div class='next'><span class='arr'></span><span class='text'>Предстоящие события</span></div>");
      } else {
        var nextBtn = $("<div class='next inact'><span class='arr'></span><span class='text'>Предстоящие события</span></div>");
      }
      
      calendar.append(prevBtn);
      calendar.append(nextBtn);
      
      
      var calContent = $("<div class='calendar-content'></div>");
    
    
      calendar.append(calContent);

      var calSlider = $("<div class='calendar-slider'></div>");

      calendar.append(calSlider);
      
      calSlider.append(calContent)
      
      for (j=startIndex;j<(startIndex+3);j++) {
        if (j < events.length) insertCalCard(j,events,calContent,'after');
      }
      
      calSlider.find(".calendar-card").eq(0).addClass("first-visible")
      
      prevBtn.click(function() {
      
        if (!$(this).hasClass("inact") && !calSlider.hasClass("moving")) {
          
          calSlider.addClass("moving");
          
          nextBtn.removeClass("inact");
          
          prevStart = startIndex;
          
          startIndex = finishIndex - 3;
          
          if (startIndex <= 0) {
            startIndex = 0;
            prevBtn.addClass("inact");
          }
          
          finishIndex = startIndex + 2;
          
          
          lastInsertIndex = finishIndex-calContent.children(".calendar-card[index='"+parseInt(finishIndex+1)+"']").prevAll(".calendar-card").length;
          
          // slideDistance = 294*(prevStart - startIndex);
          slideDistance = $(".mainpage-calendar .calendar-card").outerWidth(true)*(prevStart - startIndex);

          if (!calContent.children(".calendar-card[index='"+startIndex+"']").length) {
            var insertedNum = 0;
            for (j=lastInsertIndex;j>=startIndex;j--,insertedNum++) {
              insertCalCard(j,events,calContent,'before');
            }
            calContent.css("width",calendar.find(".calendar-content").width() + slideDistance).css("left",calContent.position().left - $(".mainpage-calendar .calendar-card").outerWidth(true)*insertedNum).stop().animate({
              left: calContent.position().left + slideDistance
            },500,function() {
              calSlider.removeClass("moving");
              var fv = calSlider.find(".first-visible");
              fv.removeClass("first-visible");
              //fv.prev().addClass("first-visible");
              calSlider.find(".calendar-card[index='"+startIndex+"']").addClass("first-visible")
            });
          } else {
            calendar.find(".calendar-content").animate({
              left: calContent.position().left + slideDistance
            },500,function() {
              calSlider.removeClass("moving");
              var fv = calSlider.find(".first-visible");
              fv.removeClass("first-visible");
              //fv.prev().addClass("first-visible");
              calSlider.find(".calendar-card[index='"+startIndex+"']").addClass("first-visible")
            });
          }
          
          
        }
        
        addthis.toolbox(".addthis_toolbox");
        addthis.counter(".addthis_counter");
          
      });
      
      nextBtn.click(function() {
      
        if (!$(this).hasClass("inact") && !calSlider.hasClass("moving")) {
          
          calSlider.addClass("moving");
          
          prevBtn.removeClass("inact");
          
          prevFinish = finishIndex;
          
          finishIndex = finishIndex + 1;
          
          if (finishIndex >= events.length-1) {
            finishIndex = events.length - 1;
            nextBtn.addClass("inact");
          }
          
          startIndex = finishIndex - 2;
          
          slideDistance = $(".mainpage-calendar .calendar-card").outerWidth(true)*(finishIndex - prevFinish);
          
          if (!calContent.children(".calendar-card[index='"+finishIndex+"']").length) {
            firstInsertIndex = startIndex+calContent.children(".calendar-card[index='"+parseInt(startIndex-1)+"']").nextAll(".calendar-card").length;
            for (j=firstInsertIndex;j<=finishIndex;j++) {
              insertCalCard(j,events,calContent,'after');
            }
            
            calendar.find(".calendar-content").css("width",calendar.find(".calendar-content").width() + slideDistance).stop().animate({
              left: calContent.position().left - slideDistance
            },500,function() {
              calSlider.removeClass("moving");
              var fv = calSlider.find(".first-visible");
              fv.removeClass("first-visible");
              fv.next().addClass("first-visible");
            });
          } else {
            calendar.find(".calendar-content").animate({
              left: calContent.position().left - slideDistance
            },500,function() {
              calSlider.removeClass("moving");
              var fv = calSlider.find(".first-visible");
              fv.removeClass("first-visible");
              fv.next().addClass("first-visible");
            });
          }
          
          
        }
        
        addthis.toolbox(".addthis_toolbox");
        addthis.counter(".addthis_counter");
          
      });
      
      
    } else {
      alert("Произошла техническая ошибка. Попробуйте перегрузить страницу.");
    }
  }
})( jQuery );

// Календарь событий

(function( jQuery ) {
  jQuery.fn.eventsCalendar = function() {
    
    var calendar = $(this);
    
    var eventsXml = $.getValues("calendar.xml.php");
    
    if (eventsXml) {
    
      var events = $.xml2json(eventsXml).event;
      
      var curDateObj = new Date();
      
      // Определяем текущую дату с точностью до дня
      
      var curDate = new Date(curDateObj.getFullYear(),curDateObj.getMonth(),curDateObj.getDate());
      
      for (i in events) {
        eDateStr = events[i].date.split(".");
        eDay = eDateStr[0];
        eMonth = eDateStr[1];
        eYear = eDateStr[2];
        var eDate = new Date(eYear, eMonth-1, eDay);
        if (eDate - curDate >= 0) {
          var showFuture = 1;
          var showPast = 0;
          var firstFutureIndex = i;
          break;
        } else {
          var showFuture = 0;
          var showPast = 1;
        }
        
      }
      
      var calContent = $("<div class='calendar-content'></div>");
    
      calendar.append(calContent);
      
      calContent.wrap("<div class='calendar-wrapper' />");
      
      calendar.find(".month-nav").append("<div class='prev inact'></div>");
      calendar.find(".month-nav").append("<div class='next inact'></div>");
      
      var prevBtn = calendar.find(".month-nav .prev");
      var nextBtn = calendar.find(".month-nav .next");
      
      calendar.find(".month-nav").append("<div class='cal-popup' />");
      
      var calPopup = calendar.find(".cal-popup");
      
      calPopup.append("<div class='pt' />");
      calPopup.append("<div class='close' />");
      
      calPopup.append("<div class='cal-popup-years' />");
      calPopup.append("<div class='cal-popup-months' />");
      
      var yearsList = calPopup.find(".cal-popup-years");
      var monthsList = calPopup.find(".cal-popup-months");
      
      var prevYear = 0;
      var prevMonth = 0;
      
      for (i in events) {
       
        eDateStr = events[i].date.split(".");
        eDay = eDateStr[0];
        eMonth = eDateStr[1];
        eYear = eDateStr[2];
        var eDate = new Date(eYear, eMonth-1, eDay);
        if (eDate - curDate >= 0) {
          if (eYear != prevYear || i == firstFutureIndex) {
            yearsList.append("<div class='item cn-future' year='"+eYear+"'><span>"+eYear+"</span></div>");
          }
        } else {
          if (eYear != prevYear) {
            yearsList.append("<div class='item cn-past' year='"+eYear+"'><span>"+eYear+"</span></div>")
          }
        }
        
        prevYear = eYear;
        
      }
      
      
      var yearsArray = new Array();
      
      
      prevYear = 0;
      
      yearsList.find(".item").each(function() {
        var yaItem = parseInt($(this).attr("year"));
        if (yaItem != prevYear) {
          yearsArray.push(yaItem);
        }
        prevYear = yaItem;
      });
      
      
      for (j in yearsArray) {
        prevMonth = 0;
        count = 0;
        var navYear = yearsArray[j];
        
        for (i=0;i<12;i++) {
          monthsList.append("<div class='item cn-past empty'><span>"+monthName2[parseInt(i,10)]+"</span><span class='count'></span></div>");
        }
        
        for (i in events) {
          eDateStr = events[i].date.split(".");
          eDay = eDateStr[0];
          eMonth = eDateStr[1];
          eYear = eDateStr[2];
          
          monthsList.find(".item").eq(eMonth-1).attr("year",eYear).attr("month",parseInt(eMonth,10)).removeClass("empty");
          
          var eDate = new Date(eYear, eMonth-1, eDay);
          if (eYear == navYear) {
            if (eDate - curDate >= 0) {
              if (eMonth != prevMonth || i == firstFutureIndex) {
                //monthsList.append("<div class='item cn-future' year='"+eYear+"' month='"+parseInt(eMonth,10)+"'><span>"+monthName2[parseInt(eMonth,10)-1]+"</span><span class='count'></span></div>");
                count = 1;
              } else {
                count++
              }
              monthsList.find(".cn-future[year='"+eYear+"'][month='"+parseInt(eMonth,10)+1+"'] .count").html(count);
            } else {
              if (eMonth != prevMonth) {
                

                //monthsList.append("<div class='item cn-past' year='"+eYear+"' month='"+parseInt(eMonth,10)+"'><span>"+monthName2[parseInt(eMonth,10)-1]+"</span><span class='count'></span></div>");
                count = 1;
              } else {
                count++
              }
              
              monthsList.find(".item").eq(eMonth-1).find(".count").html(count);
              // monthsList.find(".cn-past[year='"+eYear+"'][month='"+parseInt(eMonth,10)+"'] .count").html(count);
            }
            
            prevMonth = eMonth;
          } else {
            prevMonth = 0;
          }
        }
      }
      
      if (showFuture) {
      
        $(".month-nav").hide();
        
        var startIndex = firstFutureIndex;
        var futureTab = $("<div class='tab act' rel='upcoming'><div class='cont'><span>Предстоящие</span></div></div>");
        
        if (window.location.hash == "") {
          window.location.hash = '#upcoming'
        }
        
        calendar.find(".tabs").append(futureTab);
        
        var curYear = parseInt(events[startIndex].date.split(".")[2],10);
        
        var curMonth = parseInt(events[startIndex].date.split(".")[1],10);
        
        //calPopup.find(".item").hide();
        yearsList.find(".cn-future").show();
        
        yearsList.find(".item").removeClass("act");
        yearsList.find(".cn-future[year='"+curYear+"']").addClass("act");
        
        monthsList.find(".item").removeClass("act");
        monthsList.find(".cn-future[year='"+curYear+"']").show();
        monthsList.find(".cn-future[year='"+curYear+"'][month='"+curMonth+"']").addClass("act");
        
        // for (i=startIndex;i<events.length;i++) {
          // if (parseInt(events[i].date.split(".")[1],10) != curMonth || parseInt(events[i].date.split(".")[2],10) != curYear) {
            // var finishIndex = i-1;
            // break;
          // }
        // }
        
        var finishIndex = events.length - 1;
        
        insertEventCards(startIndex,finishIndex,events,calContent);
        
        calendar.find(".month-nav").append("<div class='month'><span>" + monthName2[curMonth-1] + " " + curYear + "</span></div>");
        
        if (finishIndex < events.length) {
          nextBtn.removeClass("inact")
        }
        
      }
      
      if (events.length) {
        var pastTab = $("<div class='tab' rel='archive'><div class='cont'><span>Хроника событий</span></div></div>");
        calendar.find(".tabs").append(pastTab);
      }
      
      if (showPast) {
      
        $(".month-nav").show();
        
        pastTab.addClass("act");
        
        if (window.location.hash == "") {
          window.location.hash = '#archive'
        }
        
        var curYear = parseInt(events[events.length-1].date.split(".")[2],10);

        var curMonth = parseInt(events[events.length-1].date.split(".")[1],10);
        
        //calPopup.find(".item").hide();
        yearsList.find(".cn-past").show();
        
        yearsList.find(".item").removeClass("act");
        yearsList.find(".cn-past[year='"+curYear+"']").addClass("act");
        
        monthsList.find(".item").removeClass("act");
        monthsList.find(".cn-past[year='"+curYear+"']").show();
        monthsList.find(".cn-past[year='"+curYear+"'][month='"+curMonth+"']").addClass("act");
        
        var finishIndex = events.length-1;
        
        for (i=finishIndex;i>=0;i--) {
          if (parseInt(events[i].date.split(".")[1],10) != curMonth || parseInt(events[i].date.split(".")[2],10) != curYear) {
            var startIndex = i+1;
            break;
          } else if (i==0) {
            var startIndex = 0;
            prevBtn.addClass("inact")
          }
        }
        
        insertEventCards(startIndex,finishIndex,events,calContent)
        
        calendar.find(".month-nav").append("<div class='month'><span>" + monthName2[curMonth-1] + " " + curYear + "</span></div>");
        
        if (startIndex > 0) {
          prevBtn.removeClass("inact")
        }
        
      }
      
      if (showPast) {
        minIndex = 0;
        maxIndex = firstFutureIndex - 1;
      }
      
      if (showFuture) {
        minIndex = firstFutureIndex;
        maxIndex = events.length - 1;
      }
      
      calPopup.find(".close").click(function() {
        calPopup.fadeOut(250)
      });
      
      prevBtn.click(function() {
        if (!$(this).hasClass("inact")) {
          var finishIndex = parseInt(calContent.find(".calendar-card").eq(0).attr("index"),10) - 1;
          
          var curYear = parseInt(events[finishIndex].date.split(".")[2],10);

          var curMonth = parseInt(events[finishIndex].date.split(".")[1],10);
          
          if ($(".tab[rel='archive']").hasClass("act")) {
            //calPopup.find(".item").hide();
            yearsList.find(".cn-past").show();
            
            yearsList.find(".item").removeClass("act");
            yearsList.find(".cn-past[year='"+curYear+"']").addClass("act");
            
            monthsList.find(".item").removeClass("act");
            monthsList.find(".cn-past[year='"+curYear+"']").show();
            monthsList.find(".cn-past[year='"+curYear+"'][month='"+curMonth+"']").addClass("act");
          } else {
            //calPopup.find(".item").hide();
            yearsList.find(".cn-future").show();
            
            yearsList.find(".item").removeClass("act");
            yearsList.find(".cn-future[year='"+curYear+"']").addClass("act");
            
            monthsList.find(".item").removeClass("act");
            monthsList.find(".cn-future[year='"+curYear+"']").show();
            monthsList.find(".cn-future[year='"+curYear+"'][month='"+curMonth+"']").addClass("act");
          }
            
          
          calendar.find(".month-nav .month span").html(monthName2[curMonth-1] + " " + curYear);
          
          for (i=finishIndex;i>=0;i--) {
            if (parseInt(events[i].date.split(".")[1],10) != curMonth || parseInt(events[i].date.split(".")[2],10) != curYear) {
              var startIndex = i+1;
              break;
            } else if (i==0) {
              var startIndex = 0;
              prevBtn.addClass("inact")
            }
          }
          
          if (startIndex == minIndex) {
            prevBtn.addClass("inact")
          }
          
          nextBtn.removeClass("inact")
          
          insertEventCards(startIndex,finishIndex,events,calContent)
          
        }
      })
      
      nextBtn.click(function() {
        if (!$(this).hasClass("inact")) {
          var startIndex = parseInt(calContent.find(".calendar-card").last().attr("index"),10) + 1;
          
          var curYear = parseInt(events[startIndex].date.split(".")[2],10);

          var curMonth = parseInt(events[startIndex].date.split(".")[1],10);
          
          var curDay = parseInt(events[startIndex].date.split(".")[0],10);
          
          if ($(".tab[rel='archive']").hasClass("act")) {
            //calPopup.find(".item").hide();
            yearsList.find(".cn-past").show();
            
            yearsList.find(".item").removeClass("act");
            yearsList.find(".cn-past[year='"+curYear+"']").addClass("act");
            
            monthsList.find(".item").removeClass("act");
            monthsList.find(".cn-past[year='"+curYear+"']").show();
            monthsList.find(".cn-past[year='"+curYear+"'][month='"+curMonth+"']").addClass("act");
          } else {
            //calPopup.find(".item").hide();
            yearsList.find(".cn-future").show();
            
            yearsList.find(".item").removeClass("act");
            yearsList.find(".cn-future[year='"+curYear+"']").addClass("act");
            
            monthsList.find(".item").removeClass("act");
            monthsList.find(".cn-future[year='"+curYear+"']").show();
            monthsList.find(".cn-future[year='"+curYear+"'][month='"+curMonth+"']").addClass("act");
          }
          
          calendar.find(".month-nav .month span").html(monthName2[curMonth-1] + " " + curYear);
          
          // Сделать, чтобы при листании вперед в хронике до конца не показывались будущие события
          
          
          for (i=startIndex;i<events.length;i++) {
            if (parseInt(events[i].date.split(".")[1],10) != curMonth || parseInt(events[i].date.split(".")[2],10) != curYear || i == firstFutureIndex) {
              var finishIndex = i-1;
              // alert(finishIndex)
              if (i==firstFutureIndex) {
                nextBtn.addClass("inact")
              }
              break;
            }
          }
          
          if (finishIndex == maxIndex) {
            nextBtn.addClass("inact")
          }
          
          prevBtn.removeClass("inact")
          
          insertEventCards(startIndex,finishIndex,events,calContent)
          
        }
      })
      
      
      pastTab.click(function() {
        
        $(".month-nav").show();
        
        window.location.hash = '#archive'
        
        $(".top-filter a").each(function() {
          $(this).attr("href",$(this).attr("href").split("#")[0] + "#archive");
        });
        
        minIndex = 0;
        
        if (firstFutureIndex) {
          maxIndex = firstFutureIndex - 1;
        } else {
          maxIndex = events.length - 1;
        }
        
        
        var finishIndex = maxIndex;
        
        nextBtn.addClass("inact");
        
        pastTab.addClass("act");
        futureTab.removeClass("act");
        
        var curYear = parseInt(events[finishIndex].date.split(".")[2],10);

        var curMonth = parseInt(events[finishIndex].date.split(".")[1],10);
        
        var curDay = parseInt(events[finishIndex].date.split(".")[0],10);
        
        
        //calPopup.find(".item").hide();
        yearsList.find(".cn-past").show();
        
        yearsList.find(".item").removeClass("act");
        yearsList.find(".cn-past[year='"+curYear+"']").addClass("act");
        
        monthsList.find(".item").removeClass("act");
        monthsList.find(".cn-past[year='"+curYear+"']").show();
        monthsList.find(".cn-past[year='"+curYear+"'][month='"+curMonth+"']").addClass("act");
        
        
        calendar.find(".month-nav .month span").html(monthName2[curMonth-1] + " " + curYear);
        
        for (i=finishIndex;i>=0;i--) {
          if (parseInt(events[i].date.split(".")[1],10) != curMonth || parseInt(events[i].date.split(".")[2],10) != curYear) {
            var startIndex = i+1;
            break;
          } else if (i==0) {
            var startIndex = 0;
            prevBtn.addClass("inact")
          }
        }
        
        insertEventCards(startIndex,finishIndex,events,calContent)
        
        if (startIndex > 0) {
          prevBtn.removeClass("inact")
        } else {
          prevBtn.addClass("inact")
        }
        
        
      });
      
      futureTab.click(function() {
      
        $(".month-nav").hide();
        
        window.location.hash = '#upcoming'
        
        $(".top-filter a").each(function() {
          $(this).attr("href",$(this).attr("href").split("#")[0] + "#upcoming");
        });
      
        maxIndex = events.length - 1;
        
        if (firstFutureIndex) {
          minIndex = firstFutureIndex;
        } else {
          minIndex = 0;
        }
        
        var startIndex = minIndex;
        
        prevBtn.addClass("inact");
        
        futureTab.addClass("act");
        pastTab.removeClass("act");
        
        var curYear = parseInt(events[startIndex].date.split(".")[2],10);

        var curMonth = parseInt(events[startIndex].date.split(".")[1],10);
        
        //calPopup.find(".item").hide();
        yearsList.find(".cn-future").show();
        
        yearsList.find(".item").removeClass("act");
        yearsList.find(".cn-future[year='"+curYear+"']").addClass("act");
        
        monthsList.find(".item").removeClass("act");
        monthsList.find(".cn-future[year='"+curYear+"']").show();
        monthsList.find(".cn-future[year='"+curYear+"'][month='"+curMonth+"']").addClass("act");
        
        calendar.find(".month-nav .month span").html(monthName2[curMonth-1] + " " + curYear);
        
        // for (i=startIndex;i<events.length;i++) {
          // if (parseInt(events[i].date.split(".")[1],10) != curMonth || parseInt(events[i].date.split(".")[2],10) != curYear) {
            // var finishIndex = i-1;
            // break;
          // } else if (i==events.length-1) {
            // finishIndex = events.length-1;
            // nextBtn.addClass("inact")
          // }
        // }
        
        // if (finishIndex == maxIndex) {
          // nextBtn.addClass("inact")
        // }
        
        var finishIndex = events.length - 1;
        
        insertEventCards(startIndex,finishIndex,events,calContent)
        
        // if (finishIndex < events.length) {
          // nextBtn.removeClass("inact")
        // } else {
          // nextBtn.addClass("inact")
        // }
        
      });
      
      
      
      monthsList.find(".item").not(".empty").click(function() {
      
        monthsList.find(".item").removeClass("act");
        $(this).addClass("act")
      
        var curYear = parseInt($(this).attr("year"),10);
        var curMonth = parseInt($(this).attr("month"),10);

        $(".month-nav .month span").html(monthName2[curMonth-1] + " " + curYear)
        
        for (i=0;i<events.length;i++) {
          if (parseInt(events[i].date.split(".")[1],10) == curMonth && parseInt(events[i].date.split(".")[2],10) == curYear) {
            var startIndex = i;
            break;
          }
        }
        for (i=startIndex;i<=events.length;i++) {
          if (i == events.length) {
            var finishIndex = i-1;
            break;
          } else if (parseInt(events[i].date.split(".")[1],10) != curMonth || parseInt(events[i].date.split(".")[2],10) != curYear) {
            var finishIndex = i-1;
            break;
          }
        }
        
        if (finishIndex == events.length-1 || finishIndex == firstFutureIndex) {
          nextBtn.addClass("inact")
        } else {
          nextBtn.removeClass("inact")
        }
        
        if (startIndex == firstFutureIndex || startIndex == 0) {
          prevBtn.addClass("inact")
        } else {
          prevBtn.removeClass("inact")
        }
        
        insertEventCards(startIndex,finishIndex,events,calContent)
        
        calPopup.fadeOut(250)
        
      });
      
      yearsList.find(".item").click(function() {
        yearsList.find(".item").removeClass("act");
        $(this).addClass("act");
        if ($(".tab[rel='archive']").hasClass("act")) {
          //monthsList.find(".cn-past[year='"+$(this).attr("year")+"']").first().click();
          monthsList.find(".cn-past").hide();
          monthsList.find(".cn-past[year='"+$(this).attr("year")+"']").show();
        } else {
          //monthsList.find(".cn-future[year='"+$(this).attr("year")+"']").first().click();
          monthsList.find(".cn-future").hide();
          monthsList.find(".cn-future[year='"+$(this).attr("year")+"']").show();
        }
      });
      
      calPopup.hover(function() {
        $(this).addClass("hover");
      },function() {
        $(this).removeClass("hover");
      });
      
      $(".events-calendar .month span").hover(function() {
        $(this).addClass("hover");
      },function() {
        $(this).removeClass("hover");
      });
      
      $(".events-calendar .month span").on("click",function() {
        $(".cal-popup").fadeToggle(250);
      });
      
      $("body").click(function() {
        if (!$(".events-calendar .month span").hasClass("hover") && !$(".cal-popup").hasClass("hover") && $(".cal-popup").css("display") == "block") {
          calPopup.fadeOut(250);
        }
      });
      
      
    } else {
      alert("Произошла техническая ошибка. Попробуйте перегрузить страницу.");
    }
    
  }
})( jQuery ); 

// Слайдер событий на главной

(function( jQuery ) {
  jQuery.fn.mainpageEventsSlider = function() {
    
    var slider = $(this);
    var eventContent = slider.children(".event-content");
    
    
    var links = slider.find(".event-link");
    
    links.click(function() {
      eventContent.html("<div class='event-wrapper' style='display:none;background:url(" + $(this).attr("hires") + ")'><div class='pic-mask'></div><div class='event-descr'>" + $(this).parents(".event-item").find(".event-descr").html() + "</div></div>");
      eventContent.children(".event-wrapper").fadeIn(150);
      return false;
    });
    
    links.eq(0).click();
    
  }
})( jQuery );

// Каталог на главной

(function( jQuery ) {
  jQuery.fn.mainpageCatalogue = function() {
    
    var catalogue = $(this);
    
    var catalogueXml = $.getValues("/catalogue.xml");
    
    if (catalogueXml) {
    
      var items = $.xml2json(catalogueXml).item;

      var startIndex = 0;
      
      var prevBtn = $("<div class='prev'></div>");
      
      catalogue.append(prevBtn);
    
      var nextBtn = $("<div class='next'></div>");
      
      catalogue.append(nextBtn);
      
      var catContent = $("<div class='catalogue-content'></div>");
    
      catalogue.append(catContent);
      
      var j = items.length - 1;
      
      var catCard = $("<div index='"+j+"' class='catalogue-card' />");
      
      buildCatCard(catCard,j,items);
        
      catCard.appendTo(catContent);
      
      for (j=startIndex;j<(startIndex+2);j++) {
        var catCard = $("<div index='"+j+"' class='catalogue-card' />");
        
        buildCatCard(catCard,j,items);
        
        
        
        catCard.appendTo(catContent);
      }
      
      catalogue.find(".catalogue-card").eq(0).addClass("act-prev")
      catalogue.find(".catalogue-card").eq(1).addClass("act").addClass("act-shadow")
      catalogue.find(".catalogue-card").eq(2).addClass("act-next")
      
      nextBtn.click(function() {
        
        if (!catalogue.hasClass("moving")) {
        
          catalogue.addClass("moving");
        
          var newIndex = parseInt($(".mainpage-catalogue .act").attr("index")) + 2;

          if (newIndex >= items.length) {
            newIndex = -items.length + parseInt($(".mainpage-catalogue .act").attr("index")) + 2;
          } 
          
          j = newIndex;
          
          catalogue.find(".catalogue-card").eq(0).css("z-index",1).fadeOut(350,function() {
            $(this).remove();
          });
          
          catalogue.find(".catalogue-card").eq(1).css("z-index",2).removeClass("act-shadow").animate({
            left: 0,
            top: 0
          },350,function() {
            $(this).removeClass("act").addClass("act-prev");
          });
          
          catalogue.find(".catalogue-card").eq(2).addClass("act-shadow").css("z-index",3).animate({
            left: catalogue.find(".act").position().left,
            top: catalogue.find(".act").position().top
          },350,function() {
            $(this).addClass("act").removeClass("act-next");
            catalogue.removeClass("moving");
          });
          
          var catCard = $("<div index='"+j+"' class='catalogue-card act-next' />");
          
          buildCatCard(catCard,j,items);
          
          catCard.appendTo(catContent).hide().fadeIn(350);
        
        }
        
      });
      
      prevBtn.click(function() {
      
        if (!catalogue.hasClass("moving")) {
        
          catalogue.addClass("moving");
      
          var newIndex = parseInt($(".mainpage-catalogue .act").attr("index")) - 2;

          if (newIndex < 0) {
            newIndex = items.length + parseInt($(".mainpage-catalogue .act").attr("index")) - 2;
          } 
          
          j = newIndex;
          
          var catCard = $("<div index='"+j+"' class='catalogue-card act-prev' />");
          
          buildCatCard(catCard,j,items);
          
          catCard.insertBefore(catContent.find(".catalogue-card").eq(0)).hide().fadeIn(350);
          
          catalogue.find(".catalogue-card").eq(3).css("z-index",1).fadeOut(350,function() {
            $(this).remove();
          });
          
          catalogue.find(".catalogue-card").eq(2).css("z-index",2).removeClass("act-shadow").animate({
            left: catalogue.find(".catalogue-card").eq(3).position().left,
            top: 0
          },350,function() {
            $(this).removeClass("act").addClass("act-next");
          });
          
          catalogue.find(".catalogue-card").eq(1).addClass("act-shadow").css("z-index",3).animate({
            left: catalogue.find(".act").position().left,
            top: catalogue.find(".act").position().top
          },350,function() {
            $(this).addClass("act").removeClass("act-prev");
            catalogue.removeClass("moving");
          });
        
        }
        
      });
      

      
    } else {
      alert("Произошла техническая ошибка. Попробуйте перегрузить страницу.");
    }
  }
})( jQuery );

// Рейтинги на главной

(function( jQuery ) {
  jQuery.fn.mainpageRatings = function() {
    
    var ratings = $(this);
    
    //var ratingsXml = $.getValues("/ratings.xml");
    var ratingsXml = $.getValues("/include/ind_ratings.php");
    
    if (ratingsXml) {
    
      var items = $.xml2json(ratingsXml).item;
      
      var startIndex = 0;
      
      var prevBtn = $("<div class='prev'></div>");
      
      ratings.append(prevBtn);
    
      var nextBtn = $("<div class='next'></div>");
      
      ratings.append(nextBtn);
      
      var ratContent = $("<div class='ratings-content fc'></div>");
    
      ratings.append(ratContent);
      
      var j = items.length - 1;
      
      for (j=startIndex;j<(startIndex+3);j++) {
        var ratCard = $("<div index='"+j+"' class='ratings-card fc' />");
        
        buildRatCard(ratCard,j,items);
        
        ratCard.appendTo(ratContent);
      }
      
      ratings.find(".ratings-card").eq(0).addClass("act")
      ratings.find(".ratings-card").eq(1).addClass("act-next")
      ratings.find(".ratings-card").eq(2).addClass("act-next-next")
      
      ratings.parents(".content-block").find("h2").append("<a class='rating-link' href='"+items[0].ratingurl+"'>"+items[0].ratingname+"</a>")
      
      nextBtn.click(function() {
        
        if (!ratings.hasClass("moving")) {
        
          ratings.addClass("moving");
        
          var newIndex = parseInt($(".mainpage-ratings .act").attr("index")) + 3;

          if (newIndex >= items.length) {
            newIndex = -items.length + parseInt($(".mainpage-ratings .act").attr("index")) + 3;
          } 
          
          j = newIndex;
          
          var actIndex = j-2;
          
          if (actIndex<0) {
            actIndex += items.length;
          }
          
          ratings.parents(".content-block").find(".rating-link").remove();
          ratings.parents(".content-block").find("h2").append("<a class='rating-link' href='"+items[actIndex].ratingurl+"'>"+items[actIndex].ratingname+"</a>")
          
          ratings.find(".ratings-card").eq(0).css("z-index",5).fadeOut(350,function() {
            $(this).remove().removeClass("act");
            
          });
          
          ratings.find(".ratings-card").eq(1).css("z-index",4).removeClass("act-shadow").animate({
            left: 0,
            top: 0
          },350,function() {
            $(this).removeClass("act-next").addClass("act");
          });
          
          ratings.find(".ratings-card").eq(2).css("z-index",3).animate({
            left: ratings.find(".act-next").position().left,
            top: ratings.find(".act-next").position().top
          },350,function() {
            $(this).addClass("act-next").removeClass("act-next-next");
            ratings.removeClass("moving");
          });
          
          var ratCard = $("<div index='"+j+"' class='ratings-card act-next-next' />");
          
          buildRatCard(ratCard,j,items);
          
          ratCard.appendTo(ratContent).hide().fadeIn(350);
        
        }
        
      });
      
      prevBtn.click(function() {
      
        if (!ratings.hasClass("moving")) {
        
          ratings.addClass("moving");
      
          var newIndex = parseInt($(".mainpage-ratings .act").attr("index")) - 1;
          
          if (newIndex < 0) {
            newIndex = items.length - 1;
          } 
          
          j = newIndex;
          
          ratings.parents(".content-block").find(".rating-link").remove();
          ratings.parents(".content-block").find("h2").append("<a class='rating-link' href='"+items[j].ratingurl+"'>"+items[j].ratingname+"</a>")
          
          var ratCard = $("<div index='"+j+"' class='ratings-card act' />");
          
          buildRatCard(ratCard,j,items);
          
          ratCard.insertBefore(ratContent.find(".ratings-card").eq(0)).hide().fadeIn(350);
          
          ratings.find(".ratings-card").eq(1).css("z-index",3).animate({
            left: ratings.find(".ratings-card").eq(2).position().left,
            top: ratings.find(".ratings-card").eq(2).position().top
          },350,function() {
            $(this).removeClass("act").addClass("act-next");
          });
          
          ratings.find(".ratings-card").eq(2).css("z-index",2).animate({
            left: ratings.find(".ratings-card").eq(3).position().left,
            top: ratings.find(".ratings-card").eq(3).position().top
          },350,function() {
            $(this).removeClass("act-next").addClass("act-next-next");
            ratings.removeClass("moving");
          });
          
          ratings.find(".ratings-card").eq(3).css("z-index",1).fadeOut(350,function() {
            $(this).remove();
          });
        
        }
        
      });
      

      
    } else {
      alert("Произошла техническая ошибка. Попробуйте перегрузить страницу.");
    }
  }
})( jQuery );

// Статичные рейтинги на главной

(function( jQuery ) {
  jQuery.fn.mainpageRatingsStatic = function() {
    
    var ratings = $(this);
    
    if (1) {
    
      var startIndex = 0;
      
      var prevBtn = $("<div class='prev'></div>");
      
      ratings.append(prevBtn);
			
    
      var nextBtn = $("<div class='next'></div>");
      
      ratings.append(nextBtn);

			var items = ratings.find(".ratings-card");

			if (items.length < 2) {
				prevBtn.addClass("button-inact")
				nextBtn.addClass("button-inact")
			}
			
      
      
      ratings.find(".ratings-card").eq(0).addClass("act")
      
      ratings.parents(".content-block").find("h2").append("<a class='rating-link' href='"+items.eq(0).data("ratingurl")+"'>"+items.eq(0).data("ratingname")+"</a>")
      
      nextBtn.click(function() {
        
        if (!ratings.hasClass("moving")) {
				
          ratings.addClass("moving");
					
					if (items.filter(".act").next().length) {
						var nextItem = items.filter(".act").next()
					} else {
						var nextItem = items.eq(0)
					}
        
          ratings.parents(".content-block").find(".rating-link").remove();
          ratings.parents(".content-block").find("h2").append("<a class='rating-link' href='"+nextItem.data("ratingurl")+"'>"+nextItem.data("ratingname")+"</a>")
          
					items.filter(".act").hide().removeClass("act");
        
					nextItem.show().addClass("act").css({
						opacity: 0,
						marginLeft:10,
						marginTop:10
					}).animate({
						opacity: 1,
						marginLeft: 0,
						marginTop: 0
					},250,function() {
						ratings.removeClass("moving");
					});
					
				}
				
      });
      
      prevBtn.click(function() {
        
        if (!ratings.hasClass("moving")) {
				
          ratings.addClass("moving");
					
					if (items.filter(".act").prev().length) {
						var nextItem = items.filter(".act").prev()
					} else {
						var nextItem = items.eq(items.length - 1)
					}
        
          ratings.parents(".content-block").find(".rating-link").remove();
          ratings.parents(".content-block").find("h2").append("<a class='rating-link' href='"+nextItem.data("ratingurl")+"'>"+nextItem.data("ratingname")+"</a>")
          
					items.filter(".act").hide().removeClass("act");
        
					nextItem.show().addClass("act").css({
						opacity: 0,
						marginLeft:-10,
						marginTop:-10
					}).animate({
						opacity: 1,
						marginLeft: 0,
						marginTop: 0
					},250,function() {
						ratings.removeClass("moving");
					});
					
				}
				
      });
      
    } else {
      alert("Произошла техническая ошибка. Попробуйте перегрузить страницу.");
    }
  }
})( jQuery );


// Парсинг XML

jQuery.extend({
  getValues: function(url) {
    var result = null;
    $.ajax({
      url: url,
      type: 'get',
      dataType: 'text',
      async: false
    }).done(function(data) {
        myDataTxt = data;
        var myData = $.parseXML(myDataTxt);
        
        
        // var myData = new Array();
        
        // $.each(myDataRaw, function(index, value) {
         // if (value.GPS != "" && value.status != "Закрыта") {
          // myData.push(value);
         // }
        // });
        
        result = myData;
        
        
    });
    
    return result;
  }
});

function insertCalCard(j,events,calContent,pos) {
 /*  var calContent = calContent;
  var events = events;
  var calCard = $("<div class='calendar-card event-type event-type-" + events[j].typeid +"' index='" + j + "' />");
  calCard.append("<div class='event-cont' />");
  calCard.children(".event-cont").append("<span class='date'><span class='day'>" + events[j].date.split(".")[0] + "</span><span class='sep'>/</span>" + monthName[parseInt(events[j].date.split(".")[1])-1] + "</span>")
  calCard.children(".event-cont").append("<span class='hr'></span><span class='name'><a href='" + events[j].url + "'>" + events[j].name + "</a></span>");
  calCard.children(".event-cont").append("<span  class='event-tag event-tag-" + events[j].typeid + "'>" + events[j].type + "</span>");
  
 //calCard.append("<div class='sn-share fc'><div class='cont'><h5>Поделись с друзьями:</h5><div class='share-btn'><a href='http://vkontakte.ru/share.php?url="+events[j].url+"' onclick='return vk_click();' target='_blank'><span class='ico ico-vk'></span></a></div><div class='share-btn'><a href='http://www.facebook.com/share.php?u=&t="+events[j].name+"' onclick='return fbs_click();' target='_blank'><span class='ico ico-fb'></span></a></div><div class='share-btn'><a href='"+events[j].url+"+"+events[j].name+"' onclick='return twitter_click_1();' target='_blank' ><span class='ico ico-twitter'></span><span class='shares-num'><span>"+ events[j].twit +"</span></span></a></div></div></div>");
  
  calCard.append("<div class='sn-share fc'><div class='cont'><h5>Поделись с друзьями:</h5><div class='addthis_toolbox addthis_default_style addthis_16x16_style' addthis:url='http://seonews.renart.ru"+events[j].url+"'><a class='addthis_button_vk'></a><a class='addthis_button_facebook'></a><a class='addthis_button_twitter'></a><a class='addthis_counter addthis_bubble_style'></a></div></div></div>");
  
  
  
  if (pos == 'before') {
    calCard.prependTo(calContent);
  } else if (pos == 'after') {
    calCard.appendTo(calContent);
  } */
  
}

// Вставка события

function insertEventCards(start,finish,events,calContent) {
  
  var events = events;
  var calContent = calContent;
  calContent.html("");
  
  for (j=start;j<=finish;j++) {
  
    var calCard = $("<div class='calendar-card fc event-type event-type-" + events[j].typeid +"' index='" + j + "' filter='" + events[j].filter + "' />");
    calCard.append("<div class='event-cont' />");
    
    if (events[j].pic && events[j].enddate) {
      calCard.children(".event-cont").append("<div class='pic pic-full' style='background-image:url("+events[j].pic+")'></div>")
    } else {
      calCard.children(".event-cont").append("<div class='pic'></div>")
    }
    
    calCard.find(".pic").append("<span class='date'><span class='day'>" + events[j].date.split(".")[0] + "</span><span class='mon'>" + monthName[parseInt(events[j].date.split(".")[1],10)-1] + "</span></span>")

    calCard.children(".event-cont").append("<div class='descr'></div>")


    calCard.find(".descr").append("<span class='event-tag event-tag-" + events[j].typeid + "'>" + events[j].type + "</span>");
    
    calCard.find(".descr").append("<span class='name'><a href='" + events[j].url + "'>" + events[j].name + "</a></span>");
    
    calCard.find(".descr").append("<div class='event-data'></div>")
    
    if (events[j].views) {
      calCard.find(".event-data").append("<div class='data-item event-views'><span class='ico ico-views' /> " + events[j].views + "</a></div>")
    }
    
    if (events[j].members && events[j].enddate) {
      calCard.find(".event-data").append("<div class='data-item'><span class='ico ico-members' /> Участники: <span class='total'><span>" + events[j].members + " чел.</span></span></div>")
    } else if (!events[j].enddate) {
      calCard.find(".event-data").append("<div class='data-item'><span class='ico ico-members' /> Уже идут: <span class='total'><span>" + events[j].members + " чел.</span></span></div>")
    }
    
    if (events[j].photos) {
      calCard.find(".event-data").append("<div class='data-item event-photos'><a href='" + events[j].photos + "'><span class='ico ico-photo' /> Фотоотчет</a></div>")
    }
    
    if (events[j].review) {
      calCard.find(".event-data").append("<div class='data-item event-review'><a href='" + events[j].review + "'><span class='ico ico-review2' /> Смотрите обзор</a></div>")
    }
    
    if (events[j].enddate) {
      var dateString = events[j].date.split(".")[0] + " <span style='text-transform:capitalize;'>" + monthName[parseInt(events[j].date.split(".")[1],10)] + "</span> " + events[j].date.split(".")[2];
      var dateStringNarrow = events[j].date.split(".")[0] + "." + events[j].date.split(".")[1] + "." + events[j].date.split(".")[2];
      calCard.find(".event-data").append("<div class='data-item event-date end-date-wide'>Завершено: "+dateString+"</div>")
      calCard.find(".event-data").append("<div class='data-item event-date end-date-narrow'>Завершено: "+dateStringNarrow+"</div>")
    } else {
      var evDate = new Date(events[j].date.split(".")[2],events[j].date.split(".")[1],events[j].date.split(".")[0]);
      dateString = dayName[evDate.getDay()] + ", " + events[j].time;
      calCard.find(".event-data").append("<div class='data-item event-date'>"+dateString+"</div>")
    }
    
    
    
    
    calCard.appendTo(calContent);
  }
  
  
}

// Построение элемента каталога

function buildCatCard(catCard,j,items) {
  
  var catCard = catCard;
  
  var items = items;
  
  var j = j;

  catCard.append("<div class='item-cont' />");
  if (items[j].badge != "") {
    catCard.children(".item-cont").append("<div class='badge badge-seonews-select' />");
  }
  catCard.children(".item-cont").append("<a class='logo' href='" + items[j].url + "'><img src='" + items[j].logo + "'/></a>");
  catCard.children(".item-cont").append("<div class='name'><a href='" + items[j].url + "'>" + items[j].name + "</a></div>");
  catCard.children(".item-cont").append("<div class='descr'>" + items[j].descr + "</div>");
  catCard.children(".item-cont").append("<div class='comments-views'></div>");
  if (items[j].likes != "") {
    catCard.find(".comments-views").append("<span class='cv-item'><a href='#'><span class='ico ico-likes'></span>"+items[j].likes+"</a></span>");
  }
  if (items[j].comments != "") {
    catCard.find(".comments-views").append("<span class='cv-item'><a href='#'><span class='ico ico-comments'></span>"+items[j].comments+"</a></span>");
  }
  if (items[j].review != "") {
    catCard.find(".comments-views").append("<span class='cv-item'><a href='"+items[j].review+"'><span class='ico ico-review'></span>Обзор редакции</a></span>");
  }
  if (items[j].rating != "") {
    catCard.children(".item-cont").append("<div class='rating fc'><div class='place'><span>"+items[j].rating+"</span>место</div><div class='ratingname'>"+items[j].ratingname+"</div></div>");
  }
}

// Построение элемента рейтинга

function buildRatCard(ratCard,j,items) {
  
  var ratCard = ratCard;
  
  var items = items;
  
  var j = j;

  ratCard.append("<div class='rating-item' /><div class='rating-item' /><div class='rating-item last' />");
  
  ratCard.children(".rating-item").eq(0).append("<a class='logo' href='" + items[j].url.first + "'><img src='" + items[j].logo.first + "'/></a>");
  ratCard.children(".rating-item").eq(1).append("<a class='logo' href='" + items[j].url.second + "'><img src='" + items[j].logo.second + "'/></a>");
  ratCard.children(".rating-item").eq(2).append("<a class='logo' href='" + items[j].url.third + "'><img src='" + items[j].logo.third + "'/></a>");
  
  ratCard.children(".rating-item").eq(0).append("<div class='rating-place rating-place-1'></div>");
  ratCard.children(".rating-item").eq(1).append("<div class='rating-place rating-place-2'></div>");
  ratCard.children(".rating-item").eq(2).append("<div class='rating-place rating-place-3'></div>");
  
  ratCard.children(".rating-item").append("<div class='rating-name'>в рейтинге<br />"+ items[j].ratingname +"</div>");
  
}

// Функции разметки

function makeup() {
	

	$(".form-text, .form-password, .form-textarea, input[type=text]").each(function() {
    if ($(this).val()) {
      $(this).prev(".placeholder").hide();
			$(this).removeClass("initial");
    }
  });
	

  $(".post-text table").each(function() {
    if (!$(this).parents(".table-wrapper").length) {
      $(this).wrap("<div class='table-wrapper' />")
    }
  })

  // $(".post-text ol li").each(function() {
    // if (!$(this).find(".li-cont").length) {
      // $(this).html("<span class='li-cont'>"+$(this).html()+"</span>")
    // }
  //});
	

	$("input:text, input:password, textarea").each(function() {
		
		if (!$(this).parents(".input-wrapper").length) $(this).wrap("<div class='input-wrapper'></div>");
	
    if (!$(this).val()) {
			$(this).addClass("initial");
		}
    
    if ($(this).prop("tagName") == "INPUT" || $(this).prop("tagName") == "TEXTAREA") {
      // if (!$(this).parents(".input-wrapper").length) $(this).wrap("<div class='input-wrapper'></div>");
      if ($(this).hasClass("form-phone")) {
        $(this).focus(function() {
          $(this).removeClass("initial");
          $(this).parents(".form-item").find(".placeholder").hide();
        });
      } else {
        $(this).focus(function() {
          $(this).parents(".form-item").find(".placeholder").addClass("placeholder-initial");
        });
        $(this).keydown(function() {
          $(this).removeClass("initial");
          $(this).parents(".form-item").find(".placeholder").hide();
        });
      }
      $(this).blur(function() {
        $(this).prev().prev(".placeholder").hide();
        $(this).parents(".form-item").find(".placeholder").removeClass("placeholder-initial");
        if (!$(this).val()) {
          $(this).addClass("initial");
          $(this).parents(".form-item").find(".placeholder").show();
        }
      });
    } else {
      $(this).focus(function() {
        $(this).removeClass("initial");
        $(this).parents(".form-item").find(".placeholder").hide();
      });
      $(this).blur(function() {
        if (!$(this).val()) {
          $(this).addClass("initial");
          $(this).parents(".form-item").find(".placeholder").show();
        }
      });
    }
      
    $(this).parents(".form-item").find(".placeholder").click(function() {
      $(this).focus();
    });
    
  });
  

  $(".custom-form input.button, .search-block input.button").each(function () {
    if ($(this)[0].tagName == "INPUT" && !$(this).next("div.form-submit").length) {
      var divBtn = $("<div></div>");
      var submit = $(this);
      divBtn.attr("class",$(this).attr("class")).attr("id",$(this).attr("id")).html("<span>" + $(this).val() + "</span>");
      $(this).after(divBtn);
      $(this).hide();
      divBtn.on("click",function () {
        submit.click();
      });
    }
    
  });
  
  
  $(".custom-form  select").customSelect();

  /*if ($(".rating-table").length) {
    $(".rating-table").each(function() {
      if (!$(this).next(".rating-show-more").length && !$(this).hasClass("dont-hide")) {
        
        $(this).find("th").first().addClass("first");
        $(this).find("tr").eq(10).nextAll("tr").css("display","none").addClass("hidden");
        $(this).after("<div class='rating-show-more'><span class='ico ico-show-more'></span><span class='txt'>Показать еще</span></div>");
        
        $(this).next(".rating-show-more").on("click",function() {
          var lastVisibleIndex = $(this).prev("table").find("tr").not(".hidden").last().index();
          for (i=0;i<=9;i++) {
            $(this).prev("table").find("tr").eq(i+lastVisibleIndex+1).show().removeClass("hidden");
          }
        });
      }
      
    });
  }
  */

  $(".mainpage-best .bestlist-item").last().addClass("last");

  $(".newslist").each(function() {
    $(this).find(".newslist-item").last().prev().addClass("last-row");
    $(this).find(".newslist-item").last().addClass("last-row");
    $(this).find(".newslist-item-small").last().addClass("last-row");
    $(this).find(".newslist-item-small").last().prev().removeClass("last-row");
  });

  $("div.button, a.button").each(function() {
    if ($(this).hasClass("button-ico") && !$(this).find("span").length) {
      $(this).html("<span class='ico'></span><span class='cont'>"+$(this).html()+"</span>")
    } else if (!$(this).find("span").length) {
      $(this).html("<span>"+$(this).html()+"</span>")
    }
  });
  
  $("ul").each(function() {
    $(this).children("li").first().addClass("first");
    $(this).children("li").last().addClass("last");
  });
  
  $(".main-menu a").last().addClass("last");
}

// Обработчик селектов

(function( $ ) {
  $.fn.customSelect = function() {
    var selects = $(this);
    selects.each(function () {
      var select = $(this);
      
      if (!$(this).next(".param-selector").length) {
        select.css("visibility","hidden").css("position","absolute").css("z-index","-1");
        select.after("<div class='param-selector' id='" + select.attr("id") + "-selector'>");
        var selector = select.next(".param-selector");
        
        if (select.is(":disabled")) {
          selector.addClass("selector-disabled")
        }
        
        
        selector.append("<div class='param-sel' />").append("<div class='dropdown' />");
        var dropdown = selector.find(".dropdown");
        // dropdown.append("<div class='top-border' />");
        var paramSel = selector.find(".param-sel");
        paramSel.addClass("initial");
        paramSel.append("<div class='arr' />");
        paramSel.append("<div class='sel-value' />");
        
        if (select.find("option[value=" + select.val() + "]").attr("flag")) {
          paramSel.find(".sel-value").html("<img src='" + select.find("option[value=" + select.val() + "]").attr("flag") + "' />" + select.find("option[value=" + select.val() + "]").html());
        } else {
          paramSel.find(".sel-value").html(select.find("option[value=" + select.val() + "]").html());
        }
        
        select.find("option").each(function () {
          if ($(this).attr("flag")) {
            var flag = "<img src=" + $(this).attr("flag") + " />";
          } else {
            flag = "";
          }
          
          if (select.find("option").length <= 2) {
          
            if ($(this).val() != select.val() /* || select.attr("ttl")*/) {
              dropdown.append("<div val='" + $(this).attr("value") + "'>" + flag + $(this).html() + "</div>");
            } else {
              dropdown.append("<div style='display:none' val='" + $(this).attr("value") + "'>" + flag + $(this).html() + "</div>");
            }
            
          } else {
						if ($(this).val() != select.val() /* || select.attr("ttl")*/) {
							dropdown.append("<div val='" + $(this).attr("value") + "'>" + flag + $(this).html() + "</div>");
            } else {
              dropdown.append("<div class='selected' val='" + $(this).attr("value") + "'>" + flag + $(this).html() + "</div>");
            }
          }
          
        });
      
      
        paramSel.on("click",function() {
          $(this).parents(".common-form").find(".form-item").css("z-index",1);
          $(this).parents(".form-item").css("z-index",10);
          if (!select.is(":disabled")) {
            if (dropdown.css("display") != "block") {
              $(".dropdown").fadeOut(150);
              $(".param-open").removeClass("param-open");
              dropdown.fadeIn(150);
              selector.addClass("param-open");
              var maxWidth = 0;
              
              $(this).parents(".form-item").prevAll(".form-item").css("z-index","100");
              $(this).parents(".form-item").css("z-index","1000");
              $(this).parents(".form-item").nextAll(".form-item").css("z-index","100");
              
              dropdown.find("div").each(function () {
                if ($(this).width() >= maxWidth) {
                  maxWidth = $(this).width();
                }
                if (paramSel.width() >= maxWidth) {
                  maxWidth = paramSel.width() + 1;
                }
              });
              
              //paramSel.css("width", maxWidth + "px");
              // dropdown.find("div").css("width", maxWidth + "px");
              // dropdown.css("width", maxWidth);
              
              // ddOverflow = $("html").height() - (dropdown.offset().top + dropdown.height());
              // if (ddOverflow < 0) {
                // dropdown.css("margin-top", -30 - dropdown.height());
              // }
              
              //dropdown.css("top",paramSel.position().top + paramSel.height());
              
            } else {
              dropdown.fadeOut(150);
              selector.removeClass("param-open");
            }
          }
        });
        
        dropdown.on("click", "div", function() {
          selector.removeClass("param-sel-error");
          paramSel.removeClass("initial");
          var div = $(this);
          paramSel.find(".sel-value").html($(this).html());
          if ($(this).attr("flag")) {
            paramSel.find(".sel-value").attr("flag",$(this).attr("flag"));
          }
          select.val($(this).attr("val")).change();
          if (select.hasClass("hide-ttl")) {
            //select.find("option[value='']").remove();
            dropdown.find("div[val='']").remove();
          }
          dropdown.fadeOut(150, function () {
            dropdown.find("div").show().removeClass("selected").removeClass("hidden");
            if (select.find("option").length <= 2) {
              div.addClass("hidden")
            }
            div.addClass("selected");
            div.parents(".param-open").removeClass("param-open");
          });
        });
      
      }
			
			$(document).mouseup(function (e) {
				var container1 = dropdown;

				if (!container1.is(e.target) // if the target of the click isn't the container...
						&& container1.has(e.target).length === 0) // ... nor a descendant of the container
				{
						dropdown.fadeOut(150)
				}
			});
			
			
    });
    
  };
})( jQuery );

(function( $ ) {
  $.fn.customExpandable = function() {
    var objects = $(this);
    objects.each(function () {
      
			var expandable = $(this);
      
			var expandableTrigger = $(this).find(".expandable-trigger");
			var expandableContent = $(this).find(".expandable-content");
			
      expandableTrigger.click(function() {
				expandableContent.slideToggle(250);
				
				if (expandableTrigger.hasClass("expandable-trigger-on")) {
					expandableTrigger.removeClass("expandable-trigger-on").addClass("expandable-trigger-off");
					expandableTrigger.find("span").html(expandableTrigger.data("off-text"));
				} else {
					expandableTrigger.removeClass("expandable-trigger-off").addClass("expandable-trigger-on")
					expandableTrigger.find("span").html(expandableTrigger.data("on-text"));
				}
			});
			
			
    });
    
  };
})( jQuery );

function compUnits(n) {
  var n = n + "";
  var num = n.slice(n-1,n.length); 
  if(num==0) cur = "компаний"; 
  if(num==1) cur = "компания";
  if(num==2) cur = "компании";
  if(num==3) cur = "компании";
  if(num==4) cur = "компании";
  if(num>=5) cur = "компаний";
  if(n==11) cur = "компаний";
  if(n==12) cur = "компаний";
  if(n==13) cur = "компаний";
  if(n==14) cur = "компаний";
  return cur;
}

// Обработчик инструментов

function handleTools() {
  if ($(".tools").length) {
  
    $(document.body).on('click', '.toolsreviews .show-more' ,function() {
      var link = $(this);
      link.after("<div class='loader' />");
      $.ajax({
        url: $(this).attr("rel"),
        type: 'get',
        dataType: 'html',
        async: false
      }).done(function(data) {
        $(".loader").remove();
        link.before(data);
        makeup();
      });
    });
  
    $(".toolsreviews-item .ico-comments").hover(function() {
      var pup = $(this).parents(".toolsreviews-item").find(".tool-review-pup")
      $(this).addClass("hover");
      if (pup.offset().top + pup.height() > $(window).scrollTop() + $(window).height()) {
        pup.css("margin-top",-pup.height())
      }
      $(this).parents(".toolsreviews-item").find(".tool-review-pup").fadeIn(250);
      return false;
    },function() {
      var obj = $(this);
      $(this).removeClass("hover")
      var t = setTimeout(function() {
        if (!obj.parents(".toolsreviews-item").find(".hover").length) {
          obj.parents(".toolsreviews-item").find(".tool-review-pup").fadeOut(250)
        }
      },200)
    });
    
    $(".tool-review-pup").hover(function() {
      $(this).addClass("hover")
    },function() {
      var obj = $(this);
      $(this).removeClass("hover")
      var t = setTimeout(function() {
        if (!obj.parents(".toolsreviews-item").find(".hover").length) {
          obj.fadeOut(250)
        }
      },200)
      
    });
    
    $(".toolsreviews .comments-views").hover(function() {
      $(this).addClass("hover")
    },function() {
      var obj = $(this);
      $(this).removeClass("hover")
      var t = setTimeout(function() {
        if (!obj.parents(".toolsreviews-item").find(".hover").length) {
          obj.parents(".toolsreviews-item").find(".tool-review-pup").fadeOut(250)
        }
      },500)
    });
    
    $(".toolslist-item .ico-comments").hover(function() {
      $(this).addClass("hover")
      var pup = $(this).parents(".toolslist-item").find(".tool-review-pup")
      pup.removeClass("tool-review-pup-top");
      $(this).addClass("hover");
      if ($(this).offset().top - $(window).scrollTop() > $(window).height() - ($(this).offset().top - $(window).scrollTop())) {
        pup.css("margin-top",-pup.height() - 60).addClass("tool-review-pup-top");
      }
      $(this).parents(".toolslist-item").find(".tool-review-pup").fadeIn(250);
      return false;
    },function() {
      var obj = $(this);
      $(this).removeClass("hover")
      var t = setTimeout(function() {
        if (!obj.parents(".toolslist-item").find(".hover").length) {
          obj.parents(".toolslist-item").find(".tool-review-pup").fadeOut(250)
        }
      },500)
    });
    
    $(".toolslist-item .pic").hover(function() {
      $(this).addClass("hover")
      var pup = $(this).parents(".toolslist-item").find(".tool-review-pup")
      pup.removeClass("tool-review-pup-top");
      $(this).addClass("hover");
      if ($(this).offset().top - $(window).scrollTop() > $(window).height() - ($(this).offset().top - $(window).scrollTop())) {
        pup.css("margin-top",-pup.height() - 60).addClass("tool-review-pup-top");
      }
      $(this).parents(".toolslist-item").find(".tool-review-pup").fadeIn(250);
      return false;
    },function() {
      var obj = $(this);
      $(this).removeClass("hover")
      var t = setTimeout(function() {
        if (!obj.parents(".toolslist-item").find(".hover").length) {
          obj.parents(".toolslist-item").find(".tool-review-pup").fadeOut(250)
        }
      },500)
    });
    
    $(".tool-review-pup").hover(function() {
      $(this).addClass("hover")
    },function() {
      var obj = $(this);
      $(this).removeClass("hover")
      var t = setTimeout(function() {
        if (!obj.parents(".toolslist-item").find(".hover").length) {
          obj.fadeOut(250)
        }
      },200)
      
    });
    
    $(".toolslist .comments-views").hover(function() {
      $(this).addClass("hover")
    },function() {
      var obj = $(this);
      $(this).removeClass("hover")
      var t = setTimeout(function() {
        if (!obj.parents(".toolslist-item").find(".hover").length) {
          obj.parents(".toolslist-item").find(".tool-review-pup").fadeOut(250)
        }
      },200)
    });
    
    $("#tf_select").change(function() {
      if ($(this).val() != "all") {
        $(".tool-type").hide();
        $(".tool-type-"+$(this).val()).show();
      } else {
        $(".tool-type").show();
      }
    });
    
    
    $(".tf-sort .link").click(function() {
      $(".tf-sort .link").removeClass("act");
      $(this).addClass("act");
      
      
      if ($(this).attr("sort") == "popularity") {
        var list = $('.toolsreviews');
        var listItems = list.find(".toolsreviews-item").sort(function(a,b){
          var valueA, valueB;

          valueA = parseInt($(a).attr("popular")); // Where 1 is your index, from your example
          valueB = parseInt($(b).attr("popular"));
          if (valueA < valueB) {
              return 1;
          }
          else if (valueA > valueB) {
              return -1;
          }
          return 0;
        });
        list.find('.toolsrevews-item').remove();
        list.append(listItems);
      }
      if ($(this).attr("sort") == "names") {
        var list = $('.toolsreviews');
        var listItems = list.find(".toolsreviews-item").sort(function(a,b){
          var valueA, valueB;

          valueA = $(a).find('h3 a').html(); // Where 1 is your index, from your example
          valueB = $(b).find('h3 a').html();
          if (valueA < valueB) {
              return -1;
          }
          else if (valueA > valueB) {
              return 1;
          }
          return 0;
        });
        list.find('.toolsrevews-item').remove();
        list.append(listItems);
      };
      if ($(this).attr("sort") == "choices") {
        var list = $('.toolsreviews');
        var listItems = list.find(".toolsreviews-item").sort(function(a,b){
          var valueA, valueB;

          valueA = parseInt($(a).attr("choice")); // Where 1 is your index, from your example
          valueB = parseInt($(b).attr("choice"));
          if (valueA < valueB) {
              return 1;
          }
          else if (valueA > valueB) {
              return -1;
          }
          return 0;
        });
        list.find('.toolsrevews-item').remove();
        list.append(listItems);
      }
      
      index = 0;
      
      $(".tool-review").each(function() {
        var clonedReview = $(this).clone();
        $(".toolsreviews-item").eq((index+1)*8-1).after(clonedReview)
        $(this).remove();
        index++;
      })
      
      var showMore = $(".toolsreviews .show-more").clone();
      $(".toolsreviews .show-more").remove();
      $(".toolsreviews-item").last().after(showMore);
      
      
      
    });
  }
}

// Выравнивание по центру всплывающего окна

function pupMakeup() {
  var popup = $(".popup-act");
  var pupTop = $(window).scrollTop() + ($(window).height() - popup.outerHeight(true))/2;
  if (pupTop < 20) pupTop = 20;
  $(".tint").css("height",$(window).height()).css("width",$("body").width());
  if (!popup.hasClass("price-popup")) {
    popup.css("top",pupTop).css("left",($(window).width()-popup.outerWidth(true))/2 - 20);
  } else {
    popup.css("margin-top",$(window).scrollTop() - popup.parent().offset().top - popup.parent().outerHeight(true) + ($(window).height()-popup.outerHeight(true))/2);
  }
  
}

function closePopup() {
  $(".tint").remove();
  $(".popup").hide().removeClass("popup-act");
}

// Адаптация страницы под разную ширину окна

function adaptation() {
  if ($(window).width() <= 1200 && $("body").hasClass("adaptive")) {
    $("html").addClass("html-narrow");
    $(".sn-subscribe .txt").html("Читайте нас<br />в социальных сетях");
    $(".html-narrow .post-controls .author a").eq(1).addClass("author-name");
    if ($(".author-name").length) {
      $(".html-narrow .author-name").each(function() {
        //$(this).html($(this).html().replace(" ","<br />"))
      });
    }
    if ($(".mainpage-calendar").length) {
      $(".mainpage-calendar .prev .text").html("Предыдущие");
      $(".mainpage-calendar .next .text").html("Предстоящие");
    }
    if ($(".mainpage-catalogue").length) {
      $(".mainpage-catalogue .act").css("left",183)
      $(".mainpage-catalogue .act-next").css("left",360)
    }
    
    if ($(".mainpage-sliders").length) {
      $(".mainpage-events-slider .events-list").each(function() {
        $(this).children(".event-item").eq(2).hide();
      });
    }
    
    if ($(".library .book-status .button-4").length) {
      $(".library .book-status .button-4 span").each(function() {
        $(this).html($(this).html().replace(" книгу",""));
      })
    }
    
    // if ($(".experts .expertslist-item-big").length) {
      // $(".experts .expertslist-item-big").each(function() {
        // $(this).nextUntil(".expertslist-item-big").eq(2).hide();
      // });
    // }
    
    if ($(".toolsreviews").length) {
      $(".toolsreviews .ico-review").parent().html("<span class='ico ico-review'></span>");
    }
    
    if ($(".tool-descr .rating").length) {
      $(".tool-descr .rating .place").attr("hint",$(".tool-descr .rating .place span").html() + " место " + $(".tool-descr .rating .ratingname").html());
      $(".tool-descr .rating .place").attr("hint",$(".tool-descr .rating .place").attr("hint").replace("рейтинге","рейтинге<br />"))
    }
    
    
  } else {
    $("html").removeClass("html-narrow");
    $(".sn-subscribe .txt").html("Нас удобно читать в социальных сетях.<br>Подписывайся!");
    $(".post-controls .author a").eq(1).each(function() {
      $(this).removeClass("author-name");
      $(this).html($(this).html().replace("<br>"," "))
    });
    if ($(".mainpage-calendar").length) {
      $(".mainpage-calendar .prev .text").html("Предыдущие события");
      $(".mainpage-calendar .next .text").html("Предстоящие события");
    }
    if ($(".mainpage-catalogue").length) {
      $(".mainpage-catalogue .act").css("left",253)
      $(".mainpage-catalogue .act-next").css("left",500)
    }
    if ($(".mainpage-sliders").length) {
      $(".mainpage-events-slider .events-list").each(function() {
        $(this).children(".event-item").eq(2).show();
      });
    }
    if ($(".library .book-status .button-4").length) {
      $(".library .book-status .button-4 span").each(function() {
        $(this).html($(this).html().replace(" книгу","") + " книгу");
      });
    }
    
    if ($(".experts .expertslist-item-big").length) {
      $(".experts .expertslist-item-big").each(function() {
        $(this).nextUntil(".expertslist-item-big").eq(2).show();
      });
    }
    
    if ($(".toolsreviews").length) {
      $(".toolsreviews .ico-review").parent().html("<span class='ico ico-review'></span> Обзор редакции");
    }
    
    if ($(".tool-descr .rating").length) {
      $(".tool-descr .rating .place").attr("hint","");
    }
    
  }
  
  if ($(".mainpage-calendar").length) {
	
		$(".mainpage-calendar .jcarousel-list").css({
			left: - $(".mainpage-calendar .jcarousel-first").position().left
		});
	
    // var calContent = $(".mainpage-calendar .calendar-content");
    // var t = setTimeout(function() {
      // calPos = -calContent.find(".calendar-card").outerWidth(true)*calContent.find(".first-visible").prevAll(".calendar-card").length;
      // calWidth = calContent.find(".calendar-card").outerWidth(true)*calContent.find(".calendar-card").length;
      // calContent.stop().css("left",calPos).css("width",calWidth)
    // },100)
    
  } 
  
}

// Получение переменных из URL

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

// Коллбэки карусели календаря на главной

function mpcFirstin(carousel, item, idx, state) {

	carousel.list.parents(".mainpage-calendar").find(".jcarousel-item").removeClass("jcarousel-first");
	carousel.list.parents(".mainpage-calendar").find(".jcarousel-item").eq(idx-1).addClass("jcarousel-first")

  if (carousel.list.parents(".mainpage-calendar").find(".jcarousel-prev").hasClass("jcarousel-prev-disabled")) {
    $(".mainpage-calendar .prev").addClass("inact")
  } else {
    $(".mainpage-calendar .prev").removeClass("inact")
  }
  
  if (carousel.list.parents(".mainpage-calendar").find(".jcarousel-next").hasClass("jcarousel-next-disabled")) {
    $(".mainpage-calendar .next").addClass("inact")
  } else {
    $(".mainpage-calendar .next").removeClass("inact")
  }
};

function mpcLastin(carousel, item, idx, state) {
  if (carousel.list.parents(".mainpage-calendar").find(".jcarousel-prev").hasClass("jcarousel-prev-disabled")) {
    $(".mainpage-calendar .prev").addClass("inact")
  } else {
    $(".mainpage-calendar .prev").removeClass("inact")
  }
  
  if (carousel.list.parents(".mainpage-calendar").find(".jcarousel-next").hasClass("jcarousel-next-disabled")) {
    $(".mainpage-calendar .next").addClass("inact")
  } else {
    $(".mainpage-calendar .next").removeClass("inact")
  }
};

// Функции, вызываемые при загузке страницы. Обработка элементов.

function preparePage() {

  if (typeof addthis !== 'undefined') {
    addthis.toolbox(".addthis_toolbox");
    addthis.counter(".addthis_counter");
  }

  if ($(".event-more").length && !$(".calendar-event-content .tab-content .post-controls").length) {
    $(".event-more").addClass("event-more-act");
    $(".event-more-content").show();
  }
  
  
  // Карусель с календарем на главной

	if ($(".mainpage-calendar .jcarousel").length) {
		$(".mainpage-calendar .jcarousel").jcarousel({
			scroll: 3,
			itemFirstInCallback: mpcFirstin,
			itemLastInCallback: mpcLastin,
			itemFallbackDimension: 270
		});
	}
  
	
  $(".mainpage-calendar .next").on("click",function() {
    $(".mainpage-calendar .jcarousel-next").click();
  })
  
  $(".mainpage-calendar .prev").on("click",function() {
    $(".mainpage-calendar .jcarousel-prev").click();
  })
  
  
  
  $(".vk-popup").addClass("initial");
  $(".facebook-popup").addClass("initial");
  $(".twitter-popup").addClass("initial");
  
  // tooltips
  
  if ($(".tooltip-custom").length) {
    $(".tooltip-custom").tooltip({
      position: {
          my: "center bottom",
          at: "center top",
          using: function( position, feedback ) {
            $( this ).css( position );
            $( "<div>" )
              .addClass( "arrow" )
              .addClass( feedback.vertical )
              .addClass( feedback.horizontal )
              .appendTo( this );
          }
        }
    });
  }
	
	if ($(".company-info .company-rating").length) {
    $(".company-rating").tooltip({
			tooltipClass: "company-rating-tooltip",
      position: {
          my: "center bottom",
          at: "center top",
          using: function( position, feedback ) {
            $( this ).css( position );
            $( "<div>" )
              .addClass( "arrow" )
              .addClass( feedback.vertical )
              .addClass( feedback.horizontal )
              .appendTo( this );
          }
        }
    });
  }
	
	if ($(".company-info .company-tenders").length) {
    $(".company-tenders").tooltip({
			tooltipClass: "company-tenders-tooltip",
      position: {
          my: "center bottom",
          at: "center top",
          using: function( position, feedback ) {
            $( this ).css( position );
            $( "<div>" )
              .addClass( "arrow" )
              .addClass( feedback.vertical )
              .addClass( feedback.horizontal )
              .appendTo( this );
          }
        }
    });
  }
  
  newsMakeup();

  // if ($(".events-calendar").length) {
    // $(".events-calendar").eventsCalendar();
  // }
  
  evCalendar();

  $(".html-narrow .post-controls .author a").last().addClass("author-name");

  $(".newslist-item").each(function() {
    if ($(this).find(".pic").length && !$(this).hasClass("newslist-item-big")) {
      $(this).addClass("with-pic")
    }
  });

  $("#compSelectTrigger").click(function() {
    $("#select-companies").slideDown(400);
    $("#select-companies input:checkbox").iCheck("uncheck")
  });

  $(".event-more").click(function() {
    $(".event-more-content").slideToggle(400);
    $(this).toggleClass("event-more-act");
    return false;
  });
  
  // Всплывающие окна с виджетами соцсетей

  $(".sn-subscribe .button-fb").click(function() {
  
    $(".vk-popup").hide();
    $(".twitter-popup").hide();
    
    if ($(".facebook-popup").hasClass("initial")) {
      $(".facebook-popup").hide().removeClass("initial");
      $(".facebook-popup").css("top",$(this).position().top - $(".facebook-popup").height() - 12).css("left",$(this).position().left - $(".facebook-popup").width()/2 + $(this).width()/2).fadeIn(250);
    } else {
      $(".facebook-popup").css("top",$(this).position().top - $(".facebook-popup").height() - 12).css("left",$(this).position().left - $(".facebook-popup").width()/2 + $(this).width()/2).fadeIn(250);
    }
    
    if ($(".facebook-popup").offset().top < $(window).scrollTop()) {
      $(".facebook-popup").addClass("facebook-popup-btm").css("top",$(this).position().top + 12 + $(this).height());
    } else {
      $(".facebook-popup").removeClass("facebook-popup-btm");
    }
    
    return false;
  });
  
  $(".vk-popup").click(function(){  
    //$(".vk-popup").hide();
  });
  
  $(".facebook-popup").click(function(){  
    //$(".facebook-popup").hide();
  });
  
  
  $(".sn-subscribe .button-vk").click(function() {
  
    $(".facebook-popup").hide();
    $(".twitter-popup").hide();
    
    if ($(".vk-popup").hasClass("initial")) {
      $(".vk-popup").hide().removeClass("initial");
      $(".vk-popup").css("top",$(this).position().top - $(".vk-popup").height() - 12).css("left",$(this).position().left - $(".vk-popup").width()/2 + $(this).width()/2).fadeIn(250);
    } else {
      $(".vk-popup").css("top",$(this).position().top - $(".vk-popup").height() - 12).css("left",$(this).position().left - $(".vk-popup").width()/2 + $(this).width()/2).fadeIn(250);
    }
    
    if ($(".vk-popup").offset().top < $(window).scrollTop()) {
      $(".vk-popup").addClass("vk-popup-btm").css("top",$(this).position().top + 12 + $(this).height());
    } else {
      $(".vk-popup").removeClass("vk-popup-btm");
    }
    
    return false;
  });
  
  $(".sn-subscribe .button-twitter").click(function() {
  
    $(".facebook-popup").hide();
    $(".vk-popup").hide();
    
    if ($(".twitter-popup").hasClass("initial")) {
      $(".twitter-popup").hide().removeClass("initial");
      $(".twitter-popup").css("top",$(this).position().top - $(".twitter-popup").height() - 12).css("left",$(this).position().left - $(".twitter-popup").width()/2 + $(this).width()/2).fadeIn(250);
    } else {
      $(".twitter-popup").css("top",$(this).position().top - $(".twitter-popup").height() - 12).css("left",$(this).position().left - $(".twitter-popup").width()/2 + $(this).width()/2).fadeIn(250);
    }
    
    if ($(".twitter-popup").offset().top < $(window).scrollTop()) {
      $(".twitter-popup").addClass("twitter-popup-btm").css("top",$(this).position().top + 12 + $(this).height());
    } else {
      $(".twitter-popup").removeClass("twitter-popup-btm");
    }
    
    return false;
  });
  
  $(".facebook-popup,.vk-popup,.twitter-popup").hover(function() {
    $(this).addClass("hover");
  },function() {
    $(this).removeClass("hover");
  });
  
  $("body").click(function() {
    if (!$(".facebook-popup").hasClass("hover")) {
      $(".facebook-popup").fadeOut(250)
    }
    if (!$(".vk-popup").hasClass("hover")) {
      $(".vk-popup").fadeOut(250)
    }
    if (!$(".twitter-popup").hasClass("hover")) {
      $(".twitter-popup").fadeOut(250)
    }
  })
  
   /* $(".top-filter li").click(function() {
    $(this).toggleClass("act")
  }); */
  
  if (!$(".top-filter").hasClass("top-filter-locked")) {
    
    $(document.body).on('mouseover', '.header-fixed .top-filter-wrapper', function() {
      $(this).stop().animate({
        top:0
      },250);
    });
    
    $(document.body).on('mouseout', '.header-fixed .top-filter-wrapper', function() {
      $(this).stop().animate({
        top:-68
      },250);
    });
    
  }

  // Всплывающее окно с обзором
  
  $("#review-open").click(function () {
    
    openPopup($(".review-popup"));
    
    return false;
    
  });
  
  
  $(".review-button").click(function() {
    $(".review-button").removeClass("button-act");
    $(this).addClass("button-act");
    $(".review-input").val(0);
    $(".review-input[rel='"+$(this).attr("id")+"']").val(1);
    
  });

  
  
  if ($(".slides").length) {
    $(".slides").each(function(){
      var obj = $(this);
      var size = obj.find("img").length
      $(this).slidesjs({
        width: 626,
        height: 407,
        pagination: {
          active: false
        },
        callback: {
          loaded: function(number) {
            obj.append("<div class='number'>"+number+" из "+size+"</div>")
          },
          start: function(number) {
            // Do something awesome!
            // Passes slide number at start of animation
          },
          complete: function(number) {
            obj.find(".number").html(number+" из "+size)
            // Do something awesome!
            // Passes slide number at end of animation
          }
        }
      });
    });
  }
  
  // Изменение размера шрифта

  $(".font-control .more").click(function() {
    var fontSize = parseInt($(".post-text").css("font-size"));
    var lineHeight = (fontSize+1)*1.5;
    fontSize = fontSize + 1 + "px";
    lineHeight = lineHeight + "px";
		
    $(".post-text").css({'font-size':fontSize,'line-height':lineHeight});
  })
  
  $(".font-control .less").click(function() {
    var fontSize = parseInt($(".post-text").css("font-size"));
		var lineHeight = (fontSize-1)*1.5;
    fontSize = fontSize - 1 + "px";
		lineHeight = lineHeight + "px";
    $(".post-text").css({'font-size':fontSize,'line-height':lineHeight});
  })
  
  // Форма тендера

  if ($(".tender-form").length) {
  
    $("#tenderTable tr").click(function() {
      if ($(this).find("input").is(":checked")) {
        $(this).iCheck("uncheck")
      } else {
        $(this).iCheck("check")
      }
    });
    
    $('#tenderTable input').on('ifChecked', function(event){
      $(this).parents("tr").addClass("selected")
    });
    
    $('#tenderTable input').on('ifUnchecked', function(event){
      $(this).parents("tr").removeClass("selected")
    });
    
    $("#tenderTable").addClass("initial");
  
    $('.country-select').on('ifChecked', function(event){
    
      $(".city-selector").slideUp(250);
    
      if ($("#tenderTable").hasClass("initial")) {
        $("#tenderTable tr").eq(0).nextAll("tr").hide();
      }
      
      $("#tenderTable").removeClass("initial");
    
      
      $("#tenderTable tr[country='"+$(this).attr("id")+"']").show();
    
      // $(".country-selector").slideUp(250);
      
      $(this).parents(".form-item").find(".city-link").show();
      
      var compNum = $("tr").filter(function() { return $(this).css("display") != "none" }).length - 1;
      
      if (compNum !=0 ) {
        $(".filter-counter").show()
        $(".filter-counter .num").html(compNum)
        $(".filter-counter .units").html(compUnits(compNum))
      } else {
        $(".filter-counter").hide()
      }
      
      
    });
    
    $('.country-select').on('ifUnchecked', function(event){
    
      $(this).parents(".form-item").find(".city-link").hide();
      
      $(".city-selector[rel='"+$(this).attr("id")+"']").slideUp(250);
      $(".city-selector[rel='"+$(this).attr("id")+"'] input").iCheck('uncheck');
      
      $("#tenderTable tr[country='"+$(this).attr("id")+"']").hide();
      
      if (!$(".country-select").is(":checked")) {
        $("#tenderTable tr").show();
        $("#tenderTable").addClass("initial");
      }
      
      var compNum = $("tr").filter(function() { return $(this).css("display") != "none" }).length - 1;
      
      if (compNum !=0 ) {
        $(".filter-counter").show()
        $(".filter-counter .num").html(compNum)
        $(".filter-counter .units").html(compUnits(compNum))
      } else {
        $(".filter-counter").hide()
      }
    
    });
    
    $(".city-link").click(function() {
      if ($(".city-selector[rel='"+$(this).parents(".form-item").find("input").attr("id")+"']").css("display") != "block") {
        $(".city-selector").hide();
        $(".city-selector[rel='"+$(this).parents(".form-item").find("input").attr("id")+"']").slideDown(250);
        $(".city-selector[rel='"+$(this).parents(".form-item").find("input").attr("id")+"']").css("background-position",$(this).position().left+$(this).width()/2-10+15+"px 0");
      } else {
        $(".city-selector[rel='"+$(this).parents(".form-item").find("input").attr("id")+"']").slideUp(250);
      }
    });
    
    $('.city-selector input').on('ifChecked', function(event){
      
      $("#tenderTable tr[country='"+$(this).parents(".city-selector").attr("rel")+"']").hide();
      $(this).parents(".city-selector").find("input").each(function() {
        if ($(this).is(":checked")) {
          $("#tenderTable tr[city='"+$(this).attr("id")+"']").show();
        }
      });
      
      var compNum = $("tr").filter(function() { return $(this).css("display") != "none" }).length - 1;
      
      if (compNum !=0 ) {
        $(".filter-counter").show()
        $(".filter-counter .num").html(compNum)
        $(".filter-counter .units").html(compUnits(compNum))
      } else {
        $(".filter-counter").hide()
      }
    
      
    });
    
    $('.city-selector input').on('ifUnchecked', function(event){
    
      $("#tenderTable tr[country='"+$(this).parents(".city-selector").attr("rel")+"']").hide();
      $(this).parents(".city-selector").find("input").each(function() {
        if ($(this).is(":checked")) {
          $("#tenderTable tr[city='"+$(this).attr("id")+"']").show();
        }
      });
      
      if (!$(this).parents(".city-selector").find("input").is(":checked")) {
        $("#tenderTable tr[country='"+$(this).parents(".city-selector").attr("rel")+"']").show();
      }
      
      var compNum = $("tr").filter(function() { return $(this).css("display") != "none" }).length - 1;
      
      if (compNum !=0 ) {
        $(".filter-counter").show()
        $(".filter-counter .num").html(compNum)
        $(".filter-counter .units").html(compUnits(compNum))
      } else {
        $(".filter-counter").hide()
      }
      
    });
    
  }

  // Валидация формы регистрации
  
  if ($(".registration-form").length) {
    var validator = $("#regForm").bind("invalid-form.validate", function() {
        $("#summary").html("Пожалуйста, заполните все поля");
      }).validate({
      rules: {
        reg_email: {
          required: true,
          email: true
        }
      },
      sendForm : false,
      
      errorPlacement: function(error, element) {
        element.parents(".input-wrapper").addClass("input-wrapper-error");
        if (!element.parents(".registration-company").length) {
          error.insertAfter(element.parent());
        } else {
          error.insertAfter(element.parents(".registration-company"));
				} 
      },
      unhighlight: function(element, errorClass, validClass) {
        $(element).parents(".input-wrapper").removeClass("input-wrapper-error");
        $(element).removeClass(errorClass);
      }
    });
        
  }

  if ($(".experts").length) {
    $(".expertslist-item-big").first().addClass("expertslist-item-first");
  }
  
  // Фотогалерея

  if ($(".fancybox").length) {
  
    $(".fancybox")
    .attr('rel', 'gallery')
    .fancybox({
      nextEffect: 'fade',
      prevEffect: 'fade',
      beforeShow: function () {
      
        if (this.title) {
        
          this.title = '<div class="fancybox-counter">Фотография ' + (this.index + 1) + ' из ' + this.group.length +'</div><div class="ttl">'+this.title+'</div>'
        
          // New line
          this.title += '';
          
          picUrl = "http://seonews.renart.ru" + this.href;
          picUrl2 = "http://" + window.location.hostname + window.location.pathname + '?photo=' + (this.index + 1);
          
          //console.log(picUrl2);
          
          if ($(this.element).children(".descr").html()) {
            this.title += '<div class="descr">'+$(this.element).children(".descr").html()+'</div>'
          }
          
          
          
          this.title += '<div class="f-socbuttons fc">';
          
          
          
          // Add FaceBook like button
          
          this.title += '<div class="fancy-socbutton"><iframe src="//www.facebook.com/plugins/like.php?href='+picUrl2+'&amp;width&amp;height=21&amp;colorscheme=light&amp;layout=button_count&amp;action=like&amp;show_faces=false&amp;send=false&amp;ref=12121" scrolling="no" frameborder="0" style="border:none; overflow:hidden; height:21px;" allowTransparency="true"></iframe></div>';
          
          var vkButton = VK.Share.button({url: picUrl2},{type: "round", text: "Сохранить"})
          
          this.title += '<div class="fancy-socbutton" style="margin-right:20px">'+vkButton+'</div>'
          
          // Add tweet button
          this.title += '<div class="fancy-socbutton"><a href="https://twitter.com/share" class="twitter-share-button" data-count="horizontal" data-lang="ru" data-url="' + picUrl2 + '">Твитнуть</a></div>';
          
          this.title += '</div>'
          
          
          
        }
      },
      afterShow: function() {
        // Render tweet button
        twttr.widgets.load();
      },
      helpers : {
        title : {
          type: 'inside'
        }
      }
    });

  } 
    
  // Обработка табов
    
  $(".tabbed-content .tab").on('click', function() {
  	
  	
  
    $(this).parents(".tabs").find(".tab").removeClass("act");
    $(this).addClass("act");
    $(this).parents(".tabbed-content").find(".tab-content").hide()
    var target = $(this).parents(".tabbed-content").find("#"+$(this).attr("rel"));
    target.show()
    var sT1 = $("body").scrollTop();
    var sT2 = $("html").scrollTop();
    if (sT1) {
      sT = sT1
    } else {
      sT = sT2
    }
    
    var id = $(this).attr('id');
    if(id == 'type_29' || id == 'type_28')
    {
	    var type = id.substr(-2);
	    if($('#admin_page_ratings').length)
	      	 var href = "/ratings/admin_type_ajax.php?type=" + type;
	      else
	      	 var href = "/ratings/type_ajax.php?type=" + type;
	   
	    var new_url = "/ratings/?type=" + type; //новый урл, который нужно будет подставить
	      $.ajax({
	        url: href,
	        type: 'get',
	        dataType: 'html',
	        async: false
	      }).done(function(data) {
	        target.html(data);
	        //preparePage();
	        twttr.widgets.load();
	        FB.XFBML.parse();
	      });
	    
    }
    
    window.location.hash = $(this).attr("rel")
    $("body,html").animate({
      scrollTop: sT
    },0);
    return false;
  });
  
  
  // Tabs switching 

  if (window.location.hash == "#review-tab-0") {
    $(".tab[rel='review-tab-0']").click();
    $("html,body").animate({
      scrollTop: $(".tabbed-content").offset().top - 70
    },100);
  } 

  if (window.location.hash == "#photos-tab") {
    $(".tab[rel='photos-tab']").click();
    $("html,body").animate({
      scrollTop: $(".tabbed-content").offset().top - 70
    },100);
  }
  
  if (window.location.hash == "#upcoming") {
    $(".tab[rel='upcoming']").click();
  }
  
  if (window.location.hash == "#archive") {
    $(".tab[rel='archive']").click();
  }

  // Tabs switching END
  
  // Оформление чекбоксов

  if ($(".custom-form input:checkbox, .type-filter input:checkbox, .content-type-filter input:radio").length) {
    $(".custom-form input:checkbox, .type-filter input:checkbox, .content-type-filter input:radio").iCheck()
  }
	
	$('.content-type-filter input:checkbox').on('ifChecked ifUnchecked', function(){
		$(this).parents("label").toggleClass("label-checked");
	});
	
	$('.companies-type-filter input:checkbox').on('ifChecked ifUnchecked', function(){
		$(this).parents("label").toggleClass("label-checked");
		$(".found-hint").css("top",$(this).parents("label").position().top);
	});
	
	$('.content-type-filter input:checkbox').on('ifChecked', function(){
		$(this).parents(".content-type-filter").find("input:checkbox").not($(this)).iCheck("uncheck");
		$(".content-filter-form .reset").css("display","inline-block");
	});
	
	$('.content-type-filter input:checkbox').on('ifUnchecked', function(){
		if (!$(".content-type-filter input").is(":checked").length) {
			$(".content-filter-form .reset").css("display","none");
		}
	});
	
	$(".content-filter-form .reset").click(function() {
		$(".content-type-filter input:checkbox").iCheck("uncheck")
	});
  
  $(".type-filter").addClass("initial");
  
  // Фильтр по типам событий в правой колонке
  
	$('.type-filter input').on('ifChecked ifUnchecked', function(event){
		
		elementLoader("news_list_pageID");
		
		var href = document.location.href;
		var questionPos = href.indexOf("?");

		if ( questionPos != -1 ) {
			var clearUrl = href.slice(0, questionPos);	
		} else {
			var clearUrl = href;
		}
		
		
		var val = $(this).val();
		var queryString = "RUBRIC["+val+"]="+val;
		var oldQuery = "";
		if($("body").data("rubricQuery")){
			oldQuery = $("body").data("rubricQuery");
		}
		if(!$(this).is(":checked") && oldQuery.length){
			// удалить параметр
			var newQuery = oldQuery.replace("&"+queryString, "");
		} else {
			// добавить параметр
			var newQuery = oldQuery+"&"+queryString;
		}
		
		$("body").data("rubricQuery", newQuery);
		
		if($("body").data("topQuery")){
			newQuery = newQuery+$("body").data("topQuery");
		}
		$.ajaxhelper({
			url : clearUrl+"?"+newQuery,
			success:function(data){
				var result = $(data).html();
				$(".main-column").html(data);
				$("body").css("cursor","default");
				preparePage();
				evCalendar();
				removeLoader("news_list_pageID");
				
			}
		})
		return false;


	});
  
  /* $('.type-filter input').on('ifUnchecked', function(event){
    
    $("." + $(this).attr("rel")).hide();
    
    if (!$(".type-filter").find("input").is(":checked")) {
      $(".type-filter").addClass("initial");
      $(".event-type").show();
    }
    
  }); */
  
  // $(".events-calendar .tab").click(function() {
    // if (!$(this).hasClass(".act")) {
      // $('.type-filter input').iCheck('uncheck');
    // }
  // });
  

  makeup();
  
  // Подгрузка содержимого из html

  $(".ajax-link").click(function() {
    var link = $(this);
    $(".section-content").html("<div class='news-loader' />");
	
    $.ajax({
      url: $(this).attr("rel"),
      type: 'get',
      dataType: 'html',
      async: false
    }).done(function(data) {
      //$(".news-loader").remove();
      $(".section-content").html(data);
        link.addClass("act");
        makeup();	
        newsMakeup();
    });
	
  });
  
  $(".nav-calendar .ajax-link").click(function() {
   
    if($('.nav-calendar span.year.year-act').html() && $('span.ajax-link.act').html()) 
      $('h2.section-title').html($(this).html()+' '+$('.nav-calendar span.year.year-act').html());
    else 
      $('h2.section-title').html($(this).html());
    
   
  });  
  
  // Клик по навигации с датами
  
  $(document.body).on('click', ".year-nav .item" ,function() {
  
 
    if (!$(this).hasClass("act")) {
      $(".year-nav .item").removeClass("act");
      var link = $(this);
      link.addClass("act");
      var target = $("#"+$(this).attr("rel"));
      
      $(".year-nav").closest(".rating-years").find(".rating-content").hide();
	 
    
	  var link = $(this);
      link.after("<div class='loader' />");
      
      var year_id = $(this).attr("data-year-id");
      if($('#admin_page_ratings').length)
      	var href = "/ratings/admin_detail_ajax.php?ID=" + year_id;
      else
      	var href = "/ratings/detail_ajax.php?ID=" + year_id;
      var new_url = "/ratings/" + year_id + "/"; //новый урл, который нужно будет подставить
      $.ajax({
        url: href,
        type: 'get',
        dataType: 'html',
        async: false
      }).done(function(data) {
        $(".loader").remove();
        target.html(data);
        twttr.widgets.load();
        FB.XFBML.parse();
        target.fadeIn(250);
        //makeup();
      });
    
    }
  
  });
  
  // Подгрузка из html по клику
  
  $(".show-more").click(function() {
    var link = $(this);
    link.after("<div class='loader' />");
    $.ajax({
      url: $(this).attr("rel"),
      type: 'get',
      dataType: 'html',
      async: false
    }).done(function(data) {
      $(".loader").remove();
      link.before(data);
      makeup();
    });
  });

  
  
  $(document.body).on('click', '.section-filter .link', function() {
    $(".section-filter .link").removeClass("act")
    $(this).addClass("act");
    if ($(this).attr("rel") == "all") {
      $(".event-type").show();
    } else {
      $(".event-type").hide();
      $(".event-type[rel='"+$(this).attr("rel")+"']").show();
    }
  });
  
  $(document.body).on('click', '.section-filter-tools .link', function() {
    if (!$(this).hasClass("act")) {
      $(".section-filter-tools .link").removeClass("act")
      $(this).addClass("act");
      var link = $(this);
      link.after("<div class='loader' />");
      $.ajax({
        url: $(this).attr("rel"),
        type: 'get',
        dataType: 'html',
        async: false
      }).done(function(data) {
        $(".loader").remove();
        $(".section-content").html(data);
        makeup();
		
        handleTools();
      });
    }
	
  });
  
  if ($(".section-filter-tools").length) {
    $(".section-filter-tools .link").last().trigger("click");
  }
  
  // Кнопка "Наверх"
  
  $(".sidenav").click(function() {
    $("body, html").stop().animate({
      scrollTop: 0
    },1000);
  });
  

  

  // Клик по "Добавить в избранное"

  $(".fav-trigger").click(function() {
    $(".fav-hint").remove();
    $('.fav-trigger span').html($('.fav-trigger span').html() == 'В избранное' ? 'В избранном' : 'В избранное');
    $(this).toggleClass("fav-trigger-act");
    $(this).append("<div class='fav-hint hint-popup' style='display:none'><div class='hint-content'></div></div>");
    $(".fav-trigger .hint-popup").fadeIn(150);
    $('.fav-trigger .hint-popup .hint-content').html($('.fav-trigger span').html() == 'В избранное' ? 'Добавлено в избранное' : 'Удалено из избранного');
    var tt0 = setTimeout(function() {
      $(".fav-hint").fadeOut(150,function() {
        $(".fav-hint").remove();
      })
    },2000);
  });
  
  
  /*
  $("div.button-5").click(function() {
    $(".fav-hint").remove();
    var title = $(this).html() == "<span>Я пойду</span>" ? "<span>Я не пойду</span>" : "<span>Я пойду</span>";
    var baloontext = title == '<span>Я не пойду</span>' ? 'Вы добавлены' : 'Вы удалены';
    $(this).append("<div class='fav-hint hint-popup' style='display:none'><div class='hint-content'></div></div>");
    $("div.button-5 .hint-popup").fadeIn(150);	
    $('div.button-5 .hint-popup .hint-content').html(baloontext);
    var tt0 = setTimeout(function() {
      $(".fav-hint").fadeOut(150,function() {
        $(".fav-hint").remove();
		$('div.button-5').html(title);
      })
    },2000);
	 
	var result = null;
	var xdata = {ID:$(this).attr('rel'),ACTION:baloontext};
	
    $.ajax({
      url: '/ajax/addmember.php',
	  data: xdata,
      type: 'post',
      dataType: 'json',
      async: false
    }).done(function(data) {     
        
        result = data;    
		if(result.SUMM>0) $('span.total span').html(result.SUMM+' чел.');
        
    });
	
	
	
  });
  */
  
  
  $("*").hover(function() {
    if ($(this).attr("hint")) {
      $(".hint-dis").remove();
      $("body").append("<div class='hint-popup'><div class='hint-content'>"+$(this).attr("hint")+"</div></div>");
      $(".hint-popup").css("top",$(this).offset().top - $(".hint-popup").outerHeight(true)).css("left",$(this).offset().left - $(".hint-popup").outerWidth(true)/2+$(this).outerWidth()/2).hide().fadeIn(150);
      if ($(this).attr("hinttype")) {
        $(".hint-popup").addClass($(this).attr("hinttype"));
      }
    }
  },function() {
    if ($(this).attr("hint")) {
      $(".hint-popup").addClass("hint-dis").fadeOut(150,function() {
        $(".hint-dis").remove();
      });
    }
  });
  

  /* if ($(".mainpage-calendar").length) {
    $(".mainpage-calendar").mainpageCalendar();
  } */
  
  if ($(".mainpage-catalogue").length) {
    $(".mainpage-catalogue").mainpageCatalogue();
  }
  
  if ($(".mainpage-ratings").length) {
    //$(".mainpage-ratings").mainpageRatings();
		// Статичная листалка рейтингов
    $(".mainpage-ratings").mainpageRatingsStatic();
  }
  
  $(".rating").hover(function() {
    $(this).find(".rating-controls").fadeIn(150);
  },function() {
    $(this).find(".rating-controls").fadeOut(150);
  });
  
  
  
  $(".button-comment").click(function() {
    $(".root-comment").slideToggle(150);
  });
  
  $(".comment-body").hover(function() {
    if ($(this).next(".form-wrapper").css("display") != "block" && !$(this).parents().hasClass("qa-comments")) {
      $(this).children(".reply-link").slideDown(150);
    }
  },function() {
    $(this).children(".reply-link").slideUp(150);
  });
  
  $(".reply-link").click(function() {
    $(this).hide();
    $(this).parents(".comment-body").next(".form-wrapper").slideDown(150);
  });
  
  $(".post-comments .cancel").click(function() {
    $(this).parents(".form-wrapper").slideUp(150);
  });
  
}

// Календарь событий

function evCalendar() {

  var evGroups = $(".events-calendar .cal-content[rel='archive'] .events-group");

  $(".events-calendar .tabs .tab").on("click",function() {
    window.location.hash = $(this).attr("rel");
    $(".events-calendar .tabs .tab").removeClass("act");
    $(this).addClass("act");
    $(".events-calendar .cal-content").hide();
    $(".events-calendar .cal-content[rel='"+$(this).attr("rel")+"']").fadeIn(250);
    if ($(this).attr("rel") == "upcoming") {
      $(".events-calendar .month-nav").fadeOut(250);
    } else if (evGroups.length) {
      $(".events-calendar .month-nav").fadeIn(250);
    }
  });
  
  var monthNav = $(".events-calendar .month-nav");
  
  var monthTrigger = monthNav.find(".month");
  
  var monthPopup = monthNav.find(".cal-popup");
  
  monthTrigger.off("click").on("click",function() {
    monthPopup.fadeToggle(250);
  });
  
  monthPopup.hover(function() {
    $(this).addClass("hover")
  },function() {
    $(this).removeClass("hover")
  });
  
  monthTrigger.hover(function() {
    $(this).addClass("hover")
  },function() {
    $(this).removeClass("hover")
  });
  
  $("body").on("click",function() {
    if (!monthPopup.hasClass("hover") && !monthTrigger.hasClass("hover")) {
      monthPopup.fadeOut(250)
    }
  });
  
  monthPopup.find(".close").on("click",function() {
      monthPopup.fadeOut(250)
  });
  
  
  
  if (!evGroups.length) {
    monthNav.hide()
  }
  
  evGroups.hide();
  
  evGroups.last().show().addClass("ev-group-current");
  
  var curMonth = parseInt(evGroups.last().attr("month"),10);
  
  var curYear = evGroups.last().attr("year");
  
  monthTrigger.find("span").html(monthName2[curMonth - 1] + " " + curYear);
  
  var cpYearsNav = monthPopup.find(".cal-popup-years .item");
  
  cpYearsNav.filter("[year='"+curYear+"']").addClass("act");
  
  cpYears = monthPopup.find(".cal-popup-months");
  
  cpYears.hide();
  
  cpYears.filter("[year='"+curYear+"']").show();
  
  
  cpYearsNav.on("click",function() {
    curYear = $(this).attr("year");
    cpYearsNav.removeClass("act");
    cpYearsNav.filter("[year='"+curYear+"']").addClass("act");
    cpYears.hide().removeClass("years-group-current");
    cpYears.filter("[year='"+curYear+"']").fadeIn(250).addClass("years-group-current");
  });
  
  var cpMonthsNav = monthPopup.find(".cal-popup-months .item");
  
  cpMonthsNav.not(".inact").last().addClass("act");
  
  
  cpMonthsNav.on("click",function() {
    if (!$(this).hasClass("act") && !$(this).hasClass("inact")) {
      curYear = $(this).attr("year");
      curMonth = $(this).attr("month");
      cpMonthsNav.removeClass("act");
      cpMonthsNav.filter("[year='"+curYear+"'][month='"+curMonth+"']").addClass("act");
      evGroups.hide();
      evGroups.filter("[year='"+curYear+"'][month='"+curMonth+"']").fadeIn(250);
      monthTrigger.find("span").html(monthName2[curMonth - 1] + " " + curYear);
      monthPopup.fadeOut(250);
    }
  });
  
  var prevBtn = $(".month-nav .prev");
  var nextBtn = $(".month-nav .next");
  
  if (evGroups.last().prev(".events-group").length) {
    prevBtn.removeClass("inact");
  }
  
  prevBtn.on("click",function() {
    if (!$(this).hasClass("inact") && $(".ev-group-current").prev(".events-group").length) {
      curYear = $(".ev-group-current").prev(".events-group").attr("year");
      curMonth = $(".ev-group-current").prev(".events-group").attr("month");
      evGroups.hide().removeClass("ev-group-current");
      evGroups.filter("[year='"+curYear+"'][month='"+curMonth+"']").fadeIn(250).addClass("ev-group-current");
      
      monthTrigger.find("span").html(monthName2[curMonth - 1] + " " + curYear);
      
      cpYearsNav.removeClass("act");
      cpYearsNav.filter("[year='"+curYear+"']").addClass("act");
      cpYears.hide().removeClass("years-group-current");
      cpYears.filter("[year='"+curYear+"']").fadeIn(250).addClass("years-group-current");
      cpMonthsNav.removeClass("act");
      cpMonthsNav.filter("[year='"+curYear+"'][month='"+curMonth+"']").addClass("act");
      
      nextBtn.removeClass("inact");
      if (!$(".ev-group-current").prev(".events-group").length) {
        prevBtn.addClass("inact");
      }
    }
  });
  
  nextBtn.on("click",function() {
    if (!$(this).hasClass("inact") && $(".ev-group-current").next(".events-group").length) {
      curYear = $(".ev-group-current").next(".events-group").attr("year");
      curMonth = $(".ev-group-current").next(".events-group").attr("month");
      evGroups.hide().removeClass("ev-group-current");
      evGroups.filter("[year='"+curYear+"'][month='"+curMonth+"']").fadeIn(250).addClass("ev-group-current");
      
      monthTrigger.find("span").html(monthName2[curMonth - 1] + " " + curYear);
      
      cpYearsNav.removeClass("act");
      cpYearsNav.filter("[year='"+curYear+"']").addClass("act");
      cpYears.hide().removeClass("years-group-current");
      cpYears.filter("[year='"+curYear+"']").fadeIn(250).addClass("years-group-current");
      cpMonthsNav.removeClass("act");
      cpMonthsNav.filter("[year='"+curYear+"'][month='"+curMonth+"']").addClass("act");
      
      prevBtn.removeClass("inact");
      if (!$(".ev-group-current").next(".events-group").length) {
        nextBtn.addClass("inact");
      }
    }
  });
  
  
}

function openPopup(popup) {
  var popup = popup;
  
  popup.addClass("popup-act");
  
  $("body").append("<div class='tint'></div>");
    
  popup.fadeIn(150);
  pupMakeup();
  
  jQuery(document).keydown(function(e){
    if (e == null) { // ie
      keycode = event.keyCode;
    } else { // mozilla
      keycode = e.which;
    }
    
    if(keycode == 27){ // escape, close box
      closePopup()
    }
    
  });
  
  $(".tint").on("click", function () {
    closePopup()
  });
  
  $(".popup .close").on("click", function () {
    closePopup()
  });
  
}

function validateForms() {
  
  $(".common-form form").each(function() {
    $(this).validate({
      focusInvalid: false,
      sendForm : false,
      errorPlacement: function(error, element) {
        element.parents(".input-wrapper").addClass("input-wrapper-error");
        element.parents(".form-item").find(".placeholder").addClass("placeholder-error");
        if (element.attr("id") != "reg_email" || element.val() == "") {
          error.insertAfter(element);
        }
        element.focus(function() {
          error.remove();
        });
      },
      unhighlight: function(element, errorClass, validClass) {
        $(element).parents(".input-wrapper").removeClass("input-wrapper-error");
        $(element).parents(".form-item").find(".placeholder").removeClass("placeholder-error");
        $(element).removeClass(errorClass);
      },
      invalidHandler: function(form, validatorcalc) {
        var errors = validatorcalc.numberOfInvalids();
        if (errors && validatorcalc.errorList[0].element.tagName == "INPUT") {                    
            validatorcalc.errorList[0].element.focus();
        }
      }
    });
    
    if ($(this).find(".form-email").length) {
      $(this).find(".form-email").rules('add', {
        email: true,
        messages: {
          required:  "Введите правильный адрес!"
        }
      });
    }
    
    if ($(this).find(".form-date").length) {
      $(this).find(".form-date").rules('add', {
        messages: {
          required:  "Выберите дату!"
        }
      });
    }
    
    if ($(this).find(".form-email").length && $(this).find(".form-phone").length) {
      var thisField = $(this).find(".form-phone");
      var relatedField = $(this).find(".form-email");
      thisField.rules('add', {
        required: function(element) {
          if (relatedField.val() == "") {
            return true;
          } else {
            return false;
          }
        }
      });
      var thisField2 = $(this).find(".form-email");
      var relatedField2 = $(this).find(".form-phone");
      thisField2.rules('add', {
        required: function(element) {
          if (relatedField2.val() == "") {
            return true;
          } else {
            return false;
          }
        }
      });
    }
    
    $(document).mouseup(function (e) {
      var container = $("form");

      if (!container.is(e.target) // if the target of the click isn't the container...
          && container.has(e.target).length === 0) // ... nor a descendant of the container
      {
          $(".error-wrapper").remove();
      }
    });
    
  });  
    
}

jQuery.extend(jQuery.validator.messages, {
    required: "Заполните поле!",
    remote: "Please fix this field.",
    email: "Введите правильный e-mail",
    url: "Please enter a valid URL.",
    date: "Please enter a valid date.",
    dateISO: "Please enter a valid date (ISO).",
    number: "Please enter a valid number.",
    digits: "Please enter only digits.",
    creditcard: "Please enter a valid credit card number.",
    equalTo: "Please enter the same value again.",
    accept: "Please enter a value with a valid extension.",
    maxlength: jQuery.validator.format("Please enter no more than {0} characters."),
    minlength: jQuery.validator.format("Please enter at least {0} characters."),
    rangelength: jQuery.validator.format("Please enter a value between {0} and {1} characters long."),
    range: jQuery.validator.format("Please enter a value between {0} and {1}."),
    max: jQuery.validator.format("Please enter a value less than or equal to {0}."),
    min: jQuery.validator.format("Please enter a value greater than or equal to {0}.")
});

function ajaxUpdateHref(params, link)
{
	history.pushState(params, "", link);
	history.pathname = link;		
}

jQuery.extend(jQuery.validator.messages, {
    required: "Поле не заполнено!",
    remote: "Please fix this field.",
    email: "Введите правильный e-mail",
    url: "Please enter a valid URL.",
    date: "Please enter a valid date.",
    dateISO: "Please enter a valid date (ISO).",
    number: "Please enter a valid number.",
    digits: "Please enter only digits.",
    creditcard: "Please enter a valid credit card number.",
    equalTo: "Please enter the same value again.",
    accept: "Please enter a value with a valid extension.",
    maxlength: jQuery.validator.format("Please enter no more than {0} characters."),
    minlength: jQuery.validator.format("Please enter at least {0} characters."),
    rangelength: jQuery.validator.format("Please enter a value between {0} and {1} characters long."),
    range: jQuery.validator.format("Please enter a value between {0} and {1}."),
    max: jQuery.validator.format("Please enter a value less than or equal to {0}."),
    min: jQuery.validator.format("Please enter a value greater than or equal to {0}.")
});

