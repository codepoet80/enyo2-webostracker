# Enyo2 on LuneOS with Cordova

## Notes

### Pre-requisites

LuneOS support requires the [webos-ports-sdk for LuneOS](https://github.com/webOS-ports/webos-ports-sdk) which is installed along-side the [legacy webOS SDK](http://sdk.webosarchive.com).

### Cordova

This bootplate includes an old version of Cordova that still works with legacy webOS. If that's the only platform you want to target, you don't need to install the Android SDK or newer Cordova. If you do, however, see the note below about JDK instances.

### JAVA
The Android SDK and modern Cordova use a different version of JAVA than the webOS SDK requires. 
At least on Linux systems both versions can co-exist, but after installing Cordova, you need to set the default back to the older JDK.

This website describes managing alternatives: [https://www.fosstechnix.com/install-oracle-java-8-on-ubuntu-20-04/](https://www.fosstechnix.com/install-oracle-java-8-on-ubuntu-20-04/)

## Build and Deploy

### Simple and Automated

- Create your Enyo app by adding to and modifying the contents of the `enyo-app` folder
- From the parent folder, use the command line to run `./build.sh luneos`
- Install the resulting ipk from `bin/` using `lune-install`

### DIY (Manual)

- Set up your project the same way you would set up any other bootplate project.
- Modify your index.html and JavaScript files as outlined in this blog post: [JavaScript Apps for Open webOS With Enyo and Cordova](OpenWebOSBlog.md)
- Copy `appinfo.json` from the PhoneGap `'lib/webos/framework'` directory and a cordova JavaScript file from the PhoneGap `'lib/webos/lib'` directory
- Modify `appinfo.json` for your project and add an icon
- run `tools\deploy.bat --cordova-webos` or `tools/deploy.sh --cordova-webos` to build your app.
- Use `lune-install` to install to your webOS device

## Debugging

Depending on your target MACHINE, you may be able to use Chrome to remotely debug. Obtain the IP address of the device you install to, and visit `http://<DEVICEIP>:1122` in Chrome.