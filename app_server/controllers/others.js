/* GET about page. */
module.exports.about = function(req, res, next) {
  res.render('generic-text', {
    title: 'About Loc8r',
    content: 'Loc8r was created to help people find places to sit down and get a bit of work done.\n\nLorem ipsum dolor sit amet, mea utinam accumsan principes ut, ei quidam antiopam explicari usu. Nec debet repudiare moderatius ut, tota accusam instructior at cum, augue alienum vel et. Te qui exerci laudem percipit, vix ea ullum dissentiet, ad quo eius tacimates quaerendum. Vis id clita equidem. Mei tation doctus efficiantur id. Mei ea viris postea deterruisset, dolor integre atomorum vel at. Qui scaevola praesent principes ea.\n\nEripuit voluptua eu his, dicta mentitum sadipscing te sit. Nobis primis doming ne vis, cu nec ridens explicari liberavisse. Pri malis atqui doming eu, an atqui augue meliore mei, ius platonem partiendo principes ad. Graece vivendum eu vel, ei mea blandit expetendis. No quo movet graeco delenit, ius no diceret inermis suavitate, at eos diceret expetenda.'
  });
};

module.exports.angularApp = function(req, res) {
  res.render('layout', {title: 'Loc8r'});
};
