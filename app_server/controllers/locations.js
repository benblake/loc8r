/* GET home page. */
module.exports.homeList = function(req, res, next) {
  res.render('locations-list', {
    title: 'Loc8r - find a place to work with wifi',
    pageHeader: {
      title: 'Loc8r',
      strapline: 'Find a place to work with wifi near you!'
    },
    sidebar: "Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake, or a pint? Let Loc8r help you find the place you're looking for.",
    locations: [{
      name: 'Starcups',
      address: '2433 Rossini Blvd, Windsor ON, N8W 4P9',
      rating: 3,
      facilities: ['Hot drinks', 'Food', 'Premium wifi'],
      distance: '100m'
    },{
      name: 'Starcups',
      address: '2433 Rossini Blvd, Windsor ON, N8W 4P9',
      rating: 4,
      facilities: ['Hot drinks', 'Food', 'Premium wifi'],
      distance: '200m'
    },{
      name: 'Starcups',
      address: '2433 Rossini Blvd, Windsor ON, N8W 4P9',
      rating: 5,
      facilities: ['Hot drinks', 'Food', 'Premium wifi'],
      distance: '300m'
    }]
  });
};

/* GET location info page. */
module.exports.locationInfo = function(req, res, next) {
  res.render('location-info', {
    title: 'Starcups',
    pageHeader: {title: 'Starcups'},
    sidebar: {
      context: 'is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done.',
      callToAction: 'If you\'ve been and you like it - or your don\'t - please leave a review to help other people just like you.',
    },
    location: {
      name: 'Starcups',
      address: '2433 Rossini Blvd, Windsor ON, N8W 4P9',
      rating: 3,
      facilities: ['Hot drinks', 'Food', 'Premium wifi'],
      coords: {lat: 42.3035082, lng: -82.9716585},
      openingTimes: [{
        days: 'Monday - Friday',
        opening: '7:00am',
        closing: '7:00pm',
        closed: false
      },{
        days: 'Saturday',
        opening: '8:00am',
        closing: '5:00pm',
        closed: false
      },{
        days: 'Sunday',
        closed: true
      }],
      reviews: [{
        author: 'Ben Blake',
        rating: 5,
        timestamp: '22 November 2017',
        reviewText: 'What a great place. I can\'t say enough good things about it.'
      },{
        author: 'Benjamin Blake',
        rating: 3,
        timestamp: '21 November 2017',
        reviewText: 'It was okay. Coffee wasn\'t great but the wifi was fast.'
      }]
    }
  });
};

/* GET add review info page. */
module.exports.addReview = function(req, res, next) {
  res.render('location-review-form', {
    title: 'Review Starcups on Loc8r',
    pageHeader: {title: 'Review Starcups'}
  });
};
