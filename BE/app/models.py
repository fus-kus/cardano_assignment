from sqlalchemy import Column, String, Integer, create_engine, MetaData
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import Session
from uuid import uuid4
from . import schemas

DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(DATABASE_URL)
metadata = MetaData()

Base = declarative_base()


class User(Base):
    __tablename__ = "users"
    id = Column(String, primary_key=True, index=True)
    firstName = Column(String, index=True)
    lastName = Column(String, index=True)
    email = Column(String, index=True)
    age = Column(Integer)
    maritalStatus = Column(String)
    address = Column(String)


def get_users(db: Session, skip: int = 0, limit: int = 10):
    return db.query(User).offset(skip).limit(limit).all()


def get_user(db: Session, user_id: str):
    return db.query(User).filter(User.id == user_id).first()


def create_user(db: Session, user: schemas.UserCreate):
    db_user = User(
        id=str(uuid4()),
        firstName=user.firstName,
        lastName=user.lastName,
        email=user.email,
        age=user.age,
        maritalStatus=user.maritalStatus,
        address=user.address,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def update_user(db: Session, user_id: str, user: schemas.UserCreate):
    db_user = db.query(User).filter(User.id == user_id).first()
    if db_user:
        db_user.firstName = user.firstName
        db_user.lastName = user.lastName
        db_user.email = user.email
        db_user.age = user.age
        db_user.maritalStatus = user.maritalStatus
        db_user.address = user.address
        db.commit()
        db.refresh(db_user)
    return db_user


def delete_user(db: Session, user_id: str):
    db_user = db.query(User).filter(User.id == user_id).first()
    if db_user:
        db.delete(db_user)
        db.commit()
    return db_user
