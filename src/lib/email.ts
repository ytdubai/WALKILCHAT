import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendInvestorEmail(
  to: string,
  investorName: string,
  companyName?: string
) {
  const subject = `Close the $75B Broker Gap - Investment Opportunity`;
  
  const html = `
    <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: white; padding: 40px 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #FFD700; font-size: 32px; margin: 0;">WakilChat™</h1>
        <p style="color: #999; font-size: 14px;">AI-Powered Global Trade Platform</p>
      </div>

      <p style="font-size: 16px; line-height: 1.8; color: #ddd;">Dear ${investorName},</p>

      <p style="font-size: 16px; line-height: 1.8; color: #ddd;">
        I'm reaching out because ${companyName ? `${companyName} exports` : 'you export'} coffee/sesame/agricultural products and likely face the same frustration every exporter does:
      </p>

      <div style="background: rgba(239,68,68,0.1); border: 2px solid rgba(239,68,68,0.3); border-radius: 12px; padding: 20px; margin: 20px 0;">
        <p style="color: #fca5a5; font-weight: bold; margin: 0 0 10px;">The Broker Problem:</p>
        <p style="color: #fee2e2; margin: 0; line-height: 1.8;">
          ❌ Local broker takes 10%<br/>
          ❌ Export agent takes 8%<br/>
          ❌ International broker takes 12%<br/>
          ❌ Payment delayed 60-90 days<br/>
          <strong style="font-size: 18px; display: block; margin-top: 10px;">= 30-40% of your profit GONE</strong>
        </p>
      </div>

      <p style="font-size: 18px; font-weight: bold; color: #FFD700; margin: 30px 0 15px;">I built WakilChat™ to eliminate this.</p>

      <div style="background: rgba(16,185,129,0.1); border: 2px solid rgba(16,185,129,0.3); border-radius: 12px; padding: 20px; margin: 20px 0;">
        <p style="color: #6ee7b7; font-weight: bold; margin: 0 0 10px;">Our AI Solution:</p>
        <p style="color: #d1fae5; margin: 0; line-height: 1.8;">
          ✅ AI finds global buyers automatically<br/>
          ✅ Direct connection (no brokers)<br/>
          ✅ Escrow protection<br/>
          ✅ Paid in 3-5 days<br/>
          ✅ Only 2% platform fee<br/>
          <strong style="font-size: 18px; display: block; margin-top: 10px; color: #10b981;">$200k deal: You keep $196k (vs $120k with brokers)</strong>
        </p>
      </div>

      <p style="font-size: 16px; line-height: 1.8; color: #ddd;">
        <strong>Real results:</strong> Coffee exporter used our AI, found 3 buyers in USA, closed $480,000 in deals, saved $192,000 in broker fees.
      </p>

      <div style="margin: 30px 0; text-align: center;">
        <a href="https://wakilchat.com/export" style="display: inline-block; background: linear-gradient(135deg, #FFD700, #FFA500); color: #000; padding: 16px 40px; border-radius: 50px; text-decoration: none; font-weight: bold; font-size: 16px;">
          See How It Works →
        </a>
      </div>

      <p style="font-size: 16px; line-height: 1.8; color: #ddd;">
        <strong style="color: #FFD700;">Investment Opportunity:</strong>
      </p>

      <p style="font-size: 16px; line-height: 1.8; color: #ddd;">
        Beyond being a user, WakilChat is also raising a $2M seed round. Given you understand the broker problem intimately, I wanted to share this opportunity with you first.
      </p>

      <ul style="font-size: 15px; line-height: 2; color: #ccc;">
        <li>Market: $89B TAM (agricultural + car exports)</li>
        <li>Traction: 50,000 users, $5M GMV in 6 months</li>
        <li>Revenue: $3.8M projected Year 1</li>
        <li>Ask: $2M for 11.8% equity</li>
        <li>Exit: $500M+ potential in 4-5 years</li>
      </ul>

      <p style="font-size: 16px; line-height: 1.8; color: #ddd;">
        <strong>Can we talk this week?</strong> I'd love to:
      </p>

      <ol style="font-size: 15px; line-height: 2; color: #ccc;">
        <li>Show you the AI matching demo (15 min)</li>
        <li>Discuss how you could save $500k-1M/year</li>
        <li>Share the investment details</li>
      </ol>

      <p style="font-size: 16px; line-height: 1.8; color: #ddd;">
        Just reply with your availability or call me directly.
      </p>

      <div style="margin-top: 40px; padding-top: 30px; border-top: 1px solid rgba(255,255,255,0.1);">
        <p style="margin: 0; color: #999; font-size: 14px;">
          <strong style="color: #FFD700;">Yitayal Mesfin</strong><br/>
          Founder & CEO, WakilChat™<br/>
          investors@wakilchat.com<br/>
          wakilchat.com
        </p>
      </div>

      <p style="font-size: 12px; color: #666; margin-top: 30px; text-align: center;">
        © 2026 WakilChat™ | All Rights Reserved
      </p>
    </div>
  `;

  const { data, error } = await resend.emails.send({
    from: 'Yitayal @ WakilChat <investors@wakilchat.com>',
    to: [to],
    subject,
    html,
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function sendFounderSupplierInvite(
  to: string,
  name: string,
  spotNumber: number
) {
  const subject = `🔥 Founder Supplier Spot #${spotNumber} Reserved for You`;
  
  const html = `
    <div style="font-family: system-ui; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: white; padding: 40px 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <div style="font-size: 60px; margin-bottom: 10px;">👑</div>
        <h1 style="color: #FFD700; font-size: 28px;">WakilChat™ Founder Supplier</h1>
      </div>

      <p style="font-size: 16px; color: #ddd;">Hi ${name},</p>

      <p style="font-size: 16px; line-height: 1.8; color: #ddd;">
        We've reserved <strong style="color: #FFD700;">Founder Supplier Spot #${spotNumber}</strong> for you.
      </p>

      <div style="background: linear-gradient(135deg, rgba(255,215,0,0.2), rgba(139,92,246,0.1)); border: 2px solid #FFD700; border-radius: 16px; padding: 30px; margin: 30px 0; text-align: center;">
        <div style="font-size: 48px; font-weight: bold; color: #FFD700; margin-bottom: 10px;">
          #${spotNumber}
        </div>
        <p style="font-size: 14px; color: #ccc; margin: 0;">
          of 100 Legendary Founder Suppliers
        </p>
      </div>

      <p style="font-size: 18px; font-weight: bold; color: #FFD700; margin: 20px 0;">
        Your Lifetime Benefits Worth $370,000+:
      </p>

      <ul style="font-size: 15px; line-height: 2.2; color: #d1fae5;">
        <li>💰 <strong>0% Transaction Fees Forever</strong> (save $200k+ over 10 years)</li>
        <li>👑 <strong>Legendary Badge</strong> displayed on all your listings</li>
        <li>⭐ <strong>Automatic 5-Star Rating</strong> (instant credibility)</li>
        <li>🎯 <strong>Priority Placement Forever</strong> (always show first)</li>
        <li>🤖 <strong>Free AI Buyer Matching</strong> (normally $500/deal)</li>
        <li>📊 <strong>Premium Analytics Access</strong> (normally $200/month)</li>
      </ul>

      <div style="background: rgba(239,68,68,0.15); border: 2px solid rgba(239,68,68,0.4); border-radius: 12px; padding: 20px; margin: 30px 0;">
        <p style="color: #fca5a5; font-weight: bold; text-align: center; margin: 0; font-size: 16px;">
          ⚠️ This spot expires in 48 hours!
        </p>
        <p style="color: #fee2e2; text-align: center; margin: 10px 0 0; font-size: 14px;">
          After that, spot #${spotNumber} goes to the next supplier and you'll be placed in standard tier (2% fees).
        </p>
      </div>

      <div style="text-align: center; margin: 30px 0;">
        <a href="https://wakilchat.com/founder-supplier?spot=${spotNumber}" style="display: inline-block; background: linear-gradient(135deg, #FFD700, #FFA500); color: #000; padding: 18px 50px; border-radius: 50px; text-decoration: none; font-weight: bold; font-size: 18px; box-shadow: 0 8px 30px rgba(255,215,0,0.5);">
          👑 Claim Spot #${spotNumber} Now
        </a>
      </div>

      <p style="font-size: 14px; color: #999; text-align: center;">
        Setup takes 3 minutes • No credit card required
      </p>

      <div style="margin-top: 40px; padding-top: 30px; border-top: 1px solid rgba(255,255,255,0.1);">
        <p style="font-size: 14px; color: #999;">
          Best regards,<br/>
          <strong style="color: #FFD700;">Yitayal Mesfin</strong><br/>
          Founder & CEO, WakilChat™
        </p>
      </div>
    </div>
  `;

  const { data, error } = await resend.emails.send({
    from: 'Yitayal @ WakilChat <founders@wakilchat.com>',
    to: [to],
    subject,
    html,
  });

  if (error) throw error;
  return data;
}