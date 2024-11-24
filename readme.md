# regroup-tabs

このChrome拡張機能は、OpenAI APIを使用して、ユーザー定義のプロンプトに基づいてブラウザタブをクラスタリングおよび再グループ化します。

## 機能

- デフォルトまたはカスタムプロンプトを使用してタブをグループ化。
- シンプルで直感的なユーザーインターフェース。

## インストール

1. リポジトリをクローンします。
2. Chromeを開き、`chrome://extensions/`に移動します。
3. 右上の「デベロッパーモード」を有効にします。
4. 「パッケージ化されていない拡張機能を読み込む」をクリックし、クローンしたリポジトリフォルダを選択します。

## 使用方法

1. 拡張機能のアイコンをクリックしてポップアップを開きます。
2. カスタムプロンプトを入力するか、デフォルトのプロンプトを使用します。
3. 「タブを再グループ化」をクリックしてタブを整理します。

## 権限

- `tabs`: ブラウザタブへのアクセスおよび変更。
- `tabGroups`: タブグループの作成および管理。
- `activeTab`: 現在アクティブなタブとの対話。
- `storage`: ユーザー設定の保存。

## ライセンス

このプロジェクトはMITライセンスの下でライセンスされています。