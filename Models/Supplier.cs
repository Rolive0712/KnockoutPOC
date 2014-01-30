using System.Collections.Generic;
//using Dapper.Contrib.Extensions;
using System.ComponentModel.DataAnnotations;

namespace MVC4KnockoutPOC.Models
{
    public class SuppProductViewModel
    {
        public List<Supplier> supplierList { get; set; }
        public List<Product> productList { get; set; }
        public string ErrorMessage { get; set; }

        public SuppProductViewModel()
        {
            supplierList = new List<Supplier>();
            productList = new List<Product>();
        }
    }

    public class Supplier
    {
        [Key]
        public int SupplierID { get; set; }
        public string CompanyName { get; set; }
        public string ContactName { get; set; }
        public string ContactTitle { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string PostalCode { get; set; }
        public string Country { get; set; }
    }

    public class Product
    {
        [Key] //this is not mandatory but good practise to add
        public int ProductID { get; set; }
        public string ProductName { get; set; }
        public int SupplierID { get; set; }
        public int CategoryID { get; set; }
        public string QuantityPerUnit { get; set; }
        public decimal UnitPrice { get; set; }
        public short? UnitsInStock { get; set; }
        public short? UnitsOnOrder { get; set; }
        public short? ReorderLevel { get; set; }
        public bool Discontinued { get; set; }
    }
}
