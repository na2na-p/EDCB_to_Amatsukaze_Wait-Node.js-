# EDCB_to_Amatsukaze_Wait-Node.js-
以前に作成した物のNode.js版です。前の物はセットアップも煩雑で、不具合も多かったため作り直しました。  
EDCBの録画終了後バッチからAmatsukazeServerへ渡すためのものです。  
録画鯖とエンコード鯖が分かれていて、エンコード鯖を常時起動させたくない場合に使います。  
イメージとしてはタスクスケジューラも利用して、夜間の録画を朝に一度にエンコード鯖に流し込むものです。  


# 使い方
## 導入時
Node.jsの実行環境が必要です。  
https://nodejs.org/ja/  
からダウンロード、インストールしてください。  

### 本体の用意
ソースコードのダウンロードをするか、Releaseからインストーラーをダウンロードしてください。  

### 設定
タスクスケジューラを起動します  
タスクの作成から、任意の名前を設定します。  
トリガー→新規から、希望する頻度(毎日)と開始時刻を設定してください。  
操作→新規からプログラムの開始、参照から、
- プログラム/スクリプト
-- "C:\Program Files\nodejs\node.exe"を(パスが通っているならばnodeでも可)
- 引数の追加
-- scheduled_execution.js までのパス
- 開始
-- scheduled_execution.js のあるディレクトリ
必要に応じてほかの設定をいじって終了です。



### EDCB側でやること
録画後バッチへ付属の"録画後実行バッチ.bat"を設定します。このファイルは必要に応じて動かしてもらって構いません。

### 注意点
今の私にはエンコードプリセットは一つしか設定できません.........
