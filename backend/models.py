from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Float, Text, Date
from sqlalchemy.orm import relationship

from .database import Base

class Itinerary(Base):
    __tablename__ = "itineraries"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(Text)
    location = Column(String, index=True)
    num_nights = Column(Integer, index=True)
    price = Column(Float)
    image_url = Column(String)
    is_recommended = Column(Boolean, default=False)

    days = relationship("Day", back_populates="itinerary", cascade="all, delete-orphan")

class Day(Base):
    __tablename__ = "days"

    id = Column(Integer, primary_key=True, index=True)
    day_number = Column(Integer)
    itinerary_id = Column(Integer, ForeignKey("itineraries.id"))
    
    itinerary = relationship("Itinerary", back_populates="days")
    hotel = relationship("HotelBooking", back_populates="day", uselist=False, cascade="all, delete-orphan")
    transfers = relationship("Transfer", back_populates="day", cascade="all, delete-orphan")
    activities = relationship("DayActivity", back_populates="day", cascade="all, delete-orphan")

class Hotel(Base):
    __tablename__ = "hotels"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    location = Column(String, index=True)
    address = Column(String)
    description = Column(Text)
    rating = Column(Float)
    price_per_night = Column(Float)
    image_url = Column(String)
    
    bookings = relationship("HotelBooking", back_populates="hotel")

class HotelBooking(Base):
    __tablename__ = "hotel_bookings"

    id = Column(Integer, primary_key=True, index=True)
    day_id = Column(Integer, ForeignKey("days.id"))
    hotel_id = Column(Integer, ForeignKey("hotels.id"))
    
    day = relationship("Day", back_populates="hotel")
    hotel = relationship("Hotel", back_populates="bookings")

class Transfer(Base):
    __tablename__ = "transfers"

    id = Column(Integer, primary_key=True, index=True)
    day_id = Column(Integer, ForeignKey("days.id"))
    from_location = Column(String)
    to_location = Column(String)
    departure_time = Column(String)
    arrival_time = Column(String)
    transfer_type = Column(String)  # e.g., 'car', 'ferry', 'flight'
    price = Column(Float)
    notes = Column(Text)
    
    day = relationship("Day", back_populates="transfers")

class Activity(Base):
    __tablename__ = "activities"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    location = Column(String, index=True)
    description = Column(Text)
    duration_hours = Column(Float)
    price = Column(Float)
    image_url = Column(String)
    
    day_activities = relationship("DayActivity", back_populates="activity")

class DayActivity(Base):
    __tablename__ = "day_activities"

    id = Column(Integer, primary_key=True, index=True)
    day_id = Column(Integer, ForeignKey("days.id"))
    activity_id = Column(Integer, ForeignKey("activities.id"))
    start_time = Column(String)
    end_time = Column(String)
    notes = Column(Text)
    
    day = relationship("Day", back_populates="activities")
    activity = relationship("Activity", back_populates="day_activities")