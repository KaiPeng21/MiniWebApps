
const body = document.querySelector('body');
const currentImg = document.querySelector('#current');
const imgs = document.querySelectorAll('.imgs img');

const opacity = 0.4;

body.onload = ()=>{
    imgs[0].style.opacity = opacity;
}

imgs.forEach((img) => {
    img.addEventListener('click', (event)=>{
        // reset all images
        imgs.forEach((i) => i.style.opacity = 1);

        // change current image src to the clicked image
        currentImg.src = event.target.src;

        // change opacity
        event.target.style.opacity = opacity;

        // remove fade-in class when timeout
        setTimeout(() => {
            currentImg.classList.remove('fade-in');
        }, 500);

        // add fadein class to the current image
        currentImg.classList.add('fade-in');

    });
});

