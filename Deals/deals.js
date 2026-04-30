/* CACHE DOM REFERENCES */
var filterBtns  = document.querySelectorAll('.filter-btn');
var pkgCards    = document.querySelectorAll('.pkg-card');
var noResults   = document.getElementById('no-results');


/* filterPackages */
/* Called when any filter button is clicked. --/
/* @param {string} filter - the data-filter value of the clicked button, e.g. "europe", "asia", or "all". */
function filterPackages(filter) {
  var visibleCount = 0;

  /* Loop through every package card and show or hide it. */
  pkgCards.forEach(function(card) {
    var region = card.getAttribute('data-region');

    /* Show the card if "all" is selected, or if its region matches. */
    if (filter === 'all' || region === filter) {
      card.style.display = 'flex';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });

  /* If nothing is visible, show the no-results message. */
  noResults.style.display = visibleCount === 0 ? 'block' : 'none';
}


/* ATTACH CLICK LISTENERS TO FILTER BUTTONS */
filterBtns.forEach(function(btn) {
  btn.addEventListener('click', function() {

    /* Remove the active class from whichever button currently has it. */
    filterBtns.forEach(function(b) {
      b.classList.remove('filter-btn--active');
    });

    /* Add the active class to the clicked button. */
    btn.classList.add('filter-btn--active');

    /* Run the filter using the button's data-filter attribute. */
    filterPackages(btn.getAttribute('data-filter'));
  });
});