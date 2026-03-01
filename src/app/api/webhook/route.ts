import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get('x-signature')!;

    // Verify webhook signature
    const hmac = crypto
      .createHmac('sha256', process.env.LEMONSQUEEZY_WEBHOOK_SECRET!)
      .update(body, 'utf8')
      .digest('hex');

    if (hmac !== signature) {
      console.error('Webhook signature verification failed');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const event = JSON.parse(body);
    const admin = createAdminClient();

    // Handle order_created event
    if (event.event_name === 'order_created') {
      const order = event.data;
      const customData = order.meta_data?.custom || {};
      const userId = customData.user_id;
      const userEmail = customData.user_email;

      if (userId) {
        await admin.from('subscriptions').upsert({
          user_id: userId,
          lemonsqueezy_customer_id: order.customer_id,
          lemonsqueezy_order_id: order.id,
          plan: 'pro',
          status: 'active',
          updated_at: new Date().toISOString(),
        });
        
        console.log(`Activated pro plan for user: ${userId}`);
      }
    }

    // Handle subscription_cancelled event
    if (event.event_name === 'subscription_cancelled') {
      const subscription = event.data;
      const customData = subscription.meta_data?.custom || {};
      const userId = customData.user_id;

      if (userId) {
        await admin.from('subscriptions').update({
          plan: 'free',
          status: 'canceled',
          updated_at: new Date().toISOString(),
        }).eq('user_id', userId);
        
        console.log(`Cancelled pro plan for user: ${userId}`);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: error.message || 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
