from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi.requests import Request

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

templates = Jinja2Templates(directory="templates")

@app.get("/index.html", response_class=HTMLResponse)
async def index(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.get("/early_morning_coffee.html", response_class=HTMLResponse)
async def index(request: Request):
    return templates.TemplateResponse("early_morning_coffee.html", {"request": request})

@app.get("/findstore.html", response_class=HTMLResponse)
async def index(request: Request):
    return templates.TemplateResponse("findstore.html", {"request": request})

@app.get("/login.html", response_class=HTMLResponse)
async def index(request: Request):
    return templates.TemplateResponse("findstore.html", {"request": request})