define(['exports', 'backbone', 'config'], function (exports, _backbone, _config) {
	'use strict';

	/*
 * @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
 * @Date:   2016-05-04 11:38:41
 * @Last Modified by:   lutzer
 * @Last Modified time: 2016-07-11 19:01:22
 */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _backbone2 = _interopRequireDefault(_backbone);

	var _config2 = _interopRequireDefault(_config);

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

	var InterviewModel = function (_Backbone$Model) {
		_inherits(InterviewModel, _Backbone$Model);

		function InterviewModel() {
			_classCallCheck(this, InterviewModel);

			return _possibleConstructorReturn(this, (InterviewModel.__proto__ || Object.getPrototypeOf(InterviewModel)).apply(this, arguments));
		}

		_createClass(InterviewModel, [{
			key: 'parse',
			value: function parse(response) {
				var data = response.interview;
				if (_.isEmpty(data)) return data;
				if (_.has(response, 'attachments')) data.attachments = response.attachments;
				return data;
			}
		}, {
			key: 'save',
			value: function save(attrs, options) {
				attrs = _.omit(attrs, 'attachments');
				return _backbone2.default.Model.prototype.save.call(this, attrs, options);
			}
		}, {
			key: 'urlRoot',
			get: function get() {
				return _config2.default['web_service_url'] + "interviews";
			}
		}, {
			key: 'idAttribute',
			get: function get() {
				return '_id';
			}
		}, {
			key: 'defaults',
			get: function get() {
				return {
					image: false,
					text: '',
					name: '',
					role: '',
					attachments: [],
					createdAt: 0,
					visible: false
				};
			}
		}]);

		return InterviewModel;
	}(_backbone2.default.Model);

	exports.default = InterviewModel;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvaW50ZXJ2aWV3X21vZGVsLmpzIl0sIm5hbWVzIjpbIkludGVydmlld01vZGVsIiwicmVzcG9uc2UiLCJkYXRhIiwiaW50ZXJ2aWV3IiwiXyIsImlzRW1wdHkiLCJoYXMiLCJhdHRhY2htZW50cyIsImF0dHJzIiwib3B0aW9ucyIsIm9taXQiLCJNb2RlbCIsInByb3RvdHlwZSIsInNhdmUiLCJjYWxsIiwiaW1hZ2UiLCJ0ZXh0IiwibmFtZSIsInJvbGUiLCJjcmVhdGVkQXQiLCJ2aXNpYmxlIl0sIm1hcHBpbmdzIjoiO0FBQUE7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQVVNQSxjOzs7Ozs7Ozs7Ozt5QkFrQkNDLFEsRUFBVTtBQUNmLFFBQUlDLE9BQU9ELFNBQVNFLFNBQXBCO0FBQ0EsUUFBSUMsRUFBRUMsT0FBRixDQUFVSCxJQUFWLENBQUosRUFDQyxPQUFPQSxJQUFQO0FBQ0QsUUFBSUUsRUFBRUUsR0FBRixDQUFNTCxRQUFOLEVBQWUsYUFBZixDQUFKLEVBQ0NDLEtBQUtLLFdBQUwsR0FBbUJOLFNBQVNNLFdBQTVCO0FBQ0ssV0FBT0wsSUFBUDtBQUNOOzs7d0JBRU9NLEssRUFBT0MsTyxFQUFTO0FBQ2pCRCxZQUFRSixFQUFFTSxJQUFGLENBQU9GLEtBQVAsRUFBYSxhQUFiLENBQVI7QUFDQSxXQUFPLG1CQUFTRyxLQUFULENBQWVDLFNBQWYsQ0FBeUJDLElBQXpCLENBQThCQyxJQUE5QixDQUFtQyxJQUFuQyxFQUF5Q04sS0FBekMsRUFBZ0RDLE9BQWhELENBQVA7QUFDSDs7O3VCQTVCVTtBQUFFLFdBQU8saUJBQU8saUJBQVAsSUFBMEIsWUFBakM7QUFBK0M7Ozt1QkFFN0M7QUFBRSxXQUFPLEtBQVA7QUFBYzs7O3VCQUVuQjtBQUNkLFdBQU87QUFDSE0sWUFBTyxLQURKO0FBRUhDLFdBQU0sRUFGSDtBQUdIQyxXQUFNLEVBSEg7QUFJSEMsV0FBTSxFQUpIO0FBS0hYLGtCQUFhLEVBTFY7QUFNSFksZ0JBQVcsQ0FOUjtBQU9OQyxjQUFTO0FBUEgsS0FBUDtBQVNBOzs7O0dBaEIyQixtQkFBU1QsSzs7bUJBaUN2QlgsYyIsImZpbGUiOiJpbnRlcnZpZXdfbW9kZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8qXG4qIEBBdXRob3I6IEx1dHogUmVpdGVyLCBEZXNpZ24gUmVzZWFyY2ggTGFiLCBVbml2ZXJzaXTDpHQgZGVyIEvDvG5zdGUgQmVybGluXG4qIEBEYXRlOiAgIDIwMTYtMDUtMDQgMTE6Mzg6NDFcbiogQExhc3QgTW9kaWZpZWQgYnk6ICAgbHV0emVyXG4qIEBMYXN0IE1vZGlmaWVkIHRpbWU6IDIwMTYtMDctMTEgMTk6MDE6MjJcbiovXG5cbmltcG9ydCBCYWNrYm9uZSBmcm9tICdiYWNrYm9uZSc7XG5pbXBvcnQgQ29uZmlnIGZyb20gJ2NvbmZpZyc7XG5cbmNsYXNzIEludGVydmlld01vZGVsIGV4dGVuZHMgQmFja2JvbmUuTW9kZWwge1xuXG5cdGdldCB1cmxSb290KCkgeyByZXR1cm4gQ29uZmlnWyd3ZWJfc2VydmljZV91cmwnXStcImludGVydmlld3NcIiB9XG5cblx0Z2V0IGlkQXR0cmlidXRlKCkgeyByZXR1cm4gJ19pZCcgfVxuXG5cdGdldCBkZWZhdWx0cygpIHtcblx0XHRyZXR1cm4ge1xuXHQgICAgXHRpbWFnZTogZmFsc2UsXG5cdCAgICBcdHRleHQ6ICcnLFxuXHQgICAgXHRuYW1lOiAnJyxcblx0ICAgIFx0cm9sZTogJycsXG5cdCAgICBcdGF0dGFjaG1lbnRzOiBbXSxcblx0ICAgIFx0Y3JlYXRlZEF0OiAwLFxuXHRcdFx0dmlzaWJsZTogZmFsc2Vcblx0XHR9XG5cdH1cblxuXHRwYXJzZShyZXNwb25zZSkge1xuXHRcdHZhciBkYXRhID0gcmVzcG9uc2UuaW50ZXJ2aWV3O1xuXHRcdGlmIChfLmlzRW1wdHkoZGF0YSkpXG5cdFx0XHRyZXR1cm4gZGF0YTtcblx0XHRpZiAoXy5oYXMocmVzcG9uc2UsJ2F0dGFjaG1lbnRzJykpXG5cdFx0XHRkYXRhLmF0dGFjaG1lbnRzID0gcmVzcG9uc2UuYXR0YWNobWVudHM7XG4gICAgICAgIHJldHVybiBkYXRhO1xuXHR9XG5cbiAgICBzYXZlKGF0dHJzLCBvcHRpb25zKSB7XG4gICAgICAgIGF0dHJzID0gXy5vbWl0KGF0dHJzLCdhdHRhY2htZW50cycpO1xuICAgICAgICByZXR1cm4gQmFja2JvbmUuTW9kZWwucHJvdG90eXBlLnNhdmUuY2FsbCh0aGlzLCBhdHRycywgb3B0aW9ucyk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBJbnRlcnZpZXdNb2RlbFxuIl19