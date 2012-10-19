define([
    'jquery',
    'underscore',
    'backbone',
    'models/story'
    ], function($, _, Backbone, storyModel) {
    var storyDetailView = Backbone.View.extend({
        el: $("#story-content"),
        initialize: function() {
            var self = this;
            this.template = _.template($("#story-detail").html());
        },
        render: function(model) {
            this.model = model;
            var story = model;
            var self = this;
            var $el = $(this.el);
            var data = {
                _: _,
                story: story
            };
            var rendered_template = this.template(data);
            $el.fadeOut('fast', function() {
                $el.html(rendered_template);
                $el.fadeIn('fast');
                $('#story-list-link').click(function(e) {
                    // Pass list view false to indicate this is not the intiial
                    // page load.
                    window.history.pushState({}, '', window.document.location.search);
                    self.storyListView.render(false);
                });
            });
            // If navigating here from the list view, return to the list view
            window.onpopstate = function(event) {
                if (event.state === null) {
                    self.storyListView.render(false);
                }
            };
        }
    });
    return storyDetailView;
});
