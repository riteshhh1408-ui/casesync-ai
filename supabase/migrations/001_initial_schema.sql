create table public.profiles (
    id uuid primary key references auth.users(id) on delete cascade,
    full_name text,
    created_at timestamptz default now()
);

create table public.cases (
    id uuid primary key default gen_random_uuid(),

    user_id uuid not null
        references public.profiles(id)
        on delete cascade,

    title text not null,
    description text,

    status text not null default 'open'
        check (
            status in (
                'open',
                'under_review',
                'verified',
                'closed'
            )
        ),

    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

create table public.evidence (
    id uuid primary key default gen_random_uuid(),

    case_id uuid not null
        references public.cases(id)
        on delete cascade,

    uploaded_by uuid not null
        references auth.users(id)
        on delete cascade,

    evidence_type text not null
        check (
            evidence_type in (
                'screenshot',
                'message',
                'transaction',
                'url',
                'csv',
                'document',
                'other'
            )
        ),

    file_name text,
storage_path text,
source_url text,
description text,
flagged boolean default false,
flag_reason text,
flagged_by uuid references auth.users(id),
flagged_at timestamptz,
uploaded_at timestamptz default now()
);

create table public.extracted_data (
    id uuid primary key default gen_random_uuid(),

    evidence_id uuid not null
        references public.evidence(id)
        on delete cascade,

    field_name text not null,
    masked_value text,
    raw_value text,
    confidence numeric(5,4),
    extraction_source text,
    created_at timestamptz default now()
);

create table public.timeline_events (
    id uuid primary key default gen_random_uuid(),

    case_id uuid not null
        references public.cases(id)
        on delete cascade,

    evidence_id uuid
        references public.evidence(id)
        on delete set null,

    event_time timestamptz,
    event_type text,
    description text,
    created_at timestamptz default now()
);

create table public.verification (
    id uuid primary key default gen_random_uuid(),

    evidence_id uuid not null
        references public.evidence(id)
        on delete cascade,

    verified_by uuid not null
        references auth.users(id)
        on delete cascade,

    verification_status text not null
        check (
            verification_status in (
                'verified',
                'needs_review',
                'potential_inconsistency'
            )
        ),

    notes text,
    verified_at timestamptz default now()
);