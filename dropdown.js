/** 
Responsive Dropdown
---------------------------------------------------------------------
Author: 		Lane Olson
Sources: 		jQuery Plugin Patterns:
					http://coding.smashingmagazine.com/2011/10/11/essential-jquery-plugin-patterns/
Version:		1.0
Date: 			April 24, 2012
Description:	Shows a list of links on large resolutions, displays as
				a dropdown list of links on small resolutions.
Requires:		responder (to trigger code on breakpoints):
					https://github.com/Lane/Responder
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

		// Add a reverse reference to the DOM object
		base.$el.data( "responsive.dropdown" , base );

		base.init = function () {
		
			base.options = $.extend({}, $.responsive.dropdown.defaultOptions, options);

			base.$el.find('ul:first').wrap('<ul><li></li></ul>');
			base.$el.find('ul li:first').prepend('<a href="#">'+base.options.linkText+'</a>');
			
			// Link to show/hide links
			var linkEl = base.$el.find("ul li a:first");
			var subNav = linkEl.siblings('ul');
			
			if(!base.options.showLinksByDefault)
				subNav.hide();
			
			// Add the arrow to the link
			linkEl.append('<strong>'+ base.options.htmlArrowMore +'</strong>');
		
			// Click event for show/hide navigation link
			linkEl.click(function() {
				
				if(subNav.is(":hidden")) {
				
					subNav.css('width',
						base.$el.find('ul:first').outerWidth()-(parseInt(subNav.css('border-left-width'),10)+parseInt(subNav.css('border-right-width'),10))
					).slideDown('fast').show();
					
					$('strong', linkEl).html(base.options.htmlArrowLess);
					
					subNav.parent().hover(function() { }, function() {  
						if(!linkEl.is(":hidden")) {
							// When the mouse hovers out of the subnav, move it back up 
							subNav.slideUp('fast', function() { $(this).css("width", "auto"); }); 
							$('strong', linkEl).html(base.options.htmlArrowMore);
						}
					});
					
				} else {
				
					subNav.slideUp('fast', function() { $(this).css("width", "auto"); });
					$('strong', linkEl).html(base.options.htmlArrowMore);
					
				}
				
				return false;
			});
		};
		
		base.init();
	}
	
	$.responsive.dropdown.defaultOptions = {
		linkText: 'Navigation',
		htmlArrowMore: '&#x25BC;', // html to represent more arrow
		htmlArrowLess: '&#x25B2;', // html to represent less arrow
		showLinksByDefault: false
	};
	
	$.fn.dropdown = function( options ) {
		return this.each(function () {
				(new $.responsive.dropdown(this, options));
		});
	};
	
})( jQuery );