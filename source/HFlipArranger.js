enyo.kind({
	name: "enyo.HFlipArranger",
	kind: "Arranger",
	layoutClass: "enyo-arranger enyo-arranger-fit more-arrangers-perspective more-arrangers-bfhidden",
	calcArrangementDifference: function(inI0, inA0, inI1, inA1) {
		return this.containerBounds.width;
	},
	destroy: function() {
		var c$ = this.container.children;
		for (var i=0, c; c=c$[i]; i++) {
			this.flipControl(c, 0, 1);
			c.setShowing(true);
			c.resized();
		}
		this.inherited(arguments);
	},
	arrange: function(inC, inName) {
		for (var i=0, c, a, o; c=inC[i]; i++) {
			o = (i == 0) ? 1 : 0;
			if(enyo.dom.canAccelerate) {
				if(i==0) a = 0;
				if(i==1 && i != inC.length) a = 180;
				if(i==inC.length - 1) a = -180;
				this.arrangeControl(c, {angle:a, opacity:o});
			}
			else {
				a = (i == 0) ? 1 : -1;
				this.arrangeControl(c, {angle:a, opacity:o});
			}
		}
	},
	start: function() {
		this.inherited(arguments);
		var c$ = this.container.children;
		for (var i=0, c; c=c$[i]; i++) {
			c.setShowing(i == this.container.fromIndex || i == (this.container.toIndex));
			if (c.showing) {
				c.resized();
			}
		}
		//FIXME: Shouldn't be doing this here, but create() never gets called
		if(!this.vendor) this.vendor = this.getVendor();
	},
	finish: function() {
		this.inherited(arguments);
		var c$ = this.container.children;
		for (var i=0, c; c=c$[i]; i++) {
			c.setShowing(i == this.container.toIndex);
		}
	},
	flowControl: function(inControl, inArrangement) {
		enyo.Arranger.positionControl(inControl, inArrangement);
		var a = inArrangement.angle;
		var o = inArrangement.opacity;
		if (a != null && o != null) {
			this.flipControl(inControl, a, o);
		}
	},
	flipControl: function(inControl, inAngle, inOpacity) {
		var a = inAngle;
		var o = inOpacity
		if(enyo.dom.canAccelerate) {
			inControl.applyStyle(this.vendor + 'transform', "rotateY(" + a + "deg)");
		}
		else {
			if(a <= 0) inControl.applyStyle("display", "none");
			else inControl.applyStyle("display", "block");
			inControl.applyStyle(this.vendor + 'transform', "scale(" + a + ",1)");
		}
		enyo.Arranger.opacifyControl(inControl, inOpacity);
	},
	getVendor: function() {
		var prefix = '';
		var prefixes = ['transform', 'WebkitTransform', 'MozTransform', 'OTransform', 'msTransform'];
		var tmp = document.createElement('div');
		for(i = 0; i < prefixes.length; i++) {
			if(typeof tmp.style[prefixes[i]] != 'undefined') {
				prefix = prefixes[i];
				break;
			}
			else {
				prefix = null;
			}
		}
		switch(prefix) {
			case 'transform':
				prefix = '';
				break;
			case 'WebkitTransform':
				prefix = '-webkit-';
				break;
			case 'MozTransform':
				prefix = '-moz-';
				break;
			case 'OTransform':
				prefix = '-o-';
				break;
			case 'msTransform':
				prefix = '-ms-';
				break;
		}
		return prefix;
	}
});
