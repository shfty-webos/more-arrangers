More Arrangers
==============

More Arrangers is a set of additional cross-platform arrangers for enyo.Panels.

Features:
* Autodetects the host browser's CSS prefix.
* Supports hardware-accellerated 3D CSS transitions and falls back to 2D where required.

So what are they?
==============

The available arrangers are as follows:
* SladeArranger - A combination slide/fade transition.
* PushPopArranger - A scale/fade transition, akin to moving between scenes in the Mojo framework.
* HFlipArranger - Rotates the current panel 180 degrees, revealing the target panel in it's backface.
* BoxTurnArranger - Rotate between panels as if they were the sides of a cube.
* PageTurnArranger - Turn between panels like the pages of a book.
* PageSpinArranger - Like PageTurn, but the back page turns as well as the front one.

Example
==============

Using More Arrangers is easy, just create a Panels kind and choose an arranger from the above list:
```javascript
			{kind: "Panels",
			classes: "panels enyo-unselectable",
			style: "margin:5%; overflow:visible;",
			arrangerKind: "HFlipArranger",
			components: [
				{name: "left", style: "background: beige;", components: [
					{content: "Left"}
				]},
				{name: "middle", style: "background: tomato;", components: [
					{content: "Middle"}
				]},
				{name: "body", style: "background: lightblue;", components: [
					{content: "Body"}
				]},
			]}
```

To-Do
==============

High-Resolution Variants with multiple panels viewable at once. Toggleable.
*  Slade: Don't fade between visible, moving panels.
*  PushPop: No, just no.
*  HFlip: Erm..?
*  BoxTurn: Conveyor belt.
*  PageTurn: Book display, two panels instead of one. Variable widths.
*  PageSpin: Rolodex? Might be difficult to make it look good.

Modify PageTurn to flip 180 degrees, doesn't look quite right atm.

Known Issues
==============

* PageTurn has Z-Sorting issues, causing it to flicker near the start/end of transitions.
* PushPop will sometimes flicker near the end of transitions. Only seems to effect going left/back from the last item.