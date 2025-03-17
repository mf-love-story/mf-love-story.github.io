(function($) {

	"use strict";
    
    $(document).ready(function () {
        // Find the element by ID
        var imageSize = 1724;
        var parentElement = $("#wedding-gallery-grids")
        
        for (let i = 1; i <= imageSize; i++) {
            var imagePath = `in-wedding/image-in-wedding (${i}).jpg`;
            parentElement.append(`
                <div class="grid">
                    <a href="${imagePath}" class="fancybox" data-fancybox-group="gall-1">
                        <img src="${imagePath}" alt>
                    </a>
                </div>
            `);

        }
    });



})(window.jQuery);
