import uuid

def generate_filename(ext="png"):
    return f"vis_{uuid.uuid4().hex[:8]}.{ext}"
