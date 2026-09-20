-- =============================================================================
-- INNOCENTIA TECH • PRODUCTION POSTGRESQL / SUPABASE DATABASE SCHEMA
-- =============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES / USERS TABLE
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  role VARCHAR(50) NOT NULL CHECK (role IN ('ceo', 'socio', 'dev', 'advisor', 'client')),
  role_title VARCHAR(100),
  avatar_url TEXT,
  phone VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS projects (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  client_name VARCHAR(255) NOT NULL,
  client_email VARCHAR(255) NOT NULL,
  client_phone VARCHAR(50),
  seller_id VARCHAR(100),
  seller_name VARCHAR(255),
  dev_lead VARCHAR(255) DEFAULT 'Por Asignar (CEO)',
  ux_lead VARCHAR(255) DEFAULT 'Sofía (Innocentia Design)',
  devops_lead VARCHAR(255) DEFAULT 'Iván Castillo (CEO)',
  status VARCHAR(50) DEFAULT 'Por Iniciar' CHECK (status IN ('Por Iniciar', 'En Desarrollo', 'En Revisión', 'Completado')),
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  current_sprint TEXT,
  budget NUMERIC(12, 2) NOT NULL DEFAULT 0,
  paid_amount NUMERIC(12, 2) NOT NULL DEFAULT 0,
  target_date VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. FINANCE RECORDS TABLE (SUPERVISIÓN FINANCIERA & PAGADORES)
CREATE TABLE IF NOT EXISTS finance_records (
  id VARCHAR(50) PRIMARY KEY,
  type VARCHAR(20) NOT NULL CHECK (type IN ('ingreso', 'gasto', 'servicio')),
  section VARCHAR(50) NOT NULL CHECK (section IN ('ingreso_proyecto', 'gasto_operativo', 'comision_vendedor', 'nomina_sueldo')),
  concept VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  amount NUMERIC(12, 2) NOT NULL,
  date VARCHAR(100) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'pagado' CHECK (status IN ('pagado', 'pendiente', 'recurrente')),
  due_date VARCHAR(100),
  provider VARCHAR(255),
  beneficiary VARCHAR(255),
  project_ref VARCHAR(255),
  source_account VARCHAR(255) NOT NULL,
  registered_by VARCHAR(255) NOT NULL,
  paid_by VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. SERVER SERVICES (SERVIDORES CLOUD & SUSCRIPCIONES)
CREATE TABLE IF NOT EXISTS server_services (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL,
  provider VARCHAR(255) NOT NULL,
  cost_monthly NUMERIC(10, 2) NOT NULL,
  renewal_date VARCHAR(100) NOT NULL,
  days_remaining INTEGER DEFAULT 30,
  status VARCHAR(30) DEFAULT 'optimo' CHECK (status IN ('optimo', 'proximo_a_vencer', 'critico')),
  auto_debit BOOLEAN DEFAULT TRUE,
  payment_account VARCHAR(255) NOT NULL,
  paid_by VARCHAR(255),
  reminder_notice VARCHAR(255),
  alert_lead_days INTEGER DEFAULT 3,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. LEADS & PROPOSALS TABLE (FORMULARIOS & COTIZACIONES)
CREATE TABLE IF NOT EXISTS leads (
  id VARCHAR(50) PRIMARY KEY,
  folio VARCHAR(50) UNIQUE,
  client_name VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(255),
  city VARCHAR(100),
  status VARCHAR(50) DEFAULT 'Formulario Enviado' CHECK (status IN ('Formulario Enviado', 'En Cotización', 'Aprobado - En Desarrollo', 'Cerrado')),
  project_type TEXT[],
  design_needs TEXT[],
  tech_features TEXT[],
  estimated_budget VARCHAR(100),
  total_quote NUMERIC(12, 2),
  quote_details JSONB,
  vendor_code VARCHAR(100) DEFAULT 'VEN-CARLOS-202',
  vendor_name VARCHAR(255) DEFAULT 'Carlos Mendoza',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. AUDIT LOGS TABLE (BITÁCORA INMUTABLE)
CREATE TABLE IF NOT EXISTS audit_logs (
  id VARCHAR(50) PRIMARY KEY,
  timestamp VARCHAR(100) NOT NULL,
  action VARCHAR(50) NOT NULL CHECK (action IN ('INGRESO', 'GASTO', 'EDICION', 'ELIMINACION', 'ASIGNACION_TECNICO', 'CAMBIO_ESTADO')),
  payment_status VARCHAR(20) DEFAULT 'realizado' CHECK (payment_status IN ('realizado', 'pendiente', 'automatico')),
  year INTEGER,
  month INTEGER,
  day INTEGER,
  author_name VARCHAR(255) NOT NULL,
  author_role VARCHAR(100) NOT NULL,
  source_account VARCHAR(255),
  target VARCHAR(255) NOT NULL,
  amount NUMERIC(12, 2),
  category VARCHAR(100),
  details TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- INDEXES FOR MAXIMUM QUERY SPEED
CREATE INDEX IF NOT EXISTS idx_finance_paid_by ON finance_records(paid_by);
CREATE INDEX IF NOT EXISTS idx_finance_status ON finance_records(status);
CREATE INDEX IF NOT EXISTS idx_finance_section ON finance_records(section);
CREATE INDEX IF NOT EXISTS idx_audit_created ON audit_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_folio ON leads(folio);

-- =============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES (GRANULAR & AUDITED)
-- =============================================================================

-- 1. Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.finance_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.server_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- 2. Clean previous generic policies if any
DROP POLICY IF EXISTS "Allow all on profiles" ON public.profiles;
DROP POLICY IF EXISTS "Allow all on projects" ON public.projects;
DROP POLICY IF EXISTS "Allow all on finance_records" ON public.finance_records;
DROP POLICY IF EXISTS "Allow all on server_services" ON public.server_services;
DROP POLICY IF EXISTS "Allow all on leads" ON public.leads;
DROP POLICY IF EXISTS "Allow all on audit_logs" ON public.audit_logs;

-- 3. Granular Policies: Leads
CREATE POLICY "leads_public_insert" ON public.leads FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "leads_public_select" ON public.leads FOR SELECT TO public USING (true);
CREATE POLICY "leads_auth_update" ON public.leads FOR UPDATE TO authenticated USING (true);
CREATE POLICY "leads_auth_delete" ON public.leads FOR DELETE TO authenticated USING (true);

-- 4. Granular Policies: Profiles
CREATE POLICY "profiles_public_select" ON public.profiles FOR SELECT TO public USING (true);
CREATE POLICY "profiles_auth_all" ON public.profiles FOR ALL TO authenticated USING (true);

-- 5. Granular Policies: Projects
CREATE POLICY "projects_public_select" ON public.projects FOR SELECT TO public USING (true);
CREATE POLICY "projects_auth_all" ON public.projects FOR ALL TO authenticated USING (true);

-- 6. Granular Policies: Finance Records
CREATE POLICY "finance_public_select" ON public.finance_records FOR SELECT TO public USING (true);
CREATE POLICY "finance_auth_all" ON public.finance_records FOR ALL TO authenticated USING (true);

-- 7. Granular Policies: Server Services
CREATE POLICY "services_public_select" ON public.server_services FOR SELECT TO public USING (true);
CREATE POLICY "services_auth_all" ON public.server_services FOR ALL TO authenticated USING (true);

-- 8. Granular Policies: Audit Logs
CREATE POLICY "audit_public_select" ON public.audit_logs FOR SELECT TO public USING (true);
CREATE POLICY "audit_public_insert" ON public.audit_logs FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "audit_auth_all" ON public.audit_logs FOR ALL TO authenticated USING (true);

