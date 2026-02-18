"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Users
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt
from api.models import Characters, Planets, CharacterFavorites, PlanetFavorites, Users

api = Blueprint('api', __name__)

CORS(api)  # Allow CORS requests to this API


@api.route("/signup", methods=["POST"])
def signup():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400

    existing_user = db.session.execute(
        db.select(Users).where(Users.email == email)
    ).scalar()

    if existing_user:
        return jsonify({"message": "Users already exists"}), 409

    new_user = Users(
        email=email,
        password=password,
        is_active=True,
        is_admin=False)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "Users created successfully"}), 201


@api.route("/login", methods=["POST"])
def login():
    response_body = {}
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    # Validar con mi DB
    row = db.session.execute(db.select(Users).where(
        Users.email == email,
        Users.password == password,
        Users.is_active == True
    )
    ).scalar()
    response_body['message'] = "Bad username or password"
    if not row:
        return jsonify({"message": "Bad username or password"}), 401

    users = row.serialize()
    claims = {'user_id': users['id'],
              'is_active': users['is_active'],
              'is_admin': users['is_admin']}
    response_body['message'] = 'Users logged, ok'
    response_body['access_token'] = create_access_token(
        identity=email, additional_claims=claims)
    return jsonify(response_body), 200


@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current users with get_jwt_identity
    current_user = get_jwt_identity()
    additional_claims = get_jwt()  # Los datos adicionales

    print(current_user)
    print(additional_claims['user_id'])
    return jsonify(logged_in_as=current_user), 200


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {"message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
                     }
    return response_body, 200



# PEOPLE GET ROUTES

@api.route('/people', methods=['GET'])
def get_people():
    people = Characters.query.all()
    data_people = [person.serialize() for person in people]
    return jsonify(data_people), 200


@api.route('/people/<int:id>', methods=['GET'])
def get_people_from_id(id):
    person = Characters.query.get(id)
    data_people = person.serialize()
    return jsonify(data_people), 200


# PLANET GET ROUTES

@api.route('/planets', methods=['GET'])
def get_planets():
    planets = Planets.query.all()
    data_planets = [planet.serialize() for planet in planets]
    return jsonify(data_planets), 200


@api.route('/planets/<int:id>', methods=['GET'])
def get_planets_from_id(id):
    planet = Planets.query.get(id)
    data_planets = planet.serialize()
    return jsonify(data_planets), 200


# USER GET ROUTE

@api.route('/users', methods=['GET'])
def get_users():
    users = Users.query.all()
    data_users = [user.serialize() for user in users]
    return jsonify(data_users), 200


# USER FAVORITES GET ROUTE

@api.route('/users/favorites', methods=['GET'])
def get_favorites_user():
    favorite_people = CharacterFavorites.query.all()
    favorite_planets = PlanetFavorites.query.all()

    data_favorite_people = [fp.serialize() for fp in favorite_people]
    data_favorite_planets = [fp.serialize() for fp in favorite_planets]

    return jsonify({
        "people": data_favorite_people,
        "planets": data_favorite_planets
    }), 200


# USER FAVORITE PEOPLE POST ROUTE

@api.route('/user/<int:user_id>/favorite/people/<int:people_id>', methods=['POST'])
def add_people_to_favorites(user_id, people_id):
    exist = CharacterFavorites.query.filter_by(
        id_user=user_id,
        id_people=people_id
    ).first()

    if exist:
        return jsonify({"msg": "This character already exists in favorites"}), 400

    new_favorite_people = CharacterFavorites(
        id_user=user_id,
        id_people=people_id
    )
    db.session.add(new_favorite_people)
    db.session.commit()

    return jsonify({"msg": "Character added to favorites"}), 200


# USER FAVORITE PLANETS POST ROUTE

@api.route('/user/<int:user_id>/favorite/planets/<int:planets_id>', methods=['POST'])
def add_planets_to_favorites(user_id, planets_id):
    exist = PlanetFavorites.query.filter_by(
        id_user=user_id,
        id_planets=planets_id
    ).first()

    if exist:
        return jsonify({"msg": "This planet already exists in favorites"}), 400

    new_favorite_planets = PlanetFavorites(
        id_user=user_id,
        id_planets=planets_id
    )
    db.session.add(new_favorite_planets)
    db.session.commit()

    return jsonify({"msg": "Planet added to favorites"}), 200


# USER FAVORITE PEOPLE DELETE ROUTE

@api.route('/user/<int:user_id>/favorite/people/<int:people_id>', methods=['DELETE'])
def delete_people_from_favorites(user_id, people_id):
    exist = CharacterFavorites.query.filter_by(
        id_user=user_id,
        id_people=people_id
    ).first()

    if exist:
        db.session.delete(exist)
        db.session.commit()
        return jsonify({"msg": "Character deleted from favorites"}), 200

    return jsonify({"msg": "No user id or character was found"}), 400


# USER FAVORITE PLANETS DELETE ROUTE

@api.route('/user/<int:user_id>/favorite/planets/<int:planets_id>', methods=['DELETE'])
def delete_planets_from_favorites(user_id, planets_id):
    exist = PlanetFavorites.query.filter_by(
        id_user=user_id,
        id_planets=planets_id
    ).first()

    if exist:
        db.session.delete(exist)
        db.session.commit()
        return jsonify({"msg": "Planet deleted from favorites"}), 200

    return jsonify({"msg": "No user id or planet was found"}), 400
