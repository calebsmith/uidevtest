The following is a brief explanation of some of the choices that were made in the process of completing this task, along with some instructions on how to view the results.


Instructions
------------

I included a python script that uses simpleHTTPServer to serve the static assets and mitigate any problems from the cross origin policy. To run, navigate to /src and run serve.py per the usual methods of 'python serve.py' or './serve.py'. To view the project, navigate to 'localhost:8000/html/' in a browser.


Explanation of decisions
------------------------

Early in the project, I spent some time adding the various javascript libraries and boilerplate code that seemed absolutely necessary. This mainly included:

* HTML 5 boilerplate
* Twitter bootstrap
* Underscore.js

After running into a few walls with the cross origin policy, I decided to just use watch for compiling less files in development, rather than relying on less.js. I made a simple bash script in /src/run_watch.sh to simplify this task. I implemented this before creating the python script to serve the /src directory and would probably just use less.js otherwise. However, using the bash script helps automate committing the compiled css files into the repository.

I decided to add Backbone.js and require.js after considering the amount of javascript I wanted to write. I was especially thinking about the need to isolate the functions I wanted to apply to JSON data for presentation, and the controller code I wanted to write for transitioning between "loading", list and detail views.

While adding Backbone and require.js helped organize the javascript code overall, it may have been simpler to use jQuery along with underscore templates given the time frame. A lot of time was spent wiring up all of the moving parts rather than working towards the overall goal. However, these tools helped me set up the project in such a way that future additions would be much easier.

Given more time, I would implement the following changes:

    * Improve the style and general implementation of the pushState code.
    * Search for a more readable and better solution to splitting story bodies in js/models/story get_story_display().
    * Remove unused libraries from the repository such as modernizr and most of the bootstrap less files.
    * Browser test the project in IE
