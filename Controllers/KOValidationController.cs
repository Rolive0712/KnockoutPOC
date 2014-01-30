using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MVC4KnockoutPOC.Models;

namespace MVC4KnockoutPOC.Controllers
{
    public class KOValidationController : Controller
    {
        //
        // GET: /KOValidation/

        public ActionResult Index()
        {
            return View("KOValidation");
        }

        [HttpPost]
        public JsonResult Get(int customerID)
        {
            // Get the customer ...
            Customer customer = new Customer
            {
                CustomerID = customerID,
                FirstName = "John",
                LastName = "Doe",
                IsMale = true,
                CountryID = 1
            };
            return Json(customer);
        }

        [HttpPost]
        public JsonResult Add(Customer customer)
        {
            // Save the customer ...

            // return status message 
            var message = string.Format("Customer: {0} {1} Added. IsMale: {2} Age:{3}  CountryID: {4} ",
                                        customer.FirstName, customer.LastName, customer.IsMale.ToString(),
                                        customer.Age.ToString(), customer.CountryID.ToString());
            return Json(message);
        }
    }
}
