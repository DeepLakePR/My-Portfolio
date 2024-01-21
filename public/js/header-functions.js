$(()=>{

    ////////////////////////////////
    ////// Header Navigation Buttons
    // Variables
    var HeaderNavigationButtons = $("nav.header-navigation ul li a");
    var FooterNavigationButtons = $("div.footer-navigation nav ul li a");

    HeaderNavigationButtons.click((e) =>{
        ScrollTarget(e);

    });

    FooterNavigationButtons.click((e) =>{
        ScrollTarget(e);
    })

    function ScrollTarget(e){
        // Select Attribute
        let ButtonTarget = $(e.target).attr("js-scrolltarget");
        let ElementTarget = $("#" + ButtonTarget);

        let offsetDebug = 20;

        if(ButtonTarget == 'js-scroll-knowledge-text' || ButtonTarget == 'js-scroll-contact-text'){
            ElementTarget = ElementTarget.parent();

            if(ButtonTarget == 'js-scroll-knowledge-text'){
                offsetDebug = 100;
            
            }

        }

        if(ButtonTarget == 'js-scroll-projects-text'){
            offsetDebug = 130;

        }

        HeaderNavigationButtons.parent().removeClass('navigation-selected');
        $(`.header-navigation a[js-scrolltarget=${ButtonTarget}]`).parent().addClass('navigation-selected');
        
        // Scroll
        scrollTo({ 'top': ElementTarget.position().top - offsetDebug, 'behavior': 'smooth' });
    }

})
