/**
 *
 * @authors tianyanrong
 * @date    2014-11-14
 * @constructor GoodsTaxi.Base
 * @description 基础类,封装了一个常用方法,开发模块时继承此类
 * @param extend: 继承
 * @param initialize: 初始时运行的函数,继承类在实例化时，得到参数的入口
 * @param $el: 当前DOM的作用范围
 * @param events: 事件委托对像{'click selector': 'fn'}
 * @param each: 遍历数组或对像
 * @param bind: 给此类绑定事件
 * @param trigger: 确发此类中已绑定的事件
 * @param getUrlParam: 获取URL中的参数值
 * @param extend: 合并对像或数组
 * @version
 */
;
(function($) {
  window.transfar = window.transfar || {};
  transfar.Base = function(options) {
    options = options || {};
    this.bindEvents = {};
    this.options = options;
    this.templateUrl = options.templateUrl || this.templateUrl;
    this.ifAjaxNotDecode = options.ifAjaxNotDecode || "";
    //绑定：获取DOM作用范围后触发的事件
    var _this = this;
    this.bind('success-element-template', function() {
      _this.initialize(options);
      _this.delegateEvents(_this.events);
    });

    //获取DOM作用范围
    if (this.templateUrl) {
      this.getTemplateContent(this.templateUrl);
    } else {
      this.$el = options.$el || $('<div></div>');
      this.trigger('success-element-template');
    }
  };
  transfar.Base.prototype = {
    initialize: function(options) {

    },

    events: {
      //'click selector': 'fn'
    },

    getTemplateContent: function(url) {
      var _this = this;
      if (this.ifAjaxNotDecode === "notDecode") {
        url = url + ";notDecode";
      }
      $.ajax({
        url: url,
        success: function(data) {
          _this.$el = $(data);
          console.log(_this.$el);
          _this.trigger('success-element-template');
        }
      });
    },

    delegate: function(selector, event, fn) {
      var _this = this;
      this.$el.delegate(selector, event, function(event) {
        fn.call(_this, event);
      });
    },

    delegateEvents: function(events) {
      var key, keys, _this = this;
      for (key in events) {
        key = key.replace(/(^\s+)|(\s+$)/g, "");
        if (_this[events[key]] && 'function' === typeof _this[events[key]]) {
          keys = key.split(/\s+/);
          this.delegate(keys[1], keys[0], _this[events[key]]);
        }
      }
    },

    bind: function(name, fn) {
      this.bindEvents[name] = this.bindEvents[name] || [];
      this.bindEvents[name].push(fn);
    },

    trigger: function(name, data) {
      if (this.bindEvents[name]) {
        this.each(this.bindEvents[name], function(index, item) {
          this.bindEvents[name][index](data);
        });
      }
    },

    unbind: function(name) {
      if (this.bindEvents[name]) {
        delete this.bindEvents[name];
      }
    },

    getUrlParam: function(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      if (r !== null) return r[2];
      return null;
    },

    each: function(items, fn) {
      if (!items) {
        return;
      }
      var i, k;
      for (i = 0, k = items.length; i < k; i++) {
        fn.call(this, i, items[i]);
      }
    },

    //把JSON数据转为字符串
    stringify: function(data) {
      return $.toJSON(data);
    },

    //阻止冒泡
    stopPropagation: function(e) {
      e = e || window.event;
      if (e && e.stopPropagation) {
        e.stopPropagation();
      } else {
        e.cancelBubble = true;
      }
    },

    //合并对像或数组
    extend: function() {
      var key;
      var options = arguments;
      var isArraw = false;
      var newArraw = [];
      this.each(arguments, function(index, item) {
        if (index > 0) {
          if (isArraw && typeof(item) === 'object' && item.length) {
            newArraw = options[index - 1].concat(item);
          } else if (!isArraw) {
            for (key in item) {
              options[0][key] = item[key];
            }
          }
        } else if (index === 0) {
          if (typeof(item) === 'object' && (item.length || item.length === 0)) {
            isArraw = true;
            newArraw = options[0];
          }
        }
      });
      return isArraw ? newArraw : arguments[0];
    }
  };

  //定义类的extend方法，用于继承类
  var ctor = function() {};

  var inherits = function(parent, protoProps, staticProps) {
    var child, key, parentInitialize, childInitialize;

    if (protoProps && protoProps.hasOwnProperty('constructor')) {
      child = protoProps.constructor;
    } else {
      child = function() {
        return parent.apply(this, arguments);
      };
    }

    //_.extend(child, parent);

    for (key in parent) {
      child[key] = parent[key];
    }

    ctor.prototype = parent.prototype;
    child.prototype = new ctor();

    if (protoProps) {
      for (key in protoProps) {
        child.prototype[key] = protoProps[key];
      }
    }

    if (staticProps) {
      for (key in staticProps) {
        child.prototype[key] = staticProps[key];
      }
    }

    child.prototype.constructor = child;
    child.__super__ = parent.prototype;

    //重置initialize方法
    parentInitialize = parent.prototype.initialize;
    childInitialize = child.prototype.initialize;
    child.prototype.initialize = function(options) {
      parentInitialize.call(this, options);
      childInitialize.call(this, options);
    };

    return child;
  };
  var extend = function(protoProps, staticProps) {
    var child = inherits(this, protoProps, staticProps);
    return child;
  };

  transfar.Base.extend = extend;

})(window.jQuery || window.Zepto);
