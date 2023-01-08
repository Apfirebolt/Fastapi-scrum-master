from sqlalchemy import create_engine, MetaData
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from fastapi.testclient import TestClient
from sqlalchemy import create_engine

from db import Base, get_db
from main import app

SQLALCHEMY_DATABASE_URL = f"postgresql://postgres:pass12345@127.0.0.1/fast-scrum-test"

engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
metadata = MetaData()

def override_get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)

def test_create_user():
    response = client.post(
        "/auth/",
        json={
            "email": "deadpool@example.com", 
            "firstName": "dead", 
            "lastName": "pool", 
            "password": "chimichangas4life", 
            "username": "deadpool"
        },
    )
    assert response.status_code == 201, response.text
    data = response.json()
    assert data["email"] == "deadpool@example.com"
    assert data["username"] == "deadpool"
    assert "id" in data
    user_id = data["id"]


# Login with existing user
def test_auth_user():
    response = client.post(
        "auth/login/",
        json={
            "email": "deadpool@example.com",  
            "password": "chimichangas4life", 
        },
    )
    data = response.json()
    assert 'access_token' in data
    assert response.status_code == 200


def test_get_tasks():
    response = client.post(
        "auth/login/",
        json={
            "email": "deadpool@example.com",  
            "password": "chimichangas4life", 
        },
    )
    data = response.json()
    access_token = data['access_token']
    assert 'access_token' in data
    assert response.status_code == 200

    taskResponse = client.get(
        "task/",
        headers={
            "Authorization": "Bearer " + access_token
        }
    )
    data = taskResponse.json()
    assert taskResponse.status_code == 200
