const slider = document.getElementById("slider");
const dots = document.querySelectorAll(".dot");
let index = 0;
const total = dots.length;

function showSlide(i) {
    const slideWidth = slider.clientWidth;
    slider.scrollTo({ left: i * slideWidth, behavior: "smooth" });
    dots.forEach(dot => dot.classList.remove("active"));
    dots[i].classList.add("active");
}

function nextSlide() {
    index = (index + 1) % total;
    showSlide(index);
}

function prevSlide() {
    index = (index - 1 + total) % total;
    showSlide(index);
}

dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
        index = i;
        showSlide(index);
    });
});

setInterval(nextSlide, 3000);