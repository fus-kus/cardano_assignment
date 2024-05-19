from database import get_db
from fastapi import HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List
from app import models, schemas
from fastapi import APIRouter

router = APIRouter()


@router.post("/users/add", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    return models.create_user(db=db, user=user)


@router.get("/users/", response_model=List[schemas.User])
def get_users(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return models.get_users(db=db, skip=skip, limit=limit)


@router.get("/users/{user_id}", response_model=schemas.User)
def get_user(user_id: str, db: Session = Depends(get_db)):
    db_user = models.get_user(db=db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


@router.put("/users/update/{user_id}", response_model=schemas.User)
def update_user(user_id: str,
                user: schemas.UserCreate,
                db: Session = Depends(get_db)):
    db_user = models.get_user(db=db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return models.update_user(db=db, user_id=user_id, user=user)


@router.delete("/users/delete/{user_id}", response_model=schemas.User)
def delete_user(user_id: str, db: Session = Depends(get_db)):
    db_user = models.get_user(db=db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return models.delete_user(db=db, user_id=user_id)
