"use strict";

var range = document.querySelectorAll('.range input[type="range"]');
var num = document.querySelectorAll('.range .range-input');
var sum = document.querySelectorAll('.input input[type="text"]');
var line = document.querySelectorAll('.range-line div');
var rangeRow = document.querySelectorAll('.range-row');
var btn = document.querySelector('.form-btn');
var proc = document.querySelector('.range-text__proc');
var form = document.querySelector('.main-form');
sumRes();

function handleSubmit(e) {
  e.preventDefault();
  var data = new FormData(e.target);
  var value = Object.fromEntries(data.entries());
  form.classList.add('not-active');
  btn.classList.add('active');
  rangeRow.forEach(function (el) {
    el.classList.add('disabled');
  });
  setTimeout(function () {
    btn.classList.add('pressed');
    btn.querySelector('span').innerHTML = 'Отправлено';
    setTimeout(function () {
      alert("\u0421\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u044F: ".concat(value.num1, " \u20BD\r\n\u041F\u0435\u0440\u0432\u043E\u043D\u0430\u0447\u0430\u043B\u044C\u043D\u044B\u0439 \u0432\u0437\u043D\u043E\u0441: ").concat(value.num2, "\r\n\u0421\u0440\u043E\u043A \u043B\u0438\u0437\u0438\u043D\u0433\u0430: ").concat(value.num3, "\r\n\u041F\u0440\u043E\u0446\u0435\u043D\u0442: ").concat(value.procent, "\r\n\u0421\u0443\u043C\u043C\u0430 \u0434\u043E\u0433\u043E\u0432\u043E\u0440\u0430 \u043B\u0438\u0437\u0438\u043D\u0433\u0430: ").concat(value.res1, "\r\n\u0415\u0436\u0435\u043C\u0435\u0441\u044F\u0447\u043D\u044B\u0439 \u043F\u043B\u0430\u0442\u0435\u0436 \u043E\u0442: ").concat(value.res2));
      btn.classList.remove('pressed');
      btn.classList.remove('active');
      btn.querySelector('span').innerHTML = 'Оставить заявку';
      form.classList.remove('not-active');
      rangeRow.forEach(function (el) {
        el.classList.remove('disabled');
      });
    }, 300);
  }, 1000);
}

form.addEventListener('submit', handleSubmit);

function sumRes() {
  proc.value = Math.round(+num[0].value.replace(/[^0-9]/g, '') / 100 * +num[1].value.replace(/[^0-9]/g, '')).toLocaleString() + ' ₽';
  sum[1].value = Math.round((+num[0].value.replace(/[^0-9]/g, '') - +proc.value.replace(/[^0-9]/g, '')) * (0.05 * Math.pow(1 + 0.05, +num[2].value.replace(/[^0-9]/g, '')) / (Math.pow(1 + 0.05, +num[2].value.replace(/[^0-9]/g, '')) - 1))).toLocaleString() + ' ₽';
  sum[0].value = Math.round(+proc.value.replace(/[^0-9]/g, '') + +num[2].value.replace(/[^0-9]/g, '') * +sum[1].value.replace(/[^0-9]/g, '')).toLocaleString() + ' ₽';
}

function btnActive() {
  btn.classList.remove('not-active');
}

