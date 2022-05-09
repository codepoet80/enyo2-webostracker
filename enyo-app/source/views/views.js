/**
	For simple applications, you might define all of your views in this file.  
	For more complex applications, you might choose to separate these kind definitions 
	into multiple files under this folder.
*/

enyo.kind({
	name: "webosTracker.MainView",
	kind: "FittableRows",
	fit: true,
	// UI layout panels and elements
	//	See: examples with code here: http://www.webosarchive.com/enyo2sampler/ 
	//	Note: webOS mobile uses the "onyx" widgets, webOS TVs use the "moonstone" widgets
	components:[
		{kind: "onyx.Toolbar", classes:"toolbar", components: [
			/*{tag: "img", classes:"toolbarIcon", attributes: {src: "icon.png"}},*/
			{name: "toolTitle", content: "webOS Tracker" },
		]},
		{kind: "Panels", name:"contentPanels", fit: true, classes:"app-panels",  narrowFit:false, arrangerKind: "CollapsingArranger", wrap: false, components: [
			{kind: "FittableRows", name:"itemList", classes:"list-devices-list", fit:true, components: [
				{kind: "List", name:"list", count:data.devices.length, fit:true, classes: "list-devices", onSetupItem: "setupItem", multiSelect:false, reorderable: false, enableSwipe: false,
					components: [
						{name: 'item', kind: 'DeviceItem', classes: 'list-devices-item enyo-border-box',}
					],
				},
				{kind: "onyx.Toolbar", classes:"toolbar", components: [
					{kind: 'onyx.Grabber', ondragstart: 'grabberDragstart', ondrag: 'grabberDrag', ondragfinish: 'grabberDragFinish'},
					/*{kind: "onyx.Button", content: "Load Devices", ontap: "loadDevicesTap"}*/
				]},
			]},
			
			{kind: "FittableRows", name:"body", classes:"detailAreaStyles", fit:true, components: [
				{kind: "DeviceDetails", name: "details", classes: "details-area", fit:true },
				{kind: "onyx.Toolbar", classes:"toolbar", components: [
					{kind: 'onyx.Grabber', ondragstart: 'grabberDragstart', ondrag: 'grabberDrag', ondragfinish: 'grabberDragFinish'},
				]},
			]},
			
		]},	
	],
	//This function is called by the framework to populate the list
	//	You can call it manually by invoking this.$.list.reset();
	setupItem: function(inSender, inEvent) {
		var i = inEvent.index;
		var selectedDevice = data.devices[i];	//data comes from the data/data.js file
		this.$.item.setDeviceDetails(selectedDevice.name, selectedDevice.icon);
		//Handle item selection
		this.$.item.setSelected(inSender.isSelected(i));
		if (inSender.isSelected(i)) {
			this.$.details.setDevice(selectedDevice);
		}
		return true;
	},
	/*
	loadDevicesTap: function(inSender, inEvent) {
		this.$.list.reset();
	},
	*/
});

/* Custom Kinds */

/** Device List Item **/
enyo.kind({
	name: "DeviceItem",
	events: {
		//Custom events
		// See: http://sdk.webosarchive.com/docs/docs.html#dev-guide/enyo/events.html
	},
	published: {
		//Properties
		// See: http://sdk.webosarchive.com/docs/docs.html#dev-guide/enyo/published-properties.html
	},
	components: [
		{name: "deviceIcon", kind: "Image", classes: "list-devices-icon"},
		{components: [
			{name: "deviceName"},
		]},
	],
	//Public functions
	setDeviceDetails: function(name, iconPath) {
		this.$.deviceName.setContent(name);
		this.$.deviceIcon.setSrc(iconPath);
	},
	setSelected: function(inSelected) {
		this.addRemoveClass("list-devices-item-selected", inSelected);
	},
});

/** Device Details Panel **/
enyo.kind({
	kind: "Scroller",
	name: "DeviceDetails",
	currentDevice: null,
	event: { },
	published: { },
	components: [
		{name: "main", allowHtml: true},
		{kind: "onyx.Groupbox", components: [
			{kind: "onyx.GroupboxHeader", content: "Specifications"},
			/* TODO: figure out why I have to hard-code the list height */
			{kind: "List", name:"list", style: "height:200px", onSetupItem: "setupItem", multiSelect:false, reorderable: false, enableSwipe: false, components: [
				{name:"spec", style: "padding: 8px;border-bottom:1px solid gray;"}
			]},
		]},
	],
	setDevice: function(selectedDevice) {
		this.currentDevice = selectedDevice;
		this.$.main.setContent("<b>" + selectedDevice.name + "</b><br/>");
		this.$.main.addContent("<img height='300' src='" + selectedDevice.photo + "'><br/>");
		if (this.currentDevice) {
			enyo.log("count is: " + this.currentDevice.specs.length);
			this.$.list.setCount(this.currentDevice.specs.length);
			this.$.list.reset();
		}
	},
	setupItem: function(inSender, inEvent) {
		enyo.log("building spec list!");
		if (this.currentDevice) {
			enyo.log("count is: " + this.currentDevice.specs.length);
			//this.$.list.setCount(this.currentDevice.specs.length);
			var i = inEvent.index;
			var deviceSpec = this.currentDevice.specs[i];
			enyo.log("showing " + deviceSpec.name + ": " + deviceSpec.value);
			this.$.spec.setContent(deviceSpec.name + ": " + deviceSpec.value);
		}
		return true;
	},
})