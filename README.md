Dropdown
========

jQuery plugin that turns an ordinary list of links into a drop down menu.

## Usage ##

### HTML ###
    <nav>
    	<ul>
    		<li><a href="#">Link One</a></li>
    		<li><a href="#">Link Two</a></li>
    		<li><a href="#">Link Three</a></li>
    		<li><a href="#">Link Four</a></li>
    		<li><a href="#">Link Five</a></li>
    	</ul>
    </nav>
  
### CSS ###

This is just the css used in the demo, feel free to use your own.

    nav { border: 2px solid #000; margin: 0px 20px;}
    nav ul { padding: 0; margin: 0; list-style: none; }
    nav ul li a { display: block; padding: 10px; background: #fff; color: #000; text-decoration: none; }
    nav ul li a:hover { background: #000; color: #fff; }
    nav ul li a strong { float: right; font-size: 8px; margin-top: 5px; }

### Javascript ###

Include the jQuery library and dropdown plugin before the closing body tag.  Also add this script right before the body tag:

    <script type="text/javascript">
      $(document).ready(function()
      {
      	$('nav').dropdown();
      });
    </script>