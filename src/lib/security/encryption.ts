import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

export class MessageEncryption {
  private static readonly algorithm = 'aes-256-gcm';
  private static readonly keyLength = 32;
  private static readonly ivLength = 12;
  private static readonly saltLength = 16;
  private static readonly tagLength = 16;

  static generateEncryptionKey(): Buffer {
    return randomBytes(this.keyLength);
  }

  static async encryptMessage(message: string, key: Buffer): Promise<string> {
    const iv = randomBytes(this.ivLength);
    const salt = randomBytes(this.saltLength);
    const cipher = createCipheriv(this.algorithm, key, iv);
    
    let encrypted = cipher.update(message, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const tag = cipher.getAuthTag();

    // Combine IV, salt, tag, and encrypted message
    return Buffer.concat([
      iv,
      salt,
      tag,
      Buffer.from(encrypted, 'hex')
    ]).toString('base64');
  }

  static async decryptMessage(encryptedData: string, key: Buffer): Promise<string> {
    const data = Buffer.from(encryptedData, 'base64');
    
    const iv = data.subarray(0, this.ivLength);
    const salt = data.subarray(this.ivLength, this.ivLength + this.saltLength);
    const tag = data.subarray(this.ivLength + this.saltLength, this.ivLength + this.saltLength + this.tagLength);
    const encrypted = data.subarray(this.ivLength + this.saltLength + this.tagLength);

    const decipher = createDecipheriv(this.algorithm, key, iv);
    decipher.setAuthTag(tag);

    let decrypted = decipher.update(encrypted.toString('hex'), 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  }
}