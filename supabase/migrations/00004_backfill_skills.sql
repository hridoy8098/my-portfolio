-- Backfill public.skills from the legacy skill_categories.skills jsonb array.
-- Idempotent: existing rows matched by (category_id, name) are skipped.

insert into public.skills (category_id, name, icon, position, is_published)
select
  c.id,
  s.name,
  coalesce(s.icon, ''),
  coalesce(s.position, 0),
  coalesce(s.is_published, true)
from public.skill_categories c
cross join lateral jsonb_array_elements(
  case
    when jsonb_typeof(c.skills) = 'array' then c.skills
    else '[]'::jsonb
  end
) as raw
cross join lateral jsonb_to_record(raw) as s(
  name text,
  icon text,
  position int,
  is_published boolean
)
where s.name is not null and s.name <> ''
  and not exists (
    select 1 from public.skills existing
    where existing.category_id = c.id and existing.name = s.name
  );

-- Make sure the skills table stays readable for the app even when it was
-- created outside migrations.
alter table public.skills enable row level security;

create policy if not exists "public read skills"
  on public.skills for select to anon using (true);