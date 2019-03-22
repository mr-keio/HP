$(document).ready(function () {
  const urlHash = location.hash
  if (urlHash) {
    $('body,html').scrollTop(0)
    setTimeout(function () {
      scrollToAnker(urlHash) 
    }, 100)
  }

  $('a[href^="#"]').click(function () {
    const href= $(this).attr("href")
    const hash = href == "#" || href == "" ? 'html' : href
    scrollToAnker(hash)
    return false
  })
  function scrollToAnker (hash) {
    const target = $(hash)
    const position = target.offset().top - 100
    $('html,body').animate({scrollTop:position})
    const sp_nav_show = $('.show')
    $('.show').removeClass('show')
  }
})
