using DevelopmentPracticalTest.CodeGenerator;
using DevelopmentPracticalTest.Models;
using DevelopmentPracticalTest.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace DevelopmentPracticalTest.Controllers
{
    public class ClientController : Controller
    {

        private Repositories repository;

        public ClientController()
        {

            DBContext dbContext = new DBContext();
            repository = new Repositories(dbContext);
        }


        public ActionResult Index()
        {
            var clients = repository.GetAllClients(); 
            var contacts = repository.GetAllContacts(); 

            var viewModel = new ClientContactViewModel
            {
                Clients = clients,
                Contacts = contacts
            };

            return View(viewModel);
        }


        [HttpPost]
        public JsonResult LinkContact(int contactId, int clientId)
        {
            try
            {
                repository.LinkClientToContact(clientId, contactId);
                return Json(new { success = true, message = "Contact Successfully linked to client." });
            }
            catch (ArgumentException ex)
            {
                return Json(new { success = false, message = ex.Message });
            }
            catch (InvalidOperationException ex)
            {
                return Json(new { success = false, message = ex.Message });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = "An unexpected error occurred: " + ex.Message });
            }
        }



        [HttpPost]
        public ActionResult AddClient(string clientName)
        {
            if (string.IsNullOrWhiteSpace(clientName))
            {
                ModelState.AddModelError("", "Client Name is required.");
                return RedirectToAction("Index");
            }

            
            var codeGenerator = new ClientUniqueCodeGenerator();

           
            var existingClients = repository.GetAllClients();
            var existingCodes = existingClients.Select(c => c.ClientCode);

           
            var clientCode = codeGenerator.GenerateClientCode(clientName, existingCodes);

            
            var newClient = new Client
            {
                Name = clientName,
                ClientCode = clientCode,
                NoOfLinkedContacts = 0
            };

            repository.AddClient(newClient);
            return RedirectToAction("Index");
        }

        [HttpPost]
        public ActionResult AddContact(Contact contact)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    repository.AddContact(contact);
                    TempData["SuccessMessage"] = "Contact added successfully.";
                }
                catch (Exception ex)
                {
                    TempData["ErrorMessage"] = "An error occurred while adding the contact.";
                }
            }
            else
            {
                TempData["ErrorMessage"] = "Please fill in all required fields.";
            }

            return RedirectToAction("Index");


        }


   

        [HttpPost]
        public JsonResult UnlinkClient(int contactId, int clientId)
        {
            try
            {
                
                repository.UnlinkClientFromContact(clientId, contactId);

                return Json(new { success = true, message = "Client unlinked successfully." });
            }
            catch (Exception ex)
            {
                
                return Json(new { success = false, message = "Error unlinking client: " + ex.Message });
            }
        }


        [HttpPost]
        public ActionResult UnlinkContact(int clientId, int contactId)
        {
            try
            {
                
                repository.UnlinkContactFromClient(clientId, contactId);

                
                return Json(new { success = true, message = "Contact successfully unlinked from client." });
            }
            catch (Exception ex)
            {
               
                return Json(new { success = false, message = ex.Message });
            }
        }

        [HttpGet]
        public ActionResult GetLinkedContacts(int clientId)
        {
            var contacts = repository.GetLinkedContactsByClient(clientId);
            return Json(contacts.Select(c => new { c.Id, c.Name, c.Surname }), JsonRequestBehavior.AllowGet);
        }

  

        [HttpPost]
        public JsonResult LinkClient(int contactId, int clientId)
        {
            try
            {
                repository.LinkClientToContact(clientId, contactId);
                return Json(new { success = true, message = "Client linked to contact successfully." });
            }
            catch (ArgumentException ex)
            {
                return Json(new { success = false, message = ex.Message });
            }
            catch (InvalidOperationException ex)
            {
                return Json(new { success = false, message = ex.Message });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = "An unexpected error occurred: " + ex.Message });
            }
        }



        [HttpGet]
        public ActionResult GetLinkedClients(int contactId)
        {
            var contacts = repository.GetLinkedClientsByContact(contactId);
            return Json(contacts.Select(c => new { c.Id, c.Name }), JsonRequestBehavior.AllowGet);
        }


        public ActionResult GetAllClients()
        {
            var clients = repository.GetAllClients(); 
            return Json(clients.Select(c => new { c.Id, c.Name }), JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetAllContacts()
        {
            var clients = repository.GetAllContacts(); 
            return Json(clients.Select(c => new { c.Id, c.Name }), JsonRequestBehavior.AllowGet);
        }



    }

}







