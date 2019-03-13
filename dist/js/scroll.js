"use strict"
    $(document).ready(function(){
      var urlHash = location.hash;
      if(urlHash) {
        $('body,html').scrollTop(0);
        setTimeout(function () {
          scrollToAnker(urlHash) ;
        }, 100);
      }

      $('a[href^="#"]').click(function() {
        var href= $(this).attr("href");
        var hash = href == "#" || href == "" ? 'html' : href;
        scrollToAnker(hash);
        return false;
      });
      function scrollToAnker(hash) {
        var target = $(hash);
        var position = target.offset().top - 100;
        $('html,body').animate({scrollTop:position});
        const sp_nav_show = $('.show')
        $('.show').removeClass('show')
      }
    })
