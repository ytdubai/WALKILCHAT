import { createHash, randomBytes } from 'crypto';
import { supabase } from '../supabase';

export class Authentication {
  static async generateMFASecret(): Promise<string> {
    return randomBytes(20).toString('hex');
  }

  static async enableMFA(userId: string): Promise<{ secret: string; qrCode: string }> {
    const secret = await this.generateMFASecret();
    
    // Store MFA secret in database
    await supabase
      .from('user_mfa')
      .upsert({
        user_id: userId,
        secret: secret,
        enabled: true
      });

    // Generate QR code for easy setup
    const qrCode = `otpauth://totp/WakilChat:${userId}?secret=${secret}&issuer=WakilChat`;
    
    return { secret, qrCode };
  }

  static async verifyMFAToken(userId: string, token: string): Promise<boolean> {
    const { data: mfaData } = await supabase
      .from('user_mfa')
      .select('secret')
      .eq('user_id', userId)
      .single();

    if (!mfaData?.secret) return false;

    // Implement TOTP verification logic
    const currentWindow = Math.floor(Date.now() / 30000);
    
    // Check current and adjacent windows
    for (let window = currentWindow - 1; window <= currentWindow + 1; window++) {
      if (this.generateTOTP(mfaData.secret, window) === token) {
        return true;
      }
    }

    return false;
  }

  private static generateTOTP(secret: string, window: number): string {
    const counter = Buffer.alloc(8);
    counter.writeBigInt64BE(BigInt(window));

    const hmac = createHash('sha1')
      .update(Buffer.from(secret, 'hex'))
      .update(counter)
      .digest();

    const offset = hmac[hmac.length - 1] & 0xf;
    const code = (
      ((hmac[offset] & 0x7f) << 24) |
      ((hmac[offset + 1] & 0xff) << 16) |
      ((hmac[offset + 2] & 0xff) << 8) |
      (hmac[offset + 3] & 0xff)
    ).toString().slice(-6);

    return code.padStart(6, '0');
  }
}