$(document).ready(function () {
  const locations = {};
  $('input[type="checkbox"]').change(function () {
    if ($(this).is(':checked')) {
      locations[$(this).data('id')] = $(this).data('name');
    } else {
      delete locations[$(this).data('id')];
    }
    $('.locations h4').text(Object.values(locations).join(', '));
  });

  $('button').click(function () {
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ locations: Object.keys(locations) }),
      success: function (data) {
        $('section.places').empty();
        for (let place of data) {
          $('section.places').append(
            `<article>
              <div class="title_box">
                <h2>${place.name}</h2>
                <div class="price_by_night">$${place.price_by_night}</div>
              </div>
              <div class="information">
                <div class="max_guest">${place.max_guest} Guests</div>
                <div class="number_rooms">${place.number_rooms} Bedrooms</div>
                <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
              </div>
              <div class="description">
                ${place.description}
              </div>
            </article>`
          );
        }
      }
    });
  });

  $('h2 span').click(function () {
    const span = $(this);
    if (span.text() === 'show') {
      $.get('http://0.0.0.0:5001/api/v1/reviews/', function (data) {
        for (let review of data) {
          $('.reviews').append(
            `<div class="review">
              <h3>From ${review.user} on ${review.date}</h3>
              <p>${review.text}</p>
            </div>`
          );
        }
      });
      span.text('hide');
    } else {
      $('.reviews').empty();
      span.text('show');
    }
  });
});
