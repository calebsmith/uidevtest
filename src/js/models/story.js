define([
    'underscore',
    'backbone',
    'datejs'
    ], function(_, Backbone) {
        var storyModel = Backbone.Model.extend({
            _cap_first: function(words) {
                // Capitalize the first letter of each word in a sentence
                return words.replace(/([^ \t]+)/g, function(_, word) {
                    return word.charAt(0).toUpperCase() + word.slice(1);
                });
            },
            _comma_join_list: function(words) {
                // Join a list of strings by ', '
                return _.reduce(words, function(memo, word) {
                    return memo ? memo + ', ' + word : word;
                }, '');
            },
            get_title_display: function() {
                return this._cap_first(this.get('title'));
            },
            get_author_display: function() {
                // Display list of authors delimited by ', ' with cap first.
                return this._cap_first(
                    this._comma_join_list(this.get('author'))
                );
            },
            get_categories_display: function() {
                // Display list of categories delimited by ', '
                return this._comma_join_list(this.get('categories_name'));
            },
            _format_datetime: function(dt_string) {
                // Given a datetime string, return a human friendly format
                var datetime = new Date(dt_string);
                var time = datetime.toString('h:mm '),
                    am_pm = datetime.toString('tt '),
                    day = datetime.toString('dddd, MMM. dd, yyyy');
                am_pm = am_pm.toLowerCase();
                return time + am_pm + day;
            },
            get_updated_display: function() {
                return this._format_datetime(this.get('updated'));
            },
            get_pub_date_display: function(){
                return this._format_datetime(this.get('pub_date'));
            }
        });
        return storyModel;
    }
);
