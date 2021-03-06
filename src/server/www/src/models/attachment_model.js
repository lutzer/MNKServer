'use strict';

/*
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-05-04 11:38:41
* @Last Modified by:   lutzer
* @Last Modified time: 2016-07-15 00:26:37
*/

import Backbone from 'backbone';
import Config from 'config';

class AttachmentModel extends Backbone.Model {

	get urlRoot() { return Config['web_service_url']+"attachments" }

	get idAttribute() { return '_id' }

	get defaults() { 
		return {
	    	_id: false,
	    	file: false,
	    	text: '',
	    	tags: [],
	    	interview : {
	    		_id: null,
	    		name: ""
	    	}
		}
	}

	save(attrs, options) {
        attrs = _.omit(attrs,'interview');
        return Backbone.Model.prototype.save.call(this, attrs, options);
    }
}

export default AttachmentModel