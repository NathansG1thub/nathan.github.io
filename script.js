
/* 1. HAMBURGER NAVIGATION TOGGLE */
/*Adds/removes the .nav-open class on #navbar, which CSS uses to:
- Expand the dropdown link list (max-height transition).
- Morph the three bars into an X icon. */

/* Cache DOM references so we are not querying them on every click. */
var navbar     = document.getElementById('navbar');
var hamburger  = document.getElementById('hamburger');
var navLinks   = document.getElementById('nav-links');

/*toggleNav — opens or closes the mobile navigation dropdown. */
/* Also updates the aria-expanded attribute for screen reader accessibility. */
function toggleNav() {
  var isOpen = navbar.classList.toggle('nav-open');
  /* Update ARIA state so screen readers announce the menu state. */
  hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}

/* Attach the click listener to the hamburger button. */
hamburger.addEventListener('click', toggleNav);


/* 2. AUTO-CLOSE NAV ON LINK CLICK */
/* When a user taps an anchor link in the mobile menu, 
close the dropdown automatically rather than leaving it open over the content. */
var allNavLinks = navLinks.querySelectorAll('a');

allNavLinks.forEach(function(link) {
  link.addEventListener('click', function() {
    /* Only close if the nav is actually open (i.e. on mobile). */
    if (navbar.classList.contains('nav-open')) {
      navbar.classList.remove('nav-open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
});


/* 3. SPECIAL OFFER TOGGLE */
/* Shows or hides the offer message panel and updates the button label. */

/* toggleOffer — reveals the hidden offer box when the button is clicked, */
function toggleOffer() {
  var msg = document.getElementById('offer-msg');
  var btn = document.getElementById('offer-btn');

  /* Check current visibility and flip it. */
  if (msg.style.display === 'block') {
    msg.style.display = 'none';
    btn.textContent   = 'See Our Special Offer';
  } else {
    msg.style.display = 'block';
    btn.textContent   = 'Hide Offer';
  }
}
