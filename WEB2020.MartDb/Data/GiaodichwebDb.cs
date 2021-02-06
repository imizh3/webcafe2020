using System;
using System.Collections.Generic;
using WEB2020.MartDb.Entitys;
namespace WEB2020.MartDb.Data
{
    public class GiaodichwebDb
    {
        private readonly MARTDbContext _dbContext;
        public GiaodichwebDb() { }
        public GiaodichwebDb(MARTDbContext dbContext)
        {
            this._dbContext = dbContext;
        }

        public void InsertGiaodich(
            string Magiaodichpk,
                   string Madonvi,
                   string Maptnx,
                   string Ghichu,
                   global::System.Nullable<int> Trangthai,
                   string Sochungtugoc,
                   global::System.Nullable<global::System.DateTime> Ngaychungtugoc,
                   string Kemtheo,
                   global::System.Nullable<decimal> Tiendathanhtoan,
                   string Mahopdong,
                   global::System.Nullable<global::System.DateTime> Ngaythanhtoan,
                   global::System.Nullable<global::System.DateTime> Ngayhoadon,
                   string Sohoadon,
                   string Kyhieuhoadon,
                   string Magiaodichphu,
                   string Makhachhang,
                   string Diachigiaohang,
                   string Manhanviencongno,
                   string Manhanviendathang,
                   string Tendangnhap,
                   string Tendangnhapsua,
                   string Nguoigiaohang,
                   System.DateTime Ngayphatsinh,
                   string Maquay,
                   global::System.Nullable<int> Trangthaidonhang)
        {
            Giaodichweb giaodichweb = new Giaodichweb
            {
                Magiaodichpk = Magiaodichpk,
                Madonvi = Madonvi,
                Maptnx = Maptnx,
                Ghichu = Ghichu,
                Trangthai = Trangthai,
                Sochungtugoc = Sochungtugoc,
                Ngaychungtugoc = Ngaychungtugoc,
                Kemtheo = Kemtheo,
                Tiendathanhtoan = Tiendathanhtoan,
                Mahopdong = Mahopdong,
                Ngaythanhtoan = Ngaythanhtoan,
                Ngayhoadon = Ngayhoadon,
                Sohoadon = Sohoadon,
                Kyhieuhoadon = Kyhieuhoadon,
                Magiaodichphu = Magiaodichphu,
                Makhachhang = Makhachhang,
                Diachigiaohang = Diachigiaohang,
                Manhanviencongno = Manhanviencongno,
                Manhanviendathang = Manhanviendathang,
                Tendangnhap = Tendangnhap,
                Tendangnhapsua = Tendangnhapsua,
                Nguoigiaohang = Nguoigiaohang,
                Ngayphatsinh = Ngayphatsinh,
                Maquay = Maquay,
                Trangthaidonhang = Trangthaidonhang,
                Ngaytao=DateTime.Now,
            };
            this._dbContext.Giaodichwebs.Add(giaodichweb);
            this._dbContext.SaveChanges();
        }

        public void UpdateGiaodich(
                    string Maptnx,
                    string Ghichu,
                    global::System.Nullable<int> Trangthai,
                    System.DateTime Ngaytao,
                    string Sochungtugoc,
                    global::System.Nullable<global::System.DateTime> Ngaychungtugoc,
                    string Kemtheo,
                    global::System.Nullable<decimal> Tiendathanhtoan,
                    string Mahopdong,
                    global::System.Nullable<global::System.DateTime> Ngaythanhtoan,
                    global::System.Nullable<global::System.DateTime> Ngayhoadon,
                    string Sohoadon,
                    string Kyhieuhoadon,
                    string Magiaodichphu,
                    string Makhachhang,
                    string Diachigiaohang,
                    string Manhanviencongno,
                    string Manhanviendathang,
                    string Tendangnhap,
                    string Tendangnhapsua,
                    string Nguoigiaohang,
                    System.DateTime Ngayphatsinh,
                    global::System.Nullable<int> Trangthaidonhang,
                    string Maquay,
                    string Magiaodichpk,
                    string Madonvi)
        {
            Giaodichweb giaodichweb = _dbContext.Giaodichwebs.Find(Magiaodichpk, Madonvi);
            giaodichweb.Maptnx = Maptnx;
            giaodichweb.Ghichu = Ghichu;
            giaodichweb.Trangthai = Trangthai;
            giaodichweb.Ngaytao = Ngaytao;
            giaodichweb.Sochungtugoc = Sochungtugoc;
            giaodichweb.Ngaychungtugoc = Ngaychungtugoc;
            giaodichweb.Kemtheo = Kemtheo;
            giaodichweb.Tiendathanhtoan = Tiendathanhtoan;
            giaodichweb.Mahopdong = Mahopdong;
            giaodichweb.Ngaythanhtoan = Ngaythanhtoan;
            giaodichweb.Ngayhoadon = Ngayhoadon;
            giaodichweb.Sohoadon = Sohoadon;
            giaodichweb.Kyhieuhoadon = Kyhieuhoadon;
            giaodichweb.Magiaodichphu = Magiaodichphu;
            giaodichweb.Makhachhang = Makhachhang;
            giaodichweb.Diachigiaohang = Diachigiaohang;
            giaodichweb.Manhanviencongno = Manhanviencongno;
            giaodichweb.Manhanviendathang = Manhanviendathang;
            giaodichweb.Tendangnhap = Tendangnhap;
            giaodichweb.Tendangnhapsua = Tendangnhapsua;
            giaodichweb.Nguoigiaohang = Nguoigiaohang;
            giaodichweb.Ngayphatsinh = Ngayphatsinh;
            giaodichweb.Trangthaidonhang = Trangthaidonhang;
            giaodichweb.Maquay = Maquay;
            _dbContext.Entry(giaodichweb).State=Microsoft.EntityFrameworkCore.EntityState.Modified;
            _dbContext.SaveChanges();
        }
        public void DeleteGiaodich(string Magiaodichpk, string Madonvi)
        {
            Giaodichweb giaodichweb = _dbContext.Giaodichwebs.Find(Magiaodichpk, Madonvi);
            _dbContext.Giaodichwebs.Remove(giaodichweb);
            _dbContext.SaveChanges();
        }
    }
}