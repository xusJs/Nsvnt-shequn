import vue from 'vue'

vue.filter('timeFilter', function (value) {
  value = parseInt(value)
  // var d = new Date(Date.UTC(2017, 12, 10, 0, 0, 0, 0));  // time
  var d = new Date(Date.UTC(1970, 0, 1, 0, 0, 0, 0));  // time
  // console.log(d)

  var t = parseInt(d.getTime() / 1000);

  var d = new Date((value + t) * 1000);
  var month = d.getMonth() + 1;

  if (month < 10) {
    month = "0" + month;
  }

  var day = d.getDate();

  if (day < 10) {
    day = "0" + day;
  }

  var h = d.getHours();
  var m = d.getMinutes();
  var s = d.getSeconds();

  if (h < 10) {
    h = "0" + h;
  }

  if (m < 10) {
    m = "0" + m;
  }

  if (s < 10) {
    s = "0" + s;
  }

  // return d.getFullYear() + "/" + month + "/" + day + " " + h + ":" + m + ":" + s;

  return month + "-" + day + " " + h + ":" + m;

});

vue.filter('timeYearFilter', function (value) {
  value = parseInt(value)
  // var d = new Date(Date.UTC(2017, 12, 10, 0, 0, 0, 0));  // time
  var d = new Date(Date.UTC(1970, 0, 1, 0, 0, 0, 0));  // time
  // console.log(d)

  var t = parseInt(d.getTime() / 1000);

  var d = new Date((value + t) * 1000);
  var month = d.getMonth() + 1;

  if (month < 10) {
    month = "0" + month;
  }

  var day = d.getDate();

  if (day < 10) {
    day = "0" + day;
  }
  return d.getFullYear() + "年" + month + "月" + day + "日";

})


// 钱的过滤
vue.filter('STUFilter', function(value , currencyType) {
  return (value/100000000)
})

//得票率的过滤
vue.filter('AppFilter', function(value , currencyType) {
  return (value/100000000000000).toFixed(2)
})


vue.filter('TimeFilter', function(value , currencyType ) {

  var d = new Date(Date.UTC(2017, 12, 10, 0, 0, 0, 0));  // time
  var t = parseInt(d.getTime() / 1000);

  var d = new Date((value + t) * 1000);
  var month = d.getMonth() + 1;

  if (month < 10) {
    month = "0" + month;
  }

  var day = d.getDate();

  if (day < 10) {
    day = "0" + day;
  }

  var h = d.getHours();
  var m = d.getMinutes();
  var s = d.getSeconds();

  if (h < 10) {
    h = "0" + h;
  }

  if (m < 10) {
    m = "0" + m;
  }

  if (s < 10) {
    s = "0" + s;
  }

  return d.getFullYear() + "/" + month + "/" + day + " " + h + ":" + m + ":" + s;

})
