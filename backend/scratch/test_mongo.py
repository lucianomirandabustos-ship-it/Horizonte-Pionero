import asyncio
import os
import motor.motor_asyncio
from dotenv import load_dotenv

load_dotenv()
uri = os.environ.get("MONGODB_URI")
print(f"Probando URI: {uri[:30]}...")
client = motor.motor_asyncio.AsyncIOMotorClient(uri, serverSelectionTimeoutMS=8000)

async def check():
    try:
        res = await client.admin.command("ping")
        print("RESULTADO PING:", res)
        db = client[os.environ.get("DB_NAME", "horizonte_pionero")]
        cols = await db.list_collection_names()
        print("COLECCIONES EN DB:", cols)
    except Exception as e:
        print("ERROR CONECTANDO A MONGO:", type(e), e)

asyncio.run(check())
