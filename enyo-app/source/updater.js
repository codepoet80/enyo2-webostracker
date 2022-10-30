/*
Updater Helper - Enyo2
 Version 0.1
 Created: 2022
 Author: Jon W
 License: MIT
 Description: A helper to check for and get updates from App Museum II web service.
    Does not require App Museum to be installed, but does require internet access, and Preware to do the actual install.
 Source: Find the latest version of this library and clean samples of how to use it on GitHub:
    https://github.com/webosarchive/webos-common
*/

//** Note: If you synced this file from a common repository, local edits may be over-written! */
enyo.kind({
	name: "wosa.updater",
    appName: "",
    appInfo: "",
    updateServiceUrl: "http://appcatalog.webosarchive.org/WebService/getLatestVersionInfo.php?app=",
    events: {
        onUpdateFound: "",
    },
    published: {
        UpdateMessage: ""
    },
    components: [],
	create: function() {
        this.inherited(arguments);
        enyo.log("updater created!");
	},

    CheckForUpdate: function(appName) {
        enyo.log("CheckForUpdate called for " + appName);
        this.appName = appName;
        //Get app info
        if (enyo.platform.webos || window.PalmSystem) {
            var request = new enyo.Ajax({
                url: "appinfo.json",
                method: "GET",
                cacheBust: true
            });
            request.error(function() { enyo.log("Updater helper hit an error loading app info. Unable to check for update!")});
            request.response(this.performIdentifiedUpdateCheck.bind(this));
            request.go();
        }
    },

    performIdentifiedUpdateCheck: function(inSender, inResponse, inRequest) {
        this.appInfo = inResponse;
        var deviceData = navigator.userAgent;
        if (device && device.uuid) {
            this.deviceId = device.uuid;
            deviceData = device.name + "/" + device.version + "/enyo2";
        }
        else {
            if (!enyo.getCookie("updater-uuid")) {
                enyo.setCookie("updater-uuid", this.uniqueId());
            }
            this.deviceId = enyo.getCookie("updater-uuid");
        }
        enyo.log("device data: " + deviceData);
        var newUrl = this.updateServiceUrl + this.appName + "/" + this.appInfo.version;
        newUrl = newUrl + "&clientid=" + this.deviceId;
        newUrl = newUrl + "&device=" + encodeURIComponent(deviceData);
        
        enyo.log("Update Helper is checking for updates with URL: " + newUrl);
        var request = new enyo.Ajax({
			url: newUrl,
			method: "GET",
            cacheBust: true
		});
		request.error(this.updateCheckFailure.bind(this));
		request.response(this.updateCheckSuccess.bind(this));
		request.go();
    },

    updateCheckSuccess: function(inSender, inResponse, inRequest) {
        var currVersion = this.appInfo.version;
        enyo.log("Updater Helper found Current version: " + currVersion + ", Update version: " + inResponse.version);
        currVersion = this.getVersionObject(currVersion);
        if (inResponse.version != null) {
            this.LastUpdateResponse = inResponse;
            var museumVersion = this.getVersionObject(inResponse.version);
            if (this.isVersionHigher(currVersion, museumVersion)) {
                enyo.log("Updater Helper found an update in webOS App Museum II!");
                this.UpdateMessage = inResponse.versionNote;
                this.doUpdateFound();
            } else {
                enyo.log("Updater Helper did not find an update in webOS App Museum II!");
                inResponse = false;
            }
        } else {
            enyo.error("Update Helper could not find museum version number");
        }
    },

    updateCheckFailure: function(inSender, inResponse, inRequest) {
        enyo.error("Got failure from update check: " + inResponse);
    },

     //Turn a version string into an object with three independent number values
     getVersionObject: function(versionNum) {
        versionNumParts = versionNum.split(".");
        if (versionNumParts.length <= 2 || versionNumParts > 3) {
            enyo.log("Updater Helper: An invalid version number was passed, webOS version numbers are #.#.#");
            return false;
        } else {
            var versionObject = {
                majorVersion: versionNumParts[0] * 1,
                minorVersion: versionNumParts[1] * 1,
                buildVersion: versionNumParts[2] * 1
            }
            return versionObject;
        }
    },
    
    //Given a current version and a version to compare, return true or false if the compare version is newer
    isVersionHigher: function(currVersion, compareVersion) {
        if (!currVersion || !compareVersion) {
            enyo.log("Updater Helper: Pass the versions to compare. If the second version is higher than the first, this function will return true");
        } else {
            if (compareVersion.majorVersion > currVersion.majorVersion)
                return true;
            if (compareVersion.majorVersion == currVersion.majorVersion && compareVersion.minorVersion > currVersion.minorVersion)
                return true;
            if (compareVersion.majorVersion == currVersion.majorVersion && compareVersion.minorVersion == currVersion.minorVersion && compareVersion.buildVersion > currVersion.buildVersion)
                return true;
            return false;
        }
    },

    uniqueId: function() {
        return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
    }
});
