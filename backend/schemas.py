from typing import List, Optional
from pydantic import BaseModel

# Base models
class HotelBase(BaseModel):
    id: Optional[int] = None
    name: str
    location: str
    address: Optional[str] = None
    description: Optional[str] = None
    rating: Optional[float] = None
    price_per_night: Optional[float] = None
    image_url: Optional[str] = None

    class Config:
        from_attributes = True

class ActivityBase(BaseModel):
    id: Optional[int] = None
    name: str
    location: str
    description: Optional[str] = None
    duration_hours: Optional[float] = None
    price: Optional[float] = None
    image_url: Optional[str] = None

    class Config:
        from_attributes = True

class TransferBase(BaseModel):
    from_location: str
    to_location: str
    departure_time: str
    arrival_time: str
    transfer_type: str
    price: Optional[float] = None
    notes: Optional[str] = None

    class Config:
        from_attributes = True

class DayActivityBase(BaseModel):
    activity_id: int
    start_time: str
    end_time: str
    notes: Optional[str] = None

    class Config:
        from_attributes = True

class HotelBookingBase(BaseModel):
    hotel_id: int

    class Config:
        from_attributes = True

# Create schemas
class DayCreate(BaseModel):
    day_number: int
    hotel: Optional[HotelBookingBase] = None  # Make sure hotel can be None
    transfers: List[TransferBase] = []
    activities: List[DayActivityBase] = []

class ItineraryCreate(BaseModel):
    title: str
    description: Optional[str] = None
    location: str
    num_nights: int
    price: Optional[float] = None
    image_url: Optional[str] = None
    is_recommended: Optional[bool] = False
    days: List[DayCreate] = []

# Response schemas
class Transfer(TransferBase):
    id: int

class DayActivity(DayActivityBase):
    id: int
    activity: ActivityBase

class HotelBooking(HotelBookingBase):
    id: int
    hotel: HotelBase

class Day(BaseModel):
    id: int
    day_number: int
    hotel: Optional[HotelBooking] = None  # Make sure hotel is Optional
    transfers: List[Transfer] = []
    activities: List[DayActivity] = []

    class Config:
        from_attributes = True

class ItineraryResponse(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    location: str
    num_nights: int
    price: Optional[float] = None
    image_url: Optional[str] = None
    is_recommended: bool

    class Config:
        from_attributes = True

class ItineraryDetailResponse(ItineraryResponse):
    days: List[Day] = []  # Days with all related data

    class Config:
        from_attributes = True
