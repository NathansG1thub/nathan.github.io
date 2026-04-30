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

/* CONSTANTS */

/* Base price per person in USD. */
var PRICE_PER_PERSON = 1299;


/* 1. SET MINIMUM DATE ON DATE PICKER  */
/* Prevents users from selecting a past departure date. */
var dateInput = document.getElementById('depart-date');

if (dateInput) {
  /* Get today's date and format it as YYYY-MM-DD, which is what
     the <input type="date"> min attribute expects. */
  var today     = new Date();
  var yyyy      = today.getFullYear();
  /* Month is zero-indexed, so we add 1. padStart ensures two digits. */
  var mm        = String(today.getMonth() + 1).padStart(2, '0');
  var dd        = String(today.getDate()).padStart(2, '0');
  var todayStr  = yyyy + '-' + mm + '-' + dd;

  dateInput.setAttribute('min', todayStr);

  /* Default the date to 30 days from today as a helpful starting point. */
  var defaultDate  = new Date(today);
  defaultDate.setDate(defaultDate.getDate() + 30);
  var dy  = defaultDate.getFullYear();
  var dm  = String(defaultDate.getMonth() + 1).padStart(2, '0');
  var dd2 = String(defaultDate.getDate()).padStart(2, '0');
  dateInput.value = dy + '-' + dm + '-' + dd2;
}


/* 2. DYNAMIC TOTAL PRICE CALCULATOR  */
/* Reads the number of travellers from the select element and multiplies by
   the price per person, then writes the formatted total into #total-price. */

/* updateTotal — recalculates and displays the estimated total price whenever the traveller count changes. */
function updateTotal() {
  var travellersSelect = document.getElementById('travellers');
  var totalEl          = document.getElementById('total-price');

  if (!travellersSelect || !totalEl) return;

  var count = parseInt(travellersSelect.value, 10);
  var total = count * PRICE_PER_PERSON;

  /* Format as a dollar amount with comma separator, e.g. $2,598. */
  totalEl.textContent = '$' + total.toLocaleString('en-US');
}

/* Run once on page load so the default total is correct. */
updateTotal();


/* 3. BOOKING BUTTON HANDLER */
/* Shows a confirmation message and disables the button after clicking.
   In a real implementation this would submit a form to a server. */

/* handleBooking — simulates a booking enquiry submission. */
/* Validates that a date has been selected before proceeding. */
function handleBooking() {
  var dateInput   = document.getElementById('depart-date');
  var confirmEl   = document.getElementById('booking-confirm');
  var ctaBtn      = document.querySelector('.booking-card__cta');

  /* Basic validation: ensure a departure date is selected. */
  if (!dateInput.value) {
    /* Briefly highlight the date field to draw attention to it. */
    dateInput.style.borderColor = '#e85454';
    dateInput.focus();

    /* Reset the border colour after 2 seconds. */
    setTimeout(function() {
      dateInput.style.borderColor = '';
    }, 2000);
    return;
  }

  /* Show the confirmation message. */
  confirmEl.style.display = 'block';

  /* Disable the button so it cannot be clicked again. */
  ctaBtn.disabled         = true;
  ctaBtn.textContent      = 'Enquiry Sent';
  ctaBtn.style.opacity    = '0.6';
  ctaBtn.style.cursor     = 'not-allowed';
  ctaBtn.style.transform  = 'none';
}