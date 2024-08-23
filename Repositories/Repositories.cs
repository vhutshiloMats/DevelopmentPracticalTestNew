using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace DevelopmentPracticalTest.Repository
{
    public class Repositories
    {

        private DBContext dbContext;

        public Repositories(DBContext _dbContext)
        {
            dbContext = _dbContext;

        }


       
        public IEnumerable<Client> GetAllClients()
        {
            return dbContext.Clients.ToList();
        }

        public IEnumerable<Contact> GetAllContacts()
        {
            return dbContext.Contacts.ToList();
        }


        public void LinkClientToContact(int clientId, int contactId)
        {
            
            var client = dbContext.Clients.Find(clientId);
            var contact = dbContext.Contacts.Find(contactId);

          
            if (client == null || contact == null)
            {
                throw new ArgumentException("Client or Contact not found.");
            }

           
            var existingLink = dbContext.ClientContacts
                .Any(cc => cc.ClientId == clientId && cc.ContactId == contactId);

            if (existingLink)
            {
                throw new InvalidOperationException("The contact is already linked to this client.");
            }

           
            var clientContact = new ClientContact
            {
                ClientId = clientId,
                ContactId = contactId
            };

           
            dbContext.ClientContacts.Add(clientContact);

           
            client.NoOfLinkedContacts = (client.NoOfLinkedContacts ?? 0) + 1;
            contact.NoOfLinkedClinets = (contact.NoOfLinkedClinets ?? 0) + 1;

          
            dbContext.SaveChanges();
        }


        public void AddClient(Client client)
        {
            dbContext.Clients.Add(client);
            dbContext.SaveChanges();
        }

        public void AddContact(Contact contact)
        {
            dbContext.Contacts.Add(contact);
            dbContext.SaveChanges();
        }


        public void UnlinkClientFromContact(int clientId, int contactId)
        {
            var clientContact = dbContext.ClientContacts
                .FirstOrDefault(cc => cc.ClientId == clientId && cc.ContactId == contactId);

            if (clientContact == null)
            {
                throw new ArgumentException("The client-contact link was not found.");
            }

           
            dbContext.ClientContacts.Remove(clientContact);

            
            var client = dbContext.Clients.Find(clientId);
            var contact = dbContext.Contacts.Find(contactId);

            if (client != null)
            {
                client.NoOfLinkedContacts = (client.NoOfLinkedContacts ?? 0) - 1;
            }

            if (contact != null)
            {
                contact.NoOfLinkedClinets = (contact.NoOfLinkedClinets ?? 0) - 1;
            }

            dbContext.SaveChanges();
        }


        public void UnlinkContactFromClient(int clientId, int contactId)
        {
           
            var clientContact = dbContext.ClientContacts
                .FirstOrDefault(cc => cc.ClientId == clientId && cc.ContactId == contactId);

            if (clientContact == null)
            {
                throw new ArgumentException("The client-contact link was not found.");
            }

            
            dbContext.ClientContacts.Remove(clientContact);

           
            var client = dbContext.Clients.Find(clientId);
            var contact = dbContext.Contacts.Find(contactId);

            if (client != null)
            {
                client.NoOfLinkedContacts = (client.NoOfLinkedContacts ?? 0) - 1;
            }

            if (contact != null)
            {
                contact.NoOfLinkedClinets = (contact.NoOfLinkedClinets ?? 0) - 1;
            }

           
            dbContext.SaveChanges();
        }


        public IEnumerable<Contact> GetLinkedContactsByClient(int clientId)
        {
            var linkedContacts = dbContext.ClientContacts
                .Where(cc => cc.ClientId == clientId)
                .Select(cc => cc.Contact)
                .ToList();

            return linkedContacts;
        }


        public IEnumerable<Client> GetLinkedClientsByContact(int contactId)
        {
            var linkedClients = dbContext.ClientContacts
                .Where(cc => cc.ContactId == contactId)
                .Select(cc => cc.Client)
                .ToList();

            return linkedClients;
        }


        public void LinkClient(int clientId, int contactId)
        {
           
            var client = dbContext.Clients.Find(clientId);
            var contact = dbContext.Contacts.Find(contactId);

            if (client == null || contact == null)
            {
                throw new ArgumentException("Client or Contact not found.");
            }

            
            var existingLink = dbContext.ClientContacts
                .FirstOrDefault(cc => cc.ClientId == clientId && cc.ContactId == contactId);

            if (existingLink != null)
            {
                throw new InvalidOperationException("This client is already linked to the contact.");
            }

           
            var clientContact = new ClientContact
            {
                ClientId = clientId,
                ContactId = contactId
            };

            dbContext.ClientContacts.Add(clientContact);
            client.NoOfLinkedContacts = (client.NoOfLinkedContacts ?? 0) + 1;
            contact.NoOfLinkedClinets = (contact.NoOfLinkedClinets ?? 0) + 1;
            dbContext.SaveChanges();
        }






    }
}








