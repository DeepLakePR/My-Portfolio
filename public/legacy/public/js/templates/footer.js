$(function(){

    $('button.footer-backToTop').click(()=>{

        scrollTo({ 'top': 0, 'behavior': 'smooth' });

        $('nav.header-navigation li').removeClass('navigation-selected');
        $('nav.header-navigation li:nth-child(1)').addClass('navigation-selected');
        

    })
    
})
