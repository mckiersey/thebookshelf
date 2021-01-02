serverAddress = 'localhost' // Local
//serverAddress = 'thebook-shelf.com' //Online

$(document).ready(function () {
    console.log('Javascript loading...')



    //Get unlogged username
    var url = new URL(window.location.href);
    var unloggedUser = url.searchParams.get("UserProfile");
    console.log("Viewing bookshelf of user:", unloggedUser);


    function deleting_cookie(name) {
        document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    }
    function getCookie(name) {
        const value = `${document.cookie}`;
        if (value.length > 0) {
            console.log('all cookies', value)
            const parts = value.split(`; ${name}=`);
            console.log('parts 0 split on semi-colon part 0:', parts[0].split(';')[0].split('=')[1])
            var loggedInUser = parts[0].split(';')[0].split('=')[1]
            return loggedInUser;
        } else {
            return [] //return empty array if not logged in.
        }

    }

    // Set default cookie values
    cookieJar = getCookie()
    console.log('cookie jar', cookieJar)
    if (cookieJar !== unloggedUser) {
        console.log('No user logged in. Displaying default profile')
        userName = unloggedUser
        console.log('view unlogged user bookshelf', userName)
        status = 'signedOut' // make sure it cannot be edited
        $('#editModeSwitch').hide() // hide edit switch
        $('#logOutButton').hide()
    } else {
        userName = cookieJar
        console.log('User logged in. Diplaying personal profile for user', userName)
        $('#editModeSwitch').show() //show edit switch
        $("#signedInLight").show()
        $('#logOutButton').show()

    }

    console.log('these are all the cookies', cookieJar)


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

    $('#logOutButton').click(function () {
        console.log('log out button clicked')
        console.log('logging out...')
        console.log('cookie value to delete:', document.cookie)
        if (cookieJar.length > 0) {
            deleting_cookie('validatedUserName')
        } else { }
        console.log('cookie value left:', document.cookie)
        window.location.href = `http://${serverAddress}/signUp`
    })

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

    $('#carouselImageDelete').click(function () {
        console.log('Carousel delete section clicked.');
        $('.deleteCarouselImagesSection').toggle();

    });

    $('#openVideos').click(function () {
        console.log('Video section clicked.');
        $('#video-section-content').slideToggle('slow');

    });

    $('#openPodcasts').click(function () {
        console.log('Podcasts section clicked.');
        $('#all-podcast-section').slideToggle('fast');

    });

    $('#openArticles').click(function () {
        console.log('Article section clicked.');
        $('#article-section-content').slideToggle('fast');

    });

    $('.toggleImg').on("mouseenter", function () {
        $(".imgDetails").finish().slideToggle(400);
        console.log("test ON")
    });

    $('.toggleImg').on("mouseleave", function () {
        $(".imgDetails").finish().slideToggle(400);
        console.log("test OFF")
    });





    /////////////////////////////////////////////
    ///////////////////////////////// GET DATA 
    /////////////////////////////////////////////

    //Playlists
    console.log('Loading music playlist ID')
    var requestString = `http://${serverAddress}/playlists`;
    var urlParameters = requestString + `?userName=${userName}`
    console.log('The podcast url is:', urlParameters)

    $.get(urlParameters, function (data, status) {
        console.log('playlist data', data)
        // Get last uploaded playlist
        var lastPlaylistPosted = data.length
        console.log('length is', lastPlaylistPosted)
        var playlistID = data[lastPlaylistPosted - 1].LINK
        var playlistPlatform = data[lastPlaylistPosted - 1].context
        console.log('playlist id ', playlistID, 'platform', playlistPlatform)
        if (playlistPlatform == 'DeezerInput') {
            console.log('deezer playlist')
            document.getElementById("deezerPlayer").src = `https://www.deezer.com/plugins/player?format=classic&autoplay=false&playlist=true&width=700&height=350&color=ff0000&layout=dark&size=medium&type=playlist&id=${playlistID}&app_id=1`
            //https://www.deezer.com/plugins/player?format=classic&autoplay=false&playlist=true&width=700&height=350&color=ff0000&layout=dark&size=medium&type=playlist&id=7613072842&app_id=1
        } else {
            console.log('spotify playlist')
            document.getElementById("spotPlayer").src = `https://open.spotify.com/embed/playlist/${playlistID}`
            //https://open.spotify.com/embed/playlist/16ryn0QfWZMcBTNfqzW7Si
        }
    });

    //Videos
    var videoClicker = 0;

    $('#openVideos').click(function () {
        console.log('Video data requested, clicker count = ', videoClicker)
        if (videoClicker === 0) {

            var requestString = `http://${serverAddress}/videos`;

            $.get(requestString, function (data, status) {
                data.forEach(function (entry) {
                    console.log(entry)
                    videoContentIframe = entry.link
                    console.log(videoContentIframe)
                    document.getElementById('video-section-content').innerHTML += videoContentIframe
                        + '<button class="btn btn-danger btn-sm rounded-0 videoDeleteButton editModeElement" type="button" data-toggle="tooltip" data-placement="top" title="Delete"><i class="fa fa-trash"></i></button>'
                });
            });
        }
        videoClicker++
    });


    // PODCASTS (AUTOMATIC LOAD)
    var loadedPodcasts = []
    var podcastClicker = 0;
    $('#openPodcasts').click(function () {
        console.log('Podcast data requested, clicker count = ', podcastClicker)

        if (podcastClicker === 0) {

            var requestString = `http://${serverAddress}/podcasts`;
            var urlParameters = requestString + `?userName=${userName}&podContext=podcast`
            $.get(urlParameters, function (data, status) {
                console.log('Request status is:', status)

                data.forEach(function (entry) {
                    podcastLink = entry.link
                    podcastSrcName = entry.caption

                    console.log('podcast:', podcastSrcName)
                    console.log('link:', podcastLink)

                    document.getElementById('podcast-section-content').innerHTML += `<div class="col-sm-3-md-4-lg-4">`
                        + `<div class="card"><a href="${podcastLink}" target="_blank">`
                        + `<img src="${podcastSrcName}" class="card-img-top" alt="...">`
                        + `</a>`
                        + `</div></div>`
                    console.log('podcast info sent')
                    loadedPodcasts.push(podcastSrcName)
                });
            });
            //Load podcast table
            var requestString = `http://${serverAddress}/podcasts`;
            var urlParameters = requestString + `?userName=${userName}&podContext=episode`
            $.get(urlParameters, function (data, status) {
                data.forEach(function (entry) {
                    episodeLink = entry.link
                    episodeDescription = entry.caption

                    console.log(' episode link:', episodeLink)
                    console.log('episode description:', episodeDescription)

                    document.getElementById('podcast-episode-table').innerHTML += `<tr><td>${episodeDescription}</td>`
                        + `<td><a href="${episodeLink}" target="_blank">Listen to episode</a></td>`
                        + `<td><button class="btn btn-danger btn-sm rounded-0 podEpDeleteButton editModeElement" type="button" data-toggle="tooltip" data-placement="top" title="Delete"><i class="fa fa-trash"></i> Remove Me</button>`
                        + `<p class="text-warning" id="gridDeleteMsg"></p>`
                        + `</tr>`
                    console.log('podcast table built')
                });
            });
        } // podcast clicker
        podcastClicker++
    });
    // Change podcast as a function on whether it has already been picked
    // Podcast selector
    $('.card-img-top-default').click(function () {
        console.log('all pod info', $(this))
        podcastNameUrl = $(this)[0].src
        podcastLinkUrl = $(this)[0].dataset.link

        console.log('pod name url', podcastNameUrl)
        console.log('podcast link by data set', podcastLinkUrl)
        selectedPodcast = podcastNameUrl.substring(podcastNameUrl.lastIndexOf("/") + 1, podcastNameUrl.length);

        if (loadedPodcasts.includes(selectedPodcast)) {
            // Already loaded so a click means it should be deleted
            $(this).css({ 'opacity': '0.1' })
            console.log('Podcast delete clause')
            console.log('podcast name = ', podcastLinkUrl)
            var deletePodUrl = `http://${serverAddress}/podcasts`;
            $.ajax({
                url: deletePodUrl + '?' + $.param({ "deleteMePodcast": podcastLinkUrl, "deleteMeUserName": userName, "podcastContext": "podcast" }),
                type: 'DELETE',
                success: function (response) {
                    console.log('success response', response)
                    console.log('the deleted podcast is ', selectedPodcast)
                    $(document.getElementById(selectedPodcast)).html(response).show().delay(1000).fadeOut();
                },
                error: function (response) {
                    $(document.getElementById(selectedPodcast)).html(response).show().delay(1000).fadeOut();
                }
            });

        } else {
            // Not in array so select and post podcast
            $(this).css({ 'opacity': '1' });
            podcastNameUrl = $(this)[0].src
            podcastLink = $(this).data("link")

            console.log('podcast name = ', selectedPodcast)
            console.log('Podcast link:', podcastLink);
            var postUrl = `http://${serverAddress}/podcasts`;
            $.post(postUrl, { podcastName: selectedPodcast, user: userName, link: podcastLink, context: "podcast" })
                .done(function (data) {
                    $(document.getElementById(selectedPodcast)).html(data).show().delay(1000).fadeOut();
                });

        }
    });

    // CAROUSEL: Automatically load carousel images;
    console.log('Loading carousel images...')
    var requestString = `http://${serverAddress}/carouselImages`;
    var urlParameters = requestString + `?userName=${userName}`
    console.log('The carousel url is:', urlParameters)
    $.get(urlParameters, function (data, status) {
        var i = 0
        data.forEach(function (entry) {
            sentImage = entry.LINK
            sentImageFinal = `http://${serverAddress}` + sentImage
            document.getElementById('carouselIndicators').innerHTML += `<li data-target="#carousel_header" data-slide-to="${i} id="target_${i}"></li>`
            console.log('i = ', i)
            if (i === 0) {
                var className = "carousel-item active"
            } else {
                var className = "carousel-item"
            }
            document.getElementById('carouselImages').innerHTML += `<div class="${className}" >`
                + ` <img src="${sentImageFinal}" class="d-block w-100" id="carousel_image_${i}">`
                + `</div>`
            i++
            // Build delete table;
            document.getElementById("carousel-section-table").innerHTML += `<tr><td>${sentImageFinal}</td><td class='tickBox'> <input type="checkbox"/></td></tr >`
        });
    });

    // Gallery: Automatically load gallery images;
    console.log('Loading gallery images...');
    var requestString = `http://${serverAddress}/images`;
    $.get(requestString, function (data, status) {
        var j = 0
        data.forEach(function (entry) {
            console.log('loading images number:', j);

            console.log(entry);
            var caption = 'this is a caption';
            var gridImage = `http://${serverAddress}` + entry.LINK
            var gridImageCaption = entry.CAPTION

            console.log('grid image = ', gridImage)
            console.log('grid image caption = ', gridImageCaption)


            if (j < 3) {
                var classType = 'class="col-sm-6 col-md-4 col-lg-4 item"'
            } else {
                var classType = 'class="col-sm-6 col-md-4 col-lg-3 item"'
            }
            document.getElementById('populateGridImages').innerHTML += `<div ${classType}>`

                + `<a class="testMe" href="http://${serverAddress}/home" data-lightbox="photos"><img class="toggleImg" src="${gridImage}"></a>`
                + `<p class="imgDetails">${gridImageCaption}</p>`
                + `<button class="btn btn-danger btn-sm rounded-0 imageDeleteButton editModeElement" type="button" data-toggle="tooltip" data-placement="top" title="Delete"><i class="fa fa-trash"></i> Delete Me</button>`
                + `<p class="text-warning" id="gridDeleteMsg"></p>`
                + `</div>`
            j++
        });
    });

    // Profile picture (automatically load profile picture)
    console.log('Profile picture loading')
    var requestString = `http://${serverAddress}/profilePictures`;
    var urlParameters = requestString + `?userName=${userName}`
    console.log('The profile picture url is:', urlParameters)
    $.get(urlParameters, function (data, status) {
        //Get last uploaded profile pic
        var lastProfilePicPosted = data.length
        console.log('length is', lastProfilePicPosted)
        var profilePic = data[lastProfilePicPosted - 1].LINK
        console.log('profile pic data is', profilePic)
        console.log('status is ', status)

        profilePicFinal = `http://${serverAddress}` + profilePic
        document.getElementById('profilePictureSpace').src = profilePicFinal
    });


    //Articles (automatically load articles)
    console.log('Article data loading')
    var requestString = `http://${serverAddress}/articles`;

    $.get(requestString, function (data, status) {
        console.log('Requet status is:', status)
        data.forEach(function (entry) {
            articleLink = entry.link
            articleCaption = entry.caption
            console.log('article:', articleLink)
            var pathArray = articleLink.split('/');
            var protocol = pathArray[0];
            var host = pathArray[2];
            var baseUrl = protocol + '//' + host;
            console.log('url is', baseUrl)
            document.getElementById('article-section-content').innerHTML += `<div class ="row"><div class="col">`
                + `<img height="18" width="18" src="http://www.google.com/s2/favicons?domain=${baseUrl}"/><a href =${articleLink} target="_blank">  ${articleCaption}</a>`
                + '<button class="btn btn-danger btn-sm rounded-0 articleDeleteButton editModeElement" type="button" data-toggle="tooltip" data-placement="top" title="Delete"><i class="fa fa-trash"></i></button></div></div>'



        });
    });





    /////////////////////////////////////////////
    ///////////////////////////////// POST DATA 
    /////////////////////////////////////////////


    // POST MUSIC DATA TO DATA BASE;
    $(".musicSender").off().submit(function (event) {
        console.log('music submit button pressed...')
        event.preventDefault();

        var input = $(this).find('input');
        var inputValue = input.val();
        var inputType = input.attr('id');

        var postUrl = `http://${serverAddress}/playlists`
        // Get some values from elements on the page

        console.log('playlist id =', inputValue);
        console.log('playlist type =', inputType);

        $.post(postUrl, { musicInput: inputValue, user: userName, musicType: inputType })
            .done(function (data) {
                console.log('video done clause response data', data)
                $('#musicMsg').html(data).show().delay(4000).fadeOut();
            });
    });
    // POST VIDEO DATA TO DATA BASE;
    $("#videoSender").off().submit(function (event) {
        console.log('video submit button pressed...')
        event.preventDefault();

        var input = $(this).find('input');
        var inputValue = input.val();
        var postUrl = `http://${serverAddress}/videos`
        // Get some values from elements on the page

        console.log('inputValue =', inputValue);
        console.log('url =', postUrl);
        // Send the data using post
        $.post(postUrl, { videoInput: inputValue, user: userName })
            .done(function (data) {

                console.log('video done clause response data', data)
                $('#videoMsg').html(data).show().delay(4000).fadeOut();
            });
    });


    //POST ARTICLE DATA TO DATA BASE

    $('#articleSender').off().submit(function (event) {
        event.preventDefault();

        var articleLink = $(this).find('input[name="articleInputLink"]').val();
        var articleCaption = $(this).find('input[name="articleInputCaption"]').val();
        console.log('article link', articleLink)
        console.log('article caption', articleCaption)

        console.log('to be posted:', articleLink, 'with caption of:', articleCaption)
        var postUrl = `http://${serverAddress}/articles`
        $.post(postUrl, { articleInput: articleLink, accountOwner: userName, articleDescrpition: articleCaption })
            .done(function (data) {
                $('#articleMsg').html(data).show().delay(4000).fadeOut();
            });

    });

    // POST PODCAST EPISODE TO DATA BASE
    $('#podEpSender').off().submit(function (event) {
        event.preventDefault();
        console.log('podcast episode sender clicked')
        var input = $(this).find('input');
        var podEpDescription = input[0].value
        var podEpLink = input[1].value
        console.log('Description value is', podEpDescription)
        console.log('link value is', podEpLink)

        var inputValue = input.val();
        console.log('podcast episode to be posted:', inputValue)
        var postUrl = `http://${serverAddress}/podcasts`
        $.post(postUrl, { user: userName, link: podEpLink, context: "episode", caption: podEpDescription })
            .done(function (data) {
                $('#podEpMsg').html(data).show().delay(4000).fadeOut();
            });

    });


    // POST IMAGE DATA TO DATA BASE
    $('.imageUpload').on('click', function () {
        console.log('Image uploader clicked')
        var imageType = this.id
        console.log('type', imageType)
        var file_data = $(`#${imageType}`).prop('files')[0];

        var captionId = "#" + imageType + "Caption"
        console.log('caption id = ', captionId)
        var imageCaption = $(captionId).val();

        console.log('the file  is:', file_data);
        console.log('the caption  Value is:', imageCaption);

        var imageData = new FormData();
        imageData.append('uploadedImage', file_data);
        imageData.append('uploadedImage', imageType);
        imageData.append('uploadedImage', imageCaption);

        console.log('Show Get ALL', imageData.getAll('uploadedImage'));

        var postUrl = `http://${serverAddress}/images`


        $.ajax({
            url: postUrl, // point to server-side controller method
            dataType: 'text', // what to expect back from the server
            cache: false,
            contentType: false,
            processData: false,
            data: imageData,
            type: 'post',
            success: function (response) {
                $('.imageMsg').html(response).show().delay(3000).fadeOut(); // display success response from the server
            },
            error: function (response) {
                $('.imageMsg').html(response).show().delay(3000).fadeOut();  // display error response from the server
            }
        });
    });
    /////////////////////////////////////////////
    ///////////////////////////////// DELETE DATA 
    /////////////////////////////////////////////

    // Carousel image delete button;

    $('.imageDelete').on('click', function () {
        console.log('image delete button clicked')

        var checkboxes = document.getElementsByClassName("tickBox");
        console.log(checkboxes.length)
        for (var i = 0; i < checkboxes.length; i++) {
            var checkbox = checkboxes[i];
            checkbox.onclick = function () {
                var currentRow = this.parentNode.parentNode;
                var imageValue = currentRow.getElementsByTagName("td")[0].textContent;
                var imageValueClean = imageValue.replace(`http://${serverAddress}`, '')
                var context = 'carouselImage'
                var type = 'image'
                console.log('corresponding image: ', imageValueClean);


                var imageDeleteData = [];
                imageDeleteData.push(imageValueClean);
                imageDeleteData.push(userName);
                imageDeleteData.push(context);
                imageDeleteData.push(type);
                $("#deleteSelectedCarouselImages").on('click', function () {
                    console.log('Show Get ALL', imageDeleteData);

                    var deleteUrl = `http://${serverAddress}/carouselImages`;
                    $.ajax({
                        url: deleteUrl + '?' + $.param({ "deleteMeCarouselImages": imageDeleteData, "deleteMeUserName": userName }),
                        type: 'DELETE',
                        success: function (response) {
                            $('#carouselDeleteMsg').html(response).show().delay(3000).fadeOut(); // display success response from the server
                        },
                        error: function (response) {
                            $('#carouselDeleteMsg').html(response).show().delay(3000).fadeOut();  // display error response from the server
                        }

                    });

                });
            };
        };
    });


    // Video delete button
    $(document).on('click', '.videoDeleteButton', function (e) {
        console.log('Video Button found...')

        var iFrameToDelete = $(this.previousSibling)
        var iFrameString = iFrameToDelete[0].outerHTML
        console.log('iFrame to delete = ', iFrameString)
        //Need to clean out additional characters that are not in the original string;

        var iFrameStringClean = iFrameString.replace('allowfullscreen=""', 'allowfullscreen')
        var deleteUrl = `http://${serverAddress}/videos`;
        $.ajax({
            url: deleteUrl + '?' + $.param({ "deleteMeVideo": iFrameStringClean }),
            type: 'DELETE',
            success: function (response) {
                console.log('success response', response)
                console.log('the selected video is ', iFrameStringClean)
                $(document.getElementById("videoDeleteMsg")).html(response).show().delay(1000).fadeOut();
            },
            error: function (response) {
                $(document.getElementById("videoDeleteMsg")).html(response).show().delay(1000).fadeOut();
            }

        });
    });



    // Podcast Episode delete button (note: podcasts are added/removed in the GET request above)
    $(document).on('click', '.podEpDeleteButton', function (e) {
        console.log('Podcast Episode remove Button found...')
        console.log('this is', $(this));
        var podEpToDelete = $(this).closest('td').prev();
        var podEpLinkToDelete = podEpToDelete[0].getElementsByTagName('a')[0].href
        console.log('Podcast Episode link to delete', podEpLinkToDelete)
        var deletePodUrl = `http://${serverAddress}/podcasts`;
        $.ajax({
            url: deletePodUrl + '?' + $.param({ "deleteMePodcast": podEpLinkToDelete, "deleteMeUserName": userName, "podcastContext": "episode" }),
            type: 'DELETE',
            success: function (response) {
                console.log('success response', response)
                console.log('the selected podcast is ', podEpLinkToDelete)
                $(document.getElementById(podEpLinkToDelete)).html(response).show().delay(1000).fadeOut();
            },
            error: function (response) {
                $(document.getElementById(podEpLinkToDelete)).html(response).show().delay(1000).fadeOut();
            }
        });
    });

    // Article delete button

    $(document).on('click', '.articleDeleteButton', function (e) {
        console.log('Article delete Button found...')
        console.log('this is', this)
        var previousSibling = $(this.previousSibling)
        console.log('article previous sibling:', previousSibling)
        var articleLinkToDelete = previousSibling[0].outerText
        console.log('link to delete = ', articleLinkToDelete)


        var deleteUrl = `http://${serverAddress}/articles`;
        $.ajax({
            url: deleteUrl + '?' + $.param({ "deleteMeArticleCaption": articleLinkToDelete, "deleteMeUserName": userName }),
            type: 'DELETE',
            success: function (response) {
                $('#articleDeleteMsg').html(response).show().delay(3000).fadeOut(); // display success response from the server
            },
            error: function (response) {
                $('#articleDeleteMsg').html(response).show().delay(3000).fadeOut();  // display error response from the server
            }

        });
    });


    //Image gallery delete button;

    $(document).on('click', '.imageDeleteButton', function () {
        console.log('new message: delete button successfully identified...')
        //solution: https://stackoverflow.com/questions/38857875/javascript-code-stops-working-after-click-on-button
        console.log('this is', this)
        console.log('this.parentNode =', this.parentNode)
        var imageToDelete = $('img', this.parentNode).attr('src');
        var imageToDeleteClean = imageToDelete.replace(`http://${serverAddress}`, '')
        console.log('the source is:', imageToDelete)
        this.parentNode.parentNode.removeChild(this.parentNode);
        var requestString = `http://${serverAddress}/images`;
        $.ajax({
            url: requestString + '?' + $.param({ "deleteMeImage": imageToDeleteClean }),
            type: 'DELETE',
            success: function (response) {
                $('#gridDeleteMsg').html(response).show().delay(3000).fadeOut(); // display success response from the server;
            },
            error: function (response) {
                $('#gridDeleteMsg').html(response).show().delay(3000).fadeOut();  // display error response from the server
            }
        })

    });

});
