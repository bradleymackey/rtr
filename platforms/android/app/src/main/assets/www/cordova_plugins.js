cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "cordova-plugin-geolocation.geolocation",
    "file": "plugins/cordova-plugin-geolocation/www/android/geolocation.js",
    "pluginId": "cordova-plugin-geolocation",
    "clobbers": [
      "navigator.geolocation"
    ]
  },
  {
    "id": "cordova-plugin-geolocation.PositionError",
    "file": "plugins/cordova-plugin-geolocation/www/PositionError.js",
    "pluginId": "cordova-plugin-geolocation",
    "runs": true
  },
  {
    "id": "cordova-plugin-navigationbar.navigationbar",
    "file": "plugins/cordova-plugin-navigationbar/www/navigationbar.js",
    "pluginId": "cordova-plugin-navigationbar",
    "clobbers": [
      "window.navigationbar"
    ]
  },
  {
    "id": "cordova-plugin-statusbar.statusbar",
    "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
    "pluginId": "cordova-plugin-statusbar",
    "clobbers": [
      "window.StatusBar"
    ]
  },
  {
    "id": "phonegap-plugin-push.PushNotification",
    "file": "plugins/phonegap-plugin-push/www/push.js",
    "pluginId": "phonegap-plugin-push",
    "clobbers": [
      "PushNotification"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "com.googlemaps.ios": "2.5.0",
  "cordova-plugin-geolocation": "4.0.1",
  "cordova-plugin-navigationbar": "1.0.31",
  "cordova-plugin-statusbar": "2.4.1",
  "cordova-plugin-whitelist": "1.3.3",
  "phonegap-plugin-push": "2.1.2"
};
// BOTTOM OF METADATA
});