define([
    'jquery',
    'underscore',
    'backbone',
    'collections/stories'
    ], function($, _, Backbone, storyCollection) {
    var storyListView = Backbone.View.extend({
        el: $("#story-content"),
        initialize: function() {
            var self = this;
            this.template = _.template($("#story-list").html());
            // Build story collection from local JSON data
            this.collection = storyCollection;
            this.collection.bind('completed_loading', this.render, this);
            this.collection.fetch({
                success: function(data) {
                    /*
                    Unpack fetched data into story objects and fill the
                    collection.
                    */
                    var stories = data.toJSON()[0].objects;
                    /*
                    FIXME: This is a hack to remove the autofill behavior
                    that packs the JSON data into one model.
                    */
                    self.collection.reset();
                    self.collection.add(stories);
                    self.collection.is_loaded = true;
                    // Trigger a custom event. NB - add triggers for each model
                    self.collection.trigger('completed_loading');
                }
            });
        },
        render: function() {
            // Early exit on initial load
            if (this.collection.is_loaded !== true) {
                return;
            }
            var self = this;
            var $el = $(this.el);
            var stories = this.collection.models;
            // Render the template
            var data = {
                _: _,
                stories: stories
            };
            var rendered_template = this.template(data);
            $el.fadeOut(function() {
                $el.html(rendered_template);
                $el.fadeIn();
            });
        }
    });
    return new storyListView();
});
