$(()=>{

    // Languages Update Test Branch

    $('button.language-test').on('click', ()=>{


        fetch("https://api.edenai.run/v2/translation/automatic_translation", {
                    method: "POST",
                    url: "https://api.edenai.run/v2/translation/automatic_translation",
                    headers: {
                        authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiN2E5Y2Q3YTAtYjhiNS00ZDFhLWIwNDItOGM1NzNkZTk4NzRhIiwidHlwZSI6ImFwaV90b2tlbiJ9.DJzrPPlt-5dnDII5N_P8EKvihs4CyFbxs81c1-feRjc",
                    },
                    data: {
                        providers: "amazon,google,ibm,microsoft",
                        text: $('.test-lang-p').text(),
                        source_language: "pt-BR",
                        target_language: "en-US",
                        fallback_providers: "",
                    },
                }).then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.error(error);
                });

        /*
        $('h1, h2, h3, p, span, b, a, button').each((i, element)=>{

            if($(element).text() !== '' && $(element).text() !== undefined){

                let ElementText = $(element).text();

                /*
                const options = {
                    method: "POST",
                    url: "https://api.edenai.run/v2/translation/automatic_translation",
                    headers: {
                        authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiN2E5Y2Q3YTAtYjhiNS00ZDFhLWIwNDItOGM1NzNkZTk4NzRhIiwidHlwZSI6ImFwaV90b2tlbiJ9.DJzrPPlt-5dnDII5N_P8EKvihs4CyFbxs81c1-feRjc",
                    },
                    data: {
                        providers: "amazon,google,ibm,microsoft",
                        text: ElementText,
                        source_language: "pt-BR",
                        target_language: "en-US",
                        fallback_providers: "",
                    },
                };
                

                fetch("https://api.edenai.run/v2/translation/automatic_translation", {
                    method: "POST",
                    url: "https://api.edenai.run/v2/translation/automatic_translation",
                    headers: {
                        authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiN2E5Y2Q3YTAtYjhiNS00ZDFhLWIwNDItOGM1NzNkZTk4NzRhIiwidHlwZSI6ImFwaV90b2tlbiJ9.DJzrPPlt-5dnDII5N_P8EKvihs4CyFbxs81c1-feRjc",
                    },
                    data: {
                        providers: "amazon,google,ibm,microsoft",
                        text: ElementText,
                        source_language: "pt-BR",
                        target_language: "en-US",
                        fallback_providers: "",
                    },
                }).then((response) => {
                    $(element).text(response.text);
                })
                .catch((error) => {
                    console.error(error);
                });

            }

        })
*/
    });

})
