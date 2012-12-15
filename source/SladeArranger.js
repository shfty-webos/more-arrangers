enyo.kind({
	name: "enyo.SladeArranger",
	kind: "Arranger",
	layoutClass: "enyo-arranger enyo-arranger-fit",
	calcArrangementDifference: function(inI0, inA0, inI1, inA1) {
		return this.containerBounds.width;
	},
	destroy: function() {
		var c$ = this.container.children;
		for (var i=0, c; c=c$[i]; i++) {
			this.sladeControl(c, 0, 1);
			c.setShowing(true);
			c.resized();
		}
		this.inherited(arguments);
	},
	arrange: function(inC, inName) {
		for (var i=0, c, t, o; c=inC[i]; i++) {
			o = (i == 0) ? 1 : 0;
			switch(i) {
				case 0:
					t = 0;
					break;
				case 1:
					t = 50;
					break;
				case inC.length - 1:
					t = -50;
					break;
			}
			this.arrangeControl(c, {translate:t, opacity:o});
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
		var t = inArrangement.translate;
		var o = inArrangement.opacity;
		if (t != null && o != null) {
			this.sladeControl(inControl, t, o);
		}
	},
	sladeControl: function(inControl, inTranslate, inOpacity) {
		var t = inTranslate;
		var o = inOpacity
		if(enyo.dom.canAccelerate) {
			inControl.applyStyle("-webkit-transform", "translate3d(" + t + "%,0,0)");
			inControl.applyStyle("-moz-transform", "translate3d(" + t + "%,0,0)");
			inControl.applyStyle("-o-transform", "translate3d(" + t + "%,0,0)");
			inControl.applyStyle("-ms-transform", "translate3d(" + t + "%,0,0)");
		}
		else {
			inControl.applyStyle("-webkit-transform", "translate(" + t + "%,0)");
			inControl.applyStyle("-moz-transform", "translate(" + t + "%,0)");
			inControl.applyStyle("-o-transform", "translate(" + t + "%,0)");
			inControl.applyStyle("-ms-transform", "translate(" + t + "%,0)");
		}
		enyo.Arranger.opacifyControl(inControl, inOpacity);
	}
});
