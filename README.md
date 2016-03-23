# webpack-multiple-entry-point-splitting-test
Testing webpack config to split resources for different entry points.

Trying to figure out if the following is possible:

Is there a way to config webpack that has multiple entry points as output, that provides required css/images/js into separate folders for each entry point. So with this source:
```
+ src/
  + js/
      appA.js
      appB.js
    - lib/ // shared javascript files
  + images
      appA.png
      appB.png
      shared.png
```

Bundle into this: 

```
+ dist/
  + appA/
      app.js
    + images/
        appA.png
        shared.png
        
  + appB/
      app.js
    + images/
        appB.png
        shared.png
      
```

If you want to help, just clone the repo and npm install
```
git clone git@github.com:Xanderite/webpack-multiple-entry-point-splitting-test.git
npm install
```

