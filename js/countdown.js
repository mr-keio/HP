$(document).ready(function () {
  new ClipboardJS('#clip')
    .on('success', function(e) {
      window.alert(e.text + 'をコピーしました')
  })
  setInterval(function () {
    var ts = countdown(new Date(2019, 4, 20)).toHTML()
    var result = ts
      .replace(/days|day/g, "<span>日</span>")
      .replace(/hours|hour/g, "<span>時間</span>")
      .replace(/minutes|minute/g, "<span>分</span>")
      .replace(/seconds|second/g, "<span>秒</span>")
      .replace(/and/g, '')
      .replace(/,/g, '')
      .replace(/ /g, '')
      .split('month')[1]
    $('#countdown').html(result)
  }, 100)
})
