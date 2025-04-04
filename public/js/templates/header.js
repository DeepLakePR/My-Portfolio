var projectsModalPreTitle = 'Projeto';

$(()=>{

    ////////////////////////////////
    ////// Header Navigation Buttons
    // Variables
    var HeaderNavigationButtons = $("nav.header-navigation ul li a");
    var FooterNavigationButtons = $("div.footer-navigation nav ul li a");

    var isHeaderNavigationScrolling = false;

    HeaderNavigationButtons.click((e) =>{
        ScrollTarget(e);
    });

    FooterNavigationButtons.click((e) =>{
        ScrollTarget(e);
    })

    // Scroll Target
    function ScrollTarget(e){

        isHeaderNavigationScrolling = true;

        // Select Attribute
        let ButtonTarget = $(e.target).attr("js-scrolltarget");
        let ElementTarget = $("#" + ButtonTarget);

        let offsetDebug = 140;

        if(ButtonTarget == 'js-scroll-knowledge-text' || ButtonTarget == 'js-scroll-contact-text'){
            ElementTarget = ElementTarget.parent();

        }

        HeaderNavigationButtons.parent().removeClass('navigation-selected');
        $(`.header-navigation a[js-scrolltarget=${ButtonTarget}]`).parent().addClass('navigation-selected');
        
        // Scroll
        scrollTo({ 'top': ElementTarget.position().top - offsetDebug, 'behavior': 'smooth' });


        setTimeout(()=>{
            isHeaderNavigationScrolling = false;

        }, 1000);

    }

    // Scrolling Event
    $(window).scroll(()=>{

        if(!isHeaderNavigationScrolling){
            HeaderNavigationButtons.each((_, navButton)=>{

                let t_offset = 300;
                
                let sectionElement = $('#' + $(navButton).attr('js-scrolltarget'));

                if($(sectionElement).attr('id') === 'js-scroll-contact-text'){
                    
                    t_offset = 800;

                }

                if($(window).scrollTop() >= sectionElement.offset().top - t_offset){
                    HeaderNavigationButtons.parent().removeClass('navigation-selected');
                    $(navButton).parent().addClass('navigation-selected');

                }
                
            });

        }

    })

    ////////////////////////////////
    ////// Header Options Hide & Show Animation on Scroll
    const HeaderOptions = $('header .header-options');
    var HeaderHideScrollingDebugger = false;
    var TopOffset = 35;

    function MobileHeaderExpand(){

        const MobileMediaQuery = window.matchMedia('(max-width: 768px)');

        if(MobileMediaQuery.matches){
            isMediaQueryMatches = true;

            var lastScrollTop = 0;

            $(window).on('scroll', ()=>{
                
                if(isMediaQueryMatches){

                    if(!isHeaderNavigationScrolling){

                        if(!HeaderHideScrollingDebugger){

                            let ScrollTop = window.scrollY || document.documentElement.scrollTop;
                            ScrollTop = ScrollTop - TopOffset;

                            if(ScrollTop > lastScrollTop){
                                HeaderOptions.css('max-height', '0')
                                .css('overflow', 'hidden')
                                .css('padding-bottom', '0')
                                .css('margin', '0');
                                
                            }else{
                                HeaderOptions.css('max-height', '75px')
                                .css('overflow', 'visible')
                                .css('padding-bottom', '11px')
                                .css('margin', '10px 0');;

                            }

                            lastScrollTop = ScrollTop;
                            HeaderHideScrollingDebugger = true

                            setTimeout(()=>{
                                HeaderHideScrollingDebugger = false;

                            }, 1000);


                        }

                    }

                }else{
                    $(window).unbind('scroll');

                }

            });

        }else{
            isMediaQueryMatches = false;
            HeaderOptions.css('max-height', '75px').css('overflow', 'visible');

        }

    }

    MobileHeaderExpand();

    $(window).on('resize', ()=>{
        MobileHeaderExpand();
    })

    ////////////////////////////////
    ////// Header Options Languages
    const languagesSelector = $(".languages-selector");
    const languagesSelectorButton = $(".languages-select-button");

    const languageSelected = $(".languages-selected-language");
    const languagesOptions = $(".languages-select-dropdown li");

    // Variables
    var translationsFolder = '/public/languages';

    const languagesSupported = [
        'en-US',
        'es-ES',
        'fr-FR',
        'pt-BR',
        'zh-HK'
    ]

    // Get Translation Key Function
    function getTranslationKey(translationObject, elTranslationKey, elementToTranslate, translateAttribute){

        for (const [key, value] of Object.entries(translationObject)) {

            let isAHref = false;

            if(translationObject['projects-modal']){ // Custom Translate for Projects Modal
                projectsModalPreTitle = translationObject['projects-modal']['projects-modal-pre-title']

            }

            if(elementToTranslate.is('a')){
                isAHref = true;
            //     if(elementToTranslate.attr('title') == key || elementToTranslate.attr('title') == value){
            //         console.log(elementToTranslate.attr('title'));
            //         console.log(key);
            //         console.log(value)

            //     };

            }

            if(!translateAttribute){ // Not Translate attribute

                if(key == elTranslationKey){ // Translate via Key
                    elementToTranslate.html(value);

                    if(isAHref && (elementToTranslate.attr('framework-language-contact-link') != 'true'))
                        elementToTranslate.attr('title', value);

                    /////////////////////////////////
                }else if(value[elTranslationKey]){ // Translate via Value Translation Key
                    elementToTranslate.html(value[elTranslationKey]);

                    if(isAHref && (elementToTranslate.attr('framework-language-contact-link') != 'true'))
                        elementToTranslate.attr('title', value[elTranslationKey]);
                
                }else if(typeof(value) === 'object'){

                    setTimeout(()=>{
                        return getTranslationKey(value, elTranslationKey, elementToTranslate, false);

                    }, 150);

                }

            }else if(translateAttribute){ // Translate attribute (Projects Single)
                
                if(key === elTranslationKey){

                    let projectSingleTranslation = translationObject[key];

                    // Title
                    elementToTranslate.data(
                        'project-info-title', 
                        projectSingleTranslation['projects-modal-single-title']
                    );
                    
                    // Tags
                    elementToTranslate.data(
                        'project-info-tags', 
                        projectSingleTranslation['projects-modal-single-tags']
                    );
                    
                    // Description
                    elementToTranslate.data(
                        'project-info-description', 
                        projectSingleTranslation['projects-modal-single-description']
                    );

                }

                if(typeof(value) === 'object'){

                    setTimeout(()=>{
                        return getTranslationKey(value, elTranslationKey, elementToTranslate, true);

                    }, 150);

                }

            }

        }

    }

    // Translate Page Function
    function translatePage(translateTo){

        // Translate Elements
        $('h1, h2, h3, p, span, b, i, a, button, div.projects-single').each((_i, elementToTranslate)=>{

            let elementTranslationKey = $(elementToTranslate).attr('framework-language-element-key');
            let elementTranslationContactLink = $(elementToTranslate).attr('framework-language-contact-link');

            if(elementTranslationContactLink == 'true'){
                $(elementToTranslate).attr('href', '').attr('target', '_blank');

            }

            // Translate Direct Elements
            if(elementTranslationKey){

                fetch(`${translationsFolder}/${translateTo}.json`).then(response => response.json()).then(translationData => {
                    
                    setTimeout(()=> {

                        // Not translate projects single attributes
                        if(!$(elementToTranslate).hasClass('projects-single')){
                            getTranslationKey(translationData, elementTranslationKey, $(elementToTranslate), false);
                            
                        }else{ // Translate projects single attributes
                            getTranslationKey(translationData, elementTranslationKey, $(elementToTranslate), true);

                        }
                    
                    }, 50);

                    

                }).catch((error)=>{
                    console.warn(error);

                });
            
            }

        })

        // Set Cookie
        Cookies.set("WebsiteLanguage", translateTo, {
            expires: 30,
            secure: true
        });

    }

    // Init and First Translation
    function initAndFirstTranslation(language){

        translatePage(language);

        languageSelected.empty();

        let selectedChildren = $(`li[language=${language}]`).children()[0];
        $(selectedChildren).clone().appendTo(languageSelected);

    }

    // Languages Selector Button
    languagesSelectorButton.on("click", () => {
            
        languagesSelector.toggleClass("active");

        languagesSelectorButton.attr(
            "aria-expanded",
            languagesSelectorButton.attr("aria-expanded") === "true" ? "false" : "true"
        );

    });

    languagesOptions.each((_, languageOption) => {

        function languagesOptionsHandler(e) {

            languageSelected.empty();

            let selectedChildren = $(languageOption).children()[0];
            $(selectedChildren).clone().appendTo(languageSelected);

            ////////////
            // Dimiss Languages Selector
            if (e.type === "click" && e.clientX !== 0 && e.clientY !== 0) {
                languagesSelector.removeClass("active");
            }

            if (e.key === "Enter") {
                languagesSelector.removeClass("active");
            }

            ////////////
            // Translate Page to Selected Language
            let translateTo = $(languageOption).attr('language');

            // h1, h2, h3, p, span, b, i, a, button
            translatePage(translateTo);

        }

        $(languageOption).on("keyup", languagesOptionsHandler);
        $(languageOption).on("click", languagesOptionsHandler);

    });

    setTimeout(()=>{

        let webSiteLanguageCookie = Cookies.get("WebsiteLanguage");

        if(webSiteLanguageCookie){ 
            initAndFirstTranslation(webSiteLanguageCookie);
            
        }else if(webSiteLanguageCookie === undefined || webSiteLanguageCookie === null){
            
            let clientBrowserLanguage = navigator.language.split('-')[0];

            languagesSupported.map((language)=>{
                if(language.match(clientBrowserLanguage)){
                    initAndFirstTranslation(language);

                };

            })

        }

    }, 0);

    ////// Header Options Themes
    // Variables
    const ThemeButton = HeaderOptions.find('button#theme-changer');

    const LightThemeBtn = ThemeButton.find('#header-opt-light-theme');
    const DarkThemeBtn = ThemeButton.find('#header-opt-dark-theme');

    var CurrentTheme = 'dark';
    var ThemeClass = 'framework-light-theme';

    var Debugger = false;

    // Function
    ThemeButton.click((e)=>{

        if(Debugger == false){

            Debugger = true;

            if(CurrentTheme == 'dark'){
                ThemeButtonAnimation(DarkThemeBtn, LightThemeBtn, 'light-theme');
                CurrentTheme = 'light';

            }else if(CurrentTheme == 'light'){
                ThemeButtonAnimation(LightThemeBtn, DarkThemeBtn, 'dark-theme');
                CurrentTheme = 'dark';

            }

            isHeaderNavigationScrolling = true;

            setTimeout(()=>{
                isHeaderNavigationScrolling = false;

            }, 1000);

            setTimeout(()=>{
                Debugger = false;

            }, 1100);

        }

    });

    // Animate Function
    function ThemeButtonAnimation(HideIcon, ShowingIcon, ThemeToSetCookie){

        //////////// Hidding Icon
        HideIcon.animate({
            'top': '50px',
            'opacity': '0',
            'font-size': '0px'
        }, 1000, ()=>{
            HideIcon.css({
                'display': 'none',
                'top': '50%',
                'left': '50%',
                'transform': 'translate(-50%, -50%)',
                '-webkit-transform': 'translate(-50%, -50%)',
                '-moz-transform': 'translate(-50%, -50%)',
                '-o-transform': 'translate(-50%, -50%)',
                '-ms-transform': 'translate(-50%, -50%)'

            })
        });

        //////////// Showing Icon
        ShowingIcon.css({
            'bottom': '-80px',
            'display': 'block',
            'opacity': '0',
            'font-size': '0',
        })

        ShowingIcon.animate({
            'bottom': '0', 
            'opacity': '1',
            'font-size': '19px'
        }, 1000);

        // Change Class In Body
        $('body').toggleClass(ThemeClass);

        // Set Cookie
        Cookies.set("currentTheme", ThemeToSetCookie, {
            expires: 30,
            secure: true
        });

    }

    // Get Theme Cookie
    var currentThemeCookie = Cookies.get("currentTheme");

    if(currentThemeCookie == "light-theme"){
        CurrentTheme = "light";
        LightThemeBtn.css("display", "block");
        
        $("body").addClass(ThemeClass);
        
        //////
    }else if(currentThemeCookie == "dark-theme"){
        CurrentTheme = "dark";
        DarkThemeBtn.css("display", "block");

    }else if(currentThemeCookie === undefined || currentThemeCookie === null){
        
        // Check if browser is on light theme
        let clientBrowserTheme = window.matchMedia("(prefers-color-scheme: light)");

        if(clientBrowserTheme.matches && CurrentTheme == 'dark'){
            CurrentTheme = "light";
            LightThemeBtn.css("display", "block");
            
            $("body").addClass(ThemeClass);

        }else{
            CurrentTheme = "dark";
            DarkThemeBtn.css("display", "block");

        }

    }

    ////////////////////////////////
    ////// Header Options Expand Button
    // Variables
    const ExpandHeaderButton = $('header .header-options button#mobile-header-expand-button');
    const HeaderNavigationDiv = $('header .header-navigation');

    var isExpanded = false;

    ExpandHeaderButton.click((e)=>{

        if(isExpanded){
            HeaderNavigationDiv.css('max-height', '0px').css('padding-bottom', '0px');
            ExpandHeaderButton.find('i').removeClass().addClass('fa-solid fa-chevron-down');

            isExpanded = false;
        
        }else{
            HeaderNavigationDiv.css('max-height', '150px').css('padding-bottom', '10px');
            ExpandHeaderButton.find('i').removeClass().addClass('fa-solid fa-chevron-up');

            isExpanded = true;

        }

    });

})
