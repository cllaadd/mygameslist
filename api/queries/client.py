import os
import pymongo


MONGO_URL = os.environ["MONGO_URL"]
client = pymongo.MongoClient(MONGO_URL)

# client = pymongo.MongoClient(os.environ["DATABASE_URL"])
# mygamelist = os.environ['MONGODATABASE']


class Queries:
    @property
    def collection(self):
        db = client[self.DB_NAME]
        return db[self.COLLECTION]
