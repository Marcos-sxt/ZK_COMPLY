from datetime import datetime
import hashlib

def generate_commitment_hash(name: str, composition: list[int]) -> str:
  fake_string = name + ''.join(map(str, composition))
  return hashlib.sha256(fake_string.encode()).hexdigest()

def simulate_verification(name: str, composition_index: int, threshold: int) -> bool:
  # Mock de verificação — sempre retorna True por enquanto
  return True