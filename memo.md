# Memo of studying

## 181117 
### ./sspa server 動かない問題
**p.13** の `./sspa server` でサーバー立ち上げをwindowsでやろうとしたところちゃんと動かず。
まあ多分pythonとか入ってないんじゃないかなとか思った。
もちろん入っていないのは事実だったんだけど、 `cygwin` 入れろとあったのでそれで対応

入れて実行してみたが、改行がなぜかコードだと認識されていた。
http://tooljp.com/qa/bash-r-command-not-found-96A8.html
winのせいで改行コードが変わっているのだろうと思う、vscode上で変更

変更したら実行はできてそうだが今度pythonがない的なエラーでとまる
python入ってると思ってたら入ってなかった
説明はちゃんと読みましょう
https://ll.just4fun.biz/?Python/%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB/Cygwin%E7%92%B0%E5%A2%83%E3%81%ABPython%E3%82%92%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB

### AWS CLIをインストールしようとしたとき
**p.17**  `sudo easy_install pip` とやったらうまくいかなかった
そもそも `sudo` が動かない
それはつけなければ動いたがよかった、ただし下記エラーが出てきた
特に `pkg_resources.DistributionNotFound: The 'distribute==0.6.14' distribution was not found and is required by the application`
といったエラーが出てきた
そもそもdistribution的なやつもいないし、もちろんpipもいない
cygwin環境はwin環境とも少し違うようなので、検索するときはcygwinとつけると良さげ

`$ easy_install-2.7 pip `
でいけた・・・
http://d.hatena.ne.jp/yohei-a/20161211/1481414788

### s3バケットの作成
**p.21** 
S3バケットの作成、本来的な作り方を知りたいところではある
sspaがラップしてるだけ、ってことなら、AWS CLIでいけるのか？
-> CLIのコマンドがちゃんとあったので、それでやればok

`An error occurred (InvalidAccessKeyId) when calling the PutBucketWebsite operation: The AWS Access Key Id you provided does not exist in our records.`
エラーが出てたから何かと思ったら設定がイケてなかった。
変な空白が入っていた。
コピペ注意

その後
learnjs.benrady.comでやるとかぶってるからだめ、と言われる
learnjsSampleM.benrady.comとやると
`An error occurred (NoSuchBucket) when calling the PutBucketWebsite operation: The specified bucket does not exist`
と出る、若干理解できなかったがよく調べると大文字がだめだったみたい
https://dev.classmethod.jp/cloud/aws/us-east-s3-bucket-naming-rule-change-in-2018-march/


## 181118 
### vscodeでcygwinの読み込み
今度設定してみてもいいかも
https://blog.fujiu.jp/2016/07/visual-studio-code-cygwin.html
http://dynamicsoar.hatenablog.com/entry/2018/09/02/065456

https://vscode-doc-jp.github.io/docs/userguide/integrated-terminal.html

### memo of AWS
configとcredentialsは `home/user-name/.aws` にいる@windows