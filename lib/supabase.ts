import { createClient } from '@supabase/supabase-js'

// 브라우저/클라이언트용 Supabase 클라이언트 (publishable key — RLS 적용받음, 노출 안전)
// ※ publishable key(sb_publishable_...) = 예전 anon key의 새 이름. 둘 다 클라이언트용.
// service_role/secret 키를 쓰는 서버용(cron)은 lib/supabase-admin.ts 로 별도 생성 예정 (Day 13)
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
)
