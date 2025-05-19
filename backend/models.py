from sqlalchemy import Column, String, Integer, JSON, DateTime
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Substance(Base):
    __tablename__ = "substances"
    id = Column(String, primary_key=True, index=True)
    name = Column(String)
    composition = Column(JSON)
    hash_commitment = Column(String)
    timestamp = Column(DateTime) 