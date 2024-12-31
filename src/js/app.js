// import { Header } from './components/Header.js';
// import { Sidebar } from './components/Sidebar.js';
import { Calendar } from './components/Calendar.js';

class App {
    constructor() {
        const data = {
            NguoiDung: [
                {
                    NguoiDungID: 1,
                    TenNguoiDung: "Nguyễn Văn An",
                    Email: "nguyenvanan@gmail.com", 
                    SoDienThoai: "0901234567"
                },
                {
                    NguoiDungID: 2,
                    TenNguoiDung: "Trần Thị Bình",
                    Email: "tranthiminh@gmail.com",
                    SoDienThoai: "0912345678"
                },
                {
                    NguoiDungID: 3,
                    TenNguoiDung: "Lê Hoàng Cường",
                    Email: "lehoangcuong@gmail.com",
                    SoDienThoai: "0923456789"
                },
                {
                    NguoiDungID: 4,
                    TenNguoiDung: "Phạm Thị Dung",
                    Email: "phamthidung@gmail.com",
                    SoDienThoai: "0934567890"
                },
                {
                    NguoiDungID: 5,
                    TenNguoiDung: "Võ Minh Đức",
                    Email: "vominhduc@gmail.com",
                    SoDienThoai: "0945678901"
                }
            ],
            MayMoc: [
                {
                    MayMocID: 1,
                    TenMayMoc: "Máy Dệt Công Nghiệp A100",
                    LoaiMayMoc: "Máy Dệt",
                    TrangThai: "Đang Hoạt Động"
                },
                {
                    MayMocID: 2,
                    TenMayMoc: "Máy Cắt Tự Động B200",
                    LoaiMayMoc: "Máy Cắt",
                    TrangThai: "Bảo Trì"
                },
                {
                    MayMocID: 3,
                    TenMayMoc: "Máy In Vải C300",
                    LoaiMayMoc: "Máy In",
                    TrangThai: "Đang Hoạt Động"
                },
                {
                    MayMocID: 4,
                    TenMayMoc: "Máy Nhuộm D400",
                    LoaiMayMoc: "Máy Nhuộm",
                    TrangThai: "Tạm Dừng"
                },
                {
                    MayMocID: 5,
                    TenMayMoc: "Máy Đóng Gói E500",
                    LoaiMayMoc: "Máy Đóng Gói",
                    TrangThai: "Đang Hoạt Động"
                }
            ],
            ChiTietMatHang: [
                {
                    MaHangID: 1,
                    TenMatHang: "Vải Cotton 100%",
                    MayMocID: 1
                },
                {
                    MaHangID: 2,
                    TenMatHang: "Vải Polyester",
                    MayMocID: 1
                },
                {
                    MaHangID: 3,
                    TenMatHang: "Vải Lụa Tơ Tằm",
                    MayMocID: 3
                },
                {
                    MaHangID: 4,
                    TenMatHang: "Vải Len Merino",
                    MayMocID: 4
                },
                {
                    MaHangID: 5,
                    TenMatHang: "Vải Lanh",
                    MayMocID: 1
                }
            ],
            KeHoachSanXuat: [
                {
                    KeHoachID: 1,
                    MayMocID: 1,
                    TruongCaID: 2,
                    LoaiCa: "Ca Sáng",
                    NgayLamViec: new Date().toISOString().split('T')[0],
                    ThoiGianBatDau: new Date(new Date().toISOString().split('T')[0] + "T06:00:00"),
                    ThoiGianKetThuc: new Date(new Date().toISOString().split('T')[0] + "T14:00:00")
                },
                {
                    KeHoachID: 2,
                    MayMocID: 2,
                    TruongCaID: 3,
                    LoaiCa: "Ca Chiều",
                    NgayLamViec: new Date().toISOString().split('T')[0],
                    ThoiGianBatDau: new Date(new Date().toISOString().split('T')[0] + "T14:00:00"),
                    ThoiGianKetThuc: new Date(new Date().toISOString().split('T')[0] + "T22:00:00")
                },
                {
                    KeHoachID: 3,
                    MayMocID: 3,
                    TruongCaID: 4,
                    LoaiCa: "Ca Đêm",
                    NgayLamViec: new Date().toISOString().split('T')[0],
                    ThoiGianBatDau: new Date(new Date().toISOString().split('T')[0] + "T22:00:00"),
                    ThoiGianKetThuc: new Date(new Date(Date.now() + 86400000).toISOString().split('T')[0] + "T06:00:00")
                },
                {
                    KeHoachID: 4,
                    MayMocID: 4,
                    TruongCaID: 2,
                    LoaiCa: "Ca Sáng",
                    NgayLamViec: new Date(Date.now() + 86400000).toISOString().split('T')[0],
                    ThoiGianBatDau: new Date(new Date(Date.now() + 86400000).toISOString().split('T')[0] + "T06:00:00"),
                    ThoiGianKetThuc: new Date(new Date(Date.now() + 86400000).toISOString().split('T')[0] + "T14:00:00")
                }
            ],
            MauLich: [
                {
                    MauID: 1,
                    TenTrangThai: "Hoạt Động Bình Thường",
                    MauNen: "blue",
                    MauVien: "black",
                    MauChu: "white"
                },
                {
                    MauID: 2,
                    TenTrangThai: "Đang Bảo Trì",
                    MauNen: "yellow",
                    MauVien: "red", 
                    MauChu: "black"
                },
                {
                    MauID: 3,
                    TenTrangThai: "Tạm Dừng",
                    MauNen: "gray",
                    MauVien: "black",
                    MauChu: "white"
                },
                {
                    MauID: 4,
                    TenTrangThai: "Hoàn Thành",
                    MauNen: "green",
                    MauVien: "black",
                    MauChu: "white"
                },
                {
                    MauID: 5,
                    TenTrangThai: "Lỗi",
                    MauNen: "red",
                    MauVien: "black",
                    MauChu: "white"
                }
            ],
            NhomLamViec: [
                {
                    NhomLamViecID: 1,
                    TenNhomLamViec: "Nhóm Sản Xuất A"
                },
                {
                    NhomLamViecID: 2,
                    TenNhomLamViec: "Nhóm Bảo Trì B"
                },
                {
                    NhomLamViecID: 3,
                    TenNhomLamViec: "Nhóm Kiểm Tra Chất Lượng C"
                },
                {
                    NhomLamViecID: 4,
                    TenNhomLamViec: "Nhóm Đóng Gói D"
                },
                {
                    NhomLamViecID: 5,
                    TenNhomLamViec: "Nhóm Vận Hành E"
                }
            ],
            ChiTietLichSanXuat: [
                {
                    ChiTietID: 1,
                    KeHoachID: 1,
                    MaHangID: 1,
                    ThoiGianBatDau: new Date(new Date().toISOString().split('T')[0] + "T06:00:00"),
                    ThoiGianKetThuc: new Date(new Date().toISOString().split('T')[0] + "T10:00:00"),
                    SoLuongChay: 100,
                    SoLuongConLai: 20,
                    ThuTuChay: 1,
                    SoLuongChayThucTe: 80,
                    TyLeChay: 0.8
                },
                {
                    ChiTietID: 2,
                    KeHoachID: 1,
                    MaHangID: 2,
                    ThoiGianBatDau: new Date(new Date().toISOString().split('T')[0] + "T10:00:00"),
                    ThoiGianKetThuc: new Date(new Date().toISOString().split('T')[0] + "T14:00:00"),
                    SoLuongChay: 150,
                    SoLuongConLai: 30,
                    ThuTuChay: 2,
                    SoLuongChayThucTe: 120,
                    TyLeChay: 0.85
                },
                {
                    ChiTietID: 3,
                    KeHoachID: 2,
                    MaHangID: 3,
                    ThoiGianBatDau: new Date(new Date().toISOString().split('T')[0] + "T14:00:00"),
                    ThoiGianKetThuc: new Date(new Date().toISOString().split('T')[0] + "T18:00:00"),
                    SoLuongChay: 200,
                    SoLuongConLai: 0,
                    ThuTuChay: 1,
                    SoLuongChayThucTe: 200,
                    TyLeChay: 1.0
                },
                {
                    ChiTietID: 4,
                    KeHoachID: 2,
                    MaHangID: 4,
                    ThoiGianBatDau: new Date(new Date().toISOString().split('T')[0] + "T18:00:00"),
                    ThoiGianKetThuc: new Date(new Date().toISOString().split('T')[0] + "T22:00:00"),
                    SoLuongChay: 120,
                    SoLuongConLai: 40,
                    ThuTuChay: 2,
                    SoLuongChayThucTe: 80,
                    TyLeChay: 0.67
                },
                {
                    ChiTietID: 5,
                    KeHoachID: 3,
                    MaHangID: 5,
                    ThoiGianBatDau: new Date(new Date().toISOString().split('T')[0] + "T22:00:00"),
                    ThoiGianKetThuc: new Date(new Date().toISOString().split('T')[0] + "T02:00:00"),
                    SoLuongChay: 180,
                    SoLuongConLai: 50,
                    ThuTuChay: 1,
                    SoLuongChayThucTe: 130,
                    TyLeChay: 0.72
                },
                {
                    ChiTietID: 6,
                    KeHoachID: 3,
                    MaHangID: 6,
                    ThoiGianBatDau: new Date(new Date().toISOString().split('T')[0] + "T02:00:00"),
                    ThoiGianKetThuc: new Date(new Date().toISOString().split('T')[0] + "T06:00:00"),
                    SoLuongChay: 200,
                    SoLuongConLai: 10,
                    ThuTuChay: 2,
                    SoLuongChayThucTe: 190,
                    TyLeChay: 0.95
                }
            ],
            TienDoSanXuat: [
                {
                    TienDoID: 1,
                    ChiTietID: 1,
                    ThoiGianBatDauThucTe: new Date(new Date().toISOString().split('T')[0] + "T06:15:00"),
                    ThoiGianKetThucThucTe: new Date(new Date().toISOString().split('T')[0] + "T10:30:00"),
                    TrangThai: "Hoàn Thành",
                    MauID: 1,
                    NhomLamViecID: 1,
                    GhiChu: "Hoàn thành đúng tiến độ",
                    ThoiLuongPhut: 255
                },
                {
                    TienDoID: 2,
                    ChiTietID: 2,
                    ThoiGianBatDauThucTe: new Date(new Date().toISOString().split('T')[0] + "T10:45:00"),
                    ThoiGianKetThucThucTe: new Date(new Date().toISOString().split('T')[0] + "T14:15:00"),
                    TrangThai: "Đang Thực Hiện",
                    MauID: 1,
                    NhomLamViecID: 1,
                    GhiChu: "Chậm 15 phút do thay đổi nguyên liệu",
                    ThoiLuongPhut: 210
                },
                {
                    TienDoID: 3,
                    ChiTietID: 3,
                    ThoiGianBatDauThucTe: new Date(new Date().toISOString().split('T')[0] + "T14:00:00"),
                    ThoiGianKetThucThucTe: new Date(new Date().toISOString().split('T')[0] + "T18:00:00"),
                    TrangThai: "Hoàn Thành",
                    MauID: 4,
                    NhomLamViecID: 3,
                    GhiChu: "Hoàn thành vượt chỉ tiêu",
                    ThoiLuongPhut: 240
                },
                {
                    TienDoID: 4,
                    ChiTietID: 4,
                    ThoiGianBatDauThucTe: new Date(new Date().toISOString().split('T')[0] + "T18:10:00"),
                    ThoiGianKetThucThucTe: new Date(new Date().toISOString().split('T')[0] + "T22:30:00"),
                    TrangThai: "Lỗi Thiết Bị",
                    MauID: 5,
                    NhomLamViecID: 2,
                    GhiChu: "Máy gặp sự cố kỹ thuật",
                    ThoiLuongPhut: 260
                },
                {
                    TienDoID: 5,
                    ChiTietID: 4,
                    ThoiGianBatDauThucTe: new Date(new Date().toISOString().split('T')[0] + "T22:30:00"),
                    ThoiGianKetThucThucTe: new Date(new Date(Date.now() + 86400000).toISOString().split('T')[0] + "T02:30:00"),
                    TrangThai: "Bảo Trì",
                    MauID: 2,
                    NhomLamViecID: 2,
                    GhiChu: "Bảo trì khẩn cấp",
                    ThoiLuongPhut: 240
                },
                {
                    TienDoID: 6,
                    ChiTietID: 5,
                    ThoiGianBatDauThucTe: new Date(new Date().toISOString().split('T')[0] + "T22:15:00"),
                    ThoiGianKetThucThucTe: new Date(new Date().toISOString().split('T')[0] + "T02:30:00"),
                    TrangThai: "Đang Thực Hiện",
                    MauID: 3,
                    NhomLamViecID: 3,
                    GhiChu: "Tiến độ ổn định",
                    ThoiLuongPhut: 300
                }
            ]
        };

        this.calendar = new Calendar(data);
        // this.header = new Header(this.calendar);
        // this.sidebar = new Sidebar();
    }

    init() {
        const calendarInstance = this.calendar.initialize();
        // this.header.render();
        // this.sidebar.render();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
});

