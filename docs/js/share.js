import { loadavg } from "os";

// $(function () {
//   if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
//       $("a[href*='twitter.com']").each(function () {
//           var match;
//           var $elm = $(this);
//           if ((match = $elm.attr('href').match(/twitter\.com\/(?:#!\/)?([a-zA-Z0-9_]{1,20})$/))) {
//               $elm.attr('href', 'twitter://user?screen_name=' + match[1]);
//           }
//           if ((match = $elm.attr('href').match(/twitter\.com\/(?:#!\/)?[a-zA-Z0-9_]{1,20}\/status(?:es)?\/(\d+)$/))) {
//               $elm.attr('href', 'twitter://status?status_id=' + match[1]);
//           }
//         });
//       }
//   });
$(document).ready(function () {
  $("a[href*='twitter.com']").click(function () {
    // if(navigator.userAgent.match(/(iPhone|iPad|iPod|Android)/i)) {
      // const before = location.href
      // location.href = 'twitter://post?message=Mr.KEIO CONTEST 2019 HP'
      // if (before === location.href) {
        // location.href = 'https://twitter.com/intent/tweet?text=Mr.KEIO CONTEST 2019 HP'
      // }
      // location.href = 'twitter://'
      // setTimeout(function () {
        // location.href = 'https://twitter.com/intent/tweet?text=Mr.KEIO CONTEST 2019 HP'
        // open('https://twitter.com/intent/tweet?url=asdf.com&text=テキスト&via=takasho53000&hashtags=#test&related=takasho53000', '_blank')  
      // }, 500)
    // } else {
    open('https://twitter.com/intent/tweet?url=asdf.com&text=テキスト&via=takasho53000&hashtags=#test&related=takasho53000', '_blank')
    // }
    return false
  })
})
