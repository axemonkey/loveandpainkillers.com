(function () {
  'use strict';

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;
        var F = function () {};
        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true,
      didErr = false,
      err;
    return {
      s: function () {
        it = it.call(o);
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }

  var getData = function getData(filename, callback) {
    var xhttp = new XMLHttpRequest();
    var ms = Date.now();
    xhttp.onreadystatechange = function () {
      if (xhttp.readyState === 4 && xhttp.status === 200) {
        callback(xhttp.responseText);
      }
    };
    xhttp.open('GET', "../data/".concat(filename, ".json?ms=").concat(ms), false);
    xhttp.send();
  };

  var loadStatus = {
    steps: false,
    states: false
  };
  var loadData = {};
  var loadInterval;
  var gotSteps = function gotSteps(stepsResponse) {
    loadData.steps = JSON.parse(stepsResponse).steps;
    loadStatus.steps = true;
  };
  var gotStates = function gotStates(statesResponse) {
    loadData.states = JSON.parse(statesResponse).states;
    loadStatus.states = true;
  };
  var makeProgressTable = function makeProgressTable(statuses) {
    // start table
    var html = '<table class="progressTable">';
    var index = 0;
    var _iterator = _createForOfIteratorHelper(statuses),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var status = _step.value;
        if (status <= 2) {
          html += '<tr>';
          html += "<th><span>".concat(loadData.steps[index], "</span></th>");
          html += "<td class=\"status".concat(status, "\">").concat(loadData.states[status].text, "</td>");
          html += '</tr>';
        }
        index++;
      }

      // end table
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    html += '</table>';
    return html;
  };
  var showProgress = function showProgress(event) {
    var track = event.target.tagName === 'LI' ? event.target : event.target.parentNode;
    var trackData = track.dataset.statuses;
    var visibleTables = document.querySelectorAll('.progressTable');
    if (track.classList.contains('open')) {
      track.classList.remove('open');
      var _iterator2 = _createForOfIteratorHelper(visibleTables),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var table = _step2.value;
          table.remove();
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    } else {
      var _iterator3 = _createForOfIteratorHelper(visibleTables),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var _table = _step3.value;
          _table.parentNode.classList.remove('open');
          _table.remove();
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
      track.classList.add('open');
      track.innerHTML += makeProgressTable(trackData);
    }
  };
  var showBackground = function showBackground(trackEl) {
    var completionSpan = trackEl.querySelector('.completion');
    completionSpan.style.height = "".concat(trackEl.offsetHeight - 6, "px");
    completionSpan.style.width = "".concat(trackEl.dataset.completion, "%");
  };
  var setupPage = function setupPage() {
    document.body.classList.add('js');
    var tracks = document.querySelectorAll('.trackItem');
    var _iterator4 = _createForOfIteratorHelper(tracks),
      _step4;
    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var track = _step4.value;
        showBackground(track);
        track.addEventListener('click', showProgress);
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }
  };
  var init = function init() {
    getData('steps', gotSteps);
    getData('states', gotStates);
    loadInterval = window.setInterval(function () {
      if (loadStatus.steps && loadStatus.states) {
        window.clearInterval(loadInterval);
        setupPage();
      }
    }, 500);
  };

  window.addEventListener('load', init);

})();
