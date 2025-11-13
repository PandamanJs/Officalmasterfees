# Master-Fees Supabase Database Schema

This document provides the complete SQL schema for the Master-Fees school fee payment system. Execute these SQL statements in your Supabase SQL Editor to set up the database.

## Overview

The database supports:
- Parent and student management
- School information
- Service/fee tracking
- Invoice management
- Payment processing
- Receipt generation
- Transaction history

## Database Tables

### 1. Schools Table
Stores information about educational institutions.

```sql
-- Schools table
CREATE TABLE schools (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  address TEXT,
  phone TEXT,
  email TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster school lookups
CREATE INDEX idx_schools_name ON schools(name);

-- Insert default school
INSERT INTO schools (name) VALUES ('Twalumbu Educational Center');
```

### 2. Parents Table
Stores parent/guardian information with phone as unique identifier.

```sql
-- Parents table
CREATE TABLE parents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL UNIQUE,
  email TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for phone number lookups (primary access method)
CREATE INDEX idx_parents_phone ON parents(phone);

-- Insert sample parents
INSERT INTO parents (name, phone) VALUES 
  ('Mr Stephen Kapambwe', '977123456'),
  ('Mrs Alice Mwamba', '966987654');
```

### 3. Students Table
Stores student information linked to parents and schools.

```sql
-- Students table
CREATE TABLE students (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id TEXT NOT NULL UNIQUE, -- School student ID (e.g., C20012)
  name TEXT NOT NULL,
  grade TEXT NOT NULL,
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES parents(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for common queries
CREATE INDEX idx_students_parent_id ON students(parent_id);
CREATE INDEX idx_students_school_id ON students(school_id);
CREATE INDEX idx_students_student_id ON students(student_id);

-- Insert sample students
-- Note: Replace UUIDs with actual values from your schools and parents tables
INSERT INTO students (student_id, name, grade, school_id, parent_id) VALUES
  ('C20012', 'Talitha Kapambwe', 'Grade 3B', 
    (SELECT id FROM schools WHERE name = 'Twalumbu Educational Center' LIMIT 1),
    (SELECT id FROM parents WHERE phone = '977123456' LIMIT 1)),
  ('C30013', 'Isaiah Kapambwe', 'Grade 4A',
    (SELECT id FROM schools WHERE name = 'Twalumbu Educational Center' LIMIT 1),
    (SELECT id FROM parents WHERE phone = '977123456' LIMIT 1)),
  ('C20013', 'John Mwansa', 'Grade 5A',
    (SELECT id FROM schools WHERE name = 'Twalumbu Educational Center' LIMIT 1),
    (SELECT id FROM parents WHERE phone = '966987654' LIMIT 1)),
  ('C20014', 'Sarah Banda', 'Grade 6B',
    (SELECT id FROM schools WHERE name = 'Twalumbu Educational Center' LIMIT 1),
    (SELECT id FROM parents WHERE phone = '966987654' LIMIT 1));
```

### 4. Services Table
Available services/fees that can be paid.

```sql
-- Services table
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  base_amount DECIMAL(10, 2) NOT NULL,
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for active services
CREATE INDEX idx_services_active ON services(is_active);
CREATE INDEX idx_services_school_id ON services(school_id);

-- Insert sample services
INSERT INTO services (name, description, base_amount, school_id) VALUES
  ('Tuition Fee', 'Quarterly tuition payment', 1500.00,
    (SELECT id FROM schools WHERE name = 'Twalumbu Educational Center' LIMIT 1)),
  ('Exam Fee', 'Examination fees', 250.00,
    (SELECT id FROM schools WHERE name = 'Twalumbu Educational Center' LIMIT 1)),
  ('Activity Fee', 'Sports and extracurricular activities', 150.00,
    (SELECT id FROM schools WHERE name = 'Twalumbu Educational Center' LIMIT 1)),
  ('Transport Fee', 'School bus transportation', 300.00,
    (SELECT id FROM schools WHERE name = 'Twalumbu Educational Center' LIMIT 1)),
  ('Lunch Fee', 'School meals program', 200.00,
    (SELECT id FROM schools WHERE name = 'Twalumbu Educational Center' LIMIT 1));
```

### 5. Invoices Table
Outstanding invoices for students.

