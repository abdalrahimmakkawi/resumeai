-- Resumes table
create table if not exists resumes (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  job_title text,
  company_name text,
  resume_json jsonb,
  ats_score integer,
  cover_letter text,
  created_at timestamp with time zone default now()
);

-- Subscriptions table
create table if not exists subscriptions (
  user_id uuid references auth.users(id) on delete cascade primary key,
  stripe_customer_id text,
  plan text default 'free',
  status text default 'active'
);

-- RLS
alter table resumes enable row level security;
alter table subscriptions enable row level security;

create policy "Users can manage their own resumes"
  on resumes for all using (auth.uid() = user_id);

create policy "Users can view their own subscription"
  on subscriptions for select using (auth.uid() = user_id);
