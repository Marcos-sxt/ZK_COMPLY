from fastapi import FastAPI
from routes.substance import router as substance_router

app = FastAPI()

app.include_router(substance_router)