# express-base-es6-esm

## !!使用前注意

- `.env`檔已移除，記得clone後，將`.env.template`改為`.env`檔案
- `.env`中`DB_設定`需改為你的資料庫、帳號、密碼才能開始使用
- 資料庫schema檔案在`data`中

## TODO

- [ ] line login
- [ ] google(firebase) login
- [ ] category db
- [ ] favorite db?
- [ ] comment db?
- [ ] order db(order_item, shipping, payment)

## FIXME

## Changlog

- OTP workflow
- +nodemailer + Google SMTP
- +[faker](https://github.com/faker-js/faker)
- fixed create table issue(executeQuery only one query each time) drop if exist then create
- es6 import wo babel 
- auth route (session-cookie should use?... no, use jwt)

### 20230604

- get: all, byId is ok
- post: insertOne is ok

### 20230606

- json2db(create db and insert data) ok
- db backup tool ok
- create, drop, TRUNCATE db.... should need another TEST db?

.env檔內容:
PORT=3005
NODE_ENV=development
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=project
DB_USERNAME=root
DB_PASSWORD=
SMTP_TO_EMAIL=xxxx@gmail.com
SMTP_TO_PASSWORD=xxxxxx
ACCESS_TOKEN_SECRET=thisisverstrongaccesstokensecre
DEBUG=true
OTP_SECRET=thisisaotpsecretforserver