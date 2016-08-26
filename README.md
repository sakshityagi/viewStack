# View Stack
It provides you an easy way to manage your angular js multi view mobile application.

## How to get started

1. You can use this component in following ways :
 * Download the view-stack.js and include it in your index.html, after including jquery and angular.
 * `bower install view-stack --save`

2. Add `view-stack` to your main module's list of dependencies.

3. Once you are done with this setup, we are good to use `view-switcher` directive. For having ability to stack the views we need to have a default home view.

```
  <body>
    <div ng-controller="MyHomeCtrl as MyHome" class="slide">
      <div>
      <h3>This is home view</h3>
      </div>
    </div>
    <div view-switcher=""></div>
  </body>

```

Now, in your controller you can push another view on the top of this view using `push` method by injecting `ViewStack` service. you can do it on the click of any button or any event you want.

```
ViewStack.push({
            template: 'View1',
            params: {
            controller: "MyView1Ctrl as MyView1"
          }
       });
```


**Note** : Here `View1.html` is the template you want to push on the top of home view.

Similarly, you can return back to home view by calling `pop` method.

```
ViewStack.pop();
```
In this way you can push multiple views and when required pop the views accordingly.

Note : Please make sure to inlcude angular js and jquery before using this package.

