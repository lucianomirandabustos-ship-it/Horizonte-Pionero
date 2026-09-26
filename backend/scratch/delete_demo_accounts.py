import asyncio, os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
load_dotenv(ROOT / '.env')

mongo_uri = os.environ.get('MONGODB_URI') or os.environ.get('MONGO_URL')
client = AsyncIOMotorClient(mongo_uri)
db = client['horizonte_pionero']

async def delete_demo():
    targets = ['admin.qa@example.com', 'pionero.qa@example.com']
    print(f"Buscando cuentas demo a eliminar: {targets}")
    
    # Obtener user_ids
    users = await db.users.find({'email': {'\x24in': targets}}).to_list(10)
    user_ids = [u['user_id'] for u in users]
    
    if not user_ids:
        print("No se encontraron cuentas demo para eliminar.")
        return

    # Eliminar de users
    res_users = await db.users.delete_many({'user_id': {'\x24in': user_ids}})
    # Eliminar sesiones
    res_sess = await db.user_sessions.delete_many({'user_id': {'\x24in': user_ids}})
    # Eliminar estados
    res_states = await db.user_states.delete_many({'user_id': {'\x24in': user_ids}})
    
    print(f"Cuentas eliminadas: {res_users.deleted_count}")
    print(f"Sesiones eliminadas: {res_sess.deleted_count}")
    print(f"Estados eliminados: {res_states.deleted_count}")
    print("\nCuentas activas en Horizonte Pionero:")
    active = await db.users.find({}, {'_id': 0, 'email': 1, 'name': 1, 'role': 1, 'verification_status': 1}).to_list(100)
    for a in active:
        print(f" - {a.get('email')} ({a.get('name')}) -> Rol: {a.get('role')} [{a.get('verification_status')}]")

if __name__ == '__main__':
    asyncio.run(delete_demo())
