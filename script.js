const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];


// Unsplash API
const count = 5;
const apiKey = 'API_KEY';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images are loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        count = 30;
    }
}

// Helper function to set Attributes on DOM Elements

function setAttributes(element, attributes) {
    for(const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}


// Create elments for links and photos. add to dom

function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach((photo, index) => {
        // Anchor element to link to unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target:'_blank'
        });

        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.description,
            title: photo.description,
        });
        //  Event Listener, check when each is finsihed loading

        img.addEventListener('load', imageLoaded);

        // Put the img inside the anchor element, then put both inside img container
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
    
}


// Get Photos from unsplash API

async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {

    }
}

// Check to see if scrolling near bottom of page, Load More Photos

window.addEventListener('scroll', () => {
    if (window.innerHeight - window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});


// On Load
getPhotos();