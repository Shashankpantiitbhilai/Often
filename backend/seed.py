from sqlalchemy.orm import Session
from . import models

def seed_database(db: Session):
    """Seed the database with initial data for Phuket and Krabi regions."""
    
    # Seed hotels
    hotels_data = [
        # Phuket hotels
        {
            "name": "Amari Phuket",
            "location": "Phuket",
            "address": "2 Meun-Ngern Road, Patong Beach, Phuket 83150",
            "description": "Luxury beachfront resort with stunning views of Patong Bay.",
            "rating": 4.7,
            "price_per_night": 250,
            "image_url": "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg"
        },
        {
            "name": "The Slate",
            "location": "Phuket",
            "address": "116 Moo 1, Sakhu, Thalang, Phuket 83110",
            "description": "Unique design resort inspired by Phuket's tin mining past.",
            "rating": 4.8,
            "price_per_night": 320,
            "image_url": "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg"
        },
        {
            "name": "Banyan Tree Phuket",
            "location": "Phuket",
            "address": "33, 33/27 Moo 4, Srisoonthorn Road, Cherngtalay, Phuket 83110",
            "description": "Luxury pool villa resort in Laguna Phuket.",
            "rating": 4.9,
            "price_per_night": 550,
            "image_url": "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg"
        },
        # Krabi hotels
        {
            "name": "Rayavadee",
            "location": "Krabi",
            "address": "214 Moo 2, Tambon Ao-Nang, Amphur Muang, Krabi 81000",
            "description": "Luxury resort set on the edge of Krabi Marine National Park.",
            "rating": 4.8,
            "price_per_night": 580,
            "image_url": "https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg"
        },
        {
            "name": "Centara Grand Beach Resort & Villas Krabi",
            "location": "Krabi",
            "address": "396-396/1 Moo 2, Ao Nang, Muang, Krabi 81000",
            "description": "Beachfront resort with its own private bay.",
            "rating": 4.6,
            "price_per_night": 290,
            "image_url": "https://images.pexels.com/photos/261327/pexels-photo-261327.jpeg"
        },
        {
            "name": "Pimalai Resort & Spa",
            "location": "Krabi",
            "address": "99 Moo 5, Ba Kan Tiang Beach, Koh Lanta, Krabi 81150",
            "description": "Luxury beachfront resort on Koh Lanta island.",
            "rating": 4.9,
            "price_per_night": 420,
            "image_url": "https://images.pexels.com/photos/221457/pexels-photo-221457.jpeg"
        }
    ]
    
    # Create hotel objects
    hotel_objects = []
    for hotel_data in hotels_data:
        hotel = models.Hotel(**hotel_data)
        db.add(hotel)
        hotel_objects.append(hotel)
    db.flush()
    
    # Seed activities
    activities_data = [
        # Phuket activities
        {
            "name": "Phi Phi Islands Tour",
            "location": "Phuket",
            "description": "Full-day speedboat tour to the stunning Phi Phi Islands.",
            "duration_hours": 8,
            "price": 100,
            "image_url": "https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg"
        },
        {
            "name": "Big Buddha Visit",
            "location": "Phuket",
            "description": "Visit the iconic 45-meter tall Big Buddha statue.",
            "duration_hours": 3,
            "price": 20,
            "image_url": "https://images.pexels.com/photos/247615/pexels-photo-247615.jpeg"
        },
        {
            "name": "Old Phuket Town Walking Tour",
            "location": "Phuket",
            "description": "Explore the colorful Sino-Portuguese architecture of Old Phuket Town.",
            "duration_hours": 4,
            "price": 30,
            "image_url": "https://images.pexels.com/photos/4275885/pexels-photo-4275885.jpeg"
        },
        {
            "name": "Phang Nga Bay Tour",
            "location": "Phuket",
            "description": "Explore the limestone karsts of Phang Nga Bay by longtail boat.",
            "duration_hours": 6,
            "price": 80,
            "image_url": "https://images.pexels.com/photos/932638/pexels-photo-932638.jpeg"
        },
        # Krabi activities
        {
            "name": "Four Islands Tour",
            "location": "Krabi",
            "description": "Visit Chicken Island, Tub Island, Mor Island, and Poda Island.",
            "duration_hours": 7,
            "price": 70,
            "image_url": "https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg"
        },
        {
            "name": "Hot Springs & Emerald Pool",
            "location": "Krabi",
            "description": "Relax in natural hot springs and swim in the Emerald Pool.",
            "duration_hours": 5,
            "price": 60,
            "image_url": "https://images.pexels.com/photos/158316/kinabachs-water-natural-pool-emerald-lake-158316.jpeg"
        },
        {
            "name": "Tiger Cave Temple",
            "location": "Krabi",
            "description": "Climb 1,260 steps to reach this sacred Buddhist temple with panoramic views.",
            "duration_hours": 4,
            "price": 15,
            "image_url": "https://images.pexels.com/photos/1532771/pexels-photo-1532771.jpeg"
        },
        {
            "name": "Hong Island Kayaking",
            "location": "Krabi",
            "description": "Kayak through the beautiful lagoons of Hong Island.",
            "duration_hours": 6,
            "price": 70,
            "image_url": "https://images.pexels.com/photos/1430672/pexels-photo-1430672.jpeg"
        }
    ]
    
    # Create activity objects
    activity_objects = []
    for activity_data in activities_data:
        activity = models.Activity(**activity_data)
        db.add(activity)
        activity_objects.append(activity)
    db.flush()

    # Create some recommended itineraries
    create_recommended_itineraries(db, hotel_objects, activity_objects)
    
    db.commit()

