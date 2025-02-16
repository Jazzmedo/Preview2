document.addEventListener("DOMContentLoaded", function () {
    // Load the shared footer
    fetch('shared-layouts/footer.html')
        .then(response => response.text())
        .then(data => {
            const footerContainer = document.querySelector('#shared-footer');
            footerContainer.innerHTML = data;

            // Ensure all icons are rendered properly
            // Reinitialize FontAwesome icons
            if (typeof FontAwesome !== 'undefined' && FontAwesome.dom && FontAwesome.dom.i2svg) {
                FontAwesome.dom.i2svg();
            }

            // Reinitialize Simple Line Icons if necessary
            if (typeof SimpleLineIcons !== 'undefined' && SimpleLineIcons.init) {
                SimpleLineIcons.init();
            }

            // Handle any lazy-loaded elements in the footer
            if (typeof LazyLoad !== 'undefined') {
                new LazyLoad({ elements_selector: '.lazyload' });
            }

            // Initialize the map after the footer is loaded
            const mapContainer = document.querySelector('#googlemaps');
            if (mapContainer) {
                var map = L.map(mapContainer).setView([25.290867, 55.324891], 14);

                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 18,
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(map);

                L.marker([25.290867, 55.324891]).addTo(map)
                    .bindPopup('<b>Office 1</b><br>Dubai, UAE<br>Phone: 123-456-1234')
                    .openPopup();
            }
        })
        .catch(error => console.error('Error loading footer:', error));
});
