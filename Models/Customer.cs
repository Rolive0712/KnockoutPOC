using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MVC4KnockoutPOC.Models
{
    public class Customer
    {
        public int CustomerID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool IsMale { get; set; }
        public int Age { get; set; }
        public int CountryID { get; set; }
    }

    public class PersonInfo
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
    }

    public class Person
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string SOEID { get; set; }
        public string RoleID { get; set; }
        public string GEID { get; set; }
        public string Email { get; set; }
    }

    public class TAPPersonInfo
    {
        public string PersonID { get; set; }
        public string FirstNm { get; set; }
        public string LastNm { get; set; }
        public string PhoneNbr { get; set; }
        public string SOEID { get; set; }
        public string GEID { get; set; }
        public string LOB { get; set; }
        public string EMail { get; set; }
    }

    public class PTSProject
    {
        public string proj_id { get; set; }
        public string proj_name { get; set; }
        public string proj_mgr { get; set; }
    }
}
