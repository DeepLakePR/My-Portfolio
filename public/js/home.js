$(function(){
    
    // Variables

    ////////////////
    // Reveal Animations
    var normalReveal = { 
        duration: 5000, 
        reset: true,
        mobile: false
    };

    var AnimatedReveal = {
        duration: 4000,
        reset: true,
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
    ScrollReveal().reveal('.projects-single-text', {...normalReveal, duration: 3000, reset: false});
    ScrollReveal().reveal('.projects-single-image', {...normalReveal, reset: false});
    ScrollReveal().reveal('.projects-more-button', {...normalReveal, reset: false});

    /* Technologies */
    ScrollReveal().reveal('.technologies-single-box', {...normalReveal, duration: 1500, reset: false});

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

})
