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
	//	See: examples with code here: http://www.webosarchive.org/enyo2sampler/ 
	//	Note: webOS mobile uses the "onyx" widgets, webOS TVs use the "moonstone" widgets
	components:[
		{kind: "onyx.Toolbar", classes:"toolbar", components: [
			{tag: "img", classes:"toolbarIcon", attributes: {src: "icon-32.png"}},
			{name: "toolTitle", content: "webOS Tracker" },
		]},
		{kind: "Panels", name:"contentPanels", fit: true, classes:"app-panels", narrowFit:false, arrangerKind: "CollapsingArranger", wrap: false, components: [
			{kind: "FittableRows", name:"itemList", classes:"list-devices-list", components: [
				{kind: "List", name:"list", count:data.devices.length, fit:true, classes: "list-devices", onSetupItem: "setupItem", multiSelect:false, reorderable: false, enableSwipe: false,
					components: [
						{name: 'item', kind: 'DeviceItem', classes: 'list-devices-item enyo-border-box'}
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
			],
			statics: {
				isScreenNarrow: function() {
					return enyo.dom.getWindowWidth() <= 600;
				}
			}},
			
		]},	
	],
	//This function is called by the framework to populate the list
	//	You can call it manually by invoking this.$.list.reset();
	setupItem: function(inSender, inEvent) {
		var i = inEvent.index;
		var selectedDevice = data.devices[i];	//data comes from the data/data.js file
		this.$.item.setDeviceDetails(selectedDevice.name, selectedDevice.status, selectedDevice.icon);
		//Handle item selection
		this.$.item.setSelected(inSender.isSelected(i));
		if (inSender.isSelected(i)) {
			this.$.details.setDevice(selectedDevice);
			if(document.documentElement.clientWidth < 600)
				this.$.contentPanels.next();
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
		// See: http://sdk.webosarchive.org/docs/docs.html#dev-guide/enyo/events.html
	},
	published: {
		//Properties
		// See: http://sdk.webosarchive.org/docs/docs.html#dev-guide/enyo/published-properties.html
	},
	components: [
		{name: "deviceIcon", kind: "Image", classes: "list-devices-icon"},
		{components: [
			{name: "deviceName"},
			{name: "deviceStatus", classes: "deviceStatus"},
		]},
	],
	//Public functions
	setDeviceDetails: function(name, status, iconPath) {
		this.$.deviceName.setContent(name);
		this.$.deviceStatus.setContent(status);
		this.$.deviceIcon.setSrc(iconPath);
	},
	setSelected: function(inSelected) {
		this.addRemoveClass("list-devices-item-selected", inSelected);
	},
});

/** Device Details Panel **/
enyo.kind({
	kind: "FittableRows",
	name: "DeviceDetails",
	currentDevice: null,
	event: { },
	published: { },
	components: [
		{kind: "Scroller", name:"detailScroller", fit:true, classes:"disable-scrollbars", components: [	
			{name: "title", classes:"title"},
			{name: "main", allowHtml: true},
			{kind: "onyx.Groupbox", name:"specsGroupbox", style:"height: 300px;", showing:false, components: [
				{kind: "onyx.GroupboxHeader", content: "Specifications"},
				{kind: "List", name:"list",style:"height: 300px",  onSetupItem: "setupItem", multiSelect:false, reorderable: false, enableSwipe: false, components: [
					{name:"spec", style: "padding: 8px;border-bottom:1px solid gray;"}
				]},
			]},	
		]},
	],
	setDevice: function(selectedDevice) {
		this.$.specsGroupbox.setShowing(true);
		this.currentDevice = selectedDevice;
		this.$.title.setContent(selectedDevice.name);
		this.$.main.setContent("<div class='history'><img class='photo' src='" + selectedDevice.photo + "' >");
		this.$.main.addContent(selectedDevice.history);
		this.$.main.addContent("</div>");
		if (this.currentDevice) {
			this.$.list.setCount(this.currentDevice.specs.length);
			this.$.list.reset();
		}
	},
	setupItem: function(inSender, inEvent) {
		if (this.currentDevice) {
			//this.$.list.setCount(this.currentDevice.specs.length);
			var i = inEvent.index;
			var deviceSpec = this.currentDevice.specs[i];
			this.$.spec.setContent(deviceSpec.name + ": " + deviceSpec.value);
		}
		return true;
	},
})