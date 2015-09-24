# multitest-widget
Multitest widget

```
<script type="text/javascript" charset="UTF-8">
	/*** CONFIGURATION: EDIT BEFORE PASTING INTO YOUR WEBPAGE ***/
	var code = 'YOUR_CODE'; // required: replace YOUR_CODE with actual code
	var design = '4'; // required: choose from 1 to 6
		        
	/*** DON'T EDIT BELOW THIS LINE ***/
	(function() {
		var mlt_widget = document.createElement('script'); 
		mlt_widget.charset="UTF-8"; 
		mlt_widget.type = 'text/javascript'; 
		mlt_widget.async = true;
		mlt_widget.src = 'http://www.multitest.ua/widget/coverage.js?code=' + code + '&design=' + design;
		mlt_widget.id = 'widget-multitest';
		(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(mlt_widget);  
	})();
</script>
<noscript>Please enable JavaScript to view the 
<a href="http://www.multitest.ua">Multitest.ua widget</a>
</noscript>
<div id="widget-multitest-inner"></div>
```
