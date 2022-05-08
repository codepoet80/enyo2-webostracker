/**
	For simple applications, you might define all of your views in this file.  
	For more complex applications, you might choose to separate these kind definitions 
	into multiple files under this folder.
*/

enyo.kind({
	name: "webosTracker.MainView",
	kind: "FittableRows",
	fit: true,
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
	loadDevicesTap: function(inSender, inEvent) {
		this.$.list.reset();
		
	},
	setupItem: function(inSender, inEvent) {
		var i = inEvent.index;
		var selectedDevice = data.devices[i];
		this.$.item.setDeviceDetails(selectedDevice.name, selectedDevice.icon);
		//Handle item selection
		this.$.item.setSelected(inSender.isSelected(i));
		if (inSender.isSelected(i)) {
			this.$.details.setDevice(selectedDevice);
		}
		return true;
	},

});
/* Custom Kinds */
/* Device List Item*/
enyo.kind({
	name: 'DeviceItem',
	events: {
		//Custom events
		// See: http://sdk.webosarchive.com/docs/docs.html#dev-guide/enyo/events.html
	},
	published: {
		//Properties
		// See: http://sdk.webosarchive.com/docs/docs.html#dev-guide/enyo/published-properties.html
	},
	components: [
		{name: 'deviceIcon', kind: 'Image', classes: 'list-devices-icon'},
		{components: [
			{name: 'deviceName'},
		]},
	],
	//Public functions
	setDeviceDetails: function(name, iconPath) {
		this.$.deviceName.setContent(name);
		this.$.deviceIcon.setSrc(iconPath);
	},
	setSelected: function(inSelected) {
		this.addRemoveClass('list-devices-item-selected', inSelected);
	},
});
/* Device Details Panel */
enyo.kind({
	name: 'DeviceDetails',
	event: {
		//Custom events
		// See: http://sdk.webosarchive.com/docs/docs.html#dev-guide/enyo/events.html
	},
	published: {
		//Properties
		// See: http://sdk.webosarchive.com/docs/docs.html#dev-guide/enyo/published-properties.html
	},
	components: [
		{name: "main", allowHtml: true},
		//TODO: More pretty layout panels and stuff
	],
	//Public functions
	setDevice: function(selectedDevice) {
		this.$.main.setContent(selectedDevice.name + " was tapped.<br/>");
		this.$.main.addContent("<img height='300' src='" + selectedDevice.photo + "'><br/>");
		this.$.main.addContent(JSON.stringify(selectedDevice.data));
	}
})