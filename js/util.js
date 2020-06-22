'use strict';

window.util = (function () {

  return {
    isEscapeEvent: function (evt, action) {
      if (evt.key === 'Escape') {
        action();
      }
    }
  };
})();
