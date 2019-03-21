$(document).ready(function () {
  setInterval(function () {
    var ts = countdown(new Date(2019, 4, 20)).toString()
    var result = ts
      .replace(/day/g, '日')
      .replace(/hour/g, '時間')
      .replace(/minute/g, '分')
      .replace(/second/g, '秒')
      .replace(/s/g, '')
      .replace(/and/g, '')
      .replace(/,/g, '')
      .replace(/ /g, '')
      .split('month')[1]
    $('#countdown').html(result)
  }, 100)
})
