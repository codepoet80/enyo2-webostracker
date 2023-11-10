<?php
//This file is only used for advertising on a hosting webserver

//Figure out what protocol the client wanted
if(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on') {
	$PROTOCOL = "https";
} else {
	$PROTOCOL = "http";
}
$docRoot = "./";
$appTitle = "webOS Tracker";
$iconPath = "icons/";
echo file_get_contents("https://www.webosarchive.org/app-template/header.php?docRoot=" . $docRoot . "&appTitle=" . $appTitle . "&iconPath=" . $iconPath . "&protocol=" . $PROTOCOL);
?>
    <style>
        body { background-color: white;}
        a { color: darkorange; }
        a:hover { color: orange; }
    </style>
    <div style="font-family:arial,helvetica,sans-serif;margin:15px;" align="center">
    <p>	webOS Tracker provides detailed information on Palm webOS and HP Palm phones and tablets.<br/>
    Choose the experience that's best for your platform...</p>
    <table style="margin-left:15%;margin-right:20%;font-size:small;">
        <tr><td width="22%" align="right"><b><a href="./index.html" target="_blank">PWA</a></b></td><td style="padding-left:18px">Progressive Web Apps work on modern browsers, and can be pinned to your home screen or dock on modern platforms.</td>
        <tr><td width="22%" align="right"><b><a href="https://play.google.com/store/apps/details?id=eu.weboslives.webostracker">Android</a></b></td><td style="padding-left:18px">The PWA bundled for distribution on Google Play. Proceeds support the archive.</td></tr>
        <tr><td width="22%" align="right"><b><a href="https://appcatalog.webosarchive.org/app/webOSTracker">webOS</a></b></td><td style="padding-left:18px">A native app built for legacy (mobile) webOS and modern LuneOS.</td></tr>
    </table>
    <p>webOS Tracker is open source! Code and Releases can be found here:
    <table style="margin-left:20%;margin-right:20%;font-size:small;">
        <tr><td align="center"><a href="https://github.com/codepoet80/enyo2-webostracker">Source code, including PWA, Android, webOS and LuneOS</a></td></tr>
    </div>
</body>