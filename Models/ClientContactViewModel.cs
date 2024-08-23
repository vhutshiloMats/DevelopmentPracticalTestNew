using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DevelopmentPracticalTest.Models
{
    public class ClientContactViewModel
    {

        public IEnumerable<Client> Clients { get; set; }
        public IEnumerable<Contact> Contacts { get; set; }
        public IEnumerable<ClientContact> ClientContacts { get; set; }
    }
}