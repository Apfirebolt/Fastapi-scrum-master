import bcrypt


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a plain-text password against a hashed bcrypt string."""
    try:
        # Convert strings to utf-8 encoded byte strings
        password_bytes = plain_password.encode("utf-8")
        hashed_bytes = hashed_password.encode("utf-8")
        
        return bcrypt.checkpw(password_bytes, hashed_bytes)
    except (ValueError, TypeError):
        return False


def get_password_hash(password: str) -> str:
    """Hash a password using bcrypt and return the UTF-8 decoded string."""
    # Truncate to 72 bytes if necessary, as bcrypt max length limit is 72 bytes
    password_bytes = password.encode("utf-8")[:72]
    
    # Generate salt and hash
    salt = bcrypt.gensalt(rounds=12)
    hashed = bcrypt.hashpw(password_bytes, salt)
    
    return hashed.decode("utf-8")