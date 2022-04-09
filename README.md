### EAS

iOS用:デバイス登録(開発用と内部配布バイナリのインストールに必須)
```
eas device:create
```
リンク先からプロファイルをDL&インストール

登録済みiPhoneの表示
```
eas device:list
```

AndroidはAPKをサイドロードする

ビルド:開発用バイナリ
```
eas build --profile development --platform ios
eas build --profile development --platform android
```

ビルド:内部配布バイナリ
```
eas build --profile preview --platform ios
```

ビルド:プロダクション
```
eas build --profile production --platform ios
```

OTA
```
expo publish --release-channel internal
expo publish --release-channel production
```

シミュレーター用ビルド

`eas.json`の`ios.simulator`を`true`に変更してから
```
eas build -p ios --profile development
```
完了後`.tar.gz`をダウンロード&解凍後に`.app`をシミュレーターにドラッグ&ドロップ