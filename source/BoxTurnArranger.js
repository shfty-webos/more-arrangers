enyo.kind({
	name: "enyo.BoxTurnArranger",
	kind: "Arranger",
	layoutClass: "enyo-arranger enyo-arranger-fit more-arrangers-perspective more-arrangers-bfhidden",
	calcArrangementDifference: function(inI0, inA0, inI1, inA1) {
		return this.containerBounds.width;
	},
	destroy: function() {
		var c$ = this.container.children;
		for (var i=0, c; c=c$[i]; i++) {
			this.boxTurnControl(c, 0, 0, 1, 1);
			c.setShowing(true);
			c.resized();
		}
		this.inherited(arguments);
	},
	arrange: function(inC, inName) {
		for (var i=0, c, a, t, s, o; c=inC[i]; i++) {
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
				switch(i) {
					case 0:
						t = 0;
						s = 1;
						break;
					case 1:
						t = 50;
						s = 0;
						break;
					case inC.length - 1:
						t = -50;
						s = 0;
						break;
				}
				this.arrangeControl(c, {transform:t, scale:s, opacity:o});
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
		var t = inArrangement.transform;
		var s = inArrangement.scale;
		var o = inArrangement.opacity;
		if (o != null) {
			this.boxTurnControl(inControl, a, t, s, o);
		}
	},
	boxTurnControl: function(inControl, inAngle, inTransform, inScale, inOpacity) {
		var o = inOpacity;
		if(enyo.dom.canAccelerate) {
			var a = inAngle;
			inControl.applyStyle(this.vendor + "transform-origin", "50% 50% -" + this.containerBounds.width / 2 + "px");
			inControl.applyStyle(this.vendor + "transform", "translateZ(-" + this.containerBounds.width / 2 + "px) rotateY(" + a + "deg)");
		}
		else {
			var t = inTransform;
			var s = inScale;
			inControl.applyStyle(this.vendor + "transform", "translateX(" + t + "%) scale(" + s + ", 1)");
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
