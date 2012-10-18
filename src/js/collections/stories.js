define([
    'underscore',
    'backbone',
    'models/story'
    ], function(_, Backbone, storyModel) {
        var storyCollection = Backbone.Collection.extend({
           url: '../js/data/uidevtest-data.js'
        });
        return new storyCollection({model:storyModel});
    }
);