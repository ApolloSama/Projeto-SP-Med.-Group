using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace senai.spmedgroup.webApi.Domains
{
    public class Localizacao
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        //[BsonElement("latitude")] Para o caso de querermos a entidade com um outro nome, no caso, iniciada com letra minuscula
        [BsonRequired]
        public string Latitude { get; set; }

        [BsonRequired]
        public string Longitude { get; set; }
    }
}
