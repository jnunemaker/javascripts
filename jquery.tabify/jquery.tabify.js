// Requires jQuery 1.3 as it uses live events
// Version 0.1
(function($) {
  $.fn.tabify = function() {
    var elements = this.each(function() {
      var bar = $(this).addClass('tab_bar');
      
      var tabs = bar.find('li a:first').each(function() {
        initTab(this);
      }).live('click', function() {
        var tab = $(this);
        var bar = tab.parents('.tab_bar');
        
        bar.find('li.active').removeClass('active');
        tab.parent('li').addClass('active');
        
        bar.find('li a:first').each(function() { panelFor(this).hide(); });
        panelFor(this).show();
        
        return false;
      });
      
      var default_tab = $(tabs[0]);
      default_tab.click();
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