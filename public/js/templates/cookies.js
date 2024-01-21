$(()=>{

    // Variables
    const CookiesWrapper = $('div.cookies-privay-wrapper');
    var CookiesAgreeButton = $('button.cookies-wrapper-actions-button-agree');

    // Functions
    CookiesAgreeButton.click((e)=>{
        
        // Cookie Setted for 3 Months, after this the cookie expires automatically;
        Cookies.set("CookiesAgreed", "true", {
            expires: 90,
            
        });

        if(Cookies.get("CookiesAgreed") !== undefined){
            CookiesWrapper.fadeOut(300, ()=>{
                CookiesWrapper.remove();
    
            })

        }else{
            alert('Não foi possível aceitar os cookies, verifique se os cookies não estão bloqueados neste site.');

        }

    })

    ///////////////////////////
    // Check if Cookies is Agreed
    var CookiesIsAgreed = Cookies.get("CookiesAgreed");

    if(CookiesIsAgreed == "true" && CookiesIsAgreed !== undefined){
        CookiesWrapper.remove();

    }else{
        CookiesWrapper.css('opacity', '1');

    }

})
