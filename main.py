from fastapi import FastAPI, Request, status
from fastapi.responses import JSONResponse
from fastapi_utils.tasks import repeat_every
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import time
import uvicorn

from backend.auth import router as auth_router
from backend.tasks import router as task_router
from backend.admin import router as admin_router

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


app.include_router(auth_router.router)
app.include_router(task_router.router)
app.include_router(admin_router.router)

app.mount("/static", StaticFiles(directory="frontend/build/static"), name="static")

templates = Jinja2Templates(directory="frontend/build")

# Middleware to calculate response time of an API
@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    return response

@app.get("/{full_path:path}")
async def serve_react_app(request: Request, full_path: str):
    """Serve the react app
    `full_path` variable is necessary to serve each possible endpoint with
    `index.html` file in order to be compatible with `react-router-dom
    """
    return templates.TemplateResponse("index.html", {"request": request})


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
 
