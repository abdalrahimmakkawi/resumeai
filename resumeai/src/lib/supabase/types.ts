export type Resume = {
  id: string;
  user_id: string;
  job_title: string | null;
  company_name: string | null;
  resume_json: any;
  ats_score: number | null;
  cover_letter: string | null;
  created_at: string;
};

export type Subscription = {
  user_id: string;
  stripe_customer_id: string | null;
  plan: 'free' | 'pro';
  status: 'active' | 'past_due' | 'canceled' | 'incomplete';
};
