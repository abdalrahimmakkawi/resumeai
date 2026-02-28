import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook error: ${err.message}` }, { status: 400 });
  }

  const admin = createAdminClient();

  if (['customer.subscription.created', 'customer.subscription.updated', 'customer.subscription.deleted'].includes(event.type)) {
    const subscription = event.data.object as Stripe.Subscription;
    const customerId = subscription.customer as string;
    const isActive = subscription.status === 'active';

    await admin.from('subscriptions').update({
      plan: isActive ? 'pro' : 'free',
      status: subscription.status as any,
    }).eq('stripe_customer_id', customerId);
  }

  return NextResponse.json({ received: true });
}