def create_recommended_itineraries(db: Session, hotels, activities):
    """Create recommended itineraries for 2-8 nights."""
    
    # Helper function to get objects by location
    def get_by_location(objects, location):
        return [obj for obj in objects if obj.location == location]
    
    phuket_hotels = get_by_location(hotels, "Phuket")
    krabi_hotels = get_by_location(hotels, "Krabi")
    phuket_activities = get_by_location(activities, "Phuket")
    krabi_activities = get_by_location(activities, "Krabi")
    
    # 3-night Phuket itinerary
    phuket_3nights = models.Itinerary(
        title="Phuket Explorer - 3 Nights",
        description="A perfect introduction to Phuket, featuring beach time, cultural experiences, and island exploration.",
        location="Phuket",
        num_nights=3,
        price=650,
        image_url="https://images.pexels.com/photos/3601426/pexels-photo-3601426.jpeg",
        is_recommended=True
    )
    db.add(phuket_3nights)
    db.flush()
    
    # Create days for 3-night Phuket itinerary
    for day_num in range(1, 4):
        day = models.Day(day_number=day_num, itinerary_id=phuket_3nights.id)
        db.add(day)
        db.flush()
        
        # Add hotel booking - stay at the same hotel all nights
        hotel_booking = models.HotelBooking(day_id=day.id, hotel_id=phuket_hotels[0].id)
        db.add(hotel_booking)
        
        # Add activities based on day number
        if day_num == 1:
            # Day 1: Arrival + Old Town tour
            transfer = models.Transfer(
                day_id=day.id,
                from_location="Phuket Airport",
                to_location="Patong Beach",
                departure_time="10:00",
                arrival_time="11:00",
                transfer_type="Car",
                price=30,
                notes="Private car transfer from airport to hotel"
            )
            db.add(transfer)
            
            # Afternoon activity
            day_activity = models.DayActivity(
                day_id=day.id,
                activity_id=phuket_activities[2].id,  # Old Phuket Town Walking Tour
                start_time="14:00",
                end_time="18:00",
                notes="Meet in the hotel lobby"
            )
            db.add(day_activity)
            
        elif day_num == 2:
            # Day 2: Full day Phi Phi Island tour
            day_activity = models.DayActivity(
                day_id=day.id,
                activity_id=phuket_activities[0].id,  # Phi Phi Islands Tour
                start_time="08:00",
                end_time="16:00",
                notes="Includes lunch on the island"
            )
            db.add(day_activity)
            
        elif day_num == 3:
            # Day 3: Big Buddha + Phang Nga Bay
            day_activity1 = models.DayActivity(
                day_id=day.id,
                activity_id=phuket_activities[1].id,  # Big Buddha Visit
                start_time="09:00",
                end_time="12:00",
                notes="Morning visit to avoid the heat"
            )
            db.add(day_activity1)
            
            day_activity2 = models.DayActivity(
                day_id=day.id,
                activity_id=phuket_activities[3].id,  # Phang Nga Bay Tour
                start_time="13:00",
                end_time="19:00",
                notes="Afternoon boat tour"
            )
            db.add(day_activity2)
    
    # 5-night Phuket & Krabi itinerary
    combined_5nights = models.Itinerary(
        title="Phuket & Krabi Adventure - 5 Nights",
        description="Experience the best of both Phuket and Krabi with this 5-night adventure package.",
        location="Phuket & Krabi",
        num_nights=5,
        price=1100,
        image_url="https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg",
        is_recommended=True
    )
    db.add(combined_5nights)
    db.flush()
    
    # Create days for 5-night combined itinerary
    for day_num in range(1, 6):
        day = models.Day(day_number=day_num, itinerary_id=combined_5nights.id)
        db.add(day)
        db.flush()
        
        # First 2 nights in Phuket, last 3 in Krabi
        if day_num <= 2:
            # Phuket stay
            hotel_booking = models.HotelBooking(day_id=day.id, hotel_id=phuket_hotels[1].id)
            db.add(hotel_booking)
            
            if day_num == 1:
                # Day 1: Arrival + Old Town tour
                transfer = models.Transfer(
                    day_id=day.id,
                    from_location="Phuket Airport",
                    to_location="Hotel",
                    departure_time="10:00",
                    arrival_time="11:00",
                    transfer_type="Car",
                    price=30,
                    notes="Private car transfer"
                )
                db.add(transfer)
                
                day_activity = models.DayActivity(
                    day_id=day.id,
                    activity_id=phuket_activities[2].id,  # Old Phuket Town
                    start_time="14:00",
                    end_time="18:00",
                    notes="Afternoon tour"
                )
                db.add(day_activity)
                
            elif day_num == 2:
                # Day 2: Phi Phi Islands
                day_activity = models.DayActivity(
                    day_id=day.id,
                    activity_id=phuket_activities[0].id,  # Phi Phi Islands
                    start_time="08:00",
                    end_time="16:00",
                    notes="Full day tour"
                )
                db.add(day_activity)
                
        else:
            # Krabi stay
            hotel_booking = models.HotelBooking(day_id=day.id, hotel_id=krabi_hotels[0].id)
            db.add(hotel_booking)
            
            if day_num == 3:
                # Day 3: Transfer to Krabi + Hot Springs
                transfer = models.Transfer(
                    day_id=day.id,
                    from_location="Phuket",
                    to_location="Krabi",
                    departure_time="09:00",
                    arrival_time="11:30",
                    transfer_type="Car",
                    price=60,
                    notes="Land transfer between provinces"
                )
                db.add(transfer)
                
                day_activity = models.DayActivity(
                    day_id=day.id,
                    activity_id=krabi_activities[1].id,  # Hot Springs & Emerald Pool
                    start_time="14:00",
                    end_time="19:00",
                    notes="Afternoon relaxation"
                )
                db.add(day_activity)
                
            elif day_num == 4:
                # Day 4: Four Islands Tour
                day_activity = models.DayActivity(
                    day_id=day.id,
                    activity_id=krabi_activities[0].id,  # Four Islands Tour
                    start_time="08:30",
                    end_time="15:30",
                    notes="Full day boat tour"
                )
                db.add(day_activity)
                
            elif day_num == 5:
                # Day 5: Tiger Cave Temple + Hong Island Kayaking
                day_activity1 = models.DayActivity(
                    day_id=day.id,
                    activity_id=krabi_activities[2].id,  # Tiger Cave Temple
                    start_time="08:00",
                    end_time="12:00",
                    notes="Morning temple visit"
                )
                db.add(day_activity1)
                
                day_activity2 = models.DayActivity(
                    day_id=day.id,
                    activity_id=krabi_activities[3].id,  # Hong Island Kayaking
                    start_time="13:00",
                    end_time="19:00",
                    notes="Afternoon kayaking adventure"
                )
                db.add(day_activity2)
    
    # 7-night Krabi Relaxation
    krabi_7nights = models.Itinerary(
        title="Krabi Relaxation Retreat - 7 Nights",
        description="A week-long escape to the stunning beaches and natural wonders of Krabi.",
        location="Krabi",
        num_nights=7,
        price=1650,
        image_url="https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg",
        is_recommended=True
    )
    db.add(krabi_7nights)
    db.flush()
    
    # Create days for 7-night Krabi itinerary
    for day_num in range(1, 8):
        day = models.Day(day_number=day_num, itinerary_id=krabi_7nights.id)
        db.add(day)
        db.flush()
        
        # Split the stay between two hotels
        if day_num <= 4:
            hotel_booking = models.HotelBooking(day_id=day.id, hotel_id=krabi_hotels[0].id)
        else:
            hotel_booking = models.HotelBooking(day_id=day.id, hotel_id=krabi_hotels[2].id)
        db.add(hotel_booking)
        
        # Add activities based on day number
        if day_num == 1:
            # Day 1: Arrival
            transfer = models.Transfer(
                day_id=day.id,
                from_location="Krabi Airport",
                to_location="Hotel",
                departure_time="12:00",
                arrival_time="13:00",
                transfer_type="Car",
                price=25,
                notes="Airport transfer"
            )
            db.add(transfer)
            
            # Free afternoon to relax
            
        elif day_num == 2:
            # Day 2: Four Islands Tour
            day_activity = models.DayActivity(
                day_id=day.id,
                activity_id=krabi_activities[0].id,  # Four Islands Tour
                start_time="08:00",
                end_time="15:00",
                notes="Full day tour with lunch"
            )
            db.add(day_activity)
            
        elif day_num == 3:
            # Day 3: Hot Springs & Emerald Pool
            day_activity = models.DayActivity(
                day_id=day.id,
                activity_id=krabi_activities[1].id,  # Hot Springs & Emerald Pool
                start_time="09:00",
                end_time="14:00",
                notes="Nature day trip"
            )
            db.add(day_activity)
            
        elif day_num == 4:
            # Day 4: Free day to relax
            pass
            
        elif day_num == 5:
            # Day 5: Move to second hotel + Tiger Cave Temple
            transfer = models.Transfer(
                day_id=day.id,
                from_location="First Hotel",
                to_location="Second Hotel",
                departure_time="10:00",
                arrival_time="11:00",
                transfer_type="Car",
                price=20,
                notes="Hotel transfer"
            )
            db.add(transfer)
            
            day_activity = models.DayActivity(
                day_id=day.id,
                activity_id=krabi_activities[2].id,  # Tiger Cave Temple
                start_time="14:00",
                end_time="18:00",
                notes="Afternoon temple visit"
            )
            db.add(day_activity)
            
        elif day_num == 6:
            # Day 6: Hong Island Kayaking
            day_activity = models.DayActivity(
                day_id=day.id,
                activity_id=krabi_activities[3].id,  # Hong Island Kayaking
                start_time="09:00",
                end_time="15:00",
                notes="Full day kayaking adventure"
            )
            db.add(day_activity)
            
        elif day_num == 7:
            # Day 7: Free day to relax before departure
            transfer = models.Transfer(
                day_id=day.id,
                from_location="Hotel",
                to_location="Krabi Airport",
                departure_time="16:00",
                arrival_time="17:00",
                transfer_type="Car",
                price=25,
                notes="Departure transfer"
            )
            db.add(transfer)
            
    # Add 2-night itinerary for Phuket
    phuket_2nights = models.Itinerary(
        title="Phuket Weekend Getaway - 2 Nights",
        description="A perfect weekend escape to Phuket with beach time and cultural experiences.",
        location="Phuket",
        num_nights=2,
        price=450,
        image_url="https://images.pexels.com/photos/237272/pexels-photo-237272.jpeg",
        is_recommended=True
    )
    db.add(phuket_2nights)
    db.flush()
    
    # Create days for 2-night Phuket itinerary
    for day_num in range(1, 3):
        day = models.Day(day_number=day_num, itinerary_id=phuket_2nights.id)
        db.add(day)
        db.flush()
        
        # Hotel booking
        hotel_booking = models.HotelBooking(day_id=day.id, hotel_id=phuket_hotels[2].id)
        db.add(hotel_booking)
        
        if day_num == 1:
            # Day 1: Arrival + Old Town
            transfer = models.Transfer(
                day_id=day.id,
                from_location="Phuket Airport",
                to_location="Hotel",
                departure_time="10:00",
                arrival_time="11:00",
                transfer_type="Car",
                price=35,
                notes="Airport transfer"
            )
            db.add(transfer)
            
            day_activity = models.DayActivity(
                day_id=day.id,
                activity_id=phuket_activities[2].id,  # Old Phuket Town
                start_time="14:00",
                end_time="18:00",
                notes="Afternoon cultural tour"
            )
            db.add(day_activity)
            
        elif day_num == 2:
            # Day 2: Phi Phi Islands
            day_activity = models.DayActivity(
                day_id=day.id,
                activity_id=phuket_activities[0].id,  # Phi Phi Islands
                start_time="08:00",
                end_time="16:00",
                notes="Full day island adventure"
            )
            db.add(day_activity)