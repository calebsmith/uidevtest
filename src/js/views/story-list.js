define([
    'jquery',
    'underscore',
    'backbone',
    'collections/stories',
    'views/story-detail'
    ], function($, _, Backbone, storyCollection, storyDetailView) {
    var storyListView = Backbone.View.extend({
        el: $("#story-content"),
        initialize: function() {
            var self = this;
            this.template = _.template($("#story-list").html());
            // Build story collection from local JSON data
            this.detail_view = new storyDetailView();
            this.collection = new storyCollection();
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
            $el.fadeOut('fast', function() {
                $el.html(rendered_template);
                $el.fadeIn('fast');
                self.bind_links();
            });
        },
        bind_links: function() {
            var self = this;
            var link_element_groups = [
                $('#story-content .story-thumbnail'),
                $('#story-content .headline')
            ];
            _.each(link_element_groups, function(link_element_group) {
                _.each(link_element_group, function(link_element){
                    var $link_element = $(link_element);
                    $link_element.click(function(e){
                        var storyIndex = $link_element.data().storyIndex;
                        self.detail_view.storyListView = self;
                        self.detail_view.render(
                            self.collection.models[storyIndex - 1]
                        );
                    });
                });
            });
        }
    });
    return new storyListView();
});
