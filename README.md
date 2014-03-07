jquery-aspnet-collectionbinder
==============================

A simple, lightweight jQuery utility plugin for easy mapping ASP.NET MVC non-sequential collections.

##Installation

```html
<script src="/path/to/jquery.aspnetCollectionBinder.js"></script>
```
###Example

#####Model

```csharp
public class Employee
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public int Age { get; set; }
    public string Position { get; set; }
}

public class EmployeeViewModel
{
    public IList<Employee> Employees { get; set; }
}
```

#####View

```html
@model EmployeeViewModel

<div class="page-box">
    <div class="employee-table-box">
        <form id="employeeForm" method="POST" action="@Url.Action("Save")">
            <table id="employee-table" class="employee-table">
                <thead>
                    <tr>
                        <th>Full name</th>
                        <th>Age</th>
                        <th>Position</th>
                        <th>
                            <input type="button" id="add-button" value="Add">
                        </th>
                    </tr>
                </thead>
                <tbody>
                    @for (var i = 0; i < Model.Employees.Count; i++)
                    {
                        <tr class="employee-row">
                            <td>
                                @Html.TextBoxFor(model => model.Employees[i].Name)
                                @Html.HiddenFor(model => model.Employees[i].Id)
                            </td>
                            <td>
                                @Html.TextBoxFor(model => model.Employees[i].Age)
                            </td>
                            <td>
                                @Html.TextBoxFor(model => model.Employees[i].Position)
                            </td>
                            <td class="row-control-box">
                                <input class="remove-button" type="button" value="Remove" />
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
            <div>
                <input type="submit" value="Save" />
            </div>
        </form>
    </div>
</div>
```

######Add and remove code

```javascript
var employeeTable = $('#employee-table');
var dynamicTableProto = {
    init: function () {
        employeeTable.on('click', '#add-button', this.addRow);
        employeeTable.on('click', '.remove-button', this.removeRow);
    },
    addRow: function (e) {
        var row = '<tr class="employee-row">'
                 + '<td>'
                    + '<input type="text" name="Employees[0].Name">'
                    + '<input type="hidden" class="" name="Employees[0].Id">'
                + '</td>'

                + '<td>'
                    + '<input type="text" name="Employees[0].Age">'
                + '</td>'

                + '<td>'
                    + '<input type="text" name="Employees[0].Position">'
                + '</td>'
                + '<td>'
                    + '<input class="remove-button" type="button" value="Удалить"/>'
                + '</td>'
            + '</tr>';
        employeeTable.find('tbody').append(row);
        employeeTable.aspnetCollectionBinder('update');
    },
    removeRow: function (e) {
        var $target = $(e.currentTarget);
        $target.parents('.employee-row').remove();
    }
};
var table = Object.create(dynamicTableProto);
table.init();    
```

######Plugin usage

```javascript
$('#employee-table').aspnetCollectionBinder({
    rowClassName: 'employee-row',
    modelName: 'Employees',
    autoUpdate: false
});
```

Make sure that you create input with zero index when adding row.

###Basic setup
######on DOM change indices update

```javascript
$('#employee-table').aspnetCollectionBinder({
    rowClassName: 'employee-row',
    modelName: 'Employees'
});
```

Plugin will observe element DOM changes and update input field names with correct indices.

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

If set true, indices update on element DOM change.

#About

######Russian
http://ts-soft.ru/blog/jquery-aspnet-collectionbinder






