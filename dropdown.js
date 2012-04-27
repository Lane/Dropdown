/** 
Dropdown
---------------------------------------------------------------------
Author:         Lane Olson
Sources:        jQuery Plugin Patterns:
                    http://coding.smashingmagazine.com/2011/10/11/essential-jquery-plugin-patterns/
Version:        1.1
Date:           April 27, 2012
Description:    Displays a list of links as a dropdown menu
---------------------------------------------------------------------
**/
;(function ($) {

    // initialize namespace if it doesn't exist
    if (!$.responsive) {
            $.responsive = {};
    };
    
    $.responsive.dropdown = function ( el, options ) {
        // To avoid scope issues, use 'base' instead of 'this'
        // to reference this class from internal events and functions.
        var base = this;

        // Access to jQuery and DOM versions of element
        base.$el = $(el);
        base.el = el;
        
        // Link to show/hide links
        var linkEl, subNav;
        
        // to keep track of plugin state
        var isCreated = false;

        // Add a reverse reference to the DOM object
        base.$el.data( "responsive.dropdown" , base );

        base.init = function () {
        
            base.options = $.extend({}, $.responsive.dropdown.defaultOptions, options);
            
            base.$el.bind("createdropdown", function() {
                base.create();
            });
            
            base.$el.bind("destroydropdown", function() {
                base.destroy();
            });

            base.create();
        };
        
        base.create = function() {
            if(!isCreated)
            {
                // Wrap existing list in another list
                base.$el.find('ul:first').wrap('<ul><li></li></ul>');
                
                // Add the show/hide link
                base.$el.find('ul li:first').prepend(
                    '<a class="toggle-nav" href="#">'+base.options.linkText+'</a>'
                );
                
                // Assign the subnav
                linkEl = $('.toggle-nav', base.el);
                subNav = linkEl.siblings('ul');
                
                // Add the arrow to the link
                linkEl.append('<strong>'+ base.options.htmlArrowMore +'</strong>');
                
                // Hide dropdown if not visible by default
                if(!base.options.showLinksByDefault)
                    subNav.hide();
                
                if(base.options.bindOn == 'hover')
                {
                    linkEl.parent().bind('mouseenter', function(event) {
                        base.showDropdown();
                        return false;
                    });
                    
                    linkEl.parent().bind('mouseleave', function() {
                        base.hideDropdown();
                        return false;
                    });
                }
                if(base.options.bindOn == 'click')
                {
                    // hide dropdown on click outside of menu
                    $('html').click(function() {
                        base.hideDropdown();
                    });
                    
                    linkEl.bind('click', function(event) {
                        // do not propagate event
                        event.stopPropagation();
                        
                        if(subNav.is(':hidden')) {
                            base.showDropdown();
                        } else {
                            base.hideDropdown();
                        }
                        return false;
                    });
                }
                isCreated = true;
            }
        };
        
        base.showDropdown = function() {
            subNav.slideDown('fast');
            $('strong', linkEl).html(base.options.htmlArrowLess);
        };
        
        base.hideDropdown = function() {
            subNav.slideUp('fast');
            $('strong', linkEl).html(base.options.htmlArrowMore);
        };
        
        base.destroy = function() {
            
            if(isCreated) {
                // remove from wrapper
                base.$el.html(subNav);
                
                // remove any inline styling
                $('ul', base.el).removeAttr('style');
                
                // unbind events
                linkEl.parent().unbind('mouseenter mouseleave');
                linkEl.unbind('click');
    
                linkEl = null;
                subNav = null;
                isCreated = false;
            }
        };
        
        base.init();
    };
    
    $.responsive.dropdown.defaultOptions = {
        linkText: 'Navigation', // Wording for collapsed menu
        htmlArrowMore: '&#x25BC;', // html to represent more arrow
        htmlArrowLess: '&#x25B2;', // html to represent less arrow
        bindOn: 'hover',  // what event to trigger the subnav ('click' or 'hover')
        showLinksByDefault: false // display navigation links by default
    };
    
    $.fn.dropdown = function( options ) {
        return this.each(function () {
                (new $.responsive.dropdown(this, options));
        });
    };
    
})( jQuery );