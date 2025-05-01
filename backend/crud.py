from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List, Optional

from . import models, schemas

def check_if_data_exists(db: Session) -> bool:
    """Check if there's already data in the database to avoid reseeding."""
    return db.query(models.Itinerary).first() is not None

def get_itinerary(db: Session, itinerary_id: int):
    return db.query(models.Itinerary).filter(models.Itinerary.id == itinerary_id).first()

def get_itineraries(db: Session, skip: int = 0, limit: int = 100, location: Optional[str] = None):
    query = db.query(models.Itinerary)
    
    if location:
        query = query.filter(models.Itinerary.location == location)
    
    return query.offset(skip).limit(limit).all()

def get_itineraries_by_nights(db: Session, nights: int):
    return db.query(models.Itinerary).filter(
        models.Itinerary.num_nights == nights,
        models.Itinerary.is_recommended == True
    ).all()

def get_locations(db: Session) -> List[str]:
    locations = db.query(models.Itinerary.location).distinct().all()
    return [location[0] for location in locations]

def get_hotels(db: Session, location: Optional[str] = None):
    query = db.query(models.Hotel)
    
    if location:
        query = query.filter(models.Hotel.location == location)
    
    return query.all()

def get_activities(db: Session, location: Optional[str] = None):
    query = db.query(models.Activity)
    
    if location:
        query = query.filter(models.Activity.location == location)
    
    return query.all()
def create_itinerary(db: Session, itinerary: schemas.ItineraryCreate):
    # Create the itinerary object
    db_itinerary = models.Itinerary(
        title=itinerary.title,
        description=itinerary.description,
        location=itinerary.location,
        num_nights=itinerary.num_nights,
        price=itinerary.price,
        image_url=itinerary.image_url,
        is_recommended=itinerary.is_recommended
    )
   
    db.add(db_itinerary)
    db.flush()  # Get the itinerary ID without committing

    # Create days for the itinerary
    for day_data in itinerary.days:
        db_day = models.Day(
            day_number=day_data.day_number,
            itinerary_id=db_itinerary.id
        )
        db.add(db_day)
        db.flush()  # Get the day ID without committing

        # Add hotel booking if hotel data exists
        if day_data.hotel:
            # Ensure hotel_data has the correct structure and hotel_id
            if hasattr(day_data.hotel, 'hotel_id') and day_data.hotel.hotel_id:
                db_hotel_booking = models.HotelBooking(
                    day_id=db_day.id,
                    hotel_id=day_data.hotel.hotel_id  # Assuming hotel_id exists in the hotel object
                )
                db.add(db_hotel_booking)
            else:
                # Handle cases where hotel_id is missing or invalid
                print(f"Skipping hotel booking for day {day_data.day_number} as hotel_id is missing.")
        
        # Add transfers for the day
        for transfer_data in day_data.transfers:
            db_transfer = models.Transfer(
                day_id=db_day.id,
                from_location=transfer_data.from_location,
                to_location=transfer_data.to_location,
                departure_time=transfer_data.departure_time,
                arrival_time=transfer_data.arrival_time,
                transfer_type=transfer_data.transfer_type,
                price=transfer_data.price,
                notes=transfer_data.notes
            )
            db.add(db_transfer)
        
        # Add activities for the day
        for activity_data in day_data.activities:
            db_day_activity = models.DayActivity(
                day_id=db_day.id,
                activity_id=activity_data.activity_id,
                start_time=activity_data.start_time,
                end_time=activity_data.end_time,
                notes=activity_data.notes
            )
            db.add(db_day_activity)

    db.commit()  # Commit all changes to the database
    db.refresh(db_itinerary)  # Refresh the itinerary object
    return db_itinerary
