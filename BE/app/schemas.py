from pydantic import BaseModel, EmailStr
from uuid import UUID


class UserBase(BaseModel):
    firstName: str
    lastName: str
    email: EmailStr
    age: int
    maritalStatus: str
    address: str


class UserCreate(UserBase):
    pass


class User(UserBase):
    id: UUID

    class Config:
        orm_mode = True
