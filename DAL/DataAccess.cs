using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using Dapper;
using MVC4KnockoutPOC.Models;

namespace MVC4KnockoutPOC.DAL
{
    public interface IDataAccess
    {
        IEnumerable<PersonInfo> GetPersons();
        IEnumerable<PTSProject> GetPTSProjectList(Tuple<string, string, string> projListParams);
        int AddPerson(Tuple<string, string, string, string, string, string, string> personInfoList);
        int? SupplierID { get; set; }
        SuppProductViewModel GetProductSupplierListFromNorthwind();
        IEnumerable<dynamic> CTOGridFillDynamic();
        IEnumerable<TAPEntity> CTOGridFill();
        IEnumerable<TAPPersonInfo> GetTAPPersonInfo(string soeid = null);
    }

    public class DataAccess : IDataAccess
    {
        #region "Class Properties"
        public int? SupplierID { get; set; }
        #endregion
        public IEnumerable<PersonInfo> GetPersons()
        {
            List<PersonInfo> personInfo = new List<PersonInfo>();
            for (int i = 0; i < 2000; i++)
            {
                var guid = Guid.NewGuid().ToString();
                personInfo.Add(new PersonInfo { FirstName = "FN_" + i + "_" + guid, LastName = "LN_" + i + "_" + guid, Address = Guid.NewGuid().ToString() });

            }
            return personInfo;
        }

        public SuppProductViewModel GetProductSupplierListFromNorthwind()
        {
            BaseUtility.ConnStringType = "Northwind";
            SuppProductViewModel spvm = new SuppProductViewModel();

            using (var db = BaseUtility.OpenConnection())
            {
                // var dynamicParams = new DynamicParameters();
                // dynamicParams.Add("@Id", 2, dbType: DbType.Int32, direction: ParameterDirection.Input);

                //using (var multi = db.QueryMultiple("spSupplierProducts", dynamicParams, commandType: CommandType.StoredProcedure))
                using (var multi = db.QueryMultiple("spSupplierProducts",
                        new { Id = this.SupplierID }, commandType: CommandType.StoredProcedure))
                {
                    var supplier = multi.Read<Supplier>().Single();
                    var product = multi.Read<Product>().ToList();

                    spvm.supplierList.Add(supplier);
                    spvm.productList = product;
                }
            }
            return spvm;
        }

        public IEnumerable<PTSProject> GetPTSProjectList(Tuple<string, string, string> projListParams)
        {
            BaseUtility.ConnStringType = "PTS";
            using (var db = BaseUtility.OpenConnection())
            {
                return db.Query<PTSProject>("sp_PMTGetProjList",
                    new {   ProjId = projListParams.Item1, 
                            Projname = projListParams.Item2, 
                            ProjMgr = projListParams.Item3 }, 

                    commandType: CommandType.StoredProcedure);
            }
        }

        public IEnumerable<TAPEntity> CTOGridFill()
        {
            BaseUtility.ConnStringType = "TAP";
            using (var db = BaseUtility.OpenConnection())
            {
                return db.Query<TAPEntity>("spCTOGridFill", commandType: CommandType.StoredProcedure).ToList();
            }
        }

        /// <summary>
        /// Note: Dynamic collection returns Dictionary object with Key/ Value pairs
        /// </summary>
        /// <returns></returns>
        public IEnumerable<dynamic> CTOGridFillDynamic()
        {
            BaseUtility.ConnStringType = "TAP";
            using (var db = BaseUtility.OpenConnection())
            {
                return db.Query<dynamic>("spCTOGridFill", commandType: CommandType.StoredProcedure).ToList();
            }
        }

        public IEnumerable<TAPPersonInfo> GetTAPPersonInfo(string soeid = null)
        {
            BaseUtility.ConnStringType = "TAP";
            using (var db = BaseUtility.OpenConnection())
            {
                var query = "select * from person where SOEID = '"+ soeid + "'";
                return db.Query<TAPPersonInfo>(query).ToList();
            }
        }

        public int AddPerson(Tuple<string, string, string, string, string, string, string> personInfoList)
        {
            using (var db = BaseUtility.OpenConnection())
            {
                return db.Execute("spAddPerson",
                    new
                    {
                        LastNm = personInfoList.Item2,
                        FirstNm = personInfoList.Item1,
                        PhoneNbr = personInfoList.Item3,
                        SOEID = personInfoList.Item4,
                        EMail = personInfoList.Item7,
                        GEID = personInfoList.Item6,
                        RoleId = personInfoList.Item5,
                        LOB = 0
                    }, commandType: CommandType.StoredProcedure);
            }
        }
    }
}
