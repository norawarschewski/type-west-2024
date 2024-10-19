document.addEventListener('DOMContentLoaded', function () {
    let basePath = '';
    if (window.location.pathname.includes('/typeface/')) {
        basePath = '../../'; // If inside the "typeface" folder, go up two levels
    }        

    // Get the current path and extract the folder name
    const pathArray = window.location.pathname.split('/');
    const slug = pathArray[pathArray.length - 2]; // Assuming 'index.html' is the last item

    // Fetch the student data
    fetch(`${basePath}assets/js/students.json`)  // Use backticks for string interpolation here
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Fetched data:', data); // Debug log
            const student = data.find(student => student.slug === slug);
            console.log('Found student:', student); // Debug log
            
            // Assuming 'data' is an array of student objects
            // Sort students by slug
            data.sort((a, b) => a.slug.localeCompare(b.slug));

            // Find the current student by slug
            const currentIndex = data.findIndex(student => student.slug === slug);

            // Find previous and next students
            const prevStudent = data[currentIndex + 1];
            const nextStudent = data[currentIndex - 1];

            // Set previous project link if it exists
            const prevLink = document.querySelector('.prev');
            if (prevStudent) {
                prevLink.href = `../${prevStudent.slug}/`;
                prevLink.querySelector('span').textContent = prevStudent.name; 
            } 

            // Set next project link if it exists
            const nextLink = document.querySelector('.next');
            if (nextStudent) {
                nextLink.href = `../${nextStudent.slug}/`;
                nextLink.querySelector('span').textContent = nextStudent.name; 
            } 

            if (student) {
                const studentInfo = `${student.name} · ${student.location}`;
                const title = `${student.typefaceName} by ${student.name} · ${student.year}`; // Change year here
                
                document.getElementById('bio').textContent = student.bio;
                document.getElementById('aboutStudentName').textContent = `About ${student.name}`;
                document.getElementById('typefaceDesc').textContent = student.typefaceDesc;
                document.getElementById('studentInfo').textContent = studentInfo;

                document.title = title;
                
                const socialLinks = document.querySelector('.module--social');

                if (student.instagram) {
                    const instagramLink = document.createElement('li'); // Create the list item element
                    instagramLink.innerHTML = `<a href="https://www.instagram.com/${student.instagram}/" target="_blank" title="Instagram" role="link"><svg><use xlink:href="#instagram" /></svg></a>`;
                    socialLinks.appendChild(instagramLink); // Append the list item to the social links
                }

                if (student.mastodon) {
                    const mastodonLink = document.createElement('li');
                    mastodonLink.innerHTML = `<a href="${student.mastodon}" target="_blank" title="Mastodon" role="link"><svg><use xlink:href="#mastodon" /></svg></a>`;
                    socialLinks.appendChild(mastodonLink);
                }

                if (student.twitter) {
                    const twitterLink = document.createElement('li');
                    twitterLink.innerHTML = `<a href="https://www.twitter.com/${student.twitter}/" target="_blank" title="Twitter/X" role="link"><svg><use xlink:href="#twitter" /></svg></a>`;
                    socialLinks.appendChild(twitterLink);
                }

                if (student.website) {
                    const websiteLink = document.createElement('li');
                    websiteLink.innerHTML = `<a href="${student.website}" target="_blank" title="Website" role="link"><svg><use xlink:href="#website" /></svg></a>`;
                    socialLinks.appendChild(websiteLink);
                }

                // Update the iframe with video data
                const graduationVideo = student.graduationVideo[0]; // Assuming you want the first video
                if (graduationVideo) {
                    const iframe = document.querySelector('iframe'); // Select the iframe element
                    iframe.src = graduationVideo.src; // Set the iframe src
                    iframe.title = graduationVideo.title; // Set the iframe title
                }

                // Populate all elements with the class 'typeface-name'
                const typefaceElements = document.getElementsByClassName('typefaceName');
                for (let element of typefaceElements) {
                    element.textContent = student.typefaceName;
                }

                // Populate the specimens section
                const specimensSection = document.querySelector('.specimens');
                student.specimenImages.forEach(specimen => {
                    const figureElement = document.createElement('figure');

                    const imgElement = document.createElement('img');
                    imgElement.src = `../../assets/specimens/${student.slug}/${specimen.src}`; // Set the source to the specimen image URL
                    imgElement.alt = specimen.alt; // Set the alt text

                    const figcaptionElement = document.createElement('figcaption');
                    figcaptionElement.textContent = specimen.caption; // Set the caption text

                    // Append img and figcaption to figure
                    figureElement.appendChild(imgElement);
                    figureElement.appendChild(figcaptionElement);

                    // Append figure to the specimens section
                    specimensSection.appendChild(figureElement);
                });

                // Fontsampler initialization
                (function(student) {
                    // Create fontFiles object from the student's fontFiles array
                    const fontFiles = {};
                    student.fontFiles.forEach(font => {
                        fontFiles[font.style] = font.src; // Map style to source
                    });

                    const panagram = student.pangram;
                    var fonts = [];
                    for (let key in fontFiles) {
                        var singleFont = {
                            name: key,
                            files: ["../../assets/specimens/" + slug + "/" + fontFiles[key]]
                        };
                        fonts.push(singleFont);
                    }

                    var options = {
                        initialText: panagram,
                        order: [["fontfamily", "alignment", "fontsize"], "tester"],
                        config: {
                            fontfamily: { label: false, init: 0 },
                            fontsize: { init: 72, step: 1, min: 12, max: 100, unit: "px", label: " " },
                            alignment: { label: false, choices: ["left|Left", "center|Center", "right|Right"] }
                        }
                    };

                    if (window.screen.width <= 768) {
                        options.config.fontsize.init = 32; // Adjust for smaller screens
                        options.config.fontsize.max = 72;
                    }

                    var demo = new Fontsampler(document.getElementById("demo"), fonts, options);
                    FontsamplerSkin(demo);
                    demo.init();
                })(student); // Pass student into the IIFE
            } else {
                console.error('Student not found');
                document.getElementById('aboutStudentName').textContent = "About"; // Optional: handle case when student not found
            }
        })
        .catch(error => console.error('Error fetching student data:', error));
});
