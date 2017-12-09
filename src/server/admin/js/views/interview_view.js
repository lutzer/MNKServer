define(['exports', 'backbone', 'marionette', 'underscore', 'config', 'models/interview_model', 'views/attachment_list_view', 'utils', 'text!templates/interview_tmpl.html'], function (exports, _backbone, _marionette, _underscore, _config, _interview_model, _attachment_list_view, _utils, _interview_tmpl) {
    'use strict';

    /*
    * @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
    * @Date:   2016-05-04 11:38:41
    * @Last Modified by:   lutzer
    * @Last Modified time: 2016-07-15 14:44:32
    */

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _backbone2 = _interopRequireDefault(_backbone);

    var _marionette2 = _interopRequireDefault(_marionette);

    var _underscore2 = _interopRequireDefault(_underscore);

    var _config2 = _interopRequireDefault(_config);

    var _interview_model2 = _interopRequireDefault(_interview_model);

    var _attachment_list_view2 = _interopRequireDefault(_attachment_list_view);

    var _utils2 = _interopRequireDefault(_utils);

    var _interview_tmpl2 = _interopRequireDefault(_interview_tmpl);

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

    var InterviewView = function (_Marionette$LayoutVie) {
        _inherits(InterviewView, _Marionette$LayoutVie);

        function InterviewView() {
            _classCallCheck(this, InterviewView);

            return _possibleConstructorReturn(this, (InterviewView.__proto__ || Object.getPrototypeOf(InterviewView)).apply(this, arguments));
        }

        _createClass(InterviewView, [{
            key: 'regions',
            value: function regions() {
                return {
                    attachments: '#interview-attachments'
                };
            }
        }, {
            key: 'events',
            value: function events() {
                return {
                    'click #saveButton': 'onSaveButtonClicked',
                    'click #deleteButton': 'onDeleteButtonClicked',
                    'click #add-attachment-button': 'onAddAttachmentButtonClicked',
                    'change #input-upload-file': 'onFileInputChanged'
                };
            }
        }, {
            key: 'initialize',
            value: function initialize(options) {

                if (_underscore2.default.has(options, 'new')) {
                    this.model = new _interview_model2.default();
                    this.options.id = false;
                } else {
                    this.model = new _interview_model2.default({ _id: options.id });
                    this.model.fetch();
                }

                //listen to model events
                this.listenTo(this.model, 'change', this.render);
            }
        }, {
            key: 'onRender',
            value: function onRender() {
                this.getRegion('attachments').show(new _attachment_list_view2.default({ interview: this.options.id }));
            }
        }, {
            key: 'onSaveButtonClicked',
            value: function onSaveButtonClicked() {
                var _this2 = this;

                this.saveModel(function (error) {
                    if (error) alert(error);else window.location.href = "#interview/" + _this2.model.id;
                });
            }
        }, {
            key: 'onDeleteButtonClicked',
            value: function onDeleteButtonClicked() {
                if (confirm("Are you sure you want to delete the interview?")) {
                    this.model.destroy();
                    window.location.href = "#";
                }
            }
        }, {
            key: 'onAddAttachmentButtonClicked',
            value: function onAddAttachmentButtonClicked() {
                window.location.href = '#attachment/add/' + this.options.id;
            }
        }, {
            key: 'onFileInputChanged',
            value: function onFileInputChanged() {
                var _this3 = this;

                var uploadUrl = _config2.default.web_service_url + 'upload/image/' + this.model.id;
                _utils2.default.uploadFile(self.$('#input-upload-file'), uploadUrl, function (error) {
                    if (error) alert("ERROR: " + error);else alert("File was successfully uploaded");
                    _this3.model.fetch();
                });
            }
        }, {
            key: 'saveModel',
            value: function saveModel(callback) {

                console.log(this.$("#input-visible").is(":checked"));

                this.model.set({
                    name: this.$("#input-name").val(),
                    role: this.$("#input-role").val(),
                    text: this.$("#input-text").val(),
                    visible: this.$("#input-visible").is(":checked")
                });

                this.model.save(null, {
                    success: function success() {
                        callback();
                    },
                    error: function error(_error) {
                        callback(_error);
                    }
                });
            }
        }, {
            key: 'template',
            get: function get() {
                return _underscore2.default.template(_interview_tmpl2.default);
            }
        }, {
            key: 'className',
            get: function get() {
                return 'singleview';
            }
        }, {
            key: 'templateHelpers',
            get: function get() {
                return {
                    filesUrl: _config2.default.files_url + this.model.get('_id') + '/',
                    isNew: this.model.isNew()
                };
            }
        }]);

        return InterviewView;
    }(_marionette2.default.LayoutView);

    exports.default = InterviewView;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3cy9pbnRlcnZpZXdfdmlldy5qcyJdLCJuYW1lcyI6WyJJbnRlcnZpZXdWaWV3IiwiYXR0YWNobWVudHMiLCJvcHRpb25zIiwiaGFzIiwibW9kZWwiLCJpZCIsIl9pZCIsImZldGNoIiwibGlzdGVuVG8iLCJyZW5kZXIiLCJnZXRSZWdpb24iLCJzaG93IiwiaW50ZXJ2aWV3Iiwic2F2ZU1vZGVsIiwiZXJyb3IiLCJhbGVydCIsIndpbmRvdyIsImxvY2F0aW9uIiwiaHJlZiIsImNvbmZpcm0iLCJkZXN0cm95IiwidXBsb2FkVXJsIiwid2ViX3NlcnZpY2VfdXJsIiwidXBsb2FkRmlsZSIsInNlbGYiLCIkIiwiY2FsbGJhY2siLCJjb25zb2xlIiwibG9nIiwiaXMiLCJzZXQiLCJuYW1lIiwidmFsIiwicm9sZSIsInRleHQiLCJ2aXNpYmxlIiwic2F2ZSIsInN1Y2Nlc3MiLCJ0ZW1wbGF0ZSIsImZpbGVzVXJsIiwiZmlsZXNfdXJsIiwiZ2V0IiwiaXNOZXciLCJMYXlvdXRWaWV3Il0sIm1hcHBpbmdzIjoiO0FBQUE7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQWlCTUEsYTs7Ozs7Ozs7Ozs7c0NBY087QUFDUCx1QkFBTztBQUNMQyxpQ0FBYztBQURULGlCQUFQO0FBR0Q7OztxQ0FFUTtBQUNQLHVCQUFPO0FBQ0wseUNBQXNCLHFCQURqQjtBQUVMLDJDQUF3Qix1QkFGbkI7QUFHTCxvREFBaUMsOEJBSDVCO0FBSUwsaURBQThCO0FBSnpCLGlCQUFQO0FBTUQ7Ozt1Q0FHVUMsTyxFQUFTOztBQUVoQixvQkFBSSxxQkFBRUMsR0FBRixDQUFNRCxPQUFOLEVBQWUsS0FBZixDQUFKLEVBQTJCO0FBQ3ZCLHlCQUFLRSxLQUFMLEdBQWEsK0JBQWI7QUFDQSx5QkFBS0YsT0FBTCxDQUFhRyxFQUFiLEdBQWtCLEtBQWxCO0FBQ0gsaUJB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IEBBdXRob3I6IEx1dHogUmVpdGVyLCBEZXNpZ24gUmVzZWFyY2ggTGFiLCBVbml2ZXJzaXTDpHQgZGVyIEvDvG5zdGUgQmVybGluXG4qIEBEYXRlOiAgIDIwMTYtMDUtMDQgMTE6Mzg6NDFcbiogQExhc3QgTW9kaWZpZWQgYnk6ICAgbHV0emVyXG4qIEBMYXN0IE1vZGlmaWVkIHRpbWU6IDIwMTYtMDctMTUgMTQ6NDQ6MzJcbiovXG5cbmltcG9ydCBCYWNrYm9uZSBmcm9tICdiYWNrYm9uZSc7XG5pbXBvcnQgTWFyaW9uZXR0ZSBmcm9tICdtYXJpb25ldHRlJztcbmltcG9ydCBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IENvbmZpZyBmcm9tICdjb25maWcnO1xuaW1wb3J0IEludGVydmlld01vZGVsIGZyb20gJ21vZGVscy9pbnRlcnZpZXdfbW9kZWwnO1xuaW1wb3J0IEF0dGFjaG1lbnRMaXN0VmlldyBmcm9tICd2aWV3cy9hdHRhY2htZW50X2xpc3Rfdmlldyc7XG5pbXBvcnQgdXRpbHMgZnJvbSAndXRpbHMnO1xuXG5pbXBvcnQgdGVtcGxhdGUgZnJvbSAndGV4dCF0ZW1wbGF0ZXMvaW50ZXJ2aWV3X3RtcGwuaHRtbCc7XG5cbmNsYXNzIEludGVydmlld1ZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLkxheW91dFZpZXcge1xuXG5cdC8qIHByb3BlcnRpZXMgKi9cbiAgIFx0Z2V0IHRlbXBsYXRlKCkgeyByZXR1cm4gXy50ZW1wbGF0ZSh0ZW1wbGF0ZSkgfVxuXG4gICAgZ2V0IGNsYXNzTmFtZSgpIHsgcmV0dXJuICdzaW5nbGV2aWV3JyB9XG5cbiAgICBnZXQgdGVtcGxhdGVIZWxwZXJzKCkge1xuXHRcdCAgcmV0dXJuIHtcblx0XHQgICAgZmlsZXNVcmwgOiBDb25maWcuZmlsZXNfdXJsICsgdGhpcy5tb2RlbC5nZXQoJ19pZCcpICsgJy8nLFxuICAgICAgICAgICAgaXNOZXcgOiB0aGlzLm1vZGVsLmlzTmV3KClcbiAgICAgIH1cbiAgICB9XG5cbiAgIHJlZ2lvbnMoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBhdHRhY2htZW50cyA6ICcjaW50ZXJ2aWV3LWF0dGFjaG1lbnRzJ1xuICAgICAgfVxuICAgIH1cblxuICAgIGV2ZW50cygpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgICdjbGljayAjc2F2ZUJ1dHRvbicgOiAnb25TYXZlQnV0dG9uQ2xpY2tlZCcsXG4gICAgICAgICdjbGljayAjZGVsZXRlQnV0dG9uJyA6ICdvbkRlbGV0ZUJ1dHRvbkNsaWNrZWQnLFxuICAgICAgICAnY2xpY2sgI2FkZC1hdHRhY2htZW50LWJ1dHRvbicgOiAnb25BZGRBdHRhY2htZW50QnV0dG9uQ2xpY2tlZCcsXG4gICAgICAgICdjaGFuZ2UgI2lucHV0LXVwbG9hZC1maWxlJyA6ICdvbkZpbGVJbnB1dENoYW5nZWQnXG4gICAgICB9XG4gICAgfVxuXG4gICAgLyogbWV0aG9kcyAqL1xuICAgIGluaXRpYWxpemUob3B0aW9ucykge1xuXG4gICAgICAgIGlmIChfLmhhcyhvcHRpb25zLCAnbmV3JykpIHtcbiAgICAgICAgICAgIHRoaXMubW9kZWwgPSBuZXcgSW50ZXJ2aWV3TW9kZWwoKTtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5pZCA9IGZhbHNlO1xuICAgICAgICB9ICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubW9kZWwgPSBuZXcgSW50ZXJ2aWV3TW9kZWwoeyBfaWQ6IG9wdGlvbnMuaWQgfSk7XG4gICAgICAgICAgICB0aGlzLm1vZGVsLmZldGNoKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvL2xpc3RlbiB0byBtb2RlbCBldmVudHNcbiAgICAgICAgdGhpcy5saXN0ZW5Ubyh0aGlzLm1vZGVsLCdjaGFuZ2UnLHRoaXMucmVuZGVyKTtcbiAgICB9XG5cbiAgICBvblJlbmRlcigpIHtcbiAgICAgICAgdGhpcy5nZXRSZWdpb24oJ2F0dGFjaG1lbnRzJykuc2hvdyggbmV3IEF0dGFjaG1lbnRMaXN0Vmlldyh7IGludGVydmlldyA6IHRoaXMub3B0aW9ucy5pZCB9KSApO1xuICAgIH1cblxuICAgIG9uU2F2ZUJ1dHRvbkNsaWNrZWQoKSB7XG4gICAgICAgIHRoaXMuc2F2ZU1vZGVsKCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnJvcilcbiAgICAgICAgICAgICAgICBhbGVydChlcnJvcik7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIiNpbnRlcnZpZXcvXCIrdGhpcy5tb2RlbC5pZDtcblxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvbkRlbGV0ZUJ1dHRvbkNsaWNrZWQoKSB7XG4gICAgICAgIGlmIChjb25maXJtKFwiQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGUgaW50ZXJ2aWV3P1wiKSkge1xuICAgICAgICAgICAgdGhpcy5tb2RlbC5kZXN0cm95KCk7XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZj1cIiNcIjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQWRkQXR0YWNobWVudEJ1dHRvbkNsaWNrZWQoKSB7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJyNhdHRhY2htZW50L2FkZC8nICsgdGhpcy5vcHRpb25zLmlkO1xuICAgIH1cblxuICAgIG9uRmlsZUlucHV0Q2hhbmdlZCgpIHtcblxuICAgICAgICB2YXIgdXBsb2FkVXJsID0gQ29uZmlnLndlYl9zZXJ2aWNlX3VybCArICd1cGxvYWQvaW1hZ2UvJyArIHRoaXMubW9kZWwuaWQ7XG4gICAgICAgIHV0aWxzLnVwbG9hZEZpbGUoc2VsZi4kKCcjaW5wdXQtdXBsb2FkLWZpbGUnKSwgdXBsb2FkVXJsLCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnJvcilcbiAgICAgICAgICAgICAgICBhbGVydChcIkVSUk9SOiBcIiArIGVycm9yKTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBhbGVydChcIkZpbGUgd2FzIHN1Y2Nlc3NmdWxseSB1cGxvYWRlZFwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGVsLmZldGNoKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNhdmVNb2RlbChjYWxsYmFjaykge1xuXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuJChcIiNpbnB1dC12aXNpYmxlXCIpLmlzKFwiOmNoZWNrZWRcIikpO1xuXG4gICAgICAgIHRoaXMubW9kZWwuc2V0KHtcbiAgICAgICAgICAgIG5hbWUgOiB0aGlzLiQoXCIjaW5wdXQtbmFtZVwiKS52YWwoKSxcbiAgICAgICAgICAgIHJvbGUgOiB0aGlzLiQoXCIjaW5wdXQtcm9sZVwiKS52YWwoKSxcbiAgICAgICAgICAgIHRleHQgOiB0aGlzLiQoXCIjaW5wdXQtdGV4dFwiKS52YWwoKSxcbiAgICAgICAgICAgIHZpc2libGUgOiB0aGlzLiQoXCIjaW5wdXQtdmlzaWJsZVwiKS5pcyhcIjpjaGVja2VkXCIpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMubW9kZWwuc2F2ZShudWxsLCB7XG4gICAgICAgICAgICBzdWNjZXNzOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yOiAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhlcnJvcilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEludGVydmlld1ZpZXdcbiJdfQ==