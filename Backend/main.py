from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title= "SignSpeak AI",
    description= "Indian Sign Language to Speech Translator",
    version= "1.0.0",
)

# Allow Frontend to communicate with Backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:8000"
    ],
    allow_credentials=True,
    allow_headers=["*"],
    allow_methods=["*"],
)

@app.get('/')
def home():
    return {
        "message": "Welcome to SignSpeak AI"
    }
    
@app.get('/health')
def health():
    return {
        "status": "healthy",
        "project": "SignSpeak AI"
    }