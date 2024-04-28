$(function () {

    // Variables
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    ////////////////
    // Reveal Animations
    var normalReveal = {
        duration: 5000,
        reset: false,
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
    ScrollReveal().reveal('.about-me_text > h2', { ...normalReveal, duration: 4000 });
    ScrollReveal().reveal('.about-me_text > p', { ...AnimatedReveal, duration: 4500, origin: 'right' });

    /* Projects */
    ScrollReveal().reveal('.projects-single-text', { ...normalReveal, duration: 3000 });
    ScrollReveal().reveal('.projects-single-image', { ...normalReveal });
    ScrollReveal().reveal('.projects-more-button', { ...normalReveal });

    /* Technologies */
    ScrollReveal().reveal('.technologies-single-box', { ...normalReveal, duration: 1500, afterReveal: technologiesSingleBoxAnimation });
    ScrollReveal().reveal('button.knowledge-modal-toggle', { ...normalReveal, duration: 1100 });

    ScrollReveal().reveal('h3.swipe-to-soft-skills-text', { ...normalReveal, duration: 1100 });
    ScrollReveal().reveal('i.swipe-to-soft-skills-button', { ...normalReveal, duration: 1100 });

    ////////////////
    // Projects Functions
    const ProjectsWrapper = $('section.projects .projects-wrapper');

    const ProjectsMoreDiv = $('section.projects .projects-more-button');
    const ProjectsMoreButton = $('#projects-more-button');
    var ShowingProjects = 3;

    ProjectsMoreButton.click((e) => {

        let ProjectsSingle = [...$('section.projects div.projects-single')];

        for (let i = ShowingProjects; i < ShowingProjects + 3; i++) {
            $(ProjectsSingle[i]).css('display', 'flex');

            ScrollReveal().clean($(ProjectsSingle[i]));
            ScrollReveal().reveal($(ProjectsSingle[i]));

        }

        ShowingProjects += 3;

        ProjectsWrapper.css('max-height', parseInt(ProjectsWrapper.css('max-height'), 10) + 1125 + 'px');

        if (ShowingProjects >= ProjectsSingle.length) {
            ProjectsMoreDiv.fadeOut(() => {
                ProjectsMoreDiv.css('display', 'none');

            });

        }

    })

    ////////////////
    // Knowledge/Technologies Functions 
    const IClassList = [
        'fa-brands fa-html5',
        'fa-brands fa-css3',
        'fa-brands fa-square-js',
        'fa-brands fa-react',
        'fa-brands fa-php',
        'fa-solid fa-database'
    ]
    var CurrentIClass = 1;
    var LastIClass = null;

    var DynamicIconElement = $('#technologies-dynamic-icon-element');
    DynamicIconElement.hide();

    changeTechnologiesIcon();

    function changeTechnologiesIcon() {

        setInterval(() => {

            // Fade In
            DynamicIconElement.fadeIn(2500, () => {

                // Fade Out
                DynamicIconElement.fadeOut(2500, () => {

                    // Check The Current IClassList
                    if (CurrentIClass >= IClassList.length) {
                        CurrentIClass = 0;

                    }

                    DynamicIconElement.removeClass();

                    // Add Class
                    DynamicIconElement.addClass(IClassList[CurrentIClass]);

                    // Variables Set
                    CurrentIClass++;
                    LastIClass = IClassList[CurrentIClass];

                });

            });

        },
            5000
        )

    }

    ////////////////////////////////////////////////////////////////////////
    function technologiesSingleBoxAnimation(element) {

        let CurrentTechBoxNivel = $(element).find('.tech-single-box-nivel-current').append("<div class='tech-single-box-nivel-current-fill'></div>");

        let CurrentTechBoxNivelAnimation = $(CurrentTechBoxNivel).find('.tech-single-box-nivel-current-fill');

        let TechSingleBoxNivel = $(element).find('.technologies-single-box-nivel');
        let TechSingleCustomLine = $(element).find('.tech-single-box-nivel-custom_line');

        if ($(TechSingleCustomLine[0]).hasClass('tech-single-box-nivel-current')) {
            techAddAbsolutePositionLine(CurrentTechBoxNivelAnimation)

            CurrentTechBoxNivelAnimation.animate({ 'width': '100%' }, 1, () => {

                setTimeout(() => {
                    $(TechSingleBoxNivel.find('p')[1]).addClass('tech-single-box-nivel-current-text');

                }, 1500);

            });

        } else if ($(TechSingleCustomLine[1]).hasClass('tech-single-box-nivel-current')) {
            $(TechSingleCustomLine[0]).append("<div class='tech-single-box-nivel-current-fill'></div>");

            let CurrentFill = $(TechSingleCustomLine[0]).find('.tech-single-box-nivel-current-fill')

            techAddAbsolutePositionLine(CurrentFill)

            CurrentFill.animate({ 'width': '100%' }, 1, () => {

                setTimeout(() => {
                    techAddAbsolutePositionLine(CurrentTechBoxNivelAnimation)

                    CurrentTechBoxNivelAnimation.animate({ 'width': '100%' }, 1, () => {

                        setTimeout(() => {
                            $(TechSingleBoxNivel.find('p')[2]).addClass('tech-single-box-nivel-current-text');;

                        }, 1500);

                    });
                }, 1500)

            });

        } else {
            $(TechSingleBoxNivel.find('p')[0]).addClass('tech-single-box-nivel-current-text');;

        }

    }

    function techAddAbsolutePositionLine(element) {
        element.css('position', 'absolute').css('top', '0').css('left', '0').css('height', '100%').css('width', '0').css('border-radius', '8px').css('transition', 'width 2s ease');
        element.addClass('tech-single-box-nivel-current');

    }

    ////// Knowledge Swipe Between Technologies and Soft Skills
    const KnowledgeContainer = $('#knowledge-container');

    const KnowledgeRightSide = $('#knowledge-container .knowledge-right-side');

    const ButtonSwipeToSoftSkills = $('#knowledge-swipe-to-soft-skills');
    const ButtonSwipeToTechnologies = $('#knowledge-swipe-to-technologies');

    ButtonSwipeToSoftSkills.click(() => {
        KnowledgeContainerSwiper(KnowledgeContainer.width(), false);

    })

    ButtonSwipeToTechnologies.click(() => {
        KnowledgeContainerSwiper(0, true);

    })

    function KnowledgeContainerSwiper(leftPosition, isBackingToTechnologies) {

        if (isMobile) {
            KnowledgeRightSide.css('display', 'block');

            KnowledgeContainer[0].scrollTo({
                left: leftPosition,
                behavior: 'smooth'
            });

            if (isBackingToTechnologies) {
                setTimeout(() => {
                    KnowledgeRightSide.css('display', 'none');

                }, 1250);

            }

            return;
        }

        KnowledgeContainer[0].scrollTo({
            left: leftPosition,
            behavior: 'smooth'
        });

    }

    ////////////////////////////////////////////////////////////////////////
    //// Modals
    const ButtonModalToggle = $('a.modal-toggle, #modal-toggle');

    const ButtonCloseModal = $('.modal .modal-close');

    var CurrentModal;

    /* Open Modal */
    ButtonModalToggle.click((e) => {

        if ($(e.currentTarget).attr('modal-target')) {

            let ModalTarget = $(e.currentTarget).attr('modal-target');

            CurrentModal = $(ModalTarget).fadeIn();
            $('body').toggleClass('modal-prevent-scroll');

            if (ModalTarget == '#project-info-modal') {
                ProjectInfoModalInit($(e.currentTarget));

            }

        }

    })

    ////////////////////////////////
    /* Close Modal Body Propagation */
    $(document).click((e) => {

        e.stopPropagation();

        if ($(e.target).is(CurrentModal)) {
            CloseModal();

        }

    })

    /* Close Modal Button */
    ButtonCloseModal.click(CloseModal)

    /* Close Modal Function */
    function CloseModal() {

        $('body').toggleClass('modal-prevent-scroll');

        CurrentModal.fadeOut(300, () => {
            CurrentModal.css('display', 'none');

            if (CurrentModal.attr('id') == 'project-info-modal') {
                ProjectInfoModalReset();

            }

        });

    }

    ////// Modals -> Project Info Modal
    const ModalProjectInfo = $('div#project-info-modal');

    const ModalProjectInfoTitle = ModalProjectInfo.find('h2.modal-title');

    const ModalProjectInfoImage = ModalProjectInfo.find('img.project-info-modal-image-img');

    const ModalProjectInfoTags = ModalProjectInfo.find('h2.project-info-modal-text-tags');
    const ModalProjectInfoDescription = ModalProjectInfo.find('p.project-info-modal-text-description');

    const ModalProjectInfoTechnologiesDiv = ModalProjectInfo.find('div.project-info-modal-technologies');

    const ModalProjectInfoDeployButton = ModalProjectInfo.find('a.project-info-modal-button-deployed');
    const ModalProjectInfoRepositoryButton = ModalProjectInfo.find('a.project-info-modal-button-repository');

    // Project Info Modal -> Init
    function ProjectInfoModalInit(ModalButtonCaller) {

        // Project Info Div
        let ProjectInfoDiv = $(ModalButtonCaller).parent().parent();

        if (ProjectInfoDiv.hasClass('projects-single')) {

            //// Project Info
            let ProjectInfoTitle = ProjectInfoDiv.data('project-info-title');

            let ProjectInfoImage = ProjectInfoDiv.data('project-info-image') !== null ? ProjectInfoDiv.data('project-info-image') : ProjectInfoDiv.find('.projects-single-image img').attr('src');

            let ProjectInfoTags = ProjectInfoDiv.data('project-info-tags');
            let ProjectInfoDescription = ProjectInfoDiv.data('project-info-description');

            let ProjectInfoTechnologies = ProjectInfoDiv.data('project-info-technologies');

            let ProjectInfoDeployLink = ProjectInfoDiv.data('project-info-deploy-link');
            let ProjectInfoRepositoryLink = ProjectInfoDiv.data('project-info-repository-link');

            //// Modal
            // Modal -> Title
            ModalProjectInfoTitle.text(`${projectsModalPreTitle} ${ProjectInfoTitle}`);

            // Modal -> Image
            ModalProjectInfoImage.attr('src', ProjectInfoImage);

            if (ProjectInfoTitle == 'IBCA Church App') {
                ModalProjectInfoImage.parent().css('background', 'black').css('border-radius', '8px').css('overflow', 'hidden');
                ModalProjectInfoImage.css('transform', 'scale(1.6)').css('object-fit', 'contain');
            }

            // Modal -> Text
            ModalProjectInfoTags.text(ProjectInfoTags);
            ModalProjectInfoDescription.html(ProjectInfoDescription);

            // Modal -> Technologies Create
            if (ProjectInfoTechnologies !== undefined && ProjectInfoTechnologies !== null) {

                ProjectInfoTechnologies.split('|').map((tag) => {

                    ModalProjectInfoTechnologiesDiv.append(`
                        <i class="${tag}"></i>
                    `);

                })

            }

            // Modal -> Buttons
            ProjectInfoDeployLink !== null && ProjectInfoDeployLink !== undefined ? ModalProjectInfoDeployButton.removeClass('ahref-disabled').attr('href', ProjectInfoDeployLink).attr('target', '_blank') : ''

            ProjectInfoRepositoryLink !== null && ProjectInfoRepositoryLink !== undefined ? ModalProjectInfoRepositoryButton.removeClass('ahref-disabled').attr('href', ProjectInfoRepositoryLink).attr('target', '_blank') : ''

        } else {
            CloseModal();

        }

    }

    // Project Info Modal -> Reset
    function ProjectInfoModalReset() {

        ModalProjectInfoTitle.text(`${projectsModalPreTitle} \${PROJECT_TITLE}`);

        // Modal -> Image
        ModalProjectInfoImage.attr('src', '/public/assets/logo-2.png');
        ModalProjectInfoImage.css('transform', 'scale(1)').css('object-fit', 'cover');
        ModalProjectInfoImage.parent().css('background', 'transparent').css('border-radius', '8px').css('overflow', 'visible');

        // Modal -> Text
        ModalProjectInfoTags.text('${PROJECT_TAGS}');
        ModalProjectInfoDescription.text('${PROJECT_DESCRIPTION}');

        // Modal -> Technologies Create
        ModalProjectInfoTechnologiesDiv.empty();

        // Modal -> Buttons
        ModalProjectInfoDeployButton.addClass('ahref-disabled').attr('href', '#project-info-deployed').attr('target', '_self');
        ModalProjectInfoRepositoryButton.addClass('ahref-disabled').attr('href', '#project-info-repository').attr('target', '_self');

    }

})
