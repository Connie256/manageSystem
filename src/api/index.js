import request from '@/utils/request';



// 短信验证码发送
export function getUserPower() {
  return request({
    url: '/basedata/permissions/listByUserIdWithToken',
    method: 'POST',
  });
}
