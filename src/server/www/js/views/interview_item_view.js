define(['exports', 'marionette', 'backbone', 'underscore', 'underscoreString', 'jquery', 'config', 'text!templates/interview_item_tmpl.html'], function (exports, _marionette, _backbone, _underscore, _underscoreString, _jquery, _config, _interview_item_tmpl) {
    'use strict';

    /*
    * @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
    * @Date:   2016-05-04 11:38:41
    * @Last Modified by:   lutzer
    * @Last Modified time: 2016-07-15 14:44:41
    */

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _marionette2 = _interopRequireDefault(_marionette);

    var _backbone2 = _interopRequireDefault(_backbone);

    var _underscore2 = _interopRequireDefault(_underscore);

    var _underscoreString2 = _interopRequireDefault(_underscoreString);

    var _jquery2 = _interopRequireDefault(_jquery);

    var _config2 = _interopRequireDefault(_config);

    var _interview_item_tmpl2 = _interopRequireDefault(_interview_item_tmpl);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var SubmissionItemView = function (_Marionette$ItemView) {
        _inherits(SubmissionItemView, _Marionette$ItemView);

        function SubmissionItemView() {
            _classCallCheck(this, SubmissionItemView);

            return _possibleConstructorReturn(this, (SubmissionItemView.__proto__ || Object.getPrototypeOf(SubmissionItemView)).apply(this, arguments));
        }

        _createClass(SubmissionItemView, [{
            key: 'events',
            value: function events() {
                return {
                    'click .play-button': 'onPlayButtonClicked',
                    'click': 'onClick'
                };
            }
        }, {
            key: 'initialize',
            value: function initialize(options) {}
        }, {
            key: 'getBackgroundImageString',
            value: function getBackgroundImageString() {
                var filesUrl = _config2.default.files_url + this.model.get('_id') + '/';
                if (!this.model.get('image')) return "style=\"background-image: url('images/placeholder.jpg')\"";else return "style=\"background-image: url('" + filesUrl + this.model.get('image').name + "')\"";
            }
        }, {
            key: 'onClick',
            value: function onClick(event) {
                event.preventDefault();
                window.location.href = "#interview/" + this.model.get('_id');
            }
        }, {
            key: 'template',
            get: function get() {
                return _underscore2.default.template(_interview_item_tmpl2.default);
            }
        }, {
            key: 'className',
            get: function get() {
                return 'item-view card';
            }
        }, {
            key: 'templateHelpers',
            get: function get() {
                return {
                    text_truncated: _underscoreString2.default.truncate(this.model.get('text'), _config2.default.stringTruncateShort, '...'),
                    tags: _underscore2.default.unique(_underscore2.default.flatten(_underscore2.default.pluck(this.model.get('attachments'), "tags"))),
                    backgroundImage: this.getBackgroundImageString(),
                    first: function first(array, n) {
                        return _underscore2.default.first(array, n);
                    }
                };
            }
        }, {
            key: 'modelEvents',
            get: function get() {
                return {
                    'change': 'render'
                };
            }
        }]);

        return SubmissionItemView;
    }(_marionette2.default.ItemView);

    exports.default = SubmissionItemView;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3cy9pbnRlcnZpZXdfaXRlbV92aWV3LmpzIl0sIm5hbWVzIjpbIlN1Ym1pc3Npb25JdGVtVmlldyIsIm9wdGlvbnMiLCJmaWxlc1VybCIsImZpbGVzX3VybCIsIm1vZGVsIiwiZ2V0IiwibmFtZSIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJ0ZW1wbGF0ZSIsInRleHRfdHJ1bmNhdGVkIiwidHJ1bmNhdGUiLCJzdHJpbmdUcnVuY2F0ZVNob3J0IiwidGFncyIsInVuaXF1ZSIsImZsYXR0ZW4iLCJwbHVjayIsImJhY2tncm91bmRJbWFnZSIsImdldEJhY2tncm91bmRJbWFnZVN0cmluZyIsImZpcnN0IiwiYXJyYXkiLCJuIiwiSXRlbVZpZXciXSwibWFwcGluZ3MiOiI7QUFBQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQWdCTUEsa0I7Ozs7Ozs7Ozs7O3FDQXlCTztBQUNMLHVCQUFPO0FBQ0gsMENBQXVCLHFCQURwQjtBQUVILDZCQUFVO0FBRlAsaUJBQVA7QUFJSDs7O3VDQUdVQyxPLEVBQVMsQ0FDbkI7Ozt1REFFMEI7QUFDdkIsb0JBQUlDLFdBQVcsaUJBQU9DLFNBQVAsR0FBbUIsS0FBS0MsS0FBTCxDQUFXQyxHQUFYLENBQWUsS0FBZixDQUFuQixHQUEyQyxHQUExRDtBQUNBLG9CQUFJLENBQUMsS0FBS0QsS0FBTCxDQUFXQyxHQUFYLENBQWUsT0FBZixDQUFMLEVBQ0ksT0FBTywyREFBUCxDQURKLEtBR0ksT0FBTyxvQ0FBa0NILFFBQWxDLEdBQTJDLEtBQUtFLEtBQUwsQ0FBV0MsR0FBWCxDQUFlLE9BQWYsRUFBd0JDLElBQW5FLEdBQXdFLE1BQS9FO0FBQ1A7OztvQ0FFT0MsSyxFQUFPO0FBQ1hBLHNCQUFNQyxjQUFOO0FBQ0FDLHVCQUFPQyxRQUFQLENBQWdCQyxJQUFoQixHQUF1QixnQkFBYyxLQUFLUCxLQUFMLENBQVdDLEdBQVgsQ0FBZSxLQUFmLENBQXJDO0FBQ0g7OztnQ0E1Q2M7QUFBRSx1QkFBTyxxQkFBRU8sUUFBRiwrQkFBUDtBQUE2Qjs7O2dDQUU5QjtBQUFFLHVCQUFPLGdCQUFQO0FBQXlCOzs7Z0NBRXJCO0FBQ3hCLHVCQUFPO0FBQ0dDLG9DQUFpQiwyQkFBS0MsUUFBTCxDQUFjLEtBQUtWLEtBQUwsQ0FBV0MsR0FBWCxDQUFlLE1BQWYsQ0FBZCxFQUFxQyxpQkFBT1UsbUJBQTVDLEVBQWdFLEtBQWhFLENBRHBCO0FBRUdDLDBCQUFPLHFCQUFFQyxNQUFGLENBQVMscUJBQUVDLE9BQUYsQ0FBVSxxQkFBRUMsS0FBRixDQUFRLEtBQUtmLEtBQUwsQ0FBV0MsR0FBWCxDQUFlLGFBQWYsQ0FBUixFQUFzQyxNQUF0QyxDQUFWLENBQVQsQ0FGVjtBQUdHZSxxQ0FBa0IsS0FBS0Msd0JBQUwsRUFIckI7QUFJR0MsMkJBQVEsZUFBU0MsS0FBVCxFQUFlQyxDQUFmLEVBQWtCO0FBQ3RCLCtCQUFPLHFCQUFFRixLQUFGLENBQVFDLEtBQVIsRUFBY0MsQ0FBZCxDQUFQO0FBQ0g7QUFOSixpQkFBUDtBQVFHOzs7Z0NBRWlCO0FBQ2QsdUJBQU87QUFDSCw4QkFBVztBQURSLGlCQUFQO0FBR0g7Ozs7TUF0QjRCLHFCQUFXQyxROztzQkFtRDdCekIsa0IiLCJmaWxlIjoiaW50ZXJ2aWV3X2l0ZW1fdmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuLypcbiogQEF1dGhvcjogTHV0eiBSZWl0ZXIsIERlc2lnbiBSZXNlYXJjaCBMYWIsIFVuaXZlcnNpdMOkdCBkZXIgS8O8bnN0ZSBCZXJsaW5cbiogQERhdGU6ICAgMjAxNi0wNS0wNCAxMTozODo0MVxuKiBATGFzdCBNb2RpZmllZCBieTogICBsdXR6ZXJcbiogQExhc3QgTW9kaWZpZWQgdGltZTogMjAxNi0wNy0xNSAxNDo0NDo0MVxuKi9cblxuaW1wb3J0IE1hcmlvbmV0dGUgZnJvbSAnbWFyaW9uZXR0ZSc7XG5pbXBvcnQgQmFja2JvbmUgZnJvbSAnYmFja2JvbmUnO1xuaW1wb3J0IF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQgX3N0ciBmcm9tICd1bmRlcnNjb3JlU3RyaW5nJztcbmltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQgQ29uZmlnIGZyb20gJ2NvbmZpZyc7XG5cbmltcG9ydCB0ZW1wbGF0ZSBmcm9tICd0ZXh0IXRlbXBsYXRlcy9pbnRlcnZpZXdfaXRlbV90bXBsLmh0bWwnO1xuXG5jbGFzcyBTdWJtaXNzaW9uSXRlbVZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLkl0ZW1WaWV3IHtcblxuXHQvKiBwcm9wZXJ0aWVzICovXG4gICAgZ2V0IHRlbXBsYXRlKCkgeyByZXR1cm4gXy50ZW1wbGF0ZSh0ZW1wbGF0ZSkgfVxuXG4gICAgZ2V0IGNsYXNzTmFtZSgpIHsgcmV0dXJuICdpdGVtLXZpZXcgY2FyZCcgfVxuXG4gICAgZ2V0IHRlbXBsYXRlSGVscGVycygpIHtcblx0XHRyZXR1cm4ge1xuICAgICAgICAgICAgdGV4dF90cnVuY2F0ZWQgOiBfc3RyLnRydW5jYXRlKHRoaXMubW9kZWwuZ2V0KCd0ZXh0JyksQ29uZmlnLnN0cmluZ1RydW5jYXRlU2hvcnQsJy4uLicpLFxuICAgICAgICAgICAgdGFncyA6IF8udW5pcXVlKF8uZmxhdHRlbihfLnBsdWNrKHRoaXMubW9kZWwuZ2V0KCdhdHRhY2htZW50cycpLFwidGFnc1wiKSkpLFxuICAgICAgICAgICAgYmFja2dyb3VuZEltYWdlIDogdGhpcy5nZXRCYWNrZ3JvdW5kSW1hZ2VTdHJpbmcoKSxcbiAgICAgICAgICAgIGZpcnN0IDogZnVuY3Rpb24oYXJyYXksbikge1xuICAgICAgICAgICAgICAgIHJldHVybiBfLmZpcnN0KGFycmF5LG4pXG4gICAgICAgICAgICB9XG5cdFx0fVxuICAgIH1cblxuICAgIGdldCBtb2RlbEV2ZW50cygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICdjaGFuZ2UnIDogJ3JlbmRlcidcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgZXZlbnRzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgJ2NsaWNrIC5wbGF5LWJ1dHRvbicgOiAnb25QbGF5QnV0dG9uQ2xpY2tlZCcsXG4gICAgICAgICAgICAnY2xpY2snIDogJ29uQ2xpY2snXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiBtZXRob2RzICovXG4gICAgaW5pdGlhbGl6ZShvcHRpb25zKSB7XG4gICAgfVxuXG4gICAgZ2V0QmFja2dyb3VuZEltYWdlU3RyaW5nKCkge1xuICAgICAgICB2YXIgZmlsZXNVcmwgPSBDb25maWcuZmlsZXNfdXJsICsgdGhpcy5tb2RlbC5nZXQoJ19pZCcpICsgJy8nO1xuICAgICAgICBpZiAoIXRoaXMubW9kZWwuZ2V0KCdpbWFnZScpKVxuICAgICAgICAgICAgcmV0dXJuIFwic3R5bGU9XFxcImJhY2tncm91bmQtaW1hZ2U6IHVybCgnaW1hZ2VzL3BsYWNlaG9sZGVyLmpwZycpXFxcIlwiO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gXCJzdHlsZT1cXFwiYmFja2dyb3VuZC1pbWFnZTogdXJsKCdcIitmaWxlc1VybCt0aGlzLm1vZGVsLmdldCgnaW1hZ2UnKS5uYW1lK1wiJylcXFwiXCI7XG4gICAgfVxuXG4gICAgb25DbGljayhldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiI2ludGVydmlldy9cIit0aGlzLm1vZGVsLmdldCgnX2lkJylcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgU3VibWlzc2lvbkl0ZW1WaWV3O1xuIl19