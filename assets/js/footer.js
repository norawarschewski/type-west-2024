document.addEventListener('DOMContentLoaded', function () {
// Fetch the footer content
fetch('/assets/js/generalcontent.js')
.then(response => response.json())
.then(footerContent => {
    // Access the first element of the array
    const footerHTML = footer(footerContent[0]); 
    document.getElementById('footerContent').innerHTML = footerHTML; // Update footerContent div

        // Function to generate footer HTML
        function footer(footerData) {
            const year = footerData.year; 
            const footerText = footerData.footerText; 
    
            // Extract social media links from the footerData
            const mastodon = footerData.mastodon;
            const instagram = footerData.instagram;
            const facebook = footerData.facebook;
            const vimeo = footerData.vimeo;
            const youtube = footerData.youtube;
    
            return `
                <h3>${year}</h3>
                <p>${footerText}</p>
    
                <nav role="navigation" aria-label="Social Navigation">
                    <ul class="module--social">
                        ${mastodon ? `<li><a href="${mastodon}" target="_blank" title="Mastodon"><svg><use xlink:href="#mastodon" /></svg></a></li>` : ''}
                        ${instagram ? `<li><a href="${instagram}" target="_blank" title="Instagram"><svg><use xlink:href="#instagram" /></svg></a></li>` : ''}
                        ${facebook ? `<li><a href="${facebook}" target="_blank" title="Facebook"><svg><use xlink:href="#facebook" /></svg></a></li>` : ''}
                        ${vimeo ? `<li><a href="${vimeo}" target="_blank" title="Vimeo"><svg><use xlink:href="#vimeo" /></svg></a></li>` : ''}
                        ${youtube ? `<li><a href="${youtube}" target="_blank" title="YouTube"><svg><use xlink:href="#youtube" /></svg></a></li>` : ''}
                    </ul>
                </nav>
            `;
        }
})

.catch(error => console.error('Error fetching footer content:', error));

});
