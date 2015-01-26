$(document).ready(function() {
	
	if(window.localStorage["desyphone_username"] != undefined) {
		$("#loginPage").hide();
		$("#container").show();
		alert("welcome back ",window.localStorage["desyphone_username"]);
	}

    var minlength = 2;

    $("#search-field").keyup(function () {
        var that = this,
        value = $(this).val();
        if (value.length == 1 ) { $("#hint" ).slideUp(); }

        if (value.length >= minlength ) {
            $.ajax({
                type: "GET",
                url: "http://wof-live.desy.de/sites/desyphonebook/phonebook",
                data: {
                    'search_keyword' : value
                },
                dataType: "text",
                success: function(msg){
                    //we need to check if the value is the same
                    if (value==$(that).val()) {

                        var json = jQuery.parseJSON( msg );
                        var addrBook = json.addressBook;
                        $("#search-results").empty();

                        $.each(addrBook, function (i, obj) {
							// Keine funktionalen Accounts
							if (obj.description=="primary") {
								$("#search-results").append('<div class="contact"><span class="contact-name">' + obj.cn + '</span><a href="tel:+49408998' + obj.telephoneNumber + '"><div class="contact-phone fa fa-phone-square fa-lg" title="-' + obj.telephoneNumber + '"></div></a><a href="mailto:' + obj.mail + '"><div class="contact-email fa fa-envelope fa-lg" title="' + obj.mail + '"></div></a><div class="contact-info fa fa-info-circle fa-lg" title="Details"></div><div class="contact-details">Group: ' + obj.ou + '<br />Location: ' + obj.physicalDeliveryOfficeName + '<br />Fax: ' + obj.fax + '<br /></div></div>');
							}
											
						}); // end each


						// Toggle function for contact details
						$('.contact-info, .contact-name').click(function() {
							$(this).nextAll('.contact-details').slideToggle( "slow" );
						});
						// end Toggle

                    }
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


}); // close document.ready
