$(document).ready(function () {
  new ClipboardJS('#clip')
    .on('success', function(e) {
      window.alert(e.text + 'をコピーしました')
  })
})
