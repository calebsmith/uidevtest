require.config({
    paths: {
        jquery: 'libs/jquery-1.8.0.min',
        underscore: 'libs/underscore.min',
        backbone: 'libs/backbone.min',
        modernizr: 'libs/modernizr-2.6.2.min',
        bootstrap: 'libs/bootstrap.min'
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            deps: ['jquery'],
            exports: '_'
        },
        'bootstrap': {
            deps: ['jquery'],
            exports: 'jquery'
        }
    }
});

require([
    'views/story-list'
    ], function(storyListView){
        storyListView.render();
    }
);
