import path from 'path';
import ip from 'ip';

/** 端口号 */
export const PORT = 3200;
/** 本机ip地址 */
export const IP = ip.address();
/** 生成日志路径 */
export const LogPath = path.resolve(__dirname, '../../logs/koa.log');
/** jwt 秘钥 */
export const JwtSecret = 'jwtSecret1';
/** jwt 有效期 */
export const expiresIn = '10h';
