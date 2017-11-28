/**
 *
 * @authors tianyanrong
 * @date    2015-08-06
 * @param $el 分页组件显示在此DOM下
 * @param maxPage {Num} 最大页码
 * @param currPage {Num} 当前页码
 * @param isSimplePagination {Boolean} 是否为简单的分页（只显示上一页，下一页），默认为false
 * @param isHasFastPageTurning {Boolean} 是否有快速跳转功能，默认为true
 * @param isKeepShow {Boolean} 只有一页时，是否依然显示分页，默认为true
 * @version
 */

(function($) {
  var Pagination = transfar.Base.extend({
    initialize: function(options) {

      this.$el = options.$el
      this.maxPage = parseInt(options.maxPage, 10) || 0
      this.currPage = parseInt(options.currPage, 10) || 1
      this.isSimplePagination = options.isSimplePagination || false
      this.isHasFastPageTurning = options.isHasFastPageTurning !== false && !this.isSimplePagination ? true : false
      this.isKeepShow = options.isKeepShow !== false ? true : false
      this.count = options.count || 5

      var template = this.getTemplate()
      this.$el.html(template)
      this.$first = this.$el.find('.tx_gotoFirst')
      this.$last = this.$el.find('.tx_gotoLast')
      this.$pre = this.$el.find('.tx_gotoPre')
      this.$next = this.$el.find('.tx_gotoNext')
      this.$input = this.$el.find('input')

      if (!this.isHasFastPageTurning) {
        this.$el.find('.tx_fastPageTurning').css({
          display: 'none'
        })
      }

      if (this.isSimplePagination) {
        this.$el.children().addClass('simplePagination')
        this.$el.find('li').addClass('hidden')
        this.$pre.removeClass('hidden')
        this.$next.removeClass('hidden')
      }

      this.render()

      var _this = this
      this.bind('set-page', function(ops) {
        _this.maxPage = parseInt(ops.maxPage, 10) || 0
        _this.currPage = parseInt(ops.currPage, 10) || 1
        _this.render()
      })



    },

    /**
     * @description 绑定DOM事件
     */
    events: {
      'click .tx_gotoFirst': 'goToFirst',
      'click .tx_gotoLast': 'goToLast',
      'click .tx_gotoPage': 'goToPage',
      'click .tx_gotoPre': 'goToPre',
      'click .tx_gotoNext': 'goToNext',
      'click .tx_numberSubmit': 'triggerNumberSubmit'
    },

    /**
     * @description 获取模板HTML代码
     */
    getTemplate: function() {
      var i, li = ''
      for (i = 0; i < this.count; i++) {
        li += '<li style="display:none;"><a href="javascript:void(0)" class="tx_gotoPage"></a></li>'
      }
      return '<div class="pagination">\
              <ul>\
              	<li class="arrow tx_gotoFirst"><a href="javascript:void(0)"><span>首页</span></a></li>\
                <li class="arrow tx_gotoPre"><a href="javascript:void(0)"><span>上一页</span></a></li>' +
        li +
        '<li class="arrow tx_gotoNext"><a href="javascript:void(0)"><span>下一页</span></a></li>\
                <li class="arrow tx_gotoLast"><a href="javascript:void(0)"><span>尾页</span></a></li>\
              </ul>\
              <div class="fastPageTurning tx_fastPageTurning">\
              	跳到<input type="number">页 \
              	<a class="numberSubmit tx_numberSubmit" href="javascript:void(0)">确定</a>\
              </div>\
              </div>'
    },

    pushData: function(centerPage, count) {
      var i, data = []
      for (i = 0; i < count; i++) {
        data.push(centerPage - parseInt(count / 2, 10) + i)
      }
      return data
    },

    /**
     * @description 获得渲染模板的数据
     * @return {Object} {pages:[1,2,3,4,5], ...}
     */
    getData: function(currPage, count, maxPage) {
      var data = {}
      var parseCount = parseInt(count / 2)
      if (maxPage < count) {
        data.pages = this.pushData(parseInt(maxPage / 2, 10) + 1, maxPage)
      } else if (currPage <= parseCount && maxPage > currPage + parseCount) {
        data.pages = this.pushData(count % 2 === 0 ? parseCount : parseCount + 1, count)
      } else if (maxPage <= currPage + parseCount) {
        data.pages = this.pushData(maxPage - parseCount, count)
      } else {
        data.pages = this.pushData(currPage, count)
      }
      return data
    },

    /**
     * @description 渲染模板
     */
    render: function() {
      this.$el.find('li').removeClass('active')
      var data = this.getData(this.currPage, this.count, this.maxPage)
      var index = 0

      this.$el.find('.tx_gotoPage').each(function() {
        if (data.pages[index]) {
          $(this).text(data.pages[index]).attr('page-value', data.pages[index])
          $(this).parent().css({
            display: ''
          })
        } else {
          $(this).parent().css({
            display: 'none'
          })
        }
        index++
      })

      this.$el.find('[page-value="' + this.currPage + '"]').parent().addClass('active')
      this.$pre.removeClass('disabled')
      this.$next.removeClass('disabled')
      this.$first.removeClass('disabled')
      this.$last.removeClass('disabled')

      if (this.currPage === 1) {
        this.$pre.addClass('disabled')
        this.$first.addClass('disabled')
      }
      if (this.currPage === this.maxPage) {
        this.$next.addClass('disabled')
        this.$last.addClass('disabled')
      }

      this.$input.attr('value', this.maxPage).attr('max', this.maxPage).attr('min', 1)

      if ((this.maxPage === 1 && !this.isKeepShow) || !this.maxPage) {
        this.$el.css('display', 'none')
      } else {
        this.$el.css('display', '')
      }

    },

    /**
     * @description 触发点击“上一页”事件
     */
    goToPre: function() {
      var page = this.currPage - 1
      if (page < 1) {
        return
      }
      this.goToPage(null, page)
    },

    /**
     * @description 触发点击“下一页”事件
     */
    goToNext: function() {
      var page = this.currPage + 1
      if (page > this.maxPage) {
        return
      }
      this.goToPage(null, page)
    },

    goToFirst: function() {
      this.goToPage(null, 1)
    },

    goToLast: function() {
      this.goToPage(null, this.maxPage)
    },

    /**
     * @description 触发点击“确认”事件
     */
    triggerNumberSubmit: function() {
      var value = this.$input.val()
      if (value < 1 || value > this.maxPage) {
        this.$input.focus().select()
        return
      }
      this.goToPage(null, value)
    },

    /**
     * @description 分面跳转
     * @param page {Num} 跳转的页码
     */
    goToPage: function(event, page) {
      page = parseInt(page, 10) || parseInt($(event.currentTarget).text(), 10)
      this.trigger('go-to-page', page)
      this.currPage = page
      this.render()
    }
  })

  var paginations = {}
  $.fn.pagination = function(options) {
    $(this).each(function() {
      var newOptions = {},
        key
      for (key in options) {
        newOptions[key] = options[key]
      }
      newOptions.$el = $(this)

      if (!paginations[this.id]) {
        paginations[this.id] = new Pagination(newOptions)
      }
      paginations[this.id].unbind('go-to-page')
      paginations[this.id].bind('go-to-page', function(page) {
        if (options.callback && 'function' === typeof options.callback) {
          options.callback(page)
        }
      })
      paginations[this.id].trigger('set-page', newOptions)
    })
  }
})(jQuery)
