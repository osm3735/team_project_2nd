from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi.requests import Request

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

templates = Jinja2Templates(directory="templates")

@app.get("/", response_class=HTMLResponse)
async def index(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@app.get("/board.html", response_class=HTMLResponse)
async def board(request: Request):
    return templates.TemplateResponse("board.html", {"request": request})

@app.get("/board_view.html", response_class=HTMLResponse)
async def board_view(request: Request):
    return templates.TemplateResponse("board_view.html", {"request": request})

@app.get("/board_write.html", response_class=HTMLResponse)
async def board_write(request: Request):
    return templates.TemplateResponse("board_write.html", {"request": request})

@app.get("/cart.html", response_class=HTMLResponse)
async def cart(request: Request):
    return templates.TemplateResponse("cart.html", {"request": request})

@app.get("/coffebean_order.html", response_class=HTMLResponse)
async def coffeebean_order(request: Request):
    return templates.TemplateResponse("coffebean_order.html", {"request": request})

@app.get("/dlivery.html", response_class=HTMLResponse)
async def dlivery(request: Request):
    return templates.TemplateResponse("dlivery.html", {"request": request})

@app.get("/early_morning_coffee.html", response_class=HTMLResponse)
async def early_morning_coffee(request: Request):
    return templates.TemplateResponse("early_morning_coffee.html", {"request": request})

@app.get("/etc_order.html", response_class=HTMLResponse)
async def etc_order(request: Request):
    return templates.TemplateResponse("etc_order.html", {"request": request})

@app.get("/findstore.html", response_class=HTMLResponse)
async def findstore(request: Request):
    return templates.TemplateResponse("findstore.html", {"request": request})

@app.get("/goods_order.html", response_class=HTMLResponse)
async def goods_order(request: Request):
    return templates.TemplateResponse("goods_order.html", {"request": request})

@app.get("/index.html", response_class=HTMLResponse)
async def index(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.get("/join_page.html", response_class=HTMLResponse)
async def join_page(request: Request):
    return templates.TemplateResponse("join_page.html", {"request": request})

@app.get("/login.html", response_class=HTMLResponse)
async def login(request: Request):
    return templates.TemplateResponse("login.html", {"request": request})

@app.get("/menu_order.html", response_class=HTMLResponse)
async def menu_order(request: Request):
    return templates.TemplateResponse("menu_order.html", {"request": request})

@app.get("/payment.html", response_class=HTMLResponse)
async def payment(request: Request):
    return templates.TemplateResponse("payment.html", {"request": request})

@app.get("/recover_page.html", response_class=HTMLResponse)
async def recover_page(request: Request):
    return templates.TemplateResponse("recover_page.html", {"request": request})

@app.get("/submenu.html", response_class=HTMLResponse)
async def submenu(request: Request):
    return templates.TemplateResponse("submenu.html", {"request": request})