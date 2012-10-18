define([
    'jquery',
    'underscore',
    'backbone'
    // 'collections/stories',
    ], function($, _, Backbone) {
    var storyListView = Backbone.View.extend({
        el: $("#story-list"),
        initialize: function() {
            var self = this;
            this.template = _.template($("#story-list").html());
            // Build story collection
            // FIXME: Uncomment below when collection is defined
            /*
            this.collection = storyCollection;
            this.collection.bind('all', this.render, this);
            */
        },
        render: function() {
            var self = this;
            // Render the template
            var data = {
                _: _
            };
            $(this.el).html(this.template(data));
        }
    });
    return new storyListView();
});
