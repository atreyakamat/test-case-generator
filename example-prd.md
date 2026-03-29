# Example Product Requirements Document (PRD)

This is an example PRD file that you can use with TestPilot to provide additional context for test generation.

## Product: User Authentication System

### Overview
A secure authentication system that handles user registration, login, and session management.

### Core Features

#### 1. User Registration
- Users can create accounts with email and password
- Passwords must be at least 8 characters with one uppercase, one lowercase, and one number
- Email validation is required
- Duplicate emails are rejected

#### 2. User Login
- Users authenticate with email and password
- JWT tokens are issued upon successful login
- Tokens expire after 24 hours
- Failed login attempts are logged

#### 3. Session Management
- JWT tokens are validated on each request
- Tokens can be refreshed before expiration
- Logout invalidates the current token

### Business Rules

1. **Email Validation**: Must match standard email regex pattern
2. **Password Policy**:
   - Minimum 8 characters
   - At least one uppercase letter
   - At least one lowercase letter
   - At least one number
   - At least one special character recommended
3. **Rate Limiting**: Max 5 login attempts per minute per IP
4. **Token Expiry**: JWT tokens valid for 24 hours

### Error Handling

- `400 Bad Request`: Invalid input format
- `401 Unauthorized`: Invalid credentials or expired token
- `403 Forbidden`: Account locked or insufficient permissions
- `409 Conflict`: Duplicate email during registration
- `429 Too Many Requests`: Rate limit exceeded

### Security Requirements

- Passwords must be hashed using bcrypt (minimum 10 rounds)
- JWT tokens signed with RS256 algorithm
- HTTPS required for all authentication endpoints
- Tokens stored in httpOnly cookies (not localStorage)

---

## Usage with TestPilot

When using this PRD with TestPilot, it will generate tests that:

1. Validate business rules (password policies, email formats)
2. Test error conditions (invalid credentials, rate limiting)
3. Verify security requirements (hashing, token validation)
4. Check edge cases based on requirements

### Example Command:

```bash
testpilot generate src/auth/login.ts --prd docs/prd.md
```

This will generate tests that understand the context of your authentication requirements and create more comprehensive, domain-aware test cases.
