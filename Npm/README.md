## NPX

- X có nghĩa là execute: thực thi mà không cần file package.json và thực thi script đó trên kho npm.

## MAJOR.MINOR.PATCH

- Major là những version `breaking change`
- Minor là thêm những chức năng mới, vẫn tương thích với phiên bản trước
- Patch là vá lỗi

## ~ ^

- `~2.0.6`: lấy patch mới nhất. Không lấy minor.
- `^2.0.6`: lấy cả patch và minor. Không lấy major.
- Coi chi tiết version cài đặt trong `package-lock.json`

## Cài đặt `ncu`

- `npm i -g npm-check-updates`
- `ncu`: để xem những gói cần nâng cấp
- `ncu -u`: update file package.json
- `npm i`: để cài đặt lại các version.
