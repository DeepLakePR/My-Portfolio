$(function(){
    
    // Variables

    ////////////////
    // Reveal Animations
    var normalReveal = { 
        duration: 5000, 
        reset: false,
        mobile: false
    };

    var AnimatedReveal = {
        duration: 4000,
        reset: false,
        distance: '100%',
        origin: 'bottom',
        opacity: 0
    }

    /* Apresentation */
    ScrollReveal().reveal('.apresentation-text, .apresentation-image', normalReveal);
    
    /* End to End Applications */
    ScrollReveal().reveal('#end-to-end-applications-text-animation', AnimatedReveal);

    /* About Me */
    ScrollReveal().reveal('.about-me_text > h2', {...normalReveal, duration: 4000});
    ScrollReveal().reveal('.about-me_text > p', {...AnimatedReveal, duration: 4500, origin: 'right'});

    /* Projects */
    ScrollReveal().reveal('.projects-single-text', {...normalReveal, duration: 3000});
    ScrollReveal().reveal('.projects-single-image', {...normalReveal});
    ScrollReveal().reveal('.projects-more-button', {...normalReveal});

    /* Technologies */
    ScrollReveal().reveal('.technologies-single-box', {...normalReveal, duration: 1500, afterReveal: technologiesSingleBoxAnimation });
    ScrollReveal().reveal('#knowledge-modal-toggle', {...normalReveal, duration: 1500 });

    ////////////////
    // Projects Functions
    const ProjectsWrapper = $('section.projects .projects-wrapper');
    
    const ProjectsMoreDiv = $('section.projects .projects-more-button');
    const ProjectsMoreButton = $('#script_projects-more-button');
    var ShowingProjects = 3;

    ProjectsMoreButton.click((e)=>{

        let ProjectsSingle = [...$('section.projects div.projects-single')];

        for(let i = ShowingProjects; i < ShowingProjects + 3; i++){
            $(ProjectsSingle[i]).css('display', 'flex');

            ScrollReveal().clean($(ProjectsSingle[i]));
            ScrollReveal().reveal($(ProjectsSingle[i]));

        }

        ShowingProjects += 3;

        ProjectsWrapper.css('max-height', parseInt(ProjectsWrapper.css('max-height'), 10) + 1125 + 'px');

        if(ShowingProjects >= ProjectsSingle.length){
            ProjectsMoreDiv.fadeOut(()=>{

                ProjectsMoreDiv.css('display', 'none');

            });

        }

    })

    // Technologies Functions 
    const IClassList = [
        'fa-brands fa-html5',
        'fa-brands fa-css3',
        'fa-brands fa-square-js',
        'fa-brands fa-react',
        'fa-brands fa-php',
        'fa-solid fa-database'
    ]
    var CurrentIClass = 0;
    var LastIClass;

    let Interval;

    var DynamicImageElement = $('#technologies-dynamic-image-element');

    changeTechnologiesImage();

    function changeTechnologiesImage(){

        clearInterval(Interval);

        if(LastIClass == null){
            DynamicImageElement.fadeOut(0);
        }

        Interval = setInterval(()=>{

            DynamicImageElement.removeClass(LastIClass ? LastIClass : '');

            if(CurrentIClass >= IClassList.length){
                
                CurrentIClass = 0;

                changeTechnologiesImage();

            }

            DynamicImageElement.addClass(IClassList[CurrentIClass]);
            
            DynamicImageElement.fadeIn(1900, ()=>{
                DynamicImageElement.fadeOut(1900);

            });

            LastIClass = IClassList[CurrentIClass];
            CurrentIClass++;

        },
            5000
        )

    }

    ////////////////////////////////////////////////////////////////////////
    function technologiesSingleBoxAnimation(element){

        let CurrentTechBoxNivel = $(element).find('.tech-single-box-nivel-current').append("<div class='tech-single-box-nivel-current-fill'></div>");

        let CurrentTechBoxNivelAnimation = $(CurrentTechBoxNivel).find('.tech-single-box-nivel-current-fill');

        let TechSingleBoxNivel = $(element).find('.technologies-single-box-nivel');
        let TechSingleCustomLine = $(element).find('.tech-single-box-nivel-custom_line');

        if($(TechSingleCustomLine[0]).hasClass('tech-single-box-nivel-current')){
            techAddAbsolutePositionLine(CurrentTechBoxNivelAnimation)

            CurrentTechBoxNivelAnimation.animate({'width': '100%'}, 1, ()=>{

                setTimeout(()=>{
                    $(TechSingleBoxNivel.find('p')[1]).addClass('tech-single-box-nivel-current-text');

                }, 1500);

            });

        }else if($(TechSingleCustomLine[1]).hasClass('tech-single-box-nivel-current')){
            $(TechSingleCustomLine[0]).append("<div class='tech-single-box-nivel-current-fill'></div>");

            let CurrentFill = $(TechSingleCustomLine[0]).find('.tech-single-box-nivel-current-fill')

            techAddAbsolutePositionLine(CurrentFill)

            CurrentFill.animate({'width': '100%'}, 1, ()=>{

                setTimeout(()=>{
                    techAddAbsolutePositionLine(CurrentTechBoxNivelAnimation)
    
                    CurrentTechBoxNivelAnimation.animate({'width': '100%'}, 1, ()=>{

                        setTimeout(()=>{
                            $(TechSingleBoxNivel.find('p')[2]).addClass('tech-single-box-nivel-current-text');;

                        }, 1500);

                    });
                }, 1500)

            });

        }else{
            $(TechSingleBoxNivel.find('p')[0]).addClass('tech-single-box-nivel-current-text');;

        }

    }

    function techAddAbsolutePositionLine(element){
        element.css('position', 'absolute').css('top', '0').css('left', '0').css('height', '100%').css('width', '0').css('border-radius', '8px').css('transition', 'width 2s ease');
        element.addClass('tech-single-box-nivel-current');
        
    }

    ////////////////////////////////////////////////////////////////////////
    //// Modals
    const ButtonModalToggle = $('#modal-toggle');

    var CurrentModal;

    ButtonModalToggle.click((e)=>{

        if($(e.currentTarget).attr('modal-target')){

            let ModalTarget = $(e.currentTarget).attr('modal-target');

            CurrentModal = $(ModalTarget).fadeIn();

        }

        

    })

    $(document).click((e)=>{
        
        e.stopPropagation();

        if($(e.target).is(CurrentModal)){
            CurrentModal.fadeOut(300, ()=>{
                CurrentModal.css('display', 'none');
        
            });
        }

    })

})
