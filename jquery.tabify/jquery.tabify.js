(function($) {
  $.fn.tabify = function() {
    var elements = this.each(function() {
      var bar = $(this).addClass('tab_bar');
      
      var tabs = bar.find('a').each(function() {
        initTab(this);
      }).live('click', function() {
        var bar = $(this).parents('.tab_bar');
        bar.find('li.active').removeClass('active');
        $(this).parent('li').addClass('active');
        
        bar.find('a').each(function() {
          panelFor(this).hide();
        });
        
        panelFor(this).show();
        return false;
      });
      
      $(tabs[0]).click();
    });
    
    function initTab(tab) {
      panelFor(tab).addClass('tab_panel').hide();
    }
    
    function panelFor(tab) {
      return $($(tab).attr('href'));
    }
    
    return $.extend(elements, {
      addTab: function(label, href) {
        var bar = $(this);
        bar.append('<li><a href="' + href + '"><span>' + label + '</span></a></li>');
        bar.find('a:last').each(function() { initTab(this); });
      },
      
      removeTab: function(href) {
        $(href).remove();
        $(this).find('a[href=' + href + ']').parent('li').remove();
      },
      
      selectTab: function(href) {
        $(this).find('a[href=' + href + ']').click();
      }
    });
  }
})(jQuery);