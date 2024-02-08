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

        if(ButtonTarget == 'js-scroll-about-me-text'){
            offsetDebug = 160;

        }

        if(ButtonTarget == 'js-scroll-projects-text'){
            offsetDebug = 130;

        }

        if(ButtonTarget == 'js-scroll-knowledge-text' || ButtonTarget == 'js-scroll-contact-text'){
            ElementTarget = ElementTarget.parent();

            if(ButtonTarget == 'js-scroll-knowledge-text'){
                offsetDebug = 100;
            
            }

        }

        HeaderNavigationButtons.parent().removeClass('navigation-selected');
        $(`.header-navigation a[js-scrolltarget=${ButtonTarget}]`).parent().addClass('navigation-selected');
        
        // Scroll
        scrollTo({ 'top': ElementTarget.position().top - offsetDebug, 'behavior': 'smooth' });
    }

    ////////////////////////////////
    ////// Header Options Themes
    // Variables
    const HeaderOptions = $('header .header-options');
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

            setTimeout(()=>{
                Debugger = false;

            }, 1100);

        }

    });

    // Animate Function
    function ThemeButtonAnimation(HideIcon, ShowingIcon, ThemeToSetCookie){

        //////////// Hidding Icon
        HideIcon.animate({
            top: '50px', 
            opacity: 0,
            'font-size': '0px'
        }, 1000, ()=>{
            HideIcon.css('display', 'none').css('top', '50%').css('left', '50%').css('transform', 'translate(-50%, -50%)');

        });

        //////////// Showing Icon
        ShowingIcon.css('bottom', '-80px').css('display', 'block').css('opacity', '0').css('font-size', '0');

        ShowingIcon.animate({
            bottom: '0', 
            opacity: 1,
            'font-size': '19px'
        }, 1000);

        $('body').toggleClass(ThemeClass);

        Cookies.set("CookiesCurrentTheme", ThemeToSetCookie, {
            expires: 90,
            
        });


    }

    // Get Theme Cookie
    var CookiesCurrentTheme = Cookies.get("CookiesCurrentTheme");

    if(CookiesCurrentTheme == "light-theme"){
        CurrentTheme = 'light';
        LightThemeBtn.css('display', 'block');
        
        $('body').addClass(ThemeClass);
        
        //////
    }else if(CookiesCurrentTheme == "dark-theme" || CookiesCurrentTheme == undefined || CookiesCurrentTheme == null){
        CurrentTheme = 'dark';
        DarkThemeBtn.css('display', 'block');

    }

    ////////////////////////////////
    ////// Header Options Expand Button
    // Variables
    const ExpandHeaderButton = $('header .header-options button#mobile-header-expand-button');
    const HeaderNavigationDiv = $('header .header-navigation');

    var isExpanded = false;

    ExpandHeaderButton.click((e)=>{

        if(isExpanded){
            HeaderNavigationDiv.css('max-height', '0px');
            ExpandHeaderButton.find('i').removeClass().addClass('fa-solid fa-chevron-down');

            isExpanded = false;
        
        }else{
            HeaderNavigationDiv.css('max-height', '150px');
            ExpandHeaderButton.find('i').removeClass().addClass('fa-solid fa-chevron-up');

            isExpanded = true;

        }

    });

})
