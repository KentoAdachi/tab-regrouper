# Tab Regrouper

このChrome拡張機能は、OpenAI APIを使用して、ユーザー定義のプロンプトに基づいてブラウザのタブをグループ化します。

## インストール

1. リポジトリをクローンします。
2. Chromeを開き、`chrome://extensions/`に移動します。
3. 右上の「デベロッパーモード」を有効にします。
4. 「パッケージ化されていない拡張機能を読み込む」をクリックし、クローンしたリポジトリフォルダを選択します。

## 使用方法

1. 拡張機能のアイコンをクリックしてポップアップを開きます。
2. APIキーを入力します。
3. 「Regroup Tabs」をクリックしてタブを整理します。

## 設定
設定内容の説明は以下の通りです。
  - Custom Prompt: 
    - クラスタリング時の指示を設定します。 
  - API Key: 
    - APIキーを設定します。
  - API Endpoint: 
    - APIのエンドポイントを設定します。
    - デフォルトはhttps://api.openai.com/v1/chat/completionsです。
    - OpenAI APIと同様のリクエスト形式をサポートするプロキシサーバを使用する場合に指定します。通常は変更する必要はありません。
  - Model: 
    - 使用するモデルを設定します。
    - デフォルトはgpt-4o-miniです。
    - 利用可能なモデルの一覧は以下のドキュメントを参考にしてください。
      - https://platform.openai.com/docs/api-reference/models

## 権限

- `tabs`: ブラウザタブへのアクセスおよび変更。
- `tabGroups`: タブグループの作成および管理。
- `activeTab`: 現在アクティブなタブとの対話。
- `storage`: chrome.storage.localへのユーザー設定の保存。

## ライセンス

このプロジェクトはMITライセンスで提供されています。