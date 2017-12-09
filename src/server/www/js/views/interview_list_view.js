define(['exports', 'marionette', 'underscore', 'jquery', 'config', 'views/interview_item_view', 'models/interview_collection', 'models/interview_model', 'text!templates/interview_list_tmpl.html'], function (exports, _marionette, _underscore, _jquery, _config, _interview_item_view, _interview_collection, _interview_model, _interview_list_tmpl) {
    'use strict';

    /*
    * @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
    * @Date:   2016-05-04 11:38:41
    * @Last Modified by:   lutzer
    * @Last Modified time: 2016-07-14 12:00:04
    */

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _marionette2 = _interopRequireDefault(_marionette);

    var _underscore2 = _interopRequireDefault(_underscore);

    var _jquery2 = _interopRequireDefault(_jquery);

    var _config2 = _interopRequireDefault(_config);

    var _interview_item_view2 = _interopRequireDefault(_interview_item_view);

    var _interview_collection2 = _interopRequireDefault(_interview_collection);

    var _interview_model2 = _interopRequireDefault(_interview_model);

    var _interview_list_tmpl2 = _interopRequireDefault(_interview_list_tmpl);

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

    var SubmissionListView = function (_Marionette$Composite) {
        _inherits(SubmissionListView, _Marionette$Composite);

        function SubmissionListView() {
            _classCallCheck(this, SubmissionListView);

            return _possibleConstructorReturn(this, (SubmissionListView.__proto__ || Object.getPrototypeOf(SubmissionListView)).apply(this, arguments));
        }

        _createClass(SubmissionListView, [{
            key: 'childEvents',
            value: function childEvents() {
                return {
                    'show-details': 'onChildShowDetails'
                };
            }
        }, {
            key: 'events',
            value: function events() {
                return {
                    'click #load-more-button': 'onLoadMoreButtonClick'
                };
            }
        }, {
            key: 'initialize',
            value: function initialize(options) {

                this.fetchParams = {};

                if (options.tag != null) this.fetchParams.tag = options.tag;

                // filter out invisible results
                this.fetchParams.visible = true;

                this.collection = new _interview_collection2.default();

                this.listenTo(this.collection, 'sync', this.hideSpinner);
                this.listenTo(this.collection, 'fetching', this.showSpinner);

                this.listenTo(Backbone, 'interview:changed', this.onInterviewChanged);
                this.listenTo(Backbone, 'interview:new', this.onInterviewAdded);
                this.listenTo(Backbone, 'interview:removed', this.OnInterviewRemoved);

                this.collection.getFirstPage(this.fetchParams);
            }
        }, {
            key: 'onAttach',
            value: function onAttach() {
                var _this2 = this;

                //bind scroll handler
                this.winowScrollListener = _underscore2.default.throttle(function () {
                    _this2.onWindowScroll();
                }, 500);
                (0, _jquery2.default)(window).on('scroll', this.winowScrollListener);
            }
        }, {
            key: 'onBeforeDestroy',
            value: function onBeforeDestroy() {
                //unbind scroll handler
                (0, _jquery2.default)(window).off("scroll", this.winowScrollListener);
            }
        }, {
            key: 'onInterviewChanged',
            value: function onInterviewChanged(data) {
                var model = this.collection.get(data._id);
                if (model) {
                    if (model.get("visible")) model.fetch();
                } else if (data.visible == false) {
                    this.collection.remove(data._id);
                }
            }
        }, {
            key: 'onInterviewAdded',
            value: function onInterviewAdded(data) {
                //console.log(data);
                var interview = new _interview_model2.default(data);
                interview.fetch();
                if (interview.get("visible") == true)
                    // add to front of collection
                    this.collection.add(interview, { at: 0 });
            }
        }, {
            key: 'onInterviewRemoved',
            value: function onInterviewRemoved(data) {
                //console.log(data);
                this.collection.remove(data);
            }
        }, {
            key: 'onLoadMoreButtonClick',
            value: function onLoadMoreButtonClick(event) {
                event.preventDefault();
                this.collection.getNextPage(this.fetchParams);
            }
        }, {
            key: 'onWindowScroll',
            value: function onWindowScroll() {

                var scrollPos = (0, _jquery2.default)(window).scrollTop();
                var triggerPos = (0, _jquery2.default)(document).height() - (0, _jquery2.default)(window).height() * 1.2;

                if (scrollPos > triggerPos) {
                    this.collection.getNextPage(this.fetchParams);
                }
            }
        }, {
            key: 'showSpinner',
            value: function showSpinner() {
                this.$('#fetch-spinner').removeClass('hidden');
            }
        }, {
            key: 'hideSpinner',
            value: function hideSpinner() {
                this.$('#fetch-spinner').addClass('hidden');
            }
        }, {
            key: 'template',
            get: function get() {
                return _underscore2.default.template(_interview_list_tmpl2.default);
            }
        }, {
            key: 'className',
            get: function get() {
                return 'composite-view';
            }
        }, {
            key: 'childViewContainer',
            get: function get() {
                return '#interview-list';
            }
        }, {
            key: 'childView',
            get: function get() {
                return _interview_item_view2.default;
            }
        }]);

        return SubmissionListView;
    }(_marionette2.default.CompositeView);

    ;

    exports.default = SubmissionListView;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3cy9pbnRlcnZpZXdfbGlzdF92aWV3LmpzIl0sIm5hbWVzIjpbIlN1Ym1pc3Npb25MaXN0VmlldyIsIm9wdGlvbnMiLCJmZXRjaFBhcmFtcyIsInRhZyIsInZpc2libGUiLCJjb2xsZWN0aW9uIiwibGlzdGVuVG8iLCJoaWRlU3Bpbm5lciIsInNob3dTcGlubmVyIiwiQmFja2JvbmUiLCJvbkludGVydmlld0NoYW5nZWQiLCJvbkludGVydmlld0FkZGVkIiwiT25JbnRlcnZpZXdSZW1vdmVkIiwiZ2V0Rmlyc3RQYWdlIiwid2lub3dTY3JvbGxMaXN0ZW5lciIsInRocm90dGxlIiwib25XaW5kb3dTY3JvbGwiLCJ3aW5kb3ciLCJvbiIsIm9mZiIsImRhdGEiLCJtb2RlbCIsImdldCIsIl9pZCIsImZldGNoIiwicmVtb3ZlIiwiaW50ZXJ2aWV3IiwiYWRkIiwiYXQiLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwiZ2V0TmV4dFBhZ2UiLCJzY3JvbGxQb3MiLCJzY3JvbGxUb3AiLCJ0cmlnZ2VyUG9zIiwiZG9jdW1lbnQiLCJoZWlnaHQiLCIkIiwicmVtb3ZlQ2xhc3MiLCJhZGRDbGFzcyIsInRlbXBsYXRlIiwiQ29tcG9zaXRlVmlldyJdLCJtYXBwaW5ncyI6IjtBQUFBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUFpQk1BLGtCOzs7Ozs7Ozs7OzswQ0FXUztBQUNWLHVCQUFPO0FBQ04sb0NBQWlCO0FBRFgsaUJBQVA7QUFHQTs7O3FDQUVRO0FBQ0wsdUJBQU87QUFDSCwrQ0FBNEI7QUFEekIsaUJBQVA7QUFHSDs7O3VDQUdPQyxPLEVBQVM7O0FBRW5CLHFCQUFLQyxXQUFMLEdBQW1CLEVBQW5COztBQUVBLG9CQUFJRCxRQUFRRSxHQUFSLElBQWUsSUFBbkIsRUFDQyxLQUFLRCxXQUFMLENBQWlCQyxHQUFqQixHQUF1QkYs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QjtBQUFFLHVCQUFPLGlCQUFQO0FBQTBCOzs7Z0NBRXJDO0FBQUU7QUFBMEI7Ozs7TUFUWixxQkFBV0MsYTs7QUE4RzNDOztzQkFFY3pDLGtCIiwiZmlsZSI6ImludGVydmlld19saXN0X3ZpZXcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8qXG4qIEBBdXRob3I6IEx1dHogUmVpdGVyLCBEZXNpZ24gUmVzZWFyY2ggTGFiLCBVbml2ZXJzaXTDpHQgZGVyIEvDvG5zdGUgQmVybGluXG4qIEBEYXRlOiAgIDIwMTYtMDUtMDQgMTE6Mzg6NDFcbiogQExhc3QgTW9kaWZpZWQgYnk6ICAgbHV0emVyXG4qIEBMYXN0IE1vZGlmaWVkIHRpbWU6IDIwMTYtMDctMTQgMTI6MDA6MDRcbiovXG5cbmltcG9ydCBNYXJpb25ldHRlIGZyb20gJ21hcmlvbmV0dGUnO1xuaW1wb3J0IF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IENvbmZpZyBmcm9tICdjb25maWcnO1xuaW1wb3J0IEludGVydmlld0l0ZW1WaWV3IGZyb20gJ3ZpZXdzL2ludGVydmlld19pdGVtX3ZpZXcnO1xuaW1wb3J0IEludGVydmlld0NvbGxlY3Rpb24gZnJvbSAnbW9kZWxzL2ludGVydmlld19jb2xsZWN0aW9uJztcbmltcG9ydCBJbnRlcnZpZXdNb2RlbCBmcm9tICdtb2RlbHMvaW50ZXJ2aWV3X21vZGVsJztcblxuaW1wb3J0IHRlbXBsYXRlIGZyb20gJ3RleHQhdGVtcGxhdGVzL2ludGVydmlld19saXN0X3RtcGwuaHRtbCc7XG5cbmNsYXNzIFN1Ym1pc3Npb25MaXN0VmlldyBleHRlbmRzIE1hcmlvbmV0dGUuQ29tcG9zaXRlVmlldyB7XG5cblx0LyogcHJvcGVydGllcyAqL1xuXHRnZXQgdGVtcGxhdGUoKSB7IHJldHVybiBfLnRlbXBsYXRlKHRlbXBsYXRlKSB9XG5cblx0Z2V0IGNsYXNzTmFtZSgpIHsgcmV0dXJuICdjb21wb3NpdGUtdmlldycgfVxuXG5cdGdldCBjaGlsZFZpZXdDb250YWluZXIoKSB7IHJldHVybiAnI2ludGVydmlldy1saXN0JyB9XG5cblx0Z2V0IGNoaWxkVmlldygpIHsgcmV0dXJuIEludGVydmlld0l0ZW1WaWV3IH1cblxuXHRjaGlsZEV2ZW50cygpIHtcbiAgICBcdHJldHVybiB7XG4gICAgXHRcdCdzaG93LWRldGFpbHMnIDogJ29uQ2hpbGRTaG93RGV0YWlscycsXG4gICAgXHR9XG4gICAgfVxuXG4gICAgZXZlbnRzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgJ2NsaWNrICNsb2FkLW1vcmUtYnV0dG9uJyA6ICdvbkxvYWRNb3JlQnV0dG9uQ2xpY2snXG4gICAgICAgIH1cbiAgICB9XG5cblx0LyogbWV0aG9kcyAqL1xuXHRpbml0aWFsaXplKG9wdGlvbnMpIHtcblxuXHRcdHRoaXMuZmV0Y2hQYXJhbXMgPSB7fTtcblxuXHRcdGlmIChvcHRpb25zLnRhZyAhPSBudWxsKVxuXHRcdFx0dGhpcy5mZXRjaFBhcmFtcy50YWcgPSBvcHRpb25zLnRhZ1xuXG5cdFx0Ly8gZmlsdGVyIG91dCBpbnZpc2libGUgcmVzdWx0c1xuXHRcdHRoaXMuZmV0Y2hQYXJhbXMudmlzaWJsZSA9IHRydWU7XG5cblx0XHR0aGlzLmNvbGxlY3Rpb24gPSBuZXcgSW50ZXJ2aWV3Q29sbGVjdGlvbigpO1xuXG4gICAgICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb2xsZWN0aW9uLCdzeW5jJyx0aGlzLmhpZGVTcGlubmVyKTtcbiAgICAgICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbGxlY3Rpb24sJ2ZldGNoaW5nJyx0aGlzLnNob3dTcGlubmVyKTtcblxuICAgICAgICB0aGlzLmxpc3RlblRvKEJhY2tib25lLCdpbnRlcnZpZXc6Y2hhbmdlZCcsIHRoaXMub25JbnRlcnZpZXdDaGFuZ2VkKTtcbiAgICAgICAgdGhpcy5saXN0ZW5UbyhCYWNrYm9uZSwnaW50ZXJ2aWV3Om5ldycsIHRoaXMub25JbnRlcnZpZXdBZGRlZCk7XG4gICAgICAgIHRoaXMubGlzdGVuVG8oQmFja2JvbmUsJ2ludGVydmlldzpyZW1vdmVkJywgdGhpcy5PbkludGVydmlld1JlbW92ZWQpO1xuXG4gICAgICAgIHRoaXMuY29sbGVjdGlvbi5nZXRGaXJzdFBhZ2UodGhpcy5mZXRjaFBhcmFtcyk7XG5cdH1cblxuICAgIG9uQXR0YWNoKCkge1xuICAgICAgICAvL2JpbmQgc2Nyb2xsIGhhbmRsZXJcbiAgICAgICAgdGhpcy53aW5vd1Njcm9sbExpc3RlbmVyID0gIF8udGhyb3R0bGUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5vbldpbmRvd1Njcm9sbCgpO1xuICAgICAgICB9LDUwMCk7XG4gICAgICAgICQod2luZG93KS5vbignc2Nyb2xsJyx0aGlzLndpbm93U2Nyb2xsTGlzdGVuZXIpO1xuICAgIH1cblxuICAgIG9uQmVmb3JlRGVzdHJveSgpIHtcbiAgICAgICAgLy91bmJpbmQgc2Nyb2xsIGhhbmRsZXJcbiAgICAgICAgJCh3aW5kb3cpLm9mZihcInNjcm9sbFwiLCB0aGlzLndpbm93U2Nyb2xsTGlzdGVuZXIpO1xuICAgIH1cblxuXG5cdC8vIHVwZGF0ZSBtb2RlbCBvbiBkYXRhIGNoYW5nZVxuICAgIG9uSW50ZXJ2aWV3Q2hhbmdlZChkYXRhKSB7XG4gICAgXHR2YXIgbW9kZWwgPSB0aGlzLmNvbGxlY3Rpb24uZ2V0KGRhdGEuX2lkKTtcbiAgICBcdGlmIChtb2RlbCkge1xuXHRcdFx0aWYgKG1vZGVsLmdldChcInZpc2libGVcIikpXG4gICAgXHRcdFx0bW9kZWwuZmV0Y2goKTtcblx0XHR9IGVsc2UgaWYgKGRhdGEudmlzaWJsZSA9PSBmYWxzZSkge1xuXHRcdFx0dGhpcy5jb2xsZWN0aW9uLnJlbW92ZShkYXRhLl9pZCk7XG5cdFx0fVxuXG4gICAgfVxuXG4gICAgb25JbnRlcnZpZXdBZGRlZChkYXRhKSB7XG4gICAgICAgIC8vY29uc29sZS5sb2coZGF0YSk7XG4gICAgXHR2YXIgaW50ZXJ2aWV3ID0gbmV3IEludGVydmlld01vZGVsKGRhdGEpO1xuICAgIFx0aW50ZXJ2aWV3LmZldGNoKCk7XG5cdFx0aWYgKGludGVydmlldy5nZXQoXCJ2aXNpYmxlXCIpID09IHRydWUpXG4gICAgXHQgXHQvLyBhZGQgdG8gZnJvbnQgb2YgY29sbGVjdGlvblxuXHRcdFx0dGhpcy5jb2xsZWN0aW9uLmFkZChpbnRlcnZpZXcsIHsgYXQ6IDB9KTtcbiAgICB9XG5cbiAgICBvbkludGVydmlld1JlbW92ZWQoZGF0YSkge1xuICAgICAgICAvL2NvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICB0aGlzLmNvbGxlY3Rpb24ucmVtb3ZlKGRhdGEpO1xuICAgIH1cblxuICAgIG9uTG9hZE1vcmVCdXR0b25DbGljayhldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLmNvbGxlY3Rpb24uZ2V0TmV4dFBhZ2UodGhpcy5mZXRjaFBhcmFtcyk7XG4gICAgfVxuXG4gICAgb25XaW5kb3dTY3JvbGwoKSB7XG5cbiAgICAgICAgdmFyIHNjcm9sbFBvcyA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcbiAgICAgICAgdmFyIHRyaWdnZXJQb3MgPSAgJChkb2N1bWVudCkuaGVpZ2h0KCkgLSAkKHdpbmRvdykuaGVpZ2h0KCkgKiAxLjI7XG5cbiAgICAgICAgaWYgKHNjcm9sbFBvcyA+IHRyaWdnZXJQb3MpIHtcbiAgICAgICAgICAgIHRoaXMuY29sbGVjdGlvbi5nZXROZXh0UGFnZSh0aGlzLmZldGNoUGFyYW1zKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob3dTcGlubmVyKCkge1xuICAgICAgICB0aGlzLiQoJyNmZXRjaC1zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuICAgIH1cblxuICAgIGhpZGVTcGlubmVyKCkge1xuICAgICAgICB0aGlzLiQoJyNmZXRjaC1zcGlubmVyJykuYWRkQ2xhc3MoJ2hpZGRlbicpO1xuICAgIH1cblxuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBTdWJtaXNzaW9uTGlzdFZpZXdcbiJdfQ==