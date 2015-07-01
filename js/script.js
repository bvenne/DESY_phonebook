$(document).ready(function() {
	
	if (localStorage.desyphone_username) {
		$("#loginPage").hide();
		$("#container").show();
	}
	if (localStorage.login_msg) {
		$("#login_hint").html(localStorage.login_msg);
	}

    var minlength = 2;

    $("#search-field").keyup(function () {
        var that = this,
        value = $(this).val();
        if (value.length == 1 ) { $("#hint" ).slideUp(); }

        if (value.length >= minlength ) {
            $.ajax({
                type: "GET",
                url: "https://pbookapp.desy.de/phonebook",
                data: {
                    'search_keyword' : value,
                    'username' : localStorage.desyphone_username,
                    'hash' : localStorage.desyphone_hash
                },
                dataType: "text",
                success: function(msg){
                    //check for invalid hash
                    var jsonmsg = jQuery.parseJSON( msg );
                    if (jsonmsg.status == 'invalid') {
						localStorage.removeItem('desyphone_username');
						localStorage.removeItem('desyphone_hash');
						localStorage.setItem('login_msg', '<span style="color:red;">Token Expired: Your token is invalid or has expired. Please login again.</span>');
						location.reload();
					}
                    
                    //we need to check if the value is the same
                    if (value==$(that).val()) {
                        var json = jQuery.parseJSON( msg );
                        
                        
                        
                        var addrBook = json.addressBook;
                        $("#search-results").empty();

                        $.each(addrBook, function (i, obj) {
							// Keine funktionalen Accounts
							if (obj.description=="primary") {
								$("#search-results").append('<div class="contact"><span class="contact-name">' + obj.cn + '</span><a href="tel:+49408998' + obj.telephoneNumber + '"><div class="contact-phone fa fa-phone-square fa-lg" title="-' + obj.telephoneNumber + '"></div></a><a href="mailto:' + obj.mail + '"><div class="contact-email fa fa-envelope fa-lg" title="' + obj.mail + '"></div></a><div class="contact-info fa fa-info-circle fa-lg" title="Details"></div><div class="contact-details">Tel: +49 40 8998 ' + obj.telephoneNumber + '<br />Group: ' + obj.ou + '<br />Location: ' + obj.physicalDeliveryOfficeName + '<br /></div></div>');
							}
											
						}); // end each


						// Toggle function for contact details
						$('.contact-info, .contact-name').click(function() {
							$(this).toggleClass("active");
							$(this).nextAll('.contact-details').slideToggle( "slow" );
							$(this).nextAll('.contact-info').toggleClass("active");
						});
						// end Toggle

                    }
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) { 
					alert("Status: " + textStatus); alert("Error: " + errorThrown); 
				} 
            });
        }

	});

	// Enter abfangen
	$("#search-field").keypress(function( event ) {
		if ( event.which == 13 ) {
			event.preventDefault();
			$("#search-field").keypress();
		}
	});
	
    // Dialog
    (function($) {
         // DOM Ready
        $(function() {
            // Binding a click event
            $('#SignOut').on('click', function(e) {
                // Prevents the default action to be triggered. 
                e.preventDefault();
                // Triggering bPopup when click event is fired
                $('#SignOutDialog').bPopup({
					onOpen: function() { $("#LoggedInUser").html(localStorage.getItem("desyphone_username")); }, 
					fadeSpeed: 'slow',
					modalClose: false,
					opacity: 0.6,
					positionStyle: 'fixed'
                });
            });
            
            // WOF easteregg 
			var count = 0;
			$('#desylogo').click(function (e) {
				e.preventDefault();
				count += 1;
				if (count == 7) {
					$('#popup').bPopup({
						content:'image',
						contentContainer:'.popupcontent',
						loadUrl:'wof_rules.jpg',
						autoClose: 6000,
						modalClose: false
					});
					count = 0;
				}
			});
			
            
        });
    })(jQuery);
          
    // Delete local storgae (username)
    $('#delete_desyphone_username').click(function() {
				localStorage.removeItem('desyphone_username');
				localStorage.removeItem('desyphone_hash');
				localStorage.setItem('login_msg', 'Since this is initial DESY Phone Book setup, you will need to sign in.');
				location.reload();
	});
	


}); // close document.ready
