define([
    'underscore',
    'backbone',
    'models/story'
    ], function(_, Backbone, storyModel) {
        var storyCollection = Backbone.Collection.extend({
            url: '../js/data/uidevtest-data.js',
            model: storyModel,
            initialize: function() {
                this.attach_get_params();
            },
            attach_get_params: function () {
                var match,
                    urlParams = {},
                    pl     = /\+/g,
                    search = /([^&=]+)=?([^&]*)/g,
                    decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
                    query  = window.location.search.substring(1);
                while (match = search.exec(query)) {
                    var key = decode(match[1]),
                        value = decode(match[2]);
                    if (!urlParams[key]) {
                        urlParams[key] = value;
                    } else {
                        urlParams[key] = [].concat(urlParams[key], value);
                    }
                }
                this.get_params = urlParams;
            }
        });
        return storyCollection;
    }
);