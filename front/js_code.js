

$(document).ready(function () {


    console.log('Javascript loaded')

    // Simulate log in on/off edit function
    userName = 'sean'

    if (userName == 'sean') {
        $('#editModeSwitch').show()
    }

    $('#editModeSwitch').on("change", function () {
        $('.editModeElement').toggle()
    });

  

    $('#toggle-event').on("change", function (e) {
        var isClicked = $('#toggle-event').is(':checked');
        if (isClicked == true) {
            $('#modalTurnOff').show();
            $('.toggle').addClass('off');
        }
    });


    //Music players
    $('.musicLogo').click(function () {
        console.log('music logo clicked.')
        console.log(this.id)
        musicElementClicked = this.id
        $(`#${musicElementClicked}`).hide()
        if (this.id == 'deezerLogo') {
            console.log('showing deezer player')
            $('#deezerPlayer').show();
        } else if (this.id == 'spotLogo') {
            console.log('showing spot player')
            $('#spotPlayer').show()
        }
    })

    $('#openVideos').click(function () {
        console.log('Video section clicked.');
        $('#video-section-content').slideToggle('slow');
        
    });

    $('#openPodcasts').click(function () {
        console.log('Podcasts section clicked.');
        $('#podcast-section-content').slideToggle('fast');

    });

    $('#openArticles').click(function () {
        console.log('Article section clicked.');
        $('#article-section-content').slideToggle('fast');

    });

 

   
    $('.toggleImg').mouseenter(function () {
        $(".imgDetails").finish().slideToggle(400);
    });

    $('.toggleImg').mouseleave(function () {
        $(".imgDetails").finish().slideToggle(400);
    });

  console.log('this is the correct file.')
   


     // FETCH DATA FROM DATABASE            

    $('#openVideos').click(function () {
        console.log('Data fetch requested');
        //Send a request to the server;

        var requestString = 'http://localhost:5555/videos';

        $.get(requestString, function (data, status) {

            data.forEach(function (entry) {
                console.log(entry)
                videoContentIframe = entry.videoLink
                console.log(videoContentIframe)
                document.getElementById('video-section-content').innerHTML += videoContentIframe    
                    + '<button class="btn btn-danger btn-sm rounded-0 videoDeleteButton editModeElement" type="button" data-toggle="tooltip" data-placement="top" title="Delete"><i class="fa fa-trash"></i></button>'   
            });
        });
    });

    // POST VIDEO DATA TO DATA BASE
    $("#sender").off().submit(function (event) {
        event.preventDefault();

        // Stop form from submitting normally;
        try {
            var input = $(this).find('input');
            inputValue = input.val();
            var postUrl = 'http://localhost:5555/videos'
            // Get some values from elements on the page
                console.log('inputValue =', inputValue);
                console.log('url =', postUrl);
            // Send the data using post
                var posting = $.post(postUrl, { videoInput: inputValue });
                console.log('posting = ', posting);
        } catch (ex) {
            alert('An error occurred and I need to write some code to handle this!');
        }
        event.preventDefault();
        
    });



    // POST IMAGE DATA TO DATA BASE
        $(document).on('change', '.btn-file :file', function () {
            var input = $(this),
                label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
            input.trigger('fileselect', [label]);
        });

        $('.btn-file :file').on('fileselect', function (event, label) {

            var input = $(this).parents('.input-group').find(':text'),
                log = label;

            if (input.length) {
                input.val(log);
            } else {
                if (log) alert(log);
            }

        });
        function readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    $('#img-upload').attr('src', e.target.result);
                }

                reader.readAsDataURL(input.files[0]);
            }
        }

        $("#imgInp").change(function () {
            readURL(this);
        });

    // DELETE DATA IN THE DATA BASE
        // Need seperate buttons because to find data to be deleted I need to specift the content type (img etc.)

        //Image delete button;
    $(document).on('click', '.imageDeleteButton', function () {
            console.log('new message: delete button successfully identified...')
            //solution: https://stackoverflow.com/questions/38857875/javascript-code-stops-working-after-click-on-button
            console.log('this is', this)
            console.log('this.parentNode =', this.parentNode)
            dataToDelete = $('img', this.parentNode).attr('src');
            console.log('the source is:', dataToDelete)
            this.parentNode.parentNode.removeChild(this.parentNode);
            var requestString = 'http://localhost:5555/images';


    });

        // Video delete button
    $(document).on('click', '.videoDeleteButton', function (e) {
        console.log('Video Button found...')

        var iFrameToDelete = $(this.previousSibling)
        var iFrameString = iFrameToDelete[0].outerHTML
        console.log('iFrame to delete = ', iFrameString)
        //Need to clean out additional characters that are not in the original string
        var iFrameStringClean = iFrameString.replace('allowfullscreen=""', 'allowfullscreen')

       
        var deleteUrl = 'http://localhost:5555/videos';
        $.ajax({
            url: deleteUrl + '?' + $.param({ "deleteMeVideo": iFrameStringClean }),
            type: 'DELETE',

       });
    });

});
    
 
    
