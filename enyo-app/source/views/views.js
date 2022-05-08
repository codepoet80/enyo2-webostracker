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
				{name: "main", classes: "detailAreaBodyStyles",fit:true, allowHtml: true},
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
		var n = data.devices[i];
		this.$.item.setDeviceDetails(n.name, n.icon);
		//Handle item selection
		this.$.item.setSelected(inSender.isSelected(i));
		if (inSender.isSelected(i)) {
			this.$.main.setContent(n.name + " was tapped.<br/>");
			this.$.main.addContent("<img height='300' src='" + n.photo + "'><br/>");
			this.$.main.addContent(JSON.stringify(n.data));
		}
		return true;
	},

});
/* Custom Kinds */
enyo.kind({
	name: 'DeviceItem',
	events: {
	},
	published: {
	},
	components: [
		{name: 'deviceIcon', kind: 'Image', classes: 'list-devices-icon'},
		{components: [
			{name: 'deviceName'},
		]},
	],
	setDeviceDetails: function(name, iconPath) {
		this.$.deviceName.setContent(name);
		this.$.deviceIcon.setSrc(iconPath);
	},
	setSelected: function(inSelected) {
		this.addRemoveClass('list-devices-item-selected', inSelected);
	},
});