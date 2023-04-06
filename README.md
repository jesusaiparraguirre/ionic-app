## Compilation prod

you should copy in platforms/android:
- release-signing.properties
- leadgods-key.keystore

then, In the project directory, you can run:
ionic cordova build android --prod --release

to generate the apk release

you'll find the apk in ~leadgods-app\platforms\android\app\build\outputs\apk\release

you can generate abb, to run:
ionic cordova build android --prod --release -- -- --packageType=bundle

you'll find the abb in ~leadgods-app\platforms\android\app\build\outputs\bundle\release