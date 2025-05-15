from fastapi import FastAPI
from routes import substance

app = FastAPI()

app.include_router(substance.router)