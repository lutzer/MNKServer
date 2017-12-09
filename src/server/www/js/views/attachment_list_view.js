define(['exports', 'marionette', 'underscore', 'models/attachment_collection', 'views/attachment_item_view', 'text!templates/attachment_list_tmpl.html'], function (exports, _marionette, _underscore, _attachment_collection, _attachment_item_view, _attachment_list_tmpl) {
    'use strict';

    /*
    * @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
    * @Date:   2016-05-04 11:38:41
    * @Last Modified by:   lutzer
    * @Last Modified time: 2016-07-15 00:35:19
    */

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _marionette2 = _interopRequireDefault(_marionette);

    var _underscore2 = _interopRequireDefault(_underscore);

    var _attachment_collection2 = _interopRequireDefault(_attachment_collection);

    var _attachment_item_view2 = _interopRequireDefault(_attachment_item_view);

    var _attachment_list_tmpl2 = _interopRequireDefault(_attachment_list_tmpl);

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

    var TagListView = function (_Marionette$Composite) {
        _inherits(TagListView, _Marionette$Composite);

        function TagListView() {
            _classCallCheck(this, TagListView);

            return _possibleConstructorReturn(this, (TagListView.__proto__ || Object.getPrototypeOf(TagListView)).apply(this, arguments));
        }

        _createClass(TagListView, [{
            key: 'events',
            value: function events() {
                return {
                    'click .attachment': 'onAttachmentClicked',
                    'click .play-button': 'onPlayButtonClicked'
                };
            }
        }, {
            key: 'initialize',
            value: function initialize(options) {

                this.options = options;

                this.collection = new _attachment_collection2.default();

                if (_underscore2.default.has(options, 'tag')) this.collection.fetch({ data: $.param({ tag: options.tag, visible: true }) });

                if (_underscore2.default.has(options, 'question')) this.collection.fetch({ data: $.param({ text: options.question, visible: true }) });

                // setup collection events
                this.listenTo(this.collection, 'sync', this.onCollectionLoaded);
            }
        }, {
            key: 'onAttachmentClicked',
            value: function onAttachmentClicked(event) {
                $(event.target).toggleClass("expand");
            }
        }, {
            key: 'onPlayButtonClicked',
            value: function onPlayButtonClicked(e) {
                var attachmentId = e.target.attributes['data-id'].value;
                Backbone.trigger('show:audioplayer', attachmentId);
            }
        }, {
            key: 'tagName',
            get: function get() {
                return 'div';
            }
        }, {
            key: 'childView',
            get: function get() {
                return _attachment_item_view2.default;
            }
        }, {
            key: 'template',
            get: function get() {
                return _underscore2.default.template(_attachment_list_tmpl2.default);
            }
        }, {
            key: 'templateHelpers',
            get: function get() {
                var _this2 = this;

                return {
                    searchString: function searchString() {
                        if (_underscore2.default.has(_this2.options, 'tag')) return '#' + _this2.options.tag;else if (_underscore2.default.has(_this2.options, 'question')) return _this2.options.question;else return "nothing";
                    }
                };
            }
        }, {
            key: 'childViewContainer',
            get: function get() {
                return '#attachment-list';
            }
        }]);

        return TagListView;
    }(_marionette2.default.CompositeView);

    exports.default = TagListView;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3cy9hdHRhY2htZW50X2xpc3Rfdmlldy5qcyJdLCJuYW1lcyI6WyJUYWdMaXN0VmlldyIsIm9wdGlvbnMiLCJjb2xsZWN0aW9uIiwiaGFzIiwiZmV0Y2giLCJkYXRhIiwiJCIsInBhcmFtIiwidGFnIiwidmlzaWJsZSIsInRleHQiLCJxdWVzdGlvbiIsImxpc3RlblRvIiwib25Db2xsZWN0aW9uTG9hZGVkIiwiZXZlbnQiLCJ0YXJnZXQiLCJ0b2dnbGVDbGFzcyIsImUiLCJhdHRhY2htZW50SWQiLCJhdHRyaWJ1dGVzIiwidmFsdWUiLCJCYWNrYm9uZSIsInRyaWdnZXIiLCJ0ZW1wbGF0ZSIsInNlYXJjaFN0cmluZyIsIkNvbXBvc2l0ZVZpZXciXSwibWFwcGluZ3MiOiI7QUFBQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBY01BLFc7Ozs7Ozs7Ozs7O3FDQTRCTztBQUNQLHVCQUFPO0FBQ0wseUNBQXNCLHFCQURqQjtBQUVMLDBDQUF1QjtBQUZsQixpQkFBUDtBQUlEOzs7dUNBS1VDLE8sRUFBUzs7QUFFaEIscUJBQUtBLE9BQUwsR0FBZUEsT0FBZjs7QUFFQSxxQkFBS0MsVUFBTCxHQUFrQixxQ0FBbEI7O0FBRUEsb0JBQUkscUJBQUVDLEdBQUYsQ0FBTUYsT0FBTixFQUFjLEtBQWQsQ0FBSixFQUNJLEtBQUtDLFVBQUwsQ0FBZ0JFLEtBQWhCLENBQXNCLEVBQUVDLE1BQU1DLEVBQUVDLEtBQUYsQ0FBUSxFQUFFQyxLQUFNUCxRQUFRTyxHQUFoQixFQUFxQkMsU0FBUyxJQUE5QixFQUFSLENBQVIsRUFBdEI7O0FBRUosb0JBQUkscUJBQUVOLEdBQUYsQ0FBTUYsT0FBTixFQUFjLFVBQWQsQ0FBSixFQUNJLEtBQUtDLFVBQUwsQ0FBZ0JFLEtBQWhCLENBQXNCLEVBQUVDLE1BQU1DLEVBQUVDLEtBQUYsQ0FBUSxFQUFFRyxNQUFPVCxRQUFRVSxRQUFqQixFQUEyQkYsU0FBUyxJQUFwQyxFQUFSLENBQVIsRUFBdEI7O0FBRUo7QUFDQSxxQkFBS0csUUFBTCxDQUFjLEtBQUtWLFVBQW5CLEVBQThCLE1BQTlCLEVBQXFDLEtBQUtXLGtCQUExQztBQUNIOzs7Z0RBRW1CQyxLLEVBQU87QUFDekJSLGtCQUFFUSxNQUFNQyxNQUFSLEVBQWdCQyxXQUFoQixDQUE0QixRQUE1QjtBQUNEOzs7Z0RBRW1CQyxDLEVBQUc7QUFDbkIsb0JBQUlDLGVBQWVELEVBQUVGLE1BQUYsQ0FBU0ksVUFBVCxDQUFvQixTQUFwQixFQUErQkMsS0FBbEQ7QUFDQUMseUJBQVNDLE9BQVQsQ0FBaUIsa0JBQWpCLEVBQW9DSixZQUFwQztBQUNIOzs7Z0NBdkRhO0FBQUUsdUJBQU8sS0FBUDtBQUFjOzs7Z0NBRWQ7QUFDWjtBQUNIOzs7Z0NBRWM7QUFDWCx1QkFBTyxxQkFBRUssUUFBRixnQ0FBUDtBQUNIOzs7Z0NBRXFCO0FBQUE7O0FBQ2xCLHVCQUFPO0FBQ0hDLGtDQUFlLHdCQUFNO0FBQ2pCLDRCQUFJLHFCQUFFckIsR0FBRixDQUFNLE9BQUtGLE9BQVgsRUFBbUIsS0FBbkIsQ0FBSixFQUNJLE9BQU8sTUFBSSxPQUFLQSxPQUFMLENBQWFPLEdBQXhCLENBREosS0FFSyxJQUFJLHFCQUFFTCxHQUFGLENBQU0sT0FBS0YsT0FBWCxFQUFtQixVQUFuQixDQUFKLEVBQ0QsT0FBTyxPQUFLQSxPQUFMLENBQWFVLFFBQXBCLENBREMsS0FFQSxPQUFPLFNBQVA7QUFDUjtBQVBFLGlCQUFQO0FBU0g7OztnQ0FTd0I7QUFBRSx1QkFBTyxrQkFBUDtBQUEyQjs7OztNQW5DaEMscUJBQVdjLGE7O3NCQWdFdEJ6QixXIiwiZmlsZSI6ImF0dGFjaG1lbnRfbGlzdF92aWV3LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4vKlxuKiBAQXV0aG9yOiBMdXR6IFJlaXRlciwgRGVzaWduIFJlc2VhcmNoIExhYiwgVW5pdmVyc2l0w6R0IGRlciBLw7xuc3RlIEJlcmxpblxuKiBARGF0ZTogICAyMDE2LTA1LTA0IDExOjM4OjQxXG4qIEBMYXN0IE1vZGlmaWVkIGJ5OiAgIGx1dHplclxuKiBATGFzdCBNb2RpZmllZCB0aW1lOiAyMDE2LTA3LTE1IDAwOjM1OjE5XG4qL1xuXG5pbXBvcnQgTWFyaW9uZXR0ZSBmcm9tICdtYXJpb25ldHRlJztcbmltcG9ydCBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IEF0dGFjaG1lbnRDb2xsZWN0aW9uIGZyb20gJ21vZGVscy9hdHRhY2htZW50X2NvbGxlY3Rpb24nO1xuaW1wb3J0IEF0dGFjaG1lbnRJdGVtVmlldyBmcm9tICd2aWV3cy9hdHRhY2htZW50X2l0ZW1fdmlldyc7XG5cbmltcG9ydCB0ZW1wbGF0ZSBmcm9tICd0ZXh0IXRlbXBsYXRlcy9hdHRhY2htZW50X2xpc3RfdG1wbC5odG1sJztcblxuY2xhc3MgVGFnTGlzdFZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLkNvbXBvc2l0ZVZpZXcge1xuXG5cdC8qIHByb3BlcnRpZXMgKi9cblxuICAgIC8vZ2V0IGNsYXNzTmFtZSgpIHsgcmV0dXJuICd0cmFjay1saXN0JyB9XG5cbiAgICBnZXQgdGFnTmFtZSgpIHsgcmV0dXJuICdkaXYnIH1cblxuICAgIGdldCBjaGlsZFZpZXcoKSB7XG4gICAgICAgIHJldHVybiBBdHRhY2htZW50SXRlbVZpZXc7XG4gICAgfVxuXG4gICAgZ2V0IHRlbXBsYXRlKCkge1xuICAgICAgICByZXR1cm4gXy50ZW1wbGF0ZSh0ZW1wbGF0ZSlcbiAgICB9XG5cbiAgICBnZXQgdGVtcGxhdGVIZWxwZXJzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2VhcmNoU3RyaW5nIDogKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChfLmhhcyh0aGlzLm9wdGlvbnMsJ3RhZycpKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJyMnK3RoaXMub3B0aW9ucy50YWc7XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoXy5oYXModGhpcy5vcHRpb25zLCdxdWVzdGlvbicpKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zLnF1ZXN0aW9uO1xuICAgICAgICAgICAgICAgIGVsc2UgcmV0dXJuIFwibm90aGluZ1wiXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBldmVudHMoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAnY2xpY2sgLmF0dGFjaG1lbnQnIDogJ29uQXR0YWNobWVudENsaWNrZWQnLFxuICAgICAgICAnY2xpY2sgLnBsYXktYnV0dG9uJyA6ICdvblBsYXlCdXR0b25DbGlja2VkJ1xuICAgICAgfVxuICAgIH1cblxuICAgIGdldCBjaGlsZFZpZXdDb250YWluZXIoKSB7IHJldHVybiAnI2F0dGFjaG1lbnQtbGlzdCcgfVxuXG4gICAgLyogbWV0aG9kcyAqL1xuICAgIGluaXRpYWxpemUob3B0aW9ucykge1xuXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnNcblxuICAgICAgICB0aGlzLmNvbGxlY3Rpb24gPSBuZXcgQXR0YWNobWVudENvbGxlY3Rpb24oKTtcblxuICAgICAgICBpZiAoXy5oYXMob3B0aW9ucywndGFnJykpXG4gICAgICAgICAgICB0aGlzLmNvbGxlY3Rpb24uZmV0Y2goeyBkYXRhOiAkLnBhcmFtKHsgdGFnIDogb3B0aW9ucy50YWcsIHZpc2libGU6IHRydWV9KcKgfSk7XG5cbiAgICAgICAgaWYgKF8uaGFzKG9wdGlvbnMsJ3F1ZXN0aW9uJykpXG4gICAgICAgICAgICB0aGlzLmNvbGxlY3Rpb24uZmV0Y2goeyBkYXRhOiAkLnBhcmFtKHsgdGV4dCA6IG9wdGlvbnMucXVlc3Rpb24sIHZpc2libGU6IHRydWV9KcKgfSk7XG5cbiAgICAgICAgLy8gc2V0dXAgY29sbGVjdGlvbiBldmVudHNcbiAgICAgICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbGxlY3Rpb24sJ3N5bmMnLHRoaXMub25Db2xsZWN0aW9uTG9hZGVkKVxuICAgIH1cblxuICAgIG9uQXR0YWNobWVudENsaWNrZWQoZXZlbnQpIHtcbiAgICAgICQoZXZlbnQudGFyZ2V0KS50b2dnbGVDbGFzcyhcImV4cGFuZFwiKTtcbiAgICB9XG5cbiAgICBvblBsYXlCdXR0b25DbGlja2VkKGUpIHtcbiAgICAgICAgdmFyIGF0dGFjaG1lbnRJZCA9IGUudGFyZ2V0LmF0dHJpYnV0ZXNbJ2RhdGEtaWQnXS52YWx1ZVxuICAgICAgICBCYWNrYm9uZS50cmlnZ2VyKCdzaG93OmF1ZGlvcGxheWVyJyxhdHRhY2htZW50SWQpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVGFnTGlzdFZpZXdcbiJdfQ==