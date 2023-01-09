from fastapi.testclient import TestClient

from main import app


client = TestClient(app)

# def test_create_user():
#     response = client.post(
#         "/auth/",
#         json={
#             "email": "deadpool@example.com", 
#             "firstName": "dead", 
#             "lastName": "pool", 
#             "password": "chimichangas4life", 
#             "username": "deadpool"
#         },
#     )
#     assert response.status_code == 201, response.text
#     data = response.json()
#     assert data["email"] == "deadpool@example.com"
#     assert data["username"] == "deadpool"
#     assert "id" in data
#     user_id = data["id"]


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


def test_create_tasks():
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

    taskResponse = client.post(
        "task/",
        json={
            "title": "Some Task", 
            "description": "Some task description", 
            "status": "In Progress"
        },
        headers={
            "Authorization": "Bearer " + access_token
        }
    )
    data = taskResponse.json()
    assert taskResponse.status_code == 201


# def test_delete_task():
#     response = client.post(
#         "auth/login/",
#         json={
#             "email": "deadpool@example.com",  
#             "password": "chimichangas4life", 
#         },
#     )
#     data = response.json()
#     access_token = data['access_token']
#     assert 'access_token' in data
#     assert response.status_code == 200

#     removed_id = 9

#     taskResponse = client.delete(f"/task/{removed_id}", 
#         headers={
#             "Authorization": "Bearer " + access_token
#         }
#     )
#     assert taskResponse.status_code == 204

def test_update_task():
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
    updated_id = 10

    taskResponse = client.patch(f"/task/{updated_id}",
        json={
            "title": "Some Task now updated", 
            "description": "Some task description now updated",
        }, 
        headers={
            "Authorization": "Bearer " + access_token
        }
    )
    data = taskResponse.json()
    assert data['id'] == updated_id
    assert data['title'] == "Some Task now updated"
    assert data['description'] == "Some task description now updated"
    assert response.status_code == 200
