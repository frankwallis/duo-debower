# duo-debower

converts bower.json to component.json

intended to be used as a duo build plugin which runs immediately after fetching a package from git.

if a component does not have a component.json but does have a bower.json, then a component.json is
automatically generated using the information in bower.json.

this enables you to require bower packages using their short repo name, e.g.

```
require('angular-bower/angular');
```

when creating the component.json bower dependencies are converted to their github urls using bower.lookup

this project is experimental

the duo build hook is not available yet so to see this you have to use my fork of duo which can be found [here](http://www.github.com/frankwallis/duo/tree/debower)

see this plugin in action [here](http://www.github.com/frankwallis/tower)

roadmap:
- more config options (e.g. scriptExtensions, styleExtensions, amdMappings)
- auto-require bower dependencies?
- deamdify/browserify-shim?