```sql
-- Invoices table
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invoice_number TEXT NOT NULL UNIQUE,
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  service_id UUID REFERENCES services(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  due_date DATE,
  status TEXT DEFAULT 'pending', -- pending, paid, overdue, cancelled
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for invoice lookups
CREATE INDEX idx_invoices_student_id ON invoices(student_id);
CREATE INDEX idx_invoices_status ON invoices(status);
CREATE INDEX idx_invoices_invoice_number ON invoices(invoice_number);

-- Insert sample invoices
INSERT INTO invoices (invoice_number, student_id, service_id, amount, due_date, status) VALUES
  ('INV-2024-001', 
    (SELECT id FROM students WHERE student_id = 'C30013' LIMIT 1),
    (SELECT id FROM services WHERE name = 'Tuition Fee' LIMIT 1),
    1500.00, '2024-12-31', 'pending'),
  ('INV-2024-002',
    (SELECT id FROM students WHERE student_id = 'C20014' LIMIT 1),
    (SELECT id FROM services WHERE name = 'Exam Fee' LIMIT 1),
    250.00, '2024-12-15', 'pending'),
  ('INV-2024-003',
    (SELECT id FROM students WHERE student_id = 'C20014' LIMIT 1),
    (SELECT id FROM services WHERE name = 'Activity Fee' LIMIT 1),
    150.00, '2024-12-15', 'pending');
```

### 6. Transactions Table
Payment transaction records.

```sql
-- Transactions table
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reference_number TEXT NOT NULL UNIQUE,
  parent_id UUID REFERENCES parents(id) ON DELETE CASCADE,
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
  subtotal DECIMAL(10, 2) NOT NULL, -- Total before service fee
  service_fee DECIMAL(10, 2) NOT NULL, -- 2% service fee
  total_amount DECIMAL(10, 2) NOT NULL, -- Total including service fee
  payment_method TEXT NOT NULL, -- mobile_money, card
  payment_provider TEXT, -- airtel, mtn, zamtel, visa, mastercard
  payment_details JSONB, -- Store additional payment info
  status TEXT DEFAULT 'pending', -- pending, processing, completed, failed
  schedule_id TEXT, -- External payment schedule ID
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- Indexes for transaction queries
CREATE INDEX idx_transactions_parent_id ON transactions(parent_id);
CREATE INDEX idx_transactions_reference_number ON transactions(reference_number);
CREATE INDEX idx_transactions_status ON transactions(status);
CREATE INDEX idx_transactions_created_at ON transactions(created_at DESC);
```

### 7. Transaction Items Table
Individual items/services in each transaction.

```sql
-- Transaction items table (line items for each transaction)
CREATE TABLE transaction_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  transaction_id UUID REFERENCES transactions(id) ON DELETE CASCADE,
  invoice_id UUID REFERENCES invoices(id) ON DELETE CASCADE,
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  service_id UUID REFERENCES services(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for transaction items lookup
CREATE INDEX idx_transaction_items_transaction_id ON transaction_items(transaction_id);
CREATE INDEX idx_transaction_items_invoice_id ON transaction_items(invoice_id);
```

### 8. Receipts Table
Generated receipts for completed payments.

```sql
-- Receipts table
CREATE TABLE receipts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  transaction_id UUID REFERENCES transactions(id) ON DELETE CASCADE,
  receipt_number TEXT NOT NULL UNIQUE,
  pdf_url TEXT, -- If storing PDF in Supabase Storage
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for receipt lookups
CREATE INDEX idx_receipts_transaction_id ON receipts(transaction_id);
CREATE INDEX idx_receipts_receipt_number ON receipts(receipt_number);
```

## Views

### Parent Students View
Convenient view to get all students for a parent by phone number.

```sql
-- View to get students by parent phone
CREATE OR REPLACE VIEW parent_students_view AS
SELECT 
  p.id as parent_id,
  p.name as parent_name,
  p.phone as parent_phone,
  s.id as student_id,
  s.student_id as student_code,
  s.name as student_name,
  s.grade,
  sc.name as school_name,
  COUNT(i.id) FILTER (WHERE i.status = 'pending') as outstanding_balances
FROM parents p
LEFT JOIN students s ON s.parent_id = p.id
LEFT JOIN schools sc ON s.school_id = sc.id
LEFT JOIN invoices i ON i.student_id = s.id AND i.status = 'pending'
GROUP BY p.id, p.name, p.phone, s.id, s.student_id, s.name, s.grade, sc.name;
```

### Transaction History View
View to get formatted transaction history by month.

