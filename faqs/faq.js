const hamburgerIcon = document.getElementById('hamburger-icon-div');
const hamburgerMenu = document.getElementById('hamburger-menu');

hamburgerIcon.addEventListener('click', function() {
    // Toggle the visibility of the hamburger menu by changing its display property
    if (hamburgerMenu.style.display === 'block') {
        hamburgerMenu.style.display = 'none';
    } else {
        hamburgerMenu.style.display = 'block';
    }
});


