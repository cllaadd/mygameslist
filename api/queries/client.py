import os
import pymongo


DATABASE_URL = os.environ["DATABASE_URL"]
client = pymongo.MongoClient(DATABASE_URL)

# client = pymongo.MongoClient(os.environ["DATABASE_URL"])
# mygamelist = os.environ['MONGODATABASE']


class Queries:
    @property
    def collection(self):
        db = client[self.DB_NAME]
        return db[self.COLLECTION]
