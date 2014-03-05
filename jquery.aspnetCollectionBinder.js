(function ($) {
    var aspnetCollectionBinder = {
        _cfg: {
            event: 'DOMNodeInserted',
            modelName: '',
            hiddenIndexFieldClass: 'aspModelIndexer-hidden-index',
            dataIndexAttr: 'data-index',
            autoUpdate: true
        },
        init: function (cfg) {
            $.extend(this._cfg, cfg);
            this._cfg.rowSelector = '.' + this._cfg.rowClassName;
            $.each(this._cfg, function (index, prop) {
                if (typeof prop === 'string') {
                    return $.trim(prop);
                }
            });
            var isRow = function ($element) {
                return $element.hasClass(this._cfg.rowClassName);
            }.bind(this);
            if (this._cfg.event && this._cfg.autoUpdate) {
                this._el.on(this._cfg.event, function (ev) {
                    var smartAssMode = this._cfg.rowSelector
                        && this._cfg.event === 'DOMNodeInserted';
                    if (smartAssMode) {
                        var $target = $(ev.originalEvent.target);
                        if (isRow($target)) {
                            this.update();
                        }
                    } else {
                        this.update();
                    }
                }.bind(this));
            }
            this.update();
            return this._el;
        },
        update: function () {
            var notIndexedRowSelector = ':not([{0}])'.replace('{0}', this._cfg.dataIndexAttr);
            var notIndexedRows = {};
            if (!this._cfg.rowSelector) {
                notIndexedRows = this._el.find(notIndexedRowSelector);
            } else {
                notIndexedRowSelector = this._cfg.rowSelector + notIndexedRowSelector;
                notIndexedRows = this._el.find(notIndexedRowSelector);
            }
            if (!this._lastIndex || this._lastIndex <= 0) {
                var rows = {};
                if (!this._cfg.rowSelector) {
                    rows = this._el.children();
                } else {
                    rows = this._el.find(this._cfg.rowSelector);
                }
                this._lastIndex = rows.length - notIndexedRows.length;
            }
            if (this._lastIndex == 0) {
                this._lastIndex = 1;
            }
            notIndexedRows.each(function (index, row) {
                var nextIndex = this._lastIndex++;
                var rowInputSelector = '';
                if (!this._cfg.modelName) {
                    rowInputSelector = 'input[name]:not([type="button"]):not([type="button"])';
                } else {
                    rowInputSelector = 'input[name*="{0}"]:not([type="button"]):not([type="button"])'.replace('{0}', this._cfg.modelName);
                }
                var $row = $(row);
                $row.find(rowInputSelector)
                    .each(function (i, input) {
                        this.setInputIndex(nextIndex, $(input));
                    }.bind(this));
                var hiddenIndexSelector = this._cfg.modelName + '.Index';
                var rowHiddenIndex = $row.find(hiddenIndexSelector);
                if (rowHiddenIndex && rowHiddenIndex.length > 0) {
                    rowHiddenIndex.val(nextIndex);
                } else {
                    this.appendHiddenIndexInput(nextIndex, $row);
                }
                $row.attr(this._cfg.dataIndexAttr, nextIndex);
            }.bind(this));
            return this._el;
        },
        appendHiddenIndexInput: function (index, row) {
            var self = this;
            index = index || this._lastIndex;
            $('<input/>', {
                type: 'hidden',
                name: self._cfg.modelName + '.Index',
                value: index
            }).appendTo(row);
            return this._el;
        },
        setInputIndex: function (index, input) {
            var fieldName = input.attr('name');
            var indexRegExp = new RegExp("(\\[\\d+\\])");
            var newFieldName = fieldName.replace(indexRegExp, '[' + index + ']');
            input.attr('name', newFieldName);
            return this._el;
        },
        setCounterValue: function (val) {
            if (!isNaN(parseFloat(val)) && isFinite(val)) {
                this._lastIndex = val;
            }
        }
    };

    $.fn.aspnetCollectionBinder = function (method) {
        var instanceDataName = 'asp-collection-binder-instance';
        var binder = this.data(instanceDataName);
        if (!binder) {
            binder = Object.create(aspnetCollectionBinder);
            binder._el = this;
            this.data(instanceDataName, binder);
        }
        if (binder[method]) {
            return binder[method].apply(binder, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return binder.init.apply(binder, arguments);
        } else {
            $.error('aspnetCollectionBinder: Method "' + method + '" not exists');
        }
    };

})(jQuery);