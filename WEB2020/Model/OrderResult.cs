using System;
using WEB2020.MartDb.Entitys;
using System.Collections.Generic;
namespace WEB2020.Model
{
    public class OrderResult
    {
        public string Magiaodichpk { get; set; }
        public string Madonvi { get; set; }
        public string Maptnx { get; set; }
        public string Ghichu { get; set; }
        public int? Trangthai { get; set; }
        public DateTime Ngaytao { get; set; }
        public DateTime? Ngaythanhtoan { get; set; }
        public DateTime? Ngayhoadon { get; set; }
        public string Makhachhang { get; set; }

        public string Manhanviendathang { get; set; }
        public string Tendangnhap { get; set; }
        public string Tendangnhapsua { get; set; }

        public string Diachigiaohang { get; set; }

        public DateTime Ngayphatsinh { get; set; }
        public List<Orderct> Giaodichct { get; set; }
        public List<Orderct> Giaodichctkhuyenmai { get; set; }
        public Khachhang Khachhang { get; set; }

        public string Thanhtien { get; set; }

        public string Tienhang { get; set; }
        public string Tienck { get; set; }
    }
}