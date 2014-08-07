Quixey Web Dev Exercise Answer
=======================================

* [About this repo](#about-this-repo)

Hi! This is a response to Quixey's web dev challenge. 

About this repo
---------------

This repository is set up to simulate the front end of a small internal tool, like the kind you might realistically be working on. The best way to run it will be to fork & clone this repository and serve it from your local machine; for example, if you have Python installed, you can serve it like

```sh
$ cd src
$ python -m SimpleHTTPServer
Serving HTTP on 0.0.0.0 port 8000 ...
```

and then visiting `http://localhost:8000` in your browser.

This tool is built to be used by internal testers at Quixey who work on projects set up by search engineers here. It shows a list of all the current projects, and has a little UI for adding new projects to the list. Each project has an ID, a name, a type (there are only a few different project types), and an activity date. (Realistically, it might load this information from a database, but for the purposes of this exercise the 'database' is just an array in `projects.js`.)

##### Note: The new code has been added to project.js to make it cleaner as opposed to writing the code in index.html ###
