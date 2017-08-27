$(function(){

	/************
	    CONFIG
	 ************/
	var config = {

		defaultModules:{
			custom: [
			        'no_license',
			        'main_py'
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
	var preModules = {
	    'main_py': 'main.py', 'setup_py': setup_py, 'readme_rst': 'README.rst',
        'requirements_txt': 'requirements.txt', 'manifest_in': 'MANIFEST.in',
        'gitignore': '.gitignore', 'config_handler': config_handler,
        'argparse': 'argparse_helper.py',
        'mit_license': 'LICENSE.txt', 'apache_license': 'LICENSE.txt',
        'gnu_license': 'LICENSE.txt', 'empty_license': 'LICENSE.txt'
        }

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
		updateTree();
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

	function updateTree(){

        var ul=document.createElement('ul');
        for (var i = 0, curModule; curModule = modules[i++];){

            if (typeof preModules[curModule] === 'function') {
                ul.innerHTML = ul.innerHTML + preModules[curModule]();
            } else {
                if (curModule in preModules) {
                    var li=document.createElement('li');
                    ul.appendChild(li);
                    li.innerHTML=li.innerHTML + preModules[curModule];
               }
            }
        }

        var parentLI=document.createElement('li');
        parentLI.innerHTML=parentLI.innerHTML + 'sample.zip'; // root folder
        parentLI.appendChild(ul);

        var parentUL=document.createElement('ul');
        parentUL.className = "tree";
        parentUL.appendChild(parentLI);

        var x = document.getElementsByClassName("tree-block");
        x[0].innerHTML = '';
        x[0].appendChild(parentUL);

	}

    /**************************
        HELPERS FOR TREE-VIEW
    **************************/

    function setup_py() {
        var setupModules = {'sample': ['__init__.py','main.py'], 'test': ['test_basic.py']};

        var ulTemp = document.createElement('ul');
        var liSetupFile=document.createElement('li');
        liSetupFile.innerHTML='setup.py';
        ulTemp.appendChild(liSetupFile);
        generateChildTree(ulTemp, setupModules);

        return ulTemp.innerHTML;
    }

    function config_handler() {

        var setupModules = {'config': ['__init__.py','cfg.ini', 'cfg_handler.py']};
        var ulTemp = document.createElement('ul');
        generateChildTree(ulTemp, setupModules);
        return ulTemp.innerHTML;
    }

    function generateChildTree(ulTemp, setupModules) {

        for (var key in setupModules) {

           var liFolder = document.createElement('li');
           liFolder.innerHTML = key; // root folder

           var ulInside = document.createElement('ul');
           ulInside.className = 'tree';

           childList = setupModules[key];
           for (var i = 0, childValue; childValue = childList[i++];){
			    var liChild = document.createElement('li');
			    ulInside.appendChild(liChild);
			    liChild.innerHTML = childValue;
		    }

            liFolder.appendChild(ulInside);
            ulTemp.appendChild(liFolder);
        }
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