```sql
-- View for transaction history grouped by month
CREATE OR REPLACE VIEW transaction_history_view AS
SELECT 
  t.id as transaction_id,
  t.reference_number,
  t.total_amount,
  t.payment_method,
  t.payment_provider,
  t.status,
  t.created_at,
  TO_CHAR(t.created_at, 'Month YYYY') as payment_month,
  p.name as parent_name,
  p.phone as parent_phone,
  sc.name as school_name,
  COALESCE(
    json_agg(
      json_build_object(
        'student_name', st.name,
        'service', srv.name,
        'invoice_number', inv.invoice_number,
        'amount', ti.amount
      )
    ) FILTER (WHERE ti.id IS NOT NULL),
    '[]'
  ) as items
FROM transactions t
JOIN parents p ON t.parent_id = p.id
JOIN schools sc ON t.school_id = sc.id
LEFT JOIN transaction_items ti ON ti.transaction_id = t.id
LEFT JOIN students st ON ti.student_id = st.id
LEFT JOIN services srv ON ti.service_id = srv.id
LEFT JOIN invoices inv ON ti.invoice_id = inv.id
GROUP BY t.id, t.reference_number, t.total_amount, t.payment_method, 
         t.payment_provider, t.status, t.created_at, p.name, p.phone, sc.name
ORDER BY t.created_at DESC;
```

## Functions

### Get Students by Phone Function

```sql
-- Function to get students by parent phone number
CREATE OR REPLACE FUNCTION get_students_by_phone(phone_number TEXT)
RETURNS TABLE (
  student_id UUID,
  student_code TEXT,
  name TEXT,
  grade TEXT,
  school_name TEXT,
  outstanding_balances BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    psv.student_id,
    psv.student_code,
    psv.student_name,
    psv.grade,
    psv.school_name,
    psv.outstanding_balances
  FROM parent_students_view psv
  WHERE psv.parent_phone = phone_number;
END;
$$ LANGUAGE plpgsql;
```

### Calculate Service Fee Function

```sql
-- Function to calculate 2% service fee
CREATE OR REPLACE FUNCTION calculate_service_fee(subtotal DECIMAL)
RETURNS DECIMAL AS $$
BEGIN
  RETURN ROUND(subtotal * 0.02, 2);
END;
$$ LANGUAGE plpgsql;
```

### Create Transaction Function

```sql
-- Function to create a complete transaction with items
CREATE OR REPLACE FUNCTION create_transaction(
  p_parent_phone TEXT,
  p_school_name TEXT,
  p_subtotal DECIMAL,
  p_payment_method TEXT,
  p_payment_provider TEXT,
  p_items JSONB
)
RETURNS JSON AS $$
DECLARE
  v_parent_id UUID;
  v_school_id UUID;
  v_service_fee DECIMAL;
  v_total DECIMAL;
  v_transaction_id UUID;
  v_reference_number TEXT;
  v_item JSONB;
  v_student_id UUID;
  v_service_id UUID;
  v_invoice_id UUID;
BEGIN
  -- Get parent ID
  SELECT id INTO v_parent_id FROM parents WHERE phone = p_parent_phone;
  IF v_parent_id IS NULL THEN
    RAISE EXCEPTION 'Parent not found for phone: %', p_parent_phone;
  END IF;
  
  -- Get school ID
  SELECT id INTO v_school_id FROM schools WHERE name = p_school_name;
  IF v_school_id IS NULL THEN
    RAISE EXCEPTION 'School not found: %', p_school_name;
  END IF;
  
  -- Calculate fees
  v_service_fee := calculate_service_fee(p_subtotal);
  v_total := p_subtotal + v_service_fee;
  
  -- Generate reference number
  v_reference_number := 'REF-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
  
  -- Create transaction
  INSERT INTO transactions (
    reference_number, parent_id, school_id, subtotal, 
    service_fee, total_amount, payment_method, payment_provider, status
  ) VALUES (
    v_reference_number, v_parent_id, v_school_id, p_subtotal,
    v_service_fee, v_total, p_payment_method, p_payment_provider, 'pending'
  ) RETURNING id INTO v_transaction_id;
  
  -- Create transaction items
  FOR v_item IN SELECT * FROM jsonb_array_elements(p_items)
  LOOP
    -- Get student ID from student code
    SELECT id INTO v_student_id FROM students WHERE student_id = (v_item->>'student_code')::TEXT;
    
    -- Get service ID from service name
    SELECT id INTO v_service_id FROM services WHERE name = (v_item->>'service_name')::TEXT;
    
    -- Get or create invoice
    SELECT id INTO v_invoice_id FROM invoices 
    WHERE student_id = v_student_id AND service_id = v_service_id AND status = 'pending'
    LIMIT 1;
    
    -- Create transaction item
    INSERT INTO transaction_items (
      transaction_id, invoice_id, student_id, service_id, description, amount
    ) VALUES (
      v_transaction_id, v_invoice_id, v_student_id, v_service_id,
      v_item->>'description', (v_item->>'amount')::DECIMAL
    );
  END LOOP;
  
  -- Return transaction details
  RETURN json_build_object(
    'transaction_id', v_transaction_id,
    'reference_number', v_reference_number,
    'total_amount', v_total,
    'service_fee', v_service_fee
  );
END;
$$ LANGUAGE plpgsql;
```

