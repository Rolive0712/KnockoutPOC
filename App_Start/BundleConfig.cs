using System.Web;
using System.Web.Optimization;

namespace MVC4KnockoutPOC
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            BundleTable.EnableOptimizations = true;

            /*
                1. All the Javascript libraries and modules are loaded using " RequireJS " AMD (asynchronous module definitions)
                2. Only the CSS (listed below) are loaded using MVC 4 Bundlers
            */

            //  #region "Style Bundles"
            bundles.Add(new StyleBundle("~/Content/css").Include(
                "~/Content/site.css",
                "~/Content/JQuery.smallipop/css/jquery.smallipop.css"));

            bundles.Add(new StyleBundle("~/Content/jQueryUIcss").IncludeDirectory("~/Content/themes/base/", "*.css"));
            bundles.Add(new StyleBundle("~/Content/BootStrapCss").Include(
                "~/Content/BootStrap-2.3.2/css/bootstrap.min.css",
                "~/Content/BootStrap-2.3.2/css/bootstrap-responsive.min.css"));
            bundles.Add(new StyleBundle("~/Content/JqueryTableSorterCss").Include("~/Content/TableSorter/tablesorter.css"));
            bundles.Add(new StyleBundle("~/Content/Toastr").Include("~/Content/toastr.min.css"));

            //   #endregion

        }
    }
}
