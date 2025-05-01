from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional
from contextlib import asynccontextmanager

from . import models, schemas, crud
from .database import engine, get_db
from .seed import seed_database

# Create DB tables
models.Base.metadata.create_all(bind=engine)

# Lifespan event handler
@asynccontextmanager
async def lifespan(app: FastAPI):
    db = next(get_db())          # Create a DB session
    seed_database(db)            # Seed with that session
    yield
    db.close()                   # Close DB session at shutdown

# Create app with lifespan
app = FastAPI(title="Travel Itinerary API", lifespan=lifespan)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict this!
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ====== API ROUTES ======

@app.get("/api/recommendations/{nights}", response_model=List[schemas.ItineraryResponse])
def get_recommendations(nights: int, db: Session = Depends(get_db)):
    if nights < 2 or nights > 8:
        raise HTTPException(status_code=400, detail="Recommendations are available for 2-8 nights only")
    
    recommendations = crud.get_itineraries_by_nights(db, nights)
    if not recommendations:
        raise HTTPException(status_code=404, detail=f"No recommendations found for {nights} nights")
    
    return recommendations

@app.post("/api/itineraries", response_model=schemas.ItineraryResponse)

def create_itinerary(itinerary: schemas.ItineraryCreate, db: Session = Depends(get_db)):
    print(1)
    return crud.create_itinerary(db=db, itinerary=itinerary)

@app.get("/api/itineraries", response_model=List[schemas.ItineraryResponse])
def read_itineraries(skip: int = 0, limit: int = 100, location: Optional[str] = None, db: Session = Depends(get_db)):
    return crud.get_itineraries(db, skip=skip, limit=limit, location=location)

@app.get("/api/itineraries/{itinerary_id}", response_model=schemas.ItineraryDetailResponse)
def read_itinerary(itinerary_id: int, db: Session = Depends(get_db)):
    db_itinerary = crud.get_itinerary(db, itinerary_id=itinerary_id)
    if db_itinerary is None:
        raise HTTPException(status_code=404, detail="Itinerary not found")
    return db_itinerary

@app.get("/api/locations", response_model=List[str])
def read_locations(db: Session = Depends(get_db)):
    return crud.get_locations(db)

@app.get("/api/hotels", response_model=List[schemas.HotelBase])
def read_hotels(location: Optional[str] = None, db: Session = Depends(get_db)):
    return crud.get_hotels(db, location=location)

@app.get("/api/activities", response_model=List[schemas.ActivityBase])
def read_activities(location: Optional[str] = None, db: Session = Depends(get_db)):
    return crud.get_activities(db, location=location)
