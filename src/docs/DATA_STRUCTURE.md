# Master-Fees Data Structure Documentation

## Overview

The Master-Fees application now uses a comprehensive, scalable data system that supports multiple schools with unique parents, students, and services. All data is centralized in `/data/schoolData.ts`.

## School System

### Active Schools (5 Total)

1. **Twalumbu Educational Center (TEC)**
   - Type: Rural community school
   - Location: Eastern Province
   - Student ID Prefix: TEC
   - Logo: Available

2. **Chimilute Trust Academy (CTA)**
   - Type: Christian-based secondary school
   - Location: Lusaka
   - Student ID Prefix: CTA
   - Logo: Blue shield

3. **Julani School (JUL)**
   - Type: Premium preparatory school
   - Location: Kitwe
   - Student ID Prefix: JUL
   - Logo: Golden shield

4. **Crested Crane Academy (CCA)**
   - Type: International curriculum school
   - Location: Ndola
   - Student ID Prefix: CCA
   - Logo: Circular with crane

5. **International Maarif School (IMS)**
   - Type: Turkish international school
   - Location: Lusaka
   - Student ID Prefix: IMS
   - Logo: Turquoise circular

## Parent Authentication Data

### Twalumbu Educational Center Parents

| Phone Number | Parent Name | Students | Outstanding Balances |
|--------------|-------------|----------|---------------------|
| 977123456 | Mr Stephen Kapambwe | 2 (Talitha, Isaiah) | 1 total |
| 955234567 | Mrs Grace Phiri | 1 (Emmanuel) | 2 total |

### Chimilute Trust Academy Parents

| Phone Number | Parent Name | Students | Outstanding Balances |
|--------------|-------------|----------|---------------------|
| 966987654 | Mrs Alice Mwamba | 2 (John, Sarah) | 2 total |
| 977456789 | Dr Patrick Chilufya | 2 (Michael, Grace) | 1 total |

### Julani School Parents

| Phone Number | Parent Name | Students | Outstanding Balances |
|--------------|-------------|----------|---------------------|
| 965111222 | Mr James Mutale | 1 (Natasha) | 1 total |
| 977333444 | Mrs Rebecca Banda | 2 (Daniel, Rachel) | 2 total |

### Crested Crane Academy Parents

| Phone Number | Parent Name | Students | Outstanding Balances |
|--------------|-------------|----------|---------------------|
| 966555666 | Mr David Mwansa | 2 (Sophie, Oliver) | 1 total |
| 955777888 | Mrs Catherine Lungu | 1 (Isabella) | 3 total |

### International Maarif School Parents

| Phone Number | Parent Name | Students | Outstanding Balances |
|--------------|-------------|----------|---------------------|
| 977888999 | Mr Ahmed Hassan | 2 (Amira, Yusuf) | 1 total |
| 966222333 | Mrs Jennifer Sakala | 1 (Mwila) | 2 total |

## Student Details

### Twalumbu Educational Center Students

- **Talitha Kapambwe** (TEC001) - Grade 3B - 0 balances
- **Isaiah Kapambwe** (TEC002) - Grade 4A - 1 balance
- **Emmanuel Phiri** (TEC003) - Grade 5B - 2 balances

### Chimilute Trust Academy Students

- **John Mwansa** (CTA001) - Form 2 - 0 balances
- **Sarah Banda** (CTA002) - Form 3 - 2 balances
- **Michael Chilufya** (CTA003) - Form 1 - 1 balance
- **Grace Chilufya** (CTA004) - Form 4 - 0 balances

### Julani School Students

- **Natasha Mutale** (JUL001) - Grade 2 - 1 balance
- **Daniel Banda** (JUL002) - Grade 4 - 0 balances
- **Rachel Banda** (JUL003) - Grade 1 - 2 balances

### Crested Crane Academy Students

- **Sophie Mwansa** (CCA001) - Year 7 - 1 balance
- **Oliver Mwansa** (CCA002) - Year 9 - 0 balances
- **Isabella Lungu** (CCA003) - Year 5 - 3 balances

