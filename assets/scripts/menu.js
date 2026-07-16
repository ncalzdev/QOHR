document.querySelector(".hamburger")?.addEventListener("click", () => {
    document.querySelector(".nav-links")?.classList.toggle("expanded");

    document.querySelector(".hamburger")?.classList.toggle("hidden");
    document.querySelector(".hamburger-x")?.classList.toggle("hidden");
});
document.querySelector(".hamburger-x")?.addEventListener("click", () => {
    document.querySelector(".nav-links")?.classList.toggle("expanded");

    document.querySelector(".hamburger")?.classList.toggle("hidden");
    document.querySelector(".hamburger-x")?.classList.toggle("hidden");
});