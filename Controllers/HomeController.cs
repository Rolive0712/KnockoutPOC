using System;
using System.Web.Mvc;
using MVC4KnockoutPOC.DAL;
using MVC4KnockoutPOC.ExceptionHandler;
using MVC4KnockoutPOC.Models;
using System.Linq;
using Newtonsoft;
using Newtonsoft.Json.Serialization;
using Newtonsoft.Json;

namespace MVC4KnockoutPOC.Controllers
{
    //[HandleError] //This captures Jquery AJAX errors. But displays contents in Error View as (HTML). Good for production
    /// <summary>
    /// CustomErrorHandler: This captures Jquery AJAX. Displays exact error message and jquery fail callback is invoked. Good for debugging
    /// If detailed error message is required, then comment "CustomErrorHandler".
    /// </summary>
    [CustomErrorHandler]
    public class HomeController : Controller
    {
        private readonly IDataAccess da = new DataAccess();
        public ActionResult Index()
        {
            ViewBag.Message = "";
            return View("Index");
            //return File(Server.MapPath("/Views/Home/") + "IndexViewHTML.htm", "text/html"); // server HTML files
        }

        public JsonResult GetPersons()
        {
            var iePi = da.GetPersons();
            return Json(iePi, JsonRequestBehavior.AllowGet);
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your app description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult DapperTest()
        {
            ViewBag.Message = "Dapper Testing";

            return View();
        }

        public JsonResult GetPTSProjectList(PTSProject json)
        {
            Tuple<string, string, string> projListParams = new Tuple<string, string, string>(
                json.proj_id,
                json.proj_name,
                json.proj_mgr
            );

            var iePi = da.GetPTSProjectList(projListParams);
            return Json(iePi, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetProductSupplierListFromNorthwind(int? supplierId)
        {
            da.SupplierID = supplierId;
            //da.SupplierID = null; // uncomment to catch/ test ajax errors.
            var SuppProductViewModel = da.GetProductSupplierListFromNorthwind();
            return Json(SuppProductViewModel, JsonRequestBehavior.AllowGet);
        }

        public JsonResult CTOGridFill()
        {
            var CTO = da.CTOGridFill();
            return Json(CTO, JsonRequestBehavior.AllowGet);
        }

        public string BindDynamicTable()
        {
            dynamic dynamicData = da.CTOGridFillDynamic();
            return JsonConvert.SerializeObject(dynamicData);
        }

        public void AddPerson(Person json)
        {
            Tuple<string, string, string, string, string, string, string> personInfoList = new Tuple<string, string, string, string, string, string, string>(
            json.FirstName, json.LastName, json.PhoneNumber,
            json.SOEID, json.RoleID, json.GEID, json.Email);

            da.AddPerson(personInfoList);

        }
    }
}
