using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MVC4KnockoutPOC.Controllers
{
    public class SeatReservationController : Controller
    {
        //
        // GET: /SeatReservation/

        public ActionResult Index()
        {
            return View("SeatReservation");
        }

    }
}
