jquery-aspnet-collectionbinder
==============================

A simple, lightweight jQuery utility plugin for easy mapping ASP.NET MVC non-sequential collections.

#Installation

```html
<script src="/path/to/jquery.aspnetCollectionBinder.js"></script>
```
###Basic setup (index update on DOM changes)

```javascript
$('#employee-table').aspnetCollectionBinder({
    rowClassName: 'employee-row',
    modelName: 'Employees'
});
```

Plugin will observe element DOM changes and update input fields indices.

###Manual index update setup


```javascript
$('#employee-table').aspnetCollectionBinder({
    rowClassName: 'employee-row',
    modelName: 'Employees',
    autoUpdate: false
});
```

In this case you need call ```$('#employee-table').aspnetCollectionBinder('update')``` before form submit.
Manual updating may be useful for browsers without Mutation event support.

#About

######Russian:
http://ts-soft.ru/blog/jquery-aspnet-collectionbinder






