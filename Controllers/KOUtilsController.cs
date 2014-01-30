using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MVC4KnockoutPOC.DAL;

namespace MVC4KnockoutPOC.Controllers
{
    public class KOUtilsController : Controller
    {
        //
        // GET: /KOUtils/
        private readonly IDataAccess da = new DataAccess();

        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetTAPPersonInfoBySOEID(string soeid)
        {
            var iePi = da.GetTAPPersonInfo(soeid);
            return Json(iePi, JsonRequestBehavior.AllowGet);
        }

    }
}