### International Maarif School Students

- **Amira Hassan** (IMS001) - Grade 8 - 0 balances
- **Yusuf Hassan** (IMS002) - Grade 10 - 1 balance
- **Mwila Sakala** (IMS003) - Grade 6 - 2 balances

## School Services & Fees

### Twalumbu Educational Center Services

1. **Tuition Fees - Term 1** - ZMW 1,200
2. **School Meals** - ZMW 300/month
3. **Textbooks & Materials** - ZMW 250
4. **Sports Uniform** - ZMW 180
5. **School Bus Transport** - ZMW 400/month

### Chimilute Trust Academy Services

1. **Tuition Fees - Term 1** - ZMW 2,500
2. **Boarding Fees** - ZMW 1,800
3. **Laboratory Fees** - ZMW 450
4. **Library Subscription** - ZMW 200/year
5. **Music & Arts Program** - ZMW 350

### Julani School Services

1. **Tuition Fees - Term 1** - ZMW 3,500
2. **Swimming Lessons** - ZMW 600
3. **Computer Lab Access** - ZMW 500
4. **Field Trip Package** - ZMW 750
5. **School Uniform Set** - ZMW 850

### Crested Crane Academy Services

1. **Tuition Fees - Term 1** - ZMW 4,200
2. **IGCSE Exam Fees** - ZMW 1,200
3. **Drama & Theatre Club** - ZMW 400
4. **Language Tutoring** (French/Mandarin) - ZMW 650
5. **School Meals Premium** - ZMW 550/month

### International Maarif School Services

1. **Tuition Fees - Term 1** - ZMW 5,000
2. **Turkish Language Course** - ZMW 800
3. **Robotics & STEM Lab** - ZMW 950
4. **International Sports** - ZMW 700
5. **Cultural Exchange Program** - ZMW 1,500

## Service Categories

All services are categorized for analytics and reporting:

- **tuition**: Regular school tuition fees
- **meals**: Cafeteria, lunch programs, boarding meals
- **transport**: Bus services, transportation subscriptions
- **activities**: Extracurricular programs, sports, arts
- **supplies**: Textbooks, uniforms, materials, lab equipment
- **other**: Exam fees, special programs, miscellaneous

## API Functions

### Authentication

```typescript
getParentNameByPhone(phone: string): string
isPhoneRegistered(phone: string): boolean
getSchoolByPhone(phone: string): string
```

### Student Data

```typescript
getStudentsByPhone(phone: string): Student[]
getParentDataByPhone(phone: string): ParentData | null
```

### School Services

```typescript
getSchoolServices(schoolName: string): SchoolService[]
```

## Testing Account Recommendations

For testing different school experiences, use:

- **Budget School**: 977123456 (Twalumbu Educational Center)
- **Mid-Range School**: 966987654 (Chimilute Trust Academy)
- **Premium School**: 977888999 (International Maarif School)

## Data Expansion Guidelines

To add a new school:

1. Add entry to `SCHOOL_DATABASE` in `/data/schoolData.ts`
2. Define 2-3 parents with unique phone numbers
3. Create 2-4 students per parent with unique IDs
4. Define 5+ school-specific services
5. Update `PHONE_USER_MAP` with new phone numbers
6. Update `PHONE_SCHOOL_MAP` with school affiliation
7. Add school logo to `/components/SchoolDetailsPage.tsx` if available

## Data Validation Rules

- **Phone Numbers**: Exactly 9 digits, no country code
- **Student IDs**: Format: [SCHOOL_CODE][NUMBER] (e.g., TEC001)
- **Balances**: Integer count of outstanding invoices
- **Service Amounts**: Positive integers in ZMW
- **Parent Names**: Include title (Mr/Mrs/Dr) for formality

## Notes

- All phone numbers are Zambian format (+260 area code)
- Student balances represent NUMBER of outstanding invoices, not amount
- Services can be modified per school to reflect their unique offerings
- The system supports multiple students per parent across different schools
- Each parent has a "primary school" affiliation but can have students at multiple schools
