alter table public.profiles enable row level security;
alter table public.cases enable row level security;
alter table public.evidence enable row level security;
alter table public.extracted_data enable row level security;
alter table public.timeline_events enable row level security;
alter table public.verification enable row level security;


create policy "Users can view own profile"
on public.profiles
for select
to authenticated
using (auth.uid() = id);

create policy "Users can update own profile"
on public.profiles
for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);


create policy "Users can view own cases"
on public.cases
for select
to authenticated
using (auth.uid() = user_id);

create policy "Users can create own cases"
on public.cases
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Users can update own cases"
on public.cases
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can delete own cases"
on public.cases
for delete
to authenticated
using (auth.uid() = user_id);


create policy "Users can view own evidence"
on public.evidence
for select
to authenticated
using (
    exists (
        select 1
        from public.cases
        where cases.id = evidence.case_id
        and cases.user_id = auth.uid()
    )
);

create policy "Users can upload own evidence"
on public.evidence
for insert
to authenticated
with check (
    uploaded_by = auth.uid()
    and exists (
        select 1
        from public.cases
        where cases.id = evidence.case_id
        and cases.user_id = auth.uid()
    )
);


create policy "Users can view own extracted data"
on public.extracted_data
for select
to authenticated
using (
    exists (
        select 1
        from public.evidence
        join public.cases
            on cases.id = evidence.case_id
        where evidence.id = extracted_data.evidence_id
        and cases.user_id = auth.uid()
    )
);

create policy "Users can create extracted data"
on public.extracted_data
for insert
to authenticated
with check (
    exists (
        select 1
        from public.evidence
        join public.cases
            on cases.id = evidence.case_id
        where evidence.id = extracted_data.evidence_id
        and cases.user_id = auth.uid()
    )
);


create policy "Users can view own timeline"
on public.timeline_events
for select
to authenticated
using (
    exists (
        select 1
        from public.cases
        where cases.id = timeline_events.case_id
        and cases.user_id = auth.uid()
    )
);

create policy "Users can create own timeline"
on public.timeline_events
for insert
to authenticated
with check (
    exists (
        select 1
        from public.cases
        where cases.id = timeline_events.case_id
        and cases.user_id = auth.uid()
    )
);


create policy "Users can view own verification"
on public.verification
for select
to authenticated
using (
    exists (
        select 1
        from public.evidence
        join public.cases
            on cases.id = evidence.case_id
        where evidence.id = verification.evidence_id
        and cases.user_id = auth.uid()
    )
);

create policy "Users can create own verification"
on public.verification
for insert
to authenticated
with check (
    verified_by = auth.uid()
    and exists (
        select 1
        from public.evidence
        join public.cases
            on cases.id = evidence.case_id
        where evidence.id = verification.evidence_id
        and cases.user_id = auth.uid()
    )
);


create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
    insert into public.profiles (id, full_name)
    values (
        new.id,
        new.raw_user_meta_data->>'full_name'
    );

    return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user();