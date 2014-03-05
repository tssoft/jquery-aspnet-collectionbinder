jquery-aspnet-collectionbinder
==============================

A simple, lightweight jQuery utility plugin for easy mapping ASP.NET MVC non-sequential collections.

##Installation

```html
<script src="/path/to/jquery.aspnetCollectionBinder.js"></script>
```
###Basic setup
######on DOM change indices update

```javascript
$('#employee-table').aspnetCollectionBinder({
    rowClassName: 'employee-row',
    modelName: 'Employees'
});
```

Plugin will observe element DOM changes and update input fields indices.

###Manual indices update setup

```javascript
$('#employee-table').aspnetCollectionBinder({
    rowClassName: 'employee-row',
    modelName: 'Employees',
    autoUpdate: false
});
```

In this case you need call ```$('#employee-table').aspnetCollectionBinder('update')``` before form submit.
Manual updating may be useful for browsers without Mutation event support.

##Options

###modelName

Property name that using for model binding.

###dataIndexAttr

Row data-attribute name for storing index.

###autoUpdate
###### (default true)

If set true, indexes update on element DOM change.

#About

######Russian
http://ts-soft.ru/blog/jquery-aspnet-collectionbinder






