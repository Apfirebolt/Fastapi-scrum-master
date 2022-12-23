from fastapi import FastAPI, Request, status
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from backend.auth import router as auth_router

app = FastAPI(title="Fast API Blog",
    docs_url="/scrum-master-docs",
    version="0.0.1")

origins = ["http://localhost:3000",]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Scrum Master API in FastAPI"}


app.include_router(auth_router.router)


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)