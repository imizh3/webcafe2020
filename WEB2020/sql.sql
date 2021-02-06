/****** Object:  StoredProcedure [dbo].[WEB_GETNGANHNHOM]    Script Date: 08/10/2020 15:49:49 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[WEB_GETNGANHNHOM]') AND type in (N'P', N'PC'))
DROP PROCEDURE [dbo].[WEB_GETNGANHNHOM]
GO
create proc [dbo].[WEB_GETNGANHNHOM]
(
	@Madonvi varchar(20)
)
as
select * from (
select Manganh as Ma, Madonvi, Tennganh as Ten, null as Macha  from Nganhhang
union 
select Manhomhang as Ma, Madonvi, Tennhomhang as Ten, Manganh as Macha from Nhomhang
) n
where Madonvi=@Madonvi
order by Ten
GO

CREATE TABLE [dbo].[Giaodichweb](
	[Magiaodichpk] [varchar](20) NOT NULL,
	[Madonvi] [varchar](20) NOT NULL,
	[Maptnx] [varchar](20) NOT NULL,
	[Ghichu] [nvarchar](max) NULL,
	[Trangthai] [int] NULL,
	[Ngaytao] [datetime] NOT NULL,
	[Sochungtugoc] [varchar](20) NULL,
	[Ngaychungtugoc] [datetime] NULL,
	[Kemtheo] [varchar](20) NULL,
	[Tiendathanhtoan] [decimal](20, 8) NULL,
	[Mahopdong] [nchar](20) NULL,
	[Ngaythanhtoan] [datetime] NULL,
	[Ngayhoadon] [datetime] NULL,
	[Sohoadon] [varchar](20) NULL,
	[Kyhieuhoadon] [varchar](20) NULL,
	[Magiaodichphu] [nvarchar](50) NULL,
	[Makhachhang] [varchar](20) NULL,
	[Diachigiaohang] [nvarchar](250) NULL,
	[Manhanviencongno] [varchar](20) NULL,
	[Manhanviendathang] [varchar](20) NULL,
	[Tendangnhap] [varchar](20) NOT NULL,
	[Tendangnhapsua] [varchar](20) NULL,
	[Nguoigiaohang] [nvarchar](150) NULL,
	[Ngayphatsinh] [datetime] NOT NULL,
	[Maquay] [varchar](50) NULL,
	[Solaninhoadon] [int] NULL,
	[Trangthaidonhang] [int] NULL,
	[Mucdouutien] [nvarchar](1000) NULL,
	[Mangoaite] [varchar](20) NULL,
	[Tygia] [decimal](20, 8) NULL,
	[Trangthaick] [int] NULL,
	[Trangthaitinhdoanhso] [int] NULL,
	[Trangthaickthunglon] [int] NULL,
	[Mausohoadon] [varchar](20) NULL,
 CONSTRAINT [PK_Giaodichweb] PRIMARY KEY CLUSTERED 
(
	[Magiaodichpk] ASC,
	[Madonvi] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

CREATE TABLE [dbo].[Giaodichwebct](
	[Id] [uniqueidentifier] NOT NULL,
	[Magiaodichpk] [varchar](20) NOT NULL,
	[Madonvi] [varchar](20) NOT NULL,
	[Masieuthi] [varchar](20) NOT NULL,
	[Manganh] [varchar](20) NOT NULL,
	[Makhachhang] [varchar](20) NULL,
	[Manhomhang] [varchar](20) NOT NULL,
	[Makhohang] [varchar](20) NOT NULL,
	[Mabohang] [varchar](20) NOT NULL,
	[Soluong] [decimal](20, 8) NULL,
	[Dongiacovat] [decimal](20, 8) NULL,
	[Dongiachuavat] [decimal](20, 8) NULL,
	[Tienhang] [decimal](20, 8) NULL,
	[Tienvat] [decimal](20, 8) NULL,
	[Thanhtien] [decimal](20, 8) NULL,
	[Tyleck] [decimal](20, 8) NULL,
	[Tienck] [decimal](20, 8) NULL,
	[Giavon] [decimal](20, 8) NULL,
	[Doanhthu] [decimal](20, 8) NULL,
	[Makhodieuchuyen] [varchar](20) NULL,
	[Mavat] [varchar](20) NULL,
	[Ghichu] [nvarchar](500) NULL,
	[Giabanlecovat] [decimal](20, 8) NULL,
	[Giabanbuoncovat] [decimal](20, 8) NULL,
	[Giabanlechuavat] [decimal](20, 8) NULL,
	[Giabanbuonchuavat] [decimal](20, 8) NULL,
	[Tylelaibuon] [decimal](20, 8) NULL,
	[Tylelaile] [decimal](20, 8) NULL,
	[Giathungchuavat] [decimal](20, 8) NULL,
	[Mavuviec] [varchar](20) NULL,
	[Mangoaite] [varchar](20) NULL,
	[Tygia] [decimal](20, 8) NULL,
	[Magiaodichphu] [varchar](20) NULL,
	[Machuongtrinhkm] [varchar](20) NULL,
	[Mavatnk] [varchar](20) NULL,
	[Tienvatnk] [decimal](20, 8) NULL,
	[Tienchiphivc] [decimal](20, 8) NULL,
	[Tienchiphikhac] [decimal](20, 8) NULL,
	[Tylecktrendon] [decimal](20, 8) NULL,
	[Tiencktrendon] [decimal](20, 8) NULL,
	[Tiencktrathuong] [decimal](20, 8) NULL,
	[Dongiacovatnt] [decimal](20, 8) NULL,
	[Dongiachuavatnt] [decimal](20, 8) NULL,
	[Tienhangnt] [decimal](20, 8) NULL,
	[Tienvatnt] [decimal](20, 8) NULL,
	[Thanhtiennt] [decimal](20, 8) NULL,
	[Tiencknt] [decimal](20, 8) NULL,
	[Giavonnt] [decimal](20, 8) NULL,
	[Doanhthunt] [decimal](20, 8) NULL,
	[Giabanlecovatnt] [decimal](20, 8) NULL,
	[Giabanbuoncovatnt] [decimal](20, 8) NULL,
	[Giabanlechuavatnt] [decimal](20, 8) NULL,
	[Giabanbuonchuavatnt] [decimal](20, 8) NULL,
	[Giathungchuavatnt] [decimal](20, 8) NULL,
	[Tienvatnknt] [decimal](20, 8) NULL,
	[Tienchiphivcnt] [decimal](20, 8) NULL,
	[Tienchiphikhacnt] [decimal](20, 8) NULL,
	[Tiencktrendonnt] [decimal](20, 8) NULL,
	[Tiencktrathuongnt] [decimal](20, 8) NULL,
	[Madoituongtaphop] [varchar](20) NULL,
	[Mathanhpham] [varchar](20) NULL,
	[Tienhangtinhthue] [decimal](20, 8) NULL,
	[Mamau] [varchar](50) NULL,
	[Macongtrinh] [varchar](20) NULL,
	[IsKhuyenmai] [int] NULL,
	[Matkno] [varchar](20) NULL,
	[Matkco] [varchar](20) NULL,
	[Matknhapkhauno] [varchar](20) NULL,
	[Matknhapkhauco] [varchar](20) NULL,
	[Matkthuedacbietno] [varchar](20) NULL,
	[Matkthuedacbietco] [varchar](20) NULL,
	[Matkthuegtgtno] [varchar](20) NULL,
	[Matkthuegtgtco] [varchar](20) NULL,
	[Matkchietkhauno] [varchar](20) NULL,
	[Matkchietkhauco] [varchar](20) NULL,
	[Matkgiamgiano] [varchar](20) NULL,
	[Matkgiamgiaco] [varchar](20) NULL,
	[Matklephino] [varchar](20) NULL,
	[Matklephico] [varchar](20) NULL,
	[Matkchiphino] [varchar](20) NULL,
	[Matkchiphico] [varchar](20) NULL,
	[Matkchiphikhacno] [varchar](20) NULL,
	[Matkchiphikhacco] [varchar](20) NULL,
	[Matkkhuyenmaino] [varchar](20) NULL,
	[Matkkhuyenmaico] [varchar](20) NULL,
	[Matkthuekhautruno] [varchar](20) NULL,
	[Matkthuekhautruco] [varchar](20) NULL,
	[Matkbanamno] [varchar](20) NULL,
	[Matkbanamco] [varchar](20) NULL,
	[Matkchietkhausaubanhangno] [varchar](20) NULL,
	[Matkchietkhausaubanhangco] [varchar](20) NULL,
	[Matkvtu] [varchar](20) NULL,
	[Matkgiavon] [varchar](20) NULL,
	[Sort] [int] NULL,
 CONSTRAINT [PK_Giaodichwebct] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[Giaodichwebct]  WITH CHECK ADD  CONSTRAINT [FK_Giaodichwebct_Giaodichweb] FOREIGN KEY([Magiaodichpk], [Madonvi])
REFERENCES [dbo].[Giaodichweb] ([Magiaodichpk], [Madonvi])
GO

ALTER TABLE [dbo].[Giaodichwebct] CHECK CONSTRAINT [FK_Giaodichwebct_Giaodichweb]
GO

/****** Object:  StoredProcedure [dbo].[Giaodichweb_UpdatetTrangthai]    Script Date: 12/14/2020 14:23:57 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Giaodichweb_UpdatetTrangthai]') AND type in (N'P', N'PC'))
DROP PROCEDURE [dbo].[Giaodichweb_UpdatetTrangthai]
GO
/****** Object:  StoredProcedure [dbo].[Giaodichweb_UpdatetTrangthai]    Script Date: 12/14/2020 14:23:57 ******/
CREATE PROC [dbo].[Giaodichweb_UpdatetTrangthai](
	@Trangthai int,
	@Magiaodichpk varchar(20),
	@Madonvi varchar(20)
)
as
BEGIN
update Giaodichweb set Trangthai=@Trangthai
where Magiaodichpk=@Magiaodichpk and Madonvi=@Madonvi
END
GO
/****** Object:  StoredProcedure [dbo].[Fill_GiaodichwebByTungayDenngay]    Script Date: 12/14/2020 14:26:18 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Fill_GiaodichwebByTungayDenngay]') AND type in (N'P', N'PC'))
DROP PROCEDURE [dbo].[Fill_GiaodichwebByTungayDenngay]
GO
/****** Object:  StoredProcedure [dbo].[Fill_GiaodichwebByTungayDenngay]    Script Date: 12/14/2020 14:26:18 ******/
create PROCEDURE [dbo].[Fill_GiaodichwebByTungayDenngay]
@maNhomptnx nvarchar(20),
@maDonvi nvarchar(20),
@trangThai nvarchar(20),
@tuNgay datetime,
@denNgay datetime,
@maQuay varchar(20)
AS
BEGIN
Declare @SQL_Insert nvarchar(4000)
SET @SQL_Insert='SELECT ''false'' as chon 
		   ,gd.[Magiaodichpk]
           ,gd.[Madonvi]
           ,gd.[Maptnx]
           ,gd.[Trangthai]
           ,gd.[Maquay]
           ,gd.[Ngaytao]
           ,gd.[Makhachhang],kh.Tenkhachhang,kh.Dienthoai
           ,gd.[Tendangnhap]
           ,gd.[Manhanviencongno]
		   ,gd.[Manhanviendathang]
           ,gd.[Ngayphatsinh]
           ,gd.[Ghichu]
      ,Sum(T.[Tienhang])as Tienhang
      ,sum(T.[Tienvat]) as Tienvat
      ,sum(T.[Thanhtien]) as Thanhtien
      ,sum(T.[Doanhthu]) as Doanhthu
      ,sum(T.[Tienck]) as Tienck from Giaodichweb gd inner join 
      (
      (
SELECT [Magiaodichpk]
      ,[Madonvi]
      ,[Tienhang]
      ,[Tienvat]
      ,[Thanhtien]
      ,[Doanhthu]
      ,[Tienck]
  FROM [Giaodichwebct]
  where Magiaodichpk in(Select Magiaodichpk from Giaodichweb where Madonvi='''+@maDonvi+''' and 
Maptnx in(select Maptnx from Dmptnx where Manhomptnx='''+@maNhomptnx+''' and Madonvi='''+@maDonvi+''')'
+CASE WHEN @trangThai='20' then '' else ' and Trangthai='+@trangThai+'' end +
' and (Datediff(Day,Ngayphatsinh,'''+ convert(nvarchar(50),@tuNgay) +''')<=0 
 AND Datediff(Day,Ngayphatsinh,'''+ convert(nvarchar(50),@denNgay) +''')>=0))
)
)T on gd.Magiaodichpk=T.Magiaodichpk and gd.Madonvi=T.Madonvi left join Khachhang kh on gd.Madonvi=kh.Madonvi and gd.Makhachhang=kh.Makhachhang group by gd.[Magiaodichpk]
      ,gd.[Madonvi]
      ,gd.[Maptnx]
      ,gd.[Trangthai]
      ,gd.[Maquay]
      ,gd.[Ngaytao]
      ,gd.[Makhachhang],kh.Tenkhachhang,kh.Dienthoai
      ,gd.[Tendangnhap]
      ,gd.[Manhanviencongno]
      ,gd.[Manhanviendathang]
      ,gd.[Ngayphatsinh]
	  ,gd.[Ghichu]'
exec(@SQL_Insert)
End

GO

/****** Object:  StoredProcedure [dbo].[GetDataGiaodichwebctByMagiaodichpk]    Script Date: 12/14/2020 14:28:30 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[GetDataGiaodichwebctByMagiaodichpk]') AND type in (N'P', N'PC'))
DROP PROCEDURE [dbo].[GetDataGiaodichwebctByMagiaodichpk]
GO
/****** Object:  StoredProcedure [dbo].[GetDataGiaodichwebctByMagiaodichpk]    Script Date: 12/14/2020 14:28:30 ******/
create PROCEDURE [dbo].[GetDataGiaodichwebctByMagiaodichpk]
@Magiaodichpk varchar(20),
@Madonvi varchar(20)
AS
BEGIN
Declare @SQL_Insert nvarchar(4000)
SET @SQL_Insert='SELECT T.[Magiaodichpk]
      ,T.[Madonvi]
      ,T.[Masieuthi]
      ,T.[Mabohang]
      ,T.[Makhohang]
      ,MH.Tendaydu,MH.Madvtinh,dvt.Donvile
      ,T.[Giabanlecovat]
      ,T.[Giabanlechuavat]
      ,T.[Tyleck]
      ,Sum(T.[Soluong]) as Soluong
      ,Sum(T.[Tienhang])as Tienhang
      ,sum(T.[Tienvat]) as Tienvat
      ,sum(T.[Thanhtien]) as Thanhtien
      ,sum(T.[Doanhthu]) as Doanhthu
      ,sum(T.[Tienck]) as Tienck from Mathang MH inner join 
      (
SELECT [Magiaodichpk]
      ,[Madonvi]
      ,[Masieuthi]
      ,[Mabohang]
      ,[Makhohang]
      ,[Soluong]
      ,[Giabanlecovat]
      ,[Giabanlechuavat]
      ,[Tienhang]
      ,[Tienvat]
      ,[Thanhtien]
      ,[Doanhthu]
      ,[Tyleck]
      ,[Tienck]
  FROM [Giaodichwebct] 
  where Magiaodichpk ='''+@Magiaodichpk+''' and Madonvi='''+@Madonvi+'''
)T on MH.Masieuthi=T.Masieuthi and MH.Madonvi=T.Madonvi 
inner join Donvitinh dvt on MH.Madvtinh=dvt.Madvtinh and MH.Madonvi=dvt.Madonvi group by T.[Magiaodichpk]
      ,T.[Madonvi]
      ,T.[Masieuthi]
      ,T.[Mabohang]
      ,T.[Makhohang]
      ,MH.Tendaydu,MH.Madvtinh,dvt.Donvile
      ,T.[Giabanlecovat]
      ,T.[Giabanlechuavat]
      ,T.[Tyleck]'
exec(@SQL_Insert)
End
GO

