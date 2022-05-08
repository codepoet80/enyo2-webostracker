# Enyo2 on the Web

## Notes

Enyo2 apps natively run in modern web browsers, with the only caveat being CORS restrictions.
If you want to cross-target other platforms, particularly webOS, ensure you don't use
modern web features that won't render on older browsers.

## Build and Deploy

### Simple and Automated

- Create your Enyo app by adding to and modifying the contents of the `enyo-app` folder
- From the parent folder, use the command line to run `./build.sh www`
- Copy (or symlink) the output `bin/www` folder to your web server

### DIY (Manual)

- Build your project the Enyo2 way:
    - `tools/deploy.sh` for *nix or `tools/deploy.bat` for Windows
- Copy the resulting build output from the Enyo `deploy` folder to your web server's directory of choice

## Debugging

Normal web debugging tools can be used.