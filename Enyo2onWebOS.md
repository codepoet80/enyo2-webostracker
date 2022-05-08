# Enyo2 on webOS with Cordova

## Notes

### Pre-requisites

webOS Support requires the [legacy webOS SDK](http://sdk.webosarchive.com).

### Cordova

This bootplate includes an old version of Cordova that still works with legacy webOS. If that's the only platform you want to target, you don't need to install the Android SDK or newer Cordova. If you do, however, see the note below about JDK instances.

### JAVA
The Android SDK and modern Cordova use a different version of JAVA than the webOS SDK requires. 
At least on Linux systems both versions can co-exist, but after installing Cordova, you need to set the default back to the older JDK.

This website describes managing alternatives: [https://www.fosstechnix.com/install-oracle-java-8-on-ubuntu-20-04/](https://www.fosstechnix.com/install-oracle-java-8-on-ubuntu-20-04/)

## Build and Deploy

### Simple and Automated

- Create your Enyo app by adding to and modifying the contents of the `enyo-app` folder
- From the parent folder, use the command line to run `./build.sh webos`
- Install the resulting ipk from `bin/` using `palm-install`

### DIY (Manual)

- Set up your project the same way you would set up any other bootplate project.
- Modify your index.html and JavaScript files as outlined in this blog post: [JavaScript Apps for Open webOS With Enyo and Cordova](OpenWebOSBlog.md)
- Copy `appinfo.json` from the PhoneGap `'lib/webos/framework'` directory and a cordova JavaScript file from the PhoneGap `'lib/webos/lib'` directory
- Modify `appinfo.json` for your project and add an icon
- Run `tools\deploy.bat --cordova-webos` or `tools/deploy.sh --cordova-webos` to build your app.
- Use `palm-install` to install the resulting ipk on your webOS device

## Debugging

- Use `palm-log` and other [legacy webOS SDK Command line tools](http://sdk.webosarchive.com/docs/docs.html#dev-guide/tools/command-line-tools.html) to debug as normal.