namespace DevelopmentPracticalTest
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("ClientContact")]
    public partial class ClientContact
    {
        public int Id { get; set; }

        public int ContactId { get; set; }

        public int ClientId { get; set; }

        public virtual Client Client { get; set; }

        public virtual Contact Contact { get; set; }
    }
}
