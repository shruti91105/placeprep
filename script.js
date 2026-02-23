// Splash screen timer
setTimeout(() => {
    const splash = document.getElementById("splash");
    splash.style.opacity = "0";
    splash.style.visibility = "hidden";
    document.body.style.overflow = "auto";
}, 2500); // Reduced time for faster entry