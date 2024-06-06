<!-- LOAD JQUERY - USED TO EXECUDE CODE -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

<!-- LOAD MOMENT.JS FOR DATE AND TIME FORMATTING -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.27.0/moment.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.27.0/locale/nl-be.min.js"></script>

<!-- THE SCRIPT -->
<script>
    
	/* EXECUTE WHEN PAGE IS LOADED */
  	$(function() {
      
      /* SETUP MULTI-SLUG */
      var defaultSlug = 'music';
      var slug = location.pathname.split("/")[1];
      var defaultClass = 'slug-'+defaultSlug+'';
      var itemParent = "nav [class*='collection'],nav [class*='folder'],nav [class*='index'],nav [class*='group']";
	
      /* ADD MULTISLUG CLASSES TO WEBITE LINKS*/
      $('a[href="/"]').addClass('slug-'+defaultSlug+'').parents(itemParent).addClass('slug-'+defaultSlug+'');
      
      /* ADD MULTISLUG CLASSES TO MENU NAVIGATION LINKS BASED ON URL*/
      $('nav a:link:not([href^="http://"]):not([href^="https://"])').each(function () {
      	var slugType = $(this).attr('href').split("/")[1];
      	var multiSlugClass = 'multislug slug-' + slugType + '';
        if (undefined !== slugType) {
      $(this).addClass(multiSlugClass).parents(itemParent).addClass(multiSlugClass);
        }
    });
      
    /* ADD MULTISLUG CLASSES TO MENU BUTTONS BASED ON URL*/
    $('nav button').each(function () {
      var slugTypeFolder = $(this).attr('data-controller-folder-toggle').split("/")[0];
      var multiSlugClass = 'multislug slug-' + slugTypeFolder + '';
      if (undefined !== slugTypeFolder) 
        $(this).addClass(multiSlugClass);
    });

    /* ADD EXCLUSION NAV ITEMS */
    $('.exclude-me,.exclude-me a').addClass('exclude');
    $('.sqs-svg-icon--list a,.SocialLinks-link').addClass('exclude');

    /* REMOVE OTHER SLUGS AND KEEP EXCLUDED ITEMS */
    // $('.multislug:not(".slug-'+slug+',.exclude")').remove();
      //$('.header-display-desktop .header-nav').css("display", "initial");
      
     /* SETUP ALL ARTIST FOR THE LIVE PAGE */
     let artists = [
         { 
           id: "15472594", 
           name: "Spilar", 
           slug: "spilar", 
           app_id: "9c97ce5ebd83b08febf4c3d8ca97cab4"
         },
         { 
           id: "725959", 
           name: "Snaarmaarwaar", 
           slug: "snaarmaarwaar", 
           app_id: "9c97ce5ebd83b08febf4c3d8ca97cab4" 
         },
         { 
           id: "15498682", 
           name: "Siger", 
           slug: "siger", 
           app_id: "9c97ce5ebd83b08febf4c3d8ca97cab4"
         },
         { 
           id: "15529860", 
           name: "Zonderland", 
           slug: "zonderland", 
           app_id: "917b10960a49cd2c1cedd80eb0c4945c"
         },       
         { 
           id: "15539847", 
           name: "Thalas", 
           slug: "thalas", 
           app_id: "ccddeda4f96fa40218e40dfc6eb847c6"
         },       
     ];

     let eventlists = [
       "page-section-5f7f6af007b2df73f173ea2b",

     ];

      
     let artist = artists.find(x => x.slug === location.pathname.split("/")[3]) ?? null;

     var h1s = document.getElementsByTagName("h2");
     for (var i = 0; i < h1s.length; i++) {
     	h1s[i].style.opacity = "100";
       if ((h1s[i].innerHTML === 'Concert dates' || h1s[i].innerHTML === 'Concert data') && artist !== null) {
         	let eventlist = h1s[i].closest('.sqs-layout');

     		if (eventlist && artist.app_id !== '') {

             var reqPromise = $.ajax({
                     url: 'https://rest.bandsintown.com/artists/id_' + artist.id + '/events/?app_id=' + artist.app_id,
                     dataType: "JSON",
                     type: "GET"
             });

             reqPromise.then(function (res) {

                 let eventitems = res.flat();

                 eventitems.sort(function (a, b) {
                     return new Date(a.datetime) - new Date(b.datetime)
                 });

                 eventitems.forEach(event => {

                     artist = artist;
                     artistname = artist.name;
					  eventlist.style.padding = "20px";
                     eventlist.innerHTML += [
                         '<div class="row sqs-row" style="border-bottom: 1px solid #eee; padding-top: 20px; padding-bottom: 20px;">',
                             '<div class="col sqs-col-4 span-4" style="color: #94918a;">' + moment(event.datetime).format("D MMM YYYY | H[u]mm") + '</div>',
                             '<div class="col sqs-col-6 span-6" style="color: #272725;">' + event.venue?.name + '<br /><b style="color: #94918a;">' + event.venue?.city + ', ' + event.venue?.country + '</b></div>',
                             '<div class="col sqs-col-2 span-2">',
                                 '<div class="sqs-tourdates__actions">',
                                     event.offers[0]?.url !== undefined && event.offers[0].type !== 'Sold Out' ? '<a href="' + event.offers[0]?.url + '" class="sqs-editable-button sqs-tourdates__button" target="_blank" rel="noopener" style="margin-right: 10px; padding: 10px !important;">Tickets</a>' : '',
                                     event.offers[0]?.url !== undefined && event.offers[0].type === 'Sold Out' ? '<a href="" class="sqs-editable-button sqs-tourdates__button sqs-tourdates__button--soldout" target="_blank" rel="noopener" style="margin-right: 10px; padding: 10px !important;">Sold Out</a>' : '',
                                     '<a class="sqs-editable-button sqs-tourdates__button" href="' + event.url + '" target="_blank" rel="noopener" style="padding: 10px !important;">RSVP</a>',
                                 '</div>',
                             '</div>',
                         '</div>'
                     ].join('');
                 });
             });

         }
       }
     }

     /* FILL LIVE PAGE SCHEDULE FOR ALL ARTISTS ABOVE */
     eventlists.forEach(el => {
       let eventlist = document.getElementById(el);
       if (eventlist) {

           var reqPromises = artists.map(function (artist) {
             if(artist.app_id !== '') {
               return $.ajax({
                   url: 'https://rest.bandsintown.com/artists/id_' + artist.id + '/events/?app_id=' + artist.app_id + '',
                   dataType: "JSON",
                   type: "GET"
               });
             }
           });

           Promise.all(reqPromises).then(function (res) {

               let eventitems = res.flat();
             
             	eventitems.push(
                {
        "offers": [
            {
                "type": "Tickets",
                "url": "https://www.bandsintown.com/t/105168022?app_id=9c97ce5ebd83b08febf4c3d8ca97cab4&came_from=267&utm_medium=api&utm_source=public_api&utm_campaign=ticket"
            }
        ],
        "venue": {
            "country": "Italy",
            "city": "Tirolo",
            "name": "Tyrol Castle"
        },
        "datetime": "2024-07-11T20:00:00",
        "url": "https://www.bandsintown.com/e/105168022?app_id=9c97ce5ebd83b08febf4c3d8ca97cab4&came_from=267&utm_medium=api&utm_source=public_api&utm_campaign=event",
        "artist": {
            "id": "15498682",
            "name": "Siger",
            "app_id": "9c97ce5ebd83b08febf4c3d8ca97cab4"
        }
    },);

               eventitems.sort(function (a, b) {
                   return new Date(a.datetime) - new Date(b.datetime)
               });

               eventitems.forEach(event => {

                   artist = artists.filter(artist => artist.id === event.artist.id)[0];
                   artistname = artist ? artist.name : '';
					eventlist.style.padding = "20px";
                   eventlist.innerHTML += [
                       '<div class="row sqs-row" style="border-bottom: 1px solid #505050; padding-top: 20px; padding-bottom: 20px;">',
                           '<div class="col sqs-col-2 span-2" style="color: #94918a;">' + moment(event.datetime).format("D MMM YYYY | H[u]mm") + '</div>',
                           '<div class="col sqs-col-3 span-3"><b>' + artistname.toUpperCase() + '</b></div>',
                           '<div class="col sqs-col-5 span-5">' + event.venue?.name + '<br /><b style="color: #94918a;">' + event.venue?.city + ', ' + event.venue?.country + '</b></div>',
                           '<div class="col sqs-col-2 span-2">',
                               '<div class="sqs-tourdates__actions">',
                                   event.offers[0]?.url !== undefined && event.offers[0].type !== 'Sold Out' ? '<a href="' + event.offers[0]?.url + '" class="sqs-editable-button sqs-tourdates__button" target="_blank" rel="noopener" style="margin-right: 10px; padding: 10px !important;">Tickets</a>' : '',
                                   event.offers[0]?.url !== undefined && event.offers[0].type === 'Sold Out' ? '<a href="" class="sqs-editable-button sqs-tourdates__button sqs-tourdates__button--soldout" target="_blank" rel="noopener" style="margin-right: 10px; padding: 10px !important;">Sold Out</a>' : '',
                                   '<a class="sqs-editable-button sqs-tourdates__button" href="' + event.url + '" target="_blank" rel="noopener" style="padding: 10px !important;">RSVP</a>',
                               '</div>',
                           '</div>',
                       '</div>'
                   ].join('');
               });
           });
       }
     });
     /* END LIVE PAGE SCRIPT */
  });
</script>
