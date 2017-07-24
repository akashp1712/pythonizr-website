$(function(){

	/************
	    CONFIG
	 ************/
	var config = {

		defaultModules:{
			custom: [
			        'no_license'
			        ],
			classic: [
                     'setup_py',
                     'readme_rst',
                     'requirements_txt',
                     'no_license',
                     'manifest_in',
                     'gitignore'
                     ]
		},
		baseUrl:'http://pythonizr.com:80/builder?'
	};
	
	/************
	   VARIABLES
	 ************/
	
	var params;
	var modules = [];
	var stylelang = '';

	/**********
	   EVENTS
	 **********/	

	$('input').click(function(){
		update();
	});

	
	$('#preconfig-custom').click(function(){
		fillDefaultModules('custom');
	});

	$('#preconfig-classic').click(function(){
		fillDefaultModules('classic');
	});

	/*********
	   LOGIC
	 *********/
	
	function fillDefaultModules(type){
		$('input').attr('checked', false);
				
		for (var i = 0, curModule; curModule = config.defaultModules[type][i++];){
			$('input[value=' + curModule +']').attr('checked', true);
		};
		update();
		$('#hidden-section').fadeIn('slow');
	}
	
	function update(){
		updateModules();
		updateUrls();
	}
	
	function updateModules(){
		modules = [];
		$('input').each(function(){
			if ($(this).is(':checked'))
				modules.push($(this).val());
		});
	}

	function updateUrls(){
		var modeParam = '';
		
		if (stylelang != ''){
			modeParam = 'mode=' + stylelang + '&';
		}

		params = '';
		
		for (var i = 0, curModule; curModule = modules[i++];){
			params += curModule + '&';
		}
		
		params = params.substring(0, params.length - 1);

		$('#preview-url').val(config.baseUrl + 'print&' + modeParam + params);
		$('#download-url').val(config.baseUrl + modeParam + params);	
		
		$('#preview-link').attr('href', config.baseUrl + 'print&' + modeParam + params);
		$('#download-link').attr('href', config.baseUrl + modeParam + params);	
	}	

	/***********
	   HELPERS
	 ***********/
	
	if (!Array.indexOf){
		Array.prototype.indexOf = function(searchedElement){
			for (var i = 0; i < this.length; i++){
				if (this[i] === searchedElement)
					return i;
			};
			return -1;
		};
	}
	
	Array.prototype.remove = function(searchedElement){
		var i = this.indexOf(searchedElement);
		if (i != -1)
			this.splice(i, 1);
	};
	
	/***********
	    MAIN
	 ***********/
	
	if ($('input:checked').length > 0)
		$('#hidden-section').fadeIn(0);

	update();
	

});