## Row Level Security (RLS)

Enable RLS for security (optional, based on your auth requirements).

```sql
-- Enable RLS on all tables
ALTER TABLE schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE parents ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE transaction_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE receipts ENABLE ROW LEVEL SECURITY;

-- Example: Allow public read access to schools and services
CREATE POLICY "Public read access for schools" ON schools
  FOR SELECT USING (true);

CREATE POLICY "Public read access for services" ON services
  FOR SELECT USING (is_active = true);

-- Example: Parents can only see their own data
-- Note: This requires Supabase Auth integration
-- CREATE POLICY "Parents can view their own data" ON parents
--   FOR SELECT USING (auth.uid() = user_id);
```

## Triggers

### Updated At Trigger
Automatically update the `updated_at` timestamp.

```sql
-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to all tables with updated_at
CREATE TRIGGER update_schools_updated_at BEFORE UPDATE ON schools
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_parents_updated_at BEFORE UPDATE ON parents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_students_updated_at BEFORE UPDATE ON students
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_invoices_updated_at BEFORE UPDATE ON invoices
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_transactions_updated_at BEFORE UPDATE ON transactions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### Auto-update Invoice Status
Mark invoices as paid when included in completed transaction.

```sql
-- Function to update invoice status when transaction completes
CREATE OR REPLACE FUNCTION update_invoice_status_on_transaction()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
    -- Mark all invoices in this transaction as paid
    UPDATE invoices
    SET status = 'paid'
    WHERE id IN (
      SELECT invoice_id FROM transaction_items WHERE transaction_id = NEW.id
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER transaction_complete_update_invoices
  AFTER UPDATE ON transactions
  FOR EACH ROW
  WHEN (NEW.status = 'completed')
  EXECUTE FUNCTION update_invoice_status_on_transaction();
```

## Sample Queries

### Get all students for a parent

```sql
-- Get students by phone number
SELECT * FROM get_students_by_phone('977123456');
```

### Get payment history for a parent

```sql
-- Get all transactions for a parent
SELECT * FROM transaction_history_view
WHERE parent_phone = '977123456'
ORDER BY created_at DESC;
```

### Get outstanding invoices for a student

```sql
-- Get pending invoices
SELECT 
  i.invoice_number,
  srv.name as service_name,
  i.amount,
  i.due_date,
  s.name as student_name
FROM invoices i
JOIN students s ON i.student_id = s.id
JOIN services srv ON i.service_id = srv.id
WHERE s.student_id = 'C20012' AND i.status = 'pending';
```

## Migration Notes

1. **UUID Extension**: Ensure the `uuid-ossp` extension is enabled:
   ```sql
   CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
   ```

2. **Existing kv_store**: This schema works alongside the existing `kv_store_f6550ac6` table that the app currently uses.

3. **Data Migration**: To migrate from the current mock data to this schema:
   - Export data from `data/students.ts`
   - Use the INSERT statements above as templates
   - Adjust UUIDs and relationships as needed

4. **Frontend Integration**: Update frontend to:
   - Call Supabase functions instead of mock data
   - Use the created views for efficient queries
   - Implement transaction creation via the `create_transaction` function

## Backup and Maintenance

```sql
-- Regular maintenance: Update statistics
ANALYZE schools;
ANALYZE parents;
ANALYZE students;
ANALYZE services;
ANALYZE invoices;
ANALYZE transactions;
ANALYZE transaction_items;
ANALYZE receipts;

-- Clean up old pending transactions (older than 24 hours)
UPDATE transactions 
SET status = 'expired' 
WHERE status = 'pending' 
  AND created_at < NOW() - INTERVAL '24 hours';
```

## Next Steps

1. Execute this SQL in Supabase SQL Editor
2. Verify all tables and relationships are created
3. Test sample queries
4. Update frontend to use actual database instead of mock data
5. Implement authentication if needed
6. Configure Row Level Security policies based on your auth strategy
7. Set up Supabase Storage for PDF receipts (optional)

---

**Schema Version**: 1.0  
**Last Updated**: November 11, 2025  
**Compatible with**: Master-Fees Frontend v1.0