proc.addEventListener('input', function () {
  num[1].value = Math.round(100 / +num[0].value.replace(/[^0-9]/g, '') * +proc.value.replace(/[^0-9]/g, '')) + ' %';
  range[1].value = +num[1].value.replace(/[^0-9]/g, '');
  line[1].style.width = "".concat(100 / 50 * (+range[1].value - 10), "%");
  btnActive();
});
proc.addEventListener('blur', function () {
  rangeRow[1].classList.add('disabled');
  proc.value = (+proc.value.replace(/[^0-9]/g, '')).toLocaleString() + ' ₽';

  if (+num[1].value.replace(/[^0-9]/g, '') < 10) {
    num[1].value = '10 %';
    proc.value = Math.round(+num[0].value.replace(/[^0-9]/g, '') * 0.1).toLocaleString() + ' ₽';
  }

  if (+num[1].value.replace(/[^0-9]/g, '') > 60) {
    num[1].value = '60 %';
    proc.value = Math.round(+num[0].value.replace(/[^0-9]/g, '') * 0.6).toLocaleString() + ' ₽';
  }
});
proc.addEventListener('focus', function () {
  rangeRow.forEach(function (el) {
    el.classList.remove('active');
  });
  rangeRow[1].classList.add('active');
  rangeRow[1].classList.remove('disabled');
});
range.forEach(function (r, i) {
  if (i === 0) {
    num[i].value = (+r.value).toLocaleString();
    line[i].style.width = "".concat(100 / 8500000 * (+r.value - 1500000), "%");
  }

  if (i === 1) {
    num[i].value = (+r.value).toLocaleString() + ' %';
    line[i].style.width = "".concat(100 / 50 * (+r.value - 10), "%");
  }

  if (i === 2) {
    num[i].value = (+r.value).toLocaleString();
    line[i].style.width = "".concat(100 / 114 * (+r.value - 6), "%");
  }

  r.addEventListener('input', function () {
    rangeRow[i].classList.add('disabled');
    btnActive();
    num[i].value = (+r.value).toLocaleString();
    sumRes();

    if (i === 0) {
      num[i].value = (+r.value).toLocaleString();
      line[i].style.width = "".concat(100 / 8500000 * (+r.value - 1500000), "%");
    }

    if (i === 1) {
      num[i].value = (+r.value).toLocaleString() + ' %';
      line[i].style.width = "".concat(100 / 50 * (+r.value - 10), "%");
    }

    if (i === 2) {
      num[i].value = (+r.value).toLocaleString();
      line[i].style.width = "".concat(100 / 114 * (+r.value - 6), "%");
    }
  });
});
num.forEach(function (n, i) {
  n.addEventListener('input', function () {
    range[i].value = +n.value.replace(/[^0-9]/g, '');
    btnActive();

    if (i === 0) {
      line[i].style.width = "".concat(100 / 8500000 * (range[i].value - 1500000), "%");
    }

    if (i === 1) {
      n.value = +n.value.replace(/[^0-9]/g, '') + ' %';
      line[i].style.width = "".concat(100 / 50 * (+range[i].value - 10), "%");
    }

    if (i === 2) {
      line[i].style.width = "".concat(100 / 114 * (range[i].value - 6), "%");
    }
  });
  n.addEventListener('focus', function () {
    rangeRow.forEach(function (el) {
      el.classList.remove('active');
    });
    rangeRow[i].classList.add('active');
    rangeRow[i].classList.remove('disabled');
  });
  n.addEventListener('blur', function () {
    rangeRow[i].classList.add('disabled');
    n.value = (+n.value.replace(/[^0-9]/g, '')).toLocaleString();

    if (i === 0) {
      if (+n.value.replace(/[^0-9]/g, '') < 1500000) {
        n.value = '1 500 000';
      }

      if (+n.value.replace(/[^0-9]/g, '') > 10000000) {
        n.value = '10 000 000';
      }
    }

    if (i === 1) {
      n.value = (+n.value.replace(/[^0-9]/g, '')).toLocaleString() + ' %';

      if (+n.value.replace(/[^0-9]/g, '') < 10) {
        n.value = '10 %';
      }

      if (+n.value.replace(/[^0-9]/g, '') > 60) {
        n.value = '60 %';
      }
    }

    if (i === 2) {
      if (+n.value.replace(/[^0-9]/g, '') < 6) {
        n.value = '6';
      }

      if (+n.value.replace(/[^0-9]/g, '') > 120) {
        n.value = '120';
      }
    }

    sumRes();
  });
});