
(function($) {

    $.fn.popscroll = function(options) {

		var opts = $.extend({
		            theme         : 'simple',
		            msg           : 'Your custom Text',
		            network       : 'facebook',
		            position      : 'br',
		            animation  	  : '',
		            triggerpoint  : 100,
		            channel 	  : 'https://www.facebook.com/mybloggerlab',
		            bgcolor   	  : '#ffffff',
		            textcolor     : '#303030',
		            scrollback	  : false,
		            closecookie   : false,
		            cookiedays    : 10,
		            fb_hide_cover : true,
		            fb_show_posts : false,
		        }, options);




		var MBL_hide_cookie=false;
  		if(opts.closecookie){
	  		var MBL_ps_cookie=MBL_get_cookie("MBL_popscroll")
	  		
	  		if(MBL_ps_cookie=="false"){
	  			MBL_hide_cookie=true;
	  		}
  		}

  		if(!MBL_hide_cookie){

			var MBL_is_mobile = false;
			if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
			    MBL_is_mobile = true;
			}

			var MBL_oldie=false;

			if (!MBL_supports_transitions()) {
				MBL_oldie = true;
			}

			var MBL_asp=new Array;
				MBL_asp['bl']=new Array;
				MBL_asp['bl']['ls']="30px";
				MBL_asp['bl']['rs']="auto";
				MBL_asp['bl']['bs']="-500px";
				MBL_asp['bl']['le']="30px";
				MBL_asp['bl']['re']="auto";
				MBL_asp['bl']['be']="-10px";

				MBL_asp['bls']=new Array;
				MBL_asp['bls']['cs']=true;
				MBL_asp['bls']['ls']="30px";
				MBL_asp['bls']['rs']="auto";
				MBL_asp['bls']['bs']="-2px";

				MBL_asp['br']=new Array;
				MBL_asp['br']['rs']="30px";
				MBL_asp['br']['ls']="auto";
				MBL_asp['br']['bs']="-500px";
				MBL_asp['br']['le']="auto";
				MBL_asp['br']['re']="30px";
				MBL_asp['br']['be']="-10px";

				MBL_asp['brs']=new Array;
				MBL_asp['brs']['cs']=true;
				MBL_asp['brs']['rs']="30px";
				MBL_asp['brs']['ls']="auto";
				MBL_asp['brs']['bs']="-2px";

				MBL_asp['sl']=new Array;
				MBL_asp['sl']['ls']="-400px";
				MBL_asp['sl']['rs']="auto";
				MBL_asp['sl']['bs']="40px";
				MBL_asp['sl']['le']="-2px";
				MBL_asp['sl']['rs']="auto";
				MBL_asp['sl']['bs']="40px";

				MBL_asp['sls']=new Array;
				MBL_asp['sls']['cs']=true;
				MBL_asp['sls']['ls']="-2px";
				MBL_asp['sls']['rs']="auto";
				MBL_asp['sls']['bs']="40px";

				MBL_asp['sr']=new Array;
				MBL_asp['sr']['ls']="auto";
				MBL_asp['sr']['rs']="-400px";
				MBL_asp['sr']['bs']="40px";
				MBL_asp['sr']['le']="auto";
				MBL_asp['sr']['re']="-2px";
				MBL_asp['sr']['bs']="40px";

				MBL_asp['srs']=new Array;
				MBL_asp['srs']['cs']=true;
				MBL_asp['srs']['ls']="auto";
				MBL_asp['srs']['rs']="-2px";
				MBL_asp['srs']['bs']="40px";


			var MBL_fps_ac_simple=false;
			var MBL_slider_active=new Array;


			var close_img="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAADRUlEQVR4Xu2aOa4UMRCGvycIEBCwhCwCLsAqyIAABHeAe4BACIn9HsAlWAQiY3lcgTWHhCUAgf7RtDQaerrLdpX7PaY7nW67/s+/y2O7VljyZ2XJ9TMCGB2w5ATGKbDkBvjvkqAc/SdlUK1TYDNwFbgI7AI+AfeBO8DPlA4D3t0KXAMuTGP7DDwEbgLf+vqzAJD4Z8DxlsZeAueBr30dBf2+E3gCHGpp/y1wsg+CBcBt4EqHgDfA2QEgSPxT4GBHbHd7YjflgA/A3p4RrA3BIl4hK/Z9XbFbHPAL2GCwcC0IVvEK+TewsRTAuz6KMx1EQ0gRr7AU+4FSADemWdZggskrq8CZgJzQlfAWxabYr5cC2AQ8B05YCQRAyBH/CjgN/CgFoO+3TZebowNAyBFvnoqWJNhozoWgJfJLArjZV3dMl7q2dX5Rk2bxaiAFQIkTciCEi88BUAtCFfG5APTdduAxkJoTLE6oJr4EQC4E/T/XErkoJ1QVXwrAG4LEa2NzOCFhJiW8tnZTk2BbG5oOCvxIQuDzThhEvIcDGs0lEDQI1Ue+CdzDAaUQFENV28861RNAkxNSp0PCzKF4zs935g0gEoK7eM8cMA82J6l1OSFEfCQAte0FIUx8NAAPCKHiawAogRAufgSQsR1OWbJKRr/pJ9wFEctgE/xSJ0Ev8eFOiHCAt/hQCN4AosQ3ENyP3D0B5IhXktNzLCG7ukLwApArXkdkerSBSj1ec7l88QBQIr65Vh/iyH1CvhSAh/jG/YNAKAHgKX4wCLkAIsQ3ECKP3P/JtTkAIsWXQOg7cm9daFIB1BBfFUIKgJriZyGknjEmOcEKYAjxVSBYAGwBXiRefHhvY3PuHfSP8ZRHmdw94FLCX1Vv8SVOUCGnCjwXPhYHqCp0txFAlPhcCC5lctba22jxOQctLmVyH4E9PQ6oJT4Vwntgf+kUULnp5Y5GaotPgXCrr8TPkgO0CqhMrm3PrlK0cwE1gcaUM7l8ebRgK/16Wib3vdQB+l4QVDCtknQlRE0Llctrheisw7MqKXhP1exNbJqqStoPADm3U7zHdrgg7rXxqWUKrI1Ig6IYAQSBXTfNjg5YN0MVFOjogCCw66bZv1sI8UFM29qyAAAAAElFTkSuQmCC";
			

		
			if(opts.network=='facebook'){
				$('<div/>', {
				    'id':'fb-root'
				}).appendTo(this);

				(function(d, s, id) {
	  				var js, fjs = d.getElementsByTagName(s)[0];
					if (d.getElementById(id)) return;
					js = d.createElement(s); js.id = id;
					js.src = "//connect.facebook.net/en_EN/sdk.js#xfbml=1&version=v2.5";
					fjs.parentNode.insertBefore(js, fjs);
				}(document, 'script', 'facebook-jssdk'));

				var channelsetup=$('<div/>', {
				    'class':'fb-page',
				    'data-href':opts.channel,
				    'data-width':"280",
				    'data-small-header':"true",
				    'data-adapt-container-width':'ture',
				    'data-hide-cover':opts.fb_hide_cover,
				    'data-show-posts':opts.fb_show_posts
				});

			}



			if(opts.theme=='simple'){
				var custompart=$('<div/>', {
				    'id':'MBL_fanpageslider_box',
				    'class':'MBL_fanpageslider_boxref MBL_ani_handel_simple',
				    'style': 'border-radius:5px',
				}).appendTo(this);

				$('<div/>', {
					'id':'MBL_fanpageslider_box_head'
				}).appendTo("#MBL_fanpageslider_box");

				$('<img/>', {
				    'class':'MBL_fps_close MBL_fps_close_btn',
				    'src':close_img
				}).on('click', function(){
	    			MBL_close_slider('MBL_ani_handel_simple');
				}).appendTo("#MBL_fanpageslider_box_head");

				$('<div/>', {
					'id':'MBL_fanpageslider_box_mid'
				}).appendTo("#MBL_fanpageslider_box");

				$('<div/>', {
				    'class':'MBL_fanpageslider_customtext',
				    'text': opts.msg 
				}).appendTo($("#MBL_fanpageslider_box_mid"));

				$("#MBL_fanpageslider_box_mid").append(channelsetup);

			}



	  		custompart.css("background", opts.bgcolor);
	  		custompart.css("color", opts.textcolor);

			jQuery(window).scroll(function() {  
				if(!MBL_is_mobile){
				  if(jQuery(window).scrollTop() + jQuery(window).height() > jQuery(document).height() - opts.triggerpoint) {
				       MBL_show_slider("MBL_ani_handel_"+opts.theme, opts.position+opts.animation);
				   }
				  
				   if (opts.scrollback && MBL_slider_active["MBL_ani_handel_"+opts.theme]){
					  if(jQuery(window).scrollTop() + jQuery(window).height() < jQuery(document).height() - opts.triggerpoint) {
					       MBL_hide_slider("MBL_ani_handel_"+opts.theme, opts.position+opts.animation);
					   }
					}


				}
			});

			
		}

		function MBL_show_slider(target,ani){
			if(MBL_oldie){ 
				ani=ani.substring(0,2);
			}

			if(!MBL_slider_active[target]){
				MBL_slider_active[target]=true;
				MBL_slider_active[target]=new Array;
				MBL_slider_active[target]['ani']=ani;
				MBL_postion_slider(target,ani);

				jQuery("."+target ).addClass("MBL_ani_"+ani);

				if(MBL_asp[ani]["cs"]){
					jQuery( "."+target ).addClass("MBL_cs_start_"+ani);
					setTimeout(function(){jQuery( "."+target ).addClass("MBL_cs_trans_"+ani); }, 10);
					setTimeout(function(){jQuery( "."+target ).addClass("MBL_cs_end_"+ani); }, 10);
				}else {
					jQuery( "."+target ).animate({
						left: MBL_asp[ani]["le"],
						right: MBL_asp[ani]["re"],
						bottom: MBL_asp[ani]["be"]
					}, 700 );
				}
			}
		}

		function MBL_close_slider(target){
			var ani =MBL_slider_active[target]['ani'];
			if(MBL_asp[ani]["cs"]){
				jQuery( "."+target ).removeClass("MBL_cs_end_"+ani);
			}else{
				jQuery( "."+target ).animate({
					left: MBL_asp[ani]["ls"],
					right: MBL_asp[ani]["rs"],
					bottom: MBL_asp[ani]["bs"]
				}, 700 );	
			}
			MBL_slider_active[target]=true;

			if(opts.closecookie){
				MBL_set_cookie("MBL_popscroll", "false", opts.cookiedays);
			}
		}

		function MBL_hide_slider(target){
			if(typeof MBL_slider_active[target]['ani'] != 'undefined' && MBL_slider_active[target]){
				var ani =MBL_slider_active[target]['ani'];
				if(MBL_asp[ani]["cs"]){
					jQuery( "."+target ).removeClass("MBL_cs_end_"+ani);
				}else{
					jQuery( "."+target ).animate({
						left: MBL_asp[ani]["ls"],
						right: MBL_asp[ani]["rs"],
						bottom: MBL_asp[ani]["bs"]
					}, 700 );	
				}

				MBL_slider_active[target]=false;
			}
		}

		function MBL_postion_slider(target,ani){
			jQuery( "."+target ).css("left", MBL_asp[ani]["ls"]);
			jQuery( "."+target ).css("right", MBL_asp[ani]["rs"]);	
			jQuery( "."+target ).css("bottom", MBL_asp[ani]["bs"]);	
		}     


		function MBL_set_cookie(cname, cvalue, exdays) {
		    var d = new Date();
		    d.setTime(d.getTime() + (exdays*24*60*60*1000));
		    var expires = "expires="+d.toUTCString();
		    document.cookie = cname + "=" + cvalue + "; " + expires;
		}

		function MBL_get_cookie(cname) {
		    var name = cname + "=";
		    var ca = document.cookie.split(';');
		    for(var i=0; i<ca.length; i++) {
		        var c = ca[i];
		        while (c.charAt(0)==' ') c = c.substring(1);
		        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
		    }
		    return "";
		}		

		function MBL_supports_transitions() {
		    var b = document.body || document.documentElement,
		        s = b.style,
		        p = 'transition';

		    if (typeof s[p] == 'string') { return true; }

		    var v = ['Moz', 'webkit', 'Webkit', 'Khtml', 'O', 'ms'];
		    p = p.charAt(0).toUpperCase() + p.substr(1);

		    for (var i=0; i<v.length; i++) {
		        if (typeof s[v[i] + p] == 'string') { return true; }
		    }

		    return false;
		}

		

    }


}(jQuery));
