import NodeRsa from 'node-rsa';

interface PrivateKey {
  guid: string;
  privateKey: string;
}
export default class Rsa {
  public static privateKey: PrivateKey[] = [];

  /**
   *	Rsa 加密
   *	@param {string} password
   *  @param {string} publicKey
   * 	@return {string}
   */
  public static rsaEncryption(password: string, publicKey: string) {
    const rsa = new NodeRsa(publicKey, 'pkcs1-public-pem');
    rsa.setOptions({ encryptionScheme: 'pkcs1' });
    return rsa.encrypt(password, 'base64');
  }

  /**
   *	Rsa 生成秘钥对
   */
  public static generatekey() {
    const rsa = new NodeRsa({ b: 512 });
    rsa.setOptions({ encryptionScheme: 'pkcs1' });
    const privateKey = rsa.exportKey('pkcs1-private-pem');
    const publicKey = rsa.exportKey('pkcs1-public-pem');
    const data: PrivateKey = {
      guid: this.guid(),
      privateKey
    };
    this.privateKey.push(data);
    console.log(publicKey);
    return {
      guid: data.guid,
      publicKey
    };
  }

  /**
   * Rsa解密
   *	@param {string} code 加密信息
   *  @param {string} guid 唯一标识编码
   */
  public static rsaDecode(code: string, guid: string) {
    let privateKey = '';
    for (let i = this.privateKey.length - 1; i >= 0; i -= 1) {
      if (this.privateKey[i].guid === guid) {
        privateKey = this.privateKey[i].privateKey;
        break;
      }
    }
    const decode = new NodeRsa(privateKey, 'pkcs1');
    decode.setOptions({ encryptionScheme: 'pkcs1' });
    return decode.decrypt(code, 'utf8');
  }

  /** 生成guid方案 */
  private static guid() {
    function S4() {
      return Math.trunc((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return `${S4() + S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`;
  }
}
