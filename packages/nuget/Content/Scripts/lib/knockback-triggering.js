/*
  knockback-triggering.js 0.16.5
  (c) 2011, 2012 Kevin Malakoff - http://kmalakoff.github.com/knockback/
  License: MIT (http://www.opensource.org/licenses/mit-license.php)
  Dependencies: Knockout.js, Backbone.js, and Underscore.js.
*/
(function() {
  return (function(factory) {
    // AMD
    if (typeof define === 'function' && define.amd) {
      return define('knockback-triggering', ['underscore', 'backbone', 'knockout', 'knockback'], factory);
    }
    // CommonJS/NodeJS or No Loader
    else {
      return factory.call(this);
    }
  })(function() {// Generated by CoffeeScript 1.3.3
var Backbone, kb, ko, _;

kb = !this.kb && (typeof require !== 'undefined') ? require('knockback') : this.kb;

_ = kb._;

Backbone = kb.Backbone;

ko = kb.ko;

this.Knockback = this.kb = kb;

if (typeof exports !== 'undefined') {
  module.exports = kb;
}

/*
  knockback-triggered-observable.js 0.16.5
  (c) 2011, 2012 Kevin Malakoff.
  Knockback.Observable is freely distributable under the MIT license.
  See the following for full license details:
    https://github.com/kmalakoff/knockback/blob/master/LICENSE
*/


kb.TriggeredObservable = (function() {

  function TriggeredObservable(model, event_name) {
    var observable,
      _this = this;
    this.event_name = event_name;
    model || throwMissing(this, 'model');
    this.event_name || throwMissing(this, 'event_name');
    this.vo = ko.observable();
    observable = kb.utils.wrappedObservable(this, ko.dependentObservable(function() {
      return _this.vo();
    }));
    observable.destroy = _.bind(this.destroy, this);
    kb.utils.wrappedModelWatcher(this, new kb.ModelWatcher(model, this, {
      model: _.bind(this.model, this),
      update: _.bind(this.update, this),
      event_name: this.event_name
    }));
    return observable;
  }

  TriggeredObservable.prototype.destroy = function() {
    return kb.utils.wrappedDestroy(this);
  };

  TriggeredObservable.prototype.model = function(new_model) {
    if ((arguments.length === 0) || (this.m === new_model)) {
      return this.m;
    }
    if ((this.m = new_model)) {
      return this.update();
    }
  };

  TriggeredObservable.prototype.update = function() {
    if (!this.m) {
      return;
    }
    if (this.vo() !== this.m) {
      return this.vo(this.m);
    } else {
      return this.vo.valueHasMutated();
    }
  };

  return TriggeredObservable;

})();

kb.triggeredObservable = function(model, event_name) {
  return new kb.TriggeredObservable(model, event_name);
};
; return kb;});
}).call(this);