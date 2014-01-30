using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace MVC4KnockoutPOC
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            //routes.RouteExistingFiles = true;

            ///*****************.html/.htm VIEW ROUTING*****************/
            //routes.MapRoute(
            //    name: "HTMLRoute",
            //    url: "{page}.htm",
            //    defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            //);  
                
            /*****************RAZOR VIEW ROUTING*****************/
            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
