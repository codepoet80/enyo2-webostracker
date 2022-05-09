## About the App

This app provides details about legacy mobile webOS devices from Palm, and later, HP.

The main code of the app is in `enyo-app\source\views\view.js`

To modify/add new devices, modify the data file at `enyo-app\source\data\data.js` and add new images at `enyo-app\source\assets`.

## About the App Template

This app is based on a "bootplate" for Enyo2: [https://github.com/codepoet80/enyo2-bootplate](https://github.com/codepoet80/enyo2-bootplate).

Enyo2 (aka EnyoJS) was an open-source Javascript framework that had its origins on the Palm/HP TouchPad, but was updated for Open WebOS and other platforms through [2018](http://nightly.enyojs.com/enyo-nightly-20180402014451/sampler/dist/), before being replaced with EnactJS.

The bootplate stops at version 2.5.1 to maintain compatibility with legacy webOS. You can download a Sampler of its capabilities from the [enyo2-sampler](https://github.com/codepoet80/enyo2-sampler) repo, or view it online via [webOS Archive](http://www.webosarchive.com/enyo2sampler).

You can learn more about legacy webOS at [webOS Archive](http://www.webosarchive.com/) or by exploring my other repos.

## Downloading

You can use a Git client to clone this repo and then initialize
submodules. Be aware that you'll need to clone recursively `--recurse-submodules`
to ensure that all the subfolders are downloaded.

Remove the `.git` folder to detach your local folder from the bootplate git repo
so that you can customize the contents for your own app (and add to your own repo)

## Dependencies

Each platform you want to target has its own dependencies and quirks. Check out the other docs in this folder for platform-specific details.

## Use

The bootplate provides a folder structure and app template to allow you to develop
Enyo2 apps for a variety of platforms including legacy webOS, LuneOS, Android and the web.

This project exists to allow apps to run on old *and* new devices, but can't prevent you
from using modern web features that won't work on older devices -- QA is up to you!

You create your app by modifying and updating the contents of the `enyo-app` folder.

The build script will help you build the app for different platforms. You specify
which platforms to build for with command line arguments to the build script.

Ensure the script is executable: `chmod +x build.sh`

Call the script, passing a list of the platforms you want to build, with a space between each one:

`./build.sh webos www android`

If you prefer to be in control, check out the other docs in this folder for platform-specific details.
