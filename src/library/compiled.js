(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['basic.info.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div>\r\n  <div><h3>"
    + container.escapeExpression(((helper = (helper = helpers.welcomeMessage || (depth0 != null ? depth0.welcomeMessage : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"welcomeMessage","hash":{},"data":data}) : helper)))
    + "</h3></div>\r\n  <div class='name'>\r\n    <span>Name: </span><input type='text' /></div>\r\n  </div>\r\n  <div class='age'>\r\n    <span>Age: </span><input type='text' /></div>\r\n  </div>\r\n</div>\r\n";
},"useData":true});
})();