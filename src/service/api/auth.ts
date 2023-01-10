/**
 * 登录
 * @param userName - 用户名
 * @param password - 密码
 */
// TODO 替换成接口访问
export function fetchLogin(
  _userName: string,
  _password: string,
): Promise<{ data: { token: string } }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          token: 'this is a token',
        },
      });
    }, 200);
  });
}
