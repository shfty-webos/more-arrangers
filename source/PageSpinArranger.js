enyo.kind({
	name: "enyo.PageSpinArranger",
	kind: "Arranger",
	layoutClass: "enyo-arranger enyo-arranger-fit more-arrangers-perspective",
	calcArrangementDifference: function(inI0, inA0, inI1, inA1) {
		return this.containerBounds.width;
	},
	destroy: function() {
		var c$ = this.container.children;
		for (var i=0, c; c=c$[i]; i++) {
			this.pageSpinControl(c, 0, 1, 1);
			c.setShowing(true);
			c.resized();
		}
		this.inherited(arguments);
	},
	arrange: function(inC, inName) {
		for (var i=0, c, a, s, o; c=inC[i]; i++) {
			o = (i == 0) ? 1 : 0;
			if(enyo.dom.canAccelerate) {
				switch(i) {
					case 0:
						a = 0;
						break;
					case 1:
						a = 90;
						break;
					case inC.length - 1:
						a = -90;
						break;
				}
				this.arrangeControl(c, {angle:a, opacity:o});
			}
			else {
				s = (i == 0) ? 1 : 0;
				this.arrangeControl(c, {scale:s, opacity:o});
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
		var s = inArrangement.scale;
		var o = inArrangement.opacity;
		if (o != null) {
			this.pageSpinControl(inControl, a, s, o);
		}
	},
	pageSpinControl: function(inControl, inAngle, inScale, inOpacity) {
		var o = inOpacity;
		if(enyo.dom.canAccelerate) {
			var a = inAngle;
			inControl.applyStyle(this.vendor + "transform-origin", "0 50% 0");
			inControl.applyStyle(this.vendor + "transform", "rotateY(" + a + "deg)");
		}
		else {
			var s = inScale;
			enyo.log(this.vendor);
			inControl.applyStyle(this.vendor + "transform-origin", "0 50%");
			inControl.applyStyle(this.vendor + "transform", "scale(" + s + ", 1)");
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
