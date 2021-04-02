from .db import db
from sqlalchemy.orm import relationship

class Event(db.Model):
    __tablename__ = 'events'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    betsapi_id = db.Column(db.Integer, nullable=True, unique=True)
    bet365_id = db.Column(db.Integer, nullable=True, unique=True)
    sport_id = db.Column(db.Integer, nullable=True, unique=True)
    home = db.Column(db.Text, nullable=True)
    away = db.Column(db.Text, nullable=True)
    league = db.Column(db.Text, nullable=True)
    time = db.Column(db.Integer)
    time_status = db.Column(db.Integer)
    time_created = db.Column(db.DateTime, default=db.func.current_timestamp())
    time_updated = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

    mainbets = relationship('Mainbets', back_populates='event')