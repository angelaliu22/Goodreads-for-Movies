$(document).ready( function() {
     $(document).foundation();
    $.ajax({
        type: 'GET',
        dataType: 'text',
        url: '/list/all',
        statusCode: {
            403: function () {
                console.log('HTTP 403 Forbidden!')
            }
        },
        success: function (result) {
            var listArray = result.split(",");
            for (var i = 0; i < listArray.length; i++) {
                var listWithoutSpaces = listArray[i].replace(/\s/g , "-")
                $("#listsAccordion").append("<li class='accordion-navigation'><a href = '#"+listWithoutSpaces+"'>"+listArray[i]+"</a><div id = '"+listWithoutSpaces+"'class = 'content'><ul></ul></div></li>")
                
                $.ajax({
                    type: 'GET',
                    dataType: 'text',
                    url: '/list/'+listArray[i],
                    statusCode: {
                        403: function () {
                            console.log('HTTP 403 Forbidden!')
                        }
                    },
                    success: function (result) {
                        var movieArray = result.split(",");
                        var listname = ""
                        for (var x = 0; x < movieArray.length; x++) {
                            if (x == 0) {
                                listname = "#" + movieArray[x].replace(/\s/g , "-") + " ul"
                                console.log("~~~~" + listname)
                            } else {
                            $(listname).append("<li>"+movieArray[x]+"</li>")
                            }
                        }
                    }
                })
            }
        }
     })
});