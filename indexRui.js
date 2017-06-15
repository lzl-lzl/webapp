Vue.component('draggable-header-view', {
  template: '#header-view-template',
  props: {
    clicktimesvalue: Number
  },
  data: function() {
    return {
      dragging: false,
      // quadratic bezier control point
      c: {
        x: 180,
        y: 60
      },
      // record drag start point
      start: {
        x: 0,
        y: 0
      }
    }
  },
  computed: {
    headerPath: function() {
      return 'M0,0 ' + 'Q' + this.c.x + ',' + this.c.y + ' 320,0' + 'L320,0 320,30' +
        'Q' + this.c.x + ',' + this.c.y +
        ' 0,30'
    },
    contentPosition: function() {
      var dy = this.c.y /*- 60*/
      var dampen = dy > 0 ? .5 : 1
      return {
        transform: 'translate3d(0,' + dy * dampen + 'px,0)'
      }
    }
  },

  watch: {
    clicktimesvalue: function(oldValue, newValue) {
      switch (oldValue / 5) {
        case 2:
          $('.hidden').hide(1000);
          $('.hidden').eq(0).show(1200);
          $('#ganki').html("元气补充中").delay(1000);
          break;
        case 4:
          $('.hidden').hide();
          $('.hidden').eq(1).show(1200);
          break;
        case 6:
          $('.hidden').hide();
          $('.hidden').eq(2).show('normal');
          break;
        case 8:
          $('.hidden').hide();
          $('.hidden').eq(3).show('normal');
          break;
        case 10:
          $('.hidden').hide();
          $('.hidden').eq(4).show('normal');
          break;
        case 12:
          $('#heartstring').hide();
          $('.hidden').hide();
          $('#ganki').html("元气补充完毕").delay(2000).hide(1000);
          $('progress').delay(2000).hide(1000);
          $('.hiddenToruirui').delay(2600).show(1200);
          $('section.Memento').delay(3000).show(1200);
          // $('.draggable-header-view').addClass('rotateY');
          // $('#rinbon').css('top', '22px');
          break;
        default:
          // statements_def
          break;
      }
      var rgbValueA = parseInt(oldValue) + 180;
      $('.heart').children('path').attr('style', 'fill:rgb(' + rgbValueA + ',0,0)')
      $('.heart').children('path').eq(1).attr('style', 'fill:rgb(' + rgbValueA + ',0,0);transform: translateX(-3px)')
    }
  },



  /*add lzl */
  methods: {
    startDrag: function(e) {
      // debugger;
      e.preventDefault()
      if (this.clicktimesvalue >= 60) {
        this.clicktimesvalue = 60
      }
      if (e.target.className == "draggable-header-view" && this.clicktimesvalue >= 60) {
        $('#app').addClass('rotateY').delay(1000).hide('normal');
      }
      this.clicktimesvalue = this.clicktimesvalue + 5;
      $('.heart').css('transform', 'scale(.4)');
      e = e.changedTouches ? e.changedTouches[0] : e
      this.dragging = true
      this.start.x = e.pageX
      this.start.y = e.pageY
    },
    onDrag: function(e) {
      e = e.changedTouches ? e.changedTouches[0] : e
      if (this.dragging) {
        this.c.x = 60 + (e.pageX - this.start.x)
          // dampen vertical drag by a factor
        var dy = e.pageY - this.start.y
        var dampen = dy > 0 ? 1.5 : 4
        this.c.y = 60 + dy / dampen
      }
    },
    stopDrag: function() {
      if (this.dragging) {
        this.dragging = false
        dynamics.animate(this.c, {
          x: 180,
          y: 60
        }, {
          type: dynamics.spring,
          duration: 700,
          friction: 280
        })
      }
      // console.log(this.cicletimes)
      $('.heart').css('transform', 'scale(.6)');
    }
  }
})

new Vue({
  el: '#app',
  data: {
    clicktimes: 0
  }
})