define([
    'underscore',
    'backbone',
    'datejs'
    ], function(_, Backbone) {
        var storyModel = Backbone.Model.extend({
            get_title_display: function() {
                var title = this.get('title');
                // Find all words delimited by whitespace and capitalize them
                return title.replace(/([^ \t]+)/g, function(_, word) {
                    return word.charAt(0).toUpperCase() + word.slice(1);
                });
            },
            get_categories_display: function() {
                // Display list of categories delimited by ', '
                var categories_name = this.get('categories_name');
                return _.reduce(categories_name, function(memo, category) {
                    return memo ? memo + ', ' + category : category;
                }, '');
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
